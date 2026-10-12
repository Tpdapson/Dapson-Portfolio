/** Sticky-note colours from the Figma composer, in swatch order. */
export const noteColors = {
  pink: { paper: "#edbbf7", ink: "#503357" },
  yellow: { paper: "#e2e57f", ink: "#41450d" },
  orange: { paper: "#f6c892", ink: "#4c3015" },
  green: { paper: "#b1e59e", ink: "#1e4a10" },
  blue: { paper: "#a0d8f8", ink: "#153952" },
} as const;

export type NoteColor = keyof typeof noteColors;
export const colorNames = Object.keys(noteColors) as NoteColor[];

export type Note = {
  id: string;
  text: string;
  /** Empty when the visitor left their name out. */
  name: string;
  color: NoteColor;
  createdAt: number;
};

export const NOTE_MAX = 100;
export const NAME_MAX = 30;
