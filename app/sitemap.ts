import type { MetadataRoute } from "next";
import { getAllPostsMeta } from "@/lib/posts";
import { getCategorySlug } from "@/lib/blogFilters";
import { specPages, staticRoutes, howToPaths, HOW_TO_LIVE } from "@/content/site";
import { SITE } from "@/lib/site";

/**
 * Generated on every build from the page registry and live post data.
 * A page appears here only when it is live:
 *   - bespoke routes: `live: true` in staticRoutes (content/site/index.ts)
 *   - spec pages:     `status: "live"` on the PageSpec
 *   - how-to guides:  HOW_TO_LIVE
 *   - blog posts:     published in Keystatic
 * /go/*, /qr, /keystatic and skeleton pages never appear.
 * (The old static public/sitemap.xml that shadowed this file has been deleted.)
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPostsMeta();
  const url = (path: string) => `${SITE.url}${path}`;

  const staticEntries: MetadataRoute.Sitemap = staticRoutes
    .filter((r) => r.live)
    .map((r) => ({
      url: url(r.path),
      changeFrequency: r.path === "" || r.path === "/blog" ? "weekly" : "monthly",
      priority: r.priority,
    }));

  const specEntries: MetadataRoute.Sitemap = specPages
    .filter((p) => p.status === "live")
    .map((p) => ({ url: url(p.path), changeFrequency: "monthly", priority: 0.7 }));

  const howToEntries: MetadataRoute.Sitemap = HOW_TO_LIVE
    ? howToPaths().map((p) => ({ url: url(p), changeFrequency: "monthly", priority: 0.5 }))
    : [];

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: url(`/blog/${post.slug}`),
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // Only categories that actually have a published post: no empty pages in the index.
  const activeCategories = Array.from(new Set(posts.map((post) => post.category)));
  const categoryEntries: MetadataRoute.Sitemap = activeCategories.map((category) => ({
    url: url(`/blog/category/${getCategorySlug(category)}`),
    changeFrequency: "weekly",
    priority: 0.5,
  }));

  return [...staticEntries, ...specEntries, ...howToEntries, ...postEntries, ...categoryEntries];
}
