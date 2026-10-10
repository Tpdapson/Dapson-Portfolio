// Everything editable on the home page lives here.
// TODO(Timi): fill in the social links still marked "#".

export const links = {
  bookCall: "https://calendly.com/tp_dapson/30min",
  email: "mailto:petertimmy8@gmail.com",
  resume: "https://drive.google.com/file/d/1fW6aFax2e0h83tb7hsAvqiB1I1Ah-_gd/view?usp=drivesdk",
  playground: "#",
  digitalclan: "#", // TODO(Timi): DigitalClan live website URL
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
  /** Case-study page, or the live site for projects without one. */
  href: string;
  /** Links to the live site instead of a case study. */
  website?: boolean;
  /** Background behind the cover while it loads. */
  tone?: string;
};

export const works: Work[] = [
  { slug: "hellome-travel", name: "HelloMe Travel", tagline: "Flights, hotels and tours in one app", href: "/work/hellome-travel", cover: "/images/work-hellome-travel.jpg" },
  { slug: "spendive", name: "Spendive", tagline: "Spend and procurement management for growing teams", href: "/work/spendive", cover: "/images/work-spendive.jpg" },
  { slug: "freshline", name: "FreshLine", tagline: "Agri supply chain, from farm gate to buyer", href: "/work/freshline", cover: "/images/work-freshline.jpg" },
  { slug: "digitalclan", name: "DigitalClan", tagline: "All in one digital agency for startups", href: links.digitalclan, website: true, cover: "/images/work-digitalclan.jpg" },
  { slug: "soulsync", name: "SoulSync", tagline: "AI-assisted mental wellness app", href: "/work/soulsync", cover: "/images/work-soulsync.jpg" },
  { slug: "hellome-money", name: "HelloMe Money", tagline: "Modern fintech app for swift money transfers", href: "/work/hellome-money", cover: "/images/work-hellome-money.jpg" },
  { slug: "fundora", name: "Fundora", tagline: "Trade finance for African importers", href: "/work/fundora", cover: "/images/work-fundora.jpg" },
  { slug: "cargotrace", name: "CargoTrace", tagline: "Freight tracking for Nigerian importers", href: "/work/cargotrace", cover: "/images/work-cargotrace.jpg", tone: "#e8edf3" },
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
    quote:
      "Timi designed both the UX and UI for our website at Digitalclan, and I was thoroughly impressed. He turned our needs into intuitive, user-friendly designs with real attention to details. Communication was smooth, deadlines were met, and quality never dropped. Highly recommended!",
    name: "Jide Ladipo",
    role: "Founder, Digital Clan",
    side: "left",
    bubble: "#edbbf7",
    text: "#503357",
    avatar: "/images/avatar-jide.png",
  },
  {
    quote:
      "I wholeheartedly recommend Timilehin for any role or project that needs a thoughtful, reliable team member. He is patient, diligent, and always listens and understands before taking action. It's rare to find someone who pairs technical skill with such a humble, open-minded attitude.",
    name: "Oke Micheal",
    role: "CTO, Spendive",
    side: "right",
    bubble: "#e2e57f",
    text: "#41450d",
    avatar: "/images/avatar-oke.png",
  },
  {
    quote:
      "Timmy is good. He brings a really good attitude to the work, and the quality of what he delivers is consistently good too. Really great to work with.",
    name: "David Hanby",
    role: "Director, Minutes Master",
    side: "left",
    bubble: "#f6c892",
    text: "#4c3015",
    avatar: "/images/avatar-david.png",
  },
  {
    quote:
      "I really enjoyed working with Dapson. He was intentional with his work, communicated clearly, and made the whole process smooth from start to finish. He took feedback well and understood both the brief and the bigger picture. I'd happily work with him again.",
    name: "Kenechuckwu Anyaeche",
    role: "Product Designer, Wiseki Technologies",
    side: "right",
    bubble: "#b1e59e",
    text: "#1e4a10",
    avatar: "/images/avatar-kenechukwu.png",
  },
];

/** Props for links that leave the site. */
export function external(href: string) {
  return href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {};
}
