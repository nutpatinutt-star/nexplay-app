"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  CalendarClock,
  CircleUserRound,
  Clock3,
  Gamepad2,
  Gift,
  Home,
  Radio,
  UserPlus,
  Video,
  X,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  usesEnjoyHalloweenUi,
  streamerRoute,
  type StreamerConfig,
} from "@/data/streamers";
import { externalLinkProps } from "@/lib/links";
import { trackEvent, trackLinkClick } from "@/lib/analytics";
import { trackMetaEvent } from "@/lib/metaPixel";

type NavigationItem =
  | {
      label: string;
      href: string;
      icon: LucideIcon;
      kind: "route";
      center?: boolean;
    }
  | {
      label: string;
      href: string;
      icon: LucideIcon;
      kind: "external";
      center?: boolean;
    }
  | {
      label: string;
      icon: LucideIcon;
      kind: "schedule";
      center?: boolean;
    }
  | {
      label: string;
      icon: LucideIcon;
      kind: "disabled";
      center?: boolean;
    };

function LiveSchedulePopup({
  close,
  streamer,
}: {
  close: () => void;
  streamer: StreamerConfig;
}) {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [close]);

  return (
    <motion.div
      className="schedule-overlay"
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onPointerDown={(event) => {
        if (event.currentTarget === event.target) close();
      }}
    >
      <motion.section
        className="schedule-popup"
        role="dialog"
        aria-modal="true"
        aria-labelledby="schedule-title"
        initial={
          reduceMotion ? false : { opacity: 0, y: 28, scale: 0.94 }
        }
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 18, scale: 0.96 }}
        transition={{ type: "spring", stiffness: 360, damping: 30 }}
      >
        <div className="schedule-popup-head">
          <span className="schedule-popup-icon" aria-hidden="true">
            <CalendarClock size={22} />
          </span>
          <div>
            <span>{streamer.displayName}</span>
            <h2 id="schedule-title">ตารางไลฟ์ประจำวัน</h2>
          </div>
          <button
            type="button"
            className="schedule-close"
            onClick={close}
            aria-label="ปิดตารางไลฟ์"
          >
            <X size={19} />
          </button>
        </div>

        <p className="schedule-description">
          พบกับสตรีมเมอร์และกิจกรรมโบนัสสดได้ทุกวัน
        </p>

        <div className="schedule-slots">
          <div className="schedule-slot schedule-slot-day">
            <span className="schedule-slot-icon" aria-hidden="true">
              <Clock3 size={19} />
            </span>
            <div>
              <small>รอบกลางวัน</small>
              <strong>1:00 – 3:00 PM</strong>
            </div>
            <span className="schedule-live-pill">LIVE</span>
          </div>
          <div className="schedule-slot schedule-slot-night">
            <span className="schedule-slot-icon" aria-hidden="true">
              <Clock3 size={19} />
            </span>
            <div>
              <small>รอบค่ำ</small>
              <strong>7:00 – 9:00 PM</strong>
            </div>
            <span className="schedule-live-pill">LIVE</span>
          </div>
        </div>

        <button type="button" className="schedule-dismiss" onClick={close}>
          เข้าใจแล้ว
        </button>
      </motion.section>
    </motion.div>
  );
}

