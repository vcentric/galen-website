import { getAllPostsMeta } from "@/lib/posts";
import { SITE } from "@/lib/site";

export const dynamic = "force-static";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** RSS feed of published articles. Feed readers, news aggregators and some AI crawlers discover new posts here. */
export async function GET() {
  const posts = await getAllPostsMeta();
  const items = posts
    .map((p) => {
      const url = `${SITE.url}/blog/${p.slug}`;
      return [
        "<item>",
        `<title>${esc(p.title)}</title>`,
        `<link>${url}</link>`,
        `<guid isPermaLink="true">${url}</guid>`,
        `<pubDate>${new Date(p.date).toUTCString()}</pubDate>`,
        `<description>${esc(p.metaDescription || p.excerpt || "")}</description>`,
        p.category ? `<category>${esc(p.category)}</category>` : "",
        "</item>",
      ].join("");
    })
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
<title>GalenAI articles</title>
<link>${SITE.url}/blog</link>
<atom:link href="${SITE.url}/blog/rss.xml" rel="self" type="application/rss+xml" />
<description>Articles for medical students and faculty on exam preparation, CBME and AI in medicine.</description>
<language>en</language>
${items}
</channel>
</rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
