import fs from "node:fs";
import path from "node:path";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllPostsMeta, getPostBySlug, getRelatedPosts } from "@/lib/posts";
import type { PostMeta } from "@/lib/blogFilters";
import BlogPostClient from "./BlogPostClient";
import { buildMetadata } from "@/lib/seo";

const BASE_URL = "https://www.galenai.io";

// Absolute, crawlable URL for the cover image (Keystatic stores it root-relative).
// Social previews and structured data use the JPEG copy written by scripts/optimize_blog_images.py when
// it exists, because some platforms do not read WebP.
function absoluteImageUrl(coverImage: string): string | null {
  if (!coverImage) return null;
  if (coverImage.startsWith("http")) return coverImage;
  let rel = coverImage.startsWith("/") ? coverImage : `/${coverImage}`;
  const og = rel.replace(/\.webp$/i, ".og.jpg");
  if (og !== rel && fs.existsSync(path.join(process.cwd(), "public", og))) rel = og;
  return `${BASE_URL}${encodeURI(rel)}`;
}

// BlogPosting structured data (schema.org) — makes the post eligible for Google's
// rich results (thumbnail, author, date) and Discover. Built entirely from fields
// the author already fills in; nothing extra for the marketing team to do.
function buildArticleJsonLd(meta: PostMeta, slug: string) {
  const pageUrl = `${BASE_URL}/blog/${slug}`;
  const imageUrl = absoluteImageUrl(meta.coverImage);
  const publishedIso = new Date(meta.date).toISOString();

  // A named person shows author E-E-A-T; the generic "Team GalenAI" byline isn't a
  // person, so it's expressed as the Organization instead.
  const author =
    meta.authorType === "galenai_team"
      ? { "@type": "Organization", name: meta.authorName }
      : {
          "@type": "Person",
          name: meta.authorName,
          ...(meta.authorRole ? { jobTitle: meta.authorRole } : {}),
        };

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: meta.title,
    description: meta.metaDescription || meta.excerpt,
    ...(imageUrl ? { image: imageUrl } : {}),
    datePublished: publishedIso,
    dateModified: publishedIso,
    author,
    publisher: {
      "@type": "Organization",
      name: "GalenAI",
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/galenai-logo.webp`,
      },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
    url: pageUrl,
    ...(meta.category ? { articleSection: meta.category } : {}),
    ...(meta.tags.length ? { keywords: meta.tags.join(", ") } : {}),
  };
}

// Only published slugs (from generateStaticParams) resolve; a typed draft URL 404s.
export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await getAllPostsMeta();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  // Long headlines keep their full wording but drop the brand suffix, so less of the title is cut in results.
  const base = (post.meta.metaTitle || post.meta.title).replace(/\s*\|\s*GalenAI\s*$/, "").trim();
  const raw = (post.meta.metaDescription || post.meta.excerpt || "").trim();
  const description = raw.length > 160 ? `${raw.slice(0, 157).replace(/\s+\S*$/, "")}...` : raw;
  const md = buildMetadata({
    title: base,
    description,
    path: `/blog/${slug}`,
    type: "article",
    image: absoluteImageUrl(post.meta.coverImage) ?? undefined,
  });
  return base.length > 50 ? { ...md, title: { absolute: base } } : md;
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const all = await getAllPostsMeta();
  const relatedPosts = getRelatedPosts(post.meta, all, 3);
  const jsonLd = buildArticleJsonLd(post.meta, slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogPostClient
        post={post.meta}
        contentHtml={post.html}
        relatedPosts={relatedPosts}
      />
    </>
  );
}
