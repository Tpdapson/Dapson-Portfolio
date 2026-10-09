export type Img = { src: string; w: number; h: number; alt: string };

export type Block =
  /** Full-width image (mockup panels, split panels, feature shots). */
  | ({ type: "image"; caption?: string } & Img)
  /** Narrow centred text column, used for "The challenge". */
  | { type: "centered"; heading: string; body: string }
  /** Heading on the left, content on the right. Most text sections use this. */
  | {
      type: "split";
      eyebrow?: string;
      heading: string;
      subheading?: string;
      body?: string[];
      points?: string[];
      groups?: { title: string; points: string[] }[];
      findings?: { title: string; body: string }[];
      lessons?: { title: string; body: string }[];
      stats?: { value: string; label: string }[];
      link?: { label: string; href: string };
    }
  | { type: "palette"; swatches: { name: string; hex: string; text: string }[] };

export type CaseStudy = {
  slug: string;
  name: string;
  tagline: string;
  /** Short line used on "More Works" cards. */
  cardTagline: string;
  /** Bullet dots, finding numbers and links. */
  accent: string;
  /** Soft tint for lesson and stat cards. */
  tint: string;
  hero: Img;
  overview: {
    heading?: string;
    body: string;
    /** Left out until there's a real URL to point at. */
    cta?: { label: string; href: string };
    meta: [string, string][];
  };
  blocks: Block[];
  more: [string, string];
};

export function imageFor(slug: string) {
  return (id: string, w: number, h: number, alt: string, caption?: string): Block => ({
    type: "image",
    src: `/case-studies/${slug}/${id.replace(":", "-")}.jpg`,
    w,
    h,
    alt,
    caption,
  });
}

export function heroFor(slug: string, id: string, alt: string): Img {
  return { src: `/case-studies/${slug}/${id.replace(":", "-")}.jpg`, w: 1376, h: 850, alt };
}
