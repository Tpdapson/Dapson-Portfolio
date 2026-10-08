"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "motion/react";
import { easeOut } from "@/components/motion/primitives";

/**
 * Full-bleed showreel. It eases up on load, then grows from a slightly inset
 * card to the full width as it scrolls into place.
 */
export function HeroVideo() {
  const ref = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { amount: 0.05 });

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 0.15"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
  const radius = useTransform(scrollYProgress, [0, 1], [40, 24]);
  const innerY = useTransform(scrollYProgress, [0, 1], ["-6%", "0%"]);

  // Only spend decode time while it's on screen.
  useEffect(() => {
    const v = video.current;
    if (!v) return;
    if (inView && !reduce) v.play().catch(() => {});
    else v.pause();
  }, [inView, reduce]);

  return (
    <motion.div
      ref={ref}
      initial={reduce ? false : { opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: easeOut, delay: 0.95 }}
      className="w-full"
    >
      <motion.div
        style={reduce ? { borderRadius: 24 } : { scale, borderRadius: radius }}
        className="relative aspect-[4/5] w-full overflow-hidden bg-surface sm:aspect-[1440/822]"
      >
        <motion.video
          ref={video}
          style={reduce ? undefined : { y: innerY, scale: 1.08 }}
          className="absolute inset-0 size-full object-cover"
          src="/video/hero.mp4"
          poster="/video/hero-poster.jpg"
          muted
          loop
          playsInline
          preload="metadata"
          aria-label="Showreel of selected product design work"
        />
      </motion.div>
    </motion.div>
  );
}
