"use client";

import {
  AnimatePresence,
  MotionConfig,
  motion,
  useReducedMotion,
} from "framer-motion";
import {
  Bell,
  Clock3,
  Ghost,
  Gift,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  type CSSProperties,
  type ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import BottomNavigation from "@/components/BottomNavigation";
import PullToRefresh from "@/components/PullToRefresh";
import {
  getStreamerBySlug,
  getStreamerFromPathname,
  AMMY_HALLOWEEN_MODE,
  GRACE_HALLOWEEN_MODE,
  HOLDEN_HALLOWEEN_MODE,
  IVY_HALLOWEEN_MODE,
  KIM_HALLOWEEN_MODE,
  LHAM_HALLOWEEN_MODE,
  LILIN_HALLOWEEN_MODE,
  LILY_HALLOWEEN_MODE,
  MIGUEL_HALLOWEEN_MODE,
  NEXPLAY_HALLOWEEN_MODE,
  NEXPLAY_PINK_CARDS_MODE,
  TOP_HALLOWEEN_MODE,
  WILLIAM_HALLOWEEN_MODE,
  ZEN_HALLOWEEN_MODE,
  streamerRoute,
  type StreamerConfig,
  usesEnjoyHalloweenUi,
} from "@/data/streamers";
import { trackEvent, trackLinkClick } from "@/lib/analytics";
import { trackMetaEvent } from "@/lib/metaPixel";
import { externalLinkProps } from "@/lib/links";

type Panel = "search" | "notifications" | null;

function Header({
  onOpen,
  streamer,
}: {
  onOpen: (panel: Panel) => void;
  streamer: StreamerConfig;
}) {
  const [brandName, brandSuffix = "LIVE"] =
    streamer.displayName.split(" ");

  return (
    <header className="site-header">
      <Link
        href={streamerRoute(streamer, "")}
        className="brand-lockup"
        aria-label={`${streamer.displayName} หน้าหลัก`}
      >
        <span className="brand-mark" aria-hidden="true">
          {usesEnjoyHalloweenUi(streamer.slug) ? (
            <Ghost size={18} strokeWidth={2.4} />
          ) : (
            <Sparkles size={18} strokeWidth={2.4} />
          )}
        </span>
        <span className="brand-text">{brandName}</span>
        <span className="brand-live">{brandSuffix}</span>
      </Link>

      <div className="header-actions">
        <button
          type="button"
          className="icon-button"
          onClick={() => onOpen("search")}
          aria-label="ค้นหา"
        >
          <Search size={20} />
        </button>
        <button
          type="button"
          className="icon-button notification-button"
          onClick={() => onOpen("notifications")}
          aria-label="การแจ้งเตือน"
        >
          <Bell size={20} />
          <span className="notification-dot" aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}

function SearchPanel({
  close,
  streamer,
}: {
  close: () => void;
  streamer: StreamerConfig;
}) {
  const [query, setQuery] = useState("");
  const searchItems = useMemo(
    () => [
      {
        label: "ลงทะเบียนสมาชิก",
        href: streamer.links.register,
        external: true,
        linkType: "register" as const,
      },
      {
        label: "เพิ่มเพื่อน LINE",
        href: streamer.links.line,
        external: true,
        linkType: "line" as const,
      },
      {
        label: "โปรโมชั่นทั้งหมด",
        href: streamerRoute(streamer, "/promotions"),
        external: false,
      },
      {
        label: "ตารางไลฟ์และช่องทางติดตาม",
        href: streamerRoute(streamer, "/follow"),
        external: false,
      },
    ],
    [streamer],
  );
  const items = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("th");
    if (!normalizedQuery) return searchItems;
    return searchItems.filter((item) =>
      item.label.toLocaleLowerCase("th").includes(normalizedQuery),
    );
  }, [query, searchItems]);

  return (
    <div>
      <label className="search-field">
        <Search size={18} />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="ค้นหาเมนูหรือโปรโมชั่น"
          autoFocus
        />
      </label>
      <div className="panel-links">
        {items.map((item) =>
          item.external ? (
            <a
              key={item.label}
              {...externalLinkProps(item.href)}
              className="panel-link"
              onClick={(event) => {
                if (!item.href) {
                  event.preventDefault();
                  return;
                }
                if (item.linkType) {
                  trackLinkClick(streamer.slug, item.linkType);
                  trackEvent(
                    item.linkType === "register" ? "register_click" : "line_click",
                    { streamer_slug: streamer.slug, placement: "search_panel" },
                  );
                  trackMetaEvent(item.linkType === "register" ? "Lead" : "Contact", {
                    content_name: item.linkType,
                    streamer_slug: streamer.slug,
                  });
                }
                close();
              }}
            >
              {item.label}
              <span aria-hidden="true">↗</span>
            </a>
          ) : (
            <Link
              key={item.label}
              href={item.href}
              className="panel-link"
              onClick={close}
            >
              {item.label}
              <span aria-hidden="true">→</span>
            </Link>
          ),
        )}
        {items.length === 0 && (
          <p className="panel-empty">ไม่พบเมนูที่ค้นหา</p>
        )}
      </div>
    </div>
  );
}

