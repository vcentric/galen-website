import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllPostsMeta, getPostBySlug, getRelatedPosts } from "@/lib/posts";
import type { PostMeta } from "@/lib/blogFilters";
import BlogPostClient from "./BlogPostClient";

const BASE_URL = "https://www.galenai.io";

// Absolute, crawlable URL for the cover image (Keystatic stores it root-relative).
function absoluteImageUrl(coverImage: string): string | null {
  if (!coverImage) return null;
  if (coverImage.startsWith("http")) return coverImage;
  return `${BASE_URL}${coverImage.startsWith("/") ? "" : "/"}${coverImage}`;
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
  const title = post.meta.metaTitle || `${post.meta.title} | GalenAI`;
  const description = post.meta.metaDescription || post.meta.excerpt;
  return {
    title,
    description,
    openGraph: {
      title: post.meta.metaTitle || post.meta.title,
      description,
      type: "article",
      images: post.meta.coverImage ? [post.meta.coverImage] : undefined,
    },
  };
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
