import { links } from "@/content/site";

/**
 * Who the site is about, for search engines and AI assistants: page metadata,
 * the structured data (JSON-LD) on each page, sitemap.xml, robots.txt and
 * llms.txt all read from here. Keep it true and consistent with LinkedIn,
 * Behance and X, since search engines cross-check them.
 */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.tpdapson.com").replace(/\/$/, "");

export const person = {
  name: "Timilehin Oladapo",
  alternateNames: ["Dapson", "Oladapo Timilehin", "Timi Oladapo"],
  jobTitle: "Product Designer & Design Engineer",
  location: { city: "Lagos", country: "Nigeria", countryCode: "NG" },
  // One plain sentence: what you do, for whom, and how.
  summary:
    "Timilehin Oladapo (Dapson) is a product designer and design engineer with 5+ years of experience, based in Lagos, Nigeria, who designs and builds web and mobile products: UI/UX design, web design, design systems and AI-assisted front-end builds for startups and growing businesses in fintech, travel, logistics and wellness. Available for remote work worldwide.",
  skills: [
    "Product design",
    "UI/UX design",
    "Web design",
    "Mobile app design",
    "Design systems",
    "Prototyping",
    "User research",
    "Interaction design",
    "Design engineering",
    "AI-assisted product building",
  ],
  email: links.email.replace("mailto:", ""),
  image: "/images/timi-about.jpg",
  profiles: [links.socials.linkedin, links.socials.behance, links.socials.x],
};

export const seoDescription =
  "Timilehin Oladapo (Dapson) is a product designer and design engineer with 5+ years of experience, based in Lagos, Nigeria. UI/UX, web and mobile product design, design systems and AI-assisted builds for startups in fintech, travel, logistics and more.";

export const absolute = (path: string) => (path.startsWith("http") ? path : `${siteUrl}${path.startsWith("/") ? "" : "/"}${path}`);

/** JSON-LD for the person, used on every page so each one says who made it. */
export function personSchema() {
  return {
    "@type": "Person",
    "@id": `${siteUrl}/#person`,
    name: person.name,
    alternateName: person.alternateNames,
    jobTitle: person.jobTitle,
    description: person.summary,
    url: siteUrl,
    image: absolute(person.image),
    email: person.email,
    address: { "@type": "PostalAddress", addressLocality: person.location.city, addressCountry: person.location.countryCode },
    homeLocation: { "@type": "Place", name: `${person.location.city}, ${person.location.country}` },
    knowsAbout: person.skills,
    sameAs: person.profiles,
  };
}

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // Escape "<" so the JSON can never close the script tag early.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
