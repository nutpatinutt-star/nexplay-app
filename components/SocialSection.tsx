"use client";

import { ArrowRight, BadgeCheck, Heart } from "lucide-react";
import type { IconType } from "react-icons";
import {
  SiFacebook,
  SiInstagram,
  SiLine,
  SiTiktok,
} from "react-icons/si";
import AnimatedButton from "@/components/AnimatedButton";
import SectionHeader from "@/components/SectionHeader";
import {
  streamerRoute,
  type StreamerConfig,
  usesEnjoyHalloweenUi,
} from "@/data/streamers";
import { trackEvent, trackLinkClick } from "@/lib/analytics";
import { trackMetaEvent } from "@/lib/metaPixel";

const SOCIAL_ITEMS: {
  label: string;
  key: "facebook" | "instagram" | "tiktok" | "line";
  icon: IconType;
  tone: string;
}[] = [
  {
    label: "Facebook",
    key: "facebook",
    icon: SiFacebook,
    tone: "facebook",
  },
  {
    label: "LINE",
    key: "line",
    icon: SiLine,
    tone: "line",
  },
  {
    label: "Instagram",
    key: "instagram",
    icon: SiInstagram,
    tone: "instagram",
  },
  {
    label: "TikTok",
    key: "tiktok",
    icon: SiTiktok,
    tone: "tiktok",
  },
];

export default function SocialSection({
  streamer,
}: {
  streamer: StreamerConfig;
}) {
  const isBengali = streamer.locale === "bn";
  // Slade (and any other singleCta streamer) has no LINE account — Bangladesh
  // doesn't use LINE, so that tile would never have a real destination.
  const items = streamer.singleCta
    ? SOCIAL_ITEMS.filter((item) => item.key !== "line")
    : SOCIAL_ITEMS;

  return (
    <section className="content-section social-section">
      <SectionHeader
        title={streamer.socialTitle}
        icon={
          usesEnjoyHalloweenUi(streamer.slug) ? (
            <Heart
              className="social-heading-heart"
              size={18}
              fill="currentColor"
              aria-hidden="true"
            />
          ) : undefined
        }
        href={streamerRoute(streamer, "/follow")}
        viewAllLabel={isBengali ? "সব দেখুন" : undefined}
      />
      <div className="social-strip no-scrollbar">
        {items.map((item) => {
          const Icon = item.icon;
          const followers = streamer.socialFollowers[item.key];
          const href = streamer.links[item.key];
          const isAvailable = Boolean(href);
          return (
            <AnimatedButton
              key={item.label}
              href={href}
              external
              className={`social-item social-${item.tone}`}
              ariaLabel={
                isBengali
                  ? `${item.label} ফলো করুন ${followers}`
                  : `ติดตาม ${item.label} ${followers}`
              }
              onClick={() => {
                if (item.key === "line") {
                  trackLinkClick(streamer.slug, "line");
                  trackEvent("line_click", {
                    streamer_slug: streamer.slug,
                    placement: "social",
                  });
                  trackMetaEvent("Contact", {
                    content_name: "line",
                    streamer_slug: streamer.slug,
                  });
                }
                trackEvent("social_follow_click", {
                  streamer_slug: streamer.slug,
                  placement: "social",
                  social_platform: item.key,
                });
              }}
            >
              <span className="social-card-shine" aria-hidden="true" />
              <span className="social-pulse" aria-hidden="true" />
              <span className="social-icon">
                <Icon size={25} aria-hidden="true" />
              </span>
              <span className="social-copy">
                <strong>
                  {item.label}
                  <BadgeCheck
                    className="social-verified"
                    size={14}
                    aria-label={isBengali ? "ভেরিফাইড অ্যাকাউন্ট" : "บัญชียืนยันแล้ว"}
                  />
                </strong>
                <small>
                  {isAvailable
                    ? followers
                    : isBengali
                      ? "শীঘ্রই আসছে"
                      : "เร็วๆ นี้"}
                </small>
              </span>
              <span className="social-follow">
                {isAvailable ? (
                  <>
                    {isBengali ? "ফলো করুন" : "ติดตาม"}
                    <ArrowRight size={13} />
                  </>
                ) : (
                  "-"
                )}
              </span>
            </AnimatedButton>
          );
        })}
      </div>
    </section>
  );
}
