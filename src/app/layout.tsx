import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dapson — Product Designer",
  description:
    "Timilehin Oladapo designs and builds digital products that look good and work even better.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={GeistSans.variable}>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
