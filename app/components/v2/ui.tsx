import Link from "next/link";
import type { ReactNode } from "react";
import type { Faq } from "@/content/site/types";

/** Small server-side primitives. Styles live in app/v2.css under .v2 */

export function Kicker({ children }: { children: ReactNode }) {
  return <p className="kick">{children}</p>;
}

/** Headline with exactly one orange phrase at the end (design system rule). */
export function Headline({
  text,
  accent,
  as: Tag = "h1",
}: {
  text: string;
  accent?: string;
  as?: "h1" | "h2";
}) {
  return (
    <Tag className={Tag === "h1" ? "h1" : "h2"}>
      {text} {accent ? <span className="acc">{accent}</span> : null}
    </Tag>
  );
}

export function Section({ id, tone, children }: { id?: string; tone?: "dark"; children: ReactNode }) {
  return (
    <section id={id} className={`sec ${tone === "dark" ? "tone-dark" : ""}`}>
      <div className="wrap">{children}</div>
    </section>
  );
}

export function Breadcrumbs({ trail }: { trail: { name: string; path: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm font-semibold opacity-70 mb-6">
      <ol className="flex flex-wrap gap-x-2">
        {trail.map((t, i) => (
          <li key={t.path} className="flex gap-x-2">
            {i > 0 && <span aria-hidden>/</span>}
            {i < trail.length - 1 ? (
              <Link href={t.path}>{t.name}</Link>
            ) : (
              <span aria-current="page">{t.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Native <details>: zero JS, accessible, and the answer text is in the HTML for crawlers. Styles: .faq-* in v2.css. */
export function FaqBlock({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="max-w-3xl">
      {faqs.map((f) => (
        <details key={f.q} className="faq-item">
          <summary className="faq-q h3">
            {f.q}
            <span aria-hidden className="faq-plus" />
          </summary>
          <p className="faq-a">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

/** Placeholder for a section that is specified but not built yet. */
export function Blueprint({ kind, notes }: { kind: string; notes: string }) {
  return (
    <div className="blueprint">
      <b>To build · {kind}</b>
      <p className="mt-1">{notes}</p>
    </div>
  );
}
