import { NextResponse } from "next/server";

/**
 * Fired once by InAppBrowserBanner.tsx whenever the mandatory full-screen
 * gate actually renders (i.e. a real visitor was detected inside Facebook/
 * Instagram's in-app browser). Does nothing with the request body — its
 * only job is to exist as a distinct path so Cloudflare's own request logs
 * (queryable via the GraphQL Analytics API by clientRequestPath/Host) tell
 * us exactly how many real visits hit the gate, broken down by streamer and
 * platform. This measures the gate's real-world reach independently of the
 * click-through numbers on /api/meta-capi.
 */
export const dynamic = "force-dynamic";

export async function POST() {
  return NextResponse.json({ ok: true });
}
