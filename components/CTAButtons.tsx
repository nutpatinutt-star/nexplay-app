"use client";

import { ChevronRight, Gift, UserPlus } from "lucide-react";
import AnimatedButton from "@/components/AnimatedButton";
import { type StreamerConfig, usesEnjoyHalloweenUi } from "@/data/streamers";
import { trackEvent, trackLinkClick } from "@/lib/analytics";
import { trackMetaEvent } from "@/lib/metaPixel";

export default function CTAButtons({
  streamer,
}: {
  streamer: StreamerConfig;
}) {
  const isBengali = streamer.locale === "bn";
  // singleCta streamers (e.g. Slade) have no second channel — the second
  // card still exists (same two-card template as every other streamer) but
  // repeats the register link instead of a LINE destination it doesn't have.
  const secondHref = streamer.singleCta
    ? streamer.links.register
    : streamer.links.line;

  return (
    <section
      className="action-grid"
      aria-label={isBengali ? "দ্রুত মেনু" : "เมนูหลักด่วน"}
    >
      <AnimatedButton
        href={streamer.links.register}
        external
        className="action-card action-purple"
        ariaLabel={
          isBengali
            ? "রেজিস্ট্রেশন করে ৫০০ টাকা ফ্রি নিন"
            : "ลงทะเบียน สมัครสมาชิกทันที"
        }
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
            {isBengali
              ? "রেজিস্ট্রেশন"
              : usesEnjoyHalloweenUi(streamer.slug)
                ? "สมัครเลย"
                : "ลงทะเบียน"}
          </strong>
          <small>
            {isBengali
              ? "এখনই শুরু করুন"
              : usesEnjoyHalloweenUi(streamer.slug)
                ? "เริ่มต้นความสนุก"
                : "สมัครสมาชิกทันที"}
          </small>
        </span>
        <ChevronRight className="action-arrow" size={20} />
      </AnimatedButton>

      <AnimatedButton
        href={secondHref}
        external
        className="action-card action-green"
        ariaLabel={
          isBengali
            ? "এখনই রেজিস্ট্রেশন করুন"
            : "เพิ่มเพื่อน LINE ติดต่อรับโปรโมชั่น"
        }
        onClick={() => {
          if (streamer.singleCta) {
            trackLinkClick(streamer.slug, "register");
            trackEvent("register_click", {
              streamer_slug: streamer.slug,
              placement: "cta_row",
            });
            trackMetaEvent("Lead", {
              content_name: "register",
              streamer_slug: streamer.slug,
            });
            return;
          }
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
          {streamer.singleCta ? (
            <Gift size={25} />
          ) : (
            <span className="line-brand-mark" aria-hidden="true">
              LINE
            </span>
          )}
        </span>
        <span className="action-copy">
          <strong>{streamer.singleCta ? "৫০০ টাকা ফ্রি নিন" : "ADD LINE"}</strong>
          <small>
            {isBengali
              ? "রেজিস্ট্রেশন করুন"
              : usesEnjoyHalloweenUi(streamer.slug)
                ? "รับโปรโมชันที่นี่"
                : "ติดต่อรับโปรโมชั่น"}
          </small>
        </span>
        <ChevronRight className="action-arrow" size={20} />
      </AnimatedButton>
    </section>
  );
}
