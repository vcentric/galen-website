"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { EXAM_GUIDE } from "@/lib/exams";

type Sec = { id: string; text: string };

/**
 * Side menu for the exam guides: every page of the guide in reading order, with the current
 * page's own sections listed under it (read from the article's h2 headings) and the section
 * in view marked. The same links are plain anchors, so they work without scripts.
 */
export default function ExamNav({ path }: { path: string }) {
  const [secs, setSecs] = useState<Sec[]>([]);
  const [here, setHere] = useState("");

  useEffect(() => {
    const heads = [...document.querySelectorAll<HTMLElement>(".exam-body h2")];
    heads.forEach((h, i) => {
      if (!h.id) h.id = `s${i + 1}-${(h.textContent ?? "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40)}`;
    });
    const raf = requestAnimationFrame(() => setSecs(heads.map((h) => ({ id: h.id, text: h.textContent ?? "" }))));
    const io = new IntersectionObserver(
      (es) => {
        const top = es.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (top) setHere(top.target.id);
      },
      { rootMargin: "-15% 0px -70% 0px" },
    );
    heads.forEach((h) => io.observe(h));
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [path]);

  return (
    <nav aria-label="Exam guides" className="exam-nav">
      {EXAM_GUIDE.map((g) => (
        <div key={g.group}>
          <p className="exam-nav-h">{g.group}</p>
          <ol>
            {g.pages.map((p, i) => {
              const current = p.path === path;
              return (
                <li key={p.path}>
                  <Link href={p.path} aria-current={current ? "page" : undefined} className="exam-nav-a">
                    <span>{String(i + 1).padStart(2, "0")}</span>
                    {p.label}
                  </Link>
                  {current && secs.length > 1 && (
                    <ul className="exam-nav-secs">
                      {secs.map((s) => (
                        <li key={s.id}>
                          <a href={`#${s.id}`} data-here={s.id === here ? "" : undefined}>
                            {s.text}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      ))}
    </nav>
  );
}
