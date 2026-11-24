"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { trackEvent } from "@/lib/analytics";

export type IndexLesson = { path: string; title: string; subtitle: string; code?: string; draft?: boolean };
export type IndexSubject = { id: string; name: string; blurb: string; lessons: IndexLesson[] };

/**
 * The /learn hub as an index, like the contents pages of a textbook: one ruled list per subject,
 * with a search that filters every list as you type. Every lesson link is in the page from the
 * start (crawlable); filtering only hides rows.
 */
export default function LessonIndex({ subjects }: { subjects: IndexSubject[] }) {
  const [q, setQ] = useState("");
  const words = useMemo(() => q.trim().toLowerCase().split(/\s+/).filter(Boolean), [q]);
  const match = (l: IndexLesson) => {
    const hay = `${l.title} ${l.subtitle} ${l.code ?? ""}`.toLowerCase();
    return words.every((w) => hay.includes(w));
  };
  const total = subjects.reduce((n, s) => n + s.lessons.length, 0);
  const shown = words.length ? subjects.reduce((n, s) => n + s.lessons.filter(match).length, 0) : total;
  // Report a search once typing pauses, not on every keystroke.
  useEffect(() => {
    const term = q.trim();
    if (term.length < 2) return;
    const id = window.setTimeout(() => trackEvent("site_search", { where: "learn", search_term: term.slice(0, 80), results: shown }), 1200);
    return () => window.clearTimeout(id);
  }, [q, shown]);

  return (
    <>
      <div className="wrap">
        <div className="lidx-bar">
          <div className="lidx-search">
            <label htmlFor="lesson-q" className="sr-only">
              Search the lessons
            </label>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden>
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-3.5-3.5" />
            </svg>
            <input id="lesson-q" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search a topic or NMC code" autoComplete="off" />
          </div>
          <nav aria-label="Subjects" className="lidx-jump">
            {subjects.map((s) => (
              <a key={s.id} href={`#${s.id}`}>
                {s.name}
                <span>{s.lessons.length}</span>
              </a>
            ))}
          </nav>
        </div>
        <p className="lidx-count" aria-live="polite">
          {words.length ? `${shown} of ${total} lessons match` : `${total} lessons in ${subjects.length} subjects`}
        </p>
      </div>

      {subjects.map((s, i) => {
        const hits = s.lessons.filter(match);
        return (
          <section key={s.id} id={s.id} className="lidx-sec" hidden={hits.length === 0}>
            <div className="wrap lidx-grid">
              <header className="lidx-head">
                <span className="happening-n">{String(i + 1).padStart(2, "0")}</span>
                <h2 className="lidx-name">{s.name}</h2>
                <p className="lidx-blurb">{s.blurb}</p>
                <Link href={`/learn/${s.id}`} className="proof-link">
                  All {s.name.toLowerCase()} <span aria-hidden>→</span>
                </Link>
              </header>
              <ul className="lidx-list">
                {s.lessons.map((l) => (
                  <li key={l.path} hidden={!match(l)}>
                    <Link href={l.path} className="lidx-row">
                      <span className="lidx-main">
                        <span className="lidx-title">
                          {l.title}
                          {l.draft && <span className="pill-soon ml-2 align-middle">Draft</span>}
                        </span>
                        <span className="lidx-sub">{l.subtitle}</span>
                      </span>
                      {l.code && <span className="lidx-code">{l.code}</span>}
                      <span aria-hidden className="lidx-go">
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        );
      })}

      {shown === 0 && (
        <div className="wrap lidx-empty">
          <p className="h3">No lesson matches “{q.trim()}” yet.</p>
          <button type="button" className="btn btn-ghost mt-5" onClick={() => setQ("")}>
            Show all lessons
          </button>
        </div>
      )}
    </>
  );
}
