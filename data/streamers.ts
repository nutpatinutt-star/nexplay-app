import { LINKS, type ExternalLinks } from "@/lib/links";

export type StreamerAction = "line" | "register" | "promotions";

export type StreamerHeroSlide = {
  eyebrow: string;
  title: string;
  highlight: string;
  description: string;
  cta: string;
  action: StreamerAction;
  compact?: boolean;
};

export type StreamerConfig = {
  slug:
    | "nexplay"
    | "holden"
    | "lily"
    | "ivy"
    | "lilin"
    | "william"
    | "ammy"
    | "zen"
    | "nutt"
    | "lham"
    | "kim"
    | "grace"
    | "miguel"
    | "top"
    | "irada";
  name: string;
  displayName: string;
  basePath:
    | ""
    | "/holden"
    | "/lily"
    | "/ivy"
    | "/lilin"
    | "/william"
    | "/ammy"
    | "/zen"
    | "/nutt"
    | "/lham"
    | "/kim"
    | "/grace"
    | "/miguel"
    | "/top"
    | "/irada";
  heroImage: string;
  avatarImage: string;
  heroAlt: string;
  followers: string;
  socialTitle: string;
  theme: {
    accent: string;
    accentDeep: string;
    accentBright: string;
    accentSoft: string;
    accentRgb: string;
    secondaryRgb: string;
  };
  socialFollowers: {
    facebook: string;
    instagram: string;
    tiktok: string;
    line: string;
  };
  links: ExternalLinks;
  heroSlides: StreamerHeroSlide[];
};

const holdenLinks: ExternalLinks = {
  register: process.env.NEXT_PUBLIC_HOLDEN_REGISTER_URL?.trim() ?? "",
  line: process.env.NEXT_PUBLIC_HOLDEN_LINE_OA_URL?.trim() ?? "",
  lineAds:
    process.env.NEXT_PUBLIC_HOLDEN_LINE_OA_ADS_URL?.trim() ??
    process.env.NEXT_PUBLIC_HOLDEN_LINE_OA_URL?.trim() ??
    "",
  claimPromo:
    process.env.NEXT_PUBLIC_HOLDEN_CLAIM_PROMO_URL?.trim() ??
    process.env.NEXT_PUBLIC_HOLDEN_REGISTER_URL?.trim() ??
    "",
  support:
    process.env.NEXT_PUBLIC_HOLDEN_SUPPORT_URL?.trim() ??
    process.env.NEXT_PUBLIC_HOLDEN_LINE_OA_URL?.trim() ??
    "",
  facebook: process.env.NEXT_PUBLIC_HOLDEN_FACEBOOK_URL?.trim() ?? "",
  instagram: process.env.NEXT_PUBLIC_HOLDEN_INSTAGRAM_URL?.trim() ?? "",
  tiktok: process.env.NEXT_PUBLIC_HOLDEN_TIKTOK_URL?.trim() ?? "",
  youtube: "",
  discord: "",
  vip: "",
  wallet: "",
  profile: "",
};

const lilyLinks: ExternalLinks = {
  register: process.env.NEXT_PUBLIC_LILLY_REGISTER_URL?.trim() ?? "",
  line: process.env.NEXT_PUBLIC_LILLY_LINE_OA_URL?.trim() ?? "",
  lineAds:
    process.env.NEXT_PUBLIC_LILLY_LINE_OA_ADS_URL?.trim() ??
    process.env.NEXT_PUBLIC_LILLY_LINE_OA_URL?.trim() ??
    "",
  claimPromo:
    process.env.NEXT_PUBLIC_LILLY_CLAIM_PROMO_URL?.trim() ??
    process.env.NEXT_PUBLIC_LILLY_REGISTER_URL?.trim() ??
    "",
  support:
    process.env.NEXT_PUBLIC_LILLY_SUPPORT_URL?.trim() ??
    process.env.NEXT_PUBLIC_LILLY_LINE_OA_URL?.trim() ??
    "",
  facebook: process.env.NEXT_PUBLIC_LILLY_FACEBOOK_URL?.trim() ?? "",
  instagram: process.env.NEXT_PUBLIC_LILLY_INSTAGRAM_URL?.trim() ?? "",
  tiktok: process.env.NEXT_PUBLIC_LILLY_TIKTOK_URL?.trim() ?? "",
  youtube: "",
  discord: "",
  vip: "",
  wallet: "",
  profile: "",
};

const ivyLinks: ExternalLinks = {
  register: process.env.NEXT_PUBLIC_IVY_REGISTER_URL?.trim() ?? "",
  line: process.env.NEXT_PUBLIC_IVY_LINE_OA_URL?.trim() ?? "",
  lineAds:
    process.env.NEXT_PUBLIC_IVY_LINE_OA_ADS_URL?.trim() ??
    process.env.NEXT_PUBLIC_IVY_LINE_OA_URL?.trim() ??
    "",
  claimPromo:
    process.env.NEXT_PUBLIC_IVY_CLAIM_PROMO_URL?.trim() ??
    process.env.NEXT_PUBLIC_IVY_REGISTER_URL?.trim() ??
    "",
  support:
    process.env.NEXT_PUBLIC_IVY_SUPPORT_URL?.trim() ??
    process.env.NEXT_PUBLIC_IVY_LINE_OA_URL?.trim() ??
    "",
  facebook: process.env.NEXT_PUBLIC_IVY_FACEBOOK_URL?.trim() ?? "",
  instagram: process.env.NEXT_PUBLIC_IVY_INSTAGRAM_URL?.trim() ?? "",
  tiktok: process.env.NEXT_PUBLIC_IVY_TIKTOK_URL?.trim() ?? "",
  youtube: "",
  discord: "",
  vip: "",
  wallet: "",
  profile: "",
};

const lilinLinks: ExternalLinks = {
  register: process.env.NEXT_PUBLIC_LILIN_REGISTER_URL?.trim() ?? "",
  line: process.env.NEXT_PUBLIC_LILIN_LINE_OA_URL?.trim() ?? "",
  lineAds:
    process.env.NEXT_PUBLIC_LILIN_LINE_OA_ADS_URL?.trim() ??
    process.env.NEXT_PUBLIC_LILIN_LINE_OA_URL?.trim() ??
    "",
  claimPromo:
    process.env.NEXT_PUBLIC_LILIN_CLAIM_PROMO_URL?.trim() ??
    process.env.NEXT_PUBLIC_LILIN_REGISTER_URL?.trim() ??
    "",
  support:
    process.env.NEXT_PUBLIC_LILIN_SUPPORT_URL?.trim() ??
    process.env.NEXT_PUBLIC_LILIN_LINE_OA_URL?.trim() ??
    "",
  facebook: process.env.NEXT_PUBLIC_LILIN_FACEBOOK_URL?.trim() ?? "",
  instagram: process.env.NEXT_PUBLIC_LILIN_INSTAGRAM_URL?.trim() ?? "",
  tiktok: process.env.NEXT_PUBLIC_LILIN_TIKTOK_URL?.trim() ?? "",
  youtube: "",
  discord: "",
  vip: "",
  wallet: "",
  profile: "",
};

const williamLinks: ExternalLinks = {
  register: process.env.NEXT_PUBLIC_WILLIAM_REGISTER_URL?.trim() ?? "",
  line: process.env.NEXT_PUBLIC_WILLIAM_LINE_OA_URL?.trim() ?? "",
  lineAds:
    process.env.NEXT_PUBLIC_WILLIAM_LINE_OA_ADS_URL?.trim() ??
    process.env.NEXT_PUBLIC_WILLIAM_LINE_OA_URL?.trim() ??
    "",
  claimPromo:
    process.env.NEXT_PUBLIC_WILLIAM_CLAIM_PROMO_URL?.trim() ??
    process.env.NEXT_PUBLIC_WILLIAM_REGISTER_URL?.trim() ??
    "",
  support:
    process.env.NEXT_PUBLIC_WILLIAM_SUPPORT_URL?.trim() ??
    process.env.NEXT_PUBLIC_WILLIAM_LINE_OA_URL?.trim() ??
    "",
  facebook: process.env.NEXT_PUBLIC_WILLIAM_FACEBOOK_URL?.trim() ?? "",
  instagram: process.env.NEXT_PUBLIC_WILLIAM_INSTAGRAM_URL?.trim() ?? "",
  tiktok: process.env.NEXT_PUBLIC_WILLIAM_TIKTOK_URL?.trim() ?? "",
  youtube: "",
  discord: "",
  vip: "",
  wallet: "",
  profile: "",
};

const ammyLinks: ExternalLinks = {
  register: process.env.NEXT_PUBLIC_AMMY_REGISTER_URL?.trim() ?? "",
  line: process.env.NEXT_PUBLIC_AMMY_LINE_OA_URL?.trim() ?? "",
  lineAds:
    process.env.NEXT_PUBLIC_AMMY_LINE_OA_ADS_URL?.trim() ??
    process.env.NEXT_PUBLIC_AMMY_LINE_OA_URL?.trim() ??
    "",
  claimPromo:
    process.env.NEXT_PUBLIC_AMMY_CLAIM_PROMO_URL?.trim() ??
    process.env.NEXT_PUBLIC_AMMY_REGISTER_URL?.trim() ??
    "",
  support:
    process.env.NEXT_PUBLIC_AMMY_SUPPORT_URL?.trim() ??
    process.env.NEXT_PUBLIC_AMMY_LINE_OA_URL?.trim() ??
    "",
  facebook: process.env.NEXT_PUBLIC_AMMY_FACEBOOK_URL?.trim() ?? "",
  instagram: process.env.NEXT_PUBLIC_AMMY_INSTAGRAM_URL?.trim() ?? "",
  tiktok: process.env.NEXT_PUBLIC_AMMY_TIKTOK_URL?.trim() ?? "",
  youtube: "",
  discord: "",
  vip: "",
  wallet: "",
  profile: "",
};

