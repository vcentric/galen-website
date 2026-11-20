"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import {
  Bars3Icon,
  BookOpenIcon,
  ChevronDownIcon,
  DocumentDuplicateIcon,
  FlagIcon,
  HandThumbDownIcon,
  HandThumbUpIcon,
  MicrophoneIcon,
  PaperClipIcon,
  Square2StackIcon,
  SpeakerWaveIcon,
} from "@heroicons/react/24/outline";
import { PlayCircleIcon } from "@heroicons/react/24/solid";
import { tutorDemos, type DemoAnswer } from "@/content/site/demos";
import { trackEvent } from "@/lib/analytics";
import CtaLink from "./CtaLink";

/*
 * Coded AI tutor screen, matched to the GalenAI mobile UI kit, dark theme
 * (Sources/Context for webpage/GalenAI Mobile App (17).html, tokens in its
 * [data-theme="dark"] block and TutorChat/FollowUps/Composer):
 *   surface   linear-gradient(180deg,#14110F,#0D0B0A)
 *   chips     #2A2420, 1px rgba(255,255,255,.14), text rgba(255,241,233,.82), radius 20
 *   accent    #FF7139 (dark-mode coral)
 *   frame     402 x 858 phone, 11px bezel, radius 54, screen 380 x 836
 * Answers are real app output (content/site/demos.ts). Text, so the page H1
 * stays the LCP element and everything is crawlable.
 */

