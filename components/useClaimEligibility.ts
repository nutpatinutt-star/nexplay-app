"use client";

import { useCallback, useState } from "react";
import {
  checkEligibility,
  submitClaim,
  type ClaimCampaign,
} from "@/lib/claimApi";

export type ClaimFlowState =
  | { step: "form" }
  | { step: "checking" }
  | {
      step: "eligible";
      bonusAmount: number;
      campaignNameTh: string;
      campaignNameEn: string;
    }
  | { step: "ineligible"; reason: string }
  | { step: "submitting" }
  | {
      step: "success";
      bonusAmount: number;
      campaignNameTh: string;
      campaignNameEn: string;
    }
  | { step: "error" };

function normalizePhoneForDisplay(value: string): string {
  return value.replace(/[^\d]/g, "").slice(0, 10);
}

export default function useClaimEligibility(campaign: ClaimCampaign | null) {
  const [phone, setPhoneRaw] = useState("");
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [flow, setFlow] = useState<ClaimFlowState>({ step: "form" });

  const setPhone = useCallback((value: string) => {
    setFieldError(null);
    setPhoneRaw(normalizePhoneForDisplay(value));
  }, []);

  const validate = useCallback((): boolean => {
    if (!phone.trim()) {
      setFieldError("empty");
      return false;
    }
    if (phone.length !== 10) {
      setFieldError("invalid");
      return false;
    }
    return true;
  }, [phone]);

  const runCheck = useCallback(async () => {
    if (!campaign) return;
    if (!validate()) return;

    setFlow({ step: "checking" });
    try {
      const result = await checkEligibility(phone, campaign);
      if (result.eligible) {
        setFlow({
          step: "eligible",
          bonusAmount: result.bonus_amount,
          campaignNameTh: result.campaign_display_name_th,
          campaignNameEn: result.campaign_display_name_en,
        });
      } else {
        setFlow({ step: "ineligible", reason: result.reason });
      }
    } catch {
      setFlow({ step: "error" });
    }
  }, [campaign, phone, validate]);

  const runSubmit = useCallback(async () => {
    if (!campaign || flow.step !== "eligible") return;

    setFlow({ step: "submitting" });
    try {
      const result = await submitClaim(phone, campaign);
      if (result.ok) {
        setFlow({
          step: "success",
          bonusAmount: result.bonus_amount,
          campaignNameTh: result.campaign_display_name_th,
          campaignNameEn: result.campaign_display_name_en,
        });
      } else {
        setFlow({ step: "ineligible", reason: result.reason });
      }
    } catch {
      setFlow({ step: "error" });
    }
  }, [campaign, flow, phone]);

  const goBackToForm = useCallback(() => {
    setFlow({ step: "form" });
  }, []);

  const reset = useCallback(() => {
    setPhoneRaw("");
    setFieldError(null);
    setFlow({ step: "form" });
  }, []);

  return {
    phone,
    setPhone,
    fieldError,
    flow,
    runCheck,
    runSubmit,
    goBackToForm,
    reset,
  };
}