const zenLinks: ExternalLinks = {
  register: process.env.NEXT_PUBLIC_ZEN_REGISTER_URL?.trim() ?? "",
  line: process.env.NEXT_PUBLIC_ZEN_LINE_OA_URL?.trim() ?? "",
  lineAds:
    process.env.NEXT_PUBLIC_ZEN_LINE_OA_ADS_URL?.trim() ??
    process.env.NEXT_PUBLIC_ZEN_LINE_OA_URL?.trim() ??
    "",
  claimPromo:
    process.env.NEXT_PUBLIC_ZEN_CLAIM_PROMO_URL?.trim() ??
    process.env.NEXT_PUBLIC_ZEN_REGISTER_URL?.trim() ??
    "",
  support:
    process.env.NEXT_PUBLIC_ZEN_SUPPORT_URL?.trim() ??
    process.env.NEXT_PUBLIC_ZEN_LINE_OA_URL?.trim() ??
    "",
  facebook: process.env.NEXT_PUBLIC_ZEN_FACEBOOK_URL?.trim() ?? "",
  instagram: process.env.NEXT_PUBLIC_ZEN_INSTAGRAM_URL?.trim() ?? "",
  tiktok: process.env.NEXT_PUBLIC_ZEN_TIKTOK_URL?.trim() ?? "",
  youtube: "",
  discord: "",
  vip: "",
  wallet: "",
  profile: "",
};

const nuttLinks: ExternalLinks = {
  register: process.env.NEXT_PUBLIC_NUTT_REGISTER_URL?.trim() ?? "",
  line: process.env.NEXT_PUBLIC_NUTT_LINE_OA_URL?.trim() ?? "",
  lineAds:
    process.env.NEXT_PUBLIC_NUTT_LINE_OA_ADS_URL?.trim() ??
    process.env.NEXT_PUBLIC_NUTT_LINE_OA_URL?.trim() ??
    "",
  claimPromo:
    process.env.NEXT_PUBLIC_NUTT_CLAIM_PROMO_URL?.trim() ??
    process.env.NEXT_PUBLIC_NUTT_REGISTER_URL?.trim() ??
    "",
  support:
    process.env.NEXT_PUBLIC_NUTT_SUPPORT_URL?.trim() ??
    process.env.NEXT_PUBLIC_NUTT_LINE_OA_URL?.trim() ??
    "",
  facebook: process.env.NEXT_PUBLIC_NUTT_FACEBOOK_URL?.trim() ?? "",
  instagram: process.env.NEXT_PUBLIC_NUTT_INSTAGRAM_URL?.trim() ?? "",
  tiktok: process.env.NEXT_PUBLIC_NUTT_TIKTOK_URL?.trim() ?? "",
  youtube: "",
  discord: "",
  vip: "",
  wallet: "",
  profile: "",
};

const lhamLinks: ExternalLinks = {
  register: process.env.NEXT_PUBLIC_LHAM_REGISTER_URL?.trim() ?? "",
  line: process.env.NEXT_PUBLIC_LHAM_LINE_OA_URL?.trim() ?? "",
  lineAds:
    process.env.NEXT_PUBLIC_LHAM_LINE_OA_ADS_URL?.trim() ??
    process.env.NEXT_PUBLIC_LHAM_LINE_OA_URL?.trim() ??
    "",
  claimPromo:
    process.env.NEXT_PUBLIC_LHAM_CLAIM_PROMO_URL?.trim() ??
    process.env.NEXT_PUBLIC_LHAM_REGISTER_URL?.trim() ??
    "",
  support:
    process.env.NEXT_PUBLIC_LHAM_SUPPORT_URL?.trim() ??
    process.env.NEXT_PUBLIC_LHAM_LINE_OA_URL?.trim() ??
    "",
  facebook: process.env.NEXT_PUBLIC_LHAM_FACEBOOK_URL?.trim() ?? "",
  instagram: process.env.NEXT_PUBLIC_LHAM_INSTAGRAM_URL?.trim() ?? "",
  tiktok: process.env.NEXT_PUBLIC_LHAM_TIKTOK_URL?.trim() ?? "",
  youtube: "",
  discord: "",
  vip: "",
  wallet: "",
  profile: "",
};

const kimLinks: ExternalLinks = {
  register: process.env.NEXT_PUBLIC_KIM_REGISTER_URL?.trim() ?? "",
  line: process.env.NEXT_PUBLIC_KIM_LINE_OA_URL?.trim() ?? "",
  lineAds:
    process.env.NEXT_PUBLIC_KIM_LINE_OA_ADS_URL?.trim() ??
    process.env.NEXT_PUBLIC_KIM_LINE_OA_URL?.trim() ??
    "",
  claimPromo:
    process.env.NEXT_PUBLIC_KIM_CLAIM_PROMO_URL?.trim() ??
    process.env.NEXT_PUBLIC_KIM_REGISTER_URL?.trim() ??
    "",
  support:
    process.env.NEXT_PUBLIC_KIM_SUPPORT_URL?.trim() ??
    process.env.NEXT_PUBLIC_KIM_LINE_OA_URL?.trim() ??
    "",
  facebook: process.env.NEXT_PUBLIC_KIM_FACEBOOK_URL?.trim() ?? "",
  instagram: process.env.NEXT_PUBLIC_KIM_INSTAGRAM_URL?.trim() ?? "",
  tiktok: process.env.NEXT_PUBLIC_KIM_TIKTOK_URL?.trim() ?? "",
  youtube: "",
  discord: "",
  vip: "",
  wallet: "",
  profile: "",
};

const graceLinks: ExternalLinks = {
  register: process.env.NEXT_PUBLIC_GRACE_REGISTER_URL?.trim() ?? "",
  line: process.env.NEXT_PUBLIC_GRACE_LINE_OA_URL?.trim() ?? "",
  lineAds:
    process.env.NEXT_PUBLIC_GRACE_LINE_OA_ADS_URL?.trim() ??
    process.env.NEXT_PUBLIC_GRACE_LINE_OA_URL?.trim() ??
    "",
  claimPromo:
    process.env.NEXT_PUBLIC_GRACE_CLAIM_PROMO_URL?.trim() ??
    process.env.NEXT_PUBLIC_GRACE_REGISTER_URL?.trim() ??
    "",
  support:
    process.env.NEXT_PUBLIC_GRACE_SUPPORT_URL?.trim() ??
    process.env.NEXT_PUBLIC_GRACE_LINE_OA_URL?.trim() ??
    "",
  facebook: process.env.NEXT_PUBLIC_GRACE_FACEBOOK_URL?.trim() ?? "",
  instagram: process.env.NEXT_PUBLIC_GRACE_INSTAGRAM_URL?.trim() ?? "",
  tiktok: process.env.NEXT_PUBLIC_GRACE_TIKTOK_URL?.trim() ?? "",
  youtube: "",
  discord: "",
  vip: "",
  wallet: "",
  profile: "",
};

const miguelLinks: ExternalLinks = {
  register: process.env.NEXT_PUBLIC_MIGUEL_REGISTER_URL?.trim() ?? "",
  line: process.env.NEXT_PUBLIC_MIGUEL_LINE_OA_URL?.trim() ?? "",
  lineAds:
    process.env.NEXT_PUBLIC_MIGUEL_LINE_OA_ADS_URL?.trim() ??
    process.env.NEXT_PUBLIC_MIGUEL_LINE_OA_URL?.trim() ??
    "",
  claimPromo:
    process.env.NEXT_PUBLIC_MIGUEL_CLAIM_PROMO_URL?.trim() ??
    process.env.NEXT_PUBLIC_MIGUEL_REGISTER_URL?.trim() ??
    "",
  support:
    process.env.NEXT_PUBLIC_MIGUEL_SUPPORT_URL?.trim() ??
    process.env.NEXT_PUBLIC_MIGUEL_LINE_OA_URL?.trim() ??
    "",
  facebook: process.env.NEXT_PUBLIC_MIGUEL_FACEBOOK_URL?.trim() ?? "",
  instagram: process.env.NEXT_PUBLIC_MIGUEL_INSTAGRAM_URL?.trim() ?? "",
  tiktok: process.env.NEXT_PUBLIC_MIGUEL_TIKTOK_URL?.trim() ?? "",
  youtube: "",
  discord: "",
  vip: "",
  wallet: "",
  profile: "",
};

