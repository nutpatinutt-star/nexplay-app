import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FollowExperience } from "@/components/SecondaryExperiences";
import {
  getStreamerBySlug,
  STREAMER_SLUGS,
} from "@/data/streamers";

type StreamerFollowPageProps = {
  params: Promise<{ streamer: string }>;
};

export function generateStaticParams() {
  return STREAMER_SLUGS.map((streamer) => ({ streamer }));
}

export async function generateMetadata({
  params,
}: StreamerFollowPageProps): Promise<Metadata> {
  const { streamer: slug } = await params;
  const streamer = getStreamerBySlug(slug);

  return streamer && streamer.slug !== "nexplay"
    ? {
        title: `ติดตาม ${streamer.name}`,
        description: `ช่องทางติดตามและตารางไลฟ์ล่าสุดของ ${streamer.name}`,
      }
    : {};
}

export default async function StreamerFollowPage({
  params,
}: StreamerFollowPageProps) {
  const { streamer: slug } = await params;
  const streamer = getStreamerBySlug(slug);

  if (!streamer || streamer.slug === "nexplay") notFound();

  return <FollowExperience streamer={streamer} />;
}
