"use client";

import LineOnlyCTA from "@/components/LineOnlyCTA";
import LineOnlyHero from "@/components/LineOnlyHero";
import SocialSection from "@/components/SocialSection";
import type { StreamerConfig } from "@/data/streamers";

/** LINE-only funnel — a dedicated duplicate of the streamer page with the
 * register CTA, Claim Bonus entry, and promotions carousel all removed, so
 * the only action on the page is adding LINE. Copy deliberately avoids any
 * credit/bonus/monetary-incentive wording — Meta's ad review flags that
 * language for gambling-adjacent policy violations. Lives at
 * /[streamer]/line — the original /[streamer] page and its links are
 * untouched. */
export default function LineOnlyExperience({
  streamer,
}: {
  streamer: StreamerConfig;
}) {
  return (
    <main className="home-main">
      <LineOnlyHero streamer={streamer} />
      <LineOnlyCTA streamer={streamer} />
      <SocialSection streamer={streamer} />
    </main>
  );
}
