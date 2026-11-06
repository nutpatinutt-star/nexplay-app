import type { Metadata } from "next";
import LineOnlyExperience from "@/components/LineOnlyExperience";
import { DEFAULT_STREAMER } from "@/data/streamers";

const lineTitle = `เพิ่มเพื่อน LINE — ${DEFAULT_STREAMER.displayName}`;
const lineDescription = "แอดไลน์เพื่อติดต่อทีมงานและติดตามข่าวสาร";

export const metadata: Metadata = {
  title: lineTitle,
  description: lineDescription,
  // Without explicit overrides here, Next.js inherits the root layout's
  // openGraph/twitter blocks wholesale (its default description mentions
  // "โปรโมชั่น"/"สิทธิพิเศษ") instead of merging in this page's description.
  openGraph: {
    title: lineTitle,
    description: lineDescription,
    siteName: DEFAULT_STREAMER.displayName,
  },
  twitter: { title: lineTitle, description: lineDescription },
};

export default function LineOnlyHomePage() {
  // heroSlides carries marketing copy (e.g. the shared "rewards" slide
  // mentions "เครดิตฟรี") that this page never renders but that would
  // otherwise still ship in the page's serialized props — strip it so no
  // credit/bonus wording reaches the HTML at all. heroAlt is overridden too:
  // the shared default ("...กล่องรางวัล") mentions a prize box.
  return (
    <LineOnlyExperience
      streamer={{
        ...DEFAULT_STREAMER,
        heroSlides: [],
        heroAlt: `${DEFAULT_STREAMER.displayName} ไลฟ์สด`,
      }}
    />
  );
}
