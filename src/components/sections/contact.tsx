"use client";

import { ArrowUpRight, EnvelopeSimple } from "@phosphor-icons/react/dist/ssr";
import { FadeUp, MaskLines } from "@/components/motion/primitives";
import { Magnetic } from "@/components/motion/magnetic";
import { links } from "@/content/site";

export function Contact() {
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
            <Magnetic>
              <a
                href={links.bookCall}
                className="group flex items-center gap-1.5 rounded-full bg-neutral-0 px-5 py-3.5 text-base font-medium text-neutral-950"
              >
                Book a call
                <ArrowUpRight size={18} className="transition-transform duration-300 ease-out group-hover:rotate-45" />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={links.email}
                className="group flex items-center gap-2 rounded-full bg-neutral-800 px-5 py-3.5 text-base font-medium text-neutral-0"
              >
                Send an email
                <EnvelopeSimple size={18} className="transition-transform duration-300 ease-out group-hover:-rotate-12" />
              </a>
            </Magnetic>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
