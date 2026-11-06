"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import type { ClaimLang } from "@/lib/claimMessages";
import { copy } from "@/lib/claimMessages";

function pad(value: number) {
  return value.toString().padStart(2, "0");
}

const UNIT_LABEL: Record<ClaimLang, [string, string, string]> = {
  th: ["ชั่วโมง", "นาที", "วินาที"],
  en: ["hrs", "min", "sec"],
};

export default function ClaimCountdown({
  remaining,
  lang,
}: {
  remaining: { hours: number; minutes: number; seconds: number } | null;
  lang: ClaimLang;
}) {
  const reduceMotion = useReducedMotion();
  const [hoursLabel, minutesLabel, secondsLabel] = UNIT_LABEL[lang];

  if (!remaining) {
    return <p className="claim-countdown-waiting">{copy("countdownWaiting", lang)}</p>;
  }

  const units: [number, string][] = [
    [remaining.hours, hoursLabel],
    [remaining.minutes, minutesLabel],
    [remaining.seconds, secondsLabel],
  ];

  return (
    <div className="claim-countdown" role="timer" aria-live="off">
      {units.map(([value, label]) => (
        <div key={label} className="claim-countdown-unit">
          <motion.span
            key={`${label}-${value}`}
            className="claim-countdown-value"
            initial={reduceMotion ? false : { opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.18 }}
          >
            {pad(value)}
          </motion.span>
          <small>{label}</small>
        </div>
      ))}
    </div>
  );
}
