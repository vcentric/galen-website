"use client";

import { useMemo, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { AppLink } from "./CtaLink";
import type { PracticeMcq } from "@/lib/learn";

type Subject = { key: string; name: string };

/** Seeded Fisher-Yates shuffle so server and client agree on the first paint (unshuffled) and shuffling happens after mount. */
function shuffled<T>(arr: T[], seed: number): T[] {
  const a = [...arr];
  let s = (seed * 9301 + 49297) % 233280;
  const rnd = () => ((s = (s * 9301 + 49297) % 233280) / 233280);
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const letterOf = (o: string) => o.match(/^([A-E])[.)]/)?.[1] ?? "";

// Shuffle seed for this page load: 0 on the server and during hydration (unshuffled), a fixed random value afterwards.
let loadSeed = 0;
const getLoadSeed = () => (loadSeed ||= Date.now() % 100000 || 1);
const noSubscribe = () => () => {};

/** Practice runner: pick a subject, answer one MCQ at a time, see the explanation and a running score. */
export default function McqPractice({ mcqs, subjects }: { mcqs: PracticeMcq[]; subjects: Subject[] }) {
  const [subject, setSubject] = useState("all");
  const base = useSyncExternalStore(noSubscribe, getLoadSeed, () => 0); // 0 = unshuffled first paint
  const [reshuffles, setReshuffles] = useState(0);
  const seed = base ? base + reshuffles : 0;
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState({ right: 0, done: 0 });
  const heading = useRef<HTMLParagraphElement>(null);

  const deck = useMemo(() => {
    const pool = mcqs.filter((q) => subject === "all" || q.subject === subject);
    return seed ? shuffled(pool, seed) : pool;
  }, [mcqs, subject, seed]);

  const q = deck[i];
  const finished = !!q && picked !== null && i + 1 >= deck.length;

  const reset = (sub: string) => {
    setSubject(sub);
    setI(0);
    setPicked(null);
    setScore({ right: 0, done: 0 });
    setReshuffles((n) => n + 1);
  };
  const pick = (l: string) => {
    if (picked !== null || !q || !l) return;
    setPicked(l);
    setScore((s) => ({ right: s.right + (l === q.answer ? 1 : 0), done: s.done + 1 }));
  };
  const next = () => {
    setI((n) => n + 1);
    setPicked(null);
    requestAnimationFrame(() => heading.current?.focus());
  };

  return (
    <div className="lesson-body" style={{ maxWidth: "46rem" }}>
      <div className="lesson-chips" role="group" aria-label="Subject">
        {[{ key: "all", name: "All subjects" }, ...subjects].map((s) => (
          <button
            key={s.key}
            type="button"
            className={`lesson-chip${subject === s.key ? " lesson-chip-code" : ""}`}
            aria-pressed={subject === s.key}
            onClick={() => reset(s.key)}
          >
            {s.name}
          </button>
        ))}
      </div>
      <p className="lesson-byline mt-4">
        {deck.length} questions · Score {score.right}/{score.done}
      </p>

      {!q ? (
        <p>No questions for this subject yet.</p>
      ) : (
        <section className={`lmcq${picked !== null ? " done" : ""}`} data-answer={q.answer}>
          <p className="lmcq-stem" tabIndex={-1} ref={heading}>
            <strong>
              Question {i + 1} of {deck.length}.
            </strong>{" "}
            {q.stem}
          </p>
          <ul>
            {q.options.map((o) => {
              const l = letterOf(o);
              const cls = picked !== null ? (l === q.answer ? "right" : l === picked ? "wrong" : "") : "";
              return (
                <li
                  key={o}
                  className={cls}
                  role="button"
                  tabIndex={l ? 0 : -1}
                  aria-disabled={picked !== null}
                  onClick={() => pick(l)}
                  onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), pick(l))}
                >
                  {o}
                </li>
              );
            })}
          </ul>
          <div aria-live="polite">
            {picked !== null && (
              <div className="lmcq-reveal" style={{ display: "block" }}>
                <p>
                  <strong>{picked === q.answer ? "Correct." : `Not quite. The answer is ${q.answer}.`}</strong> {q.explanation}
                </p>
                <p>
                  From the lesson <Link href={q.lessonPath}>{q.lesson}</Link>.{" "}
                  {q.appUrl ? (
                    <a href={q.appUrl} rel="noopener">
                      Practise more in the app
                    </a>
                  ) : (
                    <AppLink intent="download" source="mcq_practice_inline">Practise more in the app</AppLink>
                  )}
                </p>
              </div>
            )}
          </div>
          {finished ? (
            <div className="lmcq-reveal" style={{ display: "block" }}>
              <p>
                <strong>
                  Finished: you scored {score.right} out of {score.done}.
                </strong>
              </p>
              <button type="button" className="btn btn-primary" onClick={() => reset(subject)}>
                Start again
              </button>
            </div>
          ) : (
            <div className="mt-5 flex gap-3">
              <button type="button" className="btn btn-primary" disabled={picked === null} onClick={next}>
                Next question
              </button>
              <button type="button" className="btn" onClick={() => reset(subject)}>
                Shuffle
              </button>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
