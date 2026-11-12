"use client";

import { Fragment, useState } from "react";
import {
  ArrowUpOnSquareIcon,
  BookOpenIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  DocumentDuplicateIcon,
  FlagIcon,
  HandThumbDownIcon,
  HandThumbUpIcon,
  PaperAirplaneIcon,
  PaperClipIcon,
} from "@heroicons/react/24/outline";
import { PlayCircleIcon } from "@heroicons/react/24/solid";
import { tutorDemos, type DemoAnswer } from "@/content/site/demos";
import { trackEvent } from "@/lib/analytics";
import CtaLink from "./CtaLink";
import PhoneFrame from "./PhoneFrame";

/** Renders **bold** spans. */
function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
        part.startsWith("**") ? (
          <strong key={i} className="font-bold text-white">
            {part.slice(2, -2)}
          </strong>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}

function Extra({ d }: { d: DemoAnswer }) {
  if (!d.extra) return null;
  if (d.extra.kind === "table") {
    return (
      <div className="mt-3 border-t border-white/10 pt-3">
        <p className="text-[11.5px] font-bold text-white">Related table</p>
        <p className="mt-1 text-[11px] italic text-white/70">{d.extra.title}</p>
        <table className="mt-2 w-full border-collapse text-[11px]">
          <thead>
            <tr className="bg-white/5">
              {d.extra.head.map((h) => (
                <th key={h} className="border border-white/10 px-2 py-1 text-left font-bold">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {d.extra.rows.map(([a, b]) => (
              <tr key={a}>
                <td className="border border-white/10 px-2 py-1">{a}</td>
                <td className="border border-white/10 px-2 py-1">{b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  return (
    <div className="mt-3">
      <div className="flex items-center justify-between">
        <p className="flex items-center gap-1.5 text-[11.5px] font-bold text-white">
          <PlayCircleIcon className="h-4 w-4 text-[#eb602d]" aria-hidden /> Watch next
        </p>
        <p className="text-[9.5px] text-white/50">From trusted teaching channels</p>
      </div>
      <div className="mt-2 rounded-xl bg-[#1c1c1e] p-2">
        <div className="relative grid aspect-video place-items-center rounded-lg bg-gradient-to-br from-[#3a3a3c] to-[#1f1f21]">
          <PlayCircleIcon className="h-9 w-9 text-white/80" aria-hidden />
          <span className="absolute left-1.5 top-1.5 rounded bg-[#eb602d] px-1.5 py-0.5 text-[9px] font-bold text-white">
            from {d.extra.from}
          </span>
          <span className="absolute bottom-1.5 right-1.5 rounded bg-black/70 px-1 py-0.5 text-[9px] font-bold text-white">
            {d.extra.length}
          </span>
        </div>
        <p className="mt-1.5 text-[11px] font-bold leading-snug text-white">{d.extra.title}</p>
      </div>
    </div>
  );
}

/**
 * "Try it here": tap a question, the real app answer appears in a coded dark-mode
 * tutor screen modelled on the GalenAI app (orange question bubble, Default pill,
 * Watch next, References pill, feedback icons, follow-up chips).
 * Stored text, not a live model call: instant and always the reviewed wording.
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
        <p className="lead mt-5">Tap a question. These are real answers from the GalenAI app.</p>
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
        <TutorPhone d={d} live />
      </div>
    </div>
  );
}

/**
 * The coded tutor screen on its own. Used by TutorDemo and as a static hero visual.
 * Renders at 320px wide; wrap in a scaled container for smaller sizes.
 */
export function TutorPhone({ d, live = false }: { d: DemoAnswer; live?: boolean }) {
  return (
        <PhoneFrame width={320}>
          <div
            className="flex h-full flex-col bg-[#0d0d0e] font-[system-ui] text-[12.5px] leading-[1.5] text-[#e6e6e6]"
            {...(live ? { role: "tabpanel", "aria-live": "polite" as const } : { "aria-hidden": true })}
          >
            {/* Scrollable conversation */}
            <div key={d.id} className="flex-1 overflow-y-auto px-3.5 pb-3 pt-11 [scrollbar-width:none]">
              <div className="ml-auto max-w-[86%] rounded-[18px] bg-gradient-to-r from-[#ff7a3d] to-[#b9471a] px-3.5 py-2.5 text-[12.5px] text-white">
                {d.question}
              </div>
              <div className="mt-3.5 animate-[fadeUp_.35s_ease-out] space-y-2">
                {d.answer.map((p, i) => (
                  <p key={i}>
                    <Rich text={p} />
                  </p>
                ))}
              </div>
              <Extra d={d} />
              <span className="mt-3.5 inline-flex items-center gap-1.5 rounded-lg bg-[#ff7a3d] px-3 py-1.5 text-[11.5px] font-bold text-white">
                <BookOpenIcon className="h-3.5 w-3.5" aria-hidden />
                References ({d.referenceCount})
                <ChevronDownIcon className="h-3 w-3" aria-hidden />
              </span>
              <div className="mt-3 flex gap-4 text-white/70" aria-hidden>
                <HandThumbUpIcon className="h-4 w-4" />
                <HandThumbDownIcon className="h-4 w-4" />
                <FlagIcon className="h-4 w-4" />
                <DocumentDuplicateIcon className="h-4 w-4" />
                <ArrowUpOnSquareIcon className="h-4 w-4" />
              </div>
              <div className="mt-3 flex flex-col items-start gap-1.5">
                {d.followUps.map((f) => (
                  <span key={f} className="rounded-2xl border border-white/15 px-3 py-1.5 text-[11px] font-semibold text-white/85">
                    {f}
                  </span>
                ))}
              </div>
            </div>
            {/* Composer */}
            <div className="m-2.5 rounded-[18px] border border-white/10 bg-[#141416] px-3 pb-2 pt-2.5">
              <p className="text-[12px] text-white/40">Ask anything...</p>
              <div className="mt-2 flex items-center justify-between">
                <PaperClipIcon className="h-4 w-4 text-white/50" aria-hidden />
                <span className="flex items-center gap-1 rounded-full border border-[#eb602d]/50 px-2.5 py-0.5 text-[11px] font-bold text-[#ff7a3d]">
                  {d.mode} <ChevronUpIcon className="h-3 w-3" aria-hidden />
                </span>
                <PaperAirplaneIcon className="h-4 w-4 text-white/50" aria-hidden />
              </div>
            </div>
          </div>
        </PhoneFrame>
  );
}
