"use client";

import { trackEvent } from "@/lib/analytics";
import Link from "next/link";
import { useState, type ReactNode } from "react";

export type ShelfBook = {
  key: string;
  name: string; // on the spine and the open page
  count?: number; // lessons in the subject; also sets how thick the spine is
  blurb: string;
  items: { title: string; href: string; code?: string }[];
  more?: { label: string; href: string };
  kind?: "exams"; // the one orange spine
};

/**
 * The free library on the home page, as a shelf. Each subject is a book spine, as thick as the
 * number of lessons in it; the chosen book is "open" beside the shelf and lists its lessons with
 * their NMC competency codes. Spines are tabs, the open page is their panel. Every panel is in
 * the HTML (inactive ones are hidden), so every lesson link is there for crawlers.
 * The section heading is passed as children and sits above the shelf, beside the open page.
 */
export default function LibraryShelf({ books, children }: { books: ShelfBook[]; children: ReactNode }) {
  const [open, setOpen] = useState(0);

  return (
    <div className="shelf-wrap">
      <div className="shelf-side">
        <div>{children}</div>
        <div className="shelf" role="tablist" aria-label="Subjects" aria-orientation="horizontal">
          {books.map((b, i) => (
            <button
              key={b.key}
              type="button"
              role="tab"
              id={`shelf-tab-${b.key}`}
              aria-selected={i === open}
              aria-controls={`shelf-panel-${b.key}`}
              onClick={() => {
                trackEvent("ui_select", { component: "library_shelf", choice: b.key });
                setOpen(i);
              }}
              className={`spine ${b.kind === "exams" ? "spine-exams" : ""} ${i === open ? "spine-open" : ""}`}
              style={{ flexGrow: b.count ?? 8 }}
            >
              <span className="spine-name">{b.name}</span>
              {b.count != null && (
                <span className="spine-count" aria-label={`${b.count} lessons`}>
                  {b.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {books.map((b, i) => (
        <div key={b.key} id={`shelf-panel-${b.key}`} role="tabpanel" aria-labelledby={`shelf-tab-${b.key}`} hidden={i !== open} className="page">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h3 className="font-[family-name:var(--font-space-var)] text-[clamp(1.75rem,3.4vw,2.4rem)] font-bold leading-none tracking-[-0.04em]">{b.name}</h3>
            {b.count != null && <p className="text-sm font-bold text-[#c94d20]">{b.count} lessons</p>}
          </div>
          <p className="mt-2 text-[0.95rem] font-medium leading-snug" style={{ color: "var(--body)" }}>
            {b.blurb}
          </p>
          <ul className="page-list">
            {b.items.map((it) => (
              <li key={it.href}>
                <Link href={it.href} className="group flex items-center gap-3 py-2.5">
                  {it.code && <span className="page-code">{it.code}</span>}
                  <span className="min-w-0 flex-1 font-semibold group-hover:text-[#c94d20]">{it.title}</span>
                  <span aria-hidden className="text-[#eb602d] opacity-0 transition-opacity group-hover:opacity-100">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          {b.more && (
            <Link href={b.more.href} className="btn btn-ghost mt-5 !min-h-11 !px-5 !text-[0.95rem]">
              {b.more.label}
            </Link>
          )}
        </div>
      ))}
    </div>
  );
}
