"use client";

import { useState } from "react";
import { tutorDemos } from "@/content/site/demos";
import { trackEvent } from "@/lib/analytics";
import CtaLink from "./CtaLink";
import PhoneFrame from "./PhoneFrame";

/**
 * "Try it here": tap a question, the stored answer appears in a coded dark-mode tutor
 * screen. Stored text, not a live model call: instant, offline-safe, always the
 * faculty-checked wording. After the first tap the CTA becomes "Ask your own question".
 */
export default function TutorDemo({ source = "home_try" }: { source?: string }) {
  const [active, setActive] = useState(0);
  const [tapped, setTapped] = useState(false);
  const d = tutorDemos[active];

  const pick = (i: number) => {
    setActive(i);
    setTapped(true);
    trackEvent("demo_interaction", { source, demo: tutorDemos[i].id });
  };

  return (
    <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto] lg:gap-16">
      <div>
        <p className="kick">Try it here</p>
        <h2 className="h2 mt-5">
          Go on. Ask it <span className="acc">something.</span>
        </h2>
        <p className="lead mt-5">Tap a question. This is the answer you get in the app.</p>
        <div className="mt-8 flex flex-col gap-3" role="tablist" aria-label="Sample questions">
          {tutorDemos.map((q, i) => (
            <button
              key={q.id}
              type="button"
              role="tab"
              aria-selected={i === active}
              onClick={() => pick(i)}
              className={`rounded-2xl border-2 px-5 py-4 text-left font-semibold transition-colors ${
                i === active
                  ? "border-[#eb602d] bg-white text-[#2e2e2e]"
                  : "border-[#2e2e2e]/15 bg-white/50 hover:border-[#2e2e2e]/40"
              }`}
            >
              {q.question}
            </button>
          ))}
        </div>
        <div className="mt-8">
          <CtaLink intent="download" source={source} label={tapped ? "Ask your own question" : "Get the app"} />
        </div>
      </div>

      <div className="flex justify-center">
        <PhoneFrame width={310}>
          <div className="flex h-full flex-col px-4 pb-4 pt-12 font-[system-ui] text-[13px] leading-[1.45] text-[#ececec]" role="tabpanel" aria-live="polite">
            <div className="mb-3 flex items-center justify-between text-[11px] text-white/60">
              <span className="font-semibold text-white">AI Tutor</span>
              <span className="rounded-full border border-[#eb602d]/60 px-2 py-0.5 text-[#eb602d]">{d.mode}</span>
            </div>
            <div className="ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-[#2a2a2c] px-3 py-2">{d.question}</div>
            <div key={d.id} className="mt-3 animate-[fadeUp_.35s_ease-out] space-y-2">
              {d.answer.map((p, i) => (
                <p key={i} className={i === 0 ? "font-semibold text-white" : ""}>
                  {p}
                </p>
              ))}
              <div className="pt-1">
                <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-white/50">References</p>
                {d.references.map((r) => (
                  <p key={r} className="text-[11px] text-[#eb602d]">
                    {r}
                  </p>
                ))}
              </div>
            </div>
            <div className="mt-auto flex flex-wrap gap-1.5 pt-3">
              {d.followUps.map((f) => (
                <span key={f} className="rounded-full border border-white/15 px-2.5 py-1 text-[11px] text-white/80">
                  {f}
                </span>
              ))}
            </div>
            <div className="mt-3 rounded-full bg-[#1c1c1e] px-4 py-2.5 text-[12px] text-white/40">Ask anything...</div>
          </div>
        </PhoneFrame>
      </div>
    </div>
  );
}
