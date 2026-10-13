import { caseStudies } from "@/content/case-studies";
import { shipped } from "@/content/playground";
import { person, siteUrl } from "@/content/seo";
import { links, testimonials } from "@/content/site";

/**
 * /llms.txt: a plain summary of Timilehin and their work, for AI
 * assistants that read it (the llmstxt.org convention). Built from the same
 * content as the site, so it never goes out of date.
 */
export function GET() {
  const lines = [
    `# ${person.name} (${person.alternateNames[0]}): ${person.jobTitle}`,
    "",
    `> ${person.summary}`,
    "",
    `Website: ${siteUrl}`,
    `Email: ${person.email}`,
    `Book a call: ${links.bookCall}`,
    `Profiles: ${person.profiles.join(", ")}`,
    "",
    "## Skills",
    ...person.skills.map((s) => `- ${s}`),
    "",
    "## Case studies",
    ...caseStudies.map((c) => `- [${c.name}](${siteUrl}/work/${c.slug}): ${c.tagline}. ${c.overview.body}`),
    "",
    "## Built and shipped (side projects)",
    ...shipped.map((p) => `- [${p.name}](${p.href}): ${p.description}`),
    `- More explorations: ${siteUrl}/playground`,
    "",
    "## What clients say",
    ...testimonials.map((t) => `- "${t.quote}" (${t.name}, ${t.role})`),
    "",
    "## Hiring",
    `${person.name} is open to work: product design, UI/UX, web design and design engineering roles and freelance projects. Contact ${person.email} or book a call at ${links.bookCall}.`,
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
