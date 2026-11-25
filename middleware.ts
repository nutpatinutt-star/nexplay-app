import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { STREAMERS } from "@/data/streamers";

/** basePath -> slug for streamers reached by PATH on the main domain rather
 * than their own subdomain (e.g. Slade, which has no dedicated subdomain).
 * Without this, the root layout has no way to know which streamer a path
 * request is for (it only reads x-streamer-slug, set below), so it always
 * fell back to the Thai default — wrong <html lang> and, for Slade, it also
 * defeated the Bengali-only font-preload skip in app/layout.tsx, since that
 * branch reads the same header. */
const PATH_STREAMERS: Record<string, string> = Object.fromEntries(
  STREAMERS.filter((s) => s.basePath).map((s) => [s.basePath, s.slug]),
);

/** Brand subdomain -> existing internal basePath + streamer slug (data/streamers.ts). */
const SUBDOMAIN_STREAMERS: Record<string, { basePath: string; slug: string }> = {
  enjoy: { basePath: "", slug: "nexplay" },
  lily: { basePath: "/lily", slug: "lily" },
  lilin: { basePath: "/lilin", slug: "lilin" },
  william: { basePath: "/william", slug: "william" },
  ammy: { basePath: "/ammy", slug: "ammy" },
  zen: { basePath: "/zen", slug: "zen" },
  grace: { basePath: "/grace", slug: "grace" },
  miguel: { basePath: "/miguel", slug: "miguel" },
  top: { basePath: "/top", slug: "top" },
};

/** Streamers whose subdomain/landing page is fully retired (employment
 * ended). Kept as an explicit 404 list — DNS still points these subdomains
 * at the Worker (wildcard *.liveth.net/*.liveth.org), so without this they'd
 * silently fall through to the default (Enjoy) page instead of disappearing. */
const RETIRED_SUBDOMAINS = new Set(["holden", "ivy", "kim", "lham"]);

/** Slade's subdomain, kept OUT of SUBDOMAIN_STREAMERS on purpose: AD_ROTATOR_POOL
 * below is built from that dict's keys, and Slade (Bangladesh/Bengali/Taka) must
 * never be a candidate the Thai go./friend.liveth.net ad rotator can land a Thai
 * visitor on. Merged into `match` lookup only, never into the rotator pool. */
const EXTRA_SUBDOMAIN_STREAMERS: Record<string, { basePath: string; slug: string }> = {
  slade: { basePath: "/slade", slug: "slade" },
};

/** Subdomains ending in this suffix (e.g. holden-bonus.liveth.net) land on the
 * matching streamer's page with the Claim Bonus sheet already open — for LINE OA
 * rich-menu / direct-link use, on the existing wildcard without new DNS records. */
const BONUS_SUFFIX = "-bonus";

/** Ad-campaign links that fan out to a random streamer page per click — lets
 * Ads point at one URL instead of one campaign/ad set per streamer. Pool is
 * exactly the 13 subdomains above. Redirects to the STREAMER'S OWN SUBDOMAIN
 * (e.g. holden.liveth.net), not the bare apex domain — the Worker route is only
 * *.liveth.net/*, so the apex (no subdomain) isn't routed at all and would
 * 000/fail to connect. Runs on the existing wildcard, no new DNS record
 * needed. Plain even random pick, no time-of-day exclusion — that was only
 * ever needed to protect register-click purity, and campaigns now drive to
 * LINE only, so there's no such split left to protect. */
const AD_ROTATORS: Record<string, string> = {
  go: "/",
  friend: "/line",
};
const AD_ROTATOR_POOL = Object.keys(SUBDOMAIN_STREAMERS);

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") ?? "";
  const rawSubdomain = hostname.split(".")[0];

  const rotatorPath = AD_ROTATORS[rawSubdomain];
  if (rotatorPath) {
    const pickedSubdomain =
      AD_ROTATOR_POOL[Math.floor(Math.random() * AD_ROTATOR_POOL.length)];
    const baseDomain = hostname.slice(rawSubdomain.length + 1);
    const url = request.nextUrl.clone();
    url.host = `${pickedSubdomain}.${baseDomain}`;
    url.pathname = rotatorPath;
    const response = NextResponse.redirect(url, 302);
    response.headers.set("Cache-Control", "no-store");
    return response;
  }

  const isBonusLink = rawSubdomain.endsWith(BONUS_SUFFIX);
  const subdomain = isBonusLink
    ? rawSubdomain.slice(0, -BONUS_SUFFIX.length)
    : rawSubdomain;

  if (RETIRED_SUBDOMAINS.has(subdomain)) {
    return new NextResponse(null, { status: 404 });
  }

  const match =
    SUBDOMAIN_STREAMERS[subdomain] ?? EXTRA_SUBDOMAIN_STREAMERS[subdomain];

  if (!match) {
    const { pathname } = request.nextUrl;
    const pathSlug = Object.entries(PATH_STREAMERS).find(([basePath]) =>
      pathname.startsWith(basePath),
    )?.[1];
    if (!pathSlug) return NextResponse.next();

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-streamer-slug", pathSlug);
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-streamer-slug", match.slug);
  if (isBonusLink) requestHeaders.set("x-claim-autoopen", "1");

  const { pathname } = request.nextUrl;
  if (match.basePath && !pathname.startsWith(match.basePath)) {
    const url = request.nextUrl.clone();
    url.pathname = `${match.basePath}${pathname}`;
    return NextResponse.rewrite(url, { request: { headers: requestHeaders } });
  }

  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: [
    "/((?!api/|_next/|favicon.svg|icons.svg|og-v2.png|images/|streamers/).*)",
  ],
};
