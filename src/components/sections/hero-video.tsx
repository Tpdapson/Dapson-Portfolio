"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { easeOut } from "@/components/motion/primitives";

/**
 * Showreel. Edge to edge with square corners, up to the 1440px page width,
 * and always at the video's own 1920×1112 shape so nothing is cropped and
 * the height scales with the width.
 */
export function HeroVideo() {
  const ref = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { amount: 0.05 });

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
      className="mx-auto w-full max-w-[1440px]"
    >
      <div className="relative aspect-[1920/1112] w-full overflow-hidden bg-surface">
        <video
          ref={video}
          className="absolute inset-0 size-full object-cover"
          src="/video/hero.mp4"
          poster="/video/hero-poster.jpg"
          muted
          loop
          playsInline
          preload="metadata"
          aria-label="Showreel of selected product design work"
        />
      </div>
    </motion.div>
  );
}
