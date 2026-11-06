"use client";

import { ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";

/** Facebook/Instagram's in-app WebView is known to fail on heavy JS pages,
 * and — separately — to deliberately block custom URL-scheme launches (e.g.
 * line:// for the LINE app), which is why "Add LINE" clicks from ad traffic
 * can produce zero actual friend-adds even though the page itself loads and
 * every click/redirect looks perfectly healthy in server logs. This is a
 * platform-level restriction (Meta keeps users inside its own app on
 * purpose) that no page-level fix can bypass — so instead of a dismissible
 * banner, this is a mandatory full-screen gate: detected users cannot reach
 * the page underneath (register/LINE buttons included) until they've left
 * the in-app browser, matching how link-in-bio tools (Linktree, Heylink)
 * handle the same restriction. */
function detectMetaInAppBrowser(ua: string): "android" | "ios" | null {
  const isMetaInApp = /FBAN|FBAV|Instagram/i.test(ua);
  if (!isMetaInApp) return null;
  if (/Android/i.test(ua)) return "android";
  if (/iPhone|iPad|iPod/i.test(ua)) return "ios";
  return null;
}

function androidIntentUrl() {
  const { host, pathname, search } = window.location;
  return `intent://${host}${pathname}${search}#Intent;scheme=https;package=com.android.chrome;end`;
}

/** iOS has no reliable JS-only way to force Safari open from inside another
 * app's WebView — Apple removed the schemes that used to allow it. This is
 * attempted anyway (harmless no-op if blocked) alongside the manual
 * instructions, on the chance the surrounding context allows it. */
function iosSafariUrl() {
  const { host, pathname, search } = window.location;
  return `x-safari-https://${host}${pathname}${search}`;
}

export default function InAppBrowserBanner() {
  const [platform, setPlatform] = useState<"android" | "ios" | null>(null);

  useEffect(() => {
    const detected = detectMetaInAppBrowser(navigator.userAgent);
    setPlatform(detected);
    if (!detected) return;

    // Fire-and-forget: lets Cloudflare's own request log (queryable by path
    // + host + query param) tell us exactly how many real visits hit the
    // gate, independent of whether they ever make it through to click
    // anything afterward.
    fetch(`/api/gate-shown?platform=${detected}`, {
      method: "POST",
      keepalive: true,
    }).catch(() => {});

    if (detected === "android") {
      window.location.href = androidIntentUrl();
    } else if (detected === "ios") {
      window.location.href = iosSafariUrl();
    }
  }, []);

  if (!platform) return null;

  return (
    <div className="inapp-browser-gate" role="alert">
      <div className="inapp-browser-gate-card">
        <span className="inapp-browser-gate-icon" aria-hidden="true">
          <ExternalLink size={28} />
        </span>
        <strong>เปิดหน้านี้ในเบราว์เซอร์จริงก่อนนะครับ</strong>
        <span className="inapp-browser-gate-desc">
          {platform === "android"
            ? "แอป Facebook/Instagram บล็อกการเปิดแอป LINE จากในแอป กำลังเปิดเบราว์เซอร์ให้อัตโนมัติ ถ้ายังไม่เปิด ให้กดปุ่มด้านล่าง"
            : 'แอป Facebook/Instagram บล็อกการเปิดแอป LINE จากในแอป กรุณาแตะไอคอน "⋯" หรือไอคอนเบราว์เซอร์ที่มุมล่าง แล้วเลือก "เปิดใน Safari"'}
        </span>
        {platform === "android" && (
          <button
            type="button"
            className="inapp-browser-gate-cta"
            onClick={() => {
              window.location.href = androidIntentUrl();
            }}
          >
            <ExternalLink size={14} />
            เปิดในเบราว์เซอร์
          </button>
        )}
      </div>
    </div>
  );
}
