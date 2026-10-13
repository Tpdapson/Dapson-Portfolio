import type { MetadataRoute } from "next";
import { caseStudies } from "@/content/case-studies";
import { siteUrl } from "@/content/seo";

/** /sitemap.xml: every public page, for search engines to crawl. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${siteUrl}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/playground`, changeFrequency: "monthly", priority: 0.7 },
    ...caseStudies.map((c) => ({ url: `${siteUrl}/work/${c.slug}`, changeFrequency: "yearly" as const, priority: 0.8 })),
  ];
}
