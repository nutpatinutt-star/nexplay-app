"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { getStreamerBySlug, getStreamerFromPathname } from "@/data/streamers";
import {
  getGtagScriptSrc,
  initGtag,
  isAnalyticsEnabledFor,
  trackPageView,
} from "@/lib/analytics";

export default function GoogleAnalytics({
  initialStreamerSlug,
}: {
  initialStreamerSlug?: string | null;
}) {
  const pathname = usePathname();
  const { slug } =
    (initialStreamerSlug && getStreamerBySlug(initialStreamerSlug)) ||
    getStreamerFromPathname(pathname);
  const enabled = isAnalyticsEnabledFor(slug);

  useEffect(() => {
    if (enabled) initGtag(slug);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, enabled]);

  useEffect(() => {
    if (enabled) trackPageView(slug, pathname);
  }, [slug, pathname, enabled]);

  if (!enabled) return null;

  const scriptSrc = getGtagScriptSrc(slug);
  if (!scriptSrc) return null;

  return <Script src={scriptSrc} strategy="afterInteractive" />;
}
