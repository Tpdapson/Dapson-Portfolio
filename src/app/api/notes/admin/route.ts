import { connection } from "next/server";
import { listNotes, persistent } from "@/lib/notes/store";

/** Every stored note, newest first, for /notes/admin. Needs NOTES_ADMIN_KEY. */
export async function GET(request: Request) {
  await connection();
  const key = process.env.NOTES_ADMIN_KEY;
  if (!key) return Response.json({ error: "Set NOTES_ADMIN_KEY in the environment first." }, { status: 503 });
  if (request.headers.get("x-admin-key") !== key) return Response.json({ error: "Wrong key." }, { status: 401 });
  const notes = await listNotes(300);
  return Response.json({ notes, persistent }, { headers: { "Cache-Control": "no-store" } });
}
