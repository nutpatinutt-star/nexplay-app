import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";

/**
 * Authenticated read side of the click-tracking system (see
 * /api/track-click for the write side and why this exists). Meant to be
 * called server-to-server — by a droplet-side script building the
 * end-of-live report — not from the browser.
 *
 * Query params (both optional, ISO 8601, UTC — link_clicks.clicked_at is
 * SQLite's datetime('now'), which is UTC):
 *   from — window start, inclusive. Defaults to 24 hours before `to`.
 *   to   — window end, exclusive. Defaults to now.
 *
 * Auth: send the shared secret as `x-api-key`. Set via .dev.vars locally
 * and `wrangler secret put CLICK_REPORT_API_KEY` in production.
 */
export const dynamic = "force-dynamic";

type ClickRow = {
  streamer_slug: string;
  link_type: string; // "visit" | "register" | "line"
  count: number;
};

export async function GET(request: NextRequest) {
  const { env } = await getCloudflareContext({ async: true });

  const apiKey = env.CLICK_REPORT_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ ok: false, reason: "not_configured" }, { status: 503 });
  }
  if (request.headers.get("x-api-key") !== apiKey) {
    return NextResponse.json({ ok: false, reason: "unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const to = searchParams.get("to") ?? new Date().toISOString();
  const from =
    searchParams.get("from") ??
    new Date(new Date(to).getTime() - 24 * 60 * 60 * 1000).toISOString();

  const toSql = to.replace("T", " ").replace("Z", "");
  const fromSql = from.replace("T", " ").replace("Z", "");

  let rows: ClickRow[];
  try {
    const result = await env.LINK_CLICKS_DB.prepare(
      `SELECT streamer_slug, link_type, COUNT(*) as count
       FROM link_clicks
       WHERE clicked_at >= ?1 AND clicked_at < ?2
       GROUP BY streamer_slug, link_type
       ORDER BY streamer_slug, link_type`,
    )
      .bind(fromSql, toSql)
      .all<ClickRow>();
    rows = result.results ?? [];
  } catch (err) {
    console.error("click-report query failed", err);
    return NextResponse.json({ ok: false, reason: "query_failed" }, { status: 500 });
  }

  // `visit` = landing-page loads (comparable to Meta Ads Manager's "Link Clicks"), fired once per
  // browser session in AppFrame.tsx. `register`/`line` are on-page CTA button clicks — a subset of
  // visitors, not additional arrivals, so they are NOT summed into visit. Keep them as three
  // separate numbers rather than one combined "total" (register+line can both exceed or undercount
  // visit depending on how many buttons each visitor clicks).
  const byStreamer = new Map<
    string,
    { streamer_slug: string; visit: number; register: number; line: number }
  >();
  let totalVisits = 0;

  for (const row of rows) {
    const entry = byStreamer.get(row.streamer_slug) ?? {
      streamer_slug: row.streamer_slug,
      visit: 0,
      register: 0,
      line: 0,
    };
    if (row.link_type === "visit" || row.link_type === "register" || row.link_type === "line") {
      entry[row.link_type] = row.count;
    }
    if (row.link_type === "visit") totalVisits += row.count;
    byStreamer.set(row.streamer_slug, entry);
  }

  return NextResponse.json({
    ok: true,
    from,
    to,
    total_visits: totalVisits,
    by_streamer: [...byStreamer.values()].sort((a, b) => b.visit - a.visit),
  });
}
