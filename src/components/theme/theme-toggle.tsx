"use client";

import { motion, useReducedMotion } from "motion/react";
import { playSwitchSound, setTheme, useTheme } from "./theme";

/**
 * Rocker switch from the Figma "Theme Toggle" component (Mode=Light / Mode=Dark).
 * Drawn at the component's own 145×82 size and scaled down with --s. Clicking
 * or tapping anywhere on it flips the theme with a click sound; the rocker
 * tips and slides to the other side.
 */

// Rounded polygon path (Figma corner radius on a vector), as quadratic corners
// so both rocker shapes share the same commands and can morph into each other.
function roundedPath(pts: [number, number][], r: number) {
  const n = pts.length;
  let d = "";
  for (let i = 0; i < n; i++) {
    const [px, py] = pts[(i - 1 + n) % n];
    const [cx, cy] = pts[i];
    const [nx, ny] = pts[(i + 1) % n];
    const toward = (ax: number, ay: number) => {
      const len = Math.hypot(ax - cx, ay - cy);
      const k = Math.min(r, len / 2) / len;
      return [cx + (ax - cx) * k, cy + (ay - cy) * k].map((v) => +v.toFixed(2));
    };
    const [ax, ay] = toward(px, py);
    const [bx, by] = toward(nx, ny);
    d += `${i === 0 ? "M" : "L"} ${ax} ${ay} Q ${cx} ${cy} ${bx} ${by} `;
  }
  return d + "Z";
}

// Positions inside the 129×66 well, per state (from the two Figma variants).
const geometry = {
  light: {
    face: { x: 2, path: roundedPath([[0, 5], [96, 0], [96, 64], [0, 59]], 13) },
    end: 84,
    label: 18,
    dot: 74,
  },
  dark: {
    face: { x: 31, path: roundedPath([[0, 0], [96, 5], [96, 59], [0, 64]], 13) },
    end: 3,
    label: 47,
    dot: 103,
  },
};

const skins = {
  light: {
    housing: "linear-gradient(135deg, #ffffff, #e2e5ea)",
    housingShadow:
      "0 10px 24px rgb(27 34 48 / 0.12), 0 2px 4px rgb(27 34 48 / 0.08), inset 3px 3px 6px #c3c9d2, inset -2px -2px 4px #ffffff, inset 0 0 0 1px rgb(201 206 214 / 0.6)",
    well: "#dde1e7",
    wellShadow: "inset 2px 3px 6px #aeb6c2",
    end: "linear-gradient(90deg, #ffffff, #b6bdc9)",
    endShadow: "0 2px 4px rgb(125 135 150 / 0.35)",
    face: ["#fafafb", "#e7eaf0"],
    faceStroke: ["#e8ecee", "#ccd2da"],
    faceShadow: "drop-shadow(-2px 3px 3px rgb(138 148 163 / 0.35))",
    label: "#9ea5b0",
    dot: "#f7f8fa",
    dotBorder: "#d5dae1",
    dotShadow: "0 0 8px 2px #ffffff, 0 0 3px #aeb6c2, inset -1px -1px 2px #c9ced6",
  },
  dark: {
    housing: "linear-gradient(135deg, #2c313a, #101318)",
    housingShadow:
      "0 12px 28px rgb(0 0 0 / 0.55), 0 2px 4px rgb(0 0 0 / 0.35), inset 3px 3px 6px #07090c, inset -1px -1px 2px #3a414d, inset 0 0 0 1px rgb(25 28 34 / 0.8)",
    well: "#0d1014",
    wellShadow: "inset 2px 3px 6px #000000",
    end: "linear-gradient(90deg, #4c5566, #191d24)",
    endShadow: "0 2px 4px rgb(0 0 0 / 0.5)",
    face: ["#262b33", "#121519"],
    faceStroke: ["#3d4450", "#1a1e24"],
    faceShadow: "drop-shadow(2px 3px 3px rgb(0 0 0 / 0.6))",
    label: "#525a66",
    dot: "#06070a",
    dotBorder: "#2f3540",
    dotShadow: "0 0 6px 1px rgb(0 0 0 / 0.9), inset 1px 1px 2px #2a303a",
  },
};

export function ThemeToggle({ className = "" }: { className?: string }) {
  const theme = useTheme();
  const reduce = useReducedMotion();
  const dark = theme === "dark";
  const g = geometry[theme];
  const s = skins[theme];
  const move = reduce ? { duration: 0 } : { type: "spring" as const, stiffness: 520, damping: 34, mass: 0.7 };

  const flip = () => {
    const next = dark ? "light" : "dark";
    playSwitchSound(next);
    setTheme(next);
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={dark}
      aria-label="Dark mode"
      onClick={flip}
      // 145×82 design, scaled: 0.5 on phones/tablets, 0.6 (87×49) on desktop.
      className={`relative block h-[calc(82px*var(--s))] w-[calc(145px*var(--s))] shrink-0 cursor-pointer rounded-[calc(22px*var(--s))] [--s:0.5] [-webkit-tap-highlight-color:transparent] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink lg:[--s:0.6] ${className}`}
    >
      <span
        className="absolute left-0 top-0 block h-[82px] w-[145px] origin-top-left scale-[var(--s)] rounded-[22px] transition-transform duration-150 active:scale-[calc(var(--s)*0.97)]"
        style={{ background: s.housing, boxShadow: s.housingShadow }}
      >
        <span
          className="absolute left-2 top-2 block h-[66px] w-[129px] overflow-hidden rounded-2xl"
          style={{ background: s.well, boxShadow: s.wellShadow }}
        >
          <motion.span
            className="absolute top-0.5 block h-[62px] w-[42px] rounded-[14px]"
            style={{ background: s.end, boxShadow: s.endShadow }}
            initial={false}
            animate={{ left: g.end }}
            transition={move}
          />
          <motion.svg
            width={96}
            height={64}
            viewBox="0 0 96 64"
            className="absolute top-0 block overflow-visible"
            style={{ filter: s.faceShadow }}
            initial={false}
            animate={{ left: g.face.x }}
            transition={move}
            aria-hidden
          >
            <defs>
              <linearGradient id={`rf-${theme}`} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor={s.face[0]} />
                <stop offset="1" stopColor={s.face[1]} />
              </linearGradient>
              <linearGradient id={`rs-${theme}`} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor={s.faceStroke[0]} />
                <stop offset="1" stopColor={s.faceStroke[1]} />
              </linearGradient>
            </defs>
            <motion.path
              initial={false}
              animate={{ d: g.face.path }}
              transition={move}
              fill={`url(#rf-${theme})`}
              stroke={`url(#rs-${theme})`}
              strokeWidth={1}
            />
          </motion.svg>
          <motion.span
            className="absolute top-[26.5px] block text-[11px] font-medium leading-[13px] tracking-[0.06em]"
            style={{ color: s.label }}
            initial={false}
            animate={{ left: g.label }}
            transition={move}
            aria-hidden
          >
            {dark ? "DARK" : "LIGHT"}
          </motion.span>
          <motion.span
            className="absolute top-7 block size-2.5 rounded-full border"
            style={{ background: s.dot, borderColor: s.dotBorder, boxShadow: s.dotShadow }}
            initial={false}
            animate={{ left: g.dot }}
            transition={move}
          />
        </span>
      </span>
    </button>
  );
}
