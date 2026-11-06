import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";

/**
 * Server-side leg of Meta Conversions API — mirrors the browser Pixel event
 * fired by lib/metaPixel.ts, sharing the same event_id so Meta dedupes them.
 * Keeps reporting accurate when the browser Pixel is blocked (iOS ITP, ad
 * blockers, Facebook's in-app browser).
 *
 * META_CAPI_ACCESS_TOKEN is a secret — set via `.dev.vars` locally and
 * `wrangler secret put META_CAPI_ACCESS_TOKEN` in production. It lands in the
 * Worker's bindings (getCloudflareContext().env), not plain process.env.
 * Never expose it with a NEXT_PUBLIC_ prefix.
 */

const GRAPH_API_VERSION = "v21.0";

export const dynamic = "force-dynamic";

type CapiRequestBody = {
  eventName?: string;
  eventId?: string;
  customData?: Record<string, unknown>;
  eventSourceUrl?: string;
};

export async function POST(request: NextRequest) {
  const { env } = await getCloudflareContext({ async: true });
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim();
  const accessToken = env.META_CAPI_ACCESS_TOKEN?.trim();

  if (!pixelId || !accessToken) {
    return NextResponse.json({ ok: false, reason: "not_configured" });
  }

  let body: CapiRequestBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, reason: "invalid_body" }, { status: 400 });
  }

  const { eventName, eventId, customData, eventSourceUrl } = body;
  if (!eventName || !eventId) {
    return NextResponse.json({ ok: false, reason: "missing_fields" }, { status: 400 });
  }

  const clientIp =
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const userAgent = request.headers.get("user-agent") ?? undefined;
  const cookieHeader = request.headers.get("cookie") ?? "";
  const fbp = cookieHeader.match(/(?:^|;\s*)_fbp=([^;]+)/)?.[1];
  const fbc = cookieHeader.match(/(?:^|;\s*)_fbc=([^;]+)/)?.[1];

  const payload = {
    data: [
      {
        event_name: eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId,
        event_source_url: eventSourceUrl,
        action_source: "website",
        user_data: {
          client_ip_address: clientIp,
          client_user_agent: userAgent,
          fbp,
          fbc,
        },
        custom_data: customData ?? {},
      },
    ],
  };

  try {
    const res = await fetch(
      `https://graph.facebook.com/${GRAPH_API_VERSION}/${pixelId}/events?access_token=${accessToken}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      },
    );

    if (!res.ok) {
      const errText = await res.text();
      console.error("Meta CAPI error", res.status, errText);
      return NextResponse.json({ ok: false });
    }
  } catch (err) {
    console.error("Meta CAPI request failed", err);
    return NextResponse.json({ ok: false });
  }

  return NextResponse.json({ ok: true });
}
