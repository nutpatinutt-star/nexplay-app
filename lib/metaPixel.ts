/**
 * Meta (Facebook/Instagram) Pixel — one shared Pixel across every streamer's
 * LD page (not per-streamer like GA4), since a single Ads account/Pixel
 * drives traffic to all of them via the go.liveth.net rotator.
 *
 * Every tracked event fires twice: once client-side via the browser Pixel,
 * and once server-side via the Conversions API (/api/meta-capi), sharing the
 * same event_id so Meta deduplicates them. The CAPI leg keeps reporting even
 * when the browser Pixel is blocked — iOS ITP, ad blockers, Facebook's own
 * in-app browser — which is exactly the gap discussed for measuring Ads vs.
 * organic-live traffic accurately.
 */

export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim() ?? "";

export function isMetaPixelEnabled(): boolean {
  return META_PIXEL_ID.length > 0;
}

type Fbq = ((...args: unknown[]) => void) & {
  queue?: unknown[];
  loaded?: boolean;
  version?: string;
  callMethod?: (...args: unknown[]) => void;
  push?: Fbq;
};

declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

/** Standard Meta Pixel bootstrap stub — queues calls until fbevents.js loads
 * and replaces callMethod, regardless of load order. */
function ensureFbq() {
  if (typeof window === "undefined" || window.fbq) return;

  const fbq: Fbq = function (...args: unknown[]) {
    if (fbq.callMethod) {
      fbq.callMethod(...args);
    } else {
      fbq.queue!.push(args);
    }
  };
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = "2.0";
  fbq.queue = [];

  window.fbq = fbq;
  window._fbq = window._fbq ?? fbq;
}

export function initMetaPixel() {
  if (!isMetaPixelEnabled()) return;
  ensureFbq();
  window.fbq!("init", META_PIXEL_ID);
}

export function trackMetaPageView() {
  if (!isMetaPixelEnabled()) return;
  window.fbq?.("track", "PageView");
}

function randomEventId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

/** Fires a Pixel event in-browser and the matching Conversions API event
 * server-side (fire-and-forget — never blocks the click/navigation). */
export function trackMetaEvent(
  eventName: string,
  customData: Record<string, unknown> = {},
) {
  if (!isMetaPixelEnabled() || typeof window === "undefined") return;

  const eventId = randomEventId();
  window.fbq?.("track", eventName, customData, { eventID: eventId });

  fetch("/api/meta-capi", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    keepalive: true,
    body: JSON.stringify({
      eventName,
      eventId,
      customData,
      eventSourceUrl: window.location.href,
    }),
  }).catch(() => {
    // Best-effort telemetry — never surface a failure to the user.
  });
}
