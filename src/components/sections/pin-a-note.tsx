"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore, type CSSProperties, type FormEvent } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { Eyes, PushPin } from "@phosphor-icons/react";
import { useLenis } from "lenis/react";
import { DrawLine, MaskLines } from "@/components/motion/primitives";
import { RollingLabel } from "@/components/ui/pill-button";
import { sampleNotes, showSampleNotes } from "@/content/notes";
import { NAME_MAX, NOTE_MAX, colorNames, noteColors, type Note, type NoteColor } from "@/lib/notes/types";

/**
 * Where notes sit on the desktop board, newest first: the pin's position as a
 * share of the board (from the Figma board, 1280×640) and the note's tilt.
 * Below desktop the board becomes a simple grid under the composer.
 */
const slots = [
  { x: 13.46, y: 9.5, r: 6 },
  { x: 82.16, y: 9.73, r: 4 },
  { x: 32.16, y: 6.23, r: -4 },
  { x: 91.35, y: 29.5, r: -7 },
  { x: 13.62, y: 58.41, r: -3 },
  { x: 87.59, y: 65.7, r: -5 },
  // Mostly under the composer on desktop, so the name goes on top and the
  // note itself at the bottom, where it can be read.
  { x: 52.34, y: 71.1, r: 3, flip: true },
];
// Gentler alternating tilts for the phone and tablet grid.
const gridTilt = [-3, 4, 3, -4, -2, 3];

/**
 * Preview mode: add `?demo-notes` to the page URL to fill the board with 20
 * made-up notes (only in that browser tab; nothing is saved), to try "See
 * more notes" before real notes come in.
 */
function demoNotes(): Note[] {
  if (!new URLSearchParams(window.location.search).has("demo-notes")) return [];
  const lines = [
    "Love the attention to detail here",
    "The case studies read so well",
    "hello from Accra 👋",
    "Clean, calm and clear. Great work",
    "That dark mode toggle is fun",
    "Saving this for inspiration",
    "the sticky notes are a vibe",
    "Proud of you, keep going!",
    "Great storytelling in the HelloMe study",
    "hi from Lagos!",
  ];
  return Array.from({ length: 20 }, (_, i) => ({
    id: `demo-${i + 1}`,
    text: `${lines[i % lines.length]} (demo ${i + 1})`,
    name: `Demo visitor ${i + 1}`,
    color: colorNames[i % colorNames.length],
    createdAt: 0,
  }));
}

