"use client";

import type { CSSProperties } from "react";

type FloatingParticlesProps = {
  variant: "hero" | "promotion";
  count?: number;
};

const HERO_PARTICLES = Array.from({ length: 22 }, (_, index) => ({
  x: `${7 + ((index * 37) % 89)}%`,
  y: `${8 + ((index * 29) % 78)}%`,
  size: `${2 + (index % 4)}px`,
  delay: `${-(index % 9) * 0.72}s`,
  duration: `${6.5 + (index % 6) * 1.15}s`,
  drift: `${-14 + (index % 7) * 5}px`,
}));

export default function FloatingParticles({
  variant,
  count,
}: FloatingParticlesProps) {
  if (variant === "hero") {
    return (
      <div
        className="hero-particle-field"
        data-particle-field
        aria-hidden="true"
      >
        {HERO_PARTICLES.slice(0, count ?? HERO_PARTICLES.length).map(
          (particle, index) => (
            <span
              key={`${particle.x}-${particle.y}`}
              className={`hero-particle ${index % 5 === 0 ? "is-bright" : ""}`}
              style={
                {
                  "--particle-x": particle.x,
                  "--particle-y": particle.y,
                  "--particle-size": particle.size,
                  "--particle-delay": particle.delay,
                  "--particle-duration": particle.duration,
                  "--particle-drift": particle.drift,
                } as CSSProperties
              }
            />
          ),
        )}
      </div>
    );
  }

  const particleCount = count ?? 5;
  return (
    <span className="promo-particles" aria-hidden="true">
      {Array.from({ length: particleCount }, (_, index) => (
        <i key={index} />
      ))}
    </span>
  );
}
