"use client";

import { motion, useReducedMotion } from "framer-motion";
import { PartyPopper } from "lucide-react";
import ClaimCountdown from "@/components/ClaimCountdown";
import useClaimCountdown from "@/components/useClaimCountdown";
import { copy, type ClaimLang } from "@/lib/claimMessages";

export default function ClaimSuccessState({
  bonusAmount,
  campaignNameTh,
  campaignNameEn,
  onClose,
  lang,
}: {
  bonusAmount: number;
  campaignNameTh: string;
  campaignNameEn: string;
  onClose: () => void;
  lang: ClaimLang;
}) {
  const reduceMotion = useReducedMotion();
  const remaining = useClaimCountdown();
  const campaignName = lang === "th" ? campaignNameTh : campaignNameEn;

  return (
    <div className="claim-result claim-result-success">
      <motion.span
        className="claim-result-icon claim-result-icon-success"
        initial={reduceMotion ? false : { scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 420, damping: 22 }}
      >
        <PartyPopper size={32} aria-hidden="true" />
      </motion.span>
      <h3>{copy("successTitle", lang)}</h3>
      <p>{copy("successDescription", lang)}</p>

      <div className="claim-bonus-box">
        <small>{campaignName}</small>
        <span className="claim-bonus-label">{copy("claimAmountLabel", lang)}</span>
        <strong className="claim-bonus-amount">
          ฿{bonusAmount.toLocaleString(lang === "th" ? "th-TH" : "en-US")}
        </strong>
      </div>

      <div className="claim-countdown-block">
        <span className="claim-countdown-heading">
          {copy("countdownLabel", lang)}
        </span>
        <ClaimCountdown remaining={remaining} lang={lang} />
        <p className="claim-countdown-disclaimer">
          {copy("countdownDisclaimer", lang)}
        </p>
      </div>

      <button type="button" className="claim-primary-button" onClick={onClose}>
        {copy("doneButton", lang)}
      </button>
    </div>
  );
}
