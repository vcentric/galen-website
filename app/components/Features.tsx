"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";

const DURATION = 3; // seconds per card

const features = [
  {
    id: 0,
    tag: "AI Tutor",
    title: "Your Personal Medical Tutor, On Demand",
    desc: "Ask questions the way you actually think. GalenAI explains concepts step-by-step, aligned with standard textbooks — so you stop guessing and start understanding.",
    screen: "/mobile.png",
  },
  {
    id: 1,
    tag: "Question Banks",
    title: "Practice Questions That Tell You Why, Not Just What",
    desc: "Every question becomes a learning moment. Get explanations that connect concepts, highlight traps, and show how examiners think — not just the right option.",
    screen: "/qbanks.png",
  },
  {
    id: 2,
    tag: "Flashcards",
    title: "Remember What Actually Matters",
    desc: "High-yield flashcards built from concepts — not random facts. Perfect for quick revisions, spaced recall, and busy days.",
    screen: "/Flashcards.png",
  },
  {
    id: 3,
    tag: "Clinical Cases",
    title: "Learn Medicine the Way It's Practiced",
    desc: "Work through real-world clinical scenarios. Build diagnostic thinking, connect theory to patients, and prepare for viva and ward discussions — not just MCQs.",
    screen: "/clinicalcases.png",
  },
  {
    id: 4,
    tag: "Coming Soon",
    title: "More Powerful Features on the Way",
    desc: "We're constantly building. AI-powered study plans, peer collaboration tools, and faculty dashboards are headed your way.",
    screen: "/mobile.png",
  },
];

