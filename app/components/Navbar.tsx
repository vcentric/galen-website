"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowUpRightIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

interface AnimatedNavLinkProps {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string; // Added optional className
}

const AnimatedNavLink = ({ href, children, onClick, className }: AnimatedNavLinkProps) => {
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
            strokeDashoffset: 1,
          }}
        />
      </svg>
    </>
  );

  // Use provided className or fall back to default
  const finalClassName = className || "relative no-underline text-dark text-[15px] font-primary font-medium tracking-[0.01em] transition-opacity duration-200 hover:opacity-100 opacity-90 inline-block";

  if (href.startsWith("/")) {
    return (
      <Link 
        href={href} 
        ref={linkRef}
        onMouseEnter={handleMouseEnter} 
        onMouseLeave={handleMouseLeave}
        className={finalClassName}
        onClick={onClick}
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
      className={finalClassName}
      onClick={onClick}
    >
      {content}
    </a>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isActuallyOpen, setIsActuallyOpen] = useState(false); // Controls overlay and pointer events
  const menuRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const { contextSafe } = useGSAP({ scope: menuRef });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = contextSafe(() => {
    const nextState = !isMenuOpen;
    setIsMenuOpen(nextState);

    const menu = menuRef.current;
    
    if (nextState) {
      // OPENING
      setIsActuallyOpen(true);
      const tl = gsap.timeline({ defaults: { ease: "expo.out", duration: 0.4 } });
      
      tl.to(menu, { x: 0, opacity: 1, visibility: "visible", force3D: true })
        .fromTo(".mobile-nav-item", 
          { x: -20, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.3, stagger: 0.05, ease: "power2.out" },
          0.05
        );
      
      if (overlayRef.current) {
        gsap.to(overlayRef.current, { opacity: 1, duration: 0.3, ease: "power2.out" });
      }

      document.body.style.overflow = "hidden";
    } else {
      // CLOSING
      const tl = gsap.timeline({ 
        defaults: { ease: "expo.inOut", duration: 0.35 },
        onComplete: () => {
          setIsActuallyOpen(false);
          document.body.style.overflow = "auto";
        }
      });

      tl.to(".mobile-nav-item", { 
          x: -20, 
          opacity: 0, 
          duration: 0.2, 
          stagger: { each: 0.03, from: "end" } 
        })
        .to(menu, { x: "-100%", duration: 0.35 }, "-=0.15");

      if (overlayRef.current) {
        gsap.to(overlayRef.current, { opacity: 0, duration: 0.2, ease: "power2.in" });
      }
    }
  });

  const closeMenu = () => {
    if (isMenuOpen) toggleMenu();
  };

  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "Team", href: "/team" },
    { label: "Blog", href: "/blog" },
    { label: "FAQ's", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <>
      {/* Off-Canvas Menu (Mobile Overlay from Left) */}
      <div 
        ref={menuRef}
        className="fixed top-0 left-0 w-[60vw] h-full bg-[#fcfaf8] z-[110] p-[clamp(1.5rem,5vw,2rem)] flex flex-col pt-[clamp(5rem,12vw,6rem)] md:hidden shadow-[10px_0_30px_rgba(0,0,0,0.05)]"
        style={{ transform: 'translateX(-100%)', visibility: 'hidden' }}
      >
        <div className="mb-6 mobile-nav-item flex items-center justify-start">
          <Image src="/galenai-logo.png" alt="GalenAI" width={100} height={25} className="h-[25px] w-auto opacity-80" />
        </div>
        <nav className="flex flex-col gap-[clamp(1.25rem,2.5vw,1.75rem)]">
          {navLinks.map((link) => (
            <div key={link.label} className="mobile-nav-item" onClick={closeMenu}>
              <AnimatedNavLink href={link.href} className="text-[17px] font-medium tracking-[0.02em]">{link.label}</AnimatedNavLink>
            </div>
          ))}
        </nav>
      </div>

      {/* Overlay to Close Menu (Covers right side when open) */}
      {isActuallyOpen && (
        <div 
          ref={overlayRef}
          onClick={closeMenu}
          className="fixed inset-0 z-[105] bg-black/5 md:hidden cursor-pointer"
          style={{ opacity: 0 }}
        />
      )}

      {/* Main Top Bar (Stationary Header) */}
      <div className="fixed top-0 left-0 right-0 z-[120] flex justify-center pt-2 pointer-events-none">
        <div 
          className={`pointer-events-auto flex items-center justify-between transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] nav-glass-container ${
            isScrolled 
              ? "is-scrolled w-[calc(100%-10px)] max-w-[1400px] px-6 py-3 border border-white/20 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.08)]" 
              : "w-full max-w-[1400px] px-[clamp(1rem,5vw,2.5rem)] py-4 border-transparent"
          }`}
        >
          <svg style={{ display: 'none' }}>
            <filter id="nav-glass-distortion" x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence type="turbulence" baseFrequency="0.008" numOctaves="2" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="40" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </svg>

          <div className="nav-glass-wrapper">
            <div className="nav-glass-filter"></div>
            <div className="nav-glass-distortion-overlay"></div>
            <div className="nav-glass-overlay"></div>
            <div className="nav-glass-specular"></div>
          </div>

          <div className="relative z-10 flex-1 flex justify-start items-center">
            <button 
              onClick={toggleMenu}
              className="md:hidden p-2 text-dark hover:opacity-70 transition-opacity"
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? <XMarkIcon className="w-8 h-8" /> : <Bars3Icon className="w-8 h-8" />}
            </button>
            <Link href="/" className="hidden md:flex items-center no-underline transition-opacity duration-200 hover:opacity-80">
              <Image src="/galenai-logo.png" alt="GalenAI" width={140} height={35} className="h-[35px] w-auto" />
            </Link>
          </div>

          <div className="relative z-10 flex-shrink-0 hidden md:block">
            <ul className="flex list-none gap-8 m-0 p-0">
              {navLinks.map((link) => (
                <li key={link.label}><AnimatedNavLink href={link.href}>{link.label}</AnimatedNavLink></li>
              ))}
            </ul>
          </div>

          <div className="relative z-10 flex-1 flex justify-end">
            <a
              href="#ask"
              className="relative group transition-all flex items-center justify-center whitespace-nowrap rounded-full will-change-transform duration-300 shadow-sm hover:shadow-md h-[clamp(2.5rem,5vw,2.75rem)] text-[clamp(0.85rem,2vw,0.95rem)] font-primary font-medium pl-[clamp(1rem,3vw,1.5rem)] pr-[clamp(3rem,6vw,3.5rem)] bg-orange text-white no-underline"
            >
              <span className="relative z-10 transition-colors text-white duration-300 group-hover:text-transparent">Try GalenAI</span>
              <div className="absolute right-0 top-0 mt-1 mr-1 bg-white text-orange flex items-center justify-center group-hover:w-[calc(100%-0.5rem)] transition-all rounded-full duration-300 h-[clamp(2rem,4vw,2.25rem)] w-[clamp(2rem,4vw,2.25rem)] z-20 shadow-sm">
                <ArrowUpRightIcon className="w-4 h-4 flex-shrink-0 transition-transform duration-300 group-hover:rotate-45" strokeWidth={2.5} />
              </div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;