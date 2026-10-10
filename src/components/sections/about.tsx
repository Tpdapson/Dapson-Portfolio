"use client";

import { ArrowRight, PaperPlaneTilt } from "@phosphor-icons/react/dist/ssr";
import { FadeUp, Sticker } from "@/components/motion/primitives";
import { RevealText } from "@/components/motion/reveal-text";

export function About() {
  return (
    <section id="about" className="mx-auto flex w-full max-w-[1040px] flex-col items-center gap-8 px-4 py-20">
      <div className="relative flex w-full justify-center">
        <Sticker rotate={6} className="absolute left-[2%] top-[-20px] sm:left-[10%] sm:top-[-40px]">
          <p className="font-hand text-[26px] text-ink-2">About me!</p>
        </Sticker>

        <Sticker rotate={5} delay={0.1}>
          <div className="relative size-[120px] overflow-hidden rounded-[34px] bg-surface sm:size-[150px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/timi.png" alt="Timi" className="pointer-events-none absolute inset-0 size-full object-cover" draggable={false} />
          </div>
        </Sticker>

        <Sticker rotate={14} delay={0.25} className="absolute right-[0%] top-[90px] sm:right-[7%] sm:top-[50px]">
          <div className="flex items-center gap-2 rounded-[4px] border border-[#2b2b2b] bg-lime px-3.5 py-2">
            <PaperPlaneTilt size={14} />
            <p className="font-hand text-xl text-[#1a1a1a]">OPEN TO WORK</p>
          </div>
        </Sticker>
      </div>

      <RevealText
        className="flex w-full max-w-[860px] flex-col gap-7 pt-2 text-[clamp(20px,1.95vw,28px)] font-medium leading-[1.4] tracking-[-0.01em]"
        paragraphs={[
          "I'm Timi, a Product Designer focused on creating digital products that feel intuitive, purposeful, and made with people in mind.",
          "Mobile apps, web apps, dashboards, design systems and websites. I've worked across it all, for teams in Africa and the UK.",
          "I also build what I design using AI-powered tools, bridging the gap between design and development to bring ideas to life.",
        ]}
      />

      <FadeUp>
        <a href="#contact" className="group flex items-center gap-2 rounded-full bg-chip px-[18px] py-2.5 text-[13px] font-medium text-ink-2">
          Get in Touch
          <ArrowRight size={14} className="transition-transform duration-300 ease-out group-hover:translate-x-1" />
        </a>
      </FadeUp>
    </section>
  );
}