const Features = () => {
  const [active, setActive] = useState(0);
  const screenRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const isFirstRender = useRef(true);

  const goTo = useCallback((idx: number) => {
    setActive(idx);
  }, []);

  // Start/restart the progress bar whenever active changes
  useEffect(() => {
    const target = `[data-bar-id="${active}"]`;

    tweenRef.current?.kill();
    gsap.set(target, { width: "0%" });

    tweenRef.current = gsap.to(target, {
      width: "100%",
      duration: DURATION,
      ease: "none",
      onComplete: () => {
        setActive((prev) => (prev + 1) % features.length);
      },
    });

    return () => { tweenRef.current?.kill(); };
  }, [active]);

  // GSAP slide-from-right on phone screen
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (!screenRef.current) return;
    gsap.fromTo(
      screenRef.current,
      { x: "100%", opacity: 0.4 },
      { x: "0%", opacity: 1, duration: 0.45, ease: "power3.out" }
    );
  }, [active]);

  const current = features[active];

  return (
    <section id="features" className="w-full py-[clamp(4rem,10vw,4rem)] px-[clamp(2rem,6vw,4rem)] font-sans relative z-10">
      <div className="max-w-[1100px] mx-auto">

        {/* Section label */}
        <span className="text-[clamp(0.75rem,2vw,0.85rem)] text-[#666] font-semibold tracking-widest uppercase mb-[clamp(1rem,3vw,1.5rem)] block">
          FEATURES
        </span>

        {/* Section headline */}
        <h2 className="text-[clamp(2.25rem,5vw,3.25rem)] font-medium font-[var(--font-space-var)] text-dark tracking-[-0.03em] leading-[1.1] mb-[clamp(1.5rem,6vw,1rem)]">
          Everything you need to{" "}
          <span className="text-orange">ace medicine</span>
        </h2>

        {/* Main layout */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-20 items-start lg:items-center">

          {/* Left — Feature list */}
          <div className="w-full lg:w-[62%] flex flex-col h-auto lg:h-[650px]">
            {features.map((f, i) => {
              const isActive = f.id === active;
              const isComingSoon = f.tag === "Coming Soon";
              return (
                <button
                  key={f.id}
                  onClick={() => goTo(f.id)}
                  className="w-full text-left group cursor-pointer"
                >
                  <div className={`flex gap-5 py-5 border-b border-border`}>

                    {/* Left accent bar + number */}
                    <div className="flex flex-col items-center gap-1.5 pt-0.5 shrink-0">
                      <div className={`w-[2px] h-5 rounded-full transition-colors duration-300 ${isActive ? "bg-orange" : "bg-border-strong"}`} />
                      <span className={`text-[10px] font-semibold tabular-nums transition-colors duration-300 ${isActive ? "text-orange" : "text-text-secondary"}`}>
                        0{i + 1}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className={`text-[12px] font-bold uppercase tracking-[0.15em] transition-colors duration-300 ${isActive ? "text-orange" : "text-text-secondary"}`}>
                          {f.tag}
                        </span>
                        {isComingSoon && (
                          <span className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-orange/10 text-orange border border-orange/25">
                            Coming Soon
                          </span>
                        )}
                      </div>

                      <h3 className={`font-[var(--font-space-var)] font-semibold leading-snug tracking-tight transition-all duration-300 ${
                        isActive
                          ? "text-dark text-[1.5rem] md:text-[2rem]"
                          : "text-text-secondary text-[1.15rem] md:text-[1.5rem] group-hover:text-dark"
                      }`}>
                        {f.title}
                      </h3>

                      {/* Expandable description + progress bar */}
                      <div className={`overflow-hidden transition-all duration-400 ${isActive ? "max-h-40 opacity-100 mt-2.5" : "max-h-0 opacity-0"}`}>
                        <p className="text-[0.95rem] md:text-[1.1rem] text-text-secondary leading-[1.65]">
                          {f.desc}
                        </p>

                        {/* GSAP progress bar */}
                        <div className="mt-4 h-[2px] w-full bg-border rounded-full overflow-hidden">
                          <div
                            data-bar-id={f.id}
                            className="h-full bg-orange rounded-full"
                            style={{ width: "0%" }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right — Phone mockup */}
          <div className="w-full lg:w-[38%] flex justify-center items-center">
            <div className="relative w-full max-w-[240px] sm:max-w-[280px] mx-auto p-3 sm:p-4 bg-[#f4f4f4] rounded-[40px] sm:rounded-[48px]">
              {/* Phone shell */}
              <div className="bg-[#151516] rounded-[36px] p-[5px] shadow-sm border border-[#2a2a2c] aspect-[9/19.5] relative overflow-hidden">
                <div className="relative w-full h-full rounded-[30px] overflow-hidden bg-black">
                  <div ref={screenRef} className="absolute inset-0">
                    <Image
                      src={current.screen}
                      alt={current.title}
                      fill
                      className="object-cover object-top scale-[0.97]"
                      sizes="1500px"
                    />
                  </div>
                </div>
                {/* Notch */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-[5px] rounded-full bg-[#2a2a2c] z-10" />
              </div>

              {/* Dot indicators */}
              <div className="flex justify-center gap-2 mt-5">
                {features.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => goTo(f.id)}
                    className={`rounded-full transition-all duration-300 cursor-pointer ${
                      f.id === active
                        ? "w-5 h-1.5 bg-orange"
                        : "w-1.5 h-1.5 bg-border-strong"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* CTA */}
        <div className="mt-[clamp(3rem,8vw,5rem)] flex justify-center">
          <a
            href="#ask"
            className="group inline-flex items-center text-[clamp(1.75rem,4vw,3rem)] font-semibold font-[var(--font-space-var)] text-dark tracking-tight no-underline"
            onMouseEnter={(e) => {
              const path = e.currentTarget.querySelector("path");
              if (path) gsap.to(path, { strokeDashoffset: 0, duration: 0.3, ease: "power3.out" });
            }}
            onMouseLeave={(e) => {
              const path = e.currentTarget.querySelector("path");
              if (path) gsap.to(path, { strokeDashoffset: 1, duration: 0.25, ease: "power3.in" });
            }}
          >
            {/* Text — underline SVG only covers this span */}
            <span className="relative">
              Start Learning Today!
              <svg
                viewBox="0 0 100 10"
                className="absolute left-0 bottom-[-5px] w-full h-[9px] pointer-events-none"
                preserveAspectRatio="none"
              >
                <path
                  d="M2 5 Q 50 10 98 5"
                  stroke="var(--color-orange)"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="butt"
                  pathLength={1}
                  style={{ strokeDasharray: 1, strokeDashoffset: 1 }}
                />
              </svg>
            </span>

            {/* Arrow — clip-slides in from right, then rotates */}
            <span
              className="overflow-hidden flex items-center w-0 group-hover:w-[clamp(3.25rem,6vw,4.25rem)] ml-0 group-hover:ml-4 transition-[width,margin] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] self-center"
            >
              <span className="flex-shrink-0 flex items-center justify-center w-[clamp(2.5rem,5vw,3.5rem)] h-[clamp(2.5rem,5vw,3.5rem)] rounded-full bg-orange text-white">
                <ArrowUpRightIcon
                  className="w-[45%] h-[45%] flex-shrink-0 rotate-45 group-hover:rotate-0 transition-transform duration-400 delay-150 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                  strokeWidth={2.5}
                />
              </span>
            </span>
          </a>
        </div>

      </div>
    </section>
  );
};

export default Features;