"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { features, COMING_SOON_DATA } from "../data/features";
import { trackEvent, trackCTAClick } from "../../lib/analytics";
import { decorateUrl } from "../../lib/utm";

const DURATION = 3; // seconds per card



const Features = () => {
  const [active, setActive] = useState(0);
  const screenRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const isFirstRender = useRef(true);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const swipeDirection = useRef<number>(1); // 1 = forward, -1 = backward

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      swipeDirection.current = 1;
      setActive((prev) => (prev + 1) % features.length);
    } else if (isRightSwipe) {
      swipeDirection.current = -1;
      setActive((prev) => (prev - 1 + features.length) % features.length);
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

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
      duration: (current as any).duration || DURATION,
      ease: "none",
      onComplete: () => {
        swipeDirection.current = 1; // auto-advance is always forward
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
    const startX = swipeDirection.current > 0 ? "100%" : "-100%";
    gsap.fromTo(
      screenRef.current,
      { x: startX, opacity: 0.4 },
      { x: "0%", opacity: 1, duration: 0.45, ease: "power3.out" }
    );
  }, [active]);

  const current = features[active];

  return (
    <section id="features" className="w-full py-[clamp(4rem,10vw,4rem)] px-[clamp(2rem,6vw,4rem)] font-sans relative z-10">
      <div className="max-w-[1100px] mx-auto">

        {/* Navigation Pills — above everything */}
        <div className="flex flex-wrap justify-center gap-x-2 gap-y-2.5 lg:gap-3 mb-8 lg:mb-10">
          {features.map((f) => {
            const isActive = f.id === active;
            return (
              <button
                key={`pill-${f.id}`}
                onClick={() => goTo(f.id)}
                className={`flex items-center shrink-0 px-2.5 lg:px-4.5 py-1.5 lg:py-2 rounded-full border transition-all duration-300 backdrop-blur-md cursor-pointer ${
                  isActive
                    ? "bg-orange text-white border-orange shadow-md scale-105"
                    : "bg-white/70 text-orange border-orange/40 hover:border-orange/60"
                }`}
                style={!isActive ? { 
                  boxShadow: 'inset 0 1.5px 3px rgba(235, 96, 45, 0.3), 0 1px 2px rgba(0, 0, 0, 0.03)'
                } : {}}
              >
                <span className="text-[10px] lg:text-[12px] font-bold tracking-[0.06em] uppercase whitespace-nowrap">
                  {f.tag}
                </span>
              </button>
            );
          })}
        </div>

        {/* Main layout */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-20 items-start lg:items-center">

          {/* Unified Column (Mobile: Column, Desktop: 2/3 and 1/3 split) */}
          <div className="w-full lg:w-2/3 flex flex-col justify-center">
            
            {/* Active Feature Content */}
            <div key={active} className="animate-[fadeIn_0.6s_ease-out_forwards] mb-6 lg:mb-0 text-center lg:text-left">
              <h2 className="text-[clamp(2.1rem,5vw,3.25rem)] font-medium font-[var(--font-space-var)] text-dark tracking-[-0.03em] leading-[1.1] mb-6">
                {current.title}
              </h2>

              <p className="text-[1rem] sm:text-[1.25rem] text-text-secondary leading-[1.6] mb-8 lg:mb-12 max-w-[95%] mx-auto lg:mx-0">
                {current.desc}
              </p>

              <div className="h-[3px] w-full bg-border rounded-full overflow-hidden">
                <div
                  data-bar-id={active}
                  className="h-full bg-orange rounded-full"
                  style={{ width: "0%" }}
                />
              </div>
            </div>
          </div>

          {/* Phone mockup (Now universal and following content on mobile) */}
          <div className="w-full lg:w-1/3 flex justify-center items-center mt-0 lg:mt-0">
            <div 
              className="relative w-full max-w-[240px] sm:max-w-[280px] mx-auto p-3 sm:p-4 bg-[#f4f4f4] rounded-[40px] sm:rounded-[48px] touch-pan-y pointer-events-auto"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* Phone shell */}
              <div className="bg-[#151516] rounded-[36px] p-[5px] shadow-sm border border-[#2a2a2c] aspect-[9/19.5] relative overflow-hidden pointer-events-none">
                <div className="relative w-full h-full rounded-[30px] overflow-hidden bg-black">
                  <div ref={screenRef} className="absolute inset-0 w-full h-full">
                    {current.tag === "Coming Soon" ? (
                      <div className="w-full h-full bg-[#0a0a0a] text-white overflow-y-auto flex flex-col [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                        <div 
                          className="relative w-full min-h-full p-3 sm:p-3.5 flex flex-col justify-center py-6"
                          style={{
                            backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)",
                            backgroundSize: "30px 30px"
                          }}
                        >
                          <div className="mb-4">
                            <div className="flex items-center gap-1.5 mb-2.5">
                              <div className="relative flex items-center justify-center">
                                <div className="absolute w-2.5 h-2.5 bg-orange/40 rounded-full blur-[2px]"></div>
                                <div className="relative w-[3.5px] h-[3.5px] bg-[#fdbd9c] rounded-full"></div>
                              </div>
                              <div className="h-[1px] w-3.5 bg-orange/40"></div>
                              <span className="text-orange text-[8px] sm:text-[9px] font-bold tracking-[0.15em]">WHAT'S NEXT</span>
                            </div>
                            
                            <div className="font-[var(--font-space-var)] font-bold mb-3 leading-[0.95]">
                              <div className="text-[30px] sm:text-[34px] tracking-tight">Coming</div>
                              <div className="flex items-center text-[30px] sm:text-[34px] text-orange tracking-tight">
                                <span className="mr-1">&gt;</span> Soon.
                              </div>
                            </div>
                            
                            <p className="text-[10px] sm:text-[11px] text-[#8a8a8e] leading-[1.35] font-medium max-w-[95%]">
                              Future updates rolling out to make your medical prep smarter.
                            </p>
                          </div>

                          <div className="flex items-center gap-2 mb-3.5">
                            <div className="h-[1px] flex-grow bg-white/[0.08]"></div>
                            <span className="text-[9px] font-bold tracking-[0.15em] text-[#555]">UPCOMING</span>
                          </div>

                          <div className="flex flex-col gap-2.5">
                            {COMING_SOON_DATA.map((item, idx) => (
                              <div key={idx} className="flex gap-2.5 sm:gap-3 p-2 sm:p-2.5 rounded-[14px] bg-white/[0.02] border border-white/[0.08]">
                                <div className="flex-shrink-0 w-[32px] h-[32px] sm:w-[36px] sm:h-[36px] rounded-lg bg-transparent border border-orange/30 flex items-center justify-center mt-0.5">
                                  <span className="text-[#fdbd9c] font-bold text-[11px] sm:text-[12px]">
                                    {String(idx + 1).padStart(2, '0')}
                                  </span>
                                </div>
                                <div className="flex flex-col justify-center gap-0.5">
                                  <h3 className="text-[11.5px] sm:text-[12.5px] font-bold text-white leading-tight">
                                    {item.title}
                                  </h3>
                                  <p className="text-[9.5px] sm:text-[10.5px] pr-1 text-[#8a8a8e] leading-[1.3]">
                                    {item.desc}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <>
                        {(current as any).video ? (
                          <video
                            key={(current as any).video}
                            src={(current as any).video}
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="w-full h-full object-cover object-top scale-[0.97]"
                          />
                        ) : (
                          <Image
                            src={current.screen}
                            alt={current.title}
                            fill
                            className="object-cover object-top scale-[0.97]"
                            sizes="1500px"
                          />
                        )}
                      </>
                    )}
                  </div>
                </div>
                {/* Notch */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-[5px] rounded-full bg-[#2a2a2c] z-10" />
              </div>

              {/* Dot indicators */}
              <div className="flex justify-center gap-3 mt-6 lg:mt-8">
                {features.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => goTo(f.id)}
                    className={`rounded-full transition-all duration-300 cursor-pointer ${
                      f.id === active
                        ? "w-5 h-1.5 lg:w-8 lg:h-2 bg-orange"
                        : "w-1.5 h-1.5 lg:w-2 lg:h-2 bg-border-strong"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* CTA */}
        <div className="mt-8 lg:mt-12 flex justify-center">
          <a
            href={decorateUrl("/qr")}
            onClick={() => {
              trackEvent("features_cta_click");
              trackCTAClick("qr", { source: "features" });
            }}
            className="group inline-flex items-center text-[clamp(1.75rem,4vw,3rem)] font-semibold font-[var(--font-space-var)] text-dark tracking-tight no-underline transition-all duration-300 hover:text-orange"
          >
            {/* Text — underline SVG only covers this span */}
            <span className="relative whitespace-nowrap">
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
                  style={{ strokeDasharray: 1, strokeDashoffset: 0 }}
                />
              </svg>
            </span>

            {/* Arrow — Improved CSS reveal and rotation */}
            <span
              className="cta-arrow-container overflow-hidden flex items-center w-[clamp(3.25rem,6vw,4.25rem)] ml-4 self-center opacity-100 transition-all duration-500 ease-out"
            >
              <span className="flex-shrink-0 flex items-center justify-center w-[clamp(2.5rem,5vw,3.5rem)] h-[clamp(2.5rem,5vw,3.5rem)] rounded-full bg-orange text-white shadow-lg shadow-orange/20 transition-transform duration-300">
                <ArrowUpRightIcon
                  className="cta-arrow-icon w-[45%] h-[45%] flex-shrink-0 rotate-45 transition-transform duration-300 ease-out group-hover:rotate-0"
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