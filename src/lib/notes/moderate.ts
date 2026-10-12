import { NAME_MAX, NOTE_MAX } from "./types";

/**
 * The automatic filter every note passes before it's pinned. It blocks links,
 * contact details, profanity and obvious spam, and tidies whitespace. Anything
 * that still slips through can be removed from /notes/admin.
 *
 * To block more words, add them to `blocked` (whole words) or `blockedInside`
 * (blocked even inside other words; keep that list to unambiguous terms).
 */

const blocked = [
  "fuck", "fucker", "fucking", "fuckin", "fucked", "fuk", "fck", "motherfucker", "mf", "mofo",
  "shit", "shitty", "bullshit", "bitch", "bitches", "bastard", "asshole", "arsehole", "ass", "arse",
  "dick", "dickhead", "cock", "pussy", "cunt", "twat", "wanker", "prick", "slut", "whore", "hoe",
  "bollocks", "bugger", "douche", "douchebag", "jackass", "dumbass", "retard", "retarded",
  "porn", "porno", "nudes", "boobs", "tits", "penis", "vagina", "cum", "dildo",
  "nazi", "kys", "rape", "rapist",
  "werey", "mumu", "olodo", "ashawo", "oloshi", "didirin",
  "crypto", "bitcoin", "forex", "casino", "betting", "viagra", "loan", "giveaway",
];

const blockedInside = ["fuck", "shit", "cunt", "nigger", "nigga", "faggot", "bitch", "whore", "porn"];

const blockedSet = new Set(blocked);

// Undo common letter swaps (sh1t, f*ck, b!tch) before matching.
const leet: Record<string, string> = { "0": "o", "1": "i", "!": "i", "3": "e", "4": "a", "@": "a", "5": "s", $: "s", "7": "t", "*": "u" };

function normalise(s: string) {
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[0134@5$7!*]/g, (c) => leet[c] ?? c);
}

function hasProfanity(s: string) {
  const n = normalise(s);
  const squeeze = (w: string) => w.replace(/(.)\1+/g, "$1");
  // Spelled out letter by letter (f u c k, s.h.i.t) counts as one word.
  const joined = n.replace(/\b[a-z](?:[\s._*-]+[a-z]\b){2,}/g, (run) => run.replace(/[^a-z]/g, ""));
  const words = joined.split(/[^a-z]+/).filter(Boolean);
  return words.some(
    (w) =>
      blockedSet.has(w) ||
      blockedSet.has(squeeze(w)) || // stretched letters: fuuuck
      // Inside longer words (bullshitting). Words with double letters are only
      // matched as written, so "nigger" squeezed never matches "Nigeria".
      blockedInside.some((b) => w.includes(b) || (b === squeeze(b) && squeeze(w).includes(b))),
  );
}

const linkPattern =
  /(https?:|www\.|\.(com|net|org|io|co|ng|me|xyz|app|dev|link|ly|gg|ru|cn|info|biz|site|online|shop|store|click|top)\b|\b[a-z0-9-]+\s?(\.|\(dot\)|\[dot\]|\sdot\s)\s?(com|net|org|io|co|ng)\b|t\.me|wa\.me|bit\.ly)/i;
const emailPattern = /[^\s@]+@[^\s@]+\.[^\s@]+/;
const phonePattern = /(\+?\d[\d\s().-]{7,}\d)/;
const handlePattern = /(^|\s)@[a-z0-9_.]{3,}/i;

export type Checked = { ok: true; text: string; name: string } | { ok: false; error: string };

export function tidy(s: string, max: number) {
  return s
    .replace(/[\u0000-\u0009\u000b-\u001f\u007f​-‏‪-‮⁠-⁯]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

export function checkNote(rawText: unknown, rawName: unknown): Checked {
  if (typeof rawText !== "string" || (rawName != null && typeof rawName !== "string")) {
    return { ok: false, error: "Something went wrong. Please try again." };
  }
  if (rawText.trim().length > NOTE_MAX + 20 || (rawName?.trim().length ?? 0) > NAME_MAX + 10) {
    return { ok: false, error: "That's a bit long for a sticky note." };
  }
  const text = tidy(rawText, NOTE_MAX);
  const name = tidy(rawName ?? "", NAME_MAX);

  if (text.replace(/[^\p{L}\p{N}]/gu, "").length < 2) return { ok: false, error: "Write a little something first." };

  const both = `${text} ${name}`;
  if (linkPattern.test(both) || emailPattern.test(both) || handlePattern.test(both)) {
    return { ok: false, error: "Links, emails and handles can't go on the board." };
  }
  if (phonePattern.test(both)) return { ok: false, error: "Phone numbers can't go on the board." };
  if (hasProfanity(both)) return { ok: false, error: "Let's keep the board friendly. Try different words." };

  // Spammy shapes: one character hammered, or a wall of capitals.
  if (/(.)\1{7,}/u.test(text)) return { ok: false, error: "Try writing that with fewer repeats." };
  const letters = text.replace(/[^a-zA-Z]/g, "");
  if (letters.length > 16 && letters === letters.toUpperCase()) {
    return { ok: false, error: "No need to shout. Try it in lowercase." };
  }

  return { ok: true, text, name };
}

/** Lowercased letters and digits only, for spotting the same note posted twice. */
export function fingerprint(s: string) {
  return s.toLowerCase().normalize("NFKD").replace(/[^\p{L}\p{N}]/gu, "");
}
