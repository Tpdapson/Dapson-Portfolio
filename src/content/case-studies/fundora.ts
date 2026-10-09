import { heroFor, imageFor, type CaseStudy } from "./types";

const slug = "fundora";
const img = imageFor(slug);

export const fundora: CaseStudy = {
  slug,
  name: "Fundora",
  tagline: "Trade finance for businesses buying across borders",
  cardTagline: "Trade finance for businesses buying across borders",
  accent: "#036bdd",
  tint: "#eef5fe",
  hero: heroFor(slug, "98:41608", "Fundora repayments dashboard over a container port"),
  overview: {
    body: "Fundora helps importers finance international purchases. A business can request funding for a supplier invoice, get an eligibility decision, upload documents, sign the offer and track disbursement and repayments, all in one web app. I designed the MVP end to end, from auth and onboarding to the full $250k request flow, repayments, risk, trade tools and account settings.",
    meta: [
      ["Role", "Product Designer, end to end"],
      ["Type", "Web app · B2B fintech"],
      ["Industry", "Trade finance"],
      ["Year", "2026"],
      ["Scope", "UX, UI, design system, dark mode"],
      ["Status", "Concept MVP"],
    ],
  },
  blocks: [
    {
      type: "centered",
      heading: "The challenge",
      body: "Nigerian SMEs that import goods often have to pay suppliers before they can sell. Traditional trade finance means weeks of paperwork, branch visits and opaque decisions, while FX swings eat into margins. Fundora needed to make a $250k financing request feel as clear as a checkout, and keep businesses confident about what they owe and when.",
    },
    img("98:41643", 1376, 860, "Fundora dashboard"),
    {
      type: "split",
      heading: "The solution",
      body: ["A web app that turns trade finance into a guided, transparent flow, from the first request to the final repayment."],
      points: [
        "A four-step request: purchase details, eligibility, documents, review",
        "A live eligibility check that returns a clear limit, not a vague “pending”",
        "An approval tracker, e-signature and disbursement straight to the supplier",
        "Repayment schedules, autopay and a risk status businesses can act on",
      ],
    },
    {
      type: "split",
      heading: "Onboarding & bank connection",
      body: ["Business profile, ownership documents and bank connection come in four short steps, with progress saved automatically."],
      points: [
        "Connecting a bank reads 12 months of transactions to size the trade limit, with a clear “what we can see / what we can never do” panel to build trust.",
        "A relationship manager card offers a call or chat at the exact moment people tend to get stuck.",
        "“Limit approved” closes the loop with a real number instead of a waiting state.",
      ],
    },
    img("104:53606", 1376, 460, "Sign-in and business profile"),
    img("98:41685", 1376, 800, "Bank connection"),
    img("98:41688", 1376, 460, "Limit approved"),
    {
      type: "split",
      heading: "Facilities & credit limit",
      body: ["Every active facility shows what was borrowed, what is left and what is due next, so finance teams can plan cash with confidence."],
      points: [
        "Facility detail combines instalments, documents and supplier in one view.",
        "The credit-limit overview shows how much is available, what is drawing on it and the history of limit changes.",
      ],
    },
    img("98:41707", 1376, 800, "Facility detail"),
    img("98:41710", 1376, 460, "Credit limit overview"),
    {
      type: "split",
      heading: "The $250k request, from start to payout",
      body: ["The core flow takes a supplier invoice to disbursement in a sequence that always shows where you are and what happens next."],
      points: [
        "The first step asks only for purchase details: amount, supplier and goods.",
        "Eligibility runs live, with a clear result before any documents are requested.",
        "After submission, an approval tracker and disbursement confirmation replace back-and-forth emails.",
      ],
    },
    img("98:41733", 1376, 800, "Purchase details step"),
    img("98:41736", 1376, 460, "Eligibility and documents"),
    img("104:54430", 1376, 800, "Review and e-signature"),
    img("98:41741", 1376, 460, "Approval tracker and disbursement"),
    {
      type: "split",
      heading: "Repayments, risk status & documents",
      body: [
        "Repayment is where trust is won or lost, so upcoming instalments, autopay and payment options are always one click away, and every document behind a facility lives in one place.",
      ],
      points: [
        "A calendar and an upcoming-by-month chart make cash planning visual.",
        "Making a repayment opens in a side panel, so context is never lost.",
        "Risk status explains the score in plain language, with clear ways to improve it.",
        "A central document library keeps invoices, contracts and KYC files organised by facility, with clear status for anything pending or expiring.",
      ],
    },
    img("98:41764", 1376, 800, "Repayments"),
    img("98:41767", 1376, 460, "Repayment panel and risk status"),
    img("104:54488", 1376, 460, "Document library"),
    {
      type: "split",
      heading: "Suppliers & shipments",
      body: [
        "Financing is only as good as the trade behind it, so suppliers and shipments live inside Fundora, right next to the money that pays for them.",
      ],
      points: [
        "The supplier directory shows verification status, country and total financed for every supplier at a glance.",
        "Supplier detail brings bank details, past facilities and documents into one profile.",
        "Adding a supplier runs bank verification in a side panel, reducing fraud before any money moves.",
        "Shipments track each order from departure to arrival, with milestones and documents tied to the facility that funded it.",
      ],
    },
    img("108:43636", 1376, 800, "Supplier directory"),
    img("108:43639", 1376, 460, "Supplier detail and verification"),
    img("108:43644", 1376, 460, "Shipments"),
    {
      type: "split",
      heading: "Settings & help",
      body: ["Account settings and support are built for finance teams that share responsibility, so control and help are always close by."],
      points: [
        "Team & permissions lets owners invite colleagues and assign roles, so approvals and payments stay with the right people.",
        "Bank accounts & autopay keep repayment sources and schedules in one place.",
        "Security settings cover two-factor authentication, active sessions and login activity.",
        "Help & support offers guides and a ticketing flow, so every issue has a clear status and history.",
      ],
    },
    img("108:43684", 1376, 800, "Team and permissions"),
    img("108:43687", 1376, 460, "Bank accounts and security"),
    img("108:43692", 1376, 460, "Help and support"),
    {
      type: "split",
      heading: "Dark mode, built into the system",
      body: [
        "Fundora’s design system is token-based, so every surface, text and status colour has a dark-mode counterpart. Switching themes is a token swap, not a redesign.",
      ],
      points: [
        "Semantic tokens for surfaces, text, borders and status colours map to light and dark values, keeping contrast accessible in both themes.",
        "Charts, status pills and highlight cards were tuned so data stays readable on dark surfaces.",
        "Key screens, including the dashboard, facilities and repayments, were previewed in dark mode to prove the system scales.",
      ],
    },
    img("109:53619", 1376, 800, "Dark mode dashboard"),
    img("109:53622", 1376, 460, "Dark mode facilities and repayments"),
    {
      type: "split",
      heading: "The outcome",
      body: [
        "Fundora was delivered as a complete web MVP: auth and onboarding, dashboard and facilities, the full request-to-disbursement flow, documents, repayments, risk status, credit limit, trade tools, account settings and a dark-mode preview, all built on one consistent design system.",
      ],
    },
  ],
  more: ["spendive", "cargotrace"],
};
