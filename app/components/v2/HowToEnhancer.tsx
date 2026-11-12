"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Re-creates the interactions of the approved How to Use page on server-rendered
 * guide HTML (content/howto/generated.json): step viewer, tutor mode explorer,
 * copyable prompts, screenshot lightbox. Without JS the guide still reads fully:
 * every step, panel and FAQ answer is in the HTML.
 */
const IMG = (name: string) => `/how-to-use/img/${name}.webp`;

const MODE_IMG: Record<string, [string, string]> = {
  socratic: ["s_socratic", "Socratic: the tutor asks before it tells"],
  explain: ["s_explain_web", "Explain: numbered steps, a quick check and references"],
  case: ["s_case", "Case-based: one decision at a time"],
  quick: ["s_quick", "Quick Q&A: answer first, then key points"],
  auto: ["s_modes", "Auto sits at the top of the Tutor Mode list"],
};
const MODE_IDS: Record<string, string> = {
  "st-socratic": "socratic",
  "st-explain": "explain",
  "st-casebased": "case",
  "st-quickqa": "quick",
  "st-auto": "auto",
};

export default function HowToEnhancer({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const cleanups: (() => void)[] = [];
    const on = (el: EventTarget, ev: string, fn: EventListener) => {
      el.addEventListener(ev, fn);
      cleanups.push(() => el.removeEventListener(ev, fn));
    };

    // Step viewers
    root.querySelectorAll<HTMLElement>(".howto").forEach((h) => {
      const fig = h.querySelector(".shot");
      const img = fig?.querySelector("img");
      const cap = fig?.querySelector("figcaption");
      if (!img) return;
      const items = [...h.querySelectorAll<HTMLLIElement>(".steps li")];
      const pick = (li: HTMLLIElement) => {
        if (!li.dataset.img) return;
        items.forEach((x) => x.classList.toggle("on", x === li));
        img.src = IMG(li.dataset.img);
        img.alt = li.dataset.cap ?? "";
        if (cap) cap.textContent = li.dataset.cap ?? "";
      };
      items.forEach((li) => {
        if (!li.dataset.img) return;
        li.tabIndex = 0;
        on(li, "click", () => pick(li));
        on(li, "keydown", (e) => {
          const k = (e as KeyboardEvent).key;
          if (k === "Enter" || k === " ") {
            e.preventDefault();
            pick(li);
          }
        });
      });
      const first = items.find((li) => li.dataset.img);
      if (first) first.classList.add("on");
    });

    // Mode explorer
    const seg = root.querySelector<HTMLElement>("#modeSeg");
    const mshot = root.querySelector<HTMLElement>("#modeShot");
    const openMode = (m: string) => seg?.querySelector<HTMLButtonElement>(`[data-mode="${m}"]`)?.click();
    if (seg && mshot) {
      seg.querySelectorAll<HTMLButtonElement>("button").forEach((b) =>
        on(b, "click", () => {
          const m = b.dataset.mode ?? "";
          seg.querySelectorAll("button").forEach((x) => x.setAttribute("aria-selected", String(x === b)));
          root.querySelectorAll<HTMLElement>(".mode-panel").forEach((p) => (p.hidden = p.dataset.mode !== m));
          const [file, caption] = MODE_IMG[m] ?? [];
          const img = mshot.querySelector("img");
          const cap = mshot.querySelector("figcaption");
          if (img && file) img.src = IMG(file);
          if (cap && caption) cap.textContent = caption;
        }),
      );
      const fromHash = () => {
        const m = MODE_IDS[location.hash.slice(1)];
        if (m) openMode(m);
      };
      fromHash();
      on(window, "hashchange", fromHash);
    }

    // Copy prompts
    const toast = (t: string) => {
      const d = document.createElement("div");
      d.className = "toast";
      d.textContent = t;
      root.appendChild(d);
      setTimeout(() => d.remove(), 1600);
    };
    const copy = (text: string) => {
      if (navigator.clipboard?.writeText) navigator.clipboard.writeText(text).then(() => toast("Copied"), () => toast("Select and copy the text"));
      else toast("Select and copy the text");
    };
    root.querySelectorAll<HTMLButtonElement>(".prompt").forEach((b) => on(b, "click", () => copy(b.firstChild?.textContent?.trim() ?? "")));
    root.querySelectorAll<HTMLButtonElement>(".copy").forEach((b) => on(b, "click", () => copy(b.dataset.copy ?? "")));

    // Lightbox
    on(root, "click", (e) => {
      const img = (e.target as HTMLElement).closest<HTMLImageElement>(".shot img");
      if (!img) return;
      const lb = document.createElement("div");
      lb.className = "lb";
      lb.setAttribute("role", "dialog");
      lb.setAttribute("aria-label", "Screenshot");
      const box = document.createElement("div");
      const big = document.createElement("img");
      big.src = img.src;
      big.alt = img.alt;
      const p = document.createElement("p");
      p.textContent = img.closest("figure")?.querySelector("figcaption")?.textContent ?? "";
      box.append(big, p);
      lb.appendChild(box);
      root.appendChild(lb);
      const close = () => {
        lb.remove();
        document.removeEventListener("keydown", esc);
      };
      const esc = (ev: KeyboardEvent) => {
        if (ev.key === "Escape") close();
      };
      lb.addEventListener("click", close);
      document.addEventListener("keydown", esc);
    });

    return () => cleanups.forEach((c) => c());
  }, []);

  return (
    <div ref={ref} className="htu">
      {children}
    </div>
  );
}
