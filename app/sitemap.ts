import type { MetadataRoute } from "next";
import { getAllPostsMeta } from "@/lib/posts";
import { getCategorySlug } from "@/lib/blogFilters";

const BASE_URL = "https://www.galenai.io";

// Marketing pages that always exist. Home is "" so it resolves to the bare origin.
const STATIC_PATHS = [
  "",
  "/download",
  "/institutions",
  "/team",
  "/qr",
  "/privacy",
  "/terms",
  "/blog",
];

// Native Next.js sitemap — regenerated on every build from live post data, so a
// newly published post appears automatically and drafts stay excluded (getAllPostsMeta
// already filters unpublished). The Keystatic admin/API are intentionally left out.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPostsMeta();

  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.map((path) => ({
    url: `${BASE_URL}${path}`,
    changeFrequency: path === "" || path === "/blog" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/blog" ? 0.8 : 0.5,
  }));

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // Only categories that actually have a published post — no empty pages in the index.
  const activeCategories = Array.from(new Set(posts.map((post) => post.category)));
  const categoryEntries: MetadataRoute.Sitemap = activeCategories.map((category) => ({
    url: `${BASE_URL}/blog/category/${getCategorySlug(category)}`,
    changeFrequency: "weekly",
    priority: 0.5,
  }));

  return [...staticEntries, ...postEntries, ...categoryEntries];
}
