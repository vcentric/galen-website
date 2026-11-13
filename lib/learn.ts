import "server-only";

import fs from "node:fs";
import path from "node:path";
import Markdoc, { type Config, type Node, type RenderableTreeNode } from "@markdoc/markdoc";
import YAML from "yaml";

/**
 * /learn topic lessons. Source: content/learn/{subject}/{topic}/index.mdoc, produced by the
 * RAG lesson generator (galenai-agents/tools/lessons) and copied in after review.
 * Images live in public/learn-images/{subject}/{topic}/. The optional app_link.json beside
 * a lesson holds the competency text and the in-app question bank link for that competency.
 *
 * Publishing gate: a lesson renders at its URL either way (so it can be checked in place),
 * but it is noindex, carries a draft banner and stays out of the sitemap until
 * `is_published: true` is set after faculty sign-off.
 */

const ROOT = path.join(process.cwd(), "content", "learn");

export const SUBJECTS: Record<string, { name: string; blurb: string }> = {
  anatomy: { name: "Anatomy", blurb: "Gross anatomy, neuroanatomy, embryology and histology." },
  physiology: { name: "Physiology", blurb: "How each system works, from the cell to the whole body." },
  biochemistry: { name: "Biochemistry", blurb: "Metabolism, enzymes, molecular biology and clinical chemistry." },
  pathology: { name: "Pathology", blurb: "General and systemic pathology: how disease changes cells and organs." },
  microbiology: { name: "Microbiology", blurb: "Bacteria, viruses, fungi, parasites, immunity and lab diagnosis." },
  pharmacology: { name: "Pharmacology", blurb: "How drugs act, and how they are used safely." },
};

export type LessonMeta = {
  subject: string;
  topic: string;
  path: string;
  title: string;
  subtitle: string;
  excerpt: string;
  phase: string;
  region: string;
  cbmeCodes: string[];
  competencyText: string;
  appPracticeUrl: string;
  authorName: string;
  publishDate: string;
  reviewedBy: string;
  reviewedOn: string;
  isPublished: boolean;
  sources: string[];
  metaTitle: string;
  metaDescription: string;
  primaryKeyword: string;
};

export type Lesson = {
  meta: LessonMeta;
  html: string;
  toc: { id: string; text: string }[];
  imageCount: number;
  words: number;
};

const str = (v: unknown) => (v == null ? "" : String(v));

function readSource(subject: string, topic: string) {
  const dir = path.join(ROOT, subject, topic);
  const file = path.join(dir, "index.mdoc");
  if (!fs.existsSync(file)) return null;
  const source = fs.readFileSync(file, "utf-8");
  let app: Record<string, string> = {};
  const appFile = path.join(dir, "app_link.json");
  if (fs.existsSync(appFile)) {
    try {
      app = JSON.parse(fs.readFileSync(appFile, "utf-8"));
    } catch {
      app = {};
    }
  }
  return { source, app };
}

function toMeta(subject: string, topic: string, fm: Record<string, unknown>, app: Record<string, string>): LessonMeta {
  const codes = Array.isArray(fm.cbme_codes) ? (fm.cbme_codes as unknown[]).map(str).filter(Boolean) : [];
  return {
    subject,
    topic,
    path: `/learn/${subject}/${topic}`,
    title: str(fm.title),
    subtitle: str(fm.subtitle),
    excerpt: str(fm.excerpt),
    phase: str(fm.phase),
    region: str(fm.region),
    cbmeCodes: codes,
    competencyText: str(app.competency_text),
    appPracticeUrl: str(app.app_link),
    authorName: str(fm.author_name) || "Team GalenAI",
    publishDate: str(fm.publish_date),
    reviewedBy: str(fm.reviewed_by),
    reviewedOn: str(fm.reviewed_on),
    isPublished: fm.is_published === true,
    sources: Array.isArray(fm.sources) ? (fm.sources as unknown[]).map(str) : [],
    metaTitle: str(fm.meta_title),
    metaDescription: str(fm.meta_description) || str(fm.excerpt),
    primaryKeyword: str(fm.primary_keyword),
  };
}

