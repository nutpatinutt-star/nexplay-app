import { ChevronRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

type SectionHeaderProps = {
  icon?: ReactNode;
  title: string;
  href?: string;
  viewAllLabel?: string;
};

export default function SectionHeader({
  icon,
  title,
  href,
  viewAllLabel = "ดูทั้งหมด",
}: SectionHeaderProps) {
  return (
    <div className="section-heading">
      <h2>
        {icon}
        {title}
      </h2>
      {href && (
        <Link href={href} className="section-link">
          {viewAllLabel}
          <ChevronRight size={14} />
        </Link>
      )}
    </div>
  );
}