const topLinks: ExternalLinks = {
  register: process.env.NEXT_PUBLIC_TOP_REGISTER_URL?.trim() ?? "",
  line: process.env.NEXT_PUBLIC_TOP_LINE_OA_URL?.trim() ?? "",
  lineAds:
    process.env.NEXT_PUBLIC_TOP_LINE_OA_ADS_URL?.trim() ??
    process.env.NEXT_PUBLIC_TOP_LINE_OA_URL?.trim() ??
    "",
  claimPromo:
    process.env.NEXT_PUBLIC_TOP_CLAIM_PROMO_URL?.trim() ??
    process.env.NEXT_PUBLIC_TOP_REGISTER_URL?.trim() ??
    "",
  support:
    process.env.NEXT_PUBLIC_TOP_SUPPORT_URL?.trim() ??
    process.env.NEXT_PUBLIC_TOP_LINE_OA_URL?.trim() ??
    "",
  facebook: process.env.NEXT_PUBLIC_TOP_FACEBOOK_URL?.trim() ?? "",
  instagram: process.env.NEXT_PUBLIC_TOP_INSTAGRAM_URL?.trim() ?? "",
  tiktok: process.env.NEXT_PUBLIC_TOP_TIKTOK_URL?.trim() ?? "",
  youtube: "",
  discord: "",
  vip: "",
  wallet: "",
  profile: "",
};

const iradaLinks: ExternalLinks = {
  register: process.env.NEXT_PUBLIC_IRADA_REGISTER_URL?.trim() ?? "",
  line: process.env.NEXT_PUBLIC_IRADA_LINE_OA_URL?.trim() ?? "",
  lineAds:
    process.env.NEXT_PUBLIC_IRADA_LINE_OA_ADS_URL?.trim() ??
    process.env.NEXT_PUBLIC_IRADA_LINE_OA_URL?.trim() ??
    "",
  claimPromo:
    process.env.NEXT_PUBLIC_IRADA_CLAIM_PROMO_URL?.trim() ??
    process.env.NEXT_PUBLIC_IRADA_REGISTER_URL?.trim() ??
    "",
  support:
    process.env.NEXT_PUBLIC_IRADA_SUPPORT_URL?.trim() ??
    process.env.NEXT_PUBLIC_IRADA_LINE_OA_URL?.trim() ??
    "",
  facebook: process.env.NEXT_PUBLIC_IRADA_FACEBOOK_URL?.trim() ?? "",
  instagram: process.env.NEXT_PUBLIC_IRADA_INSTAGRAM_URL?.trim() ?? "",
  tiktok: process.env.NEXT_PUBLIC_IRADA_TIKTOK_URL?.trim() ?? "",
  youtube: "",
  discord: "",
  vip: "",
  wallet: "",
  profile: "",
};

const sharedSlides = {
  member: {
    eyebrow: "สมาชิกใหม่",
    title: "เริ่มสนุกวันนี้",
    highlight: "รับโบนัสสูงสุด 2,000",
    description: "สิทธิพิเศษสำหรับสมาชิกใหม่\nสมัครง่าย ใช้งานได้ทันที",
    cta: "สมัครสมาชิก",
    action: "register",
    compact: true,
  },
  rewards: {
    eyebrow: "NEXPLAY REWARDS",
    title: "โบนัสอัปเดต",
    highlight: "มีให้ลุ้นทุกวัน",
    description: "รวมโปรเด็ด เครดิตฟรี และ VIP\nเลือกสิทธิ์ที่เหมาะกับคุณ",
    cta: "ดูโปรโมชั่น",
    action: "promotions",
  },
} satisfies Record<string, StreamerHeroSlide>;

/** Flip to `false` when Halloween is over to restore Enjoy's original
 * purple/gold look in one line — no need to re-enter any values by hand.
 * Both asset sets and both copy/theme blocks below are kept side by side
 * on purpose so nothing from the "before" version is ever lost.
 * Also read by components/CTAButtons.tsx and components/AppFrame.tsx
 * (ghost icon, "สมัครเลย" label) and by the `[data-seasonal="halloween"]`
 * CSS in app/globals.css (dark page/header/nav/social-card overrides) —
 * flipping this one constant reverts all of those together. */
export const NEXPLAY_HALLOWEEN_MODE = true;

/* Enjoy-exclusive new card/button art (pink neon register/LINE buttons,
 * social cards, bottom nav, VIP/deposit promo art) requested directly —
 * not part of the Halloween theme, not shared with any other streamer.
 * Read by AppFrame.tsx (sets data-enjoy-cards="pink" on .app-shell, only
 * for nexplay) and the `[data-enjoy-cards="pink"]` CSS in
 * app/globals.css. That selector is deliberately NOT the
 * `[data-seasonal="halloween"]` one scripts/sync-streamer-enjoy-ui.mjs
 * clones for other streamers, so this never leaks past Enjoy. Flip to
 * false to go back to the shared Halloween-tier art immediately. */
export const NEXPLAY_PINK_CARDS_MODE = true;

const NEXPLAY_DEFAULT_LOOK = {
  heroImage: "/streamers/nexplay/hero-default.png",
  avatarImage: "/streamers/nexplay/avatar-default.png",
  heroAlt: "NEXPLAY ไลฟ์สดโทนม่วงทองอ่อน สตรีมเมอร์ผลงานอันดับหนึ่งของเครือข่าย",
  socialTitle: "ติดตามเอนจอย",
  theme: {
    accent: "#8B5CF6",
    accentDeep: "#5B21B6",
    accentBright: "#C4B5FD",
    accentSoft: "#F5F3FF",
    accentRgb: "139, 92, 246",
    secondaryRgb: "252, 211, 77",
  },
  heroSlide: {
    eyebrow: "กำลังไลฟ์",
    title: "ไลฟ์สดทุกวัน",
    highlight: "ลุ้นโบนัสทันใจ",
  },
} as const;

const NEXPLAY_HALLOWEEN_LOOK = {
  heroImage: "/streamers/nexplay/hero-halloween.png",
  avatarImage: "/streamers/nexplay/avatar-halloween.png",
  heroAlt:
    "NEXPLAY ธีมฮาโลวีน ชุดแม่มดปีกค้างคาวโทนม่วง-ส้มฟักทอง สตรีมเมอร์ผลงานอันดับหนึ่งของเครือข่าย",
  socialTitle: "ติดตามของฉัน",
  theme: {
    accent: "#7C3AED",
    accentDeep: "#2E1065",
    accentBright: "#C084FC",
    accentSoft: "#F5F3FF",
    accentRgb: "124, 58, 237",
    secondaryRgb: "249, 115, 22",
  },
  heroSlide: {
    eyebrow: "4.8K กำลังดู",
    title: "เริ่มสนุกวันนี้",
    highlight: "รับโบนัสสุดพิเศษ",
  },
} as const;

/* Post-Halloween: back to Enjoy's own hero photo/background, but the
 * shared card/button/nav/social Halloween styling stays (NEXPLAY_HALLOWEEN_MODE
 * is still true, which is what usesEnjoyHalloweenUi() reads) — see
 * app/globals.css for the matching per-streamer background-image removals. */
const nexplayLook = NEXPLAY_DEFAULT_LOOK;

export const DEFAULT_STREAMER: StreamerConfig = {
  slug: "nexplay",
  name: "NEXPLAY",
  displayName: "ENJOY LIVE",
  basePath: "",
  heroImage: nexplayLook.heroImage,
  avatarImage: nexplayLook.avatarImage,
  heroAlt: nexplayLook.heroAlt,
  followers: "78พัน+ ผู้ติดตาม",
  socialTitle: nexplayLook.socialTitle,
  theme: nexplayLook.theme,
  socialFollowers: {
    facebook: "128K ผู้ติดตาม",
    instagram: "86.4K ผู้ติดตาม",
    tiktok: "214K ผู้ติดตาม",
    line: "95.7K เพื่อน",
  },
  links: LINKS,
  heroSlides: [
    {
      eyebrow: nexplayLook.heroSlide.eyebrow,
      title: nexplayLook.heroSlide.title,
      highlight: nexplayLook.heroSlide.highlight,
      description: "ลุ้นได้ทุกวันและโบนัสไม่อั้น\n1–3 PM · 7–9 PM",
      cta: "เข้าไลฟ์ตอนนี้",
      action: "line",
    },
    sharedSlides.member,
    sharedSlides.rewards,
  ],
};

/** Keep Holden's original blue look available for a one-flag revert. */
export const HOLDEN_HALLOWEEN_MODE = true;

const HOLDEN_DEFAULT_LOOK = {
  heroImage: "/streamers/holden/hero.webp",
  avatarImage: "/streamers/holden/avatar.webp",
  heroAlt: "Holden พร้อมกล่องสมบัติคริสตัลสีน้ำเงิน",
  heroTitle: "ไลฟ์สดกับ Holden",
  heroHighlight: "สนุกและลุ้นทุกวัน",
  theme: {
    accent: "#2563eb",
    accentDeep: "#1746a2",
    accentBright: "#60a5fa",
    accentSoft: "#dbeafe",
    accentRgb: "37, 99, 235",
    secondaryRgb: "6, 182, 212",
  },
} as const;

const HOLDEN_HALLOWEEN_LOOK = {
  heroImage: "/streamers/holden/hero-halloween.webp",
  avatarImage: "/streamers/holden/hero-halloween.webp",
  heroAlt: "Holden ในชุดนักบวชฮาโลวีนหน้าวิหารโกธิก แสงจันทร์และฟักทองเรืองแสง",
  heroTitle: NEXPLAY_HALLOWEEN_LOOK.heroSlide.title,
  heroHighlight: NEXPLAY_HALLOWEEN_LOOK.heroSlide.highlight,
  theme: NEXPLAY_HALLOWEEN_LOOK.theme,
} as const;

