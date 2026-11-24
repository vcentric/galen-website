"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

export type HelpGuide = { href: string; title: string; description: string; text: string };
export type HelpRole = { id: string; label: string; blurb: string; where: string; whereHref: string; guides: HelpGuide[] };

/**
 * The help centre hub: one search that filters every guide as you type (it searches the guide
 * text too, not only titles), then each role's guides as a ruled list. Every link is in the page
 * from the start; filtering only hides rows.
 */
export default function HowToIndex({ roles }: { roles: HelpRole[] }) {
  const [q, setQ] = useState("");
  const words = useMemo(() => q.trim().toLowerCase().split(/\s+/).filter(Boolean), [q]);
  const match = (g: HelpGuide) => {
    const hay = `${g.title} ${g.description} ${g.text}`.toLowerCase();
    return words.every((w) => hay.includes(w));
  };
  const total = roles.reduce((n, r) => n + r.guides.length, 0);
  const shown = words.length ? roles.reduce((n, r) => n + r.guides.filter(match).length, 0) : total;

  return (
    <>
      <div className="wrap">
        <div className="lidx-bar">
          <div className="lidx-search">
            <label htmlFor="howto-q" className="sr-only">
              Search the guides
            </label>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden>
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-3.5-3.5" />
            </svg>
            <input id="howto-q" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search the guides" autoComplete="off" />
          </div>
          <nav aria-label="Roles" className="lidx-jump">
            {roles.map((r) => (
              <a key={r.id} href={`#${r.id}`}>
                {r.label}
                <span>{r.guides.length}</span>
              </a>
            ))}
          </nav>
        </div>
        <p className="lidx-count help-count" aria-live="polite">
          {words.length ? `${shown} of ${total} guides match` : `${total} guides for ${roles.length} roles`}
        </p>
      </div>

      <div className="exam-band help-band">
        {roles.map((r, i) => {
          const hits = r.guides.filter(match);
          return (
            <section key={r.id} id={r.id} className="wrap lidx-grid help-sec" hidden={hits.length === 0}>
              <header className="lidx-head">
                <span className="happening-n">{String(i + 1).padStart(2, "0")}</span>
                <h2 className="lidx-name">
                  For <span className="acc">{r.label.toLowerCase()}</span>
                </h2>
                <p className="lidx-blurb">{r.blurb}</p>
                <p className="help-where">
                  Used at{" "}
                  <a href={r.whereHref} rel="noopener">
                    {r.where}
                  </a>
                </p>
                <Link href={`/how-to-use/${r.id}`} className="btn btn-ghost mt-6 !min-h-11 !px-5 !text-sm">
                  Start here
                </Link>
              </header>
              <ol className="lidx-list">
                {r.guides.map((g) => (
                  <li key={g.href} hidden={!match(g)}>
                    <Link href={g.href} className="lidx-row">
                      <span className="lidx-main">
                        <span className="lidx-title">{g.title}</span>
                        <span className="lidx-sub">{g.description}</span>
                      </span>
                      <span />
                      <span aria-hidden className="lidx-go">
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ol>
            </section>
          );
        })}
        {shown === 0 && (
          <div className="wrap lidx-empty">
            <p className="h3">No guide matches “{q.trim()}” yet.</p>
            <button type="button" className="btn btn-ghost mt-5" onClick={() => setQ("")}>
              Show all guides
            </button>
          </div>
        )}
      </div>
    </>
  );
}
