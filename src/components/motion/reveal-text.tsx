"use client";

import { useRef, useSyncExternalStore } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";

const HOVER_QUERY = "(hover: hover) and (pointer: fine)";

function useCanHover() {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia(HOVER_QUERY);
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia(HOVER_QUERY).matches,
    () => false,
  );
}

/**
 * Paragraphs whose words fill from `from` to `to` in reading order.
 * With a mouse, the fill follows the cursor: hovering a word sweeps everything
 * up to it to black, and it stays filled. On touch screens it follows scroll.
 */
export function RevealText({
  paragraphs,
  className,
  paragraphClassName,
  from = "#c4c4c4",
  to = "#0a0a0a",
}: {
  paragraphs: string[];
  className?: string;
  paragraphClassName?: string;
  from?: string;
  to?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const canHover = useCanHover();

  const words = paragraphs.map((p) => p.split(" "));
  const total = words.reduce((n, w) => n + w.length, 0);

  // How many words are filled; the spring makes jumps sweep gradually.
  const target = useMotionValue(0);
  const progress = useSpring(target, { stiffness: 70, damping: 22, mass: 0.6 });

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.5"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (!canHover) target.set(v * total);
  });

  const reach = (i: number) => {
    if (canHover && i + 1 > target.get()) target.set(i + 1);
  };

  if (reduce) {
    return (
      <div className={className}>
        {paragraphs.map((p, i) => (
          <p key={i} className={paragraphClassName} style={{ color: to }}>
            {p}
          </p>
        ))}
      </div>
    );
  }

  let index = 0;
  return (
    <div ref={ref} className={className}>
      {words.map((ws, pi) => (
        <p key={pi} className={paragraphClassName}>
          {ws.map((w, wi) => {
            const i = index++;
            return (
              <Word key={wi} i={i} progress={progress} from={from} to={to} onReach={reach}>
                {w + (wi < ws.length - 1 ? " " : "")}
              </Word>
            );
          })}
        </p>
      ))}
    </div>
  );
}

function Word({
  children,
  i,
  progress,
  from,
  to,
  onReach,
}: {
  children: string;
  i: number;
  progress: MotionValue<number>;
  from: string;
  to: string;
  onReach: (i: number) => void;
}) {
  const color = useTransform(progress, [i, i + 1], [from, to]);
  return (
    <motion.span style={{ color }} onPointerEnter={() => onReach(i)}>
      {children}
    </motion.span>
  );
}
