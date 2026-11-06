import type { ComponentPropsWithoutRef } from "react";
import GlowBorder from "@/components/GlowBorder";

type GlassCardProps = ComponentPropsWithoutRef<"div">;

export default function GlassCard({
  className = "",
  children,
  ...props
}: GlassCardProps) {
  return (
    <div
      {...props}
      className={`glass-panel glass-card-shell ${className}`.trim()}
    >
      <GlowBorder />
      {children}
    </div>
  );
}
