import "server-only";

import { createReader } from "@keystatic/core/reader";
import Markdoc, { type Config, type Node, type RenderableTreeNode } from "@markdoc/markdoc";
import keystaticConfig from "@/keystatic.config";
import type { PostMeta } from "./blogFilters";

// Reads Keystatic content straight from the filesystem at build/request time.
// Server-only — never import this from a client component.
const reader = createReader(process.cwd(), keystaticConfig);

// Markdoc transform config: custom tags rendered to the markup the `.blog-content`
// CSS targets. Headings/lists/tables use Markdoc defaults.
const markdocConfig: Config = {
  tags: {
    callout: {
      render: "div",
      attributes: { type: { type: String, default: "tip" } },
      transform(node: Node, config: Config): RenderableTreeNode {
        const attributes = node.transformAttributes(config);
        const children = node.transformChildren(config);
        return new Markdoc.Tag(
          "div",
          { class: `callout callout-${attributes.type}` },
          children
        );
      },
    },
    statCallout: {
      render: "div",
      attributes: { number: { type: String }, label: { type: String } },
      transform(node: Node, config: Config): RenderableTreeNode {
        const a = node.transformAttributes(config);
        return new Markdoc.Tag("div", { class: "stat-callout" }, [
          new Markdoc.Tag("span", { class: "stat-callout-number" }, [a.number]),
          new Markdoc.Tag("span", { class: "stat-callout-label" }, [a.label]),
        ]);
      },
    },
    actionBox: {
      render: "div",
      attributes: { title: { type: String } },
      transform(node: Node, config: Config): RenderableTreeNode {
        const a = node.transformAttributes(config);
        const children = node.transformChildren(config);
        return new Markdoc.Tag("div", { class: "action-box" }, [
          new Markdoc.Tag("div", { class: "action-box-title" }, [a.title]),
          new Markdoc.Tag("div", { class: "action-box-body" }, children),
        ]);
      },
    },
    cta: {
      render: "div",
      attributes: {},
      transform(node: Node, config: Config): RenderableTreeNode {
        const children = node.transformChildren(config);
        return new Markdoc.Tag("div", { class: "cta-box" }, children);
      },
    },
    imageWithCaption: {
      render: "figure",
      attributes: {
        src: { type: String },
        alt: { type: String, default: "" },
        caption: { type: String, default: "" },
        source: { type: String, default: "" },
      },
      transform(node: Node, config: Config): RenderableTreeNode {
        const a = node.transformAttributes(config);
        const kids: RenderableTreeNode[] = [
          new Markdoc.Tag("img", { src: a.src, alt: a.alt, loading: "lazy" }, []),
        ];
        if (a.caption || a.source) {
          const cap: RenderableTreeNode[] = [];
          if (a.caption) cap.push(a.caption);
          if (a.source)
            cap.push(new Markdoc.Tag("span", { class: "figure-source" }, [a.source]));
          kids.push(new Markdoc.Tag("figcaption", { class: "figure-caption" }, cap));
        }
        return new Markdoc.Tag("figure", { class: "image-with-caption" }, kids);
      },
    },
  },
};

const stripHtml = (html: string): string =>
  html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

const computeReadingTime = (html: string): number => {
  const words = stripHtml(html).split(" ").filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
};

type PostEntry = NonNullable<
  Awaited<ReturnType<typeof reader.collections.posts.read>>
>;

async function renderContentHtml(
  content: PostEntry["content"]
): Promise<string> {
  // The reader types `content` as a value-or-thunk depending on read mode; at
  // runtime (no resolveLinkedFiles) it's a thunk. Normalize both cases.
  const { node } = typeof content === "function" ? await content() : content;
  const renderable = Markdoc.transform(node as Node, markdocConfig);
  return Markdoc.renderers.html(renderable);
}

function toMeta(slug: string, entry: PostEntry, html: string): PostMeta {
  return {
    slug,
    title: entry.title,
    subtitle: entry.subtitle ?? "",
    excerpt: entry.excerpt,
    coverImage: entry.hero_image ?? "",
    heroCaption: entry.hero_image_caption ?? "",
    heroSource: entry.hero_image_source ?? "",
    category: entry.category,
    tags: [...entry.tags],
    authorName: entry.author_name,
    authorRole: entry.author_role ?? "",
    authorType: entry.author_type,
    date: entry.publish_date ?? "",
    readingTime: entry.read_time_minutes ?? computeReadingTime(html),
    isEditorsChoice: entry.is_editors_choice,
    isPublished: entry.is_published,
    isPressRelease: entry.is_press_release,
    isB2B: entry.is_b2b,
    caseStudyInstitution: entry.case_study_institution ?? "",
    caseStudyOutcome: entry.case_study_outcome ?? "",
    partnerName: entry.partner_name ?? "",
    sources: [...entry.sources],
    metaTitle: entry.meta_title ?? "",
    metaDescription: entry.meta_description ?? "",
  };
}

export async function getAllPostsMeta(): Promise<PostMeta[]> {
  const entries = await reader.collections.posts.all();
  const metas = await Promise.all(
    entries.map(async ({ slug, entry }) => {
      const html = await renderContentHtml(entry.content);
      return toMeta(slug, entry, html);
    })
  );
  return metas
    .filter((m) => m.isPublished)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPostBySlug(
  slug: string
): Promise<{ meta: PostMeta; html: string } | null> {
  const entry = await reader.collections.posts.read(slug);
  if (!entry || !entry.is_published) return null;
  const html = await renderContentHtml(entry.content);
  return { meta: toMeta(slug, entry, html), html };
}

export function getRelatedPosts(
  meta: PostMeta,
  all: PostMeta[],
  limit: number = 3
): PostMeta[] {
  return all
    .filter((post) => post.slug !== meta.slug && post.category === meta.category)
    .slice(0, limit);
}