function NotificationPanel() {
  return (
    <div className="notification-list">
      <div className="notification-item">
        <span className="notification-icon">
          <Clock3 size={18} />
        </span>
        <div>
          <strong>ไลฟ์รอบกลางวัน</strong>
          <p>เริ่มเวลา 13:00 – 15:00 น.</p>
        </div>
      </div>
      <div className="notification-item">
        <span className="notification-icon is-pink">
          <Gift size={18} />
        </span>
        <div>
          <strong>โบนัสและสิทธิพิเศษ</strong>
          <p>ติดตาม LINE เพื่อรับข่าวก่อนใคร</p>
        </div>
      </div>
    </div>
  );
}

function UtilityPanel({
  panel,
  close,
  streamer,
}: {
  panel: Exclude<Panel, null>;
  close: () => void;
  streamer: StreamerConfig;
}) {
  const reduceMotion = useReducedMotion();
  const title = panel === "search" ? "ค้นหา" : "การแจ้งเตือน";

  return (
    <motion.div
      className="utility-overlay"
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={(event) => {
        if (event.currentTarget === event.target) close();
      }}
    >
      <motion.section
        className="utility-panel glass-panel"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ type: "spring", stiffness: 360, damping: 32 }}
      >
        <div className="utility-panel-head">
          <h2>{title}</h2>
          <button
            type="button"
            className="icon-button"
            onClick={close}
            aria-label="ปิด"
          >
            <X size={18} />
          </button>
        </div>
        {panel === "search" ? (
          <SearchPanel close={close} streamer={streamer} />
        ) : (
          <NotificationPanel />
        )}
      </motion.section>
    </motion.div>
  );
}

