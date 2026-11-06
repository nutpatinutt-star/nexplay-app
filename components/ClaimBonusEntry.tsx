"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronRight, Gift } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ClaimBonusSheet from "@/components/ClaimBonusSheet";
import useClaimCampaign from "@/components/useClaimCampaign";
import type { StreamerConfig } from "@/data/streamers";
import { copy } from "@/lib/claimMessages";
import { trackEvent } from "@/lib/analytics";

export default function ClaimBonusEntry({
  streamer,
  autoOpen = false,
}: {
  streamer: StreamerConfig;
  autoOpen?: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const campaignState = useClaimCampaign(streamer);
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const hasTrackedView = useRef(false);
  const hasAutoOpened = useRef(false);

  useEffect(() => {
    if (campaignState.status !== "active" || hasTrackedView.current) return;
    hasTrackedView.current = true;
    trackEvent("claim_card_view", {
      streamer_slug: streamer.slug,
      campaign_public_id: campaignState.campaign.public_id,
      language: "th",
    });
  }, [campaignState, streamer.slug]);

  useEffect(() => {
    if (!autoOpen || campaignState.status !== "active" || hasAutoOpened.current) {
      return;
    }
    hasAutoOpened.current = true;
    setOpen(true);
    trackEvent("claim_open", {
      streamer_slug: streamer.slug,
      campaign_public_id: campaignState.campaign.public_id,
      language: "th",
    });
  }, [autoOpen, campaignState, streamer.slug]);

  if (campaignState.status === "loading" || campaignState.status === "error") {
    return null;
  }

  if (campaignState.status === "inactive") {
    return (
      <section className="claim-entry-card claim-entry-inactive" aria-live="off">
        <span className="claim-entry-icon">
          <Gift size={22} aria-hidden="true" />
        </span>
        <div className="claim-entry-copy">
          <strong>{copy("entryTitle", "th")}</strong>
          <small>{copy("entryStatusClosed", "th")}</small>
        </div>
      </section>
    );
  }

  const { campaign } = campaignState;

  return (
    <>
      <motion.button
        ref={triggerRef}
        type="button"
        className="claim-entry-card"
        aria-label={`${copy("entryTitle", "th")} — ${copy("entryStatusOpen", "th")}`}
        onClick={() => {
          setOpen(true);
          trackEvent("claim_open", {
            streamer_slug: streamer.slug,
            campaign_public_id: campaign.public_id,
            language: "th",
          });
        }}
        whileHover={reduceMotion ? undefined : { y: -3 }}
        whileTap={reduceMotion ? undefined : { scale: 0.98 }}
      >
        <span className="claim-entry-shine" aria-hidden="true" />
        <span className="claim-entry-icon">
          <Gift size={22} aria-hidden="true" />
        </span>
        <span className="claim-entry-copy">
          <strong>{copy("entryTitle", "th")}</strong>
          <small>{copy("entryDescription", "th")}</small>
        </span>
        <span className="claim-entry-status">
          <span className="claim-entry-status-dot" aria-hidden="true" />
          {copy("entryStatusOpen", "th")}
        </span>
        <ChevronRight className="claim-entry-arrow" size={18} aria-hidden="true" />
      </motion.button>

      <AnimatePresence>
        {open && (
          <ClaimBonusSheet
            streamer={streamer}
            campaign={campaign}
            onClose={() => setOpen(false)}
            triggerRef={triggerRef}
          />
        )}
      </AnimatePresence>
    </>
  );
}
