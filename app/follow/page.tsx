import type { Metadata } from "next";
import { FollowExperience } from "@/components/SecondaryExperiences";

export const metadata: Metadata = {
  title: "ติดตาม",
  description: "ช่องทางติดตาม ตารางไลฟ์ และข่าวสารล่าสุด",
};

export default function FollowPage() {
  return <FollowExperience />;
}
