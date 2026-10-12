import type { Metadata } from "next";
import { NotesAdmin } from "./notes-admin";

export const metadata: Metadata = { title: "Notes admin", robots: { index: false, follow: false } };

/** Private page for removing notes from the board. Needs NOTES_ADMIN_KEY. */
export default function Page() {
  return <NotesAdmin />;
}
