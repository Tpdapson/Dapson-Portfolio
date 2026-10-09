import { heroFor, imageFor, type CaseStudy } from "./types";

const slug = "hellome-money";
const img = imageFor(slug);

export const hellomeMoney: CaseStudy = {
  slug,
  name: "HelloMe Money",
  tagline: "Send, receive and exchange money across borders, in one account",
  cardTagline: "Send, receive and exchange money across borders",
  accent: "#1a6bf0",
  tint: "#eef3fe",
  hero: heroFor(slug, "99:41633", "HelloMe Money app screens"),
  overview: {
    body: "HelloMe Money is a digital financial platform that simplifies how people manage, spend and move money, including international transfers. Beyond a good-looking interface, it is a practical everyday tool for payments, transfers and account management. The goal was a modern, intuitive mobile experience that reduces friction and builds trust through clarity and consistency.",
    meta: [
      ["Role", "Product Designer"],
      ["Company", "HelloMe"],
      ["Type", "Mobile app · Fintech"],
      ["Industry", "Cross-border payments"],
      ["Users", "Personal, business & agents"],
      ["Currencies", "USD, GBP, NGN and more"],
    ],
  },
  blocks: [
    {
      type: "centered",
      heading: "The challenge",
      body: "Moving money across borders is stressful. Fees and exchange rates are often unclear until the end, transfers feel like a black box once sent, and verification steps can be confusing or repetitive. People sending money home, paying tuition or running a business needed an app that shows exactly what happens to their money, every step of the way.",
    },
    img("99:41668", 1376, 739, "HelloMe Money dashboard and transaction review"),
    {
      type: "split",
      heading: "The solution",
      body: ["One mobile account that makes cross-border money simple, predictable and safe."],
      points: [
        "Multi-currency balances with local account details for receiving money",
        "Fees, exchange rate and the amount the recipient gets shown before you confirm",
        "Live transfer progress, success states and shareable receipts",
        "Account types for personal users, businesses and agents or affiliates",
      ],
    },
    {
      type: "split",
      heading: "Onboarding built around who you are",
      body: ["Instead of one generic sign-up, HelloMe asks what kind of account you need first, then tailors the rest of the flow."],
      points: [
        "Personal, Business and Agent/Affiliate are colour-coded so each path is instantly recognisable.",
        "A free NGN account is offered at the right moment, after the core account is set up.",
        "Forms ask only what each account type genuinely requires.",
      ],
    },
    img("138:49396", 1376, 709, "Splash and onboarding screens"),
    img("138:49413", 1376, 840, "Multi-currency card and account type selection"),
    img("138:49424", 1376, 753, "Business account options and free NGN account offer"),
    {
      type: "split",
      heading: "Business account onboarding",
      body: ["Business accounts need more than a name and a selfie, so business onboarding breaks verification into short, clear steps."],
      points: [
        "Verification starts with business details and the activities the company is involved in.",
        "Shareholders are added one at a time, each with their own details.",
        "Documents are uploaded with clear requirements for each file.",
      ],
    },
    img("138:49479", 1376, 840, "Business verification search"),
    img("138:49455", 1376, 753, "Business account, shareholders, activities and documents"),
    {
      type: "split",
      heading: "Security that feels reassuring, not tedious",
      body: ["Trust is the product in fintech. Security steps are clear about why they are needed and fast to complete."],
      points: [
        "Phone OTP and biometrics make returning sign-ins quick.",
        "A new-device check explains itself instead of silently blocking access.",
        "Identity verification uses plain language and one task per screen.",
      ],
    },
    img("138:49490", 1376, 753, "Sign-in, phone OTP and biometrics"),
    img("138:49503", 1376, 840, "New-device check and restricted country notice"),
    {
      type: "split",
      heading: "Balances you can act on",
      body: [
        "The dashboard puts the balance, account details and the four most common actions (send, add money, convert, pay tuition) within one thumb’s reach.",
      ],
      points: [
        "A currency switcher makes multi-currency balances feel like one account.",
        "Local account details are one tap away, so receiving money is as easy as sharing a number.",
        "Recent transactions and promotions sit below, never competing with the main actions.",
      ],
    },
    img("138:49514", 1376, 840, "Dashboard and more actions"),
    img("138:49525", 1376, 753, "Add beneficiary, account details and add money"),
    {
      type: "split",
      heading: "Sending money with no surprises",
      body: ["The send flow answers the questions people worry about most, before they commit."],
      points: [
        "“You’re sending” and “Recipient gets” update together, with the rate, fee and payable amount spelled out.",
        "A Fee / Zero Fee toggle and promo credit make costs feel controllable.",
        "Progress, success and receipt screens close the loop so people know the money arrived.",
      ],
    },
    img("138:49538", 1376, 709, "Send options and choosing a beneficiary"),
    img("138:49555", 1376, 840, "Bank selection and empty account state"),
    img("138:49566", 1376, 753, "Send amount, fees and receiving currency"),
    {
      type: "split",
      heading: "Transaction status",
      body: ["Every transfer has a clear status, from in progress to success or failure, so nobody is left wondering where their money is."],
      points: [
        "A progress screen shows each stage of the transfer as it happens.",
        "Success screens confirm the amount and recipient, with the receipt one tap away.",
        "Failure and error states explain what went wrong and what to do next.",
      ],
    },
    img("138:49597", 1376, 753, "Transfer in progress, successful and failed"),
    img("138:49610", 1376, 840, "Success and failure confirmations"),
    {
      type: "split",
      heading: "International school fees",
      body: [
        "Paying tuition abroad is one of HelloMe’s key use cases, so it has its own guided flow from choosing a school to paying.",
      ],
      points: [
        "Destination country and institution are chosen from searchable lists, with the institution’s details shown before you commit.",
        "Payment, institutional and student details are captured in short, focused steps.",
        "A summary shows the amount, fees and rate before paying, followed by clear bank deposit details.",
      ],
    },
    img("139:126683", 1376, 840, "Saved institutions and payment information"),
    img("138:49639", 1376, 753, "Adding an institution, summary and institutional details"),
    {
      type: "split",
      heading: "Transactions you can trace",
      body: ["Every transfer leaves a clear trail, so people can find, check and prove any payment in seconds."],
      points: [
        "Transactions are grouped by month, with amount, recipient and status visible at a glance.",
        "A filter sheet narrows by currency, transaction type, status and date range without leaving the list.",
        "Each transaction opens a detailed receipt that can be shared or downloaded as proof of payment.",
      ],
    },
    img("103:42258", 1376, 753, "Transactions, filters and receipt"),
    {
      type: "split",
      heading: "Rewards and account management",
      body: ["Referrals, subscriptions and profile settings are designed to feel rewarding, not hidden in menus."],
      points: [
        "Referral codes can be shared in one tap, with earnings shown upfront.",
        "Subscription plans clearly compare what each tier unlocks.",
      ],
    },
    img("138:49680", 1376, 840, "Referrals and subscription plans"),
    {
      type: "split",
      heading: "Other screens",
      body: ["Supporting screens that make the experience feel complete and trustworthy."],
      points: [
        "Restricted countries are explained upfront, so people know where they can and can’t send money.",
        "New-device detection protects accounts without locking people out.",
        "Detailed receipts and a clear profile round out the everyday experience.",
      ],
    },
    img("138:49709", 1376, 709, "Restricted countries, receipts and profile"),
    {
      type: "split",
      heading: "The outcome",
      body: [
        "HelloMe Money came together as a consistent mobile experience across onboarding, verification, multi-currency balances, transfers and rewards, designed to reduce friction at every step and build trust through clarity.",
      ],
    },
  ],
  more: ["hellome-travel", "fundora"],
};
