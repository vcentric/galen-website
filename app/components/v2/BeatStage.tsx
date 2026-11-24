"use client";

import { trackEvent } from "@/lib/analytics";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { AppScreenName } from "./AppScreen";

export type Beat = { word: string; title: string; body: string; img: AppScreenName; href: string; link: string };

const SPACE = "font-[family-name:var(--font-space-var)]";

/**
 * "Ask. Practise. Revise." on the home page. The three words are the controls: the chosen one
 * opens to its title, text and link, and its app screen comes to the front of the stage, whole
 * and uncropped, with the other two smaller behind it. Phones on the stage can be tapped too.
 * It steps through the three by itself until someone chooses one; hovering pauses it.
 * The step timer is the progress line's CSS animation, so with reduced motion it simply stays put.
 * Same layout on phones, stacked: words and text first, the stage under them. No sideways scrolling.
 */
export default function BeatStage({ beats }: { beats: Beat[] }) {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const n = beats.length;
  const choose = (i: number) => {
    trackEvent("ui_select", { component: "ask_practise_revise", choice: beats[i].word.replace(/[^a-z]/gi, "").toLowerCase() });
    setAuto(false);
    setActive(i);
  };

  return (
    <div className="beat-stage grid items-center gap-x-12 gap-y-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
      <ol>
        {beats.map((b, i) => {
          const on = i === active;
          return (
            <li key={b.word}>
              <button
                type="button"
                aria-expanded={on}
                aria-controls={`beat-${i}`}
                onClick={() => choose(i)}
                className={`${SPACE} group flex w-full items-baseline gap-4 text-left text-[clamp(3rem,13vw,5.25rem)] font-bold leading-[1.02] tracking-[-0.05em] transition-colors duration-300 lg:text-[clamp(3.5rem,6.2vw,5.5rem)] ${
                  on ? "text-[#eb602d]" : "text-[#2e2e2e]/25 hover:text-[#2e2e2e]/60"
                }`}
              >
                {b.word}
                <span aria-hidden className={`text-base tracking-normal transition-opacity duration-300 ${on ? "opacity-100" : "opacity-0 group-hover:opacity-60"}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
              </button>
              <div id={`beat-${i}`} className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${on ? "grid-rows-[1fr] opacity-100" : "invisible grid-rows-[0fr] opacity-0"}`}>
                <div className="overflow-hidden">
                  {/* Same height for all three on phones, so the stage below does not move as the steps change. */}
                  <div className="min-h-[17rem] max-w-[30rem] pb-6 pt-3 lg:min-h-0">
                    {/* Progress line: when its animation ends, the next word opens. */}
                    <span aria-hidden className="mb-5 block h-[3px] w-24 overflow-hidden rounded-full bg-[#2e2e2e]/12">
                      {on && auto && <span className="beat-fill block h-full bg-[#eb602d]" onAnimationEnd={() => setActive((i + 1) % n)} />}
                    </span>
                    <h3 className="h3 !text-[1.5rem]">{b.title}</h3>
                    <p className="mt-2 text-[1.05rem] leading-relaxed" style={{ color: "var(--body)" }}>
                      {b.body}
                    </p>
                    <Link href={b.href} tabIndex={on ? 0 : -1} className="btn btn-ghost mt-5 !min-h-11 !px-5 !text-[0.95rem]">
                      {b.link}
                    </Link>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      {/* The stage. The front phone is the whole screen for the chosen word; the other two wait behind it. */}
      <div className="beat-phones" aria-hidden>
        {beats.map((b, i) => {
          const off = ((i - active + n + 1) % n) - 1; // -1 left, 0 front, 1 right
          return (
            <button
              key={b.word}
              type="button"
              tabIndex={-1}
              onClick={() => choose(i)}
              className={`beat-phone ${off === 0 ? "beat-phone-front" : ""}`}
              style={{ "--off": off } as React.CSSProperties}
            >
              <Image src={`/app/${b.img}.webp`} alt="" width={600} height={1245} sizes="300px" priority={false} />
            </button>
          );
        })}
      </div>
    </div>
  );
}
