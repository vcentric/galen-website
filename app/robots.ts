import type { MetadataRoute } from "next";

const BASE_URL = "https://www.galenai.io";

// Native Next.js robots.txt — regenerated on every build. Crawlers are welcome
// everywhere except the Keystatic admin and its API routes (nothing to index there).
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/keystatic", "/api/"],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
