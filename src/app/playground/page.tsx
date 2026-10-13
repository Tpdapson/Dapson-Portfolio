import type { Metadata } from "next";
import { Playground } from "@/components/sections/playground";

export const metadata: Metadata = {
  title: "Playground — Timilehin Oladapo",
  description:
    "Design explorations, UI concepts and side projects by product designer Timilehin Oladapo, plus products built and shipped with AI-powered tools.",
  alternates: { canonical: "/playground" },
  openGraph: { title: "Playground — Timilehin Oladapo", url: "/playground", siteName: "Timilehin Oladapo", images: [{ url: "/opengraph-image.jpg", width: 1200, height: 630, alt: "Dapson, Product Designer: I design digital products that look good and work even better." }] },
};

// Nav and footer come from the root layout.
export default function Page() {
  return <Playground />;
}
