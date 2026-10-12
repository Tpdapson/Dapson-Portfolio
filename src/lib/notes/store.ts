import { createHash, randomUUID } from "node:crypto";
import { Redis } from "@upstash/redis";
import type { Note } from "./types";

/**
 * Where notes live. In production this is an Upstash Redis database (add it
 * from Vercel → Storage → Upstash for Redis and the env vars below are set for
 * you). Without those env vars, e.g. when running locally, notes are kept in
 * memory and vanish when the server restarts.
 */

const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;
const redis = url && token ? new Redis({ url, token }) : null;

export const persistent = redis !== null;

const LIST = "notes:list";
/** Older notes drop off the end beyond this many. */
const KEEP = 300;

// In-memory fallback, shared across hot reloads in dev.
type Memory = { notes: Note[]; hits: Map<string, number[]> };
const g = globalThis as unknown as { __notes?: Memory };
const memory: Memory = (g.__notes ??= { notes: [], hits: new Map() });

export async function listNotes(limit: number): Promise<Note[]> {
  if (!redis) return memory.notes.slice(0, limit);
  const rows = await redis.lrange<Note>(LIST, 0, limit - 1);
  return rows.filter((n) => n && typeof n.id === "string");
}

export async function addNote(input: Omit<Note, "id" | "createdAt">): Promise<Note> {
  const note: Note = { id: randomUUID(), createdAt: Date.now(), ...input };
  if (!redis) {
    memory.notes.unshift(note);
    memory.notes.length = Math.min(memory.notes.length, KEEP);
    return note;
  }
  await redis.pipeline().lpush(LIST, JSON.stringify(note)).ltrim(LIST, 0, KEEP - 1).exec();
  return note;
}

export async function deleteNote(id: string): Promise<boolean> {
  if (!redis) {
    const i = memory.notes.findIndex((n) => n.id === id);
    if (i >= 0) memory.notes.splice(i, 1);
    return i >= 0;
  }
  // Redis removes list items by exact value. Notes are stored as
  // JSON.stringify(note), and parsing keeps key order, so re-stringifying a
  // stored note gives back the exact stored value.
  const all = await redis.lrange<Note>(LIST, 0, -1);
  const match = all.find((n) => n?.id === id);
  if (!match) return false;
  return (await redis.lrem(LIST, 1, JSON.stringify(match))) > 0;
}

/**
 * Per-visitor limits: one note every 30 seconds and five a day. Visitors are
 * told apart by a salted hash of their IP; the IP itself is never stored.
 */
export async function rateLimit(ip: string): Promise<"ok" | "slow-down" | "daily"> {
  const who = createHash("sha256").update(`${process.env.NOTES_SALT ?? "dapson-notes"}:${ip}`).digest("hex").slice(0, 32);
  if (!redis) {
    const now = Date.now();
    const hits = (memory.hits.get(who) ?? []).filter((t) => now - t < 86_400_000);
    if (hits.length && now - hits[hits.length - 1] < 30_000) return "slow-down";
    if (hits.length >= 5) return "daily";
    memory.hits.set(who, [...hits, now]);
    return "ok";
  }
  const recent = await redis.set(`notes:rl:${who}`, 1, { nx: true, ex: 30 });
  if (recent === null) return "slow-down";
  const day = await redis.incr(`notes:day:${who}`);
  if (day === 1) await redis.expire(`notes:day:${who}`, 86_400);
  return day > 5 ? "daily" : "ok";
}
