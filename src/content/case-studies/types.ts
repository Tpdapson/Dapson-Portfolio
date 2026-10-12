export type Img = { src: string; w: number; h: number; alt: string };

export type Block =
  /** Full-width image (mockup panels, split panels, feature shots). */
  | ({ type: "image"; caption?: string } & Img)
  /** Two panels side by side (stacked on phones for desktop-product case studies). Each opens on its own in the viewer. */
  | { type: "pair"; images: [Img, Img]; caption?: string }
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
  /** Optional button under the title, e.g. a link to the live website. */
  heroCta?: { label: string; href: string };
  /** Short line used on "More Works" cards. */
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
  /** Desktop products (web apps, dashboards): square image corners, and two-panel images stack on phones. */
  squareImages?: boolean;
  /** Slugs of the two projects suggested at the end; their cards come from `works` in content/site.ts. */
  more: [string, string];
};

export function imageFor(slug: string) {
  return (id: string, w: number, h: number, alt: string, caption?: string): Block => ({
    type: "image",
    src: `/case-studies/${slug}/${id.replace(":", "-")}.webp`,
    w,
    h,
    alt,
    caption,
  });
}

/**
 * Two-panel image from Figma (a frame holding two 676px-wide panels), exported
 * as two files: `<id>-1.webp` and `<id>-2.webp`.
 */
export function pairFor(slug: string) {
  return (id: string, h: number, alt: string, caption?: string): Block => {
    const base = `/case-studies/${slug}/${id.replace(":", "-")}`;
    return {
      type: "pair",
      images: [
        { src: `${base}-1.webp`, w: 676, h, alt: `${alt} (1 of 2)` },
        { src: `${base}-2.webp`, w: 676, h, alt: `${alt} (2 of 2)` },
      ],
      caption,
    };
  };
}

export function heroFor(slug: string, id: string, alt: string): Img {
  return { src: `/case-studies/${slug}/${id.replace(":", "-")}.webp`, w: 1376, h: 850, alt };
}
