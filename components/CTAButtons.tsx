"use client";

import { ChevronRight, UserPlus } from "lucide-react";
import AnimatedButton from "@/components/AnimatedButton";
import { type StreamerConfig, usesEnjoyHalloweenUi } from "@/data/streamers";
import { trackEvent, trackLinkClick } from "@/lib/analytics";
import { trackMetaEvent } from "@/lib/metaPixel";

export default function CTAButtons({
  streamer,
}: {
  streamer: StreamerConfig;
}) {
  return (
    <section className="action-grid" aria-label="เมนูหลักด่วน">
      <AnimatedButton
        href={streamer.links.register}
        external
        className="action-card action-purple"
        ariaLabel="ลงทะเบียน สมัครสมาชิกทันที"
        onClick={() => {
          trackLinkClick(streamer.slug, "register");
          trackEvent("register_click", {
            streamer_slug: streamer.slug,
            placement: "cta_row",
          });
          trackMetaEvent("Lead", {
            content_name: "register",
            streamer_slug: streamer.slug,
          });
        }}
      >
        <span className="action-reflection" aria-hidden="true" />
        <span className="action-shine" aria-hidden="true" />
        <span className="action-ripple" aria-hidden="true" />
        <span className="action-icon">
          <UserPlus size={25} />
        </span>
        <span className="action-copy">
          <strong>
            {usesEnjoyHalloweenUi(streamer.slug)
              ? "สมัครเลย"
              : "ลงทะเบียน"}
          </strong>
          <small>
            {usesEnjoyHalloweenUi(streamer.slug)
              ? "เริ่มต้นความสนุก"
              : "สมัครสมาชิกทันที"}
          </small>
        </span>
        <ChevronRight className="action-arrow" size={20} />
      </AnimatedButton>

      <AnimatedButton
        href={streamer.links.line}
        external
        delay={0.05}
        className="action-card action-green"
        ariaLabel="เพิ่มเพื่อน LINE ติดต่อรับโปรโมชั่น"
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
          <strong>ADD LINE</strong>
          <small>
            {usesEnjoyHalloweenUi(streamer.slug)
              ? "รับโปรโมชันที่นี่"
              : "ติดต่อรับโปรโมชั่น"}
          </small>
        </span>
        <ChevronRight className="action-arrow" size={20} />
      </AnimatedButton>
    </section>
  );
}