/* Post-Halloween: back to Holden's own hero photo/background; shared
 * card/button/nav/social styling stays (see nexplayLook above). */
const holdenLook = HOLDEN_DEFAULT_LOOK;

export const HOLDEN_STREAMER: StreamerConfig = {
  slug: "holden",
  name: "HOLDEN",
  displayName: "HOLDEN LIVE",
  basePath: "/holden",
  heroImage: holdenLook.heroImage,
  avatarImage: holdenLook.avatarImage,
  heroAlt: holdenLook.heroAlt,
  followers: "ติดตาม Holden",
  socialTitle: "ติดตาม Holden",
  theme: holdenLook.theme,
  socialFollowers: {
    facebook: "ติดตาม Holden",
    instagram: "ติดตาม Holden",
    tiktok: "ติดตาม Holden",
    line: "เพิ่มเพื่อน",
  },
  links: holdenLinks,
  heroSlides: [
    {
      eyebrow: "HOLDEN LIVE",
      title: holdenLook.heroTitle,
      highlight: holdenLook.heroHighlight,
      description: "พูดคุยสด พร้อมกิจกรรมพิเศษ\n1–3 PM · 7–9 PM",
      cta: "เข้าไลฟ์ตอนนี้",
      action: "line",
    },
    {
      ...sharedSlides.member,
      highlight: "รับโบนัสสูงสุด 2,000",
    },
    { ...sharedSlides.rewards, eyebrow: "HOLDEN REWARDS" },
  ],
};

/* Lily — reversible Halloween mode, same shared Enjoy-tier UI as the other
 * Halloween streamers (cards, buttons, nav, social-card art are Enjoy's
 * assets, synced via scripts/sync-streamer-enjoy-ui.mjs). Only the hero
 * photo and the page-background image are Lily's own — her background is
 * shared with Lilin's (same new scene, per request). Flip
 * LILY_HALLOWEEN_MODE to false to revert to the original cyber-bunny look. */
export const LILY_HALLOWEEN_MODE = true;

const LILY_DEFAULT_LOOK = {
  heroImage: "/streamers/lilly/hero.png",
  avatarImage: "/streamers/lilly/avatar.webp",
  heroAlt: "Lily ใส่หูกระต่ายในธีม Sweet Cyber Bunny แสงนีออนชมพู-ม่วง",
  heroTitle: "ไลฟ์สดกับ Lily",
  heroHighlight: "สนุกสดใสทุกวัน",
  theme: {
    accent: "#D9234E",
    accentDeep: "#7A1648",
    accentBright: "#FF4F9A",
    accentSoft: "#FFD6E7",
    accentRgb: "217, 35, 78",
    secondaryRgb: "255, 79, 154",
  },
} as const;

const LILY_HALLOWEEN_LOOK = {
  heroImage: "/streamers/lily/hero-halloween.webp",
  avatarImage: "/streamers/lily/hero-halloween.webp",
  heroAlt: "Lily ในชุดปีศาจสาวสีดำ-แดง ห้องสตรีมตกแต่งฮาโลวีนพร้อมฟักทองและจันทร์เต็มดวง",
  heroTitle: NEXPLAY_HALLOWEEN_LOOK.heroSlide.title,
  heroHighlight: NEXPLAY_HALLOWEEN_LOOK.heroSlide.highlight,
  theme: NEXPLAY_HALLOWEEN_LOOK.theme,
} as const;

/* Post-Halloween: back to Lily's own hero photo/background; shared
 * card/button/nav/social styling stays (see nexplayLook above). */
const lilyLook = LILY_DEFAULT_LOOK;

export const LILY_STREAMER: StreamerConfig = {
  slug: "lily",
  name: "LILY",
  displayName: "LILY LIVE",
  basePath: "/lily",
  heroImage: lilyLook.heroImage,
  avatarImage: lilyLook.avatarImage,
  heroAlt: lilyLook.heroAlt,
  followers: "ติดตาม Lily",
  socialTitle: "ติดตาม Lily",
  theme: lilyLook.theme,
  socialFollowers: {
    facebook: "ติดตาม Lily",
    instagram: "ติดตาม Lily",
    tiktok: "ติดตาม Lily",
    line: "เพิ่มเพื่อน",
  },
  links: lilyLinks,
  heroSlides: [
    {
      eyebrow: "LILY LIVE",
      title: lilyLook.heroTitle,
      highlight: lilyLook.heroHighlight,
      description: "พูดคุยสด พร้อมกิจกรรมพิเศษ\n1–3 PM · 7–9 PM",
      cta: "เข้าไลฟ์ตอนนี้",
      action: "line",
    },
    {
      ...sharedSlides.member,
      highlight: "รับโบนัสสูงสุด 2,000",
    },
    sharedSlides.rewards,
  ],
};

/* Ivy — reversible Halloween mode, same shared Enjoy-tier UI as the other
 * Halloween streamers (cards, buttons, nav, social-card art are Enjoy's
 * assets, synced via scripts/sync-streamer-enjoy-ui.mjs). Only the hero
 * photo and the page-background image are Ivy's own — her background is
 * reused from Kim's scene per request. Flip IVY_HALLOWEEN_MODE to false to
 * revert to the original moss-amber look. */
export const IVY_HALLOWEEN_MODE = true;

const IVY_DEFAULT_LOOK = {
  heroImage: "/streamers/ivy/hero.png",
  avatarImage: "/streamers/ivy/avatar.png",
  heroAlt: "Ivy ในธีม Midnight Lichen & Saffron Glass โทนเขียวมอส-อำพันทอง",
  heroTitle: "ไลฟ์สดกับ Ivy",
  heroHighlight: "สนุกหรูทุกวัน",
  theme: {
    accent: "#D89538",
    accentDeep: "#9A6846",
    accentBright: "#E8B563",
    accentSoft: "#F5E4C9",
    accentRgb: "216, 149, 56",
    secondaryRgb: "24, 78, 82",
  },
} as const;

const IVY_HALLOWEEN_LOOK = {
  heroImage: "/streamers/ivy/hero-halloween.webp",
  avatarImage: "/streamers/ivy/hero-halloween.webp",
  heroAlt: "Ivy ในชุดฮาโลวีนเสื้อคลุมแดงมีฮู้ด นั่งหน้าปราสาทใต้พระจันทร์สีเลือด",
  heroTitle: NEXPLAY_HALLOWEEN_LOOK.heroSlide.title,
  heroHighlight: NEXPLAY_HALLOWEEN_LOOK.heroSlide.highlight,
  theme: NEXPLAY_HALLOWEEN_LOOK.theme,
} as const;

/* Post-Halloween: back to Ivy's own hero photo/background; shared
 * card/button/nav/social styling stays (see nexplayLook above). */
const ivyLook = IVY_DEFAULT_LOOK;

export const IVY_STREAMER: StreamerConfig = {
  slug: "ivy",
  name: "IVY",
  displayName: "IVY LIVE",
  basePath: "/ivy",
  heroImage: ivyLook.heroImage,
  avatarImage: ivyLook.avatarImage,
  heroAlt: ivyLook.heroAlt,
  followers: "ติดตาม Ivy",
  socialTitle: "ติดตาม Ivy",
  theme: ivyLook.theme,
  socialFollowers: {
    facebook: "ติดตาม Ivy",
    instagram: "ติดตาม Ivy",
    tiktok: "ติดตาม Ivy",
    line: "เพิ่มเพื่อน",
  },
  links: ivyLinks,
  heroSlides: [
    {
      eyebrow: "IVY LIVE",
      title: ivyLook.heroTitle,
      highlight: ivyLook.heroHighlight,
      description: "พูดคุยสด พร้อมกิจกรรมพิเศษ\n1–3 PM · 7–9 PM",
      cta: "เข้าไลฟ์ตอนนี้",
      action: "line",
    },
    {
      ...sharedSlides.member,
      highlight: "รับโบนัสสูงสุด 2,000",
    },
    sharedSlides.rewards,
  ],
};

/* Lilin — reversible Halloween mode, same shared Enjoy-tier UI as the
 * other Halloween streamers (cards, buttons, nav, social-card art are
 * Enjoy's assets, synced via scripts/sync-streamer-enjoy-ui.mjs). Only the
 * hero photo and the page-background image are Lilin's own — her
 * background is shared with Lily's (same new scene, per request). Flip
 * LILIN_HALLOWEEN_MODE to false to revert to the original pastel-purple
 * look. */
export const LILIN_HALLOWEEN_MODE = true;

const LILIN_DEFAULT_LOOK = {
  heroImage: "/streamers/lilin/hero.png",
  avatarImage: "/streamers/lilin/avatar.png",
  heroAlt: "Lilin ในห้องสตรีมมิ่งโทนม่วงชมพูพาสเทล บรรยากาศหวาน ๆ",
  heroTitle: "ไลฟ์สดกับ Lilin",
  heroHighlight: "หรูสดใสทุกวัน",
  theme: {
    accent: "#A855F7",
    accentDeep: "#6B21A8",
    accentBright: "#E879F9",
    accentSoft: "#FAE8FF",
    accentRgb: "168, 85, 247",
    secondaryRgb: "244, 114, 182",
  },
} as const;

