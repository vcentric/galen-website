"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Interactions for server-rendered lesson HTML (lib/learn.ts). Without JS the lesson
 * still works: every MCQ has a "Show answer" disclosure and flashcards show both sides.
 *  - MCQ: options become buttons; picking one marks it right or wrong and opens the explanation.
 *  - Flashcards: tap to flip.
 */
export default function LessonEnhancer({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    root.classList.add("js");
    const cleanups: (() => void)[] = [];
    const on = (el: Element, ev: string, fn: EventListener) => {
      el.addEventListener(ev, fn);
      cleanups.push(() => el.removeEventListener(ev, fn));
    };

    root.querySelectorAll<HTMLElement>(".lmcq").forEach((q) => {
      const answer = q.dataset.answer ?? "";
      const reveal = q.querySelector<HTMLDetailsElement>(".lmcq-reveal");
      q.querySelectorAll<HTMLLIElement>("ul > li, ol > li").forEach((li) => {
        const letter = (li.textContent ?? "").trim().match(/^([A-E])[.)]/)?.[1];
        if (!letter) return;
        li.dataset.letter = letter;
        li.tabIndex = 0;
        li.setAttribute("role", "button");
        const pick = () => {
          if (q.classList.contains("done")) return;
          q.classList.add("done");
          li.classList.add(letter === answer ? "right" : "wrong");
          q.querySelector<HTMLElement>(`li[data-letter="${answer}"]`)?.classList.add("right");
          if (reveal) {
            reveal.open = true;
            reveal.querySelector("summary")!.textContent = letter === answer ? "Correct" : "Not quite";
          }
        };
        on(li, "click", pick);
        on(li, "keydown", (e) => {
          const k = (e as KeyboardEvent).key;
          if (k === "Enter" || k === " ") {
            e.preventDefault();
            pick();
          }
        });
      });
    });

    root.querySelectorAll<HTMLButtonElement>(".lflash").forEach((b) => {
      on(b, "click", () => b.setAttribute("aria-pressed", b.getAttribute("aria-pressed") === "true" ? "false" : "true"));
    });

    return () => cleanups.forEach((c) => c());
  }, []);

  return (
    <div ref={ref} className="lesson-main">
      {children}
    </div>
  );
}
