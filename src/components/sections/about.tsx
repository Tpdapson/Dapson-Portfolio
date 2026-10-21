"use client";

import Image from "next/image";
import { useSyncExternalStore } from "react";
import { EnvelopeSimple, PaperPlaneTilt } from "@phosphor-icons/react/dist/ssr";
import { FadeUp, Sticker } from "@/components/motion/primitives";
import { RevealText } from "@/components/motion/reveal-text";
import { PillButton } from "@/components/ui/pill-button";
import { links } from "@/content/site";

const desktopQuery = "(min-width: 1024px)";
function useIsDesktop() {
  return useSyncExternalStore(
    (cb) => {
      const m = window.matchMedia(desktopQuery);
      m.addEventListener("change", cb);
      return () => m.removeEventListener("change", cb);
    },
    () => window.matchMedia(desktopQuery).matches,
    () => true,
  );
}

export function About() {
  const desktop = useIsDesktop();
  return (
    <section id="about" className="mx-auto flex w-full max-w-[1040px] flex-col items-center gap-8 px-4 py-20">
      <div className="relative flex w-full justify-center">
        <Sticker rotate={6} className="absolute left-[2%] top-[-20px] sm:left-[10%] sm:top-[-40px]">
          <p className="font-hand text-[26px] text-ink-2">About me!</p>
        </Sticker>

        <Sticker rotate={5} delay={0.1}>
          <div className="relative size-[120px] overflow-hidden rounded-[34px] bg-surface sm:size-[150px]">
            <Image src="/images/timi-about.jpg" alt="Timilehin Oladapo (Dapson), product designer" fill sizes="150px" quality={90} className="pointer-events-none object-cover" draggable={false} />
          </div>
        </Sticker>

        {/* Open to work: tilted the other way and higher up on phones/tablets, beside the top of the photo. */}
        <Sticker
          rotate={desktop ? 14 : -14}
          delay={0.25}
          className="absolute right-[4%] top-[30px] sm:right-[7%] sm:top-[14px] lg:top-[50px]"
        >
          <div className="flex items-center gap-1.5 rounded-[4px] border border-[#2b2b2b] bg-lime dark:border-white/85 px-2 py-1 sm:gap-2 sm:px-3.5 sm:py-2">
            {/* Fixed dark ink on the lime tag in both themes. */}
            <PaperPlaneTilt size={14} color="#1a1a1a" className="size-2.5 sm:size-3.5" />
            <p className="font-hand text-[13px] leading-none text-[#1a1a1a] sm:text-xl sm:leading-normal">OPEN TO WORK</p>
          </div>
        </Sticker>
      </div>

      <RevealText
        className="flex w-full max-w-[860px] flex-col gap-7 pt-2 text-[clamp(20px,1.95vw,28px)] font-medium leading-[1.4] tracking-[-0.01em]"
        paragraphs={[
          "I'm Timi, a Product Designer with 5+ years of experience focused on creating digital products that feel intuitive, purposeful, and made with people in mind.",
          "Mobile apps, web apps, dashboards, design systems and websites. I've worked across it all, for teams in Africa and the UK.",
          "I also build what I design using AI-powered tools, bridging the gap between design and development to bring ideas to life.",
        ]}
      />

      <FadeUp>
        <PillButton href={links.email} label="Get in Touch" icon={EnvelopeSimple} tone="bg-chip text-ink-2" pad="pl-[22px] pr-5" />
      </FadeUp>
    </section>
  );
}