const LILIN_HALLOWEEN_LOOK = {
  heroImage: "/streamers/lilin/hero-halloween.webp",
  avatarImage: "/streamers/lilin/hero-halloween.webp",
  heroAlt: "Lilin ในชุดปีศาจสาวสีดำ-แดง ห้องสตรีมตกแต่งฮาโลวีนพร้อมฟักทองและจันทร์เต็มดวง",
  heroTitle: NEXPLAY_HALLOWEEN_LOOK.heroSlide.title,
  heroHighlight: NEXPLAY_HALLOWEEN_LOOK.heroSlide.highlight,
  theme: NEXPLAY_HALLOWEEN_LOOK.theme,
} as const;

/* Post-Halloween: back to Lilin's own hero photo/background; shared
 * card/button/nav/social styling stays (see nexplayLook above). */
const lilinLook = LILIN_DEFAULT_LOOK;

export const LILIN_STREAMER: StreamerConfig = {
  slug: "lilin",
  name: "LILIN",
  displayName: "LILIN LIVE",
  basePath: "/lilin",
  heroImage: lilinLook.heroImage,
  avatarImage: lilinLook.avatarImage,
  heroAlt: lilinLook.heroAlt,
  followers: "ติดตาม Lilin",
  socialTitle: "ติดตาม Lilin",
  theme: lilinLook.theme,
  socialFollowers: {
    facebook: "ติดตาม Lilin",
    instagram: "ติดตาม Lilin",
    tiktok: "ติดตาม Lilin",
    line: "เพิ่มเพื่อน",
  },
  links: lilinLinks,
  heroSlides: [
    {
      eyebrow: "LILIN LIVE",
      title: lilinLook.heroTitle,
      highlight: lilinLook.heroHighlight,
      description: "พูดคุยสด พร้อมกิจกรรมพิเศษ\n1–3 PM · 7–9 PM",
      cta: "เข้าไลฟ์ตอนนี้",
      action: "line",
    },
    {
      ...sharedSlides.member,
      highlight: "รับโบนัสสูงสุด 2,000",
    },
    sharedSlides.rewards,
  ],
};

/* William — reversible Halloween mode, same shared Enjoy-tier UI as the
 * other Halloween streamers (cards, buttons, nav, social-card art are
 * Enjoy's assets, synced via scripts/sync-streamer-enjoy-ui.mjs). Only the
 * hero photo and the page-background image are William's own — his
 * background is reused from Top's scene per request. Flip
 * WILLIAM_HALLOWEEN_MODE to false to revert to the original copper-fire
 * look. */
export const WILLIAM_HALLOWEEN_MODE = true;

const WILLIAM_DEFAULT_LOOK = {
  heroImage: "/streamers/william/hero.png",
  avatarImage: "/streamers/william/avatar.png",
  heroAlt: "William พร้อมกล่องสมบัติเพลิงทองแดง",
  heroTitle: "ไลฟ์สดกับ William",
  heroHighlight: "ดุดันทุกวัน",
  theme: {
    accent: "#FF6B00",
    accentDeep: "#C65D21",
    accentBright: "#FF8A1F",
    accentSoft: "#FFE4CC",
    accentRgb: "255, 107, 0",
    secondaryRgb: "203, 213, 225",
  },
} as const;

const WILLIAM_HALLOWEEN_LOOK = {
  heroImage: "/streamers/william/hero-halloween.webp",
  avatarImage: "/streamers/william/hero-halloween.webp",
  heroAlt: "William ในชุดสูทฮาโลวีนปักลายดำ-เงิน นั่งหน้าปราสาทยามค่ำคืน",
  heroTitle: NEXPLAY_HALLOWEEN_LOOK.heroSlide.title,
  heroHighlight: NEXPLAY_HALLOWEEN_LOOK.heroSlide.highlight,
  theme: NEXPLAY_HALLOWEEN_LOOK.theme,
} as const;

/* Post-Halloween: back to William's own hero photo/background; shared
 * card/button/nav/social styling stays (see nexplayLook above). */
const williamLook = WILLIAM_DEFAULT_LOOK;

export const WILLIAM_STREAMER: StreamerConfig = {
  slug: "william",
  name: "WILLIAM",
  displayName: "WILLIAM LIVE",
  basePath: "/william",
  heroImage: williamLook.heroImage,
  avatarImage: williamLook.avatarImage,
  heroAlt: williamLook.heroAlt,
  followers: "ติดตาม William",
  socialTitle: "ติดตาม William",
  theme: williamLook.theme,
  socialFollowers: {
    facebook: "ติดตาม William",
    instagram: "ติดตาม William",
    tiktok: "ติดตาม William",
    line: "เพิ่มเพื่อน",
  },
  links: williamLinks,
  heroSlides: [
    {
      eyebrow: "WILLIAM LIVE",
      title: williamLook.heroTitle,
      highlight: williamLook.heroHighlight,
      description: "พูดคุยสด พร้อมกิจกรรมพิเศษ\n1–3 PM · 7–9 PM",
      cta: "เข้าไลฟ์ตอนนี้",
      action: "line",
    },
    {
      ...sharedSlides.member,
      highlight: "รับโบนัสสูงสุด 2,000",
    },
    sharedSlides.rewards,
  ],
};

/* Ammy — reversible Halloween mode, same shared Enjoy-tier UI as the
 * other Halloween streamers (cards, buttons, nav, social-card art are
 * Enjoy's assets, synced via scripts/sync-streamer-enjoy-ui.mjs). Only the
 * hero photo is Ammy's own — her page-background is reused from Nutt's
 * scene per request (no new background image was supplied). Flip
 * AMMY_HALLOWEEN_MODE to false to revert to the original turquoise-lavender
 * aurora look. */
export const AMMY_HALLOWEEN_MODE = true;

const AMMY_DEFAULT_LOOK = {
  heroImage: "/streamers/ammy/hero.png",
  avatarImage: "/streamers/ammy/avatar.png",
  heroAlt: "Ammy ในธีม Opal Aurora แสงออโรร่าเทอร์ควอยซ์-ลาเวนเดอร์",
  heroTitle: "ไลฟ์สดกับ Ammy",
  heroHighlight: "หวานใสทุกวัน",
  theme: {
    accent: "#57E0D1",
    accentDeep: "#073B45",
    accentBright: "#7DE9F2",
    accentSoft: "#E9F3F2",
    accentRgb: "87, 224, 209",
    secondaryRgb: "183, 164, 244",
  },
} as const;

const AMMY_HALLOWEEN_LOOK = {
  heroImage: "/streamers/ammy/hero-halloween.webp",
  avatarImage: "/streamers/ammy/hero-halloween.webp",
  heroAlt: "Ammy ในชุดฮาโลวีนลูกไม้ดำ-ส้ม นอนในห้องตกแต่งฟักทองและเทียนไฟ",
  heroTitle: NEXPLAY_HALLOWEEN_LOOK.heroSlide.title,
  heroHighlight: NEXPLAY_HALLOWEEN_LOOK.heroSlide.highlight,
  theme: NEXPLAY_HALLOWEEN_LOOK.theme,
} as const;

/* Post-Halloween: back to Ammy's own hero photo/background; shared
 * card/button/nav/social styling stays (see nexplayLook above). */
const ammyLook = AMMY_DEFAULT_LOOK;

export const AMMY_STREAMER: StreamerConfig = {
  slug: "ammy",
  name: "AMMY",
  displayName: "AMMY LIVE",
  basePath: "/ammy",
  heroImage: ammyLook.heroImage,
  avatarImage: ammyLook.avatarImage,
  heroAlt: ammyLook.heroAlt,
  followers: "ติดตาม Ammy",
  socialTitle: "ติดตาม Ammy",
  theme: ammyLook.theme,
  socialFollowers: {
    facebook: "ติดตาม Ammy",
    instagram: "ติดตาม Ammy",
    tiktok: "ติดตาม Ammy",
    line: "เพิ่มเพื่อน",
  },
  links: ammyLinks,
  heroSlides: [
    {
      eyebrow: "AMMY LIVE",
      title: ammyLook.heroTitle,
      highlight: ammyLook.heroHighlight,
      description: "พูดคุยสด พร้อมกิจกรรมพิเศษ\n1–3 PM · 7–9 PM",
      cta: "เข้าไลฟ์ตอนนี้",
      action: "line",
    },
    {
      ...sharedSlides.member,
      highlight: "รับโบนัสสูงสุด 2,000",
    },
    sharedSlides.rewards,
  ],
};

/* Zen — reversible Halloween mode, same shared Enjoy-tier UI as the other
 * Halloween streamers (cards, buttons, nav, social-card art are Enjoy's
 * assets, synced via scripts/sync-streamer-enjoy-ui.mjs). Only the hero
 * photo and the page-background image are Zen's own — Zen's background is
 * reused from Nutt's scene per request. Flip ZEN_HALLOWEEN_MODE to false
 * to revert to the original teal-amber rainy-night look. */
export const ZEN_HALLOWEEN_MODE = true;

