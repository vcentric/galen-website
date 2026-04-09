"use client";

import React, { useState, useRef, useEffect, ElementType } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { QrCodeIcon, ArrowUpRightIcon, ArrowRightIcon, XMarkIcon, ArrowsPointingOutIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { PrimaryButton } from "./PrimaryButton";
import { SecondaryButton } from "./SecondaryButton";
import TrustedBy from "./TrustedBy";
import { trackEvent, trackCTAClick } from "../../lib/analytics";
import { decorateUrl } from "../../lib/utm";

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
  const [isExpanded, setIsExpanded] = useState(false);
  const textContainerRef = useRef<HTMLDivElement>(null);

  // Prevent background scroll when video is expanded
  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("video-lightbox-open");
    } else {
      document.body.style.overflow = "unset";
      document.body.classList.remove("video-lightbox-open");
    }
    return () => {
      document.body.classList.remove("video-lightbox-open");
    };
  }, [isExpanded]);

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
    ? ["NEET PG", "INI-CET", "USMLE", "PLAB", "FMGE", "NEXT", "EMREE"] 
    : ["For Medical Institutions"];
  
  const descriptionText = audience === "students"
    ? "GalenAI is your AI medical mentor that explains, tests, and guides you, so you spend less time planning and more time understanding."
    : "An AI-powered medical education platform built for CBME, connecting student learning, faculty workflows, and institutional insights in one unified system.";

    const sectionClass = `w-full pt-[5rem] md:pt-[clamp(5.5rem,11vh,7.5rem)] px-[clamp(2rem,6vw,4rem)] bg-transparent flex flex-col overflow-visible relative ${isExpanded ? "z-[10000]" : "z-auto"}`;

  const STU_YT_ID = "j3lw8EERc18";
  const currentVideoSrc = audience === "students" 
    ? STU_YT_ID 
    : "/Institutions.mp4";

  const isYouTube = (src: string) => !src.startsWith("/") && !src.includes(".");

  return (
    <section className={sectionClass}>
      {/* Viewport Height Container for Text + TrustedBy */}
      <div className="w-full flex flex-col items-center relative z-[2]">
        
        {/* Centered Text Content pushed just slightly down from the top */}
        <div className={`mt-12 md:mt-[clamp(1.5rem,4vh,3rem)] flex flex-col items-center text-center mx-auto w-full ${audience === 'institutions' ? 'max-w-[1100px]' : 'max-w-[900px]'}`}>
          {/* Audience Toggle */}
          <div className="inline-flex gap-[clamp(2.5rem,8vw,4.5rem)] mb-[clamp(1.5rem,3vw,2.5rem)] relative">
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
          {audience === "institutions" && (
            <div className="flex flex-wrap justify-center items-center gap-[clamp(0.25rem,1vw,0.6rem)] mb-[clamp(1rem,3vw,1.5rem)] animate-[fadeIn_0.8s_ease-out_forwards] opacity-0" style={{ animationDelay: '0.2s' }}>
              {tags.map((tag) => (
                <div
                  key={tag}
                  className="flex items-center px-[clamp(0.5rem,1.4vw,0.75rem)] py-[clamp(0.15rem,0.4vw,0.25rem)] rounded-full bg-white/70 border-orange/40 border backdrop-blur-md cursor-default transition-all duration-300 hover:border-orange/60"
                  style={{ 
                    boxShadow: 'inset 0 1.5px 3px rgba(235, 96, 45, 0.3), 0 1px 2px rgba(0, 0, 0, 0.03)'
                  }}
                >
                  <span className="text-[clamp(0.55rem,0.95vw,0.65rem)] font-bold text-orange tracking-[0.03em] uppercase">
                    {tag}
                  </span>
                </div>
              ))}
            </div>
          )}

          <h1 className="text-[clamp(2.3rem,5vw+0.5rem,4.25rem)] font-medium leading-[1.3] md:leading-[1.25] text-dark mb-[clamp(1rem,2.5vw,1.5rem)] tracking-[-0.03em]">
            {audience === "students" ? (
              <>
                Your personal AI companion <br />
                <div className="flex items-center justify-center text-orange italic">
                <div 
                    className="flex flex-col md:flex-row items-center md:items-baseline w-full md:w-auto" 
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
              </>
            ) : (
                <>
                  The Medical Education <br className="hidden md:block" /> 
                  <span className="text-orange">Operating System</span> for <br className="md:hidden" />
                  <span className="text-orange italic block md:inline mt-1 md:mt-0">CBME</span>
                </>
            )}
          </h1>

          <p className={audience === "institutions" ? "text-[clamp(0.85rem,1.5vw,1rem)] leading-[1.6] text-[rgba(46,46,46,0.7)] max-w-[850px] mb-[clamp(2.5rem,4vw,3rem)] mx-auto" : "text-[clamp(0.95rem,2vw,1.15rem)] leading-[1.6] text-[rgba(46,46,46,0.7)] max-w-[600px] mb-[clamp(2.5rem,4vw,3rem)] mx-auto"}>
            {descriptionText}
          </p>

          {audience === "institutions" && (
            <div className="flex justify-center mb-[clamp(2rem,1vw,2rem)] animate-[fadeIn_0.8s_ease-out_forwards] opacity-0" style={{ animationDelay: '0.2s' }}>
              <span className="relative flex items-center justify-center text-[12px] sm:text-[13px] text-dark/60 font-medium tracking-[0.02em] leading-none before:content-[''] before:block before:w-6 before:h-[1px] before:bg-orange/40 before:mr-3 after:content-[''] after:block after:w-6 after:h-[1px] after:bg-orange/40 after:ml-3">
                Built for Competency-Based Medical Education (CBME)
              </span>
            </div>
          )}

          <div className={`flex items-center gap-[clamp(0.8rem,2vw,1.25rem)] mb-4 ${audience === 'students' ? 'flex-col md:grid md:grid-cols-2 w-full md:w-auto' : 'flex-col md:flex-row w-full md:w-auto md:justify-center'}`}>
            {audience === "students" ? (
              <>
                <PrimaryButton href="/qr" text="Try GalenAI" icon={ArrowUpRightIcon} className="w-full" />
                <SecondaryButton href="/qr" text="Download Now For Free" icon={QrCodeIcon} showQrMobile={true} className="w-full" />
              </>
            ) : (
              <>
                <PrimaryButton href="#contact" text="Request Institutional Demo" icon={ArrowUpRightIcon} className="w-full md:w-auto !px-[clamp(1.2rem,3vw,2rem)]" />
                <SecondaryButton href="#overview" text="View System Overview" icon={ArrowRightIcon} showQrMobile={false} className="w-full md:w-auto !px-[clamp(1.2rem,3vw,2rem)]" />
              </>
            )}
          </div>

          <div className="relative flex items-center justify-center text-[clamp(0.85rem,1.5vw,0.95rem)] text-dark/70 animate-[fadeIn_0.8s_ease-out_forwards] opacity-0" style={{ animationDelay: '0.3s' }}>
            <div className="absolute w-[150%] h-[200%] max-w-[400px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,1)_20%,rgba(255,255,255,0.8)_50%,transparent_80%)] pointer-events-none" style={{ zIndex: -1 }}></div>
            <span>Already using GalenAI?</span>
            <span className="mx-3 text-black/20">|</span>
            <a 
              href={decorateUrl("https://app.galenai.io")} 
              ref={loginLinkRef}
              onMouseEnter={handleLoginEnter}
              onMouseLeave={handleLoginLeave}
              onClick={() => trackCTAClick("web_app", { source: "hero_login" })}
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
        </div>

        {audience === "students" && (
          <div className="w-full mt-12 md:mt-[clamp(3rem,6vh,4.5rem)] ">
            <TrustedBy />
          </div>
        )}
      </div>

      {/* Second Screen / Scroll Container for Video */}
      <div className={`w-full flex flex-col items-center relative z-[2] pb-16 ${audience === 'institutions' ? 'mt-[6vh] md:mt-[8vh]' : 'mt-[clamp(2rem,6vh,4rem)] md:mt-[8vh]'}`}>

        {/* Huge Video Below or Visual */}
        <div 
          onClick={() => {
            setIsExpanded(true);
            trackEvent("hero_video_expand", { 
              audience_type: audience, 
              video_path: currentVideoSrc 
            });
          }}
          className="group w-full h-auto rounded-[1rem] overflow-hidden max-w-[1240px] border border-black/5 shadow-sm relative bg-transparent cursor-pointer"
        >
            <div className="absolute top-2 right-2 md:top-3 md:right-3 bg-black/50 backdrop-blur-md rounded-full w-8 h-8 md:w-9 md:h-9 transition-all duration-500 z-10 group-hover:bg-black/70 flex items-center justify-center pointer-events-none shadow-[inset_0_0_8px_rgba(255,255,255,0.2)]">
              <ArrowsPointingOutIcon className="w-3.5 h-3.5 md:w-[1.1rem] md:h-[1.1rem] text-white" strokeWidth={1.5} />
            </div>
            
            {isYouTube(currentVideoSrc) ? (
              <div className="w-full aspect-video pointer-events-none">
                <iframe
                  width="1920"
                  height="1080"
                  src={`https://www.youtube.com/embed/${currentVideoSrc}?autoplay=1&mute=1&loop=1&playlist=${currentVideoSrc}&controls=0&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1&origin=${typeof window !== 'undefined' ? window.location.origin : ''}`}
                  className="w-full h-full border-none"
                  allow="autoplay; encrypted-media"
                />
              </div>
            ) : (
              <video 
                src={currentVideoSrc}
                autoPlay 
                muted 
                loop 
                playsInline
                className="w-full h-auto block"
              />
            )}
        </div>

        {/* Video Lightbox / Modal */}
        {isExpanded && (
          <div 
            className="fixed inset-0 z-[999] flex items-center justify-center bg-black transition-all duration-500 text-white"
            onClick={() => setIsExpanded(false)}
          >
            {/* Close Button */}
            <button 
              className="absolute top-8 right-8 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 group z-[1000]"
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(false);
              }}
            >
              <XMarkIcon className="w-8 h-8 group-hover:rotate-90 transition-transform duration-300" />
            </button>

            <div 
              className="w-full max-w-[1280px] px-4 md:px-8 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-video rounded-[1.5rem] overflow-hidden bg-black">
                {isYouTube(currentVideoSrc) ? (
                  <iframe
                    width="1920"
                    height="1080"
                    src={`https://www.youtube.com/embed/${currentVideoSrc}?autoplay=1&rel=0&modestbranding=1&origin=${typeof window !== 'undefined' ? window.location.origin : ''}`}
                    className="w-full h-full border-none"
                    allow="autoplay; encrypted-media; fullscreen"
                  />
                ) : (
                  <video 
                    src={currentVideoSrc}
                    autoPlay 
                    controls
                    playsInline
                    className="w-full h-full"
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;
