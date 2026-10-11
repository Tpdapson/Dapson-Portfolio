"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useOpenImage } from "@/components/case-study/lightbox";

/**
 * Case-study image: opens out from slightly inset sides as it scrolls in,
 * with the picture settling from a small zoom. On phones and tablets,
 * tapping it opens the full-screen viewer.
 */
export function RevealImage({
  src,
  w,
  h,
  alt,
  priority,
  className,
  square = false,
  sizes = "(min-width: 1440px) 1376px, 100vw",
}: {
  src: string;
  w: number;
  h: number;
  alt: string;
  priority?: boolean;
  className?: string;
  /** Square corners (desktop-product case studies). */
  square?: boolean;
  sizes?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 0.55"] });
  const inset = useTransform(scrollYProgress, [0, 1], [6, 0]);
  // Opens from the sides only, so the vertical spacing between images stays
  // even while they scroll in (important on phones, where images stack).
  const clipPath = useTransform(inset, (v) => `inset(0% ${v}% 0% ${v}% round ${square ? 0 : 16 + v * 3}px)`);
  const scale = useTransform(scrollYProgress, [0, 1], [1.08, 1]);
  const openImage = useOpenImage();

  return (
    <motion.div ref={ref} style={reduce ? undefined : { clipPath }} className={`overflow-hidden ${className ?? ""}`}>
      <motion.div style={reduce ? undefined : { scale }} className="relative">
        <Image
          src={src}
          width={w}
          height={h}
          alt={alt}
          priority={priority}
          sizes={sizes}
          quality={90}
          className="block h-auto w-full"
        />
        {openImage && <ZoomButton label={alt} onClick={() => openImage(src)} />}
      </motion.div>
    </motion.div>
  );
}

/**
 * Invisible full-cover button that opens the viewer. Phones and tablets only:
 * on desktop the images are already large enough to read.
 */
export function ZoomButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`View larger: ${label}`}
      className="absolute inset-0 cursor-zoom-in [-webkit-tap-highlight-color:transparent] lg:hidden focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-ink"
    />
  );
}
