"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import {
  initMetaPixel,
  isMetaPixelEnabled,
  trackMetaPageView,
} from "@/lib/metaPixel";

export default function MetaPixel() {
  const pathname = usePathname();
  const enabled = isMetaPixelEnabled();

  useEffect(() => {
    if (!enabled) return;
    initMetaPixel();
    trackMetaPageView();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;
    trackMetaPageView();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  if (!enabled) return null;

  return (
    <Script
      src="https://connect.facebook.net/en_US/fbevents.js"
      strategy="afterInteractive"
    />
  );
}
