import { NEXPLAY_PINK_CARDS_MODE, usesEnjoyHalloweenUi } from "@/data/streamers";

export type PromotionIcon = "deposit" | "line" | "calendar" | "crown";

/** Shared Halloween promo art for Enjoy, Lham and Holden — generated illustrations (crown/witch
 * for the "vip" card, glowing coin-purse for the "new-member" deposit card,
 * glowing hourglass for "daily-bonus", glowing chat-gem for "free-credit")
 * with a reserved dark zone on the left for the card's own text, used
 * instead of the generic CSS icon medallion. Lham and Holden's VIP cards use
 * their own portraits in the same card treatment. */
const HALLOWEEN_PROMO_ART: Partial<Record<PromotionIcon, string>> = {
  crown: "/promotions/halloween-vip.png",
  deposit: "/promotions/halloween-deposit.png",
  calendar: "/promotions/halloween-daily.png",
  line: "/promotions/halloween-credit.png",
};

export function halloweenPromoArt(
  streamerSlug: string,
  icon: PromotionIcon,
): string | undefined {
  if (!usesEnjoyHalloweenUi(streamerSlug)) return undefined;
  if (streamerSlug === "lham" && icon === "crown") {
    return "/streamers/lham/hero-halloween.webp";
  }
  if (streamerSlug === "holden" && icon === "crown") {
    return "/streamers/holden/hero-halloween.webp";
  }
  // Enjoy-exclusive new pink-neon promo art — see NEXPLAY_PINK_CARDS_MODE.
  if (streamerSlug === "nexplay" && NEXPLAY_PINK_CARDS_MODE) {
    if (icon === "crown") return "/promotions/pink-vip.png";
    if (icon === "deposit") return "/promotions/pink-deposit.png";
    // Free-credit card uses Enjoy's own portrait instead of generated art —
    // same treatment Lham/Holden's VIP cards already use.
    if (icon === "line") return "/streamers/nexplay/pink-credit-photo.webp";
  }
  return HALLOWEEN_PROMO_ART[icon];
}

export type Promotion = {
  id: string;
  /** Semantic icon key — mapped to a Lucide icon by PromoCardArt. No photo
   * assets: every card's background is drawn in CSS so it renders identically
   * (same colors, same contrast) for every streamer. */
  icon: PromotionIcon;
  badge: string;
  category: string;
  title: string;
  detail: string;
  accent:
    | "pink"
    | "amber"
    | "blue"
    | "violet"
    | "green"
    | "cyan"
    | "red"
    | "gold";
  cta: string;
  availability: "active" | "coming-soon";
  /** Which streamer link the CTA opens. Each promo has its own intended
   * destination:
   *  - "register": ฝากแรกรับโบนัส / โบนัสรายวัน -> สมัครสมาชิกของสตรีมเมอร์นั้น
   *  - "line": เครดิตฟรี 50 -> แอดไลน์ของสตรีมเมอร์นั้น (ไม่ใช่ลิงก์โปรโมชั่นทั่วไป)
   *  - "vip": ยังไม่มีลิงก์ (streamer.links.vip ว่างอยู่ทุกคน) ปุ่มจึงไม่พาไปไหนจนกว่าจะตั้งค่า
   */
  ctaTarget: "register" | "line" | "vip";
};

export const PROMOTIONS: Promotion[] = [
  {
    id: "new-member",
    icon: "deposit",
    badge: "แนะนำ",
    category: "New Member Bonus",
    title: "ฝากแรก รับโบนัส 20%",
    detail: "สูงสุด 2,000 บาท • ทำเทิร์นเพียง 1 เทิร์น",
    accent: "pink",
    cta: "รับโบนัสฝากแรก",
    availability: "active",
    ctaTarget: "register",
  },
  {
    id: "free-credit",
    icon: "line",
    badge: "LINE",
    category: "Free Credit",
    title: "เครดิตฟรี 50",
    detail: "แอดไลน์ ดูไลฟ์ รับเครดิตฟรี 50 ทุกวัน",
    accent: "green",
    cta: "แอดไลน์รับเครดิต",
    availability: "active",
    ctaTarget: "line",
  },
  {
    id: "daily-bonus",
    icon: "calendar",
    badge: "DAILY",
    category: "Daily Bonus",
    title: "โบนัสรายวัน 5%",
    detail: "สูงสุด 20,000 บาท • 1 เทิร์นโอเวอร์",
    accent: "amber",
    cta: "รับโบนัสรายวัน",
    availability: "coming-soon",
    ctaTarget: "register",
  },
  {
    id: "vip",
    icon: "crown",
    badge: "VIP",
    category: "VIP",
    title: "VIP โบนัส",
    detail: "สิทธิพิเศษสำหรับ VIP รับของรางวัลพิเศษทุกยอดฝาก",
    accent: "violet",
    cta: "สมัคร VIP",
    availability: "active",
    ctaTarget: "vip",
  },
];

export const ACTIVE_PROMOTIONS = PROMOTIONS.filter(
  (promotion) => promotion.availability === "active",
);

/** Slade (Bangladesh, Taka) — only the one offer actually confirmed for this
 * brand. The Thai PROMOTIONS above are a different operator's THB-denominated
 * terms (20% deposit bonus, VIP, etc.) that don't apply here, so this is its
 * own short list rather than a translation of theirs. Add more cards here
 * once/if there are more real Slade offers to show. */
export const SLADE_PROMOTIONS: Promotion[] = [
  {
    id: "slade-register-bonus",
    icon: "deposit",
    badge: "নতুন",
    category: "New Member Bonus",
    title: "রেজিস্ট্রেশন বোনাস",
    detail: "নতুন রেজিস্ট্রেশনে ৫০০ টাকা ফ্রি বোনাস",
    accent: "red",
    cta: "এখনই রেজিস্ট্রেশন করুন",
    availability: "active",
    ctaTarget: "register",
  },
];

export function getPromotionsFor(streamer: {
  locale?: "th" | "bn";
}): Promotion[] {
  return streamer.locale === "bn" ? SLADE_PROMOTIONS : PROMOTIONS;
}

export function getActivePromotionsFor(streamer: {
  locale?: "th" | "bn";
}): Promotion[] {
  return getPromotionsFor(streamer).filter(
    (promotion) => promotion.availability === "active",
  );
}
