import { heroFor, imageFor, type CaseStudy } from "./types";

const slug = "soulsync";
const img = imageFor(slug);

export const soulsync: CaseStudy = {
  slug,
  name: "SoulSync",
  tagline: "A gentler, more human approach to mental wellness",
  cardTagline: "A gentler, more human approach to mental wellness",
  accent: "#a65997",
  tint: "#f8e9f5",
  hero: heroFor(slug, "89:41055", "SoulSync home screen beside a meditation photo"),
  overview: {
    body: "SoulSync brings a more human, emotionally aware approach to mental wellness. It blends gentle AI with empathetic design: daily mood check-ins, guided journaling and meditations, SoSo, an AI companion, and a one-tap SOS line to a real therapist when things get heavy. I was the sole product designer, owning strategy, flows, UI, prototyping and microcopy.",
    meta: [
      ["Role", "Sole Product Designer"],
      ["Type", "Mobile app · B2C"],
      ["Industry", "Mental health & wellness"],
      ["Year", "2025"],
      ["Scope", "Research, UX, UI, Prototyping, Microcopy"],
      ["Platform", "iOS & Android"],
    ],
  },
  blocks: [
    img("89:41086", 1376, 800, "Four SoulSync screens over a cloudy sky"),
    {
      type: "centered",
      heading: "The challenge",
      body: "Most wellness apps feel either clinical or chaotic. People who are struggling need something that feels safe the moment it opens, and help that is a single tap away when things get hard. The challenge was to make daily check-ins feel effortless, while keeping a real therapist within reach.",
    },
    {
      type: "split",
      heading: "Visual language",
      body: [
        "Every element, from the colour palette to the typography, was chosen to create a safe and soothing space. Recoleta brings warmth and personality to headlines, while DM Sans keeps the interface clear. Soft, character-like mood emojis make it easier to name a feeling.",
      ],
    },
    img("89:41177", 1440, 2192, "SoulSync brand moodboard: lotus mark, photography, mood characters and the Recoleta and DM Sans type pairing"),
    {
      type: "palette",
      swatches: [
        { name: "Deep Plum", hex: "#A65997", text: "#ffffff" },
        { name: "Blush Pink", hex: "#EDD0E7", text: "#5a2350" },
        { name: "Rose Mist", hex: "#F8E9F5", text: "#5a2350" },
        { name: "Light Snow", hex: "#FAFAFA", text: "#3c3c3c" },
        { name: "Soft Ivory", hex: "#FEF9EB", text: "#3c3c3c" },
        { name: "Peach Glow", hex: "#FBEFE7", text: "#3c3c3c" },
        { name: "Slate Gray", hex: "#3C3C3C", text: "#ffffff" },
        { name: "Charcoal", hex: "#141414", text: "#ffffff" },
      ],
    },
    {
      type: "split",
      heading: "Onboarding & sign up",
      body: ["Onboarding introduces SoulSync in three calm screens, one promise each, before asking for anything."],
      points: [
        "Soft blush gradients and the lotus mark signal calm before a single word is read.",
        "Sign-up is framed as creating “your safe space”, with Google and Apple options to keep it effortless.",
        "A short questionnaire and a daily check-in reminder personalise the experience from day one.",
      ],
    },
    img("122:44960", 1376, 710, "Splash and three onboarding screens"),
    img("122:44988", 1376, 840, "Questionnaire and daily reminder setup screens"),
    {
      type: "split",
      heading: "Home & mood logging",
      body: ["The home screen puts the daily check-in front and centre, then surfaces gentle recommendations based on how the user feels."],
      points: [
        "A weekly insight banner turns mood data into encouragement: “You’ve been happier this week.”",
        "Moods are soft, character-like emojis, so naming a feeling feels approachable, not clinical.",
        "Logging a mood opens a validating pop-up and an optional note, then feeds the mood history.",
      ],
    },
    img("89:41349", 1376, 753, "Home, mood logging pop-up and mood history screens"),
    {
      type: "split",
      heading: "SoSo, your AI therapist",
      body: ["SoSo lives in the centre of the navigation, so support is always one tap away, day or night."],
      points: [
        "Suggested prompts like “Feeling overwhelmed” lower the barrier to starting a conversation.",
        "Responses validate the feeling first, then ask gentle follow-up questions.",
        "The SOS badge stays visible in the chat header, in case a conversation becomes too heavy.",
      ],
    },
    img("122:45017", 1376, 753, "Three SoSo chat screens"),
    {
      type: "split",
      heading: "SOS emergency support",
      body: ["When things feel heavy, the SOS flow connects users to a real therapist in a few taps, with calm reassurance at every step."],
      points: [
        "“Connect to a therapist now” leads, with the 24/7 crisis hotline and emergency services as clear alternatives.",
        "While waiting, a “You’re not alone” message and a breathing exercise keep people grounded.",
        "After the call, a “How are you feeling now?” check-in closes the session and logs the mood.",
      ],
    },
    img("122:45052", 1376, 753, "SOS screen, connecting call and in-call screens"),
    img("122:45065", 1376, 840, "Post-call mood check-in and confirmation"),
    {
      type: "split",
      heading: "Journaling",
      body: ["Journaling starts from a gentle daily prompt, so a blank page never gets in the way."],
      points: [
        "Prompts rotate daily, from gratitude to reflection.",
        "Voice notes and images were added after testing showed typing alone felt restrictive.",
        "Choosing a mood is optional, so journaling never feels like a form.",
      ],
    },
    img("122:45105", 1376, 753, "Journal prompts, new entry, saved state and entry list"),
    {
      type: "split",
      heading: "Calming quotes & meditations",
      body: ["Short rituals that fit into a busy day, without ever feeling like homework."],
      points: [
        "Calming quotes can be saved and revisited when they are needed most.",
        "Meditations are grouped by need, with progress shown on each one.",
        "Every session ends with a calm completion moment.",
      ],
    },
    img("122:45143", 1376, 753, "Calming quotes, meditation library, player and completion screens"),
    {
      type: "split",
      heading: "Account & AI assistance level",
      body: [
        "The Account screen is a calm, organised home for progress and preferences, while the AI Assistance Level puts users in control of how present SoSo is in their day.",
      ],
      points: [
        "A progress overview (mood score, streak and minutes spent) shows how far someone has come at a glance, with a check mark confirming an active subscription.",
        "Goals, AI assistance level and notification preferences are grouped together, with achievements, emergency support and resources close by.",
        "AI behaviour runs from minimal to proactive, with personalisation and privacy toggles, so SoSo meets people where they are emotionally and earns their trust.",
      ],
    },
    img("96:41606", 1376, 753, "Account, achievements and AI settings screens"),
    {
      type: "split",
      heading: "Statistics & explore",
      body: ["Seeing progress builds confidence, and Explore makes it easy to find the right support at the right moment."],
      points: [
        "Statistics use soft hues, simple labels and weekly summary statements, so no one has to read graphs alone.",
        "Explore groups tools into Breathe, Meditate, Journal and Sleep, with quick paths like “Is it crisis?”.",
      ],
    },
    img("122:45174", 1376, 840, "Statistics and Explore screens"),
    {
      type: "split",
      heading: "Subscription",
      body: [
        "Upgrading is framed as an investment in wellbeing, never a paywall. The free Essential Care plan stays genuinely useful, SOS calls with therapists included, so support never depends on payment.",
      ],
      points: [
        "Plans are compared feature by feature, with a monthly or annual toggle and a clear “Save 20%” on annual billing.",
        "Premium Wellness is marked “Most popular” and unlocks unlimited SoSo chat, the full meditation library and priority therapist support.",
        "Once active, the plan page confirms the renewal date and amount, with subscription, billing history and payment method one tap away.",
      ],
    },
    img("127:44682", 1376, 753, "Subscription plans and active plan screens"),
    {
      type: "split",
      heading: "Usability testing & iteration",
      body: ["I ran remote usability sessions with a diverse group of users across different emotional states. Each finding led to a concrete change."],
      findings: [
        { title: "Navigation clarity", body: "Some users missed the AI assistant in the centre nav. A stronger gradient icon and a subtle first-time prompt fixed it." },
        { title: "SOS visibility", body: "The SOS option was missed in distress. It is now persistent across chat screens with a soft red highlight." },
        { title: "Journaling felt restrictive", body: "Added optional voice notes and image uploads, and made mood selection non-mandatory." },
        { title: "Calls felt incomplete", body: "Added a post-call “How are you feeling now?” prompt with an invitation to journal." },
        { title: "Graphs were hard to read", body: "Redesigned charts with softer hues, simpler labels and weekly summary statements." },
      ],
    },
    img(
      "104:41718",
      1384,
      819,
      "Four drafts of the home screen",
      "Home screen iterations: SoSo moved from a home-only button into the centre of the nav, and the weekly summary gained a tap-through to details.",
    ),
    img(
      "89:41519",
      1384,
      2464,
      "Before and after pairs for statistics, journaling and chat",
      "Before and after: statistics, journaling and chat screens refined from testing feedback.",
    ),
    {
      type: "split",
      heading: "Impact",
      body: [
        "Designing SoulSync reinforced that thoughtful design goes beyond usability, it shapes how people feel. Early testing showed users felt seen, less alone, and more willing to engage with their emotions regularly. The product does not just help people track moods or access support; it offers comfort, clarity and connection.",
      ],
      lessons: [
        { title: "Tone is a feature", body: "Small choices in colour, copy and pacing deeply shape how a wellness product feels." },
        { title: "AI needs tuning", body: "Helpful AI takes constant tuning of tone, timing and interaction patterns." },
        { title: "Choice is inclusive", body: "Letting users type, speak or skip makes the product work for more people." },
      ],
    },
    img("89:41539", 1384, 995, "Thanks for viewing: SoulSync splash screen beside a meditating man"),
  ],
  more: ["spendive", "freshline"],
};