const ZEN_DEFAULT_LOOK = {
  heroImage: "/streamers/zen/hero.png",
  avatarImage: "/streamers/zen/avatar.png",
  heroAlt: "Zen ในธีมค่ำคืนสายฝน โทนเขียวเทอร์ควอยซ์เข้ม-อำพันทอง",
  heroTitle: "ไลฟ์สดกับ Zen",
  heroHighlight: "เท่ลึกลับทุกวัน",
  theme: {
    accent: "#2FA79A",
    accentDeep: "#0F3B36",
    accentBright: "#5FD9C4",
    accentSoft: "#E3FBF6",
    accentRgb: "47, 167, 154",
    secondaryRgb: "242, 183, 85",
  },
} as const;

const ZEN_HALLOWEEN_LOOK = {
  heroImage: "/streamers/zen/hero-halloween.webp",
  avatarImage: "/streamers/zen/hero-halloween.webp",
  heroAlt: "Zen ในชุดฮาโลวีนโกธิคแดง-ดำ นั่งหน้าปราสาทใต้แสงจันทร์",
  heroTitle: NEXPLAY_HALLOWEEN_LOOK.heroSlide.title,
  heroHighlight: NEXPLAY_HALLOWEEN_LOOK.heroSlide.highlight,
  theme: NEXPLAY_HALLOWEEN_LOOK.theme,
} as const;

/* Post-Halloween: back to Zen's own hero photo/background; shared
 * card/button/nav/social styling stays (see nexplayLook above). */
const zenLook = ZEN_DEFAULT_LOOK;

export const ZEN_STREAMER: StreamerConfig = {
  slug: "zen",
  name: "ZEN",
  displayName: "ZEN LIVE",
  basePath: "/zen",
  heroImage: zenLook.heroImage,
  avatarImage: zenLook.avatarImage,
  heroAlt: zenLook.heroAlt,
  followers: "ติดตาม Zen",
  socialTitle: "ติดตาม Zen",
  theme: zenLook.theme,
  socialFollowers: {
    facebook: "ติดตาม Zen",
    instagram: "ติดตาม Zen",
    tiktok: "ติดตาม Zen",
    line: "เพิ่มเพื่อน",
  },
  links: zenLinks,
  heroSlides: [
    {
      eyebrow: "ZEN LIVE",
      title: zenLook.heroTitle,
      highlight: zenLook.heroHighlight,
      description: "พูดคุยสด พร้อมกิจกรรมพิเศษ\n1–3 PM · 7–9 PM",
      cta: "เข้าไลฟ์ตอนนี้",
      action: "line",
    },
    {
      ...sharedSlides.member,
      highlight: "รับโบนัสสูงสุด 2,000",
    },
    sharedSlides.rewards,
  ],
};

/** Keep Nutt's black-gold studio look intact so the Halloween artwork can be
 * reverted in one flag. Unlike Holden/Lham (background + avatar crop only),
 * Nutt gets the FULL Enjoy treatment (dark header/nav/cards/buttons) on
 * request — see the `nutt` entries appended alongside `nexplay` throughout
 * the `[data-seasonal="halloween"]` CSS in app/globals.css. Per the brief
 * ("แตกต่างที่รูปสตรีมเมอร์และพื้นหลังเท่านั้น"), those shared rules
 * intentionally keep pointing at Enjoy's own button/nav/social-card art —
 * only the hero photo and the page-background image are Nutt's own. */
export const NUTT_HALLOWEEN_MODE = true;

const NUTT_DEFAULT_LOOK = {
  heroImage: "/streamers/nutt/hero.png",
  avatarImage: "/streamers/nutt/avatar.png",
  heroAlt: "Nutt ในธีมดำ-ทอง เส้นแสงทองเรขาคณิตพื้นหลังดำ",
  heroTitle: "ไลฟ์สดกับ Nutt",
  heroHighlight: "เข้มขรึมทุกวัน",
  theme: {
    accent: "#E3A93B",
    accentDeep: "#8C5F1B",
    accentBright: "#F7C866",
    accentSoft: "#FCEBC9",
    accentRgb: "227, 169, 59",
    secondaryRgb: "201, 122, 31",
  },
} as const;

const NUTT_HALLOWEEN_LOOK = {
  heroImage: "/streamers/nutt/hero-halloween.webp",
  avatarImage: "/streamers/nutt/hero-halloween.webp",
  heroAlt: "Nutt ในชุดเคานต์แวมไพร์ขาว-ดำ นั่งบัลลังก์หน้าปราสาทฮาโลวีน แสงจันทร์และฟักทองเรืองแสง",
  heroTitle: NEXPLAY_HALLOWEEN_LOOK.heroSlide.title,
  heroHighlight: NEXPLAY_HALLOWEEN_LOOK.heroSlide.highlight,
  theme: NEXPLAY_HALLOWEEN_LOOK.theme,
} as const;

/* Post-Halloween: back to Nutt's own hero photo/background; shared
 * card/button/nav/social styling stays (see nexplayLook above). */
const nuttLook = NUTT_DEFAULT_LOOK;

export const NUTT_STREAMER: StreamerConfig = {
  slug: "nutt",
  name: "NUTT",
  displayName: "NUTT LIVE",
  basePath: "/nutt",
  heroImage: nuttLook.heroImage,
  avatarImage: nuttLook.avatarImage,
  heroAlt: nuttLook.heroAlt,
  followers: "ติดตาม Nutt",
  socialTitle: "ติดตาม Nutt",
  theme: nuttLook.theme,
  socialFollowers: {
    facebook: "ติดตาม Nutt",
    instagram: "ติดตาม Nutt",
    tiktok: "ติดตาม Nutt",
    line: "เพิ่มเพื่อน",
  },
  links: nuttLinks,
  heroSlides: [
    {
      eyebrow: "NUTT LIVE",
      title: nuttLook.heroTitle,
      highlight: nuttLook.heroHighlight,
      description: "พูดคุยสด พร้อมกิจกรรมพิเศษ\n1–3 PM · 7–9 PM",
      cta: "เข้าไลฟ์ตอนนี้",
      action: "line",
    },
    {
      ...sharedSlides.member,
      highlight: "รับโบนัสสูงสุด 2,000",
    },
    sharedSlides.rewards,
  ],
};

/** Keep Lham's studio look intact so the Halloween artwork can be reverted. */
export const LHAM_HALLOWEEN_MODE = true;

const LHAM_DEFAULT_LOOK = {
  heroImage: "/streamers/lham/hero.png",
  avatarImage: "/streamers/lham/avatar.png",
  heroAlt: "Lham ในสตูดิโอไฟนีออนม่วง-ฟ้า",
  heroTitle: "ไลฟ์สดกับ Lham",
  heroHighlight: "เท่ทุกวัน",
  theme: {
    accent: "#8B5CF6",
    accentDeep: "#4C2E8C",
    accentBright: "#B79CFF",
    accentSoft: "#EDE6FF",
    accentRgb: "139, 92, 246",
    secondaryRgb: "34, 211, 238",
  },
} as const;

const LHAM_HALLOWEEN_LOOK = {
  heroImage: "/streamers/lham/hero-halloween.webp",
  avatarImage: "/streamers/lham/hero-halloween.webp",
  heroAlt: "Lham ในชุดฮาโลวีนหน้าปราสาท แสงจันทร์และฟักทองเรืองแสง",
  heroTitle: NEXPLAY_HALLOWEEN_LOOK.heroSlide.title,
  heroHighlight: NEXPLAY_HALLOWEEN_LOOK.heroSlide.highlight,
  theme: NEXPLAY_HALLOWEEN_LOOK.theme,
} as const;

/* Post-Halloween: back to Lham's own hero photo/background; shared
 * card/button/nav/social styling stays (see nexplayLook above). */
const lhamLook = LHAM_DEFAULT_LOOK;

/** Every streamer — Enjoy, Lham, Holden, Nutt, Top, Kim, Ivy, William, Zen,
 * Lily, Lilin, Irada, Miguel, Ammy and Grace — shares one Halloween UI
 * while retaining their own data. */
export function usesEnjoyHalloweenUi(streamerSlug: string): boolean {
  return (
    (streamerSlug === "nexplay" && NEXPLAY_HALLOWEEN_MODE) ||
    (streamerSlug === "lham" && LHAM_HALLOWEEN_MODE) ||
    (streamerSlug === "holden" && HOLDEN_HALLOWEEN_MODE) ||
    (streamerSlug === "nutt" && NUTT_HALLOWEEN_MODE) ||
    (streamerSlug === "top" && TOP_HALLOWEEN_MODE) ||
    (streamerSlug === "kim" && KIM_HALLOWEEN_MODE) ||
    (streamerSlug === "ivy" && IVY_HALLOWEEN_MODE) ||
    (streamerSlug === "william" && WILLIAM_HALLOWEEN_MODE) ||
    (streamerSlug === "zen" && ZEN_HALLOWEEN_MODE) ||
    (streamerSlug === "lily" && LILY_HALLOWEEN_MODE) ||
    (streamerSlug === "lilin" && LILIN_HALLOWEEN_MODE) ||
    (streamerSlug === "irada" && IRADA_HALLOWEEN_MODE) ||
    (streamerSlug === "miguel" && MIGUEL_HALLOWEEN_MODE) ||
    (streamerSlug === "ammy" && AMMY_HALLOWEEN_MODE) ||
    (streamerSlug === "grace" && GRACE_HALLOWEEN_MODE)
  );
}