const APP_FONT = "var(--font-app-var), ui-sans-serif, system-ui, sans-serif";

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
        <p className="text-[12px] font-semibold text-white">Related table</p>
        <p className="mt-1 text-[11px] italic text-white/65">{d.extra.title}</p>
        <table className="mt-2 w-full border-collapse text-[11px]">
          <thead>
            <tr className="bg-white/5">
              {d.extra.head.map((h) => (
                <th key={h} className="border border-white/10 px-2 py-1 text-left font-semibold">
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
        <p className="flex items-center gap-1.5 text-[12px] font-semibold text-white">
          <PlayCircleIcon className="h-4 w-4 text-[#FF7139]" aria-hidden /> Watch next
        </p>
        <p className="text-[9.5px] text-white/50">From trusted teaching channels</p>
      </div>
      <div className="mt-2 rounded-[14px] bg-[#221D19] p-2">
        <div className="relative grid aspect-video place-items-center rounded-[10px] bg-gradient-to-br from-[#3a332d] to-[#1b1714]">
          <PlayCircleIcon className="h-9 w-9 text-white/80" aria-hidden />
          <span className="absolute left-1.5 top-1.5 rounded-md bg-[#FF7139] px-1.5 py-0.5 text-[9px] font-bold text-white">
            from {d.extra.from}
          </span>
          <span className="absolute bottom-1.5 right-1.5 rounded bg-black/70 px-1 py-0.5 text-[9px] font-bold text-white">
            {d.extra.length}
          </span>
        </div>
        <p className="mt-1.5 text-[11px] font-semibold leading-snug text-white">{d.extra.title}</p>
      </div>
    </div>
  );
}

function StatusBar() {
  return (
    <div className="flex items-center justify-between px-[22px] pt-[13px] text-[12.5px] font-semibold text-white" aria-hidden>
      <span>9:41</span>
      <span className="flex items-center gap-1.5">
        <svg width="16" height="10" viewBox="0 0 16 10" fill="currentColor">
          <rect x="0" y="6" width="3" height="4" rx="0.7" />
          <rect x="4.3" y="4" width="3" height="6" rx="0.7" />
          <rect x="8.6" y="2" width="3" height="8" rx="0.7" />
          <rect x="12.9" y="0" width="3" height="10" rx="0.7" />
        </svg>
        <svg width="22" height="11" viewBox="0 0 22 11" fill="none">
          <rect x="0.5" y="0.5" width="18.5" height="10" rx="2.6" stroke="currentColor" opacity="0.5" />
          <rect x="2" y="2" width="15.5" height="7" rx="1.6" fill="currentColor" />
          <rect x="20" y="3.6" width="1.6" height="3.8" rx="0.8" fill="currentColor" opacity="0.5" />
        </svg>
      </span>
    </div>
  );
}

/** The thread body: question bubble, answer, extras, references, actions, follow-ups. */
export function Thread({ d, answer = true }: { d: DemoAnswer; answer?: boolean }) {
  return (
    <>
      <div className="ml-auto max-w-[86%] rounded-[18px] bg-gradient-to-r from-[#FF7A3D] to-[#B9471A] px-3.5 py-2.5 text-[13px] font-medium leading-[1.4] text-white">
        {d.question}
      </div>
      {!answer ? (
        <div className="mt-4 flex gap-1.5" aria-label="Thinking">
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-1.5 w-1.5 animate-pulse rounded-full bg-white/50" style={{ animationDelay: `${i * 150}ms` }} />
          ))}
        </div>
      ) : (
        <div key={d.id} className="animate-[fadeUp_.4s_ease-out]">
          <div className="mt-3.5 space-y-2.5 text-[12.5px] leading-[1.58] text-white/95">
            {d.answer.map((p, i) => (
              <p key={i}>
                <Rich text={p} />
              </p>
            ))}
          </div>
          <Extra d={d} />
          <span className="mt-3.5 inline-flex items-center gap-1.5 rounded-[9px] bg-[#EE6A32] px-3 py-1.5 text-[11.5px] font-semibold text-white">
            <BookOpenIcon className="h-3.5 w-3.5" aria-hidden />
            References ({d.referenceCount})
            <ChevronDownIcon className="h-3 w-3" aria-hidden />
          </span>
          <div className="mt-3 flex gap-4 text-white/70" aria-hidden>
            <SpeakerWaveIcon className="h-4 w-4" />
            <HandThumbUpIcon className="h-4 w-4" />
            <HandThumbDownIcon className="h-4 w-4" />
            <FlagIcon className="h-4 w-4" />
            <DocumentDuplicateIcon className="h-4 w-4" />
          </div>
          <div className="mt-3 flex flex-col items-start gap-2">
            {d.followUps.map((f) => (
              <span
                key={f}
                className="rounded-[20px] border border-white/[0.14] bg-[#2A2420] px-3 py-2 text-[11.5px] font-medium leading-[1.35] text-[rgba(255,241,233,0.82)]"
              >
                {f}
              </span>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

/**
 * Phone with the coded tutor screen. Fixed 320px wide; scale with a wrapper for
 * other sizes. One notch only (drawn here), matching the kit frame.
 */
export function TutorPhone({ d, live = false, answer = true }: { d: DemoAnswer; live?: boolean; answer?: boolean }) {
  return (
    <div
      className="relative w-[320px] shrink-0 rounded-[43px] bg-black p-[9px] shadow-[0_30px_70px_rgba(46,46,46,0.30)]"
      style={{ fontFamily: APP_FONT }}
    >
      <div
        className="relative flex flex-col overflow-hidden rounded-[35px] text-[#e9e4df]"
        style={{ aspectRatio: "380 / 836", background: "linear-gradient(180deg,#14110F 0%,#0D0B0A 100%)" }}
        {...(live ? { role: "tabpanel", "aria-live": "polite" as const } : { "aria-hidden": true })}
      >
        <span aria-hidden className="absolute left-1/2 top-0 z-10 h-[27px] w-[31%] -translate-x-1/2 rounded-b-[16px] bg-black" />
        <StatusBar />
        {/* App header: menu + chat history, as in the app */}
        <div className="flex items-center justify-between px-[14px] pb-1 pt-[10px] text-white" aria-hidden>
          <Bars3Icon className="h-[22px] w-[22px]" />
          <Square2StackIcon className="h-[20px] w-[20px]" />
        </div>
        <div className="flex-1 overflow-y-auto px-[14px] pb-3 pt-2 [scrollbar-width:none]">
          <Thread d={d} answer={answer} />
        </div>
        {/* Composer */}
        <div className="mx-[10px] mb-[10px] rounded-[22px] border border-white/10 bg-[#141210] px-3.5 pb-2.5 pt-3">
          <p className="text-[12.5px] text-white/40">Ask anything...</p>
          <div className="mt-2.5 flex items-center gap-3">
            <PaperClipIcon className="h-[17px] w-[17px] text-white/55" aria-hidden />
            <MicrophoneIcon className="h-[17px] w-[17px] text-white/55" aria-hidden />
            <span className="ml-auto flex items-center gap-1 rounded-full border border-[#EB602D]/50 bg-[#EB602D]/[0.12] px-2.5 py-1 text-[11px] font-semibold text-[#FF7139]">
              {d.mode} <ChevronDownIcon className="h-3 w-3" aria-hidden />
            </span>
            <span className="grid h-[30px] w-[30px] place-items-center rounded-full bg-white text-[#2E2E2E]" aria-hidden>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                <rect x="1" y="5" width="1.8" height="4" rx="0.9" />
                <rect x="4.2" y="3" width="1.8" height="8" rx="0.9" />
                <rect x="7.4" y="1" width="1.8" height="12" rx="0.9" />
                <rect x="10.6" y="4" width="1.8" height="6" rx="0.9" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * The same exchange as a chat card, for phones and tablets where a full phone frame would be
 * cut in half by the bottom of the screen. Fixed height, so the page never jumps as answers change.
 */
export function ChatCard({ d, live = false, answer = true, className = "" }: { d: DemoAnswer; live?: boolean; answer?: boolean; className?: string }) {
  return (
    <div
      className={`relative h-[27rem] overflow-hidden rounded-[28px] px-4 pt-5 text-[#e9e4df] ${className}`}
      style={{ background: "linear-gradient(180deg,#14110F 0%,#0D0B0A 100%)", fontFamily: APP_FONT }}
      {...(live ? { role: "tabpanel", "aria-live": "polite" as const } : { "aria-hidden": true })}
    >
      <Thread d={d} answer={answer} />
      <span className="pointer-events-none absolute inset-x-0 bottom-0 h-20" style={{ background: "linear-gradient(180deg,rgba(13,11,10,0),#0D0B0A)" }} />
    </div>
  );
}

/** What a stored answer contains, in plain words, for the "In this answer" line. */
const partsOf = (d: DemoAnswer) => [
  `${d.referenceCount} references`,
  d.extra?.kind === "table" ? "A related table" : d.extra?.kind === "video" ? "A video to watch next" : "",
  `${d.followUps.length} follow-up questions`,
].filter(Boolean);

/**
 * "Try it here": tap a question, the app thinks for a beat, then the real answer appears, in the
 * phone on desktop and in a chat card on phones. Stored text, not a live model call: instant and
 * always the reviewed wording. The questions are tabs; the screen is their panel.
 */
export default function TutorDemo({ source = "home_try" }: { source?: string }) {
  const [active, setActive] = useState(0);
  const [answer, setAnswer] = useState(true);
  const [tapped, setTapped] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const card = useRef<HTMLDivElement>(null);
  const d = tutorDemos[active];

  useEffect(() => () => clearTimeout(timer.current), []);

  const pick = (i: number) => {
    setTapped(true);
    trackEvent("demo_interaction", { source, demo: tutorDemos[i].id });
    if (i === active && answer) return;
    setActive(i);
    setAnswer(false);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setAnswer(true), 750);
    // On a phone the chat card can be below the screen: bring it into view, without moving more than needed.
    if (card.current?.offsetParent) card.current.scrollIntoView({ block: "nearest", behavior: "smooth" });
  };

  return (
    <div className="grid items-center gap-x-16 gap-y-8 lg:grid-cols-[minmax(0,1fr)_auto]">
      <div>
        <p className="kick">Try it here</p>
        <h2 className="h2 mt-5">
          Go on. Ask it <span className="acc">something.</span>
        </h2>
        <p className="lead mt-5">Tap a question. These are real answers from the GalenAI app.</p>
        <div className="mt-8 flex max-w-[38rem] flex-col gap-3.5" role="tablist" aria-label="Sample questions">
          {tutorDemos.map((q, i) => (
            <button key={q.id} type="button" role="tab" aria-selected={i === active} onClick={() => pick(i)} className={`ask-q ${i === active ? "ask-q-on" : ""}`}>
              <span aria-hidden className="ask-q-n">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="min-w-0 flex-1">{q.question}</span>
              <span aria-hidden className="ask-q-send">
                <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                  <path d="M9 14.5v-11M4.5 7.5 9 3l4.5 4.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
        <div className="phone-fit hidden justify-center lg:flex">
          <TutorPhone d={d} live answer={answer} />
        </div>
        <div ref={card} className="scroll-mb-24 lg:hidden">
          <ChatCard d={d} live answer={answer} />
        </div>
      </div>

      <div className="lg:col-start-1">
        <p className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-bold">
          <span className="uppercase tracking-[0.14em]" style={{ color: "var(--body)" }}>
            In this answer
          </span>
          {partsOf(d).map((part) => (
            <span key={part} className="inline-flex items-center gap-2">
              <span aria-hidden className="h-2 w-2 rounded-full bg-[#eb602d]" />
              {part}
            </span>
          ))}
        </p>
        <div className="mt-7">
          <CtaLink intent="download" source={source} label={tapped ? "Ask your own question" : "Get the app"} />
        </div>
      </div>
    </div>
  );
}
