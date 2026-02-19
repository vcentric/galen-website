"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const Features = () => {
  const features = [
    {
      title: "AI Tutor",
      featureTitle: "Learn anything.\nClearly.",
      description:
        "Ask doubts, learn concepts, and get instant clarity — like having a senior always by your side.",
      cta: "Try the AI Tutor",
    },
    {
      title: "Flashcards",
      featureTitle: "Revise smart.\nRetain more.",
      description:
        "Active recall + spaced repetition flashcards built from your syllabus. Study less, remember more.",
      cta: "Start Revising",
    },
    {
      title: "MCQs",
      featureTitle: "Practice with\npurpose.",
      description:
        "Adaptive MCQs that match your level, track your weak areas, and get harder as you improve.",
      cta: "Start Practicing",
    },
  ];

  const comingSoonItems = [
    {
      title: "Clinical Cases",
      subtitle: "Coming soon",
      desc: "Practice diagnosis on realistic clinical scenarios.",
    },
    {
      title: "Study Planner",
      subtitle: "Coming soon",
      desc: "Smart daily plans that adapt to your progress.",
    },
    {
      title: "Performance Dashboard",
      subtitle: "Coming soon",
      desc: "Track strengths, gaps, and growth over time.",
    },
  ];

  const ribbonEmojis = [
    "🧠",
    "💊",
    "🩺",
    "📖",
    "🧬",
    "🫀",
    "💉",
    "🔬",
    "📋",
    "🏥",
    "🧠",
    "💊",
    "🩺",
    "📖",
    "🧬",
    "🫀",
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isSwapping, setIsSwapping] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [isBobbing, setIsBobbing] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const intervalRef = useRef<number | null>(null);

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            setTimeout(() => setIsBobbing(true), 1000);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const DURATION = 8000;

  const goToFeature = useCallback(
    (index: number) => {
      if (index === activeIndex) return;
      setIsSwapping(true);
      setTimeout(() => {
        setActiveIndex(index);
        setProgress(0);
        setIsSwapping(false);
      }, 200);
    },
    [activeIndex]
  );

  // Auto-rotate
  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    const start = Date.now();
    intervalRef.current = window.setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min((elapsed / DURATION) * 100, 100);
      setProgress(pct);

      if (pct >= 100) {
        goToFeature((activeIndex + 1) % features.length);
      }
    }, 16);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [activeIndex, features.length, goToFeature]);

  const currentFeature = features[activeIndex];
  const isComingSoon = activeIndex >= features.length;

  return (
    <section
      ref={sectionRef}
      id="features"
      className={`w-full bg-[#f6f4f1] py-16 px-8 max-[600px]:py-12 max-[600px]:px-6 ${
        isInView ? "is-inview" : ""
      } ${isBobbing ? "is-bobbing" : ""}`}
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Dark Card Container */}
        <div className="bg-[#2e2e2e] rounded-[36px] p-12 grid grid-cols-[1.05fr_0.95fr] gap-12 relative overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.15)] max-[900px]:grid-cols-1 max-[900px]:p-8 max-[900px]:gap-10">
          {/* Left Column */}
          <div className="flex flex-col gap-8">
            {/* Feature Pills */}
            <div className="flex gap-3 flex-wrap items-center max-[900px]:flex-nowrap max-[900px]:overflow-x-auto max-[900px]:pb-2 max-[900px]:[scrollbar-width:none]">
              {features.map((f, i) => (
                <button
                  key={f.title}
                  className={`rounded-full py-[0.85rem] px-7 border-[1.5px] text-white flex items-center cursor-pointer font-[Inter,system-ui,-apple-system,sans-serif] text-[1.05rem] font-medium transition-all duration-[220ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    activeIndex === i
                      ? "border-[#eb602d] bg-[rgba(235,96,45,0.15)] shadow-[0_14px_40px_rgba(235,96,45,0.25)]"
                      : "border-[rgba(255,255,255,0.2)] bg-[rgba(0,0,0,0.25)] hover:-translate-y-[2px] hover:scale-[1.02] hover:shadow-[0_10px_28px_rgba(0,0,0,0.35)] hover:border-[rgba(255,255,255,0.35)]"
                  }`}
                  onClick={() => goToFeature(i)}
                >
                  {f.title}
                </button>
              ))}
              <button className="rounded-full py-[0.85rem] px-7 border-[1.5px] border-[rgba(255,255,255,0.2)] bg-[rgba(0,0,0,0.25)] text-white flex items-center font-[Inter,system-ui,-apple-system,sans-serif] text-[1.05rem] font-medium opacity-50 cursor-not-allowed">
                Coming Soon ✦
              </button>
            </div>

            {/* Content Area */}
            <div
              className={`flex flex-col ${
                isSwapping
                  ? "animate-[contentSwapIn_520ms_cubic-bezier(0.16,1,0.3,1)]"
                  : ""
              }`}
            >
              <h3 className="font-[Inter,system-ui,-apple-system,sans-serif] text-[clamp(2rem,3vw,3rem)] leading-[1.1] tracking-[-0.02em] text-white m-0 mb-4 font-bold whitespace-pre-line max-[900px]:text-[2rem]">
                {currentFeature.featureTitle}
              </h3>
              <p className="m-0 mb-6 font-[Inter,system-ui,-apple-system,sans-serif] text-[1.05rem] leading-[1.6] text-[rgba(255,255,255,0.78)] max-w-[46ch] max-[900px]:text-base">
                {currentFeature.description}
              </p>
              <button className="self-start rounded-full py-[0.85rem] px-7 border-none font-[Inter,system-ui,-apple-system,sans-serif] font-semibold text-base cursor-pointer bg-[#eb602d] text-white transition-all duration-[220ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-[2px] hover:brightness-110">
                {currentFeature.cta}
              </button>
            </div>

            {/* Progress Bar */}
            <div className="mt-6 h-1 w-full max-w-[420px] bg-[rgba(255,255,255,0.12)] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-[rgba(255,255,255,0.7)] origin-left transition-[width] duration-[16ms] linear"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="relative min-h-[520px] flex items-center justify-center max-[900px]:min-h-[460px]">
            {/* Floating Ribbon */}
            <div className="absolute inset-[-30%_-20%] pointer-events-none z-[1] opacity-30">
              <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 -rotate-12 flex gap-5 items-center animate-[ribbonFloat_20s_linear_infinite]">
                {ribbonEmojis.map((emoji, i) => (
                  <div
                    key={i}
                    className="w-[54px] h-[54px] rounded-2xl flex items-center justify-center bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.18)] backdrop-blur-[6px] text-2xl max-[600px]:w-11 max-[600px]:h-11 max-[600px]:text-xl"
                  >
                    {emoji}
                  </div>
                ))}
              </div>
            </div>

            {/* Phone Mockup */}
            <div className="relative z-[2]">
              <div
                className={`phone-notch w-[240px] h-[520px] rounded-[55px] border-[12px] border-[#1d1d1f] overflow-hidden bg-black shadow-[0_30px_80px_rgba(0,0,0,0.55),inset_0_0_0_1px_rgba(255,255,255,0.1)] relative will-change-[transform,opacity] transition-[transform,box-shadow] duration-[260ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-[6px] hover:scale-[1.02] hover:shadow-[0_40px_110px_rgba(0,0,0,0.62)] max-[900px]:w-[300px] max-[900px]:h-[480px] max-[600px]:w-[260px] max-[600px]:h-[420px] ${
                  isInView
                    ? "opacity-100 translate-y-0 scale-100 transition-[opacity,transform,box-shadow] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                    : "opacity-0 translate-y-[26px] scale-[0.995]"
                } ${
                  isBobbing ? "animate-[phoneBob_4.8s_cubic-bezier(0.16,1,0.3,1)_infinite] hover:[animation-play-state:paused]" : ""
                }`}
              >
                {/* Active feature media */}
                {features.map((f, i) => (
                  <div
                    key={i}
                    className={`absolute inset-0 w-full h-full flex items-center justify-center transition-opacity duration-[450ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      activeIndex === i ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <div className="flex flex-col items-center justify-center gap-4 text-[rgba(255,255,255,0.6)]">
                      <span className="font-[Inter,system-ui,-apple-system,sans-serif] text-[1.1rem] font-medium">
                        {f.title}
                      </span>
                    </div>
                  </div>
                ))}

                {/* Coming Soon Content */}
                {isComingSoon && (
                  <div className="absolute inset-0 text-left py-8 px-6 text-[rgba(255,255,255,0.85)] font-[Inter,system-ui,-apple-system,sans-serif] flex flex-col gap-6 opacity-100">
                    {comingSoonItems.map((item, i) => (
                      <div key={i} className="flex flex-col gap-1">
                        <span className="text-[0.95rem] font-bold text-[rgba(255,255,255,0.95)]">
                          {item.title}
                        </span>
                        <span className="text-[0.8rem] font-semibold text-[rgba(255,255,255,0.7)] italic">
                          {item.subtitle}
                        </span>
                        <span className="text-[0.75rem] leading-[1.4] text-[rgba(255,255,255,0.6)]">
                          {item.desc}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
