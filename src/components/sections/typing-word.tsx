"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

/**
 * Types one word, holds it, backspaces it letter by letter, then types the
 * next, on a loop, with a blinking cursor. The first word is what the server
 * renders, so search engines and no-JS visitors read it as plain text.
 */
export function TypingWord({
  words,
  startDelay = 2600,
  hold = 2600,
  typeSpeed = 95,
  deleteSpeed = 55,
}: {
  words: string[];
  /** Before the first change, so the hero's entrance can finish. */
  startDelay?: number;
  /** How long each full word stays on screen. */
  hold?: number;
  typeSpeed?: number;
  deleteSpeed?: number;
}) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [shown, setShown] = useState(words[0]);
  const [phase, setPhase] = useState<"start" | "wait" | "deleting" | "typing">("start");

  useEffect(() => {
    if (reduce) return;
    const word = words[index];
    let id: ReturnType<typeof setTimeout>;
    if (phase === "start" || phase === "wait") {
      id = setTimeout(() => setPhase("deleting"), phase === "start" ? startDelay : hold);
    } else if (phase === "deleting") {
      id = shown.length
        ? setTimeout(() => setShown(shown.slice(0, -1)), deleteSpeed)
        : setTimeout(() => {
            setIndex((index + 1) % words.length);
            setPhase("typing");
          }, 260);
    } else {
      id = shown.length < word.length
        ? setTimeout(() => setShown(word.slice(0, shown.length + 1)), typeSpeed)
        : setTimeout(() => setPhase("wait"), 0);
    }
    return () => clearTimeout(id);
  }, [reduce, words, index, shown, phase, startDelay, hold, typeSpeed, deleteSpeed]);

  const busy = phase === "deleting" || phase === "typing";
  return (
    <span className="relative inline-flex items-baseline">
      {/* Zero-width space keeps the line's height while the word is empty. */}
      <span>{shown || "​"}</span>
      <span
        aria-hidden
        className={`ml-[0.05em] inline-block h-[0.78em] w-[0.06em] translate-y-[0.02em] self-center rounded-full bg-current ${busy ? "" : "animate-[caret_1.05s_steps(1)_infinite]"} motion-reduce:hidden`}
      />
    </span>
  );
}
