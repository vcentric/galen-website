"use client";

import { useRef, ElementType } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { QrCodeIcon } from "@heroicons/react/24/outline";
import { trackEvent } from "../../lib/analytics";

interface SecondaryButtonProps {
  href: string;
  text: string;
  icon?: ElementType;
  showQrMobile?: boolean;
  className?: string;
  onClick?: () => void;
}

export const SecondaryButton = ({ href, text, icon: Icon = QrCodeIcon, showQrMobile = false, className = "", onClick }: SecondaryButtonProps) => {
  const btnRef = useRef<HTMLAnchorElement>(null);
  const underlineRef = useRef<HTMLSpanElement>(null);
  const qrPopoverRef = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP({ scope: btnRef });

  useGSAP(() => {
    if (underlineRef.current) gsap.set(underlineRef.current, { scaleX: 0, transformOrigin: "left center" });
    if (qrPopoverRef.current) gsap.set(qrPopoverRef.current, { opacity: 0, scale: 0.9, y: 10, pointerEvents: "none", visibility: "hidden" });
  }, { scope: btnRef });

  const handleEnter = contextSafe(() => {
    if (underlineRef.current) {
      gsap.set(underlineRef.current, { transformOrigin: "left center" });
      gsap.to(underlineRef.current, { scaleX: 1, duration: 0.4, ease: "power3.out", overwrite: "auto" });
    }
    if (qrPopoverRef.current && showQrMobile) {
      gsap.to(qrPopoverRef.current, { opacity: 1, scale: 1, y: 0, visibility: "visible", duration: 0.4, ease: "back.out(1.7)", overwrite: "auto" });
    }
  });

  const handleLeave = contextSafe(() => {
    if (underlineRef.current) {
      gsap.set(underlineRef.current, { transformOrigin: "right center" });
      gsap.to(underlineRef.current, { scaleX: 0, duration: 0.3, ease: "power3.in", overwrite: "auto" });
    }
    if (qrPopoverRef.current && showQrMobile) {
      gsap.to(qrPopoverRef.current, {
        opacity: 0, scale: 0.9, y: 10, duration: 0.25, ease: "power2.in", overwrite: "auto", onComplete: () => {
          gsap.set(qrPopoverRef.current, { visibility: "hidden" });
        }
      });
    }
  });

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    trackEvent("secondary_button_click", { button_text: text, button_href: href });
    if (onClick) onClick();
  };

  return (
    <a
      href={href}
      ref={btnRef}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={handleClick}
      className={`relative bg-white border border-black/10 shadow-sm flex items-center justify-center gap-[clamp(0.75rem,2vw,1.2rem)] py-[clamp(0.5rem,1.5vw,0.7rem)] px-[clamp(1.5rem,4vw,2rem)] rounded-full text-[clamp(0.9rem,1.5vw,1rem)] font-primary font-medium text-dark no-underline transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${className}`}
    >
      <span className="relative pb-[2px] font-semibold">
        {text}
        <span ref={underlineRef} className="absolute left-0 bottom-[-1px] w-full h-[2px] bg-orange"></span>
      </span>
      <Icon className="w-[1.2rem] h-[1.2rem] text-orange" strokeWidth={2.5} />

      {showQrMobile && (
        <div ref={qrPopoverRef} className="hidden md:flex absolute bottom-[calc(100%-10rem)] left-[25rem] -translate-x-1/2 w-[220px] p-4 bg-white rounded-2xl border border-black/5 flex-col items-center gap-3 z-50 pointer-events-none shadow-sm">
          <div className="w-full aspect-square rounded-xl overflow-hidden bg-orange/5 p-2 border border-orange/10">
            <img src="/qrnew.png" alt="Scan to Download" className="w-full h-full object-contain mix-blend-multiply" />
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-[14px] font-bold text-dark">Scan to download</span>
            <span className="text-[11px] text-dark/60 font-medium whitespace-nowrap">Available on iOS & Android</span>
          </div>
          <div className="absolute right-full top-1/2 -translate-y-1/2 translate-x-1/2 w-4 h-4 bg-white border-l border-b border-black/5 rotate-45 shadow-[-5px_5px_10px_rgba(0,0,0,0.03)]" />
        </div>
      )}
    </a>
  );
};