/** Every lesson on disk, published or not. */
export function getAllLessons(): LessonMeta[] {
  if (!fs.existsSync(ROOT)) return [];
  const out: LessonMeta[] = [];
  for (const subject of fs.readdirSync(ROOT)) {
    const sdir = path.join(ROOT, subject);
    if (!fs.statSync(sdir).isDirectory()) continue;
    for (const topic of fs.readdirSync(sdir)) {
      const src = readSource(subject, topic);
      if (!src) continue;
      const ast = Markdoc.parse(src.source);
      const fm = (YAML.parse(ast.attributes.frontmatter ?? "") ?? {}) as Record<string, unknown>;
      out.push(toMeta(subject, topic, fm, src.app));
    }
  }
  const order = Object.keys(SUBJECTS);
  return out.sort(
    (a, b) => order.indexOf(a.subject) - order.indexOf(b.subject) || a.title.localeCompare(b.title)
  );
}

export const subjectName = (s: string) => SUBJECTS[s]?.name ?? s.charAt(0).toUpperCase() + s.slice(1);

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const textOf = (n: RenderableTreeNode): string =>
  typeof n === "string"
    ? n
    : n && typeof n === "object" && "children" in n
      ? ((n as { children: RenderableTreeNode[] }).children ?? []).map(textOf).join("")
      : "";

