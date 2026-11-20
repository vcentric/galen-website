import type { ReactNode } from "react";
import { breadcrumbLd } from "@/lib/seo";
import JsonLd from "./JsonLd";
import { Breadcrumbs, Kicker } from "./ui";

/**
 * Layout for /privacy and /terms: headline, the document in a readable column, and an
 * "On this page" rail on desktop. The document text is legal copy: change it only when
 * the policy itself changes.
 */
export default function LegalPage({
  title,
  accent,
  path,
  toc,
  children,
}: {
  title: string; // headline without the accent
  accent: string; // the one orange word
  path: string;
  toc: { id: string; text: string }[];
  children: ReactNode;
}) {
  const trail = [
    { name: "Home", path: "/" },
    { name: `${title} ${accent}`.replace(/\.$/, ""), path },
  ];
  return (
    <div className="v2 lesson" data-tone="neutral">
      <JsonLd data={breadcrumbLd(trail)} />
      <header className="wrap pt-24 pb-8 md:pt-28">
        <Breadcrumbs trail={trail} />
        <Kicker>Legal</Kicker>
        <h1 className="h1 mt-5">
          {title} <span className="acc">{accent}</span>
        </h1>
      </header>
      <div className="wrap lesson-grid pb-20">
        <article className="lesson-body">{children}</article>
        <aside className="lesson-side">
          <div className="lesson-side-inner">
            <nav className="lesson-toc" aria-label="On this page">
              <p className="lesson-toc-h">On this page</p>
              <ol>
                {toc.map((t) => (
                  <li key={t.id}>
                    <a href={`#${t.id}`}>{t.text}</a>
                  </li>
                ))}
              </ol>
            </nav>
          </div>
        </aside>
      </div>
    </div>
  );
}
