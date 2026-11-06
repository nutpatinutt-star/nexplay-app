export const LINKS = {
  register: process.env.NEXT_PUBLIC_REGISTER_URL?.trim() ?? "",
  line: process.env.NEXT_PUBLIC_LINE_OA_URL?.trim() ?? "",
  // Dedicated "Ads" Friend path in LINE OA Manager (Origin point:
  // friend.liveth.org) — used only by the /line pages' go-rotator funnel,
  // so LINE's own Friend-paths analytics can separate Ads-driven adds from
  // organic/livestream ones. Falls back to the regular line link if unset.
  lineAds:
    process.env.NEXT_PUBLIC_LINE_OA_ADS_URL?.trim() ??
    process.env.NEXT_PUBLIC_LINE_OA_URL?.trim() ??
    "",
  claimPromo:
    process.env.NEXT_PUBLIC_CLAIM_PROMO_URL?.trim() ??
    process.env.NEXT_PUBLIC_REGISTER_URL?.trim() ??
    "",
  support:
    process.env.NEXT_PUBLIC_SUPPORT_URL?.trim() ??
    process.env.NEXT_PUBLIC_LINE_OA_URL?.trim() ??
    "",
  facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL?.trim() ?? "",
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL?.trim() ?? "",
  tiktok: process.env.NEXT_PUBLIC_TIKTOK_URL?.trim() ?? "",
  youtube: process.env.NEXT_PUBLIC_YOUTUBE_URL?.trim() ?? "",
  discord: process.env.NEXT_PUBLIC_DISCORD_URL?.trim() ?? "",
  vip: process.env.NEXT_PUBLIC_VIP_URL?.trim() ?? "",
  wallet: process.env.NEXT_PUBLIC_WALLET_URL?.trim() ?? "",
  profile: process.env.NEXT_PUBLIC_PROFILE_URL?.trim() ?? "",
} as const;

export type ExternalLinks = {
  [Key in keyof typeof LINKS]: string;
};

export function externalLinkProps(url: string) {
  if (!url) {
    return {
      href: undefined,
      "aria-disabled": true,
      onClick: (event: React.MouseEvent<HTMLAnchorElement>) =>
        event.preventDefault(),
    };
  }

  return {
    href: url,
    target: "_blank",
    rel: "noopener noreferrer",
  };
}
