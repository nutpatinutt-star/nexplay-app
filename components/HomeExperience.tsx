"use client";

import CTAButtons from "@/components/CTAButtons";
import HeroBanner from "@/components/HeroBanner";
import PromotionCarousel from "@/components/PromotionCarousel";
import SocialSection from "@/components/SocialSection";
import {
  DEFAULT_STREAMER,
  type StreamerConfig,
} from "@/data/streamers";

export default function HomeExperience({
  streamer = DEFAULT_STREAMER,
}: {
  streamer?: StreamerConfig;
  /** Kept for callers still passing it (the "-bonus" subdomain deep link in
   * middleware.ts) — the เช็คสิทธิ์และรับโบนัส entry card it used to
   * auto-open was removed from the page, so it's accepted and ignored. */
  autoOpenClaim?: boolean;
}) {
  return (
    <main className="home-main">
      <HeroBanner streamer={streamer} />
      <CTAButtons streamer={streamer} />
      <SocialSection streamer={streamer} />
      <PromotionCarousel streamer={streamer} />
    </main>
  );
}
