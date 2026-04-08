"use client";

import Image from "next/image";
import Link from "next/link";
import { SiInstagram, SiLinkedin, SiX, SiYoutube, SiAppstore, SiGoogleplay } from "react-icons/si";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { trackEvent } from "../../lib/analytics";

import { usePathname } from 'next/navigation';

const Footer = () => {
  const pathname = usePathname();

  if (pathname === '/terms' || pathname === '/privacy') {
    return null;
  }

  return (
    <footer id="contact" className="w-full pt-[clamp(2rem,5vw,3rem)] pb-[clamp(1rem,3vw,1.5rem)] px-[clamp(2rem,6vw,4rem)] font-primary">
      <div className="max-w-[1240px] mx-auto bg-[#303030] rounded-[40px] px-[clamp(1.5rem,5vw,2.5rem)] pt-[clamp(2.5rem,6vw,3rem)] pb-[clamp(2rem,5vw,2.5rem)] text-white relative overflow-hidden shadow-sm">
        
        {/* Main Footer Row: Logo | Links | Store Buttons */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-8 mb-[clamp(4rem,10vw,6rem)]">
          
          {/* Logo Column */}
          <div className="shrink-0">
            <img 
              src="/galenai-icon.webp" 
              alt="GalenAI" 
              className="w-10 h-10 object-contain"
            />
          </div>

          {/* Links Group */}
          <div className="flex-1 lg:pl-[clamp(2rem,6vw,4rem)]">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-[clamp(2rem,6vw,4rem)]">
              
              {/* Col 1 - Company */}
              <div className="flex flex-col gap-[clamp(0.75rem,2vw,1rem)] min-w-[120px]">
                <h2 className="text-[clamp(1.1rem,2vw,1.25rem)] font-semibold text-white tracking-tight">
                  Company
                </h2>
                <div className="flex flex-col gap-3">
                  {[
                    { label: "About GalenAI", href: "#" },
                    { label: "Our Mission", href: "#" },
                    { label: "Join the Team", href: "#" },
                    { label: "Pricing", href: "/pricing" },
                    { label: "FAQs", href: "/#faq" },
                  ].map((link) => {
                    const isPricing = link.label === "Pricing";
                    const isStatic = link.label === "About GalenAI" || link.label === "Our Mission";
                    const isJoinTeam = link.label === "Join the Team";
                    const commonClasses = "flex items-center w-fit text-[0.95rem] no-underline transition-colors";
                    
                    if (isPricing || isStatic) {
                      return (
                        <span key={link.label} className={`${commonClasses} text-gray-300 font-sans cursor-default`}>
                          {link.label}
                        </span>
                      );
                    }

                    if (isJoinTeam) {
                      return (
                        <div key={link.label} className="group/join relative">
                          <button className={`${commonClasses} font-sans text-white cursor-default`}>
                            {link.label}
                          </button>
                          <div className="absolute bottom-full left-0 mb-3 w-[290px] p-5 bg-[#404040]/95 backdrop-blur-md font-sans text-[0.92rem] leading-relaxed text-gray-200 rounded-2xl opacity-0 invisible group-hover/join:opacity-100 group-hover/join:visible transition-all duration-300 transform translate-y-2 group-hover/join:translate-y-0 z-50 shadow-2xl border border-white/10 pointer-events-none">
                            Interested in working with us? Reach out at <a href="mailto:info@galenai.io" className="text-white font-medium hover:underline pointer-events-auto">info@galenai.io</a> and tell us why you want to be part of GalenAI.
                            <div className="absolute top-full left-6 -translate-y-1/2 w-3 h-3 bg-[#404040] rotate-45 border-r border-b border-white/10"></div>
                          </div>
                        </div>
                      );
                    }

                    return (
                      <a key={link.label} href={link.href} className={`${commonClasses} group text-gray-300 hover:text-white`}>
                        {link.label}
                        <div className="overflow-hidden ml-1.5 flex items-center justify-center">
                          <ArrowUpRightIcon className="w-3.5 h-3.5 -translate-x-[120%] translate-y-[120%] transition-transform duration-300 ease-out group-hover:duration-200 group-hover:ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0 group-hover:translate-y-0" strokeWidth={2.5} />
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Col 2 - Contact */}
              <div className="flex flex-col gap-[clamp(0.75rem,2vw,1rem)] min-w-[140px]">
                <h2 className="text-[clamp(1.1rem,2vw,1.25rem)] font-semibold text-white tracking-tight">
                  Contact
                </h2>
                <div className="flex flex-col gap-[clamp(1rem,3vw,1.25rem)] mt-1">
                  <div className="flex flex-col gap-1">
                    <span className="text-[clamp(0.7rem,1vw,0.75rem)] text-white font-semibold tracking-wider uppercase">General</span>
                    <a href="mailto:support@galenai.io" className="group flex items-center w-fit text-[clamp(0.85rem,1.5vw,0.95rem)] text-gray-300 no-underline transition-colors hover:text-white">
                      support@galenai.io
                      <div className="overflow-hidden ml-1.5 flex items-center justify-center">
                        <ArrowUpRightIcon className="w-3.5 h-3.5 -translate-x-[120%] translate-y-[120%] transition-transform duration-300 ease-out group-hover:duration-200 group-hover:ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0 group-hover:translate-y-0" strokeWidth={2.5} />
                      </div>
                    </a>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[clamp(0.7rem,1vw,0.75rem)] text-white font-semibold tracking-wider uppercase">WhatsApp</span>
                    <a href="https://wa.me/919741591110" className="group flex items-center w-fit text-[clamp(0.85rem,1.5vw,0.95rem)] text-gray-300 no-underline transition-colors hover:text-white">
                      +91 97415 91110
                      <div className="overflow-hidden ml-1.5 flex items-center justify-center">
                        <ArrowUpRightIcon className="w-3.5 h-3.5 -translate-x-[120%] translate-y-[120%] transition-transform duration-300 ease-out group-hover:duration-200 group-hover:ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0 group-hover:translate-y-0" strokeWidth={2.5} />
                      </div>
                    </a>
                  </div>
                </div>
              </div>

              {/* Col 3 - Socials */}
              <div className="flex flex-col gap-[clamp(0.75rem,2vw,1rem)] min-w-[120px]">
                <h2 className="text-[clamp(1.1rem,2vw,1.25rem)] font-semibold text-white tracking-tight">
                  Follow us
                </h2>
                <div className="flex flex-col gap-3">
                  {[
                    { label: "Instagram", icon: <SiInstagram className="w-[18px] h-[18px]" />, href: "https://www.instagram.com/galen_ai/ " },
                    { label: "LinkedIn", icon: <SiLinkedin className="w-[18px] h-[18px]" />, href: "https://linkedin.com/company/galenai-india/" },
                    { label: "X", icon: <SiX className="w-[18px] h-[18px]" />, href: "#" },
                    { label: "YouTube", icon: <SiYoutube className="w-[18px] h-[18px]" />, href: "#" }
                  ].map((social) => (
                    <a key={social.label} href={social.href} className="group flex items-center w-fit gap-3 text-[0.95rem] text-gray-300 no-underline transition-colors hover:text-white">
                      {social.icon}
                      {social.label}
                      <div className="overflow-hidden ml-[-0.25rem] flex items-center justify-center">
                        <ArrowUpRightIcon className="w-3.5 h-3.5 -translate-x-[120%] translate-y-[120%] transition-transform duration-300 ease-out group-hover:duration-200 group-hover:ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0 group-hover:translate-y-0" strokeWidth={2.5} />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Store Buttons Section */}
          <div className="flex flex-col gap-3 w-full lg:w-auto mt-8 lg:mt-0">
            <a 
              href="/qr" 
              onClick={() => trackEvent("footer_app_store_click")}
              className="group flex items-center gap-4 bg-[#404040]/80 rounded-xl p-4 border border-white/10 w-full sm:w-[220px] transition-colors duration-300 hover:bg-[#4a4a4a] hover:border-white/20"
            >
              <div className="bg-[#303030] p-2 rounded-lg">
                <SiAppstore className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[0.65rem] uppercase tracking-wider text-gray-400 font-bold">Download from</span>
                <span className="text-[0.95rem] font-bold text-white tracking-tight">App Store</span>
              </div>
            </a>

            <a 
              href="/qr" 
              onClick={() => trackEvent("footer_google_play_click")}
              className="group flex items-center gap-4 bg-[#404040]/80 rounded-xl p-4 border border-white/10 w-full sm:w-[220px] transition-colors duration-300 hover:bg-[#4a4a4a] hover:border-white/20"
            >
              <div className="bg-[#303030] p-2 rounded-lg">
                <SiGoogleplay className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[0.65rem] uppercase tracking-wider text-gray-400 font-bold">Get it on</span>
                <span className="text-[0.95rem] font-bold text-white tracking-tight">Google Play</span>
              </div>
            </a>
          </div>
        </div>

        <div className="w-full flex justify-center items-center select-none overflow-hidden px-2">
          <Image
            src="/footerlogo.webp"
            alt="GalenAI"
            width={1200}
            height={200}
            className="w-full max-w-[min(95%,1100px)] h-auto object-contain"
            priority={false}
          />
        </div>
      </div>

      {/* Copyright Bar outside dark container */}
      <div className="max-w-[1240px] mx-auto mt-[clamp(1rem,3vw,1.5rem)] px-[clamp(1rem,4vw,1.5rem)] flex justify-between items-center text-[#777] text-[clamp(0.75rem,1.5vw,0.85rem)] font-medium max-[600px]:flex-col max-[600px]:gap-3 max-[600px]:text-center">
        <span>© 2026 GalenAI Pvt. Ltd.</span>
        <div className="flex items-center gap-3">
          <a href="/terms" className="hover:text-[#444] transition-colors">Terms of Service</a>
          <span className="text-[#ccc] text-[0.85rem]">|</span>
          <a href="/privacy" className="hover:text-[#444] transition-colors">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

