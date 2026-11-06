"use client";

import { ChevronRight } from "lucide-react";
import AnimatedButton from "@/components/AnimatedButton";
import type { StreamerConfig } from "@/data/streamers";
import { trackEvent, trackLinkClick } from "@/lib/analytics";
import { trackMetaEvent } from "@/lib/metaPixel";

/** Single full-width LINE CTA — the LINE-only funnel's only action. */
export default function LineOnlyCTA({
  streamer,
}: {
  streamer: StreamerConfig;
}) {
  return (
    <section className="action-grid action-grid-single" aria-label="เมนูหลักด่วน">
      {/* Dedicated "Ads" Friend-path link (Origin point: friend.liveth.org),
         not the regular line link — keeps LINE's own Friend-paths analytics
         able to separate Ads-driven adds from organic/livestream ones. */}
      <AnimatedButton
        href={streamer.links.lineAds}
        external
        sameTab
        className="action-card action-green"
        ariaLabel="เพิ่มเพื่อน LINE ติดต่อทีมงาน"
        onClick={() => {
          trackLinkClick(streamer.slug, "line");
          trackEvent("line_click", {
            streamer_slug: streamer.slug,
            placement: "cta_row",
          });
          trackMetaEvent("Contact", {
            content_name: "line",
            streamer_slug: streamer.slug,
          });
        }}
      >
        <span className="action-reflection" aria-hidden="true" />
        <span className="action-shine" aria-hidden="true" />
        <span className="action-ripple" aria-hidden="true" />
        <span className="action-icon">
          <span className="line-brand-mark" aria-hidden="true">
            LINE
          </span>
        </span>
        <span className="action-copy">
          <strong className="action-copy-highlight">แอดไลน์</strong>
          <small>ติดต่อทีมงาน</small>
        </span>
        <ChevronRight className="action-arrow" size={20} />
      </AnimatedButton>
    </section>
  );
}
