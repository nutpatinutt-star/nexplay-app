import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { STREAMERS } from "@/data/streamers";

/**
 * Independent click counter for the register and "add LINE" links, broken
 * down per streamer — built because Meta Ads Manager's own click numbers
 * don't match reality for livestream ad traffic. Called from
 * lib/analytics.ts's trackEvent() on every register_click/line_click,
 * regardless of whether GA4 is configured for that streamer, so it never
 * misses a streamer GA4 hasn't been set up for yet.
 *
 * Public and unauthenticated on purpose — it's hit directly from visitors'
 * browsers. See /api/click-report for the authenticated read side.
 */
export const dynamic = "force-dynamic";

const VALID_LINK_TYPES: Set<string> = new Set(["visit", "register", "line"]);
const VALID_SLUGS: Set<string> = new Set(STREAMERS.map((streamer) => streamer.slug));

type TrackClickBody = {
  streamer_slug?: string;
  link_type?: string;
};

export async function POST(request: NextRequest) {
  let body: TrackClickBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, reason: "invalid_body" }, { status: 400 });
  }

  const { streamer_slug, link_type } = body;
  if (
    !streamer_slug ||
    !link_type ||
    !VALID_SLUGS.has(streamer_slug) ||
    !VALID_LINK_TYPES.has(link_type)
  ) {
    return NextResponse.json({ ok: false, reason: "invalid_fields" }, { status: 400 });
  }

  const { env } = await getCloudflareContext({ async: true });

  try {
    await env.LINK_CLICKS_DB.prepare(
      "INSERT INTO link_clicks (streamer_slug, link_type) VALUES (?, ?)",
    )
      .bind(streamer_slug, link_type)
      .run();
  } catch (err) {
    console.error("track-click insert failed", err);
    return NextResponse.json({ ok: false });
  }

  return NextResponse.json({ ok: true });
}
