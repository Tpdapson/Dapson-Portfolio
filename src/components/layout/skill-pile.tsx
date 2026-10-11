"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useInView, useReducedMotion } from "motion/react";
import {
  ArrowUpRight,
  Binoculars,
  Brain,
  Code,
  Cube,
  CursorClick,
  Eye,
  Heart,
  Laptop,
  Lightbulb,
  MagicWand,
  PaperPlaneTilt,
  Shuffle,
  Smiley,
  Sparkle,
  Star,
  Target,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";

/**
 * Skill pills from the Figma "Skill Pills (physics pile)" frame. Positions are
 * the design's, at 1440px wide: `at` is a top-left corner, `box` is the
 * bounding box of a rotated pill.
 */
type Item = {
  kind: "pill" | "ball";
  label?: string;
  color: string;
  Icon: Icon;
  rot: number;
  size?: number;
  at?: { left: number; top: number };
  box?: { x: number; y: number; w: number; h: number };
};

const items: Item[] = [
  { kind: "pill", label: "Product thinking", color: "#7cc4f2", Icon: Brain, rot: -14, box: { x: 0, y: 30, w: 238.66, h: 103.18 } },
  { kind: "pill", label: "Visual design", color: "#b9a6f5", Icon: Cube, rot: 0, at: { left: 151, top: 114 } },
  { kind: "ball", color: "#5ab6f0", Icon: ArrowUpRight, rot: 0, size: 44, at: { left: 168, top: 76 } },
  { kind: "pill", label: "Web design", color: "#f5cb6b", Icon: Laptop, rot: 0, at: { left: 255, top: 18 } },
  { kind: "pill", label: "Design systems", color: "#f59c72", Icon: Sparkle, rot: 22, box: { x: 331.64, y: 80, w: 216.4, h: 124.67 } },
  { kind: "pill", label: "Interaction design", color: "#73d1b2", Icon: CursorClick, rot: 4, box: { x: 466.58, y: 56, w: 250.74, h: 65.18 } },
  { kind: "ball", color: "#f28a4b", Icon: Star, rot: 0, size: 44, at: { left: 512, top: 146 } },
  { kind: "pill", label: "Improving UX", color: "#b9a6f5", Icon: Smiley, rot: -14, box: { x: 620, y: -20.76, w: 195.97, h: 92.54 } },
  { kind: "ball", color: "#5ab6f0", Icon: Heart, rot: 0, size: 40, at: { left: 640, top: 132 } },
  { kind: "ball", color: "#3cb5a0", Icon: Eye, rot: 0, size: 44, at: { left: 698, top: 90 } },
  { kind: "pill", label: "AI-assisted building", color: "#f58fa3", Icon: Code, rot: 0, at: { left: 720, top: 132 } },
  { kind: "ball", color: "#8fcb55", Icon: Lightbulb, rot: 0, size: 44, at: { left: 950, top: 90 } },
  { kind: "pill", label: "User research", color: "#7cc4f2", Icon: Binoculars, rot: -61.41, box: { x: 970.79, y: -3.81, w: 142.18, h: 206.48 } },
  { kind: "pill", label: "Accessibility", color: "#f5cb6b", Icon: Target, rot: 0, at: { left: 1017, top: 142 } },
  { kind: "pill", label: "Prototyping", color: "#a3d96a", Icon: Shuffle, rot: 0, at: { left: 1045, top: 63 } },
  { kind: "ball", color: "#f5c04e", Icon: PaperPlaneTilt, rot: 0, size: 40, at: { left: 1205, top: 62 } },
  { kind: "pill", label: "Brand design", color: "#73d1b2", Icon: MagicWand, rot: 14, box: { x: 1225, y: 102, w: 200.82, h: 93.75 } },
  { kind: "ball", color: "#8b6cf6", Icon: Star, rot: 0, size: 40, at: { left: 1320, top: 72 } },
];

const DESIGN_W = 1440;
const DESIGN_H = 190;

function designCenter(it: Item, w: number, h: number) {
  if (it.box) return { x: it.box.x + it.box.w / 2, y: it.box.y + it.box.h / 2 };
  return { x: it.at!.left + w / 2, y: it.at!.top + h / 2 };
}

function place(node: HTMLElement, x: number, y: number, angle: number) {
  node.style.transform = `translate3d(${x - node.offsetWidth / 2}px, ${y - node.offsetHeight / 2}px, 0) rotate(${angle}rad)`;
}

/**
 * When the footer scrolls in, the pills drop in and pile up. Tapping a pill,
 * or brushing the mouse across one, bounces it; with a mouse you can also grab
 * and throw them. Reduced motion gets the static Figma arrangement.
 */
export function SkillPile() {
  const box = useRef<HTMLDivElement>(null);
  const nodes = useRef<(HTMLDivElement | null)[]>([]);
  const reduce = useReducedMotion();
  const started = useInView(box, { amount: 0.2, once: true });
  const [build, setBuild] = useState(0);
  // Set once the physics world exists: bounces pill `i`, nudged along (dx, dy).
  const kick = useRef<(i: number, dx?: number, dy?: number) => void>(() => {});
  const lastKick = useRef<number[]>([]);
  // Touch dragging: grab pill `i` at a page point, follow the finger, let go.
  const drag = useRef<{
    grab: (i: number, x: number, y: number) => void;
    move: (x: number, y: number) => void;
    release: () => void;
  } | null>(null);
  const touch = useRef<{ x: number; y: number; t: number; moved: boolean } | null>(null);

  // Rebuild the world when the width changes meaningfully.
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    let w = el.clientWidth;
    const ro = new ResizeObserver(() => {
      if (Math.abs(el.clientWidth - w) > 40) {
        w = el.clientWidth;
        setBuild((b) => b + 1);
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Static arrangement (reduced motion).
  useEffect(() => {
    if (!reduce || !box.current) return;
    const W = box.current.clientWidth;
    const H = box.current.clientHeight;
    nodes.current.forEach((n, i) => {
      if (!n) return;
      const it = items[i];
      const c = designCenter(it, n.offsetWidth, n.offsetHeight);
      place(n, (c.x / DESIGN_W) * W, H - DESIGN_H + c.y, (it.rot * Math.PI) / 180);
      n.style.opacity = "1";
    });
  }, [reduce, build]);

  // Physics.
  useEffect(() => {
    if (reduce || !started || !box.current) return;
    const el = box.current;
    let raf = 0;
    let cancelled = false;
    let teardown = () => {};

    import("matter-js").then(({ default: M }) => {
      if (cancelled) return;
      const W = el.clientWidth;
      const H = el.clientHeight;
      const engine = M.Engine.create({ gravity: { x: 0, y: 1.2 } });
      const wall = { isStatic: true, friction: 0.6 };
      const T = 400;
      M.Composite.add(engine.world, [
        M.Bodies.rectangle(W / 2, H + T / 2, W + T * 2, T, wall),
        M.Bodies.rectangle(-T / 2, -H * 2, T, H * 8, wall),
        M.Bodies.rectangle(W + T / 2, -H * 2, T, H * 8, wall),
      ]);

      const live = nodes.current.filter(Boolean) as HTMLDivElement[];
      const bodies = live.map((n, i) => {
        const it = items[i];
        const w = n.offsetWidth;
        const h = n.offsetHeight;
        const c = designCenter(it, w, h);
        const x = Math.min(W - w / 2, Math.max(w / 2, (c.x / DESIGN_W) * W));
        const y = -h - Math.random() * H * 2 - i * 14;
        const opts = { restitution: 0.3, friction: 0.5, frictionAir: 0.015, density: 0.002, angle: (it.rot * Math.PI) / 180 };
        const body =
          it.kind === "ball"
            ? M.Bodies.circle(x, y, w / 2, opts)
            : M.Bodies.rectangle(x, y, w, h, { ...opts, chamfer: { radius: h / 2 - 1 } });
        n.style.opacity = "1";
        return body;
      });
      M.Composite.add(engine.world, bodies);

      kick.current = (i, dx = 0, dy = 0) => {
        const b = bodies[i];
        if (!b) return;
        const side = dx || (Math.random() - 0.5) * 6;
        M.Body.setVelocity(b, {
          x: Math.max(-14, Math.min(14, b.velocity.x + side)),
          y: Math.min(b.velocity.y, -9 - Math.random() * 5 + Math.min(0, dy)),
        });
        M.Body.setAngularVelocity(b, (Math.random() - 0.5) * 0.3);
      };

      // Touch: a spring from the finger to the grabbed point, like the mouse
      // constraint below. Letting go keeps the pill's momentum, so it can be thrown.
      let held: Matter.Constraint | null = null;
      const toWorld = (x: number, y: number) => {
        const r = el.getBoundingClientRect();
        return { x: x - r.left, y: y - r.top };
      };
      drag.current = {
        grab(i, x, y) {
          const b = bodies[i];
          if (!b) return;
          const p = toWorld(x, y);
          held = M.Constraint.create({
            pointA: p,
            bodyB: b,
            pointB: M.Vector.rotate(M.Vector.sub(p, b.position), -b.angle),
            stiffness: 0.2,
            damping: 0.1,
          });
          M.Composite.add(engine.world, held);
        },
        move(x, y) {
          if (held) held.pointA = toWorld(x, y);
        },
        release() {
          if (held) M.Composite.remove(engine.world, held);
          held = null;
        },
      };

      // Grab-and-throw for mouse users.
      let removeMouse = () => {};
      if (window.matchMedia("(pointer: fine)").matches) {
        const mouse = M.Mouse.create(el);
        // matter-js keeps its DOM handlers on the instance but doesn't type them.
        const h = mouse as unknown as Record<"mousewheel" | "mousemove" | "mousedown" | "mouseup", EventListener>;
        el.removeEventListener("wheel", h.mousewheel);
        el.removeEventListener("touchmove", h.mousemove);
        el.removeEventListener("touchstart", h.mousedown);
        el.removeEventListener("touchend", h.mouseup);
        const mc = M.MouseConstraint.create(engine, { mouse, constraint: { stiffness: 0.2, render: { visible: false } } });
        M.Composite.add(engine.world, mc);
        removeMouse = () => {
          el.removeEventListener("mousemove", h.mousemove);
          el.removeEventListener("mousedown", h.mousedown);
          el.removeEventListener("mouseup", h.mouseup);
        };
      }

      // Run only while visible.
      let visible = true;
      const io = new IntersectionObserver(([e]) => {
        visible = e.isIntersecting;
        if (visible && !raf) {
          last = performance.now();
          raf = requestAnimationFrame(tick);
        }
      });
      io.observe(el);

      let last = performance.now();
      const tick = (now: number) => {
        const dt = Math.min(now - last, 32);
        last = now;
        M.Engine.update(engine, dt);
        bodies.forEach((b, i) => place(live[i], b.position.x, b.position.y, b.angle));
        raf = visible ? requestAnimationFrame(tick) : 0;
      };
      raf = requestAnimationFrame(tick);

      teardown = () => {
        kick.current = () => {};
        drag.current = null;
        cancelAnimationFrame(raf);
        io.disconnect();
        removeMouse();
        M.Engine.clear(engine);
      };
    });

    return () => {
      cancelled = true;
      teardown();
    };
  }, [reduce, started, build]);

  return (
    <div
      ref={box}
      aria-label="Skills"
      role="list"
      // On touch screens the box lets scrolls through; only the pills take taps.
      className="absolute inset-x-0 bottom-0 h-[180px] cursor-grab select-none active:cursor-grabbing sm:h-[260px] lg:h-[190px] [@media(pointer:coarse)]:pointer-events-none"
    >
      {items.map((it, i) => (
        <div
          key={i}
          ref={(n) => {
            nodes.current[i] = n;
          }}
          role={it.label ? "listitem" : undefined}
          aria-hidden={it.label ? undefined : true}
          // Mouse click bounces it. Touch is handled below: tap to bounce, drag to move.
          onClick={() => {
            if (!touch.current) kick.current(i);
          }}
          onPointerDown={(e) => {
            if (e.pointerType === "mouse") {
              touch.current = null;
              return;
            }
            e.currentTarget.setPointerCapture(e.pointerId);
            touch.current = { x: e.clientX, y: e.clientY, t: performance.now(), moved: false };
            drag.current?.grab(i, e.clientX, e.clientY);
          }}
          onPointerUp={(e) => {
            const t = touch.current;
            if (!t || e.pointerType === "mouse") return;
            drag.current?.release();
            if (!t.moved && performance.now() - t.t < 350) kick.current(i);
          }}
          onPointerCancel={() => drag.current?.release()}
          // Mouse: brushing across a pill knocks it the way the cursor moves.
          onPointerMove={(e) => {
            const t = touch.current;
            if (t && e.pointerType !== "mouse") {
              if (Math.hypot(e.clientX - t.x, e.clientY - t.y) > 8) t.moved = true;
              drag.current?.move(e.clientX, e.clientY);
              return;
            }
            if (e.pointerType !== "mouse" || e.buttons) return;
            const now = performance.now();
            if (now - (lastKick.current[i] ?? 0) < 350) return;
            lastKick.current[i] = now;
            kick.current(i, e.movementX * 0.6, e.movementY * 0.3);
          }}
          // touch-none: a finger on a pill drags it instead of scrolling the page.
          className={`pointer-events-auto absolute left-0 top-0 flex touch-none items-center justify-center opacity-0 shadow-[var(--shadow-pill)] will-change-transform [-webkit-tap-highlight-color:transparent] ${
            it.kind === "ball"
              ? "size-[var(--s)] rounded-full sm:size-[var(--S)]"
              : "gap-[5px] whitespace-nowrap rounded-full px-[12.5px] py-[7.5px] text-[12.5px] uppercase tracking-[0.02em] text-[#1b1b1b] sm:gap-2.5 sm:px-[22px] sm:py-3.5 sm:text-[17px]"
          }`}
          style={
            {
              background: it.color,
              // Balls: smaller on phones (5/8 of desktop, in step with the pills).
              ...(it.kind === "ball" ? { "--s": `${(it.size! * 5) / 8}px`, "--S": `${it.size}px` } : null),
            } as CSSProperties
          }
        >
          {it.label}
          <it.Icon size={16} color="#1b1b1b" className={it.kind === "ball" ? "size-[12.5px] sm:size-[18px]" : "size-[12.5px] sm:size-4"} />
        </div>
      ))}
    </div>
  );
}
