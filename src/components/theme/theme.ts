"use client";

import { useSyncExternalStore } from "react";
import { THEME_KEY } from "./theme-script";

/**
 * Light/dark theme. The theme is the `data-theme` attribute on <html>
 * ("dark", or absent for light); the colours live in globals.css. Light is
 * the default; a visitor's choice is saved and re-applied before first paint
 * by the inline script in the root layout.
 */
export type Theme = "light" | "dark";

const EVENT = "themechange";

function current(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function subscribe(onChange: () => void) {
  window.addEventListener(EVENT, onChange);
  return () => window.removeEventListener(EVENT, onChange);
}

export function useTheme(): Theme {
  return useSyncExternalStore(subscribe, current, () => "light");
}

export function setTheme(next: Theme) {
  const apply = () => {
    if (next === "dark") document.documentElement.dataset.theme = "dark";
    else delete document.documentElement.dataset.theme;
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {}
    window.dispatchEvent(new Event(EVENT));
  };

  // Crossfade the whole page where the browser supports it.
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const doc = document as Document & { startViewTransition?: (cb: () => void) => unknown };
  if (doc.startViewTransition && !reduce) doc.startViewTransition(apply);
  else apply();
}

let audio: AudioContext | null = null;

/**
 * A short mechanical switch click, synthesised so there's no audio file to
 * load: a bright tick of filtered noise over a low thump. Turning dark is
 * pitched a little lower than turning light.
 */
export function playSwitchSound(to: Theme) {
  try {
    const Ctx = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audio ??= new Ctx();
    const ctx = audio;
    if (ctx.state === "suspended") void ctx.resume();
    const t = ctx.currentTime;
    const pitch = to === "dark" ? 0.8 : 1;

    // Tick: 12ms of noise through a band-pass, fast decay.
    const len = Math.floor(ctx.sampleRate * 0.012);
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / len) ** 2;
    const noise = ctx.createBufferSource();
    noise.buffer = buf;
    const band = ctx.createBiquadFilter();
    band.type = "bandpass";
    band.frequency.value = 3200 * pitch;
    band.Q.value = 1.2;
    const tickGain = ctx.createGain();
    tickGain.gain.value = 0.55;
    noise.connect(band).connect(tickGain).connect(ctx.destination);
    noise.start(t);

    // Thump: a quick sine drop, like the rocker seating.
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(190 * pitch, t);
    osc.frequency.exponentialRampToValueAtTime(70 * pitch, t + 0.05);
    const thump = ctx.createGain();
    thump.gain.setValueAtTime(0.0001, t);
    thump.gain.exponentialRampToValueAtTime(0.35, t + 0.004);
    thump.gain.exponentialRampToValueAtTime(0.0001, t + 0.07);
    osc.connect(thump).connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.08);
  } catch {
    // No audio available; the switch still works silently.
  }
}
