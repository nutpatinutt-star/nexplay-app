"use client";

import { CheckCircle2, LifeBuoy, RotateCcw, XCircle } from "lucide-react";
import type { StreamerConfig } from "@/data/streamers";
import { copy, reasonMessage, type ClaimLang } from "@/lib/claimMessages";
import { externalLinkProps } from "@/lib/links";

type EligibleProps = {
  variant: "eligible";
  bonusAmount: number;
  campaignNameTh: string;
  campaignNameEn: string;
  onConfirm: () => void;
  onBack: () => void;
  lang: ClaimLang;
};

type IneligibleProps = {
  variant: "ineligible";
  reason: string;
  onRetry: () => void;
  streamer: StreamerConfig;
  lang: ClaimLang;
};

export default function ClaimEligibilityResult(
  props: EligibleProps | IneligibleProps,
) {
  const { lang } = props;

  if (props.variant === "eligible") {
    const { bonusAmount, campaignNameTh, campaignNameEn, onConfirm, onBack } =
      props;
    const campaignName = lang === "th" ? campaignNameTh : campaignNameEn;

    return (
      <div className="claim-result claim-result-eligible">
        <span className="claim-result-icon claim-result-icon-success">
          <CheckCircle2 size={32} aria-hidden="true" />
        </span>
        <h3>{copy("eligibleTitle", lang)}</h3>
        <p>{copy("eligibleDescription", lang)}</p>
        <div className="claim-bonus-box">
          <small>{campaignName}</small>
          <span className="claim-bonus-label">{copy("bonusLabel", lang)}</span>
          <strong className="claim-bonus-amount">
            ฿{bonusAmount.toLocaleString(lang === "th" ? "th-TH" : "en-US")}
          </strong>
        </div>
        <div className="claim-result-actions">
          <button
            type="button"
            className="claim-primary-button"
            onClick={onConfirm}
          >
            {copy("confirmButton", lang)}
          </button>
          <button
            type="button"
            className="claim-secondary-button"
            onClick={onBack}
          >
            {copy("backButton", lang)}
          </button>
        </div>
      </div>
    );
  }

  const { reason, onRetry, streamer } = props;
  const canRetry = reason !== "already_claimed" && reason !== "campaign_closed";

  return (
    <div className="claim-result claim-result-ineligible">
      <span className="claim-result-icon claim-result-icon-muted">
        <XCircle size={32} aria-hidden="true" />
      </span>
      <p className="claim-ineligible-message">{reasonMessage(reason, lang)}</p>
      <div className="claim-result-actions">
        {canRetry && (
          <button
            type="button"
            className="claim-secondary-button"
            onClick={onRetry}
          >
            <RotateCcw size={14} aria-hidden="true" />
            {copy("retryButton", lang)}
          </button>
        )}
        {streamer.links.support && (
          <a
            {...externalLinkProps(streamer.links.support)}
            className="claim-secondary-button"
          >
            <LifeBuoy size={14} aria-hidden="true" />
            {copy("contactSupportButton", lang)}
          </a>
        )}
      </div>
    </div>
  );
}
