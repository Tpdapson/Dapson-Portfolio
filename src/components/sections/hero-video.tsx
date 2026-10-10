"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "motion/react";
import { easeOut } from "@/components/motion/primitives";

/**
 * Showreel. The frame keeps the video's own 1920×1112 shape so nothing is
 * cropped, stays within the page margins, and never gets taller than the
 * screen. It eases up on load, then grows slightly into place on scroll.
 */
export function HeroVideo() {
  const ref = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { amount: 0.05 });

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 0.15"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);
  const radius = useTransform(scrollYProgress, [0, 1], [32, 24]);

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
      className="w-full px-4 sm:px-10"
    >
      <motion.div
        style={reduce ? { borderRadius: 24 } : { scale, borderRadius: radius }}
        // Width is the smallest of: the space available, 1360px, and whatever
        // keeps the height inside the viewport (minus room for breathing space).
        className="relative mx-auto aspect-[1920/1112] w-[min(100%,1360px,calc((100svh-48px)*1920/1112))] overflow-hidden bg-surface"
      >
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
      </motion.div>
    </motion.div>
  );
}
