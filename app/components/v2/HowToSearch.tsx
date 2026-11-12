"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Row = { role: string; label: string; title: string; href: string; text: string };

/** Search across every guide (title + text). Index is built at build time. */
export default function HowToSearch({ index }: { index: Row[] }) {
  const [q, setQ] = useState("");
  const hits = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return [];
    const words = t.split(/\s+/);
    return index
      .filter((r) => words.every((w) => r.title.toLowerCase().includes(w) || r.text.toLowerCase().includes(w)))
      .sort((a, b) => Number(b.title.toLowerCase().includes(t)) - Number(a.title.toLowerCase().includes(t)))
      .slice(0, 8);
  }, [q, index]);

  return (
    <div className="relative max-w-xl">
      <label htmlFor="howto-q" className="sr-only">
        Search the guides
      </label>
      <input
        id="howto-q"
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search: tutor modes, timetable, flashcards…"
        className="w-full rounded-full border-2 border-[#2e2e2e]/15 bg-white px-5 py-3.5 font-medium outline-none focus:border-[#eb602d]"
      />
      {q.trim() && (
        <ul className="absolute inset-x-0 top-full z-20 mt-2 max-h-[60vh] overflow-auto rounded-2xl border border-black/10 bg-white p-2 shadow-xl">
          {hits.length === 0 && <li className="p-3 text-sm opacity-70">No guide matches that yet.</li>}
          {hits.map((h) => (
            <li key={h.href}>
              <Link href={h.href} className="flex items-baseline gap-3 rounded-xl p-3 hover:bg-[#fff0e4]">
                <small className="w-24 shrink-0 text-[11px] font-bold uppercase tracking-wider text-[#c94d20]">{h.label}</small>
                <span className="font-semibold">{h.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
