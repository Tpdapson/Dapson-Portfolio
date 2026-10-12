import type { Note } from "@/lib/notes/types";

/**
 * The example notes from the Figma board. They fill any empty spots until
 * enough real notes have been pinned, newest real notes first. Set
 * `showSampleNotes` to false to only ever show real notes.
 */
export const showSampleNotes = true;

export const sampleNotes: Note[] = [
  { id: "sample-1", text: "Your portfolio is so clean!", name: "Adaobi, Lagos", color: "pink", createdAt: 0 },
  { id: "sample-2", text: "The toggle in the nav 🔥", name: "Sam, London", color: "green", createdAt: 0 },
  { id: "sample-3", text: "Love the SoulSync case study", name: "Marc, Berlin", color: "yellow", createdAt: 0 },
  { id: "sample-4", text: "teach me your ways sir", name: "Dayo", color: "orange", createdAt: 0 },
  { id: "sample-5", text: "hire this man, he is good!", name: "Sam", color: "orange", createdAt: 0 },
  { id: "sample-6", text: "Saw this on X, worth the click", name: "Kemi", color: "blue", createdAt: 0 },
  { id: "sample-7", text: "hi from Nairobi 👋", name: "Wanjiru", color: "yellow", createdAt: 0 },
];
