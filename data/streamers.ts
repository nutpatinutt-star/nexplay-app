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
    | "lily"
    | "lilin"
    | "william"
    | "ammy"
    | "zen"
    | "grace"
    | "miguel"
    | "top"
    | "slade";
  name: string;
  displayName: string;
  /** Overrides the page language/copy for streamers whose audience isn't
   * Thai-speaking. Undefined (the default) means Thai — nothing changes
   * for any existing streamer. Components that render fixed Thai chrome
   * text (nav labels, schedule popup, search panel, etc.) branch on this. */
  locale?: "th" | "bn";
  /** True for streamers with no second contact channel (no LINE OA, no
   * socials yet) — e.g. Slade, whose funnel is a single register link.
   * Components hide LINE-dependent UI (ADD LINE button, social section,
   * promotions carousel/page, follow page, the in-app-browser LINE-scheme
   * gate) instead of rendering broken/empty-href elements. */
  singleCta?: boolean;
  basePath:
    | ""
    | "/lily"
    | "/lilin"
    | "/william"
    | "/ammy"
    | "/zen"
    | "/grace"
    | "/miguel"
    | "/top"
    | "/slade";
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

const sladeLinks: ExternalLinks = {
  register: process.env.NEXT_PUBLIC_SLADE_REGISTER_URL?.trim() ?? "",
  line: "",
  lineAds: "",
  claimPromo: process.env.NEXT_PUBLIC_SLADE_REGISTER_URL?.trim() ?? "",
  support: "",
  facebook: "",
  instagram: "",
  tiktok: "",
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
export const NEXPLAY_HALLOWEEN_MODE = false;

/* Enjoy-exclusive new card/button art (pink neon register/LINE buttons,
 * social cards, bottom nav, VIP/deposit promo art) requested directly —
 * not part of the Halloween theme, not shared with any other streamer.
 * Read by AppFrame.tsx (sets data-enjoy-cards="pink" on .app-shell, only
 * for nexplay) and the `[data-enjoy-cards="pink"]` CSS in
 * app/globals.css. That selector is deliberately NOT the
 * `[data-seasonal="halloween"]` one scripts/sync-streamer-enjoy-ui.mjs
 * clones for other streamers, so this never leaks past Enjoy. Flip to
 * false to go back to the shared Halloween-tier art immediately. */
export const NEXPLAY_PINK_CARDS_MODE = false;

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

/* Lily — reversible Halloween mode, same shared Enjoy-tier UI as the other
 * Halloween streamers (cards, buttons, nav, social-card art are Enjoy's
 * assets, synced via scripts/sync-streamer-enjoy-ui.mjs). Only the hero
 * photo and the page-background image are Lily's own — her background is
 * shared with Lilin's (same new scene, per request). Flip
 * LILY_HALLOWEEN_MODE to false to revert to the original cyber-bunny look. */
export const LILY_HALLOWEEN_MODE = false;

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

/* Lilin — reversible Halloween mode, same shared Enjoy-tier UI as the
 * other Halloween streamers (cards, buttons, nav, social-card art are
 * Enjoy's assets, synced via scripts/sync-streamer-enjoy-ui.mjs). Only the
 * hero photo and the page-background image are Lilin's own — her
 * background is shared with Lily's (same new scene, per request). Flip
 * LILIN_HALLOWEEN_MODE to false to revert to the original pastel-purple
 * look. */
export const LILIN_HALLOWEEN_MODE = false;

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
export const WILLIAM_HALLOWEEN_MODE = false;

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
export const AMMY_HALLOWEEN_MODE = false;

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
export const ZEN_HALLOWEEN_MODE = false;

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

/** Every streamer — Enjoy, Top, William, Zen, Lily, Lilin, Miguel, Ammy
 * and Grace — shares one Halloween UI while retaining their own data. All
 * flags are currently `false` (Halloween season over, 06/11/2026) — flip
 * the relevant one back to `true` to reuse it next year; nothing else
 * needs re-entering. */
export function usesEnjoyHalloweenUi(streamerSlug: string): boolean {
  return (
    (streamerSlug === "nexplay" && NEXPLAY_HALLOWEEN_MODE) ||
    (streamerSlug === "top" && TOP_HALLOWEEN_MODE) ||
    (streamerSlug === "william" && WILLIAM_HALLOWEEN_MODE) ||
    (streamerSlug === "zen" && ZEN_HALLOWEEN_MODE) ||
    (streamerSlug === "lily" && LILY_HALLOWEEN_MODE) ||
    (streamerSlug === "lilin" && LILIN_HALLOWEEN_MODE) ||
    (streamerSlug === "miguel" && MIGUEL_HALLOWEEN_MODE) ||
    (streamerSlug === "ammy" && AMMY_HALLOWEEN_MODE) ||
    (streamerSlug === "grace" && GRACE_HALLOWEEN_MODE)
  );
}

/* Grace — reversible Halloween mode, same shared Enjoy-tier UI as the
 * other Halloween streamers (cards, buttons, nav, social-card art are
 * Enjoy's assets, synced via scripts/sync-streamer-enjoy-ui.mjs). Only the
 * hero photo and the page-background image are Grace's own — a new green
 * witch-castle scene. Flip GRACE_HALLOWEEN_MODE to false to revert to the
 * original magenta-purple studio look. */
export const GRACE_HALLOWEEN_MODE = false;

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
export const MIGUEL_HALLOWEEN_MODE = false;

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
export const TOP_HALLOWEEN_MODE = false;

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

/* Slade — Bangladesh, bdjoybg.net brand. Single-funnel landing page: one
 * register CTA (no LINE/social channels exist yet for this brand), full
 * Bengali copy (locale "bn"), red-gold theme matched to his hero photo.
 * singleCta hides every LINE-dependent surface (ADD LINE button, social
 * section, promotions carousel/page, follow page, the Meta in-app-browser
 * gate whose whole reason for existing is blocking LINE's custom URL
 * scheme — irrelevant here since the only link is a plain https register
 * URL that Facebook's in-app browser opens fine). */
const SLADE_LOOK = {
  heroImage: "/streamers/slade/hero.webp",
  avatarImage: "/streamers/slade/hero.webp",
  heroAlt:
    "Slade গিম্বলে ফোন ধরে লাইভ করছেন, পেছনে লাল-সোনালী আলোকসজ্জা এবং একটি সোনালী মূর্তি",
  heroTitle: "Slade এর সাথে লাইভ",
  heroHighlight: "প্রতিদিন জমজমাট বিনোদন",
  theme: {
    accent: "#C8282E",
    accentDeep: "#7A1013",
    accentBright: "#E8565C",
    accentSoft: "#FBE6C8",
    accentRgb: "200, 40, 46",
    secondaryRgb: "212, 175, 55",
  },
} as const;

export const SLADE_STREAMER: StreamerConfig = {
  slug: "slade",
  name: "SLADE",
  displayName: "SLADE LIVE",
  locale: "bn",
  singleCta: true,
  basePath: "/slade",
  heroImage: SLADE_LOOK.heroImage,
  avatarImage: SLADE_LOOK.avatarImage,
  heroAlt: SLADE_LOOK.heroAlt,
  followers: "অনেক দর্শক দেখছেন",
  socialTitle: "Slade কে ফলো করুন",
  theme: SLADE_LOOK.theme,
  socialFollowers: {
    facebook: "Slade কে ফলো করুন",
    instagram: "Slade কে ফলো করুন",
    tiktok: "Slade কে ফলো করুন",
    line: "Slade কে ফলো করুন",
  },
  links: sladeLinks,
  heroSlides: [
    {
      eyebrow: "SLADE LIVE",
      title: SLADE_LOOK.heroTitle,
      highlight: SLADE_LOOK.heroHighlight,
      description: "প্রতিদিন লাইভ স্ট্রিম এবং বিশেষ অফার\n1–3 PM · 7–9 PM",
      cta: "রেজিস্ট্রেশন করুন",
      action: "register",
    },
    {
      eyebrow: "নতুন সদস্য",
      title: "আজই শুরু করুন",
      highlight: "৫০০ টাকা ফ্রি বোনাস",
      description:
        "নতুন সদস্যদের জন্য বিশেষ সুবিধা\nসহজ রেজিস্ট্রেশন, সাথে সাথে ব্যবহার করুন",
      cta: "রেজিস্ট্রেশন করুন",
      action: "register",
      compact: true,
    },
  ],
};

export const STREAMERS = [
  DEFAULT_STREAMER,
  LILY_STREAMER,
  LILIN_STREAMER,
  WILLIAM_STREAMER,
  AMMY_STREAMER,
  ZEN_STREAMER,
  GRACE_STREAMER,
  MIGUEL_STREAMER,
  TOP_STREAMER,
  SLADE_STREAMER,
] as const;

export const STREAMER_SLUGS = [
  "lily",
  "lilin",
  "william",
  "ammy",
  "zen",
  "grace",
  "miguel",
  "top",
  "slade",
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
