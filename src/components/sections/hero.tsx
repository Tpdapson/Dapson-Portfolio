"use client";

import { ArrowDown, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { BlurWords, FadeUp, MaskLines } from "@/components/motion/primitives";
import { PillButton } from "@/components/ui/pill-button";
import { links } from "@/content/site";

export function Hero() {
  return (
    <section className="flex flex-col items-center px-4 py-6 text-center">
      <h1 className="text-[clamp(64px,9.72vw,140px)] font-medium leading-none tracking-[-0.01em] text-ink-2">
        <MaskLines lines={["PRODUCT", "DESIGNER"]} onMount delay={0.15} stagger={0.09} />
      </h1>

      <p className="w-full max-w-[588px] py-4 text-[clamp(22px,2.5vw,36px)] leading-[1.1] text-balance text-muted">
        <BlurWords text="I design and build digital products that look good & work even better." onMount delay={0.55} />
      </p>

      <FadeUp onMount delay={0.85} y={16} className="flex flex-wrap justify-center gap-2.5 pb-6 pt-3">
        <PillButton
          href={links.bookCall}
          label="Book a call"
          icon={ArrowUpRight}
          tone="bg-ink-2 text-on-ink"
          pad="pl-[22px] pr-5"
        />
        <PillButton href="#work" label="See my works" icon={ArrowDown} tone="bg-chip text-ink-2" pad="pl-[22px] pr-5" />
      </FadeUp>
    </section>
  );
}
