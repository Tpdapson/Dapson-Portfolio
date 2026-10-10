"use client";

import { ArrowUpRight, EnvelopeSimple } from "@phosphor-icons/react/dist/ssr";
import { FadeUp, MaskLines } from "@/components/motion/primitives";
import { PillButton } from "@/components/ui/pill-button";
import { links } from "@/content/site";

/** "Have an idea worth building?" block that sits above the footer. */
export function ContactCta() {
  return (
    <section id="contact" className="border-t border-tint-12 bg-black px-4 pb-20 pt-24 sm:px-20">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-14">
        <h2 className="text-[clamp(44px,6.67vw,96px)] font-medium leading-none tracking-[-0.03em] text-neutral-0">
          <MaskLines lines={["Have an idea worth building?"]} lineClassName="text-balance" />
        </h2>
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <FadeUp className="max-w-[489px]">
            <p className="text-lg font-medium leading-[1.55] text-neutral-400">
              Whether you&apos;re building something new, improving an existing product, or looking for a design partner who
              thinks beyond the interface, I&apos;d love to hear about it.
            </p>
          </FadeUp>
          <FadeUp delay={0.15} className="flex flex-wrap gap-4">
            <PillButton
              href={links.bookCall}
              label="Book a call"
              icon={ArrowUpRight}
              nudge="up-right"
              tone="bg-neutral-0 text-neutral-950"
              pad="pl-5 pr-[22px]"
              gap="gap-1.5"
            />
            <PillButton
              href={links.email}
              label="Send an email"
              icon={EnvelopeSimple}
              nudge="tilt"
              tone="bg-neutral-800 text-neutral-0"
              pad="pl-[22px] pr-5"
            />
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
