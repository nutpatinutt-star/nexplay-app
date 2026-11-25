import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PromotionsExperience } from "@/components/SecondaryExperiences";
import {
  getStreamerBySlug,
  STREAMER_SLUGS,
} from "@/data/streamers";

type StreamerPromotionsPageProps = {
  params: Promise<{ streamer: string }>;
};

export function generateStaticParams() {
  return STREAMER_SLUGS.map((streamer) => ({ streamer }));
}

export async function generateMetadata({
  params,
}: StreamerPromotionsPageProps): Promise<Metadata> {
  const { streamer: slug } = await params;
  const streamer = getStreamerBySlug(slug);

  if (!streamer || streamer.slug === "nexplay") return {};

  return streamer.locale === "bn"
    ? {
        title: `${streamer.name} অফার`,
        description: `${streamer.name} এর সদস্যদের জন্য সকল অফার ও সুবিধা`,
      }
    : {
        title: `โปรโมชั่น ${streamer.name}`,
        description: `รวมโปรโมชั่นและสิทธิพิเศษสำหรับผู้ติดตาม ${streamer.name}`,
      };
}

export default async function StreamerPromotionsPage({
  params,
}: StreamerPromotionsPageProps) {
  const { streamer: slug } = await params;
  const streamer = getStreamerBySlug(slug);

  if (!streamer || streamer.slug === "nexplay") notFound();

  return <PromotionsExperience streamer={streamer} />;
}