export const LHAM_STREAMER: StreamerConfig = {
  slug: "lham",
  name: "LHAM",
  displayName: "LHAM LIVE",
  basePath: "/lham",
  heroImage: lhamLook.heroImage,
  avatarImage: lhamLook.avatarImage,
  heroAlt: lhamLook.heroAlt,
  followers: "ติดตาม Lham",
  socialTitle: "ติดตาม Lham",
  theme: lhamLook.theme,
  socialFollowers: {
    facebook: "ติดตาม Lham",
    instagram: "ติดตาม Lham",
    tiktok: "ติดตาม Lham",
    line: "เพิ่มเพื่อน",
  },
  links: lhamLinks,
  heroSlides: [
    {
      eyebrow: "LHAM LIVE",
      title: lhamLook.heroTitle,
      highlight: lhamLook.heroHighlight,
      description: "พูดคุยสด พร้อมกิจกรรมพิเศษ\n1–3 PM · 7–9 PM",
      cta: "เข้าไลฟ์ตอนนี้",
      action: "line",
    },
    {
      ...sharedSlides.member,
      highlight: "รับโบนัสสูงสุด 2,000",
    },
    { ...sharedSlides.rewards, eyebrow: "LHAM REWARDS" },
  ],
};

/* Kim — reversible Halloween mode, same shared Enjoy-tier UI as Nutt/Top
 * (cards, buttons, nav, social-card art are Enjoy's assets, synced via
 * scripts/sync-streamer-enjoy-ui.mjs). Only the hero photo and the
 * page-background image are Kim's own. Flip KIM_HALLOWEEN_MODE to false
 * to revert to the original purple-neon-studio look. */
export const KIM_HALLOWEEN_MODE = true;

const KIM_DEFAULT_LOOK = {
  heroImage: "/streamers/kim/hero.png",
  avatarImage: "/streamers/kim/avatar.png",
  heroAlt: "Kim ในสตูดิโอไฟนีออนม่วงคราม-ดำ โทนเข้มขรึม",
  heroTitle: "ไลฟ์สดกับ Kim",
  heroHighlight: "เข้มลึกทุกวัน",
  theme: {
    accent: "#6C4FF2",
    accentDeep: "#2E1B6B",
    accentBright: "#9B7FFF",
    accentSoft: "#E6E0FF",
    accentRgb: "108, 79, 242",
    secondaryRgb: "74, 85, 120",
  },
} as const;

const KIM_HALLOWEEN_LOOK = {
  heroImage: "/streamers/kim/hero-halloween.webp",
  avatarImage: "/streamers/kim/hero-halloween.webp",
  heroAlt: "Kim ในชุดตัวตลกฮาโลวีนแดง-ดำ นั่งหน้าปราสาทยามค่ำคืน แสงจันทร์และฟักทองเรืองแสง",
  heroTitle: NEXPLAY_HALLOWEEN_LOOK.heroSlide.title,
  heroHighlight: NEXPLAY_HALLOWEEN_LOOK.heroSlide.highlight,
  theme: NEXPLAY_HALLOWEEN_LOOK.theme,
} as const;

/* Post-Halloween: back to Kim's own hero photo/background; shared
 * card/button/nav/social styling stays (see nexplayLook above). */
const kimLook = KIM_DEFAULT_LOOK;

export const KIM_STREAMER: StreamerConfig = {
  slug: "kim",
  name: "KIM",
  displayName: "KIM LIVE",
  basePath: "/kim",
  heroImage: kimLook.heroImage,
  avatarImage: kimLook.avatarImage,
  heroAlt: kimLook.heroAlt,
  followers: "ติดตาม Kim",
  socialTitle: "ติดตาม Kim",
  theme: kimLook.theme,
  socialFollowers: {
    facebook: "ติดตาม Kim",
    instagram: "ติดตาม Kim",
    tiktok: "ติดตาม Kim",
    line: "เพิ่มเพื่อน",
  },
  links: kimLinks,
  heroSlides: [
    {
      eyebrow: "KIM LIVE",
      title: kimLook.heroTitle,
      highlight: kimLook.heroHighlight,
      description: "พูดคุยสด พร้อมกิจกรรมพิเศษ\n1–3 PM · 7–9 PM",
      cta: "เข้าไลฟ์ตอนนี้",
      action: "line",
    },
    {
      ...sharedSlides.member,
      highlight: "รับโบนัสสูงสุด 2,000",
    },
    sharedSlides.rewards,
  ],
};

/* Grace — reversible Halloween mode, same shared Enjoy-tier UI as the
 * other Halloween streamers (cards, buttons, nav, social-card art are
 * Enjoy's assets, synced via scripts/sync-streamer-enjoy-ui.mjs). Only the
 * hero photo and the page-background image are Grace's own — a new green
 * witch-castle scene. Flip GRACE_HALLOWEEN_MODE to false to revert to the
 * original magenta-purple studio look. */
export const GRACE_HALLOWEEN_MODE = true;

const GRACE_DEFAULT_LOOK = {
  heroImage: "/streamers/grace/hero.png",
  avatarImage: "/streamers/grace/avatar.png",
  heroAlt: "Grace ในสตูดิโอไฟนีออนม่วง-ชมพูแมเจนต้า",
  heroTitle: "ไลฟ์สดกับ Grace",
  heroHighlight: "สดใสทุกวัน",
  theme: {
    accent: "#E0299B",
    accentDeep: "#7A1259",
    accentBright: "#FF5FC4",
    accentSoft: "#FFE0F3",
    accentRgb: "224, 41, 155",
    secondaryRgb: "147, 51, 234",
  },
} as const;

const GRACE_HALLOWEEN_LOOK = {
  heroImage: "/streamers/grace/hero-halloween.webp",
  avatarImage: "/streamers/grace/hero-halloween.webp",
  heroAlt: "Grace ในชุดแม่มดฮาโลวีนสีดำ นั่งในห้องสตรีมแสงเขียวพร้อมป้าย ON AIR และแมวดำ",
  heroTitle: NEXPLAY_HALLOWEEN_LOOK.heroSlide.title,
  heroHighlight: NEXPLAY_HALLOWEEN_LOOK.heroSlide.highlight,
  theme: NEXPLAY_HALLOWEEN_LOOK.theme,
} as const;

/* Post-Halloween: back to Grace's own hero photo/background; shared
 * card/button/nav/social styling stays (see nexplayLook above). */
const graceLook = GRACE_DEFAULT_LOOK;

export const GRACE_STREAMER: StreamerConfig = {
  slug: "grace",
  name: "GRACE",
  displayName: "GRACE LIVE",
  basePath: "/grace",
  heroImage: graceLook.heroImage,
  avatarImage: graceLook.avatarImage,
  heroAlt: graceLook.heroAlt,
  followers: "ติดตาม Grace",
  socialTitle: "ติดตาม Grace",
  theme: graceLook.theme,
  socialFollowers: {
    facebook: "ติดตาม Grace",
    instagram: "ติดตาม Grace",
    tiktok: "ติดตาม Grace",
    line: "เพิ่มเพื่อน",
  },
  links: graceLinks,
  heroSlides: [
    {
      eyebrow: "GRACE LIVE",
      title: graceLook.heroTitle,
      highlight: graceLook.heroHighlight,
      description: "พูดคุยสด พร้อมกิจกรรมพิเศษ\n1–3 PM · 7–9 PM",
      cta: "เข้าไลฟ์ตอนนี้",
      action: "line",
    },
    {
      ...sharedSlides.member,
      highlight: "รับโบนัสสูงสุด 2,000",
    },
    sharedSlides.rewards,
  ],
};

/* Miguel — reversible Halloween mode, same shared Enjoy-tier UI as the
 * other Halloween streamers (cards, buttons, nav, social-card art are
 * Enjoy's assets, synced via scripts/sync-streamer-enjoy-ui.mjs). Only the
 * hero photo is Miguel's own — her page-background is reused from Kim's
 * scene per request (no new background image was supplied). Flip
 * MIGUEL_HALLOWEEN_MODE to false to revert to the original cream-sand
 * minimal-studio look. */
export const MIGUEL_HALLOWEEN_MODE = true;

const MIGUEL_DEFAULT_LOOK = {
  heroImage: "/streamers/miguel/hero.png",
  avatarImage: "/streamers/miguel/avatar.png",
  heroAlt: "Miguel ในสตูดิโอมินิมอลโทนครีม-ทราย แสงธรรมชาติอบอุ่น",
  heroTitle: "ไลฟ์สดกับ Miguel",
  heroHighlight: "อบอุ่นทุกวัน",
  theme: {
    accent: "#C17B5A",
    accentDeep: "#7A4A32",
    accentBright: "#E8B08C",
    accentSoft: "#FBF3EA",
    accentRgb: "193, 123, 90",
    secondaryRgb: "212, 165, 116",
  },
} as const;

const MIGUEL_HALLOWEEN_LOOK = {
  heroImage: "/streamers/miguel/hero-halloween.webp",
  avatarImage: "/streamers/miguel/hero-halloween.webp",
  heroAlt: "Miguel ในชุดฮาโลวีนลายสก็อตดำ-ส้ม ยืนหน้าปราสาทใต้แสงจันทร์เต็มดวง",
  heroTitle: NEXPLAY_HALLOWEEN_LOOK.heroSlide.title,
  heroHighlight: NEXPLAY_HALLOWEEN_LOOK.heroSlide.highlight,
  theme: NEXPLAY_HALLOWEEN_LOOK.theme,
} as const;