/** "Say hi before you go!" — visitors write a sticky note and pin it to the board. */
export function PinANote() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [fresh, setFresh] = useState<string | null>(null);

  useEffect(() => {
    let live = true;
    fetch("/api/notes")
      .then((r) => (r.ok ? r.json() : { notes: [] }))
      .then((d: { notes?: Note[] }) => live && setNotes([...(d.notes ?? []), ...demoNotes()]))
      .catch(() => {});
    return () => {
      live = false;
    };
  }, []);

  const desktop = useMedia(desktopQuery, true);
  const first = desktop ? slots.length : gridTilt.length;
  // The Figma examples only top up the first set while there are few real notes.
  const pool =
    notes.length >= first || !showSampleNotes ? notes : [...notes, ...sampleNotes].slice(0, first);

  // Desktop: "See more notes" swaps in the next, older seven in the same
  // places, and wraps back to the newest after the oldest.
  const pageCount = Math.max(1, Math.ceil(pool.length / slots.length));
  const [page, setPage] = useState(0);
  const current = page % pageCount;

  // Phones and tablets: each tap adds six more below (or whatever is left);
  // once everything is showing, "See less notes" goes back to the first six.
  const [extra, setExtra] = useState(0);
  const count = Math.min(gridTilt.length + extra, pool.length);
  const allShown = count >= pool.length;

  const shown = desktop ? pool.slice(current * slots.length, (current + 1) * slots.length) : pool.slice(0, count);
  const hasMore = desktop ? pageCount > 1 : pool.length > gridTilt.length;

  // Notes brought in by the button drop onto the board one after another.
  const [dealt, setDealt] = useState(false);
  const board = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  const seeMore = () => {
    setFresh(null);
    setDealt(true);
    if (desktop) return setPage(current + 1 >= pageCount ? 0 : current + 1);
    if (!allShown) return setExtra(extra + gridTilt.length);
    setExtra(0);
    // Back up to the board, so the page doesn't end up far below it.
    if (board.current) {
      if (lenis) lenis.scrollTo(board.current, { offset: -96 });
      else board.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  const less = !desktop && allShown;

  const pinned = (note: Note) => {
    setNotes((n) => [note, ...n.filter((m) => m.id !== note.id)]);
    setFresh(note.id);
    setDealt(false);
    setPage(0);
    setExtra(0);
  };

  return (
    <section id="notes" className="px-4 pb-[70px] sm:px-10 lg:px-20 lg:pb-[140px]">
      <div className="mx-auto max-w-[1280px]">
        <Header />

        {/* Desktop sizes: notes scale with the board (--ns) so they keep their places. */}
        <div ref={board} className="relative mt-8 rounded-[24px] bg-board p-4 [--ns:1] [background-image:radial-gradient(circle,var(--color-board-dot)_1.5px,transparent_1.6px)] [background-position:5.5px_5.5px] [background-size:32px_32px] sm:p-8 lg:mt-12 lg:h-[560px] lg:overflow-hidden lg:rounded-[32px] lg:p-0 lg:[--ns:0.78] xl:h-[600px] xl:[--ns:0.9] min-[1440px]:h-[640px] min-[1440px]:[--ns:1]">
          <Composer onPinned={pinned} />

          <ul className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 sm:mt-14 sm:gap-x-8 sm:gap-y-12 md:grid-cols-3 lg:static lg:mt-0 lg:block">
            {shown.map((note, i) => (
              <li
                key={note.id}
                // Before hydration the desktop set renders; its seventh note is hidden below desktop.
                className={`lg:absolute lg:left-[calc(var(--x)*1%)] lg:top-[calc(var(--y)*1%)] lg:w-[calc(210px*var(--ns))] lg:-translate-x-1/2 ${desktop && i >= gridTilt.length ? "max-lg:hidden" : ""}`}
                style={{ "--x": slots[i % slots.length].x, "--y": slots[i % slots.length].y } as CSSProperties}
              >
                <StickyNote
                  note={note}
                  tilt={slots[i % slots.length].r}
                  gridTilt={gridTilt[i % gridTilt.length]}
                  flip={slots[i % slots.length].flip}
                  drop={note.id === fresh || dealt}
                  order={desktop ? i : i % gridTilt.length}
                />
              </li>
            ))}
          </ul>
        </div>

        {hasMore && (
          <div className="mt-2 flex justify-center">
            <button
              type="button"
              onClick={seeMore}
              className="group relative inline-flex cursor-pointer overflow-hidden rounded-full bg-page py-3.5 pl-[22px] pr-5 text-sm font-medium leading-[normal] whitespace-nowrap text-ink-2"
            >
              <RollingLabel className="gap-2">
                {less ? "See less notes" : "See more notes"}
                <Eyes size={16} aria-hidden className="shrink-0" />
              </RollingLabel>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

const desktopQuery = "(min-width: 1024px)";
function useMedia(query: string, serverValue: boolean) {
  return useSyncExternalStore(
    (cb) => {
      const m = window.matchMedia(query);
      m.addEventListener("change", cb);
      return () => m.removeEventListener("change", cb);
    },
    () => window.matchMedia(query).matches,
    () => serverValue,
  );
}

function Header() {
  const reduce = useReducedMotion();
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
      <div className="flex flex-col items-start gap-1">
        <motion.div
          className="flex origin-left rotate-3 flex-col items-start gap-1"
          initial={reduce ? false : { opacity: 0, y: 10, rotate: -4 }}
          whileInView={{ opacity: 1, y: 0, rotate: 3 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ type: "spring", stiffness: 200, damping: 14 }}
        >
          <p className="font-hand text-[26px] text-ink-2 sm:text-[30px]">Say hi before you go!</p>
          <DrawLine className="h-[2px] w-[70px] rounded-[1px] bg-ink-3" delay={0.35} />
        </motion.div>
        <h2 className="text-[clamp(48px,6.67vw,96px)] font-medium leading-none tracking-[-0.03em] text-title">
          <MaskLines lines={["PIN A NOTE"]} delay={0.1} />
        </h2>
      </div>
      <p className="max-w-[420px] text-base font-medium leading-[1.5] text-body">
        Write a quick note, pick a colour and stick it on the board. Kind words, feedback or just a hello, they all make my
        day.
      </p>
    </div>
  );
}

/** Note text sizes, as a share of the note's width: biggest first. */
const TEXT_SIZES = [14.3, 13.4, 12.6, 11.8, 11, 10.3, 9.6, 9, 8.4, 7.8, 7.2];

/**
 * Picks the biggest writing that fits the space above the name, so short and
 * medium notes stay big and only really long ones get small. Checked again
 * when the note resizes and once the handwriting font has loaded.
 */
function useFitText(content: string) {
  const box = useRef<HTMLQuoteElement>(null);
  const text = useRef<HTMLSpanElement>(null);
  const [size, setSize] = useState(TEXT_SIZES[0]);

  useLayoutEffect(() => {
    const el = box.current;
    const inner = text.current;
    if (!el || !inner) return;
    const fit = () => {
      for (const s of TEXT_SIZES) {
        el.style.fontSize = `${s}cqw`;
        if (inner.offsetHeight <= el.clientHeight + 1) return setSize(s);
      }
      setSize(TEXT_SIZES[TEXT_SIZES.length - 1]);
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el.parentElement ?? el);
    document.fonts?.ready.then(fit);
    return () => ro.disconnect();
  }, [content]);

  return { box, text, size };
}

function StickyNote({
  note,
  tilt,
  gridTilt,
  flip,
  drop,
  order,
}: {
  note: Note;
  tilt: number;
  gridTilt: number;
  /** Desktop only: name at the top, note at the bottom. */
  flip?: boolean;
  /** Drop onto the board (a note just pinned, or a new set of notes). */
  drop: boolean;
  /** Position on the board, to stagger the swings when several arrive together. */
  order: number;
}) {
  const [swing, setSwing] = useState(false);
  // Swing once each time the note scrolls into view, a beat apart from its
  // neighbours, then settle. Hover and tap still swing it as well.
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.6 });
  useEffect(() => {
    if (!inView) return;
    const id = setTimeout(() => setSwing(true), 120 + (order % 7) * 90);
    return () => clearTimeout(id);
  }, [inView, order]);
  // A note that was just pinned, or swapped in, drops in once, then swings like the others.
  const [entering, setEntering] = useState(drop);
  const delay = `${(order % 7) * 70}ms`;
  const c = noteColors[note.color] ?? noteColors.pink;
  const { box, text, size } = useFitText(note.text);

  return (
    <div
      // Tilt: a gentle grid tilt on phones/tablets, the Figma tilt on desktop.
      ref={ref}
      className="@container relative aspect-[210/190] w-full cursor-default [--r:var(--rg)] lg:[--r:var(--rd)]"
      style={{ "--rg": `${gridTilt}deg`, "--rd": `${tilt}deg` } as CSSProperties}
      // A little swing on hover (mouse) or tap (touch), hanging from the pin.
      onPointerEnter={(e) => e.pointerType === "mouse" && setSwing(true)}
      onPointerDown={(e) => e.pointerType !== "mouse" && setSwing(true)}
    >
      <figure
        className={`absolute inset-0 m-0 flex flex-col gap-[3cqw] overflow-hidden rounded-[6px] p-[10.5cqw] drop-shadow-[0_10px_10px_rgb(0_0_0/0.1)] ${entering ? "note-drop" : swing ? "note-dangle" : ""}`}
        style={{ animationDelay: entering ? delay : undefined, background: c.paper, color: c.ink, transform: "rotate(var(--r))", transformOrigin: "50% -1%" }}
        onAnimationEnd={() => {
          setEntering(false);
          setSwing(false);
        }}
      >
        <blockquote
          ref={box}
          className={`m-0 flex min-h-0 flex-1 flex-col overflow-hidden font-hand leading-[1.05] [overflow-wrap:anywhere] ${flip ? "lg:justify-end" : ""}`}
          style={{ fontSize: `${size}cqw` }}
        >
          <span ref={text}>{note.text}</span>
        </blockquote>
        {note.name && <figcaption className={`truncate text-[6.2cqw] font-medium ${flip ? "lg:order-first" : ""}`}>— {note.name}</figcaption>}
      </figure>
      <Image
        src="/images/pin.svg"
        alt=""
        width={29}
        height={32}
        unoptimized
        className={`pointer-events-none absolute left-1/2 top-[-9.5cqw] h-auto w-[13.7cqw] -translate-x-1/2 drop-shadow-[4px_7px_5px_rgb(13_8_5/0.14)] ${entering ? "pin-drop" : ""}`}
        style={entering ? { animationDelay: `calc(${delay} + 0.45s)` } : undefined}
      />
    </div>
  );
}

/** A random note colour, other than `not` when given. */
function randomColor(not?: NoteColor): NoteColor {
  const options = colorNames.filter((c) => c !== not);
  return options[Math.floor(Math.random() * options.length)];
}

// Chosen once per page load in the browser; the server renders pink, then the
// browser swaps in this colour as the page hydrates.
let startPick: NoteColor | null = null;
const randomStartColor = () => (startPick ??= randomColor());
const noSubscribe = () => () => {};

function Composer({ onPinned }: { onPinned: (note: Note) => void }) {
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  // Start each visit on a random colour so the board doesn't fill up with
  // whichever one happened to be the default. Picking a swatch overrides it.
  const startColor = useSyncExternalStore(noSubscribe, randomStartColor, () => "pink" as NoteColor);
  const [picked, setColor] = useState<NoteColor | null>(null);
  const color = picked ?? startColor;
  const [status, setStatus] = useState<{ kind: "idle" | "sending" | "done" | "error"; message?: string }>({ kind: "idle" });
  const c = noteColors[color];

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status.kind === "sending") return;
    if (text.trim().length < 2) {
      setStatus({ kind: "error", message: "Write a little something first." });
      return;
    }
    setStatus({ kind: "sending" });
    const website = (new FormData(e.currentTarget).get("website") as string) ?? "";
    try {
      const res = await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, name, color, website }),
      });
      const data: { note?: Note | null; error?: string } = await res.json();
      if (!res.ok || data.error) {
        setStatus({ kind: "error", message: data.error ?? "Couldn't pin that. Please try again." });
        return;
      }
      if (data.note) onPinned(data.note);
      setText("");
      // A fresh colour for the next note.
      setColor(randomColor(color));
      setStatus({ kind: "done", message: "Pinned! Thanks for the note." });
    } catch {
      setStatus({ kind: "error", message: "Couldn't reach the board. Check your connection and try again." });
    }
  };

  const left = NOTE_MAX - text.length;

  return (
    <form
      onSubmit={submit}
      className="relative z-10 mx-auto flex w-full max-w-[480px] flex-col gap-4 rounded-[24px] bg-card p-5 shadow-[0_24px_48px_rgb(0_0_0/0.14)] sm:rounded-[28px] sm:p-7 lg:absolute lg:left-1/2 lg:top-1/2 lg:w-[420px] lg:-translate-x-1/2 lg:-translate-y-1/2 dark:shadow-[0_24px_48px_rgb(0_0_0/0.5)]"
    >
      <div className="flex items-baseline justify-between">
        <label htmlFor="note-text" className="text-[13px] text-body">
          Your note
        </label>
        {left <= 20 && (
          <span className="text-[12px] tabular-nums text-subtle" aria-live="polite">
            {left} left
          </span>
        )}
      </div>
      <textarea
        id="note-text"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          if (status.kind !== "sending") setStatus({ kind: "idle" });
        }}
        maxLength={NOTE_MAX}
        rows={3}
        placeholder="Write something nice…"
        className="h-[120px] w-full resize-none rounded-[16px] p-[18px] font-hand text-[30px] leading-[1.1] outline-none transition-colors placeholder:text-[var(--hint)] focus-visible:ring-2 focus-visible:ring-[var(--ink)]"
        style={
          {
            background: `color-mix(in srgb, ${c.paper} 42%, white)`,
            color: c.ink,
            "--hint": `color-mix(in srgb, ${c.ink} 65%, white)`,
            "--ink": c.ink,
          } as CSSProperties
        }
      />
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        maxLength={NAME_MAX}
        placeholder="Your name (optional)"
        aria-label="Your name (optional)"
        autoComplete="given-name"
        className="w-full rounded-[12px] bg-field px-4 py-3.5 text-sm text-ink outline-none placeholder:text-subtle focus-visible:ring-2 focus-visible:ring-ink-3"
      />
      {/* Honeypot for bots; people never see or reach it. */}
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px] h-px w-px opacity-0" />

      <div className="flex items-center justify-between gap-3">
        <div role="radiogroup" aria-label="Note colour" className="flex gap-2">
          {colorNames.map((name) => (
            <button
              key={name}
              type="button"
              role="radio"
              aria-checked={color === name}
              aria-label={name}
              onClick={() => setColor(name)}
              className={`size-6 cursor-pointer rounded-full transition-transform hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ${color === name ? "shadow-[0_0_0_2px_var(--color-ink-2)]" : ""}`}
              style={{ background: noteColors[name].paper }}
            />
          ))}
        </div>
        <button
          type="submit"
          disabled={status.kind === "sending"}
          className="group relative inline-flex shrink-0 cursor-pointer overflow-hidden rounded-full bg-ink-2 px-5 py-3 text-sm font-medium leading-[normal] whitespace-nowrap text-on-ink disabled:cursor-wait disabled:opacity-70"
        >
          <RollingLabel className="gap-1.5">
            {status.kind === "sending" ? "Pinning…" : "Pin note"}
            <PushPin size={16} aria-hidden className="shrink-0" />
          </RollingLabel>
        </button>
      </div>

      <p
        aria-live="polite"
        className={`-mt-1 text-[13px] empty:hidden leading-[1.3] ${status.kind === "error" ? "text-[#c2410c] dark:text-[#fb923c]" : "text-body"}`}
      >
        {status.message}
      </p>
    </form>
  );
}
