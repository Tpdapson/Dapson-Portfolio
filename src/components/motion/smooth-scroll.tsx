"use client";

import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "motion/react";

/** Light inertial scrolling. Native scroll is kept for reduced-motion users. */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  if (reduce) return <>{children}</>;
  return (
    <ReactLenis root options={{ lerp: 0.12, wheelMultiplier: 1, anchors: { offset: -16 } }}>
      {children}
    </ReactLenis>
  );
}
