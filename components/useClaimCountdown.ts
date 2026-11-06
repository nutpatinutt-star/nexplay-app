"use client";

import { useEffect, useRef, useState } from "react";
import { fetchNextRun } from "@/lib/claimApi";

type Remaining = { hours: number; minutes: number; seconds: number };

function diffToRemaining(targetMs: number): Remaining {
  const totalSeconds = Math.max(0, Math.floor((targetMs - Date.now()) / 1000));
  return {
    hours: Math.floor(totalSeconds / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

/** Countdown to the next scheduled processing run; survives refresh via a
 * persisted absolute target, and re-fetches once the target is reached. */
export default function useClaimCountdown() {
  const [targetMs, setTargetMs] = useState<number | null>(null);
  const [remaining, setRemaining] = useState<Remaining | null>(null);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchNextRun().then((response) => {
      if (cancelled || !response.next_run_at) return;
      setTargetMs(new Date(response.next_run_at).getTime());
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (targetMs === null) return;

    const tick = () => {
      const next = diffToRemaining(targetMs);
      setRemaining(next);
      if (
        next.hours === 0 &&
        next.minutes === 0 &&
        next.seconds === 0
      ) {
        fetchNextRun().then((response) => {
          if (response.next_run_at) {
            setTargetMs(new Date(response.next_run_at).getTime());
          }
        });
      }
    };

    tick();

    const handleVisibility = () => {
      if (document.hidden) {
        if (intervalRef.current) window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      } else {
        tick();
        intervalRef.current = window.setInterval(tick, 1000);
      }
    };

    intervalRef.current = window.setInterval(tick, 1000);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [targetMs]);

  return remaining;
}
