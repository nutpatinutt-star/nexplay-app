import { ChevronRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

type SectionHeaderProps = {
  icon?: ReactNode;
  title: string;
  href?: string;
};

export default function SectionHeader({
  icon,
  title,
  href,
}: SectionHeaderProps) {
  return (
    <div className="section-heading">
      <h2>
        {icon}
        {title}
      </h2>
      {href && (
        <Link href={href} className="section-link">
          ดูทั้งหมด
          <ChevronRight size={14} />
        </Link>
      )}
    </div>
  );
}
