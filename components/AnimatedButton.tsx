"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import type { ReactNode } from "react";
import InteractionLayers from "@/components/InteractionLayers";
import usePremiumPointer from "@/components/usePremiumPointer";
import { externalLinkProps } from "@/lib/links";

type AnimatedButtonProps = {
  href: string;
  external?: boolean;
  /** Opens in the same tab instead of target="_blank". Facebook/Instagram's
   * in-app browser frequently fails to hand off external app deep-links
   * (e.g. lin.ee -> the LINE app) when triggered via a new-tab open, but
   * handles top-level same-tab navigation reliably — use this for links
   * meant to open another app from ad-driven traffic. */
  sameTab?: boolean;
  className: string;
  ariaLabel: string;
  children: ReactNode;
  delay?: number;
  lift?: number;
  hoverScale?: number;
  tapScale?: number;
  onClick?: () => void;
};

export default function AnimatedButton({
  href,
  external = false,
  sameTab = false,
  className,
  ariaLabel,
  children,
  delay = 0,
  lift = 2,
  hoverScale = 1.012,
  tapScale = 0.97,
  onClick,
}: AnimatedButtonProps) {
  const reduceMotion = useReducedMotion();
  const pointer = usePremiumPointer({
    strength: 0.076 + lift * 0.006,
    tilt: 2.6,
  });
  const interactiveClassName = `${className} premium-interactive`.trim();
  const motionProps = {
    initial: reduceMotion ? false : { opacity: 0, y: 14, scale: 0.98 },
    whileInView: { opacity: 1, y: 0, scale: 1 },
    viewport: { once: true, margin: "-20px" },
    whileHover: reduceMotion
      ? undefined
      : { scale: hoverScale, y: -lift },
    whileFocus: reduceMotion ? undefined : { scale: 1.006, y: -1 },
    whileTap: reduceMotion ? undefined : { scale: tapScale, y: 0 },
    transition: {
      delay: reduceMotion ? 0 : delay,
      type: "spring" as const,
      stiffness: 460,
      damping: 30,
      mass: 0.58,
    },
  };

  if (external) {
    const linkProps = sameTab
      ? { href: href || undefined, rel: "noopener" }
      : externalLinkProps(href);
    return (
      <motion.a
        {...linkProps}
        {...motionProps}
        style={pointer.style}
        onPointerMove={pointer.onPointerMove}
        onPointerLeave={pointer.onPointerLeave}
        className={interactiveClassName}
        aria-label={ariaLabel}
        onClick={(event) => {
          if (!href) {
            event.preventDefault();
            return;
          }
          onClick?.();
        }}
      >
        <InteractionLayers />
        {children}
      </motion.a>
    );
  }

  return (
    <motion.div
      {...motionProps}
      style={pointer.style}
      onPointerMove={pointer.onPointerMove}
      onPointerLeave={pointer.onPointerLeave}
      className="animated-button-wrap"
    >
      <Link
        href={href}
        className={interactiveClassName}
        aria-label={ariaLabel}
        onClick={onClick}
      >
        <InteractionLayers />
        {children}
      </Link>
    </motion.div>
  );
}
