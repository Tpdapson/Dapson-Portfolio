"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore, type CSSProperties, type FormEvent } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { Eyes, PushPin } from "@phosphor-icons/react";
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

/** "Say hi before you go!" — visitors write a sticky note and pin it to the board. */
export function PinANote() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [fresh, setFresh] = useState<string | null>(null);

  useEffect(() => {
    let live = true;
    fetch("/api/notes")
      .then((r) => (r.ok ? r.json() : { notes: [] }))
      .then((d: { notes?: Note[] }) => live && setNotes(d.notes ?? []))
      .catch(() => {});
    return () => {
      live = false;
    };
  }, []);

  // Desktop shows a board of seven; phones and tablets a grid of six. "See
  // more notes" swaps in the next, older set, and wraps back to the newest.
  const perPage = useIsDesktop() ? slots.length : gridTilt.length;
  // The Figma examples only top up the first set while there are few real notes.
  const pool =
    notes.length >= perPage || !showSampleNotes ? notes : [...notes, ...sampleNotes].slice(0, perPage);
  const pageCount = Math.max(1, Math.ceil(pool.length / perPage));
  const [page, setPage] = useState(0);
  const current = page % pageCount;
  const shown = pool.slice(current * perPage, current * perPage + perPage);
  // Notes swapped in by "See more notes" drop onto the board one after another.
  const [dealt, setDealt] = useState(false);

  const seeMore = () => {
    setFresh(null);
    setDealt(true);
    setPage(current + 1 >= pageCount ? 0 : current + 1);
  };

  const pinned = (note: Note) => {
    setNotes((n) => [note, ...n.filter((m) => m.id !== note.id)]);
    setFresh(note.id);
    setDealt(false);
    setPage(0);
  };

  return (
    <section id="notes" className="px-4 pb-[70px] sm:px-10 lg:px-20 lg:pb-[140px]">
      <div className="mx-auto max-w-[1280px]">
        <Header />

        {/* Desktop sizes: notes scale with the board (--ns) so they keep their places. */}
        <div className="relative mt-8 rounded-[24px] bg-board p-4 [--ns:1] [background-image:radial-gradient(circle,var(--color-board-dot)_1.5px,transparent_1.6px)] [background-position:5.5px_5.5px] [background-size:32px_32px] sm:p-8 lg:mt-12 lg:h-[560px] lg:overflow-hidden lg:rounded-[32px] lg:p-0 lg:[--ns:0.78] xl:h-[600px] xl:[--ns:0.9] min-[1440px]:h-[640px] min-[1440px]:[--ns:1]">
          <Composer onPinned={pinned} />

          <ul className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 sm:mt-14 sm:gap-x-8 sm:gap-y-12 md:grid-cols-3 lg:static lg:mt-0 lg:block">
            {shown.map((note, i) => (
              <li
                key={note.id}
                // Six on phones and tablets (two even rows); all seven on desktop.
                className={`lg:absolute lg:left-[calc(var(--x)*1%)] lg:top-[calc(var(--y)*1%)] lg:w-[calc(210px*var(--ns))] lg:-translate-x-1/2 ${i >= gridTilt.length ? "max-lg:hidden" : ""}`}
                style={{ "--x": slots[i].x, "--y": slots[i].y } as CSSProperties}
              >
                <StickyNote note={note} tilt={slots[i].r} gridTilt={gridTilt[i] ?? 0} flip={slots[i].flip} drop={note.id === fresh || dealt} order={i} />
              </li>
            ))}
          </ul>
        </div>

        {pageCount > 1 && (
          <div className="mt-2 flex justify-center">
            <button
              type="button"
              onClick={seeMore}
              className="group relative inline-flex cursor-pointer overflow-hidden rounded-full bg-page py-3.5 pl-[22px] pr-5 text-sm font-medium leading-[normal] whitespace-nowrap text-ink-2"
            >
              <RollingLabel className="gap-2">
                See more notes
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
function useIsDesktop() {
  return useSyncExternalStore(
    (cb) => {
      const m = window.matchMedia(desktopQuery);
      m.addEventListener("change", cb);
      return () => m.removeEventListener("change", cb);
    },
    () => window.matchMedia(desktopQuery).matches,
    () => true,
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
  // Long notes get smaller writing so they still fit on the paper.
  const size = note.text.length <= 32 ? "text-[14.3cqw]" : note.text.length <= 64 ? "text-[11.5cqw]" : "text-[9.6cqw]";

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
        className={`absolute inset-0 m-0 flex flex-col justify-between overflow-hidden rounded-[6px] p-[10.5cqw] drop-shadow-[0_10px_10px_rgb(0_0_0/0.1)] ${entering ? "note-drop" : swing ? "note-dangle" : ""}`}
        style={{ animationDelay: entering ? delay : undefined, background: c.paper, color: c.ink, transform: "rotate(var(--r))", transformOrigin: "50% -1%" }}
        onAnimationEnd={() => {
          setEntering(false);
          setSwing(false);
        }}
      >
        <blockquote className={`m-0 line-clamp-5 font-hand leading-[1.05] [overflow-wrap:anywhere] ${size} ${flip ? "lg:mt-auto" : ""}`}>{note.text}</blockquote>
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

function Composer({ onPinned }: { onPinned: (note: Note) => void }) {
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [color, setColor] = useState<NoteColor>("pink");
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
