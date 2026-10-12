"use client";

import { useState, type FormEvent } from "react";
import { noteColors, type Note } from "@/lib/notes/types";

const KEY = "notes-admin-key";

export function NotesAdmin() {
  const [key, setKey] = useState("");
  const [notes, setNotes] = useState<Note[] | null>(null);
  const [persistent, setPersistent] = useState(true);
  const [error, setError] = useState("");

  const load = async (k: string) => {
    setError("");
    const res = await fetch("/api/notes/admin", { headers: { "x-admin-key": k }, cache: "no-store" });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error ?? "Couldn't load notes.");
      return;
    }
    try {
      sessionStorage.setItem(KEY, k);
    } catch {}
    setNotes(data.notes);
    setPersistent(data.persistent);
  };

  const signIn = (e: FormEvent) => {
    e.preventDefault();
    void load(key);
  };

  const remove = async (id: string) => {
    if (!confirm("Remove this note from the board?")) return;
    const res = await fetch(`/api/notes?id=${encodeURIComponent(id)}`, { method: "DELETE", headers: { "x-admin-key": key } });
    if (res.ok) setNotes((n) => n?.filter((m) => m.id !== id) ?? null);
    else setError((await res.json()).error ?? "Couldn't remove it.");
  };

  return (
    <main className="mx-auto min-h-[70vh] max-w-[880px] px-4 py-16 sm:px-10">
      <h1 className="text-4xl font-medium tracking-[-0.03em] text-title">Pinned notes</h1>

      {notes === null ? (
        <form onSubmit={signIn} className="mt-8 flex max-w-[420px] flex-col gap-3">
          <label htmlFor="key" className="text-sm text-body">
            Admin key (NOTES_ADMIN_KEY)
          </label>
          <input
            id="key"
            type="password"
            value={key}
            onFocus={() => {
              if (key) return;
              try {
                setKey(sessionStorage.getItem(KEY) ?? "");
              } catch {}
            }}
            onChange={(e) => setKey(e.target.value)}
            className="rounded-[12px] bg-field px-4 py-3 text-ink outline-none focus-visible:ring-2 focus-visible:ring-ink-3"
          />
          <button type="submit" className="cursor-pointer self-start rounded-full bg-ink-2 px-5 py-3 text-sm font-medium text-on-ink">
            Show notes
          </button>
        </form>
      ) : (
        <>
          <p className="mt-3 text-sm text-body">
            {notes.length} note{notes.length === 1 ? "" : "s"}, newest first.
            {!persistent && " Storage isn't connected, so these live in memory and reset when the server restarts."}
          </p>
          <ul className="mt-8 flex flex-col gap-3">
            {notes.map((n) => (
              <li key={n.id} className="flex items-start gap-4 rounded-[14px] border border-hairline p-4">
                <span className="mt-1 size-4 shrink-0 rounded-full" style={{ background: noteColors[n.color]?.paper }} />
                <div className="min-w-0 flex-1">
                  <p className="text-ink [overflow-wrap:anywhere]">{n.text}</p>
                  <p className="mt-1 text-[13px] text-subtle">
                    {n.name || "Anonymous"} · {new Date(n.createdAt).toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => remove(n.id)}
                  className="shrink-0 cursor-pointer rounded-full border border-hairline px-3 py-1.5 text-[13px] text-ink hover:bg-surface"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
      {error && <p className="mt-4 text-sm text-[#c2410c]">{error}</p>}
    </main>
  );
}
