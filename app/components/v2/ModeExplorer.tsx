"use client";

import { useState } from "react";
import { tutorModes } from "@/content/site/demos";
import PhoneFrame from "./PhoneFrame";

/**
 * Tutor mode explorer, ported from the How to Use page (#modeSeg + mode panels).
 * All panel text is in the HTML (hidden panels use `hidden`), so crawlers see every mode.
 */
export default function ModeExplorer() {
  const [active, setActive] = useState<string>(tutorModes[0].id);
  const current = tutorModes.find((m) => m.id === active) ?? tutorModes[0];

  return (
    <div className="grid items-start gap-10 lg:grid-cols-[1fr_auto] lg:gap-16">
      <div>
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Tutor modes">
          {tutorModes.map((m) => (
            <button
              key={m.id}
              type="button"
              role="tab"
              id={`mode-tab-${m.id}`}
              aria-selected={m.id === active}
              aria-controls={`mode-panel-${m.id}`}
              onClick={() => setActive(m.id)}
              className={`min-h-11 rounded-full px-5 font-bold transition-colors ${
                m.id === active ? "bg-[#2e2e2e] text-[#fff0e4]" : "border-2 border-[#2e2e2e]/20 hover:border-[#2e2e2e]/50"
              }`}
            >
              {m.name}
            </button>
          ))}
        </div>

        {tutorModes.map((m) => (
          <div
            key={m.id}
            id={`mode-panel-${m.id}`}
            role="tabpanel"
            aria-labelledby={`mode-tab-${m.id}`}
            hidden={m.id !== active}
            className="mt-8"
          >
            <h3 className="h3 !text-2xl">{m.line}</h3>
            <p className="lead mt-3">{m.what}</p>
            <p className="kick mt-6">Best for</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {m.bestFor.map((b) => (
                <li key={b} className="rounded-full bg-white px-3 py-1.5 text-sm font-semibold">
                  {b}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm font-semibold" style={{ color: "var(--body)" }}>
              Try asking: <span className="text-[#2e2e2e]">&ldquo;{m.tryAsking}&rdquo;</span>
            </p>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <PhoneFrame key={current.id} src={`/how-to-use/img/${current.img}.webp`} alt={`${current.name} mode in the GalenAI app`} width={280} />
      </div>
    </div>
  );
}
