"use client";

import { useEffect, useState } from "react";
import type { StreamerConfig } from "@/data/streamers";
import { fetchCampaign, type ClaimCampaign } from "@/lib/claimApi";

type CampaignState =
  | { status: "loading" }
  | { status: "active"; campaign: ClaimCampaign }
  | { status: "inactive" }
  | { status: "error" };

export default function useClaimCampaign(streamer: StreamerConfig) {
  const [state, setState] = useState<CampaignState>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;
    setState({ status: "loading" });

    fetchCampaign(streamer)
      .then((response) => {
        if (cancelled) return;
        if (response.ok && response.active) {
          setState({ status: "active", campaign: response.campaign });
        } else {
          setState({ status: "inactive" });
        }
      })
      .catch(() => {
        if (!cancelled) setState({ status: "error" });
      });

    return () => {
      cancelled = true;
    };
  }, [streamer]);

  return state;
}
