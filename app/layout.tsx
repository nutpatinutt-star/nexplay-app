import type { Metadata, Viewport } from "next";
import { Kanit, Noto_Sans_Thai, Outfit } from "next/font/google";
import { headers } from "next/headers";
import type { ReactNode } from "react";
import AppFrame from "@/components/AppFrame";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import InAppBrowserBanner from "@/components/InAppBrowserBanner";
import MetaPixel from "@/components/MetaPixel";
import { getStreamerBySlug } from "@/data/streamers";
import "./globals.css";
import "./streamer-enjoy-ui.generated.css";

// preload: false on these two — Next.js otherwise injects <link rel="preload">
// for every weight of every font declared in this root layout, for EVERY
// route, regardless of whether that route's CSS ever resolves to it. Bengali
// pages (Slade) never use either font (app/globals.css redirects both to
// Outfit under their app-shell scope) and were still force-downloading all 9
// weight files — ~140KB wasted on a page with zero Thai text. Thai pages
// still get both fonts exactly as before: they're referenced in the very
// first stylesheet the browser parses, so the normal CSS-driven fetch starts
// just as early as the preload hint did — this only removes the forced
// fetch for pages that never reference them.
const kanit = Kanit({
  subsets: ["latin", "thai"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-kanit",
  display: "swap",
  preload: false,
});

const notoSansThai = Noto_Sans_Thai({
  subsets: ["latin", "thai"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-thai",
  display: "swap",
  preload: false,
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  variable: "--font-outfit",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
const socialImage = siteUrl ? `${siteUrl}/og-v2.png` : undefined;

const defaultDescription =
  "ติดตามไลฟ์สดได้ทุกวัน พร้อมโปรโมชั่นและสิทธิพิเศษสำหรับสมาชิก";

export const metadata: Metadata = {
  title: "ENJOY LIVE",
  description: defaultDescription,
  applicationName: "ENJOY LIVE",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    locale: "th_TH",
    siteName: "ENJOY LIVE",
    title: "ENJOY LIVE",
    description: defaultDescription,
    ...(socialImage
      ? {
          images: [
            {
              url: socialImage,
              width: 1200,
              height: 630,
              alt: "ENJOY LIVE",
            },
          ],
        }
      : {}),
  },
  twitter: {
    card: "summary_large_image",
    title: "ENJOY LIVE",
    description: defaultDescription,
    ...(socialImage ? { images: [socialImage] } : {}),
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#F8F7FC",
  colorScheme: "light",
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const headerList = await headers();
  const streamerSlug = headerList.get("x-streamer-slug");
  const htmlLang =
    (streamerSlug && getStreamerBySlug(streamerSlug)?.locale) || "th";
  // Kanit and Noto Sans Thai are preloaded by Next.js for every page that
  // references their .variable in the rendered output — there's no way to
  // opt a single route out short of not rendering the class at all. Bengali
  // pages (Slade) have zero Thai text and already redirect every
  // var(--font-kanit)/var(--font-noto-thai) usage to Outfit via CSS
  // (app/globals.css), so dropping the classes here stops the browser from
  // preloading ~9 extra font-weight files it would never actually use.
  const isBengali = htmlLang === "bn";
  const fontClassName = isBengali
    ? outfit.variable
    : `${kanit.variable} ${notoSansThai.variable} ${outfit.variable}`;

  return (
    <html lang={htmlLang} className={fontClassName}>
      <body>
        <GoogleAnalytics initialStreamerSlug={streamerSlug} />
        <MetaPixel />
        <InAppBrowserBanner initialStreamerSlug={streamerSlug} />
        <AppFrame initialStreamerSlug={streamerSlug}>{children}</AppFrame>
      </body>
    </html>
  );
}
