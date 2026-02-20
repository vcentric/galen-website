"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface AnimatedNavLinkProps {
  href: string;
  children: React.ReactNode;
}

const AnimatedNavLink = ({ href, children }: AnimatedNavLinkProps) => {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const { contextSafe } = useGSAP({ scope: linkRef });

  const handleMouseEnter = contextSafe(() => {
    gsap.to(pathRef.current, {
      strokeDashoffset: 0,
      duration: 0.25,
      ease: "power3.out",
      overwrite: "auto",
    });
  });

  const handleMouseLeave = contextSafe(() => {
    gsap.to(pathRef.current, {
      strokeDashoffset: 1,
      duration: 0.25,
      ease: "power3.in",
      overwrite: "auto",
    });
  });

  const content = (
    <>
      {children}
      {/* Pen Stroke Underline */}
      <svg
        viewBox="0 0 100 10"
        className="absolute left-0 bottom-[-4px] w-full h-[8px] pointer-events-none"
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
    </>
  );

  const className = "relative no-underline text-[#2e2e2e] text-[15px] font-primary font-medium tracking-[0.01em] transition-opacity duration-200 hover:opacity-100 opacity-90 inline-block";

  if (href.startsWith("/")) {
    return (
      <Link 
        href={href} 
        ref={linkRef}
        onMouseEnter={handleMouseEnter} 
        onMouseLeave={handleMouseLeave}
        className={className}
      >
        {content}
      </Link>
    );
  }

  return (
    <a 
      href={href} 
      ref={linkRef}
      onMouseEnter={handleMouseEnter} 
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {content}
    </a>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Trigger the pill shape after scrolling down 50px
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  return (
    // Outer wrapper stays fixed at the top, handling the width constraint
    <div className={`fixed top-0 left-0 right-0 z-[100] flex justify-center transition-all duration-300 pointer-events-none ${
      isScrolled ? "pt-2" : "pt-2"
    }`}>
      
      {/* Inner container morphs based on scroll state */}
      <div 
        className={`pointer-events-auto flex items-center justify-between transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] nav-glass-container ${
          isScrolled 
            ? "is-scrolled w-[calc(100%-5px)] max-w-[1400px] px-6 py-3 border border-white/20 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.08)]" 
            : "w-full max-w-[1400px] px-0 py-2 border-transparent"
        }`}
      >
        {/* SVG filter embedded locally for the distortion layer */}
        <svg style={{ display: 'none' }}>
          <filter id="nav-glass-distortion" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="turbulence" baseFrequency="0.008" numOctaves="2" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="40" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </svg>

        {/* Dynamic Glass Background Layers */}
        <div className="nav-glass-wrapper">
          <div className="nav-glass-filter"></div>
          <div className="nav-glass-distortion-overlay"></div>
          <div className="nav-glass-overlay"></div>
          <div className="nav-glass-specular"></div>
        </div>

        {/* Left: Logo */}
        <div className="relative z-10 flex-1 flex justify-start ">
          <Link href="/" className="flex items-center no-underline transition-opacity duration-200 hover:opacity-80">
            <Image src="/galenai-logo.png" alt="GalenAI" width={140} height={35} className="h-[35px] w-auto" />
          </Link>
        </div>

        {/* Center: Nav Links */}
        <div className="relative z-10 flex-shrink-0">
          <ul className="flex list-none gap-8 m-0 p-0">
            <li><AnimatedNavLink href="#features">Features</AnimatedNavLink></li>
            <li><AnimatedNavLink href="/team">Team</AnimatedNavLink></li>
            <li><AnimatedNavLink href="/blog">Blog</AnimatedNavLink></li>
            <li><AnimatedNavLink href="#login">Login</AnimatedNavLink></li>
          </ul>
        </div>

        {/* Right: CTA Button */}
        <div className="relative z-10 flex-1 flex justify-end ">
          <a href="#ask" className="bg-[#eb602d] text-[#ffffff] font-primary no-underline py-[0.8rem] px-[1.6rem] rounded-full text-[0.95rem] font-medium transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] whitespace-nowrap hover:scale-105 active:scale-[0.98] shadow-[inset_2px_2px_6px_rgba(255,255,255,0.2),0_-2px_10px_rgba(0,0,0,0.1)]" style={{ color: '#ffffff' }}>
            Ask GalenAI
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;