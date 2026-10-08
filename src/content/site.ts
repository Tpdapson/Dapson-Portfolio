// Everything editable on the home page lives here.
// TODO(Timi): fill in the social links still marked "#".

export const links = {
  bookCall: "https://calendly.com/tp_dapson/30min",
  email: "mailto:petertimmy8@gmail.com",
  resume: "https://drive.google.com/file/d/1fW6aFax2e0h83tb7hsAvqiB1I1Ah-_gd/view?usp=drivesdk",
  playground: "#",
  socials: {
    whatsapp: "#",
    x: "#",
    behance: "#",
    linkedin: "#",
  },
};

export type Work = {
  slug: string;
  name: string;
  tagline: string;
  cover: string;
  /** Background behind the cover while it loads. */
  tone?: string;
};

export const works: Work[] = [
  { slug: "hellome-travel", name: "HelloMe Travel", tagline: "Flights, hotels and tours in one app", cover: "/images/work-hellome-travel.png" },
  { slug: "spendive", name: "Spendive", tagline: "Spend and procurement management for growing teams", cover: "/images/work-spendive.png" },
  { slug: "freshline", name: "FreshLine", tagline: "Agri supply chain, from farm gate to buyer", cover: "/images/work-freshline.png" },
  { slug: "digitalclan", name: "DigitalClan", tagline: "All in one digital agency for startups", cover: "/images/work-digitalclan.png" },
  { slug: "soulsync", name: "SoulSync", tagline: "AI-assisted mental wellness app", cover: "/images/work-soulsync.png" },
  { slug: "hellome-money", name: "HelloMe Money", tagline: "Modern fintech app for swift money transfers", cover: "/images/work-hellome-money.png" },
  { slug: "fundora", name: "Fundora", tagline: "Trade finance for African importers", cover: "/images/work-fundora.png" },
  { slug: "cargotrace", name: "CargoTrace", tagline: "Freight tracking for Nigerian importers", cover: "/images/work-cargotrace.png", tone: "#e8edf3" },
  { slug: "andiesplace", name: "AndiesPlace", tagline: "Digital AI academy all in one place", cover: "/images/work-andiesplace.png" },
];

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  side: "left" | "right";
  bubble: string;
  text: string;
  avatar?: string;
  initials?: string;
};

export const testimonials: Testimonial[] = [
  {
    quote: "I recommend Timmy, a designer who played a significant role in shaping our product and our design culture.",
    name: "Jide Ladipo",
    role: "Founder, Digital Clan",
    side: "left",
    bubble: "#edbbf7",
    text: "#684270",
    initials: "JL",
  },
  {
    quote:
      "I had a great experience working with Timmy. He has a strong understanding of UI principles and his contributions were key in helping us hit our launch goals and deliver a better experience for our users.",
    name: "Kenechuckwu",
    role: "Product Designer, Andies Place",
    side: "right",
    bubble: "#e2e57f",
    text: "#494d0e",
    avatar: "/images/avatar-kenechukwu.png",
  },
  {
    quote: "Timmy’s product design insights are super amazing. I learnt a lot from him and will always appreciate working alongside him.",
    name: "Oke Micheal",
    role: "CTO, Spendive",
    side: "left",
    bubble: "#af92f6",
    text: "#2b1a5c",
    avatar: "/images/avatar-oke.png",
  },
  {
    quote: "Timmy is one of the most detail-oriented designers I’ve met. His attention to craft and prioritisation of user experience are unmatched.",
    name: "David Hanby",
    role: "CTO, Minutes Master",
    side: "right",
    bubble: "#9edf86",
    text: "#1e4a10",
    // Figma reuses Timi's photo here as a placeholder; swap in David's photo when you have it.
    initials: "DH",
  },
];

/** Props for links that leave the site. */
export function external(href: string) {
  return href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {};
}
