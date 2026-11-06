"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import FloatingParticles from "@/components/FloatingParticles";
import GlowBorder from "@/components/GlowBorder";
import InteractionLayers from "@/components/InteractionLayers";
import PromoCardArt from "@/components/PromoCardArt";
import SectionHeader from "@/components/SectionHeader";
import usePremiumPointer from "@/components/usePremiumPointer";
import {
  ACTIVE_PROMOTIONS,
  halloweenPromoArt,
  type Promotion,
} from "@/data/promotions";
import {
  streamerRoute,
  type StreamerConfig,
  usesEnjoyHalloweenUi,
} from "@/data/streamers";
import { externalLinkProps } from "@/lib/links";
import { trackEvent, trackLinkClick } from "@/lib/analytics";
import { trackMetaEvent } from "@/lib/metaPixel";

const LOOPED_PROMOTIONS = [
  ACTIVE_PROMOTIONS[ACTIVE_PROMOTIONS.length - 1],
  ...ACTIVE_PROMOTIONS,
  ACTIVE_PROMOTIONS[0],
];

function PromotionCard({
  promotion,
  index,
  streamer,
}: {
  promotion: Promotion;
  index: number;
  streamer: StreamerConfig;
}) {
  const reduceMotion = useReducedMotion();
  const pointer = usePremiumPointer({ magnetic: false });
  const ctaUrl =
    promotion.ctaTarget === "line"
      ? streamer.links.line
      : promotion.ctaTarget === "vip"
        ? streamer.links.vip
        : streamer.links.register;

  return (
    <motion.article
      className={`promo-card promo-${promotion.accent} promo-${promotion.id} premium-interactive`}
      initial={reduceMotion ? false : { y: 16 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ delay: index * 0.035, duration: 0.45, ease: "easeOut" }}
      whileHover={reduceMotion ? undefined : { y: -3, scale: 1.012 }}
      onPointerMove={pointer.onPointerMove}
      onPointerLeave={pointer.onPointerLeave}
    >
      <GlowBorder />
      <InteractionLayers />
      <PromoCardArt
        icon={promotion.icon}
        photoOverride={halloweenPromoArt(streamer.slug, promotion.icon)}
        photoAlt={promotion.title}
      />
      <div className="promo-scrim" aria-hidden="true" />
      <span className="promo-glow-orb" aria-hidden="true" />
      <FloatingParticles variant="promotion" />
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
    </motion.article>
  );
}

export default function PromotionCarousel({
  streamer,
}: {
  streamer: StreamerConfig;
}) {
  const showHalloweenLead = usesEnjoyHalloweenUi(streamer.slug);
  const [active, setActive] = useState(showHalloweenLead ? ACTIVE_PROMOTIONS.length - 1 : 0);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const resetTimerRef = useRef<number | null>(null);
  const autoScrollFrameRef = useRef<number | null>(null);
  const pausedRef = useRef(false);
  const visibleRef = useRef(true);

  const getStep = () => {
    const scroller = scrollerRef.current;
    const firstCard = scroller?.querySelector<HTMLElement>(".promo-card");
    if (!scroller || !firstCard) return 0;

    const gap = Number.parseFloat(window.getComputedStyle(scroller).columnGap);
    return firstCard.offsetWidth + (Number.isFinite(gap) ? gap : 0);
  };

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const scroller = scrollerRef.current;
      const step = getStep();
      if (scroller && step) {
        scroller.scrollLeft = (showHalloweenLead ? ACTIVE_PROMOTIONS.length : 1) * step;
      }
    });

    const scrollForward = () => {
      const scroller = scrollerRef.current;
      const step = getStep();
      if (
        !scroller ||
        !step ||
        pausedRef.current ||
        !visibleRef.current ||
        document.hidden
      )
        return;

      const start = scroller.scrollLeft;
      const target = Math.min(
        start + step,
        scroller.scrollWidth - scroller.clientWidth,
      );
      const duration = 1650;
      const startedAt = performance.now();

      if (autoScrollFrameRef.current) {
        window.cancelAnimationFrame(autoScrollFrameRef.current);
      }

      const animate = (now: number) => {
        const progress = Math.min((now - startedAt) / duration, 1);
        const eased =
          progress < 0.5
            ? 4 * progress * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;

        scroller.scrollLeft = start + (target - start) * eased;

        if (progress < 1 && !pausedRef.current) {
          autoScrollFrameRef.current = window.requestAnimationFrame(animate);
        } else {
          autoScrollFrameRef.current = null;
        }
      };

      autoScrollFrameRef.current = window.requestAnimationFrame(animate);
    };

    const autoplay = window.setInterval(() => {
      scrollForward();
    }, 6200);

    const scroller = scrollerRef.current;
    const visibilityObserver = scroller
      ? new IntersectionObserver(
          ([entry]) => {
            visibleRef.current = entry.isIntersecting;
          },
          { threshold: 0 },
        )
      : null;
    if (scroller) visibilityObserver?.observe(scroller);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearInterval(autoplay);
      visibilityObserver?.disconnect();
      if (autoScrollFrameRef.current) {
        window.cancelAnimationFrame(autoScrollFrameRef.current);
      }
      if (resetTimerRef.current) window.clearTimeout(resetTimerRef.current);
    };
  }, [showHalloweenLead]);

  const handleScroll = () => {
    const scroller = scrollerRef.current;
    const step = getStep();
    if (!scroller || !step) return;

    const index = Math.round(scroller.scrollLeft / step);
    const normalized =
      index === 0
        ? ACTIVE_PROMOTIONS.length - 1
        : index === ACTIVE_PROMOTIONS.length + 1
          ? 0
          : Math.max(
              0,
              Math.min(ACTIVE_PROMOTIONS.length - 1, index - 1),
            );
    setActive(normalized);

    if (resetTimerRef.current) window.clearTimeout(resetTimerRef.current);
    resetTimerRef.current = window.setTimeout(() => {
      if (index === 0) {
        scroller.scrollTo({
          left: ACTIVE_PROMOTIONS.length * step,
          behavior: "auto",
        });
      } else if (index === ACTIVE_PROMOTIONS.length + 1) {
        scroller.scrollTo({ left: step, behavior: "auto" });
      }
    }, 110);
  };

  return (
    <section className="content-section promo-section">
      <SectionHeader
        title="โปรโมชั่น"
        icon={<span aria-hidden="true">🔥</span>}
        href={streamerRoute(streamer, "/promotions")}
      />
      <div
        ref={scrollerRef}
        className="promo-scroller no-scrollbar"
        onScroll={handleScroll}
        onTouchStart={() => {
          pausedRef.current = true;
          if (autoScrollFrameRef.current) {
            window.cancelAnimationFrame(autoScrollFrameRef.current);
            autoScrollFrameRef.current = null;
          }
        }}
        onTouchEnd={() => {
          pausedRef.current = false;
        }}
      >
        {LOOPED_PROMOTIONS.map((promotion, index) => (
          <PromotionCard
            key={`${promotion.id}-${index}`}
            promotion={promotion}
            index={index}
            streamer={streamer}
          />
        ))}
      </div>
      <div className="promo-pagination" aria-hidden="true">
        {ACTIVE_PROMOTIONS.map((promotion, index) => (
          <span
            key={promotion.id}
            className={index === active ? "is-active" : ""}
          />
        ))}
      </div>
    </section>
  );
}
