import { headers } from "next/headers";
import HomeExperience from "@/components/HomeExperience";

export default async function HomePage() {
  const headerList = await headers();
  const autoOpenClaim = headerList.get("x-claim-autoopen") === "1";

  return <HomeExperience autoOpenClaim={autoOpenClaim} />;
}
