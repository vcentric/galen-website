import Link from "next/link";
import type { ReactNode } from "react";
import { EXAM_GUIDE } from "@/lib/exams";
import ExamNav from "./ExamNav";
import { Breadcrumbs } from "./ui";

/** Shared pieces for the /exams guide pages. Every fact on these pages must come from the official bulletin cited in `source`. */
export function ExamHeader({
  kick,
  title,
  lead,
  trail,
  children,
}: {
  kick: string;
  title: ReactNode;
  lead: string;
  trail?: { name: string; path: string }[];
  children?: ReactNode;
}) {
  return (
    <header className="wrap exam-head">
      {trail && <Breadcrumbs trail={trail} />}
      <p className="kick">{kick}</p>
      <h1 className="h1 mt-5 max-w-[20ch] !text-[clamp(2.4rem,5.4vw,4rem)]">{title}</h1>
      <p className="lead mt-6">{lead}</p>
      {children}
    </header>
  );
}

/**
 * The reading layout shared by every guide page: the guide menu beside the article on wide screens
 * (a fold-out above it on phones), then the source note and the next/previous links.
 */
export function ExamBody({ path, source, plain, children }: { path: string; source?: ReactNode; plain?: boolean; children: ReactNode }) {
  const flat = EXAM_GUIDE.flatMap((g) => g.pages.map((p) => ({ ...p, group: g.group })));
  const i = flat.findIndex((p) => p.path === path);
  const prev = i > 0 && flat[i - 1].group === flat[i].group ? flat[i - 1] : null;
  const next = i >= 0 && i < flat.length - 1 && flat[i + 1].group === flat[i].group ? flat[i + 1] : null;
  return (
    <div className="exam-band">
    <div className="wrap exam-grid">
      <aside className="exam-side">
        <ExamNav path={path} />
      </aside>
      <details className="exam-fold">
        <summary>
          In this guide
          <span aria-hidden className="faq-plus" />
        </summary>
        <ExamNav path={path} />
      </details>
      <div className="exam-main">
        {plain ? children : <article className="lesson-body exam-body">{children}</article>}
        {source}
        {(prev || next) && (
          <nav aria-label="Guide pages" className="exam-pager">
            {prev ? (
              <Link href={prev.path} className="exam-pager-a">
                <span>
                  <span aria-hidden>←</span> Previous
                </span>
                <b>{prev.label}</b>
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link href={next.path} className="exam-pager-a exam-pager-next">
                <span>
                  Next <span aria-hidden>→</span>
                </span>
                <b>{next.label}</b>
              </Link>
            )}
          </nav>
        )}
      </div>
    </div>
    </div>
  );
}

export function FactTable({ rows }: { rows: [string, ReactNode][] }) {
  return (
    <div className="ltable">
      <table>
        <tbody>
          {rows.map(([k, v]) => (
            <tr key={k}>
              <th scope="row">{k}</th>
              <td>{v}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function VerifiedBox({ source, href, pages, verified, note }: { source: string; href: string; pages: string; verified: string; note: string }) {
  return (
    <div className="exam-source">
      <p className="exam-source-h">Source and last check</p>
      <ul>
        <li>
          Official source: <a href={href} rel="noopener">{source}</a> ({pages}).
        </li>
        <li>Last verified against the bulletin: {verified}.</li>
        <li>{note}</li>
      </ul>
    </div>
  );
}

/** Shown on every NEET PG page: the 2027 bulletin is not out, so the 2026 bulletin is the latest official source. */
export function StatusBanner({ checked }: { checked: string }) {
  return (
    <p className="exam-status" role="note">
      <b>NEET PG 2027 status.</b> As of {checked}, we could not find an NBEMS information bulletin or exam date for NEET PG 2027. This page
      uses the NEET PG 2026 bulletin, the latest official document, to show how a cycle works. Dates, fees and rules for 2027 may differ. Check
      natboard.edu.in before you rely on any date.
    </p>
  );
}

export function GuideLinks({ items }: { items: [string, string][] }) {
  return (
    <ul>
      {items.map(([label, href]) => (
        <li key={href}>
          <a href={href}>{label}</a>
        </li>
      ))}
    </ul>
  );
}
