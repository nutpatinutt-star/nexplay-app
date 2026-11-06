"use client";

import { gsap } from "gsap";
import { Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import FloatingParticles from "@/components/FloatingParticles";
import GlowBorder from "@/components/GlowBorder";
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
  const heroRef = useRef<HTMLElement>(null);
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

  useLayoutEffect(() => {
    const hero = heroRef.current;
    if (!hero || reduceMotion) return;

    const loopTweens: gsap.core.Tween[] = [];

    const context = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .fromTo(
          "[data-hero-copy]",
          { autoAlpha: 0, y: 18 },
          { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.06 },
        )
        .fromTo(
          "[data-hero-cta]",
          { autoAlpha: 0, scale: 0.94 },
          { autoAlpha: 1, scale: 1, duration: 0.45 },
          "-=0.3",
        );

      loopTweens.push(
        gsap.to("[data-hero-art]", {
          y: -7,
          duration: 3.4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          force3D: true,
        }),
        gsap.to("[data-float-orb]", {
          y: -12,
          rotate: 8,
          duration: 2.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          stagger: 0.35,
          force3D: true,
        }),
        gsap.to("[data-hero-glow]", {
          xPercent: 62,
          yPercent: -18,
          scale: 1.18,
          duration: 8.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          force3D: true,
        }),
        gsap.to("[data-chest-glow]", {
          scale: 1.12,
          autoAlpha: 0.92,
          duration: 2.7,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          force3D: true,
        }),
      );
    }, hero);

    // Pause the ambient loops while the hero is scrolled off-screen so they
    // don't keep competing with scroll compositing for no visible benefit.
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        for (const tween of loopTweens) {
          if (entry.isIntersecting) tween.play();
          else tween.pause();
        }
      },
      { threshold: 0 },
    );
    visibilityObserver.observe(hero);

    const move = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;

      const rect = hero.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      hero.style.setProperty(
        "--pointer-x",
        `${Math.max(0, Math.min(rect.width, event.clientX - rect.left))}px`,
      );
      hero.style.setProperty(
        "--pointer-y",
        `${Math.max(0, Math.min(rect.height, event.clientY - rect.top))}px`,
      );
      gsap.to(hero.querySelector("[data-hero-art]"), {
        x: x * 9,
        y: y * 6 - 4,
        duration: 0.7,
        ease: "power2.out",
        overwrite: "auto",
        force3D: true,
      });
      gsap.to(hero.querySelector("[data-hero-bg]"), {
        x: x * 15,
        y: y * 10,
        duration: 1.1,
        ease: "power2.out",
        overwrite: "auto",
        force3D: true,
      });
      gsap.to(hero.querySelector("[data-particle-field]"), {
        x: x * -11,
        y: y * -7,
        duration: 1,
        ease: "power2.out",
        overwrite: "auto",
        force3D: true,
      });
    };

    const leave = () => {
      hero.style.setProperty("--pointer-x", "62%");
      hero.style.setProperty("--pointer-y", "42%");
      gsap.to(hero.querySelector("[data-hero-art]"), {
        x: 0,
        duration: 0.7,
        ease: "power2.out",
        overwrite: "auto",
      });
      gsap.to(
        [
          hero.querySelector("[data-hero-bg]"),
          hero.querySelector("[data-particle-field]"),
        ],
        {
          x: 0,
          y: 0,
          duration: 0.9,
          ease: "power2.out",
          overwrite: "auto",
        },
      );
    };

    hero.addEventListener("pointermove", move);
    hero.addEventListener("pointerleave", leave);
    return () => {
      visibilityObserver.disconnect();
      hero.removeEventListener("pointermove", move);
      hero.removeEventListener("pointerleave", leave);
      context.revert();
    };
  }, [activeSlide, reduceMotion]);

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
    <section ref={heroRef} className="hero-stage neon-panel">
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
      {isHalloweenLead && (
        <div className="hero-halloween-accents" aria-hidden="true">
          <span className="hero-halloween-accent-bat">🦇</span>
          <span className="hero-halloween-accent-heart hero-halloween-accent-heart-one">♡</span>
          <span className="hero-halloween-accent-heart hero-halloween-accent-heart-two">♡</span>
        </div>
      )}
      <span className="float-orb orb-one" data-float-orb aria-hidden="true" />
      <span className="float-orb orb-two" data-float-orb aria-hidden="true" />

      <div
        className={`hero-content${slide.compact ? " hero-content-compact" : ""}${isHalloweenLead ? " hero-content-halloween-lead" : ""}`}
        key={activeSlide}
      >
        <div className="live-row" data-hero-copy>
          <span className="live-badge">LIVE</span>
          <span className="live-dot" />
          <span>{slide.eyebrow}</span>
        </div>
        <h1 data-hero-copy>
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
        <p data-hero-copy>
          {slide.description.split("\n").map((line) => (
            <span key={line}>{line}</span>
          ))}
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

      <div className="hero-pagination" aria-label="เลือกไฮไลต์">
        {streamer.heroSlides.map((item, index) => (
          <button
            key={`${index}-${item.title}`}
            type="button"
            className={index === activeSlide ? "is-active" : ""}
            onClick={() => setActiveSlide(index)}
            aria-label={`ไฮไลต์ ${index + 1}: ${item.title}`}
            aria-current={index === activeSlide}
          />
        ))}
      </div>
    </section>
  );
}
