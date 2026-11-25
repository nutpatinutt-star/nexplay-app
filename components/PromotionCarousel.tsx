"use client";

import { ArrowRight } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import PromoCardArt from "@/components/PromoCardArt";
import SectionHeader from "@/components/SectionHeader";
import {
  getActivePromotionsFor,
  halloweenPromoArt,
  type Promotion,
} from "@/data/promotions";
import {
  streamerRoute,
  type StreamerConfig,
} from "@/data/streamers";
import { externalLinkProps } from "@/lib/links";
import { trackEvent, trackLinkClick } from "@/lib/analytics";
import { trackMetaEvent } from "@/lib/metaPixel";

function PromotionCard({
  promotion,
  streamer,
}: {
  promotion: Promotion;
  streamer: StreamerConfig;
}) {
  const ctaUrl =
    promotion.ctaTarget === "line"
      ? streamer.links.line
      : promotion.ctaTarget === "vip"
        ? streamer.links.vip
        : streamer.links.register;

  return (
    <article className={`promo-card promo-${promotion.accent} promo-${promotion.id}`}>
      <PromoCardArt
        icon={promotion.icon}
        photoOverride={halloweenPromoArt(streamer.slug, promotion.icon)}
        photoAlt={promotion.title}
      />
      <div className="promo-scrim" aria-hidden="true" />
      <div className="promo-content">
        <div className="promo-meta">
          <span className="promo-category">{promotion.category}</span>
          <span className="promo-badge">{promotion.badge}</span>
        </div>
        <h3>{promotion.title}</h3>
        <p>{promotion.detail}</p>
        <a
          {...externalLinkProps(ctaUrl)}
          className="promo-cta"
          aria-label={`${promotion.cta}: ${promotion.title}`}
          onClick={(event) => {
            if (!ctaUrl) {
              event.preventDefault();
              return;
            }
            if (promotion.ctaTarget === "register" || promotion.ctaTarget === "line") {
              trackLinkClick(streamer.slug, promotion.ctaTarget);
              trackEvent(
                promotion.ctaTarget === "register" ? "register_click" : "line_click",
                { streamer_slug: streamer.slug, placement: "promotion_card" },
              );
              trackMetaEvent(promotion.ctaTarget === "register" ? "Lead" : "Contact", {
                content_name: promotion.ctaTarget,
                streamer_slug: streamer.slug,
              });
            }
            trackEvent("promotion_click", {
              streamer_slug: streamer.slug,
              placement: "promotion_card",
              promotion_id: promotion.id,
              promotion_category: promotion.category,
            });
          }}
        >
          {promotion.cta}
          <ArrowRight size={13} />
        </a>
      </div>
    </article>
  );
}

export default function PromotionCarousel({
  streamer,
}: {
  streamer: StreamerConfig;
}) {
  const activePromotions = useMemo(
    () => getActivePromotionsFor(streamer),
    [streamer],
  );
  const [active, setActive] = useState(0);
  const scrollerRef = useRef<HTMLDivElement>(null);

  // Plain scroll-snap, no auto-scroll/looping — the dots are driven by
  // which card is nearest centre, read straight off native scroll
  // position. No rAF loop, no timers, no IntersectionObserver.
  const handleScroll = () => {
    const scroller = scrollerRef.current;
    const firstCard = scroller?.querySelector<HTMLElement>(".promo-card");
    if (!scroller || !firstCard) return;

    const gap = Number.parseFloat(window.getComputedStyle(scroller).columnGap);
    const step = firstCard.offsetWidth + (Number.isFinite(gap) ? gap : 0);
    if (!step) return;

    const index = Math.round(scroller.scrollLeft / step);
    setActive(Math.max(0, Math.min(activePromotions.length - 1, index)));
  };

  return (
    <section className="content-section promo-section">
      <SectionHeader
        title={streamer.locale === "bn" ? "অফার" : "โปรโมชั่น"}
        icon={<span aria-hidden="true">🔥</span>}
        href={streamerRoute(streamer, "/promotions")}
        viewAllLabel={streamer.locale === "bn" ? "সব দেখুন" : undefined}
      />
      <div
        ref={scrollerRef}
        className="promo-scroller no-scrollbar"
        onScroll={handleScroll}
      >
        {activePromotions.map((promotion) => (
          <PromotionCard
            key={promotion.id}
            promotion={promotion}
            streamer={streamer}
          />
        ))}
      </div>
      <div className="promo-pagination" aria-hidden="true">
        {activePromotions.map((promotion, index) => (
          <span
            key={promotion.id}
            className={index === active ? "is-active" : ""}
          />
        ))}
      </div>
    </section>
  );
}
