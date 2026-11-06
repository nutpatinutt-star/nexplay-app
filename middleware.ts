import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/** Brand subdomain -> existing internal basePath + streamer slug (data/streamers.ts). */
const SUBDOMAIN_STREAMERS: Record<string, { basePath: string; slug: string }> = {
  enjoy: { basePath: "", slug: "nexplay" },
  holden: { basePath: "/holden", slug: "holden" },
  lily: { basePath: "/lily", slug: "lily" },
  ivy: { basePath: "/ivy", slug: "ivy" },
  lilin: { basePath: "/lilin", slug: "lilin" },
  william: { basePath: "/william", slug: "william" },
  ammy: { basePath: "/ammy", slug: "ammy" },
  zen: { basePath: "/zen", slug: "zen" },
  lham: { basePath: "/lham", slug: "lham" },
  kim: { basePath: "/kim", slug: "kim" },
  grace: { basePath: "/grace", slug: "grace" },
  miguel: { basePath: "/miguel", slug: "miguel" },
  top: { basePath: "/top", slug: "top" },
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
  const match = SUBDOMAIN_STREAMERS[subdomain];

  if (!match) return NextResponse.next();

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
