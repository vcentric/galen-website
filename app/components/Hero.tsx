"use client";

import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { QrCodeIcon, ArrowUpRightIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

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
          ? "text-dark opacity-100"
          : "text-dark opacity-50 hover:opacity-100"
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
          stroke="var(--color-orange)"
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

  const downloadBtnRef = useRef<HTMLAnchorElement>(null);
  const downloadUnderlineRef = useRef<HTMLSpanElement>(null);

  const { contextSafe: contextSafeDownload } = useGSAP({ scope: downloadBtnRef });

  useGSAP(() => {
    gsap.set(downloadUnderlineRef.current, { scaleX: 0, transformOrigin: "left center" });
  }, { scope: downloadBtnRef });

  const handleDownloadEnter = contextSafeDownload(() => {
    gsap.set(downloadUnderlineRef.current, { transformOrigin: "left center" });
    gsap.to(downloadUnderlineRef.current, {
      scaleX: 1,
      duration: 0.4,
      ease: "power3.out",
      overwrite: "auto"
    });
  });

  const handleDownloadLeave = contextSafeDownload(() => {
    gsap.set(downloadUnderlineRef.current, { transformOrigin: "right center" });
    gsap.to(downloadUnderlineRef.current, {
      scaleX: 0,
      duration: 0.3,
      ease: "power3.in",
      overwrite: "auto"
    });
  });

  const tryBtnRef = useRef<HTMLAnchorElement>(null);
  const tryBgRef = useRef<HTMLDivElement>(null);
  const tryTextRef = useRef<HTMLSpanElement>(null);
  const tryIconRef = useRef<SVGSVGElement>(null);

  const { contextSafe: contextSafeTry } = useGSAP({ scope: tryBtnRef });

  useGSAP(() => {
    gsap.set(tryBgRef.current, { scaleY: 0, transformOrigin: "bottom center" });
    gsap.set(tryTextRef.current, { x: 0 }); // Initially centered
    gsap.set(tryIconRef.current, { x: 0, y: 15, opacity: 0 }); // Starts below, no x offset
  }, { scope: tryBtnRef });

  const handleTryEnter = contextSafeTry(() => {
    gsap.to(tryBgRef.current, {
      scaleY: 1,
      duration: 0.25,
      ease: "power4.out",
      overwrite: "auto"
    });
    gsap.to(tryTextRef.current, {
      x: -12, // Slide text to the left to make room
      color: "var(--color-orange)",
      duration: 0.25,
      ease: "power4.out",
      overwrite: "auto"
    });
    gsap.to(tryIconRef.current, {
      y: 0, // Pop up
      opacity: 1,
      duration: 0.3,
      ease: "back.out(1.5)",
      overwrite: "auto",
    });
  });

  const handleTryLeave = contextSafeTry(() => {
    gsap.to(tryBgRef.current, {
      scaleY: 0,
      duration: 0.25,
      ease: "power4.out",
      overwrite: "auto"
    });
    gsap.to(tryTextRef.current, {
      x: 0, // Slide text back to exact center
      color: "#ffffff",
      duration: 0.25,
      ease: "power4.out",
      overwrite: "auto"
    });
    gsap.to(tryIconRef.current, {
      y: 15, // Drop back down
      opacity: 0,
      duration: 0.2,
      ease: "power3.in",
      overwrite: "auto"
    });
  });

  const loginLinkRef = useRef<HTMLAnchorElement>(null);
  const loginPathRef = useRef<SVGPathElement>(null);

  const { contextSafe: contextSafeLogin } = useGSAP({ scope: loginLinkRef });

  const handleLoginEnter = contextSafeLogin(() => {
    gsap.to(loginPathRef.current, {
      strokeDashoffset: 0,
      duration: 0.25,
      ease: "power3.out",
      overwrite: "auto",
    });
  });

  const handleLoginLeave = contextSafeLogin(() => {
    gsap.to(loginPathRef.current, {
      strokeDashoffset: 1,
      duration: 0.25,
      ease: "power3.in",
      overwrite: "auto",
    });
  });

  const [selectedAudience, setSelectedAudience] = useState<'students' | 'institutions'>('students');

  return (
    <section
      className="min-h-screen pt-20  px-8 bg-transparent flex justify-center items-center overflow-visible relative"
    >
      <div className="max-w-[1400px] w-full flex flex-col items-center gap-16 relative z-[2] py-8">
        {/* Centered Text Content */}
        <div className="flex flex-col items-center text-center max-w-[900px] mx-auto">
          {/* Audience Toggle */}
          <div className="inline-flex gap-12 mb-6 relative">
            {(['students', 'institutions'] as const).map((audience) => (
              <AudienceButton
                key={audience}
                audience={audience}
                isActive={selectedAudience === audience}
                onClick={() => setSelectedAudience(audience)}
              />
            ))}
          </div>
          {/* Exam Context Tags */}
          <div className="flex flex-wrap justify-center items-center gap-2 mb-6 animate-[fadeIn_0.8s_ease-out_forwards] opacity-0" style={{ animationDelay: '0.2s' }}>
            {["NEET PG", "NEET SS", "EMREE", "FMGE"].map((exam) => (
              <div
                key={exam}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/40 border border-orange/40 backdrop-blur-sm cursor-default"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-orange/80" />
                <span className="text-[0.68rem] font-semibold text-orange tracking-wider uppercase">
                  {exam}
                </span>
              </div>
            ))}
          </div>

          <h1 className="text-[4.25rem] font-medium leading-[1.1] text-dark mb-8 tracking-[-0.03em] max-[768px]:text-[2.5rem]">
            Your personal AI companion <br />
            <div className="flex items-center justify-center text-orange italic">
              <span className="mr-3 whitespace-nowrap">&gt;</span>
              <span className="inline-block text-left min-w-[300px]" ref={textContainerRef}>
                {PHRASES[textIndex].split("").map((char, index) => (
                  <span key={`${textIndex}-${index}`} className="char-span whitespace-pre">
                    {char}
                  </span>
                ))}
                <span className="font-thin text-orange animate-[blink_1s_step-end_infinite] ml-1 not-italic">
                  |
                </span>
              </span>
            </div>
          </h1>

          <p className="text-[1.15rem] leading-[1.6] text-[rgba(46,46,46,0.7)] max-w-[600px] mb-12 mx-auto">
            GalenAI is your AI medical mentor that explains, tests, and guides
            you, so you spend less time planning and more time understanding.<br/>
          </p>

          <div className="flex flex-wrap justify-center items-center gap-5 mb-6">
            <a
              href="#ask"
              ref={tryBtnRef}
              onMouseEnter={handleTryEnter}
              onMouseLeave={handleTryLeave}
              className="group relative flex items-center justify-center py-[0.85rem] px-8 rounded-full text-[1rem] font-primary font-medium text-white bg-orange no-underline transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-105 active:scale-[0.98] overflow-hidden min-w-[180px]"
            >
              <div ref={tryBgRef} className="absolute inset-0 bg-white z-0 rounded-full"></div>
              {/* Text centered exactly when no icon is visible */}
              <div className="relative z-10 flex items-center justify-center w-full">
                <span ref={tryTextRef} className="text-white transition-colors block">Try GalenAI</span>
                
                {/* Icon positioned absolute relative to the center cluster, invisible normally */}
                <div className="absolute right-0 w-[1rem] h-[1rem] overflow-hidden flex items-center justify-center">
                  <ArrowUpRightIcon ref={tryIconRef} className="absolute w-[1rem] h-[1rem] text-orange" strokeWidth={3} />
                </div>
              </div>
            </a>
            <a
              href="#download"
              ref={downloadBtnRef}
              onMouseEnter={handleDownloadEnter}
              onMouseLeave={handleDownloadLeave}
              className="relative border border-black/10 shadow-sm flex items-center justify-center gap-2 py-[0.7rem] px-8 rounded-full text-[1rem] font-primary font-medium text-dark no-underline transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] "
            >
              <span className="relative pb-[2px]">
                Download Now For Free
                <span ref={downloadUnderlineRef} className="absolute left-0 bottom-0 w-full h-[2px] bg-orange"></span>
              </span>
              <QrCodeIcon className="w-[1.3rem] h-[1.3rem] text-orange" strokeWidth={2.5} />
            </a>
          </div>

          <div className="flex items-center justify-center text-[0.95rem] text-dark/70 mb-6 animate-[fadeIn_0.8s_ease-out_forwards] opacity-0" style={{ animationDelay: '0.3s' }}>
            <span>Already using GalenAI?</span>
            <span className="mx-3 text-black/20">|</span>
            <a 
              href="#login" 
              ref={loginLinkRef}
              onMouseEnter={handleLoginEnter}
              onMouseLeave={handleLoginLeave}
              className="group relative flex items-center gap-2 text-orange font-medium transition-colors no-underline"
            >
              <span className="relative pb-0.5">
                Login here
                <svg
                  viewBox="0 0 100 10"
                  className="absolute left-0 bottom-[-2px] w-full h-[8px] pointer-events-none"
                  preserveAspectRatio="none"
                >
                  <path
                    ref={loginPathRef}
                    d="M2 5 Q 50 10 98 5"
                    stroke="var(--color-orange)"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    pathLength={1}
                    style={{
                      strokeDasharray: 1,
                      strokeDashoffset: 1,
                    }}
                  />
                </svg>
              </span>
              <div className="flex items-center justify-center w-[1.3rem] h-[1.3rem] rounded-full bg-orange/10 transition-colors group-hover:bg-orange/20">
                <ArrowRightIcon className="w-3 h-3 text-orange" strokeWidth={2.5} />
              </div>
            </a>
          </div>

          <div className="flex flex-wrap justify-center items-center text-[0.875rem] text-[rgba(46,46,46,0.6)]">
            
            <div className="flex  items-center gap-5">
              <span className="text-[0.8rem] opacity-80 uppercase tracking-[0.05em]">
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

        {/* Huge Video Below */}
        <div className="w-full aspect-video rounded-[0.5rem] overflow-hidden max-w-[1200px]">
          <div className="relative w-full h-full flex items-center justify-center">
            <iframe
              src="https://www.youtube.com/embed/1l0-dJic1dE?autoplay=1&mute=1&controls=0&rel=0&loop=1&playlist=1l0-dJic1dE"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full min-w-full min-h-full border-none pointer-events-none object-cover" 
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
