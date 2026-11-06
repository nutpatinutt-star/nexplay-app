import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import HomeExperience from "@/components/HomeExperience";
import {
  getStreamerBySlug,
  STREAMER_SLUGS,
} from "@/data/streamers";

type StreamerPageProps = {
  params: Promise<{ streamer: string }>;
};

export function generateStaticParams() {
  return STREAMER_SLUGS.map((streamer) => ({ streamer }));
}

export async function generateMetadata({
  params,
}: StreamerPageProps): Promise<Metadata> {
  const { streamer: slug } = await params;
  const streamer = getStreamerBySlug(slug);

  if (!streamer || streamer.slug === "nexplay") return {};

  const description =
    "ติดตามไลฟ์สดได้ทุกวัน พร้อมโปรโมชั่นและสิทธิพิเศษสำหรับสมาชิก";

  return {
    title: streamer.displayName,
    description,
    openGraph: {
      title: streamer.displayName,
      description,
      siteName: streamer.displayName,
    },
    twitter: {
      title: streamer.displayName,
      description,
    },
  };
}

export default async function StreamerHomePage({
  params,
}: StreamerPageProps) {
  const { streamer: slug } = await params;
  const streamer = getStreamerBySlug(slug);

  if (!streamer || streamer.slug === "nexplay") notFound();

  const headerList = await headers();
  const autoOpenClaim = headerList.get("x-claim-autoopen") === "1";

  return <HomeExperience streamer={streamer} autoOpenClaim={autoOpenClaim} />;
}
