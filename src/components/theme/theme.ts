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
  // Instant: no crossfade, so the page answers the click straight away.
  if (next === "dark") document.documentElement.dataset.theme = "dark";
  else delete document.documentElement.dataset.theme;
  try {
    localStorage.setItem(THEME_KEY, next);
  } catch {}
  window.dispatchEvent(new Event(EVENT));
}

let audio: AudioContext | null = null;

/**
 * A soft, light switch click, synthesised so there's no audio file to load:
 * a very short high tick of filtered noise with a gentle fade. No low thump.
 */
export function playSwitchSound() {
  try {
    const Ctx = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audio ??= new Ctx();
    const ctx = audio;
    if (ctx.state === "suspended") void ctx.resume();
    const t = ctx.currentTime;

    const len = Math.floor(ctx.sampleRate * 0.008);
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / len) ** 3;
    const noise = ctx.createBufferSource();
    noise.buffer = buf;

    const band = ctx.createBiquadFilter();
    band.type = "bandpass";
    band.frequency.value = 4200;
    band.Q.value = 0.9;
    const soften = ctx.createBiquadFilter();
    soften.type = "lowpass";
    soften.frequency.value = 7000;
    const gain = ctx.createGain();
    gain.gain.value = 0.22;

    noise.connect(band).connect(soften).connect(gain).connect(ctx.destination);
    noise.start(t);
  } catch {
    // No audio available; the switch still works silently.
  }
}
