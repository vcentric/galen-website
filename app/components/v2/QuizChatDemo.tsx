"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/analytics";
import CtaLink from "./CtaLink";
import { SAMPLE_MCQ as Q } from "./McqDemo";

/**
 * A quiz the way it arrives in the tutor chat: the student's request, then a question to answer.
 * Drawn in the app's dark theme. The question, options and reasoning are the approved sample
 * from the How to Use page (shared with McqDemo).
 */
export default function QuizChatDemo({ source, ask }: { source: string; ask: string }) {
  const [pick, setPick] = useState<number | null>(null);
  const done = pick !== null;

  return (
    <div className="qchat">
      <p className="qchat-ask">{ask}</p>
      <div className="qchat-card">
        <p className="qchat-meta">
          <span>Question 1 of 5</span>
          <span>{Q.code}</span>
        </p>
        <p className="qchat-stem">{Q.stem}</p>
        <ul role="radiogroup" aria-label="Answer options" className="qchat-opts">
          {Q.options.map((o, i) => {
            const state = !done ? "idle" : i === Q.correct ? "correct" : i === pick ? "wrong" : "dim";
            return (
              <li key={o}>
                <button
                  type="button"
                  role="radio"
                  aria-checked={pick === i}
                  disabled={done}
                  data-state={state}
                  className="qchat-opt"
                  onClick={() => {
                    setPick(i);
                    trackEvent("demo_interaction", { source, demo: "quiz_chat", correct: i === Q.correct });
                  }}
                >
                  <span className="qchat-letter">{String.fromCharCode(65 + i)}</span>
                  <span className="flex-1">{o}</span>
                  {state === "correct" && <span className="qchat-flag">Correct</span>}
                  {state === "wrong" && <span className="qchat-flag">Your pick</span>}
                </button>
              </li>
            );
          })}
        </ul>
        <div aria-live="polite">
          {done ? (
            <div className="qchat-why">
              <p className="qchat-verdict">{pick === Q.correct ? "Correct." : "Not quite."}</p>
              <p>{Q.explanation}</p>
              <div className="mt-4">
                <CtaLink intent="download" source={source} label="Get the rest in the app" className="!min-h-11 !px-5 !text-sm" />
              </div>
            </div>
          ) : (
            <p className="qchat-hint">Pick an answer.</p>
          )}
        </div>
      </div>
    </div>
  );
}
