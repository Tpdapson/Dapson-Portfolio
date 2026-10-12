import { connection } from "next/server";
import { checkNote, fingerprint } from "@/lib/notes/moderate";
import { addNote, deleteNote, listNotes, rateLimit } from "@/lib/notes/store";
import { colorNames, type NoteColor } from "@/lib/notes/types";

/** Latest notes for the board. */
export async function GET() {
  await connection();
  const notes = await listNotes(12);
  return Response.json({ notes }, { headers: { "Cache-Control": "no-store" } });
}

/** Pin a new note: filtered, rate limited, then live straight away. */
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return fail("Something went wrong. Please try again.");
  }

  // Honeypot: a field people never see. Bots fill it in; pretend it worked.
  if (typeof body.website === "string" && body.website !== "") {
    return Response.json({ note: null });
  }

  const checked = checkNote(body.text, body.name);
  if (!checked.ok) return fail(checked.error);

  const color: NoteColor = colorNames.includes(body.color as NoteColor) ? (body.color as NoteColor) : "pink";

  // The same words pinned again recently.
  const print = fingerprint(checked.text);
  const recent = await listNotes(50);
  if (recent.some((n) => fingerprint(n.text) === print)) {
    return fail("That note is already on the board.");
  }

  const ip = (request.headers.get("x-forwarded-for")?.split(",")[0] ?? request.headers.get("x-real-ip") ?? "unknown").trim();
  const limit = await rateLimit(ip);
  if (limit === "slow-down") return fail("You just pinned one. Give it a few seconds.", 429);
  if (limit === "daily") return fail("That's plenty of notes for today. Thank you!", 429);

  const note = await addNote({ text: checked.text, name: checked.name, color });
  return Response.json({ note }, { status: 201 });
}

/** Remove a note. Needs the NOTES_ADMIN_KEY secret (used by /notes/admin). */
export async function DELETE(request: Request) {
  const key = process.env.NOTES_ADMIN_KEY;
  if (!key || request.headers.get("x-admin-key") !== key) return fail("Not allowed.", 401);
  const id = new URL(request.url).searchParams.get("id");
  if (!id) return fail("Missing note id.");
  const removed = await deleteNote(id);
  return removed ? Response.json({ ok: true }) : fail("Note not found.", 404);
}

function fail(error: string, status = 400) {
  return Response.json({ error }, { status });
}
