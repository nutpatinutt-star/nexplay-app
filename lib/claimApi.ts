import type { StreamerConfig } from "@/data/streamers";

/**
 * MOCK claim API — Phase 1.
 *
 * This simulates the contract the real backend (bo_web.py's
 * check_claim_eligibility / submit_claim / next_scheduled_run) is expected to
 * expose once it is hosted somewhere that can safely serve public traffic.
 * Swap the bodies of these functions for real `fetch()` calls against
 * /api/public/claim/... once that hosting decision is made — the call sites
 * (hooks/components) do not need to change.
 */

export type ClaimCampaign = {
  public_id: string;
  display_name_th: string;
  display_name_en: string;
  short_description_th: string;
  short_description_en: string;
};

export type CampaignResponse =
  | {
      ok: true;
      active: true;
      streamer: { slug: string; display_name: string };
      campaign: ClaimCampaign;
    }
  | { ok: true; active: false };

export type EligibilityResponse =
  | {
      eligible: true;
      campaign_display_name_th: string;
      campaign_display_name_en: string;
      bonus_amount: number;
    }
  | { eligible: false; reason: string };

export type SubmitResponse =
  | {
      ok: true;
      campaign_display_name_th: string;
      campaign_display_name_en: string;
      bonus_amount: number;
    }
  | { ok: false; reason: string };

export type NextRunResponse = {
  ok: true;
  next_run_at: string | null;
  timezone: string;
};

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function normalizePhone(raw: string): string {
  return raw.replace(/\D/g, "");
}

/** Deterministic mock so the same test phone number always behaves the same way. */
function mockOutcomeForPhone(phone: string): "eligible" | ClaimReasonMock {
  const lastDigit = phone.at(-1) ?? "0";
  const table: Record<string, "eligible" | ClaimReasonMock> = {
    "0": "eligible",
    "1": "eligible",
    "2": "not_referred",
    "3": "no_qualifying_deposit",
    "4": "already_claimed",
    "5": "campaign_closed",
  };
  return table[lastDigit] ?? "eligible";
}

type ClaimReasonMock =
  | "not_referred"
  | "no_qualifying_deposit"
  | "already_claimed"
  | "campaign_closed";

export async function fetchCampaign(
  streamer: StreamerConfig,
): Promise<CampaignResponse> {
  await delay(450);
  return {
    ok: true,
    active: true,
    streamer: { slug: streamer.slug, display_name: streamer.displayName },
    campaign: {
      public_id: `${streamer.slug}-first-deposit`,
      display_name_th: "โบนัสฝากแรก สูงสุด 2,000 บาท",
      display_name_en: "First Deposit Bonus — Up to ฿2,000",
      short_description_th: "รับโบนัสฝากแรกตามเงื่อนไขโปรโมชั่น",
      short_description_en: "Claim your eligible first-deposit bonus",
    },
  };
}

export async function checkEligibility(
  phone: string,
  campaign: ClaimCampaign,
): Promise<EligibilityResponse> {
  await delay(900);
  const normalized = normalizePhone(phone);
  const outcome = mockOutcomeForPhone(normalized);
  if (outcome === "eligible") {
    return {
      eligible: true,
      campaign_display_name_th: campaign.display_name_th,
      campaign_display_name_en: campaign.display_name_en,
      bonus_amount: 1250,
    };
  }
  return { eligible: false, reason: outcome };
}

export async function submitClaim(
  phone: string,
  campaign: ClaimCampaign,
): Promise<SubmitResponse> {
  await delay(700);
  const normalized = normalizePhone(phone);
  const outcome = mockOutcomeForPhone(normalized);
  if (outcome === "eligible") {
    return {
      ok: true,
      campaign_display_name_th: campaign.display_name_th,
      campaign_display_name_en: campaign.display_name_en,
      bonus_amount: 1250,
    };
  }
  return { ok: false, reason: outcome };
}

export async function fetchNextRun(): Promise<NextRunResponse> {
  await delay(300);
  const now = new Date();
  const bangkokNow = new Date(
    now.toLocaleString("en-US", { timeZone: "Asia/Bangkok" }),
  );
  const runHours = [13, 19, 23];
  const next = new Date(bangkokNow);
  const upcoming = runHours.find((hour) => bangkokNow.getHours() < hour);
  if (upcoming !== undefined) {
    next.setHours(upcoming, 0, 0, 0);
  } else {
    next.setDate(next.getDate() + 1);
    next.setHours(runHours[0], 0, 0, 0);
  }
  const offsetMs = next.getTime() - bangkokNow.getTime();
  return {
    ok: true,
    next_run_at: new Date(Date.now() + offsetMs).toISOString(),
    timezone: "Asia/Bangkok",
  };
}
