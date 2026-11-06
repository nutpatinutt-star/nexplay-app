import { AlertCircle } from "lucide-react";

export default function ClaimStatusMessage({
  message,
  tone = "error",
}: {
  message: string;
  tone?: "error" | "info";
}) {
  return (
    <p className={`claim-status-message claim-status-${tone}`} role="alert">
      <AlertCircle size={15} aria-hidden="true" />
      <span>{message}</span>
    </p>
  );
}
