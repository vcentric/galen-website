"use client";

import { useEffect, useRef, useState } from "react";
import { tutorDemos } from "@/content/site/demos";
import CtaLink from "./CtaLink";
import { ChatCard, TutorPhone } from "./TutorDemo";
import { Kicker } from "./ui";

/*
 * Home hero. The headline makes the promise and the "ask bar" under it shows it happening:
 * a real question types itself, is sent, and the app answers. On desktop the answer lands in
 * the phone beside the text; on phones it lands in a full-width chat card under the buttons,
 * so there is never a phone frame cut in half by the bottom of the screen.
 * Questions and answers are the reviewed ones in content/site/demos.ts. With reduced motion,
 * or without JavaScript, the first question and its answer are simply shown.
 */

const START = 2; // troponin: the answer with a table, the most product-like first frame
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default function HomeHero() {
  const [typed, setTyped] = useState({ q: START, n: tutorDemos[START].question.length });
  const [chat, setChat] = useState({ q: START, answer: true });
  const paused = useRef(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let alive = true;
    const hold = async (ms: number) => {
      for (let t = 0; t < ms && alive; ) {
        await wait(100);
        if (!paused.current && !document.hidden) t += 100;
      }
    };
    (async () => {
      let cur = START;
      await hold(4200);
      while (alive) {
        const next = (cur + 1) % tutorDemos.length;
        const text = tutorDemos[next].question;
        for (let n = 0; n <= text.length && alive; n++) {
          setTyped({ q: next, n });
          await wait(n === 0 ? 350 : 24);
        }
        await hold(450);
        if (!alive) return;
        setChat({ q: next, answer: false }); // sent: the app shows the question and thinks
        await hold(950);
        if (!alive) return;
        setChat({ q: next, answer: true });
        cur = next;
        await hold(6200);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const question = tutorDemos[typed.q].question;
  const typing = typed.n < question.length;
  const d = tutorDemos[chat.q];
  const pause = { onMouseEnter: () => (paused.current = true), onMouseLeave: () => (paused.current = false) };

  return (
    <section className="wrap pb-12 pt-[5.5rem] lg:pt-24">
      <div className="grid items-center gap-x-16 gap-y-10 lg:grid-cols-[minmax(0,1fr)_auto]">
        <div>
          <div className="rise" style={{ "--d": "0ms" } as React.CSSProperties}>
            <Kicker>For MBBS and medical students</Kicker>
          </div>
          <h1 className="mt-5 font-[family-name:var(--font-space-var)] text-[clamp(2.5rem,11.2vw,4.5rem)] font-bold leading-[0.93] tracking-[-0.05em] lg:text-[clamp(4rem,6.6vw,6rem)]">
            <span className="line">
              <span style={{ "--d": "60ms" } as React.CSSProperties}>Ask anything.</span>
            </span>
            <span className="line">
              <span style={{ "--d": "160ms" } as React.CSSProperties}>
                Get it <span className="acc">explained.</span>
              </span>
            </span>
          </h1>
          <p className="lead rise mt-6" style={{ "--d": "300ms" } as React.CSSProperties}>
            GalenAI is the AI study app for medical students around the world. Ask any doubt and get a clear answer with references, then
            practise and revise until it sticks.
          </p>

          {/* The ask bar: decorative, it replays questions that are in the page as text further down. */}
          <div className="rise relative mt-8 max-w-[36rem]" style={{ "--d": "420ms" } as React.CSSProperties} aria-hidden {...pause}>
            <div className="ask-bar">
              <p className="min-w-0 flex-1 font-semibold leading-snug">
                {question.slice(0, typed.n)}
                <span className={`ask-caret ${typing ? "" : "ask-caret-rest"}`} />
              </p>
              <span className={`ask-send ${!typing && !chat.answer ? "ask-send-on" : ""}`}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M9 14.5v-11M4.5 7.5 9 3l4.5 4.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
            {/* Hand-drawn arrow from the bar to the phone (design system: the orange arrow that points at the payoff). */}
            <svg className="ask-arrow hidden lg:block" width="86" height="64" viewBox="0 0 86 64" fill="none">
              <path d="M4 50c18 8 44 4 60-18 5-7 8-15 9-24" stroke="#eb602d" strokeWidth="3.5" strokeLinecap="round" />
              <path d="M61 14 73 6l8 13" stroke="#eb602d" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <div className="mt-8 flex items-end justify-between gap-8">
            <div className="shrink-0 max-sm:w-full">
              <div className="rise grid grid-cols-2 gap-3 sm:flex" style={{ "--d": "520ms" } as React.CSSProperties}>
                <CtaLink intent="download" source="home_hero" className="max-sm:!px-3 max-sm:!text-[0.95rem]" />
                <CtaLink intent="try-web" source="home_hero" variant="ghost" className="max-sm:!px-3 max-sm:!text-[0.95rem]" />
              </div>
              <p className="rise mt-5 text-sm font-semibold" style={{ color: "var(--body)", "--d": "600ms" } as React.CSSProperties}>
                <span className="mr-1 inline-flex items-center gap-1 rounded-full bg-[#eb602d]/10 px-2.5 py-0.5 font-bold text-[#c94d20]">
                  <span aria-hidden>✦</span> 2,000+
                </span>
                medical students already on it. iPhone, Android and web.
              </p>
            </div>
            {/* Desktop only: scanning is how a laptop visitor gets the app onto their phone. */}
            <div className="rise hidden shrink-0 items-center gap-3.5 xl:flex" style={{ "--d": "680ms" } as React.CSSProperties}>
              <p className="h3 text-right !leading-[1.05]">
                Scan.
                <br />
                Ask <span className="acc">anything.</span>
              </p>
              <div className="rounded-[16px] border-[3px] border-[#2e2e2e] bg-white p-2.5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/qr/download.svg" alt="QR code to download GalenAI" width={84} height={84} />
              </div>
            </div>
          </div>
        </div>

        {/* Desktop: the answer lands in the phone. Sized by window height so the whole phone stays on the first screen. */}
        <div className="phone-fit rise hidden justify-end lg:flex" style={{ "--d": "380ms" } as React.CSSProperties} {...pause}>
          <TutorPhone d={d} answer={chat.answer} />
        </div>

        {/* Phones and tablets: the same exchange as a chat card (never a phone frame cut in half). */}
        <div className="rise lg:hidden" style={{ "--d": "680ms" } as React.CSSProperties}>
          <ChatCard d={d} answer={chat.answer} />
        </div>
      </div>
    </section>
  );
}
