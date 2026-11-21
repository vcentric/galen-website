"use client";

import Image from "next/image";
import { useState } from "react";
import { tutorModes } from "@/content/site/demos";

const SPACE = "font-[family-name:var(--font-space-var)]";

/**
 * Tutor mode explorer. A rail of five numbered tabs across the top; under it the chosen mode laid
 * out like a spec sheet around the phone: what it does on the left, the app answering in that mode
 * in the middle (dark app captures in public/app, wording from the approved How to Use page), who it suits and a
 * prompt to try on the right. The point of the section is that the same tutor replies differently
 * in each mode, so the phone shows a real reply for each one, not the mode menu.
 * All panel text is in the HTML (inactive panels use `hidden`), so crawlers see every mode.
 */
export default function ModeExplorer() {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="mode-rail" role="tablist" aria-label="Tutor modes">
        {tutorModes.map((m, i) => (
          <button
            key={m.id}
            type="button"
            role="tab"
            id={`mode-tab-${m.id}`}
            aria-selected={i === active}
            aria-controls={`mode-panel-${m.id}`}
            onClick={() => setActive(i)}
            className={`mode-tab ${i === active ? "mode-tab-on" : ""}`}
          >
            <span aria-hidden className="mode-tab-n">
              {String(i + 1).padStart(2, "0")}
            </span>
            {m.name}
          </button>
        ))}
      </div>

      <div className="mode-sheet">
        {/* What it does */}
        <div className="mode-what">
          {tutorModes.map((m, i) => (
            <div key={m.id} id={`mode-panel-${m.id}`} role="tabpanel" aria-labelledby={`mode-tab-${m.id}`} hidden={i !== active} className="mode-fade">
              <h3 className={`${SPACE} text-[clamp(1.6rem,3vw,2.25rem)] font-bold leading-[1.05] tracking-[-0.035em]`}>{m.line}</h3>
              <p className="lead mt-4">{m.what}</p>
            </div>
          ))}
        </div>

        {/* The app replying in that mode. Decorative: the same information is in the text either side. */}
        <div className="mode-phone phone-fit" aria-hidden>
          {/* The captures carry their own frame and notch (see AppScreen.tsx), so they are stacked as they are. */}
          <div className="relative mx-auto w-[280px]" style={{ aspectRatio: "600 / 1245" }}>
            {tutorModes.map((m, i) => (
              <Image
                key={m.id}
                src={`/app/${m.screen}.webp`}
                alt=""
                fill
                sizes="280px"
                className={`object-contain drop-shadow-[0_24px_40px_rgba(46,46,46,0.22)] transition-opacity duration-500 ${i === active ? "opacity-100" : "opacity-0"}`}
              />
            ))}
          </div>
        </div>

        {/* Who it suits, and something to ask */}
        <div className="mode-for">
          {tutorModes.map((m, i) => (
            <div key={m.id} hidden={i !== active} className="mode-fade">
              <p className="kick">Best for</p>
              <ul className="mt-4 space-y-2.5">
                {m.bestFor.map((b) => (
                  <li key={b} className="flex gap-3 text-[1.05rem] font-semibold leading-snug">
                    <span aria-hidden className="mt-[0.5em] h-2.5 w-2.5 shrink-0 rounded-full bg-[#eb602d]" />
                    {b}
                  </li>
                ))}
              </ul>
              <p className="kick mt-8">Try asking</p>
              {/* Styled like the question bubble in the app. */}
              <p className="mt-4 inline-block rounded-[18px] rounded-br-[6px] bg-[#2e2e2e] px-4 py-3 text-[1rem] font-semibold leading-snug text-[#fff0e4]">{m.tryAsking}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
