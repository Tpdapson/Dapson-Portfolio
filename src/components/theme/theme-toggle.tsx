"use client";

import type { CSSProperties } from "react";
import { playSwitchSound, setTheme, useTheme } from "./theme";

/**
 * Rocker switch from the Figma "Theme Toggle" component (Mode=Light / Mode=Dark).
 * Drawn in code at the component's own 145×82 size and scaled down with --s.
 * Clicking or tapping anywhere on it flips the theme at once with a soft
 * click; the rocker switches sides instantly, like a real rocker switch.
 */

// Rounded polygon path (Figma corner radius on a vector), as quadratic corners.
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
    // Exact rocker outline from the Figma Mode=Dark export.
    face: {
      x: 31,
      path: "M 0 13.69 C 0 6.25 6.24 0.32 13.68 0.71 L 83.68 4.36 C 90.58 4.72 96 10.42 96 17.34 V 46.66 C 96 53.58 90.58 59.28 83.68 59.64 L 13.68 63.29 C 6.24 63.67 0 57.75 0 50.31 V 13.69 Z",
    },
    end: 3,
    label: 47,
    dot: 103,
  },
};

type Skin = {
  housing: string;
  /** Gradient edge of the housing (Figma inside stroke); drawn as a 1px ring. */
  housingRing?: string;
  housingShadow: string;
  well: string;
  wellShadow: string;
  end: string;
  endShadow: string;
  face: [string, string];
  faceStroke: [string, string];
  /** Gradient line for the rocker face, in its 96×64 box; defaults to corner to corner. */
  faceGradient?: { x1: number; y1: number; x2: number; y2: number };
  faceShadow: string;
  label: string;
  dot: string;
  dotBorder: string;
  dotShadow: string;
};

const skins: Record<"light" | "dark", Skin> = {
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
    label: "#818a98",
    dot: "#f7f8fa",
    dotBorder: "#d5dae1",
    dotShadow: "0 0 8px 2px #ffffff, 0 0 3px #aeb6c2, inset -1px -1px 2px #c9ced6",
  },
  // Values taken from the Figma Mode=Dark export: gradient angles and stop
  // positions mapped onto the same boxes, shadow blurs at Figma's softness.
  dark: {
    housing: "linear-gradient(150.5deg, #2c313a 14.3%, #101318 85.7%)",
    housingRing: "linear-gradient(150.5deg, #424956 14.3%, #191c22 85.7%)",
    housingShadow:
      "0 12px 28px rgb(0 0 0 / 0.55), 0 2px 4px rgb(0 0 0 / 0.35), inset 3px 3px 6px #07090c, inset -1px -1px 2px #3a414d",
    well: "#0d1014",
    wellShadow: "inset 2px 3px 6px #000000",
    end: "linear-gradient(180deg, #4c5566, #191d24)",
    endShadow: "0 2px 4px rgb(0 0 0 / 0.5)",
    face: ["#262b33", "#121519"],
    faceStroke: ["#3d4450", "#1a1e24"],
    faceGradient: { x1: 13.71, y1: 9.14, x2: 55.91, y2: 72.44 },
    faceShadow: "drop-shadow(2px 3px 6px rgb(0 0 0 / 0.6))",
    label: "#646e7c",
    dot: "#06070a",
    dotBorder: "#2f3540",
    dotShadow: "0 0 6px 1px rgb(0 0 0 / 0.9), inset 1px 1px 2px #2a303a",
  },
};

// 1px gradient ring: the padding box is masked out, leaving only the edge.
const ringMask: CSSProperties = {
  padding: 1,
  WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
  WebkitMaskComposite: "xor",
  mask: "linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0)",
};

export function ThemeToggle() {
  const theme = useTheme();
  const dark = theme === "dark";
  const g = geometry[theme];
  const s = skins[theme];
  const grad = s.faceGradient
    ? { gradientUnits: "userSpaceOnUse" as const, ...s.faceGradient }
    : { x1: 0, y1: 0, x2: 1, y2: 1 };

  const flip = () => {
    playSwitchSound();
    setTheme(dark ? "light" : "dark");
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={dark}
      aria-label="Dark mode"
      onClick={flip}
      // 145×82 design, scaled: 0.5 on phones/tablets, 0.6 (87×49) on desktop.
      className="relative block h-[calc(82px*var(--s))] w-[calc(145px*var(--s))] shrink-0 cursor-pointer rounded-[calc(22px*var(--s))] [--s:0.5] [-webkit-tap-highlight-color:transparent] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink lg:[--s:0.6]"
    >
      <span
        className="absolute left-0 top-0 block h-[82px] w-[145px] origin-top-left scale-[var(--s)] rounded-[22px] transition-transform duration-75 active:scale-[calc(var(--s)*0.96)]"
        style={{ background: s.housing, boxShadow: s.housingShadow }}
      >
        {s.housingRing && (
          <span className="pointer-events-none absolute inset-0 rounded-[22px]" style={{ ...ringMask, background: s.housingRing }} />
        )}
        <span
          className="absolute left-2 top-2 block h-[66px] w-[129px] overflow-hidden rounded-2xl"
          style={{ background: s.well, boxShadow: s.wellShadow }}
        >
          <span
            className="absolute top-0.5 block h-[62px] w-[42px] rounded-[14px]"
            style={{ left: g.end, background: s.end, boxShadow: s.endShadow }}
          />
          <svg
            width={96}
            height={64}
            viewBox="0 0 96 64"
            className="absolute top-0 block overflow-visible"
            style={{ left: g.face.x, filter: s.faceShadow }}
            aria-hidden
          >
            <defs>
              <linearGradient id={`rf-${theme}`} {...grad}>
                <stop offset="0" stopColor={s.face[0]} />
                <stop offset="1" stopColor={s.face[1]} />
              </linearGradient>
              <linearGradient id={`rs-${theme}`} {...grad}>
                <stop offset="0" stopColor={s.faceStroke[0]} />
                <stop offset="1" stopColor={s.faceStroke[1]} />
              </linearGradient>
              <clipPath id={`rc-${theme}`}>
                <path d={g.face.path} />
              </clipPath>
            </defs>
            <path d={g.face.path} fill={`url(#rf-${theme})`} />
            {/* Inside stroke, as in Figma: a 2px stroke clipped to the shape. */}
            <path d={g.face.path} fill="none" stroke={`url(#rs-${theme})`} strokeWidth={2} clipPath={`url(#rc-${theme})`} />
          </svg>
          <span
            className="absolute top-[26px] block text-[12px] font-medium leading-[14px] tracking-[0.06em]"
            style={{ left: g.label, color: s.label }}
            aria-hidden
          >
            {dark ? "DARK" : "LIGHT"}
          </span>
          <span
            className="absolute top-7 block size-2.5 rounded-full border"
            style={{ left: g.dot, background: s.dot, borderColor: s.dotBorder, boxShadow: s.dotShadow }}
          />
        </span>
      </span>
    </button>
  );
}
