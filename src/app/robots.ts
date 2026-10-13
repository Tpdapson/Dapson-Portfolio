import type { MetadataRoute } from "next";
import { siteUrl } from "@/content/seo";

/**
 * /robots.txt. Search engines and AI assistants (ChatGPT, Claude, Perplexity,
 * Gemini…) are all welcome, so they can find and recommend the portfolio.
 * Only the private notes admin and the API are kept out.
 */
export default function robots(): MetadataRoute.Robots {
  const disallow = ["/notes/admin", "/api/"];
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      ...["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-SearchBot", "PerplexityBot", "Google-Extended", "Applebot-Extended", "Bingbot"].map(
        (userAgent) => ({ userAgent, allow: "/", disallow }),
      ),
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