function buildConfig(known: Map<string, string>): Config {
  const T = (name: string, attrs: Record<string, unknown>, kids: RenderableTreeNode[] = []) =>
    new Markdoc.Tag(name, attrs, kids);

  return {
    nodes: {
      heading: {
        children: ["inline"],
        attributes: { level: { type: Number, required: true } },
        transform(node: Node, config: Config) {
          const kids = node.transformChildren(config);
          const level = node.attributes.level as number;
          const id = slugify(kids.map(textOf).join(" "));
          return T(`h${level}`, { id }, kids);
        },
      },
      table: {
        transform(node: Node, config: Config) {
          return T("div", { class: "ltable" }, [T("table", {}, node.transformChildren(config))]);
        },
      },
    },
    tags: {
      callout: {
        attributes: { type: { type: String, default: "tip" } },
        transform(node: Node, config: Config) {
          const a = node.transformAttributes(config);
          return T("div", { class: `lcallout lcallout-${a.type}` }, node.transformChildren(config));
        },
      },
      // Competency codes are shown in the lesson header, not in the body.
      cbmeTags: {
        selfClosing: true,
        attributes: { codes: { type: String }, phase: { type: String } },
        transform() {
          return null;
        },
      },
      figure: {
        selfClosing: true,
        attributes: {
          src: { type: String, required: true },
          alt: { type: String, default: "" },
          caption: { type: String, default: "" },
          credit: { type: String, default: "" },
          license: { type: String, default: "" },
          source: { type: String, default: "" },
          width: { type: String },
          height: { type: String },
        },
        transform(node: Node, config: Config) {
          const a = node.transformAttributes(config);
          const cap: RenderableTreeNode[] = [];
          if (a.caption) cap.push(T("span", { class: "lfig-cap" }, [a.caption]));
          if (a.credit)
            cap.push(
              T("span", { class: "lfig-credit" }, [
                a.source ? T("a", { href: a.source, rel: "noopener", target: "_blank" }, [a.credit]) : a.credit,
              ])
            );
          return T("figure", { class: "lfig" }, [
            T("img", { src: a.src, alt: a.alt, width: a.width, height: a.height, loading: "lazy", decoding: "async" }),
            T("figcaption", {}, cap),
          ]);
        },
      },
      mcq: {
        attributes: { answer: { type: String, required: true }, explanation: { type: String, default: "" } },
        transform(node: Node, config: Config) {
          const a = node.transformAttributes(config);
          return T("section", { class: "lmcq", "data-answer": String(a.answer).trim().toUpperCase() }, [
            ...node.transformChildren(config),
            T("details", { class: "lmcq-reveal" }, [
              T("summary", {}, ["Show answer"]),
              T("p", {}, [T("strong", {}, [`Answer: ${a.answer}. `]), a.explanation]),
            ]),
          ]);
        },
      },
      viva: {
        attributes: { question: { type: String, required: true } },
        transform(node: Node, config: Config) {
          const a = node.transformAttributes(config);
          return T("details", { class: "lviva" }, [
            T("summary", {}, [a.question]),
            T("div", { class: "lviva-a" }, node.transformChildren(config)),
          ]);
        },
      },
      flashcard: {
        selfClosing: true,
        attributes: { front: { type: String, required: true }, back: { type: String, required: true } },
        transform(node: Node, config: Config) {
          const a = node.transformAttributes(config);
          return T("button", { type: "button", class: "lflash", "aria-pressed": "false" }, [
            T("span", { class: "lflash-front" }, [a.front]),
            T("span", { class: "lflash-back" }, [a.back]),
          ]);
        },
      },
      related: {
        selfClosing: true,
        attributes: { links: { type: String, default: "" } },
        transform(node: Node, config: Config) {
          const a = node.transformAttributes(config);
          const items = String(a.links)
            .split(",")
            .map((s) => s.trim())
            .filter((href) => known.has(href))
            .map((href) => T("li", {}, [T("a", { href }, [known.get(href) as string])]));
          if (!items.length) return null;
          return T("nav", { class: "lrelated", "aria-label": "Related lessons" }, [
            T("p", { class: "lrelated-h" }, ["Related"]),
            T("ul", {}, items),
          ]);
        },
      },
      cta: {
        transform(node: Node, config: Config) {
          return T("div", { class: "lcta" }, node.transformChildren(config));
        },
      },
    },
  };
}

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** In-app practice card placed straight after the lesson's last MCQ. */
function practiceCard(m: LessonMeta): string {
  if (!m.appPracticeUrl) return "";
  const code = m.cbmeCodes[0] ? `<span class="lpractice-code">${esc(m.cbmeCodes[0])}</span>` : "";
  const what = m.competencyText ? `<p class="lpractice-comp">${esc(m.competencyText)}</p>` : "";
  return (
    `<aside class="lpractice">${code}<p class="lpractice-h">Practise more ${esc(m.title.toLowerCase())} questions in the app</p>` +
    `${what}<a class="btn btn-primary" href="${esc(m.appPracticeUrl)}" rel="noopener">Open the question bank</a></aside>`
  );
}

export function getLesson(subject: string, topic: string): Lesson | null {
  const src = readSource(subject, topic);
  if (!src) return null;
  const all = getAllLessons();
  const known = new Map<string, string>(all.map((l) => [l.path, l.title]));
  for (const s of new Set(all.map((l) => l.subject))) known.set(`/learn/${s}`, `All ${subjectName(s).toLowerCase()} lessons`);

  const ast = Markdoc.parse(src.source);
  const fm = (YAML.parse(ast.attributes.frontmatter ?? "") ?? {}) as Record<string, unknown>;
  const meta = toMeta(subject, topic, fm, src.app);
  const tree = Markdoc.transform(ast, buildConfig(known));
  let html = Markdoc.renderers.html(tree);

  const card = practiceCard(meta);
  const last = html.lastIndexOf("</section>");
  if (card && last !== -1) html = html.slice(0, last + 10) + card + html.slice(last + 10);

  const toc = [...html.matchAll(/<h2 id="([^"]+)">([\s\S]*?)<\/h2>/g)].map((m) => ({
    id: m[1],
    text: m[2].replace(/<[^>]+>/g, ""),
  }));
  const words = html.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
  const imageCount = (html.match(/<figure class="lfig"/g) ?? []).length;
  return { meta, html, toc, imageCount, words };
}
