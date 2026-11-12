"use client";

import { useEffect, useState } from "react";
import type { CtaIntent } from "@/lib/cta";
import CtaLink from "./CtaLink";

/**
 * Phone-only bar that appears once the hero CTA has scrolled away, so the primary
 * action is always one thumb-tap from anywhere on the page.
 * Fixed position, so it never causes layout shift.
 */
export default function StickyMobileCta({
  intent,
  source,
  label,
}: {
  intent: CtaIntent;
  source: string;
  label?: string;
}) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div
      className={`md:hidden fixed inset-x-0 bottom-0 z-50 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] bg-[#fff0e4]/95 backdrop-blur border-t border-black/10 transition-transform duration-200 ${show ? "translate-y-0" : "translate-y-full"}`}
      aria-hidden={!show}
    >
      <CtaLink intent={intent} source={`${source}_sticky`} label={label} className="w-full" />
    </div>
  );
}
