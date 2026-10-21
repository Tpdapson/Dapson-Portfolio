"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { links } from "@/content/site";

/**
 * Meta (Facebook) Pixel ("TpDapson Website" dataset), for measuring Meta ads.
 * The ID is public by design; NEXT_PUBLIC_META_PIXEL_ID can override it, and
 * setting that to "off" turns the pixel off. Tracks:
 * - PageView on every page, including moves between pages without a reload.
 * - Lead when someone clicks "Book a call" (Calendly).
 * - Contact when someone clicks an email link.
 */
const configured = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "1045317758527300";
const pixelId = configured === "off" ? undefined : configured;

type Fbq = (...args: unknown[]) => void;
const fbq: Fbq = (...args) => (window as unknown as { fbq?: Fbq }).fbq?.(...args);

export function MetaPixel() {
  const pathname = usePathname();
  const first = useRef(true);

  // The snippet below logs the first page view; later ones happen here.
  useEffect(() => {
    if (!pixelId) return;
    if (first.current) {
      first.current = false;
      return;
    }
    fbq("track", "PageView");
  }, [pathname]);

  // One listener for the whole site, so every Book a call / email link counts.
  useEffect(() => {
    if (!pixelId) return;
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a");
      const href = a?.getAttribute("href") ?? "";
      if (href.startsWith(links.bookCall)) fbq("track", "Lead", { content_name: "Book a call" });
      else if (href.startsWith("mailto:")) fbq("track", "Contact", { content_name: "Email" });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  if (!pixelId) return null;
  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init',${JSON.stringify(pixelId)});fbq('track','PageView');`}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img height="1" width="1" style={{ display: "none" }} alt="" src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`} />
      </noscript>
    </>
  );
}
