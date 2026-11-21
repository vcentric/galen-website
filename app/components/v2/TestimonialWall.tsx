import type { ReactNode } from "react";
import { testimonials } from "@/content/site/demos";

const SPACE = "font-[family-name:var(--font-space-var)]";
type T = (typeof testimonials)[number];

const initials = (name: string) => {
  const w = name.replace(/^Dr\.\s*/, "").split(/\s+/);
  return (w[0][0] + (w.length > 1 ? w[w.length - 1][0] : "")).toUpperCase();
};

/** Short quotes are set as big one-liners on a coloured card; long ones as reading text on paper. */
const TONES = ["wall-dark", "wall-orange", "wall-cream"];

function Card({ t, tone }: { t: T; tone?: string }) {
  const short = t.quote.length < 120;
  return (
    <figure className={`wall-card ${short ? (tone ?? "wall-cream") : ""}`}>
      <span aria-hidden className={`${SPACE} wall-mark`}>
        &ldquo;
      </span>
      <blockquote className={short ? `${SPACE} text-[1.5rem] font-bold leading-[1.12] tracking-[-0.03em]` : "text-[0.98rem] font-medium leading-[1.6]"}>{t.quote}</blockquote>
      <figcaption className="mt-5 flex items-center gap-3">
        <span aria-hidden className={`${SPACE} wall-who`}>
          {initials(t.name)}
        </span>
        <span className="min-w-0">
          <span className="block text-[0.95rem] font-bold leading-tight">{t.name}</span>
          <span className="wall-meta block text-[0.8rem] leading-snug">{t.meta}</span>
        </span>
      </figcaption>
    </figure>
  );
}

/** One endlessly looping column: the list twice (the copy is hidden from screen readers), sliding by half its height. */
function Column({ items, className = "" }: { items: T[]; className?: string }) {
  const shortOrder = testimonials.filter((t) => t.quote.length < 120);
  const list = (hidden: boolean) => (
    <ul className="wall-list" aria-hidden={hidden || undefined}>
      {items.map((t) => (
        <li key={t.name}>
          <Card t={t} tone={TONES[shortOrder.indexOf(t) % TONES.length]} />
        </li>
      ))}
    </ul>
  );
  return (
    <div className={`wall-col ${className}`}>
      <div className="wall-track">
        {list(false)}
        {list(true)}
      </div>
    </div>
  );
}

/**
 * Student testimonials as an endless wall. Columns of cards drift past, one up and one down, and
 * loop without a seam, so the wall reads as a stream of students with no beginning or end. Each
 * column's loop is taller than the window, so the same card is never on screen twice. Hovering
 * (or touching) pauses the wall; the card under the pointer straightens and lifts.
 * CSS only (styles: .wall in v2.css). With reduced motion nothing moves and every card is listed once.
 * Phones get a single column with all the cards; wider screens get two.
 */
export default function TestimonialWall({ children }: { children: ReactNode }) {
  // Two columns that each mix long and short cards.
  const a = [0, 4, 3, 6].map((i) => testimonials[i]);
  const b = [1, 5, 2].map((i) => testimonials[i]);
  const all = [0, 4, 1, 5, 3, 6, 2].map((i) => testimonials[i]);
  return (
    <div className="grid items-center gap-x-14 gap-y-8 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1fr)]">
      <div>{children}</div>
      <div className="wall" tabIndex={0} aria-label="Student testimonials">
        <Column items={all} className="sm:hidden" />
        <Column items={a} className="max-sm:hidden" />
        <Column items={b} className="wall-col-down max-sm:hidden" />
      </div>
    </div>
  );
}
