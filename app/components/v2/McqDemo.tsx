"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/analytics";
import CtaLink from "./CtaLink";

/**
 * One interactive MCQ from the question bank. Question, options and explanation are
 * from the approved How to Use page (screen s_qb_ans, PY5.7). After answering, the
 * CTA invites the student to the rest of the bank.
 */
export const SAMPLE_MCQ = {
  code: "PY5.7",
  stem: "The second heart sound (S2) is produced by:",
  options: ["Closure of semilunar valves", "Closure of AV valves", "Opening of semilunar valves", "Rapid ventricular filling"],
  correct: 0,
  explanation:
    "S2 marks the end of systole: the aortic and pulmonary (semilunar) valves close as ventricular pressure falls below arterial pressure.",
};

const Q = SAMPLE_MCQ;

export default function McqDemo({ source }: { source: string }) {
  const [pick, setPick] = useState<number | null>(null);
  const done = pick !== null;

  return (
    <div className="mcq-demo mx-auto max-w-2xl p-6 md:p-8">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#c94d20]">{Q.code} · Heart sounds</p>
      <p className="h3 mt-3 !text-xl">{Q.stem}</p>
      <ul className="mt-5 space-y-2.5" role="radiogroup" aria-label="Answer options">
        {Q.options.map((o, i) => {
          const isCorrect = i === Q.correct;
          const state = !done ? "idle" : isCorrect ? "correct" : i === pick ? "wrong" : "dim";
          return (
            <li key={o}>
              <button
                type="button"
                role="radio"
                aria-checked={pick === i}
                disabled={done}
                onClick={() => {
                  setPick(i);
                  trackEvent("demo_interaction", { source, demo: "mcq", correct: i === Q.correct });
                }}
                className={`flex w-full items-center gap-3 rounded-xl border-2 px-4 py-3 text-left font-semibold transition-colors ${
                  state === "idle"
                    ? "border-[#2e2e2e]/15 bg-[#fffaf5] hover:border-[#eb602d]"
                    : state === "correct"
                      ? "border-[#2f7a4f] bg-[#e3f4ea]"
                      : state === "wrong"
                        ? "border-[#c94d20] bg-[#fde6e1]"
                        : "border-[#2e2e2e]/10 opacity-60"
                }`}
              >
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#2e2e2e]/5 text-sm font-bold">
                  {String.fromCharCode(65 + i)}
                </span>
                {o}
                {state === "correct" && <span className="ml-auto text-xs font-bold uppercase text-[#2f7a4f]">Correct</span>}
                {state === "wrong" && <span className="ml-auto text-xs font-bold uppercase text-[#c94d20]">Your pick</span>}
              </button>
            </li>
          );
        })}
      </ul>
      <div aria-live="polite">
        {done && (
          <div className="mt-5 animate-[fadeUp_.3s_ease-out]">
            <p className="h3">{pick === Q.correct ? "Correct." : "Not quite."}</p>
            <p className="mt-1" style={{ color: "var(--body)" }}>
              {Q.explanation}
            </p>
            <div className="mt-5">
              <CtaLink intent="download" source={source} label="Get the rest in the app" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
