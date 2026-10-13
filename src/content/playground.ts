/**
 * Playground page content. Shots are 2x exports from the Figma "Playground"
 * frame (175:43852), in grid order, in public/playground.
 */
export type Shot = { src: string; alt: string };

export const shots: Shot[] = [
  { src: "/playground/s01.webp", alt: "Furniture shop app: home, product and catalogue screens" },
  { src: "/playground/s02.webp", alt: "Dark video editing interface" },
  { src: "/playground/s03.webp", alt: "Cleaning service website: “We Don’t Cut Corners, We Clean Them”" },
  { src: "/playground/s04.webp", alt: "Fitness app: onboarding, daily challenge and workout screens" },
  { src: "/playground/s05.webp", alt: "Polo club website: “Unlock Confidence & Power Through Polo Mastery”" },
  { src: "/playground/s06.webp", alt: "Car rental app: welcome and car listing screens" },
  { src: "/playground/s07.webp", alt: "Property marketplace app: onboarding and browse screens" },
  { src: "/playground/s08.webp", alt: "Web app onboarding: connect your business bank accounts" },
  { src: "/playground/s09.webp", alt: "Feature cards: procurement, vendor management, spend control and integrations" },
  { src: "/playground/s10.webp", alt: "Travel app: welcome and destination screens" },
  { src: "/playground/s11.webp", alt: "Shipment tracking app: vessel detail and shipments screens" },
  { src: "/playground/s12.webp", alt: "Dark fintech dashboard with balances and transactions" },
  { src: "/playground/s13.webp", alt: "Learning platform sign-in screen" },
  { src: "/playground/s14.webp", alt: "Electricity payments app: onboarding and usage screens" },
  { src: "/playground/s15.webp", alt: "Education payments website: “Reliable Payment Solutions for International Education”" },
  { src: "/playground/s16.webp", alt: "AI study assistant: “Stuck on a lesson? Ask Andie, any time.”" },
];

export type ShippedProject = { name: string; description: string; href: string; image: string };

/** Live products, built end to end with AI-powered tools. */
export const shipped: ShippedProject[] = [
  {
    name: "Lumen",
    description: "Event discovery, booking and hosting, made simple.",
    href: "https://lumen-booking.vercel.app/",
    image: "/playground/lumen.webp",
  },
  {
    name: "Market Mirror",
    description: "Bringing local markets online, so they're easy to discover, navigate and shop.",
    href: "https://market-mirror-five.vercel.app/",
    image: "/playground/market-mirror.webp",
  },
];
