import { CalendarClock, Crown, MessageCircle, Wallet } from "lucide-react";
import Image from "next/image";
import type { PromotionIcon } from "@/data/promotions";

const PROMO_ICONS: Record<PromotionIcon, typeof Wallet> = {
  deposit: Wallet,
  line: MessageCircle,
  calendar: CalendarClock,
  crown: Crown,
};

/** Shared CSS-only background for every promo card — a per-accent gradient
 * field, dot-grid texture and a glowing icon medallion. No photo asset, so
 * every streamer renders the exact same card: same colors, same contrast.
 *
 * `photoOverride` swaps that in for a generated illustration instead —
 * used for Enjoy/Lham Halloween promo cards (see
 * data/promotions.ts `halloweenPromoArt`). The art itself already
 * reserves a dark empty zone on one side for the card's text, same as the
 * generic version. */
export default function PromoCardArt({
  icon,
  photoOverride,
  photoAlt,
}: {
  icon: PromotionIcon;
  photoOverride?: string;
  photoAlt?: string;
}) {
  if (photoOverride) {
    return (
      <div className="promo-art promo-art-photo" aria-hidden="true">
        <Image
          src={photoOverride}
          alt={photoAlt ?? ""}
          fill
          sizes="(max-width: 540px) 56vw, 280px"
          className="promo-art-photo-img"
        />
      </div>
    );
  }

  const Icon = PROMO_ICONS[icon];

  return (
    <div className="promo-art" aria-hidden="true">
      <span className="promo-art-medallion">
        <Icon className="promo-art-icon" strokeWidth={1.6} />
      </span>
    </div>
  );
}
