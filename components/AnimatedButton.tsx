import Link from "next/link";
import type { ReactNode } from "react";
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
  onClick?: () => void;
};

/** Plain link/anchor — no entrance animation, hover spring, pointer-tilt or
 * glow layer. Hover/tap feedback (if any) is plain CSS (:hover/:active) on
 * `className`, not JS. */
export default function AnimatedButton({
  href,
  external = false,
  sameTab = false,
  className,
  ariaLabel,
  children,
  onClick,
}: AnimatedButtonProps) {
  if (external) {
    const linkProps = sameTab
      ? { href: href || undefined, rel: "noopener" }
      : externalLinkProps(href);
    return (
      <a
        {...linkProps}
        className={className}
        aria-label={ariaLabel}
        onClick={(event) => {
          if (!href) {
            event.preventDefault();
            return;
          }
          onClick?.();
        }}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={className}
      aria-label={ariaLabel}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
