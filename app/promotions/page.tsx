import type { Metadata } from "next";
import { PromotionsExperience } from "@/components/SecondaryExperiences";

export const metadata: Metadata = {
  title: "โปรโมชั่นทั้งหมด",
  description: "รวมโบนัส โปรโมชั่น และสิทธิพิเศษสำหรับสมาชิก",
};

export default function PromotionsPage() {
  return <PromotionsExperience />;
}
