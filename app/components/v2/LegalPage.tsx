import Link from "next/link";
import type { ReactNode } from "react";
import { breadcrumbLd } from "@/lib/seo";
import JsonLd from "./JsonLd";
import { Breadcrumbs, Kicker } from "./ui";

/**
 * Layout for /privacy and /terms: a cream header, then the document on the lighter reading tone with a
 * pinned "On this page" list beside it (a fold-out on phones). The document text is legal copy:
 * change it only when the policy itself changes.
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
  const other = path === "/privacy" ? { href: "/terms", label: "Terms of use" } : { href: "/privacy", label: "Privacy policy" };
  const list = (
    <ol className="legal-toc">
      {toc.map((t) => (
        <li key={t.id}>
          <a href={`#${t.id}`}>{t.text}</a>
        </li>
      ))}
    </ol>
  );
  return (
    <div className="v2 lesson exam">
      <JsonLd data={breadcrumbLd(trail)} />
      <header className="wrap exam-head">
        <Breadcrumbs trail={trail} />
        <Kicker>Legal</Kicker>
        <h1 className="h1 mt-5 !text-[clamp(2.4rem,5.4vw,4rem)]">
          {title} <span className="acc">{accent}</span>
        </h1>
      </header>
      <div className="exam-band">
        <div className="wrap exam-grid">
          <aside className="exam-side">
            <nav aria-label="On this page">
              <p className="exam-nav-h">On this page</p>
              {list}
            </nav>
            <p className="legal-other">
              <span className="exam-nav-h">Also read</span>
              <Link href={other.href} className="vs-link">
                {other.label} <span aria-hidden>→</span>
              </Link>
            </p>
          </aside>
          <details className="exam-fold">
            <summary>
              On this page
              <span aria-hidden className="faq-plus" />
            </summary>
            {list}
          </details>
          <div className="exam-main">
            <article className="lesson-body exam-body legal-body">{children}</article>
            <p className="exam-source">
              <span className="exam-source-h">Also read</span>
              <Link href={other.href}>{other.label}</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
