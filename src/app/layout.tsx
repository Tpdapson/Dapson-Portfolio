import type { Metadata } from "next";
import localFont from "next/font/local";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import "./globals.css";

const neueMontreal = localFont({
  src: [
    { path: "../fonts/PPNeueMontreal-Book.woff2", weight: "400", style: "normal" },
    { path: "../fonts/PPNeueMontreal-Medium.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-neue",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dapson — Product Designer",
  description:
    "Timilehin Oladapo designs and builds digital products that look good and work even better.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={neueMontreal.variable}>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
