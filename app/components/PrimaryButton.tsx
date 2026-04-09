"use client";

import { useRef, ElementType } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { trackEvent, trackCTAClick } from "../../lib/analytics";
import { decorateUrl } from "../../lib/utm";

interface PrimaryButtonProps {
  href: string;
  text: string;
  icon?: ElementType;
  className?: string;
  onClick?: () => void;
}

export const PrimaryButton = ({ href, text, icon: Icon = ArrowUpRightIcon, className = "", onClick }: PrimaryButtonProps) => {
  const btnRef = useRef<HTMLAnchorElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const iconRef = useRef<SVGSVGElement>(null);

  const { contextSafe } = useGSAP({ scope: btnRef });

  useGSAP(() => {
    if (bgRef.current) gsap.set(bgRef.current, { scaleY: 0, transformOrigin: "bottom center" });
    if (textRef.current) gsap.set(textRef.current, { x: 0 }); 
    if (iconRef.current) gsap.set(iconRef.current, { x: 0, y: 15, opacity: 0 });
  }, { scope: btnRef });

  const handleEnter = contextSafe(() => {
    if (bgRef.current) gsap.to(bgRef.current, { scaleY: 1, duration: 0.25, ease: "power4.out", overwrite: "auto" });
    if (textRef.current) gsap.to(textRef.current, { x: -14, color: "var(--color-orange)", duration: 0.25, ease: "power4.out", overwrite: "auto" });
    if (iconRef.current) gsap.to(iconRef.current, { y: 0, opacity: 1, duration: 0.3, ease: "back.out(1.5)", overwrite: "auto" });
  });

  const handleLeave = contextSafe(() => {
    if (bgRef.current) gsap.to(bgRef.current, { scaleY: 0, duration: 0.15, ease: "power4.inOut", overwrite: "auto" });
    if (textRef.current) gsap.to(textRef.current, { x: 0, color: "#ffffff", duration: 0.15, ease: "power4.inOut", overwrite: "auto" });
    if (iconRef.current) gsap.to(iconRef.current, { y: 15, opacity: 0, duration: 0.12, ease: "power3.in", overwrite: "auto" });
  });

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    trackEvent("primary_button_click", { button_text: text, button_href: href });
    trackCTAClick("primary_button", { button_text: text, button_href: href });
    if (onClick) onClick();
  };

  const decoratedHref = decorateUrl(href);

  return (
    <a
      href={decoratedHref}
      ref={btnRef}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={handleClick}
      className={`group relative flex items-center justify-center py-[clamp(0.65rem,1.5vw,0.85rem)] px-[clamp(2rem,6vw,3.5rem)] rounded-full text-[clamp(0.9rem,1.5vw,1rem)] font-primary font-medium text-white bg-orange no-underline transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-105 active:scale-[0.98] overflow-hidden md:min-w-[220px] ${className}`}
    >
      <div ref={bgRef} className="absolute inset-0 bg-white z-0 rounded-full"></div>
      <div className="relative z-10 flex items-center justify-center">
        <div className="relative flex items-center justify-center">
          <span ref={textRef} className="text-white transition-colors block font-semibold whitespace-nowrap">{text}</span>
          <div className="absolute left-[97%] w-[1.2rem] h-[1.2rem] overflow-hidden flex items-center justify-center">
            <Icon ref={iconRef} className="absolute md:w-[1.2rem] w-[1rem] h-[1rem] text-orange" strokeWidth={3} />
          </div>
        </div>
      </div>
    </a>
  );
};
