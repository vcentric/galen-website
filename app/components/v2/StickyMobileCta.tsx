"use client";

import { useEffect, useState } from "react";
import type { CtaIntent } from "@/lib/cta";
import { findClosingCta } from "@/lib/closing";
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
    // Shown once the hero's own button has scrolled away, and hidden again when the page's closing
    // call to action or the footer is on screen: they carry the same button, so two would be noise.
    let scrolled = false;
    const near = new Set<Element>();
    const update = () => setShow(scrolled && near.size === 0);
    const onScroll = () => {
      scrolled = window.scrollY > 520;
      update();
    };
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? near.add(e.target) : near.delete(e.target)));
      update();
    });
    [document.querySelector("footer"), findClosingCta()].forEach((el) => el && io.observe(el));
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);
  return (
    <div data-sticky-cta className="sticky-cta" data-show={show ? "" : undefined} aria-hidden={!show} inert={!show}>
      <CtaLink intent={intent} source={`${source}_sticky`} label={label} className="w-full" />
    </div>
  );
}
