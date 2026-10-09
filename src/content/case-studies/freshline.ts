import { heroFor, imageFor, type CaseStudy } from "./types";

const slug = "freshline";
const img = imageFor(slug);

export const freshline: CaseStudy = {
  slug,
  name: "FreshLine",
  tagline: "Farm produce, moving on time: a supply chain app for Nigerian agri-aggregators",
  cardTagline: "Agri supply chain, from farm gate to buyer",
  accent: "#1f7a4d",
  tint: "#e8f1ea",
  hero: heroFor(slug, "91:41104", "FreshLine app screens over farmland"),
  overview: {
    body: "FreshLine helps aggregators see what produce is ready to move, book cold transport, inspect quality and get paid when goods land, all from one app. I designed the MVP end to end: product thinking, flows, a lean design system, 25 core screens, the landing page, App Store screenshots and launch content.",
    meta: [
      ["Role", "Product Designer, end to end"],
      ["Type", "Mobile app · B2B"],
      ["Industry", "Agritech · Supply chain"],
      ["Year", "2026"],
      ["Scope", "UX, UI, design system, landing page"],
      ["Status", "Concept MVP"],
    ],
  },
  blocks: [
    img("142:44565", 1376, 709, "FreshLine feature screens"),
    {
      type: "centered",
      heading: "The challenge",
      body: "Fresh produce in Nigeria loses value by the hour. Aggregators juggle calls to farmers, transporters and buyers; prices change constantly, quality is disputed at delivery, and payments arrive late or not at all. Every delay is literally food going to waste. FreshLine had to make the whole chain visible, fast and trustworthy, on phones that are often mid-range and on patchy connections.",
    },
    {
      type: "split",
      heading: "The solution",
      subheading: "One app from farm gate to payout",
      body: [
        "FreshLine turns a chain of phone calls into a clear, trackable flow, built around the three questions aggregators ask every day: what is ready, where is it, and when do I get paid?",
      ],
      points: [
        "Live lots from verified producers, graded and priced before you commit",
        "Cold-van booking with a live route, temperature and ETA",
        "Quality inspection records that every party can see",
        "Escrow payments released when delivery is confirmed",
      ],
    },
    {
      type: "split",
      heading: "Onboarding",
      body: ["Three short screens explain the promise in the aggregator’s own language before asking for anything."],
      points: [
        "Each screen leads with a real moment: see what’s ready, move it before it wilts, get paid when it lands.",
        "Status chips on the photos (Grade A, 5.8°C, Escrow released) preview the product before sign-up.",
        "Continue with Email or Google keeps the barrier low.",
      ],
    },
    img("131:57029", 1376, 709, "Splash and onboarding screens"),
    {
      type: "split",
      heading: "Account & business setup",
      body: ["Many aggregators run their business from one phone, so setup is short, forgiving and verifies what matters for payouts."],
      points: [
        "Phone verification instead of passwords-first, because that’s how people already identify themselves.",
        "Business setup and payout account are separated, so people can explore before adding bank details.",
        "A first-run overview and empty states explain what to do next instead of showing blank screens.",
      ],
    },
    img("131:57057", 1376, 753, "Phone verification, business setup and payout account"),
    img("131:57070", 1376, 840, "First-run overview and empty states"),
    {
      type: "split",
      heading: "Overview & inventory",
      body: ["The home screen leads with kilograms ready to move, pending payouts and this week’s pipeline, then recent activity."],
      points: [
        "Inventory lists graded produce by producer, price per kg and distance, so comparing lots takes seconds.",
        "Producer profiles build trust with history and verification before booking.",
        "Large tap targets and high-contrast numbers work on mid-range phones in daylight.",
      ],
    },
    img("131:57081", 1376, 840, "Overview and inventory"),
    img("131:57092", 1376, 753, "Producer profile and account"),
    {
      type: "split",
      heading: "Shipments & tracking",
      body: ["Booking a cold van takes four steps, then tracking shows the route, temperature, ETA and checkpoints from pickup to inspection."],
      points: [
        "A review step summarises cost, pickup, drop-off and timing before committing.",
        "The booked confirmation states what happens next and who the driver is.",
        "Tracking shows checkpoints (picked up, quality sealed, in transit) with the driver one tap away.",
      ],
    },
    img("131:57101", 1376, 840, "New shipment and review"),
    img("131:57112", 1376, 753, "Booked confirmation, live tracking and shipments"),
    {
      type: "split",
      heading: "Inspection & payments",
      body: ["Disputes happen at delivery, so FreshLine makes quality and money visible to everyone involved."],
      points: [
        "Quality inspection captures grade, weight and photos at the warehouse, creating a shared record.",
        "Payment status shows escrow, release and payout stages in plain language: nobody chases anybody.",
        "Payment detail breaks down every charge, so the final number is never a surprise.",
      ],
    },
    img("131:57125", 1376, 840, "Warehouse storage and quality inspection"),
    img("131:57136", 1376, 753, "Payment status and detail"),
    {
      type: "split",
      heading: "App Store screenshots",
      body: [
        "Store screenshots were designed as part of the product, not an afterthought: one benefit per frame, real UI, and copy written for the person deciding whether to install.",
      ],
    },
    img("91:41348", 1376, 800, "FreshLine App Store screenshots"),
    {
      type: "split",
      heading: "The outcome",
      body: [
        "FreshLine was delivered as a complete, portfolio-ready MVP: 25 core screens, a lean design system, a nine-section landing page, App Store screenshots and launch content. It also became a before/after study, comparing a deliberately generic “AI draft” against the final, human-directed design to show what intentional product decisions add.",
      ],
    },
    img("91:41357", 1376, 800, "FreshLine closing image"),
  ],
  more: ["cargotrace", "soulsync"],
};
