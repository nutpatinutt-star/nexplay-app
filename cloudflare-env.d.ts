declare global {
  interface CloudflareEnv {
    /** Meta Conversions API secret — set via .dev.vars locally, `wrangler secret put` in production. */
    META_CAPI_ACCESS_TOKEN?: string;
    /** Register/LINE click log — see app/api/track-click and app/api/click-report. */
    LINK_CLICKS_DB: D1Database;
    /** Shared secret for the server-to-server /api/click-report read endpoint
     * (the public /api/track-click write endpoint stays unauthenticated —
     * it's called directly from visitors' browsers). Set via .dev.vars
     * locally, `wrangler secret put CLICK_REPORT_API_KEY` in production. */
    CLICK_REPORT_API_KEY?: string;
  }
}

export {};
