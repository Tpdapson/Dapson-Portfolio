import type { Metadata } from "next";
import localFont from "next/font/local";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { SiteNav } from "@/components/layout/site-nav";
import { SiteFooter } from "@/components/layout/site-footer";
import { themeInitScript } from "@/components/theme/theme-script";
import "./globals.css";

const neueMontreal = localFont({
  src: [
    { path: "../fonts/PPNeueMontreal-Book.woff2", weight: "400", style: "normal" },
    { path: "../fonts/PPNeueMontreal-Medium.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-neue",
  display: "swap",
});

const title = "Dapson — Product Designer";
const description =
  "Timilehin Oladapo designs and builds digital products that look good and work even better.";

// Text shown on link previews (WhatsApp, LinkedIn, X, …).
const share = {
  title: "Oladapo Timilehin — Product Designer",
  description: "Product (UI/UX) Designer, designing digital products that look good and work even better.",
};

// Share images come from app/opengraph-image.jpg and app/twitter-image.jpg.
// Set NEXT_PUBLIC_SITE_URL to the live domain so their URLs are absolute
// (on Vercel the production URL is used automatically).
export const metadata: Metadata = {
  ...(process.env.NEXT_PUBLIC_SITE_URL && { metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL) }),
  title,
  description,
  openGraph: { ...share, type: "website", siteName: "Dapson", locale: "en_GB" },
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
      </body>
    </html>
  );
}
