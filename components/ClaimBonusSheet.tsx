"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Gift, X } from "lucide-react";
import {
  type CSSProperties,
  type RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import type { StreamerConfig } from "@/data/streamers";
import ClaimEligibilityResult from "@/components/ClaimEligibilityResult";
import ClaimLoadingState from "@/components/ClaimLoadingState";
import ClaimPhoneForm from "@/components/ClaimPhoneForm";
import ClaimStatusMessage from "@/components/ClaimStatusMessage";
import ClaimSuccessState from "@/components/ClaimSuccessState";
import useClaimEligibility from "@/components/useClaimEligibility";
import type { ClaimCampaign } from "@/lib/claimApi";
import { copy, type ClaimLang } from "@/lib/claimMessages";
import { trackEvent } from "@/lib/analytics";

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(min-width: 641px)");
    setIsDesktop(query.matches);
    const handler = (event: MediaQueryListEvent) => setIsDesktop(event.matches);
    query.addEventListener("change", handler);
    return () => query.removeEventListener("change", handler);
  }, []);
  return isDesktop;
}

export default function ClaimBonusSheet({
  streamer,
  campaign,
  onClose,
  triggerRef,
}: {
  streamer: StreamerConfig;
  campaign: ClaimCampaign;
  onClose: () => void;
  triggerRef: RefObject<HTMLElement | null>;
}) {
  const reduceMotion = useReducedMotion();
  const isDesktop = useIsDesktop();
  const dialogRef = useRef<HTMLDivElement>(null);
  const lang: ClaimLang = "th";

  const {
    phone,
    setPhone,
    fieldError,
    flow,
    runCheck,
    runSubmit,
    goBackToForm,
    reset,
  } = useClaimEligibility(campaign);

  const prevStepRef = useRef<string | null>(null);
  useEffect(() => {
    if (prevStepRef.current === flow.step) return;
    prevStepRef.current = flow.step;
    const base = {
      streamer_slug: streamer.slug,
      campaign_public_id: campaign.public_id,
      language: lang,
    };
    if (flow.step === "checking") {
      trackEvent("claim_check_started", base);
    } else if (flow.step === "eligible") {
      trackEvent("claim_check_eligible", { ...base, result_category: "eligible" });
    } else if (flow.step === "ineligible") {
      trackEvent("claim_check_ineligible", {
        ...base,
        result_category: flow.reason,
      });
    } else if (flow.step === "submitting") {
      trackEvent("claim_submit_started", base);
    } else if (flow.step === "success") {
      trackEvent("claim_submit_success", base);
    }
  }, [flow, streamer.slug, campaign.public_id]);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const triggerNode = triggerRef.current;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab") return;
      const node = dialogRef.current;
      if (!node) return;
      const focusable = node.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      (previouslyFocused ?? triggerNode)?.focus();
    };
  }, [onClose, triggerRef]);

  const panelInitial = reduceMotion
    ? false
    : isDesktop
      ? { opacity: 0, y: 18, scale: 0.97 }
      : { y: "100%" };
  const panelAnimate = isDesktop
    ? { opacity: 1, y: 0, scale: 1 }
    : { y: 0 };
  const panelExit = reduceMotion
    ? undefined
    : isDesktop
      ? { opacity: 0, y: 12, scale: 0.98 }
      : { y: "100%" };

  const themeStyle = {
    "--theme-accent": streamer.theme.accent,
    "--theme-accent-deep": streamer.theme.accentDeep,
    "--theme-accent-bright": streamer.theme.accentBright,
    "--theme-accent-soft": streamer.theme.accentSoft,
    "--theme-accent-rgb": streamer.theme.accentRgb,
    "--theme-secondary-rgb": streamer.theme.secondaryRgb,
  } as CSSProperties;

  return createPortal(
    <motion.div
      className="claim-sheet-backdrop"
      style={themeStyle}
      data-streamer={streamer.slug}
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={(event) => {
        if (event.currentTarget === event.target) onClose();
      }}
    >
      <motion.div
        ref={dialogRef}
        className={`claim-sheet-panel glass-panel ${isDesktop ? "claim-sheet-modal" : "claim-sheet-bottomsheet"}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="claim-sheet-title"
        tabIndex={-1}
        initial={panelInitial}
        animate={panelAnimate}
        exit={panelExit}
        transition={{ type: "spring", stiffness: 380, damping: 34 }}
      >
        {!isDesktop && <span className="claim-sheet-grabber" aria-hidden="true" />}

        <div className="claim-sheet-head">
          <span className="claim-sheet-head-icon">
            <Gift size={18} aria-hidden="true" />
          </span>
          <h2 id="claim-sheet-title">{copy("formTitle", lang)}</h2>
          <button
            type="button"
            className="icon-button"
            onClick={onClose}
            aria-label={copy("closeButton", lang)}
          >
            <X size={18} />
          </button>
        </div>

        <div className="claim-sheet-body">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={flow.step}
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              aria-live="polite"
            >
              {flow.step === "form" && (
                <ClaimPhoneForm
                  campaign={campaign}
                  phone={phone}
                  setPhone={setPhone}
                  fieldError={fieldError}
                  onSubmit={runCheck}
                  lang={lang}
                />
              )}

              {flow.step === "checking" && (
                <ClaimLoadingState text={copy("checkingText", lang)} />
              )}

              {flow.step === "eligible" && (
                <ClaimEligibilityResult
                  variant="eligible"
                  bonusAmount={flow.bonusAmount}
                  campaignNameTh={flow.campaignNameTh}
                  campaignNameEn={flow.campaignNameEn}
                  onConfirm={runSubmit}
                  onBack={goBackToForm}
                  lang={lang}
                />
              )}

              {flow.step === "ineligible" && (
                <ClaimEligibilityResult
                  variant="ineligible"
                  reason={flow.reason}
                  onRetry={reset}
                  streamer={streamer}
                  lang={lang}
                />
              )}

              {flow.step === "submitting" && (
                <ClaimLoadingState text={copy("submittingText", lang)} />
              )}

              {flow.step === "success" && (
                <ClaimSuccessState
                  bonusAmount={flow.bonusAmount}
                  campaignNameTh={flow.campaignNameTh}
                  campaignNameEn={flow.campaignNameEn}
                  onClose={onClose}
                  lang={lang}
                />
              )}

              {flow.step === "error" && (
                <div className="claim-result">
                  <ClaimStatusMessage message={copy("networkError", lang)} />
                  <button
                    type="button"
                    className="claim-secondary-button"
                    onClick={reset}
                  >
                    {copy("retryButton", lang)}
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>,
    document.body,
  );
}
