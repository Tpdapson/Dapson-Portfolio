"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { SectionTitle } from "@/components/sections/section-title";
import { testimonials, type Testimonial } from "@/content/site";

/** Plays like a chat thread: a typing indicator, then the bubble pops in. */
export function Testimonials() {
  return (
    <section>
      <SectionTitle note="What my past clients say!" lines={["TESTIMONIALS"]} />
      <div className="mx-auto flex w-full max-w-[640px] flex-col gap-10 px-4 pb-[140px]">
        {testimonials.map((t) => (
          <Message key={t.name} t={t} />
        ))}
      </div>
    </section>
  );
}

function Message({ t }: { t: Testimonial }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.7 });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (!inView || reduce) return;
    const id = setTimeout(() => setSent(true), 750);
    return () => clearTimeout(id);
  }, [inView, reduce]);

  const stage = reduce || sent ? "sent" : inView ? "typing" : "idle";

  const right = t.side === "right";
  const corner = right ? "rounded-[16px_16px_2px_16px]" : "rounded-[16px_16px_16px_2px]";

  return (
    <div ref={ref} className={`flex w-full flex-col gap-2.5 ${right ? "items-end" : "items-start"}`}>
      {/* The bubble always takes its space, so nothing below jumps when it appears. */}
      <div className="relative w-full max-w-[440px]">
        <motion.div
          className={`px-4 py-3 shadow-[var(--shadow-bubble)] ${corner}`}
          style={{ background: t.bubble, transformOrigin: right ? "100% 100%" : "0% 100%" }}
          initial={false}
          animate={stage === "sent" ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.6, y: 12 }}
          transition={{ type: "spring", stiffness: 380, damping: 24 }}
        >
          <p className="text-[15px] font-medium leading-[1.35]" style={{ color: t.text }}>
            {t.quote}
          </p>
        </motion.div>

        <AnimatePresence>
          {stage === "typing" && (
            <motion.div
              className={`absolute bottom-0 flex gap-1 px-4 py-3.5 ${corner} ${right ? "right-0" : "left-0"}`}
              style={{ background: t.bubble }}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 420, damping: 26 }}
            >
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="size-1.5 rounded-full"
                  style={{ background: t.text }}
                  animate={{ y: [0, -3, 0], opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.12 }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.div
        className={`flex items-center gap-2.5 ${right ? "flex-row-reverse" : ""}`}
        initial={false}
        animate={{ opacity: stage === "sent" ? 1 : 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
      >
        <Avatar t={t} />
        <div className={`flex flex-col gap-0.5 ${right ? "items-end" : "items-start"}`}>
          <span className="text-[13px] font-medium text-[#333]">{t.name}</span>
          <span className="text-xs text-[#9a9a9a]">{t.role}</span>
        </div>
      </motion.div>
    </div>
  );
}

function Avatar({ t }: { t: Testimonial }) {
  if (t.avatar) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={t.avatar} alt="" className="size-9 rounded-full bg-surface object-cover" />
    );
  }
  return (
    <span
      className="flex size-8 items-center justify-center rounded-full border text-[13px] font-medium"
      style={{ background: `color-mix(in srgb, ${t.bubble} 25%, white)`, borderColor: t.text, color: t.text }}
    >
      {t.initials}
    </span>
  );
}
