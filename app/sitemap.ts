import type { MetadataRoute } from "next";
import { getAllPostsMeta } from "@/lib/posts";
import { getCategorySlug } from "@/lib/blogFilters";
import { specPages, staticRoutes, howToPaths, HOW_TO_LIVE } from "@/content/site";
import { SITE } from "@/lib/site";
import { EXAM_PAGES, EXAM_PAGES_LIVE, mcqPageIndexable } from "@/lib/exams";
import { getAllLessons } from "@/lib/learn";

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

  const lessons = getAllLessons();
  const published = lessons.filter((l) => l.isPublished);
  const anyReviewed = published.length > 0;
  const learnEntries: MetadataRoute.Sitemap = [
    ...(anyReviewed ? [{ url: url("/learn"), changeFrequency: "weekly" as const, priority: 0.8 }] : []),
    ...[...new Set(lessons.map((l) => l.subject))]
      .filter((sub) => lessons.filter((l) => l.subject === sub).length >= 5 && published.some((l) => l.subject === sub))
      .map((sub) => ({ url: url(`/learn/${sub}`), changeFrequency: "weekly" as const, priority: 0.7 })),
    ...published.map((l) => ({
      url: url(l.path),
      lastModified: l.reviewedOn || l.publishDate ? new Date(l.reviewedOn || l.publishDate) : undefined,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];

  const examEntries: MetadataRoute.Sitemap = EXAM_PAGES_LIVE
    ? EXAM_PAGES.filter((p) => p !== "/exams/neet-pg-mcq-practice" || mcqPageIndexable(anyReviewed)).map((p) => ({ url: url(p), changeFrequency: "monthly", priority: 0.7 }))
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

  return [...staticEntries, ...specEntries, ...howToEntries, ...learnEntries, ...examEntries, ...postEntries, ...categoryEntries];
}