export default function AppFrame({
  children,
  initialStreamerSlug,
}: {
  children: ReactNode;
  initialStreamerSlug?: string | null;
}) {
  const [panel, setPanel] = useState<Panel>(null);
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const streamer =
    (initialStreamerSlug && getStreamerBySlug(initialStreamerSlug)) ||
    getStreamerFromPathname(pathname);
  const themeStyle = {
    "--purple": streamer.theme.accent,
    "--purple-deep": streamer.theme.accentDeep,
    "--purple-glow": `rgba(${streamer.theme.accentRgb}, 0.28)`,
    "--theme-accent": streamer.theme.accent,
    "--theme-accent-deep": streamer.theme.accentDeep,
    "--theme-accent-bright": streamer.theme.accentBright,
    "--theme-accent-soft": streamer.theme.accentSoft,
    "--theme-accent-rgb": streamer.theme.accentRgb,
    "--theme-secondary-rgb": streamer.theme.secondaryRgb,
  } as CSSProperties;
  const isNexplayHalloween =
    streamer.slug === "nexplay" && NEXPLAY_HALLOWEEN_MODE;
  const isNexplayPinkCards =
    streamer.slug === "nexplay" && NEXPLAY_PINK_CARDS_MODE;
  const isLhamHalloween =
    streamer.slug === "lham" && LHAM_HALLOWEEN_MODE;
  const isHoldenHalloween =
    streamer.slug === "holden" && HOLDEN_HALLOWEEN_MODE;
  const isTopHalloween = streamer.slug === "top" && TOP_HALLOWEEN_MODE;
  const isKimHalloween = streamer.slug === "kim" && KIM_HALLOWEEN_MODE;
  const isIvyHalloween = streamer.slug === "ivy" && IVY_HALLOWEEN_MODE;
  const isWilliamHalloween =
    streamer.slug === "william" && WILLIAM_HALLOWEEN_MODE;
  const isZenHalloween = streamer.slug === "zen" && ZEN_HALLOWEEN_MODE;
  const isLilyHalloween = streamer.slug === "lily" && LILY_HALLOWEEN_MODE;
  const isLilinHalloween = streamer.slug === "lilin" && LILIN_HALLOWEEN_MODE;
  const isMiguelHalloween =
    streamer.slug === "miguel" && MIGUEL_HALLOWEEN_MODE;
  const isAmmyHalloween = streamer.slug === "ammy" && AMMY_HALLOWEEN_MODE;
  const isGraceHalloween = streamer.slug === "grace" && GRACE_HALLOWEEN_MODE;

  // `body`/`html` have their own global white-page background (for the
  // light-card streamers) that .app-shell[data-streamer] rules can't reach
  // — they're ancestors of it, not descendants. On a wide viewport the
  // 540px-capped app-shell leaves that white gutter showing on both sides,
  // which clashes badly against Enjoy's dark Halloween page. Toggle a class
  // on <body> instead so the gutter goes dark too, only while active.
  useEffect(() => {
    document.body.classList.toggle("nexplay-halloween-bg", isNexplayHalloween);
    document.body.classList.toggle("lham-halloween-bg", isLhamHalloween);
    document.body.classList.toggle("holden-halloween-bg", isHoldenHalloween);
    document.body.classList.toggle("top-halloween-bg", isTopHalloween);
    document.body.classList.toggle("kim-halloween-bg", isKimHalloween);
    document.body.classList.toggle("ivy-halloween-bg", isIvyHalloween);
    document.body.classList.toggle(
      "william-halloween-bg",
      isWilliamHalloween,
    );
    document.body.classList.toggle("zen-halloween-bg", isZenHalloween);
    document.body.classList.toggle("lily-halloween-bg", isLilyHalloween);
    document.body.classList.toggle("lilin-halloween-bg", isLilinHalloween);
    document.body.classList.toggle("miguel-halloween-bg", isMiguelHalloween);
    document.body.classList.toggle("ammy-halloween-bg", isAmmyHalloween);
    document.body.classList.toggle("grace-halloween-bg", isGraceHalloween);
    return () => {
      document.body.classList.remove("nexplay-halloween-bg");
      document.body.classList.remove("lham-halloween-bg");
      document.body.classList.remove("holden-halloween-bg");
      document.body.classList.remove("top-halloween-bg");
      document.body.classList.remove("kim-halloween-bg");
      document.body.classList.remove("ivy-halloween-bg");
      document.body.classList.remove("william-halloween-bg");
      document.body.classList.remove("zen-halloween-bg");
      document.body.classList.remove("lily-halloween-bg");
      document.body.classList.remove("lilin-halloween-bg");
      document.body.classList.remove("miguel-halloween-bg");
      document.body.classList.remove("ammy-halloween-bg");
      document.body.classList.remove("grace-halloween-bg");
    };
  }, [
    isNexplayHalloween,
    isLhamHalloween,
    isHoldenHalloween,
    isTopHalloween,
    isKimHalloween,
    isIvyHalloween,
    isWilliamHalloween,
    isZenHalloween,
    isLilyHalloween,
    isLilinHalloween,
    isMiguelHalloween,
    isAmmyHalloween,
    isGraceHalloween,
  ]);

  // "Link click" tracker (see /api/click-report) — one row per browser session, not per route
  // change, so it approximates an ad-link arrival rather than every in-app navigation. The ref
  // guard is what keeps it to once: AppFrame stays mounted across client-side navigation within a
  // streamer's pages, so without it this would fire again on every route change.
  const visitTrackedRef = useRef(false);
  useEffect(() => {
    if (visitTrackedRef.current) return;
    visitTrackedRef.current = true;
    trackLinkClick(streamer.slug, "visit");
  }, [streamer.slug]);

  useEffect(() => {
    if (reduceMotion) return;

    const createRipple = (event: PointerEvent) => {
      if (!(event.target instanceof Element)) return;
      const target = event.target.closest<HTMLElement>("a, button");
      if (!target || target.getAttribute("aria-disabled") === "true") return;

      const rect = target.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 1.75;
      const ripple = document.createElement("span");
      ripple.className = "global-tap-ripple";
      ripple.style.width = `${size}px`;
      ripple.style.height = `${size}px`;
      ripple.style.left = `${event.clientX - size / 2}px`;
      ripple.style.top = `${event.clientY - size / 2}px`;
      document.body.appendChild(ripple);
      ripple.addEventListener("animationend", () => ripple.remove(), {
        once: true,
      });
    };

    document.addEventListener("pointerdown", createRipple, { passive: true });
    return () => document.removeEventListener("pointerdown", createRipple);
  }, [reduceMotion]);

  return (
    <MotionConfig
      reducedMotion="user"
      transition={{
        type: "spring",
        stiffness: 420,
        damping: 32,
        mass: 0.62,
      }}
    >
      <div
        className="app-shell"
        data-streamer={streamer.slug}
        data-seasonal={usesEnjoyHalloweenUi(streamer.slug) ? "halloween" : undefined}
        data-enjoy-cards={isNexplayPinkCards ? "pink" : undefined}
        style={themeStyle}
      >
        <div className="ambient-layer" aria-hidden="true">
          <span className="ambient-mesh" />
          <span className="ambient-noise" />
        </div>
        <PullToRefresh />
        <div className="page-layer">
          <Header onOpen={setPanel} streamer={streamer} />
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={pathname}
              className="page-transition-shell"
              initial={
                reduceMotion
                  ? false
                  : { opacity: 0, y: 9, scale: 0.995 }
              }
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={
                reduceMotion
                  ? undefined
                  : { opacity: 0, y: -6, scale: 0.998 }
              }
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : {
                      y: {
                        type: "spring",
                        stiffness: 440,
                        damping: 34,
                        mass: 0.64,
                      },
                      scale: {
                        type: "spring",
                        stiffness: 420,
                        damping: 34,
                        mass: 0.62,
                      },
                      opacity: { duration: 0.22, ease: "easeOut" },
                    }
              }
            >
              {children}
            </motion.div>
          </AnimatePresence>
          <BottomNavigation streamer={streamer} />
        </div>
        <AnimatePresence>
          {panel && (
            <UtilityPanel
              panel={panel}
              close={() => setPanel(null)}
              streamer={streamer}
            />
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}
