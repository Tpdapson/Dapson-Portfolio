"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";

export const easeOut = [0.16, 1, 0.3, 1] as const;

type Trigger = { delay?: number; onMount?: boolean };

/**
 * Lines slide up out of a mask, one after another. `onMount` plays on page
 * load (hero); otherwise it plays the first time the block scrolls into view.
 */
export function MaskLines({
  lines,
  className,
  lineClassName,
  delay = 0,
  stagger = 0.08,
  onMount,
}: {
  lines: string[];
  className?: string;
  lineClassName?: string;
  stagger?: number;
} & Trigger) {
  const reduce = useReducedMotion();
  const play = onMount ? { animate: "show" } : { whileInView: "show", viewport: { once: true, amount: 0.6 } };
  return (
    <motion.span className={className} initial={reduce ? "show" : "hide"} {...play}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.06em] -mb-[0.06em]">
          <motion.span
            className={`block ${lineClassName ?? ""}`}
            variants={{
              hide: { y: "105%", rotate: 2 },
              show: { y: "0%", rotate: 0, transition: { duration: 1.05, ease: easeOut, delay: delay + i * stagger } },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

/** Words drift up out of a soft blur. Good for supporting copy. */
export function BlurWords({
  text,
  className,
  delay = 0,
  stagger = 0.025,
  onMount,
}: { text: string; className?: string; stagger?: number } & Trigger) {
  const reduce = useReducedMotion();
  const play = onMount ? { animate: "show" } : { whileInView: "show", viewport: { once: true, amount: 0.5 } };
  const words = text.split(" ");
  return (
    <motion.span className={className} initial={reduce ? "show" : "hide"} {...play}>
      {words.map((w, i) => (
        <motion.span
          key={i}
          className="inline-block whitespace-pre"
          variants={{
            hide: { opacity: 0, y: 12, filter: "blur(8px)" },
            show: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: { duration: 0.8, ease: easeOut, delay: delay + i * stagger },
            },
          }}
        >
          {w + (i < words.length - 1 ? " " : "")}
        </motion.span>
      ))}
    </motion.span>
  );
}

/** Generic fade-up on enter. */
export function FadeUp({
  children,
  className,
  delay = 0,
  y = 24,
  onMount,
}: { children: React.ReactNode; className?: string; y?: number } & Trigger) {
  const reduce = useReducedMotion();
  const play = onMount ? { animate: "show" } : { whileInView: "show", viewport: { once: true, amount: 0.4 } };
  return (
    <motion.div
      className={className}
      initial={reduce ? "show" : "hide"}
      {...play}
      variants={{
        hide: { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: easeOut, delay } },
      }}
    >
      {children}
    </motion.div>
  );
}

/** Each word fills from `from` to `to` as the paragraph scrolls through the viewport. */
export function ScrollFillText({
  text,
  className,
  from = "#c4c4c4",
  to = "#0a0a0a",
}: {
  text: string;
  className?: string;
  from?: string;
  to?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(" ");
  if (reduce) return <p className={className} style={{ color: to }}>{text}</p>;
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <FillWord key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} from={from} to={to}>
          {w + (i < words.length - 1 ? " " : "")}
        </FillWord>
      ))}
    </p>
  );
}

function FillWord({
  children,
  progress,
  range,
  from,
  to,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  from: string;
  to: string;
}) {
  const color = useTransform(progress, range, [from, to]);
  return <motion.span style={{ color }}>{children}</motion.span>;
}

/**
 * A hand-placed sticker: springs in with a little overshoot, then can be
 * picked up and tossed (it springs back home).
 */
export function Sticker({
  children,
  rotate = 0,
  delay = 0,
  className,
  style,
  onMount,
}: {
  children: React.ReactNode;
  rotate?: number;
  className?: string;
  style?: React.CSSProperties;
} & Trigger) {
  const reduce = useReducedMotion();
  const play = onMount ? { animate: "show" } : { whileInView: "show", viewport: { once: true, amount: 0.8 } };
  return (
    <motion.div
      className={`cursor-grab touch-none select-none active:cursor-grabbing ${className ?? ""}`}
      style={style}
      initial={reduce ? "show" : "hide"}
      {...play}
      variants={{
        hide: { opacity: 0, scale: 0.4, rotate: rotate - 18 },
        show: { opacity: 1, scale: 1, rotate, transition: { type: "spring", stiffness: 260, damping: 14, delay } },
      }}
      drag
      dragSnapToOrigin
      dragElastic={0.35}
      dragTransition={{ bounceStiffness: 300, bounceDamping: 18 }}
      whileHover={{ scale: 1.06, rotate: rotate + (rotate >= 0 ? -3 : 3) }}
      whileDrag={{ scale: 1.12, rotate: 0 }}
    >
      {children}
    </motion.div>
  );
}

/** Underline that draws itself left to right. */
export function DrawLine({ className, delay = 0 }: { className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.span
      aria-hidden
      className={`block origin-left ${className ?? ""}`}
      initial={reduce ? false : { scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 1 }}
      transition={{ duration: 0.9, ease: easeOut, delay }}
    />
  );
}
