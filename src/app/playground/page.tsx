import type { Metadata } from "next";
import { Playground } from "@/components/sections/playground";

export const metadata: Metadata = {
  title: "Playground — Timilehin Oladapo",
  description: "Explorations, concepts and side projects: design shots, plus products built and shipped with AI-powered tools.",
};

// Nav and footer come from the root layout.
export default function Page() {
  return <Playground />;
}
