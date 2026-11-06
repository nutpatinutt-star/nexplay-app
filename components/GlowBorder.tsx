type GlowBorderProps = {
  className?: string;
};

export default function GlowBorder({ className = "" }: GlowBorderProps) {
  return (
    <span
      className={`glow-border ${className}`.trim()}
      aria-hidden="true"
    />
  );
}
