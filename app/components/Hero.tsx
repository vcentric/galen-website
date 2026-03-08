"use client";

import { useState, useRef, ElementType } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { QrCodeIcon, ArrowUpRightIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import DashboardPlaceholder from "./institutions/DashboardPlaceholder";
import { PrimaryButton } from "./PrimaryButton";
import { SecondaryButton } from "./SecondaryButton";

const STUDENT_PHRASES = [
  "for daily medical learning.",
  "to crack medical exams.",
  "that saves time for you.",
];

interface AudienceButtonProps {
  audience: "students" | "institutions";
  isActive: boolean;
  href?: string;
  onClick?: () => void;
}

const AudienceButton = ({ audience, isActive, href, onClick }: AudienceButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  const { contextSafe } = useGSAP({ scope: buttonRef });

  useGSAP(() => {
    gsap.to(pathRef.current, {
      strokeDashoffset: isActive ? 0 : 1,
      duration: 0.25,
      ease: "power3.out",
      overwrite: "auto",
    });
  }, { scope: buttonRef, dependencies: [isActive] });

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

  const content = (
    <>
      {audience}
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
            strokeDashoffset: 1,
          }}
        />
      </svg>
    </>
  );

  const className = `relative pb-2 text-[clamp(1rem,2vw,1.1rem)] font-medium border-none bg-transparent cursor-pointer transition-opacity duration-200 capitalize ${
    isActive
      ? "text-dark opacity-100"
      : "text-dark opacity-50 hover:opacity-100"
  }`;

  if (href && !isActive) {
    return (
      <Link
        href={href}
        ref={buttonRef as any}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={className}
        style={{ textDecoration: 'none' }}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      ref={buttonRef as any}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {content}
    </button>
  );
};




interface HeroProps {
  audience?: "students" | "institutions";
}

