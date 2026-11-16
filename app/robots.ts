import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

const PRIVATE = ["/keystatic", "/api/"];

/**
 * Crawlers are welcome everywhere except the CMS and API routes. AI search and answer
 * crawlers are named explicitly so the intent is unambiguous: we want GalenAI pages
 * read and cited by AI engines.
 *
 * /go/* and /qr are NOT disallowed here on purpose. They carry a noindex meta tag, and
 * a crawler has to be allowed to fetch a page to see that tag. Blocking them in
 * robots.txt could leave the bare URL in the index.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: PRIVATE },
      {
        userAgent: [
          "Googlebot",
          "Bingbot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "GPTBot",
          "PerplexityBot",
          "ClaudeBot",
          "Claude-SearchBot",
          "Google-Extended",
          "Applebot",
          "Applebot-Extended",
          "Claude-User",
          "anthropic-ai",
          "Perplexity-User",
          "DuckAssistBot",
          "Amazonbot",
          "meta-externalagent",
          "MistralAI-User",
          "cohere-ai",
          "CCBot",
          "YouBot",
        ],
        allow: "/",
        disallow: PRIVATE,
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
