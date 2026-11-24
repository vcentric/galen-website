"use client";

import { trackEvent } from "@/lib/analytics";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { FacultyStep } from "@/content/site/faculty-steps";

const HOLD_MS = 4500;

/**
 * The six faculty steps as a step-through: the list on one side, the matching screen on the other.
 * Every step's text is in the page from the start (crawlable); only the picture changes.
 *
 * Auto-play follows the usual rules for moving content: it starts only once the section is on screen,
 * runs through the steps once and comes to rest on the first, never runs for readers who ask for
 * reduced motion, and stops for good the moment the reader chooses a step (click, tap or keyboard).
 */
export default function FacultySteps({ steps }: { steps: FacultyStep[] }) {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState<"waiting" | "playing" | "done">("waiting");
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        setAuto((a) => (a === "waiting" ? "playing" : a));
        io.disconnect();
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (auto !== "playing") return;
    const id = window.setTimeout(() => {
      const next = (active + 1) % steps.length;
      setActive(next);
      if (next === 0) setAuto("done");
    }, HOLD_MS);
    return () => window.clearTimeout(id);
  }, [active, auto, steps.length]);

  const pick = (i: number) => {
    trackEvent("ui_select", { component: "faculty_steps", choice: steps[i].title });
    setAuto("done");
    setActive(i);
  };

  return (
    <div ref={root} className="fsteps" data-auto={auto === "playing" ? "" : undefined} style={{ "--hold": `${HOLD_MS}ms` } as React.CSSProperties}>
      <ol className="fsteps-list">
        {steps.map((s, i) => (
          <li key={s.title}>
            <button type="button" className="fstep" aria-current={i === active ? "step" : undefined} aria-controls="fsteps-screen" onClick={() => pick(i)}>
              <span className="fstep-n">{String(i + 1).padStart(2, "0")}</span>
              <span>
                <span className="fstep-t">{s.title}</span>
                <span className="fstep-b">{s.body}</span>
              </span>
            </button>
          </li>
        ))}
      </ol>
      <div className="fsteps-stage">
        <div className="fsteps-window">
          <div className="inst-hero-bar" aria-hidden>
            <i />
            <i />
            <i />
            <span>faculty.galenai.io</span>
          </div>
          <div id="fsteps-screen" className="fsteps-screens">
            {steps.map((s, i) => (
              <Image
                key={s.src}
                src={s.src}
                alt={i === active ? s.alt : ""}
                aria-hidden={i === active ? undefined : true}
                width={1800}
                height={1125}
                sizes="(min-width: 1024px) 760px, 92vw"
                loading="lazy"
                data-on={i === active ? "" : undefined}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
