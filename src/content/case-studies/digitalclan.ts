import { links } from "@/content/site";
import { heroFor, imageFor, pairFor, type CaseStudy } from "./types";

const slug = "digitalclan";
const img = imageFor(slug);
const pair = pairFor(slug);

export const digitalclan: CaseStudy = {
  slug,
  name: "DigitalClan",
  tagline: "Website design for an AI-first creative agency",
  heroCta: { label: "Visit live website", href: links.digitalclan },
  accent: "#d6aa00",
  tint: "#fdf7dc",
  hero: heroFor(slug, "261:59669", "DigitalClan website: home page hero, works, testimonials and the giant wordmark"),
  overview: {
    body: "DigitalClan is an AI-first agency where strategy, design and code come together to help businesses build intelligent systems. I designed their website end to end: a bold, editorial experience across the home, about, case studies and blog pages, in both dark and light mode, with a fully responsive mobile version. The site is now live.",
    cta: { label: "View website", href: links.digitalclan },
    meta: [
      ["Role", "Web Designer"],
      ["Type", "Website · Creative & AI agency"],
      ["Themes", "Dark & light mode"],
      ["Year", "2025"],
    ],
  },
  blocks: [
    {
      type: "centered",
      heading: "The challenge",
      body: "DigitalClan needed a website that felt as bold and intelligent as the brands they build. It had to explain an AI-first offer without sounding cold, prove results through real work and client voices, and give visitors a clear reason to start a conversation, all while working just as well in dark and light mode, on any screen.",
    },
    img("261:62688", 1376, 875, "DigitalClan home page hero: “Strategy, so you move with purpose”"),
    {
      type: "split",
      heading: "The goal",
      body: ["The website had to do more than look good. It needed to position DigitalClan clearly and turn visitors into conversations."],
      points: [
        "Position DigitalClan as an AI-first creative partner, not just another web agency.",
        "Make services, process and work easy to scan, so the offer is clear in seconds.",
        "Build trust with selected work, stats and client testimonials.",
        "Turn interest into action with clear “Get in touch” moments throughout.",
      ],
    },
    img("261:65549", 1376, 900, "What We Do: six numbered services from research and strategy to AI-powered solutions"),
    {
      type: "split",
      heading: "Design direction",
      body: [
        "An editorial, confident look with lots of contrast. Oversized type and a giant wordmark give the brand real presence, while a restrained palette lets one bright accent do the heavy lifting. Real photography and image-led case studies keep it human and balance the AI-first story.",
      ],
      points: [
        "Dark mode leads, with near-black surfaces that make the yellow accent glow.",
        "Light mode mirrors every page, so the brand works in any context.",
        "A strict grid, generous spacing and numbered sections make long pages easy to follow.",
      ],
    },
    {
      type: "split",
      heading: "Colour",
      body: [
        "A near-black base, crisp white and one signal yellow. Yellow is reserved for emphasis (key words in headlines, primary buttons and section labels) so the eye always knows where to go. A deep navy adds depth to dark surfaces.",
      ],
    },
    pair("224:22080", 560, "DigitalClan wordmark and colour palette: Signal Yellow, Midnight, Carbon, Deep Navy, Slate and White"),
    {
      type: "split",
      heading: "Typography",
      body: [
        "Plus Jakarta Sans gives headlines a geometric, modern confidence that scales from the giant wordmark down to section titles. DM Sans and Manrope handle body copy and UI details, keeping long pages comfortable to read.",
      ],
    },
    img("224:22110", 1376, 620, "Plus Jakarta Sans type specimen with DM Sans and Manrope for body and UI"),
    {
      type: "split",
      heading: "Home page",
      body: [
        "The home page tells the story in order: a bold hero, who they are, how they work, what they do, selected work, client voices and the latest thinking, ending with a giant wordmark footer.",
      ],
    },
    img("261:69556", 1376, 900, "Home page sections: who we are and our works"),
    pair("261:72046", 560, "Client testimonials and the dark home page hero"),
    img("261:70164", 1376, 1253, "The latest thinking and the giant wordmark footer"),
    {
      type: "split",
      heading: "Light mode",
      body: [
        "Every page has a light-mode twin built from the same grid and components. Switching themes changes the surface, not the structure, so the brand feels consistent in any setting.",
      ],
    },
    img("224:22149", 1376, 860, "A blog article page in light mode"),
    pair("224:22151", 560, "Client voices, latest thinking and how they work, in light mode"),
    {
      type: "split",
      heading: "About",
      body: ["The about page talks more about the agency and introduces the team and their story."],
    },
    img("261:73270", 1376, 860, "About page hero: “We help organisations think smarter”"),
    pair("224:22163", 560, "Who we are and meet the team"),
    img("224:22169", 1376, 860, "Case studies page"),
    pair("224:22171", 560, "Case study pages in light and dark mode"),
    img("224:22194", 1376, 1000, "A blog article page in dark mode"),
    pair("260:22077", 620, "Contact page in dark and light mode"),
    {
      type: "split",
      heading: "The outcome",
      body: [
        "The new website is live. It gives DigitalClan a confident, distinctive presence that explains their AI-first offer clearly, shows their work at its best and makes it easy for the right clients to get in touch, in dark or light mode, on any screen.",
      ],
      link: { label: "View live website ↗", href: links.digitalclan },
    },
  ],
  // Web design: square image corners, and side-by-side images stack on phones.
  squareImages: true,
  more: ["spendive", "hellome-travel"],
};
