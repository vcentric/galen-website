"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { PracticeMcq } from "@/lib/learn";

type Subject = { key: string; name: string };

/** Practice runner: pick a subject, answer one MCQ at a time, see the explanation and a running score. */
export default function McqPractice({ mcqs, subjects }: { mcqs: PracticeMcq[]; subjects: Subject[] }) {
  const [subject, setSubject] = useState("all");
  const [seed, setSeed] = useState(1);
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState({ right: 0, done: 0 });

  const deck = useMemo(() => {
    const pool = mcqs.filter((q) => subject === "all" || q.subject === subject);
    let s = seed * 9301 + 49297;
    const rnd = () => ((s = (s * 9301 + 49297) % 233280) / 233280);
    return [...pool].sort(() => rnd() - 0.5);
  }, [mcqs, subject, seed]);

  const q = deck[i];
  const reset = (sub: string) => {
    setSubject(sub);
    setI(0);
    setPicked(null);
    setScore({ right: 0, done: 0 });
    setSeed((x) => x + 1);
  };
  const letter = (o: string) => o.match(/^([A-E])[.)]/)?.[1] ?? "";
  const pick = (l: string) => {
    if (picked || !q) return;
    setPicked(l);
    setScore((s) => ({ right: s.right + (l === q.answer ? 1 : 0), done: s.done + 1 }));
  };

  return (
    <div className="lesson-body" style={{ maxWidth: "46rem" }}>
      <div className="lesson-chips" role="tablist" aria-label="Subject">
        {[{ key: "all", name: "All subjects" }, ...subjects].map((s) => (
          <button key={s.key} type="button" className={`lesson-chip${subject === s.key ? " lesson-chip-code" : ""}`} onClick={() => reset(s.key)}>
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
        <section className={`lmcq${picked ? " done" : ""}`} data-answer={q.answer}>
          <p className="lmcq-stem">
            <strong>
              Question {i + 1} of {deck.length}.
            </strong>{" "}
            {q.stem}
          </p>
          <ul>
            {q.options.map((o) => {
              const l = letter(o);
              const cls = picked ? (l === q.answer ? "right" : l === picked ? "wrong" : "") : "";
              return (
                <li key={o} className={cls} role="button" tabIndex={0} onClick={() => pick(l)} onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), pick(l))}>
                  {o}
                </li>
              );
            })}
          </ul>
          {picked && (
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
                  <Link href="/download">Practise more in the app</Link>
                )}
              </p>
            </div>
          )}
          <div className="mt-5 flex gap-3">
            <button type="button" className="btn btn-primary" disabled={!picked || i + 1 >= deck.length} onClick={() => (setI(i + 1), setPicked(null))}>
              Next question
            </button>
            <button type="button" className="btn" onClick={() => reset(subject)}>
              Shuffle
            </button>
          </div>
        </section>
      )}
    </div>
  );
}
