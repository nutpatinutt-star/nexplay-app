import type { Metadata, Viewport } from "next";
import { Kanit, Noto_Sans_Thai, Outfit } from "next/font/google";
import { headers } from "next/headers";
import type { ReactNode } from "react";
import AppFrame from "@/components/AppFrame";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import InAppBrowserBanner from "@/components/InAppBrowserBanner";
import MetaPixel from "@/components/MetaPixel";
import "./globals.css";
import "./streamer-enjoy-ui.generated.css";

const kanit = Kanit({
  subsets: ["latin", "thai"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-kanit",
  display: "swap",
});

const notoSansThai = Noto_Sans_Thai({
  subsets: ["latin", "thai"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-thai",
  display: "swap",
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

  return (
    <html
      lang="th"
      className={`${kanit.variable} ${notoSansThai.variable} ${outfit.variable}`}
    >
      <body>
        <GoogleAnalytics initialStreamerSlug={streamerSlug} />
        <MetaPixel />
        <InAppBrowserBanner />
        <AppFrame initialStreamerSlug={streamerSlug}>{children}</AppFrame>
      </body>
    </html>
  );
}
