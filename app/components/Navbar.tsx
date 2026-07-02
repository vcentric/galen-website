"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {
  ArrowUpRightIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import NMCBanner from "./institutions/NMCBanner";
import { trackEvent, trackCTAClick } from "../../lib/analytics";
import { decorateUrl } from "../../lib/utm";

interface AnimatedNavLinkProps {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  target?: string;
  rel?: string;
}

const AnimatedNavLink = ({
  href,
  children,
  onClick,
  className,
  target,
  rel,
}: AnimatedNavLinkProps) => {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const { contextSafe } = useGSAP({ scope: linkRef });

  const handleMouseEnter = contextSafe(() => {
    gsap.to(pathRef.current, {
      strokeDashoffset: 0,
      duration: 0.25,
      ease: "power3.out",
      overwrite: "auto",
    });
    gsap.to(svgRef.current, {
      opacity: 1,
      duration: 0.2,
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
    gsap.to(svgRef.current, {
      opacity: 0,
      duration: 0.2,
      overwrite: "auto",
    });
  });

  const content = (
    <>
      {children}
      <svg
        ref={svgRef}
        viewBox="0 0 100 10"
        className="absolute left-0 bottom-[-4px] w-full h-[8px] pointer-events-none opacity-0"
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

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
    onClick?.();
  };

  // Use provided className or fall back to default
  const finalClassName =
    className ||
    "relative no-underline text-dark text-[15px] font-primary font-medium tracking-[0.01em] transition-opacity duration-200 hover:opacity-100 opacity-90 inline-block";

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
      target={target}
      rel={rel}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={finalClassName}
      onClick={handleClick}
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
      const tl = gsap.timeline({
        defaults: { ease: "expo.out", duration: 0.3 },
      });

      tl.to(menu, {
        x: 0,
        opacity: 1,
        visibility: "visible",
        force3D: true,
      }).fromTo(
        ".mobile-nav-item",
        { x: -15, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.25, stagger: 0.04, ease: "power2.out" },
        0.05,
      );

      if (overlayRef.current) {
        gsap.to(overlayRef.current, {
          opacity: 1,
          duration: 0.25,
          ease: "power2.out",
        });
      }

      document.body.style.overflow = "hidden";
    } else {
      // CLOSING
      const tl = gsap.timeline({
        defaults: { ease: "expo.inOut", duration: 0.25 },
        onComplete: () => {
          setIsActuallyOpen(false);
          document.body.style.overflow = "auto";
        },
      });

      tl.to(".mobile-nav-item", {
        x: -15,
        opacity: 0,
        duration: 0.15,
        stagger: { each: 0.03, from: "end" },
      }).to(menu, { x: "-100%", duration: 0.25 }, "-=0.1");

      if (overlayRef.current) {
        gsap.to(overlayRef.current, {
          opacity: 0,
          duration: 0.15,
          ease: "power2.in",
        });
      }
    }
  });

  const closeMenu = () => {
    if (isMenuOpen) toggleMenu();
  };

  const pathname = usePathname();
  const isSecondaryPage =
    pathname === "/team" ||
    pathname === "/blog" ||
    pathname.startsWith("/blog/");

  const isInstitutions = pathname === "/institutions";

  const navLinks = isInstitutions
    ? [
        { label: "Solution", href: "#overview" },
        { label: "Team", href: "/team" },
        { label: "Outcomes", href: "#outcomes" },
        { label: "Contact", href: "#contact" },
      ]
    : [
        isSecondaryPage
          ? { label: "Home", href: "/" }
          : { label: "Features", href: "#features" },
        { label: "Team", href: "/team" },
        { label: "Articles", href: "/blog" },
        { label: "FAQ's", href: "/#faq" },
        { label: "Contact", href: "#contact" },
      ];

  if (
    pathname === "/terms" ||
    pathname === "/privacy" ||
    pathname.startsWith("/keystatic")
  ) {
    return null;
  }

  return (
    <>
      {pathname === "/institutions" && (
        <div className="absolute top-0 left-0 right-0 w-full z-[130] pointer-events-auto nmc-banner-wrapper">
          <NMCBanner />
        </div>
      )}
      {pathname === "/" && (
        <div className="absolute top-0 left-0 right-0 w-full z-[130] pointer-events-auto flex items-center justify-center px-6 py-2 bg-[#eb602d] text-white text-[0.75rem] font-medium tracking-tight leading-[1.4] text-center">
          <div className="flex flex-wrap items-center justify-center gap-x-1.5 gap-y-0.5">
            <span className="opacity-80">
              NEET PG • INI-CET • USMLE • PLAB • FMGE • NEXT • EMREE
              &nbsp;—&nbsp;
            </span>
            <div className="flex items-center gap-x-1.5 whitespace-nowrap">
              <span className="opacity-100 italic">Coming Soon</span>
              <span className="opacity-40">|</span>
              <a
                href={decorateUrl("/qr")}
                onClick={() =>
                  trackCTAClick("qr", {
                    source: "top_banner",
                    button_type: "link",
                    button_text: "Sign up to stay updated",
                  })
                }
                className="underline font-bold hover:opacity-80 transition-opacity flex items-center gap-0.5"
              >
                Sign up to stay updated
                <ArrowUpRightIcon className="w-3 h-3" strokeWidth={3} />
              </a>
            </div>
          </div>
        </div>
      )}
      {/* Level 1: Standard Stationary Navbar (Top Bar) */}
      <div className="fixed top-0 left-0 right-0 z-[120] flex flex-col items-center pointer-events-none site-navbar">
        <div
          className={`pointer-events-auto flex items-center justify-between transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] nav-glass-container z-10 ${
            isScrolled
              ? "is-scrolled w-[calc(100%-10px)] max-w-[1400px] px-6 py-3 border border-white/20 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.08)] mt-2"
              : `w-full max-w-[1400px] px-[clamp(1rem,5vw,2.5rem)] py-4 border-transparent ${pathname === "/institutions" || pathname === "/" ? "mt-[48px] md:mt-[30px]" : "mt-0"}`
          }`}
        >
          <svg style={{ display: "none" }}>
            <filter
              id="nav-glass-distortion"
              x="-20%"
              y="-20%"
              width="140%"
              height="140%"
            >
              <feTurbulence
                type="turbulence"
                baseFrequency="0.008"
                numOctaves="2"
                result="noise"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale="40"
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          </svg>

          <div className="nav-glass-wrapper">
            <div className="nav-glass-filter"></div>
            <div className="nav-glass-distortion-overlay"></div>
            <div className="nav-glass-overlay"></div>
            <div className="nav-glass-specular"></div>
          </div>

          <div className="relative z-[40] flex-1 flex justify-start items-center">
            <Link
              href="/"
              className="hidden md:flex items-center no-underline transition-opacity duration-200 hover:opacity-80"
            >
              <Image
                src="/galenai-logo.webp"
                alt="GalenAI"
                width={140}
                height={35}
                className="h-[35px] w-auto"
              />
            </Link>
            <button
              onClick={toggleMenu}
              className={`md:hidden p-1.5 text-dark hover:opacity-70 transition-all duration-300 ${isMenuOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}
              aria-label="Open Menu"
            >
              <Bars3Icon className="w-6 h-6" />
            </button>
          </div>

          <div className="relative z-10 flex-shrink-0 hidden md:block">
            <ul className="flex list-none gap-8 m-0 p-0">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <AnimatedNavLink href={link.href}>
                    {link.label}
                  </AnimatedNavLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative z-10 flex-1 flex justify-end items-center gap-5 overflow-visible">
            {/* House MD game button — desktop only */}
            <div className="hidden md:inline-flex items-center gap-2 whitespace-nowrap">
              <AnimatedNavLink
                href="https://house.galenai.io"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackCTAClick("house_md", {
                    source: "navbar",
                    button_type: "link",
                    button_text: "Think Like HouseMD",
                  })
                }
                className="relative no-underline text-dark/80 text-[15px] font-primary font-semibold tracking-[0.01em] transition-opacity duration-200 hover:opacity-100 opacity-90 inline-block"
              >
                Think Like HouseMD
              </AnimatedNavLink>
              <span className="badge-shimmer px-1.5 py-[4px] rounded text-white text-[7px] font-bold tracking-wide uppercase leading-none">
                NEW
              </span>
            </div>
            <a
              href={decorateUrl(
                pathname === "/institutions" ? "#contact" : "/qr",
              )}
              onClick={() => {
                const destination =
                  pathname === "/institutions" ? "contact" : "try_now";
                trackCTAClick(destination, {
                  source: "navbar",
                  button_type: "primary",
                  button_text:
                    pathname === "/institutions"
                      ? "Request Demo"
                      : "Try GalenAI",
                });
              }}
              className="relative group transition-all flex items-center justify-center whitespace-nowrap rounded-full will-change-transform duration-300 shadow-sm hover:shadow-md
                         h-8 text-xs pl-3 pr-9
                         md:h-[clamp(2.5rem,5vw,2.75rem)] md:text-[clamp(0.85rem,2vw,0.95rem)] md:pl-[clamp(1rem,3vw,1.5rem)] md:pr-[clamp(3rem,6vw,3.5rem)]
                         bg-orange text-white no-underline font-primary font-medium"
            >
              <span className="relative z-10 transition-colors text-white duration-300 group-hover:text-transparent font-semibold">
                {pathname === "/institutions" ? "Request Demo" : "Try GalenAI"}
              </span>
              <div
                className="absolute right-0 top-0 mt-0.5 mr-0.5 md:mt-1 md:mr-1 bg-white text-orange flex items-center justify-center group-hover:w-[calc(100%-0.5rem)] transition-all rounded-full duration-300
                             h-7 w-7
                             md:h-[clamp(2rem,4vw,2.25rem)] md:w-[clamp(2rem,4vw,2.25rem)]
                             z-20 shadow-sm"
              >
                <ArrowUpRightIcon
                  className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0 transition-transform duration-300 group-hover:rotate-45"
                  strokeWidth={2.5}
                />
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Level 2: Overlay Backdrop (High Z for peak prominence) */}
      {isActuallyOpen && (
        <div
          ref={overlayRef}
          onClick={closeMenu}
          className="fixed inset-0 z-[999] bg-black/10 md:hidden cursor-pointer pointer-events-auto"
          style={{ opacity: 0 }}
        />
      )}

      {/* Level 3: Off-Canvas Menu (Drawer) (Highest Z for clear hierarchy) */}
      <div
        ref={menuRef}
        className="fixed top-0 left-0 w-[60vw] h-full bg-[#fcfaf8] z-[1000] p-[clamp(1.5rem,5vw,2.25rem)] flex flex-col pt-[clamp(2rem,6vw,3rem)] md:hidden shadow-[10px_0_30px_rgba(0,0,0,0.05)] pointer-events-auto"
        style={{ transform: "translateX(-100%)", visibility: "hidden" }}
      >
        <div className="flex flex-col gap-8">
          {/* Go Back */}
          <div className="mobile-nav-item">
            <button
              onClick={closeMenu}
              className="flex items-center gap-2 text-dark/60 hover:text-orange transition-colors font-primary font-medium text-[14px] uppercase tracking-[0.05em]"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Go Back
            </button>
          </div>

          {/* Nav links — Think Like House is first, same style, only diff is NEW badge */}
          <nav className="flex flex-col gap-[clamp(1.25rem,2.5vw,1.75rem)]">
            <div className="mobile-nav-item inline-flex items-center gap-2">
              <AnimatedNavLink
                href="https://house.galenai.io"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  trackEvent("navbar_housemed_click", {});
                  closeMenu();
                }}
                className="relative inline-block text-dark no-underline text-[17px] font-medium opacity-90 hover:opacity-100 transition-opacity duration-200"
              >
                Think Like HouseMD
              </AnimatedNavLink>
              <span className="badge-shimmer px-1.5 py-[4px] rounded text-white text-[7px] font-bold tracking-wide uppercase leading-none">
                NEW
              </span>
            </div>
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="mobile-nav-item"
                onClick={closeMenu}
              >
                <AnimatedNavLink
                  href={link.href}
                  className="relative inline-block text-dark no-underline text-[17px] font-medium tracking-[0.02em] opacity-90 hover:opacity-100 transition-opacity duration-200"
                >
                  {link.label}
                </AnimatedNavLink>
              </div>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;
