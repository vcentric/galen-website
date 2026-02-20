"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowRightIcon, ArrowDownTrayIcon } from "@heroicons/react/24/outline";

const PHRASES = [
  "for daily medical learning.",
  "to crack medical exams.",
  "that saves time for you.",
];

interface AudienceButtonProps {
  audience: "students" | "institutions";
  isActive: boolean;
  onClick: () => void;
}

const AudienceButton = ({ audience, isActive, onClick }: AudienceButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  const { contextSafe } = useGSAP({ scope: buttonRef });

  // Animate based on active state changes
  useGSAP(() => {
    gsap.to(pathRef.current, {
      strokeDashoffset: isActive ? 0 : 1,
      duration: 0.25,
      ease: "power3.out",
      overwrite: "auto",
    });
  }, { scope: buttonRef, dependencies: [isActive] });

  // Hover animations
  const handleMouseEnter = contextSafe(() => {
    if (!isActive) {
      gsap.to(pathRef.current, {
        strokeDashoffset: 0,
        duration: 0.25,
        ease: "power3.out",
        overwrite: "auto",
      });
    }
  });

  const handleMouseLeave = contextSafe(() => {
    if (!isActive) {
      gsap.to(pathRef.current, {
        strokeDashoffset: 1,
        duration: 0.25,
        ease: "power3.in",
        overwrite: "auto",
      });
    }
  });

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative pb-2 text-[1.1rem] font-medium border-none bg-transparent cursor-pointer transition-opacity duration-200 capitalize ${
        isActive
          ? "text-[#2e2e2e] opacity-100"
          : "text-[#2e2e2e] opacity-50 hover:opacity-100"
      }`}
    >
      {audience}
      {/* Pen Stroke Underline - Animated by GSAP */}
      <svg
        viewBox="0 0 100 10"
        className="absolute left-0 bottom-0 w-full h-[8px] pointer-events-none"
        preserveAspectRatio="none"
      >
        <path
          ref={pathRef}
          d="M2 5 Q 50 10 98 5"
          stroke="#eb602d"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          pathLength={1}
          style={{
            strokeDasharray: 1,
            strokeDashoffset: 1, // Start hidden
          }}
        />
      </svg>
    </button>
  );
};

const Hero = () => {
  const [textIndex, setTextIndex] = useState(0);
  const textContainerRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const container = textContainerRef.current;
    if (!container) return;

    // Select all the character spans we rendered
    const chars = gsap.utils.toArray(container.querySelectorAll('.char-span'));
    
    // Hide all characters initially
    gsap.set(chars, { display: "none" });

    // Animate them appearing sequentially to mimic typing
    const tl = gsap.timeline({
      onComplete: () => {
        // Wait 1.5s after finishing typing, then move to next phrase (which instantly clears)
        setTimeout(() => {
          setTextIndex((prev) => (prev + 1) % PHRASES.length);
        }, 1500);
      }
    });

    if (chars.length > 0) {
      tl.to(chars, {
        display: "inline-block",
        duration: 0.001, // Instant appearance per char
        stagger: 0.04,   // Fast typing speed
        ease: "none"
      });
    }

    return () => {
      tl.kill();
    };
  }, { dependencies: [textIndex], scope: textContainerRef });


  const [selectedAudience, setSelectedAudience] = useState<'students' | 'institutions'>('students');

  return (
    <section
      className="min-h-screen pt-20 pb-12 px-8 bg-transparent flex justify-center items-center overflow-visible relative"
    >
      <div className="max-w-[1400px] w-full flex flex-col items-center gap-16 relative z-[2] py-12">
        {/* Centered Text Content */}
        <div className="flex flex-col items-center text-center max-w-[900px] mx-auto">
          {/* Audience Toggle */}
          <div className="inline-flex gap-12 mb-7 relative">
            {(['students', 'institutions'] as const).map((audience) => (
              <AudienceButton
                key={audience}
                audience={audience}
                isActive={selectedAudience === audience}
                onClick={() => setSelectedAudience(audience)}
              />
            ))}
          </div>

          {/* Exam Keywords (Hidden but kept in memory) */}
          {/* <div className="flex flex-wrap justify-center gap-6 mb-8">
            {["NEET PG", "NEET SS", "EMREE", "FMGE"].map((exam) => (
              <span
                key={exam}
                className="text-[0.875rem] font-medium text-[#2e2e2e] opacity-40 tracking-[0.05em] uppercase"
              >
                {exam}
              </span>
            ))}
          </div> */}

          <h1 className="text-[4.25rem] font-medium leading-[1.1] text-[#2e2e2e] mb-8 tracking-[-0.03em] max-[768px]:text-[2.5rem]">
            Your personal AI companion <br />
            <div className="flex items-center justify-center text-[#eb602d] italic">
              <span className="mr-3 whitespace-nowrap">&gt;</span>
              <span className="inline-block text-left min-w-[300px]" ref={textContainerRef}>
                {PHRASES[textIndex].split("").map((char, index) => (
                  <span key={`${textIndex}-${index}`} className="char-span whitespace-pre">
                    {char}
                  </span>
                ))}
                <span className="font-thin text-[#eb602d] animate-[blink_1s_step-end_infinite] ml-1 not-italic">
                  |
                </span>
              </span>
            </div>
          </h1>

          <p className="text-[1.15rem] leading-[1.6] text-[rgba(46,46,46,0.7)] max-w-[600px] mb-12 mx-auto">
            GalenAI is your AI medical mentor that explains, tests, and guides
            you, so you spend less time planning and more time understanding.
          </p>

          <div className="flex flex-wrap justify-center items-center gap-5 mb-12">
            <a
              href="#ask"
              className="group relative flex items-center justify-center gap-2 py-[0.85rem] px-8 rounded-full text-[1rem] font-primary font-medium text-white bg-[#eb602d] no-underline transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-105 active:scale-[0.98] shadow-[inset_2px_2px_6px_rgba(255,255,255,0.2),0_-2px_10px_rgba(0,0,0,0.1)]"
            >
              <span className="text-white">Ask GalenAI</span>
              <ArrowRightIcon className="text-white w-[1.1rem] h-[1.1rem] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1" strokeWidth={2.5} />
            </a>
            <a
              href="#download"
              className="group relative flex items-center justify-center gap-2 py-[0.85rem] px-8 rounded-full text-[1rem] font-primary font-medium text-[#2e2e2e] bg-white border border-[#2e2e2e]/15 no-underline transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-[#2e2e2e]/40 hover:bg-[#2e2e2e]/[0.03] active:scale-[0.98]"
            >
              <span>Download Now</span>
              <ArrowDownTrayIcon className="w-[1.1rem] h-[1.1rem] opacity-60 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100 group-hover:-translate-y-0.5" strokeWidth={2.5} />
            </a>
          </div>

          <div className="flex flex-wrap justify-center items-center text-[0.875rem] text-[rgba(46,46,46,0.6)]">
            
            <div className="flex  items-center gap-5">
              <span className="text-[0.8rem] opacity-50 uppercase tracking-[0.05em]">
                Backed by
              </span>
           
                <img 
                src="/googlecloud.png" 
                alt="Google Cloud" 
                className="h-8 w-auto opacity-70 hover:opacity-100 transition-opacity"
              />
              <img 
                src="/ksum.png" 
                alt="Kerala Startup Mission" 
                className="h-15 w-auto opacity-70 hover:opacity-100 transition-opacity"
              />

              
            </div>
          </div>
        </div>

        {/* Video Container Below */}
        <div className="w-full aspect-video relative max-w-[1300px] z-10 group">
          {/* Subtle glow effect behind the player */}
          <div className="absolute inset-0 bg-[#eb602d]/10 blur-[100px] opacity-0 transition-opacity duration-700 group-hover:opacity-100 rounded-full pointer-events-none"></div>
          
          {/* Container explicitly crops the top/bottom bits of YouTube to hide the forced title overlay */}
          <div className="relative w-full h-full rounded-[0.5rem] overflow-hidden bg-transparent border border-black/5 shadow-sm transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.01] flex items-center justify-center">
            <iframe
              src="https://www.youtube.com/embed/1l0-dJic1dE?autoplay=1&mute=1&controls=0&rel=0&loop=1&playlist=1l0-dJic1dE&modestbranding=1&showinfo=0&fs=0&disablekb=1&playsinline=1"
              className="absolute w-[120%] h-[120%] border-none pointer-events-none opacity-90 transition-opacity duration-500 group-hover:opacity-100" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
