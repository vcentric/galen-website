"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";

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
    <section className="w-full py-[clamp(4rem,10vw,4rem)] px-[clamp(1rem,5vw,2rem)] font-sans relative z-10">
      <div className="max-w-[1100px] mx-auto">

        {/* Section label */}
        <span className="text-[clamp(0.75rem,2vw,0.85rem)] text-[#666] font-semibold tracking-widest uppercase mb-[clamp(1rem,3vw,1.5rem)] block">
          FEATURES
        </span>

        {/* Section headline */}
        <h2 className="text-[clamp(2.25rem,4.5vw,3.25rem)] font-medium font-[var(--font-space-var)] text-[var(--color-dark)] tracking-[-0.03em] leading-[1.1] mb-[clamp(2.5rem,6vw,1rem)] max-w-[600px]">
          Everything you need to{" "}
          <span className="text-[var(--color-orange)]">ace medicine</span>
        </h2>

        {/* Main layout */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">

          {/* Left — Feature list */}
          <div className="w-full lg:w-[60%] flex flex-col">
            {features.map((f, i) => {
              const isActive = f.id === active;
              const isComingSoon = f.tag === "Coming Soon";
              return (
                <button
                  key={f.id}
                  onClick={() => goTo(f.id)}
                  className="w-full text-left group cursor-pointer"
                >
                  <div className={`flex gap-5 py-5 border-b border-[var(--color-border)]`}>

                    {/* Left accent bar + number */}
                    <div className="flex flex-col items-center gap-1.5 pt-0.5 shrink-0">
                      <div className={`w-[2px] h-5 rounded-full transition-colors duration-300 ${isActive ? "bg-[var(--color-orange)]" : "bg-[var(--color-border-strong)]"}`} />
                      <span className={`text-[10px] font-semibold tabular-nums transition-colors duration-300 ${isActive ? "text-[var(--color-orange)]" : "text-[var(--color-text-secondary)]"}`}>
                        0{i + 1}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className={`text-[12px] font-bold uppercase tracking-[0.15em] transition-colors duration-300 ${isActive ? "text-[var(--color-orange)]" : "text-[var(--color-text-secondary)]"}`}>
                          {f.tag}
                        </span>
                        {isComingSoon && (
                          <span className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-[var(--color-orange)]/10 text-[var(--color-orange)] border border-[var(--color-orange)]/25">
                            Coming Soon
                          </span>
                        )}
                      </div>

                      <h3 className={`font-[var(--font-space-var)] font-semibold leading-snug tracking-tight transition-all duration-300 ${
                        isActive
                          ? "text-[var(--color-dark)] text-[1.75rem]"
                          : "text-[var(--color-text-secondary)] text-[1.3rem] group-hover:text-[var(--color-dark)]"
                      }`}>
                        {f.title}
                      </h3>

                      {/* Expandable description + progress bar */}
                      <div className={`overflow-hidden transition-all duration-400 ${isActive ? "max-h-40 opacity-100 mt-2.5" : "max-h-0 opacity-0"}`}>
                        <p className="text-[1.1rem] text-[var(--color-text-secondary)] leading-[1.65]">
                          {f.desc}
                        </p>

                        {/* GSAP progress bar */}
                        <div className="mt-4 h-[2px] w-full bg-[var(--color-border)] rounded-full overflow-hidden">
                          <div
                            data-bar-id={f.id}
                            className="h-full bg-[var(--color-orange)] rounded-full"
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
          <div className="w-full lg:w-[50%] flex justify-center items-start sticky top-8">
            <div className="relative w-full max-w-[300px] mx-auto">
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
                        ? "w-5 h-1.5 bg-[var(--color-orange)]"
                        : "w-1.5 h-1.5 bg-[var(--color-border-strong)]"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Features;