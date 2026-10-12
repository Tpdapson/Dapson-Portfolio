"use client";

import { playSwitchSound, setTheme, useTheme } from "./theme";

/**
 * Rocker switch from the Figma "Theme Toggle" component. Each state is the
 * variant exported straight from Figma as SVG (public/theme), so it matches
 * the design exactly. Clicking or tapping flips the theme at once with a soft
 * click; the two artworks swap instantly.
 *
 * Sizes: the switch body is 145×82 in Figma, shown at --s (0.5 on phones and
 * tablets, 0.6 = 87×49 on desktop). The exports include room for shadows, so
 * each image is offset to put its switch body exactly on the button.
 */
const art = {
  // [file, export width, body x, body y] from the Figma SVG exports
  light: ["/theme/toggle-light.svg", 193, 24, 14],
  dark: ["/theme/toggle-dark.svg", 201, 28, 16],
} as const;

export function ThemeToggle() {
  const theme = useTheme();
  const dark = theme === "dark";

  const flip = () => {
    const next = dark ? "light" : "dark";
    playSwitchSound();
    setTheme(next);
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={dark}
      aria-label="Dark mode"
      onClick={flip}
      className="relative block h-[calc(82px*var(--s))] w-[calc(145px*var(--s))] shrink-0 cursor-pointer rounded-[calc(22px*var(--s))] transition-transform duration-75 [--s:0.5] [-webkit-tap-highlight-color:transparent] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink active:scale-[0.96] lg:[--s:0.6]"
    >
      {(Object.keys(art) as (keyof typeof art)[]).map((key) => {
        const [src, w, x, y] = art[key];
        return (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={key}
            src={src}
            alt=""
            draggable={false}
            className="pointer-events-none absolute max-w-none select-none"
            style={{
              width: `calc(${w}px * var(--s))`,
              left: `calc(${-x}px * var(--s))`,
              top: `calc(${-y}px * var(--s))`,
              // Both stay loaded; only the current one shows (instant swap).
              opacity: key === theme ? 1 : 0,
            }}
          />
        );
      })}
    </button>
  );
}
