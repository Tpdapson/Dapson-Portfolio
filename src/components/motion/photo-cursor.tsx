"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring, useVelocity, useTransform } from "motion/react";

const INTERACTIVE = "a, button, input, textarea, select, label, [role='button']";

/**
 * Wraps an area so a small photo trails the mouse over it. The photo hides over
 * anything clickable so it never covers a link or button. Mouse only.
 */
export function PhotoCursor({ children, src, size = 80 }: { children: React.ReactNode; src: string; size?: number }) {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const ready = useRef(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 350, damping: 30, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 350, damping: 30, mass: 0.5 });
  // Lean slightly into the direction of travel, around the design's -5°.
  const vx = useVelocity(sx);
  const rotate = useTransform(vx, [-1500, 0, 1500], [-14, -5, 4], { clamp: true });

  function onMove(e: React.PointerEvent) {
    if (reduce || e.pointerType !== "mouse") return;
    // Jump straight to the pointer on entry so it doesn't fly in from 0,0.
    if (!ready.current) {
      sx.jump(e.clientX);
      sy.jump(e.clientY);
      ready.current = true;
    }
    x.set(e.clientX);
    y.set(e.clientY);
    const overInteractive = !!(e.target as Element).closest(INTERACTIVE);
    setVisible(!overInteractive);
  }

  function onLeave() {
    setVisible(false);
    ready.current = false;
  }

  return (
    <div onPointerMove={onMove} onPointerLeave={onLeave}>
      {children}
      {!reduce && (
        <motion.div
          aria-hidden
          className="pointer-events-none fixed left-0 top-0 z-50 hidden [@media(pointer:fine)]:block"
          style={{ x: sx, y: sy }}
        >
          <AnimatePresence>
            {visible && (
              <motion.div
                key="photo"
                className="-translate-x-1/2 -translate-y-1/2"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0, transition: { duration: 0.18, ease: "easeIn" } }}
                transition={{ type: "spring", stiffness: 420, damping: 24 }}
              >
                <motion.div
                  style={{ rotate, width: size, height: size }}
                  className="overflow-hidden rounded-[20px] bg-surface shadow-[0_12px_32px_-8px_rgb(0_0_0/0.35)]"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt="" className="size-full object-cover" draggable={false} />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
