"use client";

import { Phone, ShieldCheck } from "lucide-react";
import type { ClaimCampaign } from "@/lib/claimApi";
import { copy, type ClaimLang } from "@/lib/claimMessages";
import ClaimStatusMessage from "@/components/ClaimStatusMessage";

export default function ClaimPhoneForm({
  campaign,
  phone,
  setPhone,
  fieldError,
  onSubmit,
  lang,
}: {
  campaign: ClaimCampaign;
  phone: string;
  setPhone: (value: string) => void;
  fieldError: string | null;
  onSubmit: () => void;
  lang: ClaimLang;
}) {
  const campaignName =
    lang === "th" ? campaign.display_name_th : campaign.display_name_en;

  return (
    <form
      className="claim-phone-form"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <p className="claim-campaign-name">{campaignName}</p>

      <label className="claim-field">
        <span className="claim-field-label">{copy("phoneLabel", lang)}</span>
        <span className="claim-field-input">
          <Phone size={16} aria-hidden="true" />
          <input
            type="tel"
            inputMode="numeric"
            autoComplete="off"
            placeholder="08XXXXXXXX"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            aria-invalid={fieldError ? true : undefined}
            aria-describedby={fieldError ? "claim-phone-error" : undefined}
          />
        </span>
      </label>

      {fieldError && (
        <span id="claim-phone-error">
          <ClaimStatusMessage
            message={copy(
              fieldError === "empty" ? "phoneErrorEmpty" : "phoneErrorInvalid",
              lang,
            )}
          />
        </span>
      )}

      <button type="submit" className="claim-primary-button">
        {copy("checkButton", lang)}
      </button>

      <p className="claim-privacy-note">
        <ShieldCheck size={13} aria-hidden="true" />
        {copy("privacyNote", lang)}
      </p>
    </form>
  );
}
