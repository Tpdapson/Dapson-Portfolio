import { heroFor, imageFor, type CaseStudy } from "./types";

const slug = "spendive";
const img = imageFor(slug);

export const spendive: CaseStudy = {
  slug,
  name: "Spendive",
  tagline: "Spend smarter, work faster, save bigger: spend & procurement management for growing teams",
  cardTagline: "Spend & procurement management for growing teams",
  accent: "#1a6bf0",
  tint: "#eef7fe",
  hero: heroFor(slug, "118:76378", "Spendive dashboard on a laptop"),
  overview: {
    body: "Spendive is a spend and procurement management platform for startups, SMEs and mid-sized companies. It brings procurement, reimbursements, approvals and vendor management into one place, giving finance teams structure, control and visibility over every naira spent. As the sole product designer, I led the web app and the marketing website, improving the visual design, UX and navigation to match the company’s new direction.",
    // TODO(Timi): add the live website URL to show the "View website ↗" button.
    meta: [
      ["Role", "Sole Product Designer"],
      ["Type", "Web app · B2B SaaS"],
      ["Industry", "Fintech · Procurement"],
      ["Deliverables", "Web app, website, mobile approvals"],
      ["Users", "Admins, employees, vendors"],
      ["Market", "Nigeria & Africa"],
    ],
  },
  blocks: [
    img("118:76393", 1376, 1000, "Spendive admin dashboard"),
    {
      type: "centered",
      heading: "The challenge",
      body: "Growing businesses manage procurement and expenses across spreadsheets, chats and slow manual approvals. The result is little visibility, weak policy compliance, delayed reimbursements and poor collaboration with vendors, which leads to budget overruns and operational drag. Spendive needed one platform that felt simple enough for any employee, yet powerful enough for finance teams.",
    },
    img("118:76397", 1376, 541, "Spendive brand mockups"),
    {
      type: "split",
      heading: "The solution",
      subheading: "One platform for the full spend lifecycle",
      body: ["Spendive automates spend from request to reconciliation, accessible on web and optimised for both finance professionals and non-technical employees."],
      points: [
        "Smart request-to-approval flows with multi-level approvers",
        "Spend visibility and forecasting across teams and departments",
        "Easy reimbursements with built-in policy checks",
        "Vendor engagement tools and a marketplace",
        "Built-in policy logic and audit trails for compliance",
      ],
    },
    {
      type: "split",
      heading: "Visual language",
      body: [
        "The refreshed brand leans on a bright, confident blue for trust and action, clean neutral surfaces for dense financial data, Figtree for friendly legibility and a consistent icon set across every module.",
      ],
    },
    img("90:41149", 1376, 750, "Spendive colours, type and icons"),
    {
      type: "split",
      heading: "Onboarding",
      body: ["Onboarding had to get a company from sign-up to a working account without a sales call."],
      points: [
        "Sign-up, profile completion and bank sync are split into short, focused steps with clear progress.",
        "Bank account sync comes last, once trust is established, so drop-off stays low.",
      ],
    },
    img("116:43151", 1376, 460, "Onboarding screens"),
    {
      type: "split",
      heading: "Admin & employee dashboards",
      body: [
        "Admins need an organisation-wide picture; employees just need to know where their requests stand. The two dashboards share one structure but surface different data.",
      ],
      points: [
        "Admins see total expenses, advances, reimbursements and travel requests, plus pending approvals, top vendors and top spenders.",
        "Employees get a personal request history covering cash, travel and reimbursements, with status at a glance.",
        "An important-notice bar keeps pending approvals one click away.",
      ],
    },
    img("116:43156", 1376, 460, "Admin and employee dashboards"),
    {
      type: "split",
      heading: "Spend controls",
      subheading: "Approval workflows that match how companies work",
      body: [
        "From settings, admins decide who approves what, for cards, payments, travel and reimbursements, with multiple approval layers and notifications at each step.",
      ],
      points: [
        "Each control is phrased as a plain question, like “Who needs to approve bills before they are paid?”",
        "At least one admin approval is enforced, with an inline explanation instead of a cryptic error.",
      ],
    },
    img("116:43164", 1376, 460, "Spend control settings"),
    {
      type: "split",
      heading: "Purchase, reimbursement & travel requests",
      body: [
        "Purchase, cash, reimbursement and travel requests share one consistent flow: create, attach proof, route for approval, track status. Learn it once and it works everywhere.",
      ],
      points: [
        "Users see only their own requests; admins and managers get an approval review tab.",
        "Status indicators appear at every approval stage after testing showed people lost track of where requests were.",
        "Forms were simplified after testing to reduce complexity and abandonment.",
      ],
    },
    img("116:43169", 1376, 800, "Request list and detail"),
    img("116:43172", 1376, 460, "Purchase request flow"),
    img("116:43177", 1376, 460, "Reimbursement request flow"),
    {
      type: "split",
      heading: "Travel requests",
      body: [
        "Travel is the most detailed request type, so the flow breaks it into clear, guided steps, from trip details through to cost estimate and review.",
      ],
      points: [
        "Trip details come first, so the rest of the form adapts to the journey.",
        "Costs build up as details are added, so there are no surprises at approval.",
        "Approvers see the full trip and cost breakdown on one screen before deciding.",
      ],
    },
    img("116:43203", 1376, 460, "Travel request steps"),
    img("116:43208", 1376, 460, "Travel request review"),
    {
      type: "split",
      heading: "Cards & wallet",
      body: ["Cards and the wallet give finance teams real-time control over company money, while employees always know what they can spend."],
      points: [
        "Approved reimbursements land straight in the user’s wallet.",
        "Cards show spend and limits at a glance, so admins can manage them without digging through statements.",
        "The wallet keeps balances, top-ups and transactions in one place.",
      ],
    },
    img("116:43216", 1376, 460, "Cards screens"),
    img("116:43221", 1376, 460, "Wallet screens"),
    {
      type: "split",
      heading: "Budgets",
      body: [
        "Company and department budgets show what was allocated, what has been spent and what is left, so overspending is visible before it happens.",
      ],
    },
    img("116:43232", 1376, 460, "Budget screens"),
    {
      type: "split",
      heading: "Transactions & bill payments",
      body: ["Every naira in and out is traceable, and bills get the same approval rigour as any other request."],
      points: [
        "Bill payments show what is upcoming, pending and paid at a glance.",
        "Each bill request carries its documents and approval trail.",
        "Transactions list every movement with status, and pending items open into full detail.",
      ],
    },
    img("116:43263", 1376, 460, "Bill payment screens"),
    img("116:43258", 1376, 460, "Transaction screens"),
    {
      type: "split",
      heading: "Insights",
      body: ["Insights turn spend data into decisions, with dedicated views for spend analysis, approvals, vendors, budgets and risk."],
      points: [
        "Spend analysis breaks spending down by category, department and time.",
        "Approval insights reveal bottlenecks and turnaround times.",
        "Vendor, budget and risk views flag performance issues and unusual spend early.",
      ],
    },
    img("116:43286", 1376, 800, "Spend analysis"),
    img("116:43289", 1376, 460, "Approval and vendor insights"),
    img("116:43294", 1376, 460, "Budget and risk insights"),
    {
      type: "split",
      heading: "Roles, permissions & vendors",
      body: ["As companies grow, who can do what matters. Role-based permissions and a vendor directory keep spending accountable."],
      points: [
        "Admins create custom roles with granular permissions instead of one-size-fits-all access.",
        "Vendor profiles bring ratings, orders and documents into one view for faster sourcing.",
      ],
    },
    img("116:43299", 1376, 800, "Roles and permissions"),
    img("116:43302", 1376, 460, "Permission settings"),
    {
      type: "split",
      heading: "Teams & employees",
      body: ["Teams, departments and employees are managed in one place, with single or bulk onboarding for growing companies."],
    },
    img("116:43313", 1376, 460, "Teams and employees screens"),
    {
      type: "split",
      heading: "Request for quotation",
      body: ["Teams select vendors and send one RFQ to many, so comparing quotes is fair, fast and documented."],
    },
    img("116:43343", 1376, 460, "Request for quotation screens"),
    {
      type: "split",
      heading: "Vendors & marketplace",
      body: [
        "Vendor profiles bring ratings, orders and documents into one view, and the marketplace helps teams discover and onboard new vendors.",
      ],
    },
    img("116:43329", 1376, 800, "Vendor directory"),
    img("116:43332", 1376, 460, "Vendor marketplace"),
    {
      type: "split",
      heading: "Products & inventory",
      body: ["A product catalogue keeps items, prices and stock consistent across every purchase request."],
    },
    img("116:43354", 1376, 800, "Product catalogue"),
    img("116:43357", 1376, 460, "Inventory screens"),
    {
      type: "split",
      heading: "Marketing website",
      body: [
        "Alongside the product, I designed Spendive’s marketing website. It had to explain a fairly complex platform in seconds, earn the trust of finance teams, and turn visitors into demo bookings, while also bringing vendors onto the platform.",
      ],
      groups: [
        {
          title: "Goals",
          points: [
            "Communicate the value fast: spend smarter, work faster, save bigger.",
            "Build credibility with finance leaders through real product UI, client logos and testimonials.",
            "Drive one clear action, “Book a demo”, repeated at the right moments down the page.",
          ],
        },
        {
          title: "Design direction",
          points: [
            "Product-led storytelling: real dashboard, purchase request, vendor and card UI sits inside each feature block, so visitors see the actual product instead of abstract illustrations.",
            "A clear narrative from the hero to the trusted-by logos, key features (expense management, procurement and approvals, vendor management, integrations, insights), the benefits of cost saving, time efficiency, accuracy and collaboration, the integrated vendor portal, testimonials and a final call to action.",
            "Generous white space and a consistent card system keep a feature-heavy page easy to scan.",
          ],
        },
      ],
      // TODO(Timi): add the website URL → link: { label: "View live website ↗", href: "…" }
    },
    img("118:76427", 1376, 850, "Spendive marketing website sections"),
    {
      type: "split",
      heading: "Impact",
      body: [
        "We ran usability tests with admins, employees, vendors and customers. Feedback led to simpler forms, status indicators across every approval stage and a mobile experience so approvers can act on the go. Based on the streamlined flows and controls over the course of 6 months, Spendive delivered:",
      ],
      stats: [
        { value: "40–50%", label: "faster request-to-approval" },
        { value: "Up to 35%", label: "less overspending in 6 months" },
        { value: "5–10 hrs", label: "saved per week on manual work" },
        { value: "25%", label: "better vendor response & accuracy" },
        { value: "30%", label: "higher employee satisfaction" },
      ],
    },
    {
      type: "split",
      heading: "Final thoughts",
      body: [
        "Designing Spendive was about creating clarity, control and confidence for businesses managing money. From simplifying complex approval structures to enabling quick mobile approvals, every decision balanced user needs with business goals.",
      ],
    },
    img("90:41324", 1376, 860, "Spendive closing image"),
    {
      type: "split",
      heading: "Behind the scenes",
      body: ["A look inside the Figma file: every interface, flow and component, organised for handoff."],
    },
    img("116:43390", 1376, 774, "The Spendive Figma file"),
  ],
  more: ["soulsync", "fundora"],
};
