import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LineOnlyExperience from "@/components/LineOnlyExperience";
import { getStreamerBySlug, STREAMER_SLUGS } from "@/data/streamers";

type LinePageProps = {
  params: Promise<{ streamer: string }>;
};

export function generateStaticParams() {
  return STREAMER_SLUGS.map((streamer) => ({ streamer }));
}

export async function generateMetadata({
  params,
}: LinePageProps): Promise<Metadata> {
  const { streamer: slug } = await params;
  const streamer = getStreamerBySlug(slug);

  if (!streamer || streamer.slug === "nexplay") return {};

  const title = `เพิ่มเพื่อน LINE — ${streamer.displayName}`;
  const description = "แอดไลน์เพื่อติดต่อทีมงานและติดตามข่าวสาร";

  return {
    title,
    description,
    openGraph: { title, description, siteName: streamer.displayName },
    twitter: { title, description },
  };
}

export default async function StreamerLineOnlyPage({
  params,
}: LinePageProps) {
  const { streamer: slug } = await params;
  const streamer = getStreamerBySlug(slug);

  if (!streamer || streamer.slug === "nexplay") notFound();

  // heroSlides carries marketing copy (e.g. the shared "rewards" slide
  // mentions "เครดิตฟรี") that this page never renders but that would
  // otherwise still ship in the page's serialized props — strip it so no
  // credit/bonus wording reaches the HTML at all.
  return <LineOnlyExperience streamer={{ ...streamer, heroSlides: [] }} />;
}
