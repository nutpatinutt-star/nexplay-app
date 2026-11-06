import type { StreamerConfig } from "@/data/streamers";

export type StreamerSlug = StreamerConfig["slug"];

export type AnalyticsPlacement =
  | "hero"
  | "cta_row"
  | "social"
  | "promotion_card"
  | "promotion_list"
  | "bottom_navigation"
  | "follow_page"
  | "search_panel";

type BaseEventParams = {
  streamer_slug: StreamerSlug;
  placement?: AnalyticsPlacement;
};

type ClaimEventParams = {
  streamer_slug: StreamerSlug;
  campaign_public_id: string;
  language: "th" | "en";
};

export type AnalyticsEventMap = {
  register_click: BaseEventParams;
  line_click: BaseEventParams;
  hero_cta_click: BaseEventParams & { destination_type: string };
  promotion_click: BaseEventParams & {
    promotion_id: string;
    promotion_category: string;
  };
  social_follow_click: BaseEventParams & { social_platform: string };
  bottom_navigation_click: BaseEventParams & { navigation_item: string };
  live_schedule_open: BaseEventParams;
  claim_card_view: ClaimEventParams;
  claim_open: ClaimEventParams;
  claim_check_started: ClaimEventParams;
  claim_check_eligible: ClaimEventParams & { result_category: string };
  claim_check_ineligible: ClaimEventParams & { result_category: string };
  claim_submit_started: ClaimEventParams;
  claim_submit_success: ClaimEventParams;
  claim_submit_failed: ClaimEventParams & { result_category: string };
  claim_rate_limited: ClaimEventParams;
  promo_gate_view: BaseEventParams;
  promo_gate_close: BaseEventParams;
};

export type AnalyticsEventName = keyof AnalyticsEventMap;

/** One GA4 property per streamer, so each can later move to its own domain without losing history. */
const GA4_MEASUREMENT_IDS: Record<StreamerSlug, string> = {
  nexplay: process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID_NEXPLAY?.trim() ?? "",
  holden: process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID_HOLDEN?.trim() ?? "",
  lily: process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID_LILLY?.trim() ?? "",
  ivy: process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID_IVY?.trim() ?? "",
  lilin: process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID_LILIN?.trim() ?? "",
  william: process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID_WILLIAM?.trim() ?? "",
  ammy: process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID_AMMY?.trim() ?? "",
  zen: process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID_ZEN?.trim() ?? "",
  lham: process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID_LHAM?.trim() ?? "",
  kim: process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID_KIM?.trim() ?? "",
  grace: process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID_GRACE?.trim() ?? "",
  miguel: process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID_MIGUEL?.trim() ?? "",
  top: process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID_TOP?.trim() ?? "",
};

export function getMeasurementId(slug: StreamerSlug): string {
  return GA4_MEASUREMENT_IDS[slug];
}

export function isAnalyticsEnabledFor(slug: StreamerSlug): boolean {
  return getMeasurementId(slug).length > 0;
}

export function getGtagScriptSrc(slug: StreamerSlug): string | null {
  const measurementId = getMeasurementId(slug);
  return measurementId ? `https://www.googletagmanager.com/gtag/js?id=${measurementId}` : null;
}

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

function pushToDataLayer(...args: unknown[]) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(args);
}

/** Queues the gtag bootstrap commands; safe to call before gtag.js finishes loading. */
export function initGtag(slug: StreamerSlug) {
  const measurementId = getMeasurementId(slug);
  if (!measurementId) return;
  // Without an explicit consent signal, gtag.js defaults to Google Consent
  // Mode's implicit "denied" state on many accounts — the script loads and
  // dataLayer fills up normally, but it never actually sends a hit. This
  // site has no cookie-consent gate, so grant unconditionally.
  pushToDataLayer("consent", "default", {
    ad_storage: "granted",
    ad_user_data: "granted",
    ad_personalization: "granted",
    analytics_storage: "granted",
  });
  pushToDataLayer("js", new Date());
  pushToDataLayer("config", measurementId, { send_page_view: false });
}

export function trackPageView(slug: StreamerSlug, pathname: string) {
  if (!isAnalyticsEnabledFor(slug)) return;
  pushToDataLayer("event", "page_view", {
    page_path: pathname,
    page_location: typeof window !== "undefined" ? window.location.href : undefined,
    page_title: typeof document !== "undefined" ? document.title : undefined,
  });
}

/** Independent click counter (see app/api/track-click), broken down per
 * streamer — built because Meta Ads Manager's own click numbers don't
 * match reality for livestream ad traffic, and because GA4 isn't
 * configured for every streamer yet. Called explicitly alongside
 * trackEvent() at every surface that opens a streamer's register or LINE
 * link (CTA buttons, hero slide CTA, promo card CTA, bottom nav, the LINE
 * social card, the /follow page's LINE button) — not inferred from GA4
 * event names, since those don't all carry the same shape. Fire-and-forget;
 * keepalive lets it survive the page navigation the click itself triggers. */
export function trackLinkClick(
  streamerSlug: StreamerSlug,
  linkType: "visit" | "register" | "line",
) {
  if (typeof window === "undefined") return;
  fetch("/api/track-click", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ streamer_slug: streamerSlug, link_type: linkType }),
    keepalive: true,
  }).catch(() => {});
}

export function trackEvent<Name extends AnalyticsEventName>(
  name: Name,
  params: AnalyticsEventMap[Name],
) {
  if (!isAnalyticsEnabledFor(params.streamer_slug)) return;
  pushToDataLayer("event", name, params);
}
