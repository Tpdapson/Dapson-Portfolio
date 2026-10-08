"use client";

import { ArrowDown, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { BlurWords, FadeUp, MaskLines } from "@/components/motion/primitives";
import { Magnetic } from "@/components/motion/magnetic";
import { external, links } from "@/content/site";

export function Hero() {
  return (
    <section className="flex flex-col items-center px-4 py-6 text-center">
      <h1 className="text-[clamp(64px,9.72vw,140px)] font-medium leading-none tracking-[-0.01em] text-ink-2">
        <MaskLines lines={["PRODUCT", "DESIGNER"]} onMount delay={0.15} stagger={0.09} />
      </h1>

      <p className="w-full max-w-[588px] py-4 text-[clamp(22px,2.5vw,36px)] leading-[1.1] text-muted">
        <BlurWords text="I design and build digital products that look good & work even better." onMount delay={0.55} />
      </p>

      <FadeUp onMount delay={0.85} y={16} className="flex flex-wrap justify-center gap-2.5 py-6">
        <Magnetic>
          <a
            href={links.bookCall}
            {...external(links.bookCall)}
            className="group flex items-center gap-2 rounded-full bg-ink-2 px-5 py-3.5 text-base font-medium text-white"
          >
            <ArrowUpRight size={16} className="transition-transform duration-300 ease-out group-hover:rotate-45" />
            Book a call
          </a>
        </Magnetic>
        <Magnetic>
          <a href="#work" className="group flex items-center gap-2 rounded-full bg-chip px-5 py-3.5 text-base font-medium text-ink-2">
            See my works
            <ArrowDown size={16} className="transition-transform duration-300 ease-out group-hover:translate-y-0.5" />
          </a>
        </Magnetic>
      </FadeUp>
    </section>
  );
}
