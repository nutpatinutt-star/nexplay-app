"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import type { StreamerSlug } from "@/lib/analytics";

const RELOAD_COUNT_KEY = "halloween-promo-gate-reload-count";
/** Show again every N full page loads (not in-app navigation — AppFrame
 * itself doesn't remount on route changes, only on an actual reload or
 * fresh visit), per request: closing it shouldn't hide it forever, it
 * should come back after refreshing the page a couple more times. */
const RESHOW_AFTER_RELOADS = 3;

/** Promo gate, shared across every streamer currently running the
 * Halloween theme (see usesEnjoyHalloweenUi in data/streamers.ts). Blocks
 * the landing page behind it until the visitor explicitly closes it — no
 * backdrop click, no Escape. Shows on the first page load, then again
 * every RESHOW_AFTER_RELOADS reloads after that (sessionStorage counter,
 * so the cadence is per browser session, not per in-app page). Fully
 * reversible: stops rendering the moment a streamer's own Halloween mode
 * is turned off, since `enabled` is driven by the same
 * usesEnjoyHalloweenUi() gate as the rest of the theme. */
export default function HalloweenPromoGate({
  enabled,
  streamerSlug,
}: {
  enabled: boolean;
  streamerSlug: StreamerSlug;
}) {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!enabled) return;

    let reloadsSinceShown: number | null = null;
    try {
      const stored = sessionStorage.getItem(RELOAD_COUNT_KEY);
      reloadsSinceShown = stored === null ? null : Number(stored);
    } catch {
      reloadsSinceShown = null;
    }

    // No stored count yet (first load this session) or enough reloads have
    // piled up since the last time it showed — show it again and restart
    // the countdown.
    const shouldShow =
      reloadsSinceShown === null ||
      Number.isNaN(reloadsSinceShown) ||
      reloadsSinceShown + 1 >= RESHOW_AFTER_RELOADS;

    try {
      sessionStorage.setItem(
        RELOAD_COUNT_KEY,
        shouldShow ? "0" : String(reloadsSinceShown! + 1),
      );
    } catch {
      // sessionStorage unavailable (private mode etc.) — falls back to
      // showing on every load, which is an acceptable default here.
    }

    if (!shouldShow) return;

    setOpen(true);
    trackEvent("promo_gate_view", { streamer_slug: streamerSlug });
  }, [enabled, streamerSlug]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    trackEvent("promo_gate_close", { streamer_slug: streamerSlug });
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="promo-gate-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="โปรโมชั่นฮาโลวีนพิเศษ"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="promo-gate-card"
            initial={
              reduceMotion ? false : { opacity: 0, y: 24, scale: 0.96 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 360, damping: 32 }}
          >
            <button
              type="button"
              className="promo-gate-close"
              onClick={close}
              aria-label="ปิดและเข้าสู่หน้าเว็บไซต์"
            >
              <X size={20} />
            </button>
            <div className="promo-gate-image-wrap">
              <Image
                src="/popup/halloween-special.webp"
                alt="Halloween Special — ร่วมฉลองฮาโลวีน ลุ้นรับรางวัลใหญ่และโบนัสพิเศษ สำหรับลูกค้าที่สมัครผ่านลิงก์หน้าไลฟ์เท่านั้น"
                width={1322}
                height={1190}
                priority
                sizes="(max-width: 540px) 92vw, 480px"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
