import type { ReactNode } from "react";

/** Shared pieces for the /exams guide pages. Every fact on these pages must come from the official bulletin cited in `source`. */
export function ExamHeader({ kick, title, lead, children }: { kick: string; title: ReactNode; lead: string; children?: ReactNode }) {
  return (
    <header className="wrap pt-28 pb-8 md:pt-32">
      <p className="kick">{kick}</p>
      <h1 className="h1 mt-5 max-w-[20ch]">{title}</h1>
      <p className="lead mt-6">{lead}</p>
      {children}
    </header>
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
    <div className="lesson-sources">
      <p className="lesson-toc-h">Source and last check</p>
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
    <p className="lesson-draft" role="note">
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
