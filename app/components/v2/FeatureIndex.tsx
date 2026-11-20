"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useHydrated } from "@/lib/useHydrated";
import type { AppScreenName } from "./AppScreen";

export type FeatureRow = {
  path: string;
  name: string;
  promise: string; // the feature page's own headline
  description: string;
  screen: AppScreenName;
  soon?: boolean;
};
export type FeatureGroup = { id: string; word: string; line: string; rows: FeatureRow[] };

const SPACE = "font-[family-name:var(--font-space-var)]";
const two = (n: number) => String(n).padStart(2, "0");

/**
 * The /features index: every student feature as one large row, beside a phone that shows the
 * screen for the row you are reading. The row nearest the reading line (just above the middle
 * of the window) is the active one; pointing at or tabbing to a row also selects it. The page
 * hero is passed as children and sits at the top of the text column, beside the phone. Below the desktop breakpoint there is
 * no side phone and each row carries its own small screen instead.
 * Without JavaScript every row is fully visible and the phone shows the first screen.
 */
export default function FeatureIndex({ groups, children }: { groups: FeatureGroup[]; children: ReactNode }) {
  const flat = groups.flatMap((g) => g.rows);
  const [active, setActive] = useState(0);
  const hydrated = useHydrated();
  const rows = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    let frame = 0;
    const pick = () => {
      frame = 0;
      const line = window.innerHeight * 0.45;
      let best = 0;
      let bestGap = Infinity;
      rows.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const gap = line < r.top ? r.top - line : line > r.bottom ? line - r.bottom : 0;
        if (gap < bestGap) {
          bestGap = gap;
          best = i;
        }
      });
      setActive(best);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(pick);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  let n = -1; // running row number across groups
  return (
    <div className="wrap grid gap-x-16 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div>
        {children}

        {groups.map((g) => (
          <section key={g.id} aria-labelledby={g.id} className="pb-[clamp(3rem,8vw,6rem)]">
            <h2 id={g.id} className={`${SPACE} scroll-mt-24 text-[clamp(3.25rem,11vw,6rem)] font-bold leading-[0.9] tracking-[-0.05em]`}>
              {g.word}
            </h2>
            <p className="mt-3 text-lg font-semibold" style={{ color: "var(--body)" }}>
              {g.line}
            </p>
            <ol className="mt-8">
              {g.rows.map((r) => {
                const i = ++n;
                const on = i === active;
                return (
                  <li
                    key={r.path}
                    ref={(el) => {
                      rows.current[i] = el;
                    }}
                    className={`border-t-[3px] border-[#2e2e2e]/12 transition-opacity duration-300 last:border-b-[3px] ${hydrated && !on ? "lg:opacity-50" : ""}`}
                  >
                    <Link
                      href={r.path}
                      onMouseEnter={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      className="group grid grid-cols-[1fr_auto] items-start gap-x-5 py-7 sm:grid-cols-[3.25rem_1fr_auto] lg:py-9"
                    >
                      <span aria-hidden className={`${SPACE} hidden pt-1.5 text-xl font-bold text-[#eb602d] sm:block`}>
                        {two(i + 1)}
                      </span>
                      <span className="block min-w-0">
                        <span className="flex flex-wrap items-center gap-x-3 gap-y-2">
                          <span className={`${SPACE} text-[clamp(1.7rem,4.2vw,2.6rem)] font-bold leading-none tracking-[-0.04em] group-hover:text-[#c94d20]`}>
                            {r.name}
                          </span>
                          {r.soon && <span className="pill-soon">Coming soon</span>}
                        </span>
                        <span className="mt-3 block text-[1.05rem] font-bold">{r.promise}</span>
                        <span className="mt-1.5 block max-w-[52ch] leading-relaxed" style={{ color: "var(--body)" }}>
                          {r.description}
                        </span>
                        <span className={`${SPACE} mt-4 inline-flex items-center gap-2 font-bold text-[#c94d20]`}>
                          See how it works
                          <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">
                            →
                          </span>
                        </span>
                      </span>
                      {/* Phone and tablet: the row's own screen, since there is no side phone. */}
                      <Image src={`/app/${r.screen}.webp`} alt="" width={600} height={1245} sizes="104px" className="h-auto w-[88px] sm:w-[104px] lg:hidden" />
                    </Link>
                  </li>
                );
              })}
            </ol>
          </section>
        ))}
      </div>

      {/* Desktop: one phone that follows the page and shows the active row's screen. Decorative: the rows carry the content. */}
      <div className="hidden lg:block" aria-hidden>
        <div className="sticky top-24 flex flex-col items-center pb-10 pt-4">
          <div className="relative" style={{ height: "min(622px, calc(100vh - 11.5rem))", aspectRatio: "600 / 1245" }}>
            {flat.map((r, i) => (
              <Image
                key={r.path}
                src={`/app/${r.screen}.webp`}
                alt=""
                fill
                sizes="300px"
                priority={i === 0}
                className={`object-contain drop-shadow-[0_24px_40px_rgba(46,46,46,0.22)] transition-opacity duration-300 ${i === active ? "opacity-100" : "opacity-0"}`}
              />
            ))}
          </div>
          <p className={`${SPACE} mt-5 flex items-baseline gap-3 font-bold`}>
            <span className="text-[#eb602d]">{two(active + 1)}</span>
            <span className="text-[#2e2e2e]/35">/ {two(flat.length)}</span>
            <span>{flat[active].name}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
