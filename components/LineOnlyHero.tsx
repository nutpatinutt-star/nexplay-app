"use client";

import Image from "next/image";
import FloatingParticles from "@/components/FloatingParticles";
import GlowBorder from "@/components/GlowBorder";
import type { StreamerConfig } from "@/data/streamers";
import { trackEvent } from "@/lib/analytics";
import { trackMetaEvent } from "@/lib/metaPixel";

/** Static single-purpose hero for the LINE-only funnel — same themed visuals
 * as HeroBanner, but no slide rotation and no register/promotions CTA. */
export default function LineOnlyHero({
  streamer,
}: {
  streamer: StreamerConfig;
}) {
  // Dedicated "Ads" Friend-path link (Origin point: friend.liveth.org), not
  // the regular line link — keeps LINE's own Friend-paths analytics able to
  // separate Ads-driven adds from organic/livestream ones.
  const lineHref = streamer.links.lineAds;

  function handleCtaClick() {
    trackEvent("hero_cta_click", {
      streamer_slug: streamer.slug,
      placement: "hero",
      destination_type: "line",
    });
    trackMetaEvent("Contact", {
      content_name: "line",
      streamer_slug: streamer.slug,
      placement: "hero",
    });
  }

  return (
    <section className="hero-stage neon-panel">
      <GlowBorder className="hero-glow-border" />
      <div className="hero-animated-bg" data-hero-bg aria-hidden="true" />
      <div className="hero-moving-glow" data-hero-glow aria-hidden="true" />
      <div className="hero-chest-glow" data-chest-glow aria-hidden="true" />
      <div className="hero-pointer-light" aria-hidden="true" />
      <div className="hero-noise" aria-hidden="true" />
      <div className="hero-art-wrap" data-hero-art>
        <Image
          src={streamer.heroImage}
          alt={streamer.heroAlt}
          fill
          priority
          sizes="(max-width: 540px) 100vw, 520px"
          className="hero-art"
        />
      </div>
      <FloatingParticles variant="hero" />
      <div className="hero-vignette" aria-hidden="true" />
      <div className="hero-scanline" aria-hidden="true" />
      <div className="hero-glass-overlay" aria-hidden="true" />
      <span className="float-orb orb-one" data-float-orb aria-hidden="true" />
      <span className="float-orb orb-two" data-float-orb aria-hidden="true" />

      <div className="hero-content">
        <div className="live-row" data-hero-copy>
          <span className="live-badge">LIVE</span>
          <span className="live-dot" />
          <span>{streamer.displayName}</span>
        </div>
        <h1 data-hero-copy>
          แอดไลน์
          <span>ติดต่อทีมงานโดยตรง</span>
        </h1>
        <p data-hero-copy>
          <span>พูดคุยและสอบถามข้อมูลได้ทันที</span>
        </p>
        <div className="viewer-row" data-hero-copy>
          <div className="avatar-stack" aria-hidden="true">
            {[0, 1, 2].map((index) => (
              <Image
                key={index}
                src={
                  streamer.slug === "nexplay"
                    ? `/images/avatar-${["orange", "blue", "pink"][index]}.svg`
                    : streamer.avatarImage
                }
                alt=""
                width={22}
                height={22}
              />
            ))}
          </div>
          <strong>{streamer.followers}</strong>
        </div>

        <div data-hero-cta>
          {/* Same-tab navigation, not target="_blank" — Facebook/Instagram's
             in-app browser frequently fails to hand off the LINE deep-link
             (lin.ee -> the LINE app) when opened via a new tab, but handles
             top-level same-tab navigation reliably. */}
          <a
            href={lineHref || undefined}
            rel="noopener"
            className="hero-cta"
            aria-label="เพิ่มเพื่อน LINE"
            onClick={(event) => {
              if (!lineHref) {
                event.preventDefault();
                return;
              }
              handleCtaClick();
            }}
          >
            <span className="hero-cta-shine" aria-hidden="true" />
            <span>เพิ่มเพื่อน LINE</span>
          </a>
        </div>
      </div>
    </section>
  );
}
