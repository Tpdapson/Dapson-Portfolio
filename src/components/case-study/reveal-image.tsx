"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

/**
 * Case-study image: opens from a slightly inset, rounded clip as it scrolls in,
 * with the picture settling from a small zoom.
 */
export function RevealImage({
  src,
  w,
  h,
  alt,
  priority,
  className,
}: {
  src: string;
  w: number;
  h: number;
  alt: string;
  priority?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 0.55"] });
  const inset = useTransform(scrollYProgress, [0, 1], [6, 0]);
  const clipPath = useTransform(inset, (v) => `inset(${v}% ${v}% ${v}% ${v}% round ${16 + v * 3}px)`);
  const scale = useTransform(scrollYProgress, [0, 1], [1.08, 1]);

  return (
    <motion.div ref={ref} style={reduce ? undefined : { clipPath }} className={`overflow-hidden ${className ?? ""}`}>
      <motion.div style={reduce ? undefined : { scale }}>
        <Image
          src={src}
          width={w}
          height={h}
          alt={alt}
          priority={priority}
          sizes="(min-width: 1440px) 1376px, 100vw"
          className="block h-auto w-full"
        />
      </motion.div>
    </motion.div>
  );
}