/* Post-Halloween: back to Miguel's own hero photo/background; shared
 * card/button/nav/social styling stays (see nexplayLook above). */
const miguelLook = MIGUEL_DEFAULT_LOOK;

export const MIGUEL_STREAMER: StreamerConfig = {
  slug: "miguel",
  name: "MIGUEL",
  displayName: "MIGUEL LIVE",
  basePath: "/miguel",
  heroImage: miguelLook.heroImage,
  avatarImage: miguelLook.avatarImage,
  heroAlt: miguelLook.heroAlt,
  followers: "ติดตาม Miguel",
  socialTitle: "ติดตาม Miguel",
  theme: miguelLook.theme,
  socialFollowers: {
    facebook: "ติดตาม Miguel",
    instagram: "ติดตาม Miguel",
    tiktok: "ติดตาม Miguel",
    line: "เพิ่มเพื่อน",
  },
  links: miguelLinks,
  heroSlides: [
    {
      eyebrow: "MIGUEL LIVE",
      title: miguelLook.heroTitle,
      highlight: miguelLook.heroHighlight,
      description: "พูดคุยสด พร้อมกิจกรรมพิเศษ\n1–3 PM · 7–9 PM",
      cta: "เข้าไลฟ์ตอนนี้",
      action: "line",
    },
    {
      ...sharedSlides.member,
      highlight: "รับโบนัสสูงสุด 2,000",
    },
    sharedSlides.rewards,
  ],
};

/* Top — reversible Halloween mode, same shared Enjoy-tier UI as Nutt
 * (cards, buttons, nav, social-card art are Enjoy's assets, synced via
 * scripts/sync-streamer-enjoy-ui.mjs). Only the hero photo and the
 * page-background image are Top's own. Flip TOP_HALLOWEEN_MODE to false
 * to revert to the original cyberpunk-studio look. */
export const TOP_HALLOWEEN_MODE = true;

const TOP_DEFAULT_LOOK = {
  heroImage: "/streamers/top/hero.png",
  avatarImage: "/streamers/top/avatar.png",
  heroAlt: "TOP ในสตูดิโอสตรีมไซเบอร์พังก์ แสงนีออนฟ้าอมเขียว-ส้ม",
  heroTitle: "ไลฟ์สดกับ TOP",
  heroHighlight: "มันส์ทุกวัน",
  theme: {
    accent: "#22D3C7",
    accentDeep: "#0F6B66",
    accentBright: "#6EEFE3",
    accentSoft: "#D9FBF6",
    accentRgb: "34, 211, 199",
    secondaryRgb: "255, 107, 53",
  },
} as const;

const TOP_HALLOWEEN_LOOK = {
  heroImage: "/streamers/top/hero-halloween.webp",
  avatarImage: "/streamers/top/hero-halloween.webp",
  heroAlt: "TOP ในชุดเคานต์แวมไพร์ขาว-ดำ นั่งบัลลังก์หน้าปราสาทฮาโลวีน แสงจันทร์และเทียนไฟ",
  heroTitle: NEXPLAY_HALLOWEEN_LOOK.heroSlide.title,
  heroHighlight: NEXPLAY_HALLOWEEN_LOOK.heroSlide.highlight,
  theme: NEXPLAY_HALLOWEEN_LOOK.theme,
} as const;

/* Post-Halloween: back to Top's own hero photo/background; shared
 * card/button/nav/social styling stays (see nexplayLook above). */
const topLook = TOP_DEFAULT_LOOK;

export const TOP_STREAMER: StreamerConfig = {
  slug: "top",
  name: "TOP",
  displayName: "TOP LIVE",
  basePath: "/top",
  heroImage: topLook.heroImage,
  avatarImage: topLook.avatarImage,
  heroAlt: topLook.heroAlt,
  followers: "ติดตาม TOP",
  socialTitle: "ติดตาม TOP",
  theme: topLook.theme,
  socialFollowers: {
    facebook: "ติดตาม TOP",
    instagram: "ติดตาม TOP",
    tiktok: "ติดตาม TOP",
    line: "เพิ่มเพื่อน",
  },
  links: topLinks,
  heroSlides: [
    {
      eyebrow: "TOP LIVE",
      title: topLook.heroTitle,
      highlight: topLook.heroHighlight,
      description: "พูดคุยสด พร้อมกิจกรรมพิเศษ\n1–3 PM · 7–9 PM",
      cta: "เข้าไลฟ์ตอนนี้",
      action: "line",
    },
    {
      ...sharedSlides.member,
      highlight: "รับโบนัสสูงสุด 2,000",
    },
    sharedSlides.rewards,
  ],
};

/* Irada — reversible Halloween mode, same shared Enjoy-tier UI as the
 * other Halloween streamers (cards, buttons, nav, social-card art are
 * Enjoy's assets, synced via scripts/sync-streamer-enjoy-ui.mjs). Only the
 * hero photo is Irada's own — her page-background is reused from Nutt's
 * scene per request (no new background image was supplied). Flip
 * IRADA_HALLOWEEN_MODE to false to revert to the original pink-studio
 * look. */
export const IRADA_HALLOWEEN_MODE = true;

const IRADA_DEFAULT_LOOK = {
  heroImage: "/streamers/irada/hero.png",
  avatarImage: "/streamers/irada/avatar.png",
  heroAlt: "Irada ในห้องสตรีมมิ่งสีชมพู ป้าย LIVE นีออน และเก้าอี้เกมมิ่งสีชมพู",
  heroTitle: "ไลฟ์สดกับ Irada",
  heroHighlight: "น่ารักทุกวัน",
  theme: {
    accent: "#EC4899",
    accentDeep: "#BE185D",
    accentBright: "#F472B6",
    accentSoft: "#FCE7F3",
    accentRgb: "236, 72, 153",
    secondaryRgb: "168, 85, 247",
  },
} as const;

const IRADA_HALLOWEEN_LOOK = {
  heroImage: "/streamers/irada/hero-halloween.webp",
  avatarImage: "/streamers/irada/hero-halloween.webp",
  heroAlt: "Irada ในชุดแม่มดฮาโลวีนหมวกปีกกว้างส้ม-ดำ นั่งหน้าปราสาทใต้แสงจันทร์เต็มดวง",
  heroTitle: NEXPLAY_HALLOWEEN_LOOK.heroSlide.title,
  heroHighlight: NEXPLAY_HALLOWEEN_LOOK.heroSlide.highlight,
  theme: NEXPLAY_HALLOWEEN_LOOK.theme,
} as const;

/* Post-Halloween: back to Irada's own hero photo/background; shared
 * card/button/nav/social styling stays (see nexplayLook above). */
const iradaLook = IRADA_DEFAULT_LOOK;

export const IRADA_STREAMER: StreamerConfig = {
  slug: "irada",
  name: "IRADA",
  displayName: "IRADA LIVE",
  basePath: "/irada",
  heroImage: iradaLook.heroImage,
  avatarImage: iradaLook.avatarImage,
  heroAlt: iradaLook.heroAlt,
  followers: "ติดตาม Irada",
  socialTitle: "ติดตาม Irada",
  theme: iradaLook.theme,
  socialFollowers: {
    facebook: "ติดตาม Irada",
    instagram: "ติดตาม Irada",
    tiktok: "ติดตาม Irada",
    line: "เพิ่มเพื่อน",
  },
  links: iradaLinks,
  heroSlides: [
    {
      eyebrow: "IRADA LIVE",
      title: iradaLook.heroTitle,
      highlight: iradaLook.heroHighlight,
      description: "พูดคุยสด พร้อมกิจกรรมพิเศษ\n1–3 PM · 7–9 PM",
      cta: "เข้าไลฟ์ตอนนี้",
      action: "line",
    },
    {
      ...sharedSlides.member,
      highlight: "รับโบนัสสูงสุด 2,000",
    },
    sharedSlides.rewards,
  ],
};

export const STREAMERS = [
  DEFAULT_STREAMER,
  HOLDEN_STREAMER,
  LILY_STREAMER,
  IVY_STREAMER,
  LILIN_STREAMER,
  WILLIAM_STREAMER,
  AMMY_STREAMER,
  ZEN_STREAMER,
  NUTT_STREAMER,
  LHAM_STREAMER,
  KIM_STREAMER,
  GRACE_STREAMER,
  MIGUEL_STREAMER,
  TOP_STREAMER,
  IRADA_STREAMER,
] as const;

export const STREAMER_SLUGS = [
  "holden",
  "lily",
  "ivy",
  "lilin",
  "william",
  "ammy",
  "zen",
  "nutt",
  "lham",
  "kim",
  "grace",
  "miguel",
  "top",
  "irada",
] as const;

export function getStreamerBySlug(slug: string) {
  return STREAMERS.find((streamer) => streamer.slug === slug);
}

export function getStreamerFromPathname(pathname: string) {
  const slug = pathname.split("/").filter(Boolean)[0];
  return getStreamerBySlug(slug) ?? DEFAULT_STREAMER;
}

export function streamerRoute(
  streamer: StreamerConfig,
  route: "" | "/promotions" | "/follow",
) {
  return `${streamer.basePath}${route}` || "/";
}