const Hero = ({ audience = "students" }: HeroProps) => {
  const [textIndex, setTextIndex] = useState(0);
  const textContainerRef = useRef<HTMLDivElement>(null);

  const phrases = STUDENT_PHRASES;

  useGSAP(() => {
    if (audience === "institutions") return;

    const container = textContainerRef.current;
    if (!container) return;

    const chars = gsap.utils.toArray(container.querySelectorAll('.char-span'));
    
    gsap.set(chars, { display: "none" });

    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(() => {
          if (phrases.length > 1) {
            setTextIndex((prev) => (prev + 1) % phrases.length);
          }
        }, 1500);
      }
    });

    if (chars.length > 0) {
      tl.to(chars, {
        display: "inline-block",
        duration: 0.001,
        stagger: 0.04,
        ease: "none"
      });
    }

    return () => {
      tl.kill();
    };
  }, { dependencies: [textIndex, audience, phrases.length], scope: textContainerRef });


  const loginLinkRef = useRef<HTMLAnchorElement>(null);
  const loginPathRef = useRef<SVGPathElement>(null);

  const { contextSafe: contextSafeLogin } = useGSAP({ scope: loginLinkRef });

  const handleLoginEnter = contextSafeLogin(() => {
    if (loginPathRef.current) gsap.to(loginPathRef.current, {
      strokeDashoffset: 0,
      duration: 0.25,
      ease: "power3.out",
      overwrite: "auto",
    });
  });

  const handleLoginLeave = contextSafeLogin(() => {
    if (loginPathRef.current) gsap.to(loginPathRef.current, {
      strokeDashoffset: 1,
      duration: 0.25,
      ease: "power3.in",
      overwrite: "auto",
    });
  });

  const tags = audience === "students" 
    ? ["NEET PG", "NEET SS", "EMREE", "FMGE"] 
    : ["For Medical Institutions"];
  
  const headingLeft = audience === "students"
    ? "Your personal AI companion"
    : "The Medical Education Operating System for";
  
  const descriptionText = audience === "students"
    ? "GalenAI is your AI medical mentor that explains, tests, and guides you, so you spend less time planning and more time understanding."
    : "A modern AI-powered Medical Education LMS designed for Competency-Based Medical Education (CBME). GalenAI connects student learning intelligence, faculty teaching workflows, and institutional analytics into one unified platform.";

    const sectionClass = audience === "institutions" 
    ? "min-h-screen pt-[clamp(5.5rem,11vh,7.5rem)] px-[clamp(2rem,6vw,4rem)] bg-transparent flex justify-center items-center overflow-visible relative"
    : "min-h-screen pt-[clamp(3.5rem,8vh,5rem)] px-[clamp(2rem,6vw,4rem)] bg-transparent flex justify-center items-center overflow-visible relative";


  return (
    <section className={sectionClass}>
      <div className={`w-full flex flex-col items-center gap-[clamp(2rem,6vw,4rem)] relative z-[2] py-[clamp(1rem,4vw,2rem)] ${audience === 'institutions' ? 'max-w-[1500px]' : 'max-w-[1400px]'}`}>
        {/* Centered Text Content */}
        <div className={`flex flex-col items-center text-center mx-auto ${audience === 'institutions' ? 'max-w-[1100px]' : 'max-w-[900px]'}`}>
          {/* Audience Toggle */}
          <div className="inline-flex gap-[clamp(1.5rem,4vw,3rem)] mb-[clamp(1rem,3vw,1.5rem)] relative">
            {(['students', 'institutions'] as const).map((aud) => (
              aud === audience ? (
                <AudienceButton
                  key={aud}
                  audience={aud}
                  isActive={true}
                />
              ) : (
                <AudienceButton
                  key={aud}
                  audience={aud}
                  isActive={false}
                  href={aud === 'students' ? '/' : '/institutions'}
                />
              )
            ))}
          </div>
          {/* Context Tags */}
          <div className="flex flex-wrap justify-center items-center gap-[clamp(0.25rem,1vw,0.5rem)] mb-[clamp(1rem,3vw,1.5rem)] animate-[fadeIn_0.8s_ease-out_forwards] opacity-0" style={{ animationDelay: '0.2s' }}>
            {tags.map((tag) => (
              <div
                key={tag}
                className="flex items-center gap-[clamp(0.2rem,0.5vw,0.375rem)] px-[clamp(0.5rem,1.5vw,0.75rem)] py-[clamp(0.15rem,0.5vw,0.25rem)] rounded-full bg-white/40 border-orange/40 border backdrop-blur-sm cursor-default"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-orange/80" />
                <span className="text-[clamp(0.55rem,1vw,0.68rem)] font-semibold text-orange tracking-wider uppercase">
                  {tag}
                </span>
              </div>
            ))}
          </div>

          <h1 className={`${audience === 'institutions' ? 'text-[clamp(1.6rem,4vw,3.25rem)]' : 'text-[clamp(1.8rem,5vw+0.5rem,4.25rem)]'} font-medium leading-[1.1] text-dark mb-[clamp(1.5rem,4vw,2rem)] tracking-[-0.03em]`}>
            {headingLeft} <br />
            {audience === "students" ? (
                <div className="flex items-center justify-center text-orange italic">
                <div 
                    className="flex flex-col md:flex-row items-center md:items-baseline min-w-[300px]" 
                    ref={textContainerRef}
                >
                    {(() => {
                    const words = phrases[textIndex].split(" ");
                    const lastWord = words[words.length - 1];
                    const basePart = words.slice(0, -1).join(" ") + (words.length > 1 ? " " : "");
                    
                    return (
                        <>
                        <div className="flex items-center">
                            <span className="mr-3 whitespace-nowrap hidden md:inline">&gt;</span>
                            <span className="whitespace-pre">
                            {basePart.split("").map((char, index) => (
                                <span key={`base-${textIndex}-${index}`} className="char-span whitespace-pre">
                                {char}
                                </span>
                            ))}
                            </span>
                        </div>
                        <div className="flex justify-center w-full md:w-auto">
                            <span className="whitespace-nowrap">
                            {lastWord.split("").map((char, index) => (
                                <span key={`last-${textIndex}-${index}`} className="char-span whitespace-pre">
                                {char}
                                </span>
                            ))}
                            <span className="font-thin text-orange animate-[blink_1s_step-end_infinite] ml-1 not-italic">
                                |
                            </span>
                            </span>
                        </div>
                        </>
                    );
                    })()}
                </div>
                </div>
            ) : (
                <div className="flex items-center justify-center text-orange italic mt-2">
                    Competency-Based Learning
                </div>
            )}
          </h1>

          <p className={audience === "institutions" ? "text-[clamp(0.85rem,1.5vw,1rem)] leading-[1.6] text-[rgba(46,46,46,0.7)] max-w-[850px] mb-[clamp(2rem,5vw,3rem)] mx-auto" : "text-[clamp(0.75rem,2vw,1.15rem)] leading-[1.6] text-[rgba(46,46,46,0.7)] max-w-[600px] mb-[clamp(2rem,5vw,3rem)] mx-auto"}>
            {descriptionText}<br/>
            {audience === "institutions" && (
              <span className="block mt-4 text-[0.8rem] font-medium text-dark/50 tracking-[0.02em]">
                Built for Competency-Based Medical Education (CBME).
              </span>
            )}
          </p>

          <div className="flex flex-wrap justify-center items-center gap-[clamp(0.8rem,2vw,1.25rem)] mb-[clamp(1rem,3vw,1.5rem)]">
            {audience === "students" ? (
              <>
                <PrimaryButton href="#ask" text="Try GalenAI" icon={ArrowUpRightIcon} />
                <SecondaryButton href="#download" text="Download Now For Free" icon={QrCodeIcon} showQrMobile={true} />
              </>
            ) : (
              <>
                <PrimaryButton href="#contact" text="Request Institutional Demo" icon={ArrowUpRightIcon} />
                <SecondaryButton href="#overview" text="View System Overview" icon={ArrowRightIcon} showQrMobile={false} />
              </>
            )}
          </div>

          <div className="flex items-center justify-center text-[clamp(0.85rem,1.5vw,0.95rem)] text-dark/70 mb-[clamp(1rem,3vw,1.5rem)] animate-[fadeIn_0.8s_ease-out_forwards] opacity-0" style={{ animationDelay: '0.3s' }}>
            <span>Already using GalenAI?</span>
            <span className="mx-3 text-black/20">|</span>
            <a 
              href="#login" 
              ref={loginLinkRef}
              onMouseEnter={handleLoginEnter}
              onMouseLeave={handleLoginLeave}
              className="group relative flex items-center gap-2 text-orange font-medium transition-colors no-underline"
            >
              <span className="relative pb-0.5 font-semibold">
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

          <div className="flex flex-wrap justify-center items-center text-[clamp(0.75rem,1.5vw,0.875rem)] text-[rgba(46,46,46,0.6)]">
            
            <div className="flex  items-center gap-5">
              <span className="text-[clamp(0.7rem,1.2vw,0.8rem)] opacity-80 uppercase tracking-[0.05em]">
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

        {/* Huge Video Below or Visual */}
        {audience === "students" ? (
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
        ) : (
            <div className="w-full aspect-video rounded-[0.5rem] max-w-[1200px]">
                <DashboardPlaceholder label="Competency Heatmap &amp; Cohort Analytics" accent />
            </div>
        )}
      </div>
    </section>
  );
};

export default Hero;
