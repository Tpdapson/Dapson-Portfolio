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
 * The skill pills fill the whole contact + footer area. When the contact
 * section is about halfway up the screen they drop in from its top and pile
 * up at the bottom of the footer. Tap/click a pill to bounce it, brush the
 * mouse across one to knock it, or grab one (mouse or finger) and throw it,
 * as high as the top of the contact section. Reduced motion gets the static
 * Figma arrangement.
 */
export function SkillPile() {
  const box = useRef<HTMLDivElement>(null);
  const nodes = useRef<(HTMLDivElement | null)[]>([]);
  const reduce = useReducedMotion();
  // Start once the top of the contact section is about halfway up the screen.
  const started = useInView(box, { margin: "0px 0px -45% 0px", once: true });
  const [build, setBuild] = useState(0);
  // Set once the physics world exists: bounces pill `i`, nudged along (dx, dy).
  const kick = useRef<(i: number, dx?: number, dy?: number) => void>(() => {});
  const lastKick = useRef<number[]>([]);
  // Dragging (mouse or touch): grab pill `i` at a page point, follow the pointer, let go.
  const drag = useRef<{
    grab: (i: number, x: number, y: number) => void;
    move: (x: number, y: number) => void;
    release: () => void;
  } | null>(null);
  const press = useRef<{ x: number; y: number; t: number; moved: boolean } | null>(null);

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
        // Just above the top of the contact section, staggered so they rain in.
        const y = -h - Math.random() * 260 - i * 18;
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

      // Once everything has dropped in, add a ceiling at the top of the contact
      // section so a throw can reach it but never fly out of view.
      const ceilingTimer = window.setTimeout(() => {
        M.Composite.add(engine.world, M.Bodies.rectangle(W / 2, -T / 2, W + T * 2, T, wall));
      }, 3500);

      // A spring from the pointer to the grabbed point. Letting go keeps the
      // pill's momentum, so it can be thrown.
      let held: Matter.Constraint | null = null;
      let heldBody: Matter.Body | null = null;
      // Recent pointer positions, to throw with the pointer's own speed.
      let trail: { x: number; y: number; t: number }[] = [];
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
          heldBody = b;
          trail = [{ ...p, t: performance.now() }];
          M.Composite.add(engine.world, held);
        },
        move(x, y) {
          if (!held) return;
          const p = toWorld(x, y);
          held.pointA = p;
          const now = performance.now();
          trail.push({ ...p, t: now });
          trail = trail.filter((s) => now - s.t < 90);
        },
        release() {
          if (held) M.Composite.remove(engine.world, held);
          // Fling: carry on at the pointer's speed (per 16.7ms physics step).
          const first = trail[0];
          const lastS = trail[trail.length - 1];
          if (heldBody && first && lastS && lastS.t - first.t > 10) {
            const k = 16.7 / (lastS.t - first.t);
            const clamp = (v: number) => Math.max(-45, Math.min(45, v));
            const vx = clamp((lastS.x - first.x) * k);
            const vy = clamp((lastS.y - first.y) * k);
            if (Math.hypot(vx, vy) > Math.hypot(heldBody.velocity.x, heldBody.velocity.y)) {
              M.Body.setVelocity(heldBody, { x: vx, y: vy });
            }
          }
          held = null;
          heldBody = null;
          trail = [];
        },
      };

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
        window.clearTimeout(ceilingTimer);
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
      // Covers the contact section and footer. Clicks and scrolls pass through
      // to the content underneath; only the pills themselves take the pointer.
      className="pointer-events-none absolute inset-0 select-none"
    >
      {items.map((it, i) => (
        <div
          key={i}
          ref={(n) => {
            nodes.current[i] = n;
          }}
          role={it.label ? "listitem" : undefined}
          aria-hidden={it.label ? undefined : true}
          // Press to grab and throw; a quick press without moving bounces it.
          onPointerDown={(e) => {
            if (e.button !== 0) return;
            e.currentTarget.setPointerCapture(e.pointerId);
            press.current = { x: e.clientX, y: e.clientY, t: performance.now(), moved: false };
            drag.current?.grab(i, e.clientX, e.clientY);
          }}
          onPointerUp={() => {
            const p = press.current;
            press.current = null;
            if (!p) return;
            drag.current?.release();
            if (!p.moved && performance.now() - p.t < 350) kick.current(i);
          }}
          onPointerCancel={() => {
            press.current = null;
            drag.current?.release();
          }}
          onPointerMove={(e) => {
            const p = press.current;
            if (p) {
              if (Math.hypot(e.clientX - p.x, e.clientY - p.y) > 8) p.moved = true;
              drag.current?.move(e.clientX, e.clientY);
              return;
            }
            // Mouse hover: brushing across a pill knocks it the way the cursor moves.
            if (e.pointerType !== "mouse") return;
            const now = performance.now();
            if (now - (lastKick.current[i] ?? 0) < 350) return;
            lastKick.current[i] = now;
            kick.current(i, e.movementX * 0.6, e.movementY * 0.3);
          }}
          // touch-none: a finger on a pill drags it instead of scrolling the page.
          className={`pointer-events-auto absolute left-0 top-0 flex cursor-grab touch-none active:cursor-grabbing items-center justify-center opacity-0 shadow-[var(--shadow-pill)] will-change-transform [-webkit-tap-highlight-color:transparent] ${
            it.kind === "ball"
              ? "size-[var(--s)] rounded-full sm:size-[var(--t)] lg:size-[var(--S)]"
              : "gap-[5px] whitespace-nowrap rounded-full px-[12.5px] py-[7.5px] text-[12.5px] uppercase tracking-[0.02em] text-[#1b1b1b] sm:gap-[6.25px] sm:px-[15.6px] sm:py-[9.4px] sm:text-[15.6px] lg:gap-2.5 lg:px-[22px] lg:py-3.5 lg:text-[17px]"
          }`}
          style={
            {
              background: it.color,
              // Balls scale with the pills: phones 5/8 of desktop, tablets 1.25x phones.
              ...(it.kind === "ball"
                ? { "--s": `${(it.size! * 5) / 8}px`, "--t": `${(it.size! * 25) / 32}px`, "--S": `${it.size}px` }
                : null),
            } as CSSProperties
          }
        >
          {it.label}
          <it.Icon size={16} color="#1b1b1b" className={it.kind === "ball" ? "size-[12.5px] sm:size-[15.6px] lg:size-[18px]" : "size-[12.5px] sm:size-[15.6px] lg:size-4"} />
        </div>
      ))}
    </div>
  );
}
