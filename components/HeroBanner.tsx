"use client";

import { Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  streamerRoute,
  type StreamerConfig,
  usesEnjoyHalloweenUi,
} from "@/data/streamers";
import { externalLinkProps } from "@/lib/links";
import { trackEvent, trackLinkClick } from "@/lib/analytics";
import { trackMetaEvent } from "@/lib/metaPixel";

export default function HeroBanner({
  streamer,
}: {
  streamer: StreamerConfig;
}) {
  const [activeSlide, setActiveSlide] = useState(0);
  const reduceMotion = useReducedMotion();
  const slide = streamer.heroSlides[activeSlide];
  const isHalloweenLead =
    usesEnjoyHalloweenUi(streamer.slug) && activeSlide === 0;

  useEffect(() => {
    if (reduceMotion) return;
    const timer = window.setInterval(
      () =>
        setActiveSlide(
          (current) => (current + 1) % streamer.heroSlides.length,
        ),
      6500,
    );
    return () => window.clearInterval(timer);
  }, [reduceMotion, streamer.heroSlides.length]);

  const ctaHref =
    slide.action === "promotions"
      ? streamerRoute(streamer, "/promotions")
      : streamer.links[slide.action];
  const isExternal = slide.action !== "promotions";
  const handleCtaClick = () => {
    if (slide.action === "line" || slide.action === "register") {
      trackLinkClick(streamer.slug, slide.action);
      trackEvent(slide.action === "register" ? "register_click" : "line_click", {
        streamer_slug: streamer.slug,
        placement: "hero",
      });
      trackMetaEvent(slide.action === "register" ? "Lead" : "Contact", {
        content_name: slide.action,
        streamer_slug: streamer.slug,
      });
    }
    trackEvent("hero_cta_click", {
      streamer_slug: streamer.slug,
      placement: "hero",
      destination_type: slide.action,
    });
  };
  const ctaContent = (
    <>
      <span>{slide.cta}</span>
      <Play size={15} fill="currentColor" />
    </>
  );

  return (
    <section className="hero-stage neon-panel">
      <div className="hero-animated-bg" aria-hidden="true" />
      <div className="hero-art-wrap">
        <Image
          src={streamer.heroImage}
          alt={streamer.heroAlt}
          fill
          priority
          sizes="(max-width: 540px) 100vw, 520px"
          className="hero-art"
        />
      </div>
      <div className="hero-vignette" aria-hidden="true" />
      {isHalloweenLead && (
        <div className="hero-halloween-accents" aria-hidden="true">
          <span className="hero-halloween-accent-bat">🦇</span>
          <span className="hero-halloween-accent-heart hero-halloween-accent-heart-one">♡</span>
          <span className="hero-halloween-accent-heart hero-halloween-accent-heart-two">♡</span>
        </div>
      )}

      <div
        className={`hero-content${slide.compact ? " hero-content-compact" : ""}${isHalloweenLead ? " hero-content-halloween-lead" : ""}`}
        key={activeSlide}
      >
        <div className="live-row">
          <span className="live-badge">LIVE</span>
          <span className="live-dot" />
          <span>{slide.eyebrow}</span>
        </div>
        <h1>
          {slide.title}
          {isHalloweenLead && (
            <span className="hero-halloween-pumpkin" aria-hidden="true">
              🎃
            </span>
          )}
          <span>
            {slide.highlight}
          </span>
        </h1>
        <p>
          {slide.description.split("\n").map((line) => (
            <span key={line}>{line}</span>
          ))}
        </p>
        <div className="viewer-row">
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

        <div>
          {isExternal ? (
            <a
              {...externalLinkProps(ctaHref)}
              className="hero-cta"
              aria-label={slide.cta}
              onClick={(event) => {
                if (!ctaHref) {
                  event.preventDefault();
                  return;
                }
                handleCtaClick();
              }}
            >
              <span className="hero-cta-shine" aria-hidden="true" />
              {ctaContent}
            </a>
          ) : (
            <Link href={ctaHref} className="hero-cta" onClick={handleCtaClick}>
              <span className="hero-cta-shine" aria-hidden="true" />
              {ctaContent}
            </Link>
          )}
        </div>
      </div>

      <div
        className="hero-pagination"
        aria-label={
          streamer.locale === "bn" ? "হাইলাইট নির্বাচন করুন" : "เลือกไฮไลต์"
        }
      >
        {streamer.heroSlides.map((item, index) => (
          <button
            key={`${index}-${item.title}`}
            type="button"
            className={index === activeSlide ? "is-active" : ""}
            onClick={() => setActiveSlide(index)}
            aria-label={
              streamer.locale === "bn"
                ? `হাইলাইট ${index + 1}: ${item.title}`
                : `ไฮไลต์ ${index + 1}: ${item.title}`
            }
            aria-current={index === activeSlide}
          />
        ))}
      </div>
    </section>
  );
}