export default function BottomNavigation({
  streamer,
}: {
  streamer: StreamerConfig;
}) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [scheduleOpen, setScheduleOpen] = useState(false);
  // Enjoy and Lham, Halloween mode — cosmetic relabel to match the reference
  // mockup's nav vocabulary. Order (left to right): หน้าแรก / โปรโมชั่น /
  // ไลฟ์สด (center) / กิจกรรม / ของฉัน.
  //  - "กิจกรรม" has no real page yet — disabled/not clickable instead of
  //    secretly opening the register link.
  //  - "ไลฟ์สด" (center) opens the LINE link (same destination as the
  //    ADD LINE button), not the promotions page.
  //  - "โปรโมชั่น" opens the real promotions page (this slot used to be
  //    labeled "โบนัส" and opened /follow, which isn't bonus content —
  //    fixed, then swapped here with "กิจกรรม" per feedback).
  // "หน้าแรก" and "ของฉัน" (home / schedule popup) are unchanged.
  const usesHalloweenUi = usesEnjoyHalloweenUi(streamer.slug);
  const navItems: NavigationItem[] = [
    {
      label: usesHalloweenUi ? "หน้าแรก" : "หน้าหลัก",
      href: streamerRoute(streamer, ""),
      icon: Home,
      kind: "route",
    },
    usesHalloweenUi
      ? {
          label: "โปรโมชั่น",
          href: streamerRoute(streamer, "/promotions"),
          icon: Gift,
          kind: "route",
        }
      : {
          label: "ลงทะเบียน",
          href: streamer.links.register,
          icon: UserPlus,
          kind: "external",
        },
    usesHalloweenUi
      ? {
          label: "ไลฟ์สด",
          href: streamer.links.line,
          icon: Video,
          kind: "external",
          center: true,
        }
      : {
          label: "โปรโมชั่น",
          href: streamerRoute(streamer, "/promotions"),
          icon: Gift,
          kind: "route",
          center: true,
        },
    usesHalloweenUi
      ? { label: "กิจกรรม", icon: Gamepad2, kind: "disabled" }
      : {
          label: "ติดตาม",
          href: streamerRoute(streamer, "/follow"),
          icon: Radio,
          kind: "route",
        },
    {
      label: usesHalloweenUi ? "ของฉัน" : "ตารางไลฟ์",
      icon: usesHalloweenUi ? CircleUserRound : CalendarClock,
      kind: "schedule",
    },
  ];

  return (
    <>
      <nav className="bottom-nav" aria-label="เมนูหลัก">
        {usesHalloweenUi && (
          <span className="nav-chase-ring" aria-hidden="true" />
        )}
        {navItems.map((item) => {
          const Icon = item.icon;
          const active =
            item.kind === "route" &&
            (pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href)));
          const content = (
            <>
              {active && (
                <motion.span
                  layoutId="bottom-nav-island"
                  className="nav-active-island"
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : {
                          type: "spring",
                          stiffness: 500,
                          damping: 38,
                          mass: 0.65,
                        }
                  }
                  aria-hidden="true"
                />
              )}
              <motion.span
                className="nav-icon-wrap"
                animate={
                  reduceMotion
                    ? undefined
                    : active
                      ? { y: -2, scale: 1.16 }
                      : { y: 0, scale: 1 }
                }
                transition={{
                  type: "spring",
                  stiffness: 520,
                  damping: 30,
                  mass: 0.58,
                }}
              >
                <Icon size={19} strokeWidth={active ? 2.5 : 1.8} />
                {item.center && (
                  <span className="nav-fab-pulse" aria-hidden="true" />
                )}
              </motion.span>
              <motion.span
                className="nav-label"
                animate={{
                  opacity: active || item.center ? 1 : 0.58,
                  y: active ? 0 : 1,
                }}
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : {
                        type: "spring",
                        stiffness: 420,
                        damping: 32,
                        mass: 0.55,
                      }
                }
              >
                {item.label}
              </motion.span>
            </>
          );
          const className = [
            "bottom-nav-item",
            item.center ? "is-center" : "",
            active ? "is-active" : "",
          ]
            .filter(Boolean)
            .join(" ");

          if (item.kind === "disabled") {
            return (
              <span
                key={item.label}
                className={`${className} bottom-nav-item-disabled`}
                aria-disabled="true"
                aria-label={`${item.label} เร็ว ๆ นี้`}
              >
                {content}
              </span>
            );
          }

          if (item.kind === "external") {
            return (
              <motion.a
                key={item.label}
                {...externalLinkProps(item.href)}
                className={className}
                aria-label={item.label}
                whileHover={reduceMotion ? undefined : { y: -2 }}
                whileTap={reduceMotion ? undefined : { scale: 0.92 }}
                transition={{ type: "spring", stiffness: 420, damping: 28 }}
                onClick={(event) => {
                  if (!item.href) {
                    event.preventDefault();
                    return;
                  }
                  if (item.href === streamer.links.register) {
                    trackLinkClick(streamer.slug, "register");
                    trackEvent("register_click", {
                      streamer_slug: streamer.slug,
                      placement: "bottom_navigation",
                    });
                    trackMetaEvent("Lead", {
                      content_name: "register",
                      streamer_slug: streamer.slug,
                    });
                  } else if (item.href === streamer.links.line) {
                    trackLinkClick(streamer.slug, "line");
                    trackEvent("line_click", {
                      streamer_slug: streamer.slug,
                      placement: "bottom_navigation",
                    });
                    trackMetaEvent("Contact", {
                      content_name: "line",
                      streamer_slug: streamer.slug,
                    });
                  }
                  trackEvent("bottom_navigation_click", {
                    streamer_slug: streamer.slug,
                    placement: "bottom_navigation",
                    navigation_item: item.label,
                  });
                }}
              >
                {content}
              </motion.a>
            );
          }

          if (item.kind === "schedule") {
            return (
              <motion.button
                key={item.label}
                type="button"
                className={`${className} bottom-nav-action`}
                aria-label="เปิดตารางไลฟ์ประจำวัน"
                aria-haspopup="dialog"
                aria-expanded={scheduleOpen}
                onClick={() => {
                  setScheduleOpen(true);
                  trackEvent("bottom_navigation_click", {
                    streamer_slug: streamer.slug,
                    placement: "bottom_navigation",
                    navigation_item: item.label,
                  });
                  trackEvent("live_schedule_open", {
                    streamer_slug: streamer.slug,
                    placement: "bottom_navigation",
                  });
                }}
                whileHover={reduceMotion ? undefined : { y: -2 }}
                whileTap={reduceMotion ? undefined : { scale: 0.92 }}
                transition={{ type: "spring", stiffness: 420, damping: 28 }}
              >
                {content}
              </motion.button>
            );
          }

          return (
            <motion.div
              key={item.label}
              className="bottom-nav-link-wrap"
              whileHover={reduceMotion ? undefined : { y: -2 }}
              whileTap={reduceMotion ? undefined : { scale: 0.92 }}
              transition={{ type: "spring", stiffness: 420, damping: 28 }}
            >
              <Link
                href={item.href}
                className={className}
                aria-current={active ? "page" : undefined}
                onClick={() =>
                  trackEvent("bottom_navigation_click", {
                    streamer_slug: streamer.slug,
                    placement: "bottom_navigation",
                    navigation_item: item.label,
                  })
                }
              >
                {content}
              </Link>
            </motion.div>
          );
        })}
      </nav>

      <AnimatePresence>
        {scheduleOpen && (
          <LiveSchedulePopup
            close={() => setScheduleOpen(false)}
            streamer={streamer}
          />
        )}
      </AnimatePresence>
    </>
  );
}
