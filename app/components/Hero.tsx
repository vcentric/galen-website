"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

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
  const [isDeleting, setIsDeleting] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [delta, setDelta] = useState(100);

  const tick = useCallback(() => {
    const i = textIndex % PHRASES.length;
    const fullText = PHRASES[i];
    const updatedText = isDeleting
      ? fullText.substring(0, displayText.length - 1)
      : fullText.substring(0, displayText.length + 1);

    setDisplayText(updatedText);

    if (isDeleting) {
      setDelta(50);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setDelta(2000);
    } else if (isDeleting && updatedText === "") {
      setIsDeleting(false);
      setTextIndex(textIndex + 1);
      setDelta(100);
    } else if (!isDeleting && updatedText !== fullText) {
      setDelta(100);
    }
  }, [displayText, isDeleting, textIndex]);

  useEffect(() => {
    const ticker = setInterval(() => {
      tick();
    }, delta);
    return () => clearInterval(ticker);
  }, [tick, delta]);


  const [selectedAudience, setSelectedAudience] = useState<'students' | 'institutions'>('students');

  return (
    <section
      className="min-h-screen pt-32 pb-12 px-8 bg-transparent flex justify-center items-center overflow-visible relative"
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
            <span className="text-[#eb602d] italic">
              &gt; {displayText}
            </span>
            <span className="font-thin text-[#eb602d] animate-[blink_1s_step-end_infinite] ml-1">
              |
            </span>
          </h1>

          <p className="text-[1.15rem] leading-[1.6] text-[rgba(46,46,46,0.7)] max-w-[600px] mb-12 mx-auto">
            GalenAI is your AI medical mentor that explains, tests, and guides
            you, so you spend less time planning and more time understanding.
          </p>

          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <a
              href="#ask"
              className="py-[0.8rem] px-8 rounded-xl text-base font-medium no-underline transition-all duration-200 inline-block bg-[#eb602d] text-white border border-[#eb602d] hover:brightness-110 hover:-translate-y-[1px]"
            >
              Ask GalenAI
            </a>
            <a
              href="#download"
              className="py-[0.8rem] px-8 rounded-xl text-base font-medium no-underline transition-all duration-200 inline-block text-[#2e2e2e] border border-[rgba(46,46,46,0.2)] bg-transparent hover:bg-[rgba(46,46,46,0.05)]"
            >
              Download Now
            </a>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-12 text-[0.875rem] text-[rgba(46,46,46,0.6)]">
            
            <div className="flex items-center gap-4">
              <span className="text-[0.8rem] opacity-50 uppercase tracking-[0.05em]">
                Backed by
              </span>
              <span className="text-[0.8rem] font-medium text-[rgba(46,46,46,0.5)] tracking-[-0.01em]">
                Kerala Startup Mission
              </span>
              <span className="text-[0.8rem] font-medium text-[rgba(46,46,46,0.5)] tracking-[-0.01em]">
                Google Cloud
              </span>
            </div>
          </div>
        </div>

        {/* Huge Video Below */}
        <div className="w-full aspect-video bg-[#1a1a1a] rounded-[1.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15),0_10px_20px_rgba(0,0,0,0.1)] border-[4px] border-white/20 mt-8 max-w-[1200px]">
          <div className="relative w-full h-full bg-black flex items-center justify-center">
            <iframe
              src="https://www.youtube.com/embed/1l0-dJic1dE?autoplay=1&mute=1&controls=0&rel=0&loop=1&playlist=1l0-dJic1dE"
              className="w-full h-full border-none pointer-events-none scale-[1.35]" 
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
