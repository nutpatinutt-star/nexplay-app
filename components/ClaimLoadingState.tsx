import { Loader2 } from "lucide-react";

export default function ClaimLoadingState({ text }: { text: string }) {
  return (
    <div className="claim-loading" aria-busy="true" aria-live="polite">
      <Loader2 className="claim-loading-spinner" size={26} aria-hidden="true" />
      <p>{text}</p>
      <div className="claim-loading-skeleton">
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}
