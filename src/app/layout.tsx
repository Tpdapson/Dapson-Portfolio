import type { Metadata } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { SiteNav } from "@/components/layout/site-nav";
import { SiteFooter } from "@/components/layout/site-footer";
import { themeInitScript } from "@/components/theme/theme-script";
import { person, seoDescription, siteUrl } from "@/content/seo";
import "./globals.css";

const neueMontreal = localFont({
  src: [
    { path: "../fonts/PPNeueMontreal-Book.woff2", weight: "400", style: "normal" },
    { path: "../fonts/PPNeueMontreal-Medium.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-neue",
  display: "swap",
});

const title = "Timilehin Oladapo — Product Designer & Design Engineer";
const description = seoDescription;

// Text shown on link previews (WhatsApp, LinkedIn, X, …).
const share = {
  title: "Timilehin Oladapo — Product Designer & Design Engineer",
  description: "Product (UI/UX) Designer, designing digital products that look good and work even better.",
};

// Share images come from app/opengraph-image.jpg and app/twitter-image.jpg.
// URLs resolve against the live domain (siteUrl in content/seo.tsx).
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  applicationName: person.name,
  authors: [{ name: person.name, url: siteUrl }],
  creator: person.name,
  keywords: [
    person.name,
    ...person.alternateNames,
    "product designer",
    "UI/UX designer",
    "web designer",
    "design engineer",
    "product engineer",
    "mobile app designer",
    "design systems",
    "product designer in Lagos",
    "UI/UX designer in Lagos",
    "web designer in Lagos",
    "product designer in Nigeria",
    "UI/UX designer in Nigeria",
    "Nigerian product designer",
    "portfolio",
  ],
  alternates: { canonical: "/" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  openGraph: { ...share, type: "website", siteName: "Timilehin Oladapo", locale: "en_GB", url: "/" },
  twitter: { card: "summary_large_image", ...share, creator: "@tp_dapson" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: the inline script may set data-theme before React loads.
    <html lang="en" className={neueMontreal.variable} suppressHydrationWarning>
      <head>
        {/* Apply a saved dark theme before first paint (no light flash). */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <SmoothScroll>
          <SiteNav />
          {children}
          <SiteFooter />
        </SmoothScroll>
        {/* Visitor counts, shown in the Vercel dashboard (no cookies). */}
        <Analytics />
      </body>
    </html>
  );
}
