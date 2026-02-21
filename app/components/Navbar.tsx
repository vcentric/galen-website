"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";

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
    </>
  );

  const className = "relative no-underline text-dark text-[15px] font-primary font-medium tracking-[0.01em] transition-opacity duration-200 hover:opacity-100 opacity-90 inline-block";

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
             <li><AnimatedNavLink href="#faq">FAQ's</AnimatedNavLink></li>
              <li><AnimatedNavLink href="#contact">Contact</AnimatedNavLink></li>
          </ul>
        </div>

        {/* Right: CTA Button */}
        <div className="relative z-10 flex-1 flex justify-end ">
          <a
            href="#ask"
            className="relative group transition-all flex items-center justify-center whitespace-nowrap rounded-full will-change-transform duration-300 shadow-sm hover:shadow-md h-11 text-[0.95rem] font-primary font-medium pl-6 pr-[3.5rem] bg-orange text-white no-underline"
          >
            <span className="relative z-10 transition-colors text-white duration-300 group-hover:text-transparent">Try GalenAI</span>
            
            <div
              className="absolute right-0 top-0 mt-1 mr-1 bg-white text-orange flex items-center justify-center group-hover:w-[calc(100%-0.5rem)] transition-all rounded-full duration-300 h-9 w-9 z-20 shadow-sm"
            >
              <ArrowUpRightIcon className="w-4 h-4 flex-shrink-0 transition-transform duration-300 group-hover:rotate-45" strokeWidth={2.5} />
            </div>

           
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;