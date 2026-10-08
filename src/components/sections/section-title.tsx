"use client";

import { motion, useReducedMotion } from "motion/react";
import { DrawLine, MaskLines } from "@/components/motion/primitives";

/** Handwritten note + big mask-revealed title, as used for Selected Works and Testimonials. */
export function SectionTitle({
  note,
  lines,
  children,
}: {
  note: string;
  lines: string[];
  /** Optional sticker(s) positioned around the title. */
  children?: React.ReactNode;
}) {
  const reduce = useReducedMotion();
  return (
    <div className="relative flex flex-col items-center px-4 py-10 text-center">
      <motion.div
        className="flex rotate-3 flex-col items-center"
        initial={reduce ? false : { opacity: 0, y: 10, rotate: -4 }}
        whileInView={{ opacity: 1, y: 0, rotate: 3 }}
        viewport={{ once: true, amount: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 14 }}
      >
        <p className="font-hand text-[28px] text-ink-2">{note}</p>
        <DrawLine className="h-[2px] w-[70px] rounded-[1px] bg-ink-3" delay={0.35} />
      </motion.div>
      <h2 className="text-[clamp(48px,6.67vw,96px)] font-medium leading-[0.95] tracking-[-0.04em] text-ink">
        <MaskLines lines={lines} delay={0.1} />
      </h2>
      {children}
    </div>
  );
}
