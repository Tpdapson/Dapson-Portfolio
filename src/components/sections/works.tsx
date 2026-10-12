"use client";

import { createContext, useContext, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { easeOut, Sticker } from "@/components/motion/primitives";
import { SectionTitle } from "@/components/sections/section-title";
import Image from "next/image";
import Link from "next/link";
import { external, works, type Work } from "@/content/site";

type CursorApi = { show: (label: string) => void; hide: () => void };
const CursorContext = createContext<CursorApi>({ show: () => {}, hide: () => {} });

export function Works() {
  const [label, setLabel] = useState<string | null>(null);
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.5 });

  return (
    <CursorContext.Provider value={{ show: setLabel, hide: () => setLabel(null) }}>
      <section
        id="work"
        onPointerMove={(e) => {
          x.set(e.clientX);
          y.set(e.clientY);
        }}
      >
        <SectionTitle note="Explore my work!" lines={["SELECTED", "WORKS"]}>
          <Sticker rotate={-8} delay={0.3} className="absolute left-[min(calc(50%+120px),calc(100%-64px))] top-[24px] sm:left-[65%] sm:top-[30px]">
            <div className="size-[56px] overflow-hidden rounded-full bg-surface sm:size-[73px]">
              <Image src="/images/works-sticker.png" alt="" width={73} height={73} quality={90} className="pointer-events-none size-full object-cover" draggable={false} />
            </div>
          </Sticker>
        </SectionTitle>

        <div className="mx-auto max-w-[1440px]">
          {works.map((work, i) => (
            <WorkItem key={work.slug} work={work} index={i} />
          ))}
        </div>

        {/* Follower label shown over covers (mouse only). */}
        <motion.div
          aria-hidden
          className="pointer-events-none fixed left-0 top-0 z-50 hidden [@media(pointer:fine)]:block"
          style={{ x: sx, y: sy }}
        >
          <AnimatePresence>
            {label && (
              <motion.div
                key="cursor"
                className="flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-ink-2 px-4 py-2.5 text-sm font-medium text-on-ink"
                initial={{ scale: 0.3, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.3, opacity: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 26 }}
              >
                {label}
                <ArrowUpRight size={14} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </section>
    </CursorContext.Provider>
  );
}

function WorkItem({ work, index }: { work: Work; index: number }) {
  const cursor = useContext(CursorContext);
  const reduce = useReducedMotion();
  const coverRef = useRef<HTMLDivElement>(null);
  const [missing, setMissing] = useState(false);

  // Cover opens out from inset sides as it scrolls in. The image itself is
  // never zoomed or shifted, so the whole design always shows.
  const { scrollYProgress } = useScroll({ target: coverRef, offset: ["start end", "end start"] });
  const inset = useTransform(scrollYProgress, [0, 0.35], [8, 0]);
  // Sides only, so the cover doesn't add empty space above/below while it opens.
  const clipPath = useTransform(inset, (v) => `inset(0% ${v}% 0% ${v}% round ${v * 2}px)`);

  const number = String(index + 1).padStart(2, "0");
  const isExternal = !!work.website;

  return (
    // Space below each project: 48px on phones, 56px on tablets, 72px on desktop.
    <article className="flex flex-col gap-5 px-4 pb-12 sm:px-10 sm:pb-14 lg:pb-[72px]">
      <motion.div
        className="flex items-center gap-4 sm:gap-6"
        initial={reduce ? false : "hide"}
        whileInView="show"
        viewport={{ once: true, amount: 0.8 }}
      >
        <span className="overflow-hidden">
          <motion.span
            className="block text-[clamp(32px,3.33vw,48px)] tracking-[-0.04em] text-ink"
            variants={{ hide: { y: "100%" }, show: { y: 0, transition: { duration: 0.8, ease: easeOut } } }}
          >
            {number}
          </motion.span>
        </span>
        <motion.span
          className="h-px flex-1 origin-left bg-rule"
          variants={{ hide: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 1.1, ease: easeOut, delay: 0.1 } } }}
        />
        <motion.span
          className="flex flex-col items-end gap-1 text-right"
          variants={{ hide: { opacity: 0, x: 16 }, show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: easeOut, delay: 0.25 } } }}
        >
          <span className="text-[clamp(17px,1.53vw,22px)] font-medium tracking-[-0.02em] text-ink">{work.name}</span>
          <span className="text-xs text-caption">{work.tagline}</span>
        </motion.span>
      </motion.div>

      <Link
        href={work.href}
        {...external(work.href)}
        aria-label={isExternal ? `View the ${work.name} website` : `Read the ${work.name} case study`}
        className="block"
      >
      <motion.div
        ref={coverRef}
        style={reduce ? undefined : { clipPath }}
        // Same 1360×800 shape as the Figma cover, on every screen size.
        className="relative aspect-[1360/800] w-full overflow-hidden"
        onPointerEnter={(e) => e.pointerType === "mouse" && cursor.show(isExternal ? "View website" : "View case study")}
        onPointerLeave={cursor.hide}
      >
        <div className="absolute inset-0" style={{ background: work.tone ?? "var(--color-surface)" }} />
        {!missing && (
          <Image
            src={work.cover}
            alt={`${work.name} — ${work.tagline}`}
            fill
            sizes="(min-width: 1440px) 1360px, (min-width: 640px) calc(100vw - 80px), calc(100vw - 32px)"
            quality={90}
            onError={() => setMissing(true)}
            className="object-cover"
          />
        )}
      </motion.div>
      </Link>
    </article>
  );
}
