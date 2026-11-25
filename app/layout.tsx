import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Raleway, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import Analytics from "@/app/components/v2/Analytics";
import RouteProgress from "@/app/components/v2/RouteProgress";
import JsonLd from "./components/v2/JsonLd";
import { SITE, IDS } from "@/lib/site";
import { organizationLd, websiteLd } from "@/lib/seo";

const space = Space_Grotesk({
  variable: "--font-space-var",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const raleway = Raleway({
  variable: "--font-raleway-var",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

// The app's own UI font, used only inside coded app screens (TutorPhone).
const hanken = Hanken_Grotesk({
  variable: "--font-app-var",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: false,
});

// Site-wide defaults only. Every route sets its own title, description and canonical
// through buildMetadata() in lib/seo.ts.
export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: "GalenAI: AI Tutor and Study App for MBBS Students", template: `%s | ${SITE.name}` },
  description: SITE.defaultDescription,
  applicationName: SITE.name,
  // Smart App Banner on iOS Safari: a native "Open / Get" bar for the app.
  itunes: { appId: IDS.appStoreId },
  // Search Console and Bing tokens come from IDS in lib/site.ts (empty = no tag; DNS verification needs none).
  verification: {
    ...(IDS.googleSiteVerification ? { google: IDS.googleSiteVerification } : {}),
    ...(IDS.bingSiteVerification ? { other: { "msvalidate.01": IDS.bingSiteVerification } } : {}),
  },
  alternates: { types: { "application/rss+xml": [{ url: "/blog/rss.xml", title: "GalenAI articles" }] } },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#fff0e4",
  width: "device-width",
  initialScale: 1,
};

/**
 * Root layout: fonts, analytics and the brand entity schema only.
 * Site chrome (Navbar, Footer) lives in app/(site)/layout.tsx so that ad landing
 * pages in app/(go) ship without it.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${space.variable} ${raleway.variable} ${hanken.variable} antialiased overflow-x-hidden bg-white`}>
        <JsonLd data={[organizationLd(), websiteLd()]} />
        <Analytics />
        <RouteProgress />
        {children}
      </body>
    </html>
  );
}
