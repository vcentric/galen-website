"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { trackCTAClick, trackEvent } from "@/lib/analytics";

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

    const quizzes = root.querySelectorAll<HTMLElement>(".lmcq");
    let right = 0;
    root.querySelectorAll<HTMLElement>(".lmcq").forEach((q, qi) => {
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
          trackEvent("mcq_answer", { where: "lesson", correct: letter === answer, question: qi + 1 });
          if (letter === answer) right += 1;
          if (root.querySelectorAll(".lmcq.done").length === quizzes.length) trackEvent("quiz_complete", { where: "lesson", score: right, total: quizzes.length });
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

    root.querySelectorAll<HTMLButtonElement>(".lflash").forEach((b, bi) => {
      on(b, "click", () => {
        const open = b.getAttribute("aria-pressed") !== "true";
        if (open) trackEvent("flashcard_flip", { where: "lesson", card: bi + 1 });
        b.setAttribute("aria-pressed", open ? "true" : "false");
      });
    });

    root.querySelectorAll<HTMLDetailsElement>("details.lviva").forEach((d, di) => {
      on(d, "toggle", () => {
        if (d.open) trackEvent("viva_open", { where: "lesson", question: di + 1 });
      });
    });

    // Links from the lesson text into the app (the practice block and the closing note).
    root.querySelectorAll<HTMLAnchorElement>('a[href*="app.galenai.io"]').forEach((link) => {
      on(link, "click", () =>
        trackCTAClick(link.href, { source: "lesson_body", button_type: link.classList.contains("btn") ? "primary" : "link", button_text: (link.textContent ?? "").trim().slice(0, 80) || "link" }),
      );
    });

    return () => cleanups.forEach((c) => c());
  }, []);

  return (
    <div ref={ref} className="lesson-main">
      {children}
    </div>
  );
}
