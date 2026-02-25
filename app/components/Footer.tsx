import Link from "next/link";
import { SiInstagram, SiLinkedin, SiX, SiYoutube } from "react-icons/si";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";

const Footer = () => {
  return (
    <footer className="w-full pt-[clamp(2rem,5vw,3rem)] pb-[clamp(1rem,3vw,1.5rem)] px-[clamp(1rem,3vw,1.5rem)] font-sans">
      <div className="max-w-[1240px] mx-auto bg-[#303030] rounded-[40px] px-[clamp(1.5rem,5vw,2.5rem)] pt-[clamp(2.5rem,6vw,3rem)] pb-[clamp(2rem,5vw,2.5rem)] text-white relative overflow-hidden shadow-sm">
        <div className="flex flex-col md:block relative mb-[clamp(4rem,10vw,5rem)]">
          
          {/* Col 1 - Icon */}
          <div className="md:absolute md:left-0 md:top-0 mb-[clamp(1.5rem,4vw,2rem)] md:mb-0">
            <img 
              src="/galenai-icon.png" 
              alt="GalenAI" 
              className="w-10 h-10 object-contain"
            />
          </div>

          {/* Links Grid */}
          <div className="w-full">
            <div className="grid grid-cols-2 md:flex md:flex-row md:flex-wrap md:justify-center gap-24 w-full mx-auto">

              {/* Col 2 - Company */}
              <div className="flex flex-col gap-[clamp(0.75rem,2vw,1rem)] min-w-[120px]">
            <h4 className="text-[clamp(1.1rem,2vw,1.25rem)] font-semibold text-white tracking-tight">
              Company
            </h4>
            <div className="flex flex-col gap-3">
              {[
                { label: "About GalenAI", href: "/about" },
                { label: "Our Mission", href: "/mission" },
                { label: "Join the Team", href: "/careers" },
                { label: "Pricing", href: "/pricing" },
                { label: "FAQs", href: "/faq" },
                { label: "Contact Us", href: "/contact" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="group flex items-center w-fit text-[0.95rem] text-gray-300 no-underline transition-colors hover:text-white"
                >
                  {link.label}
                  <div className="overflow-hidden ml-1.5 flex items-center justify-center">
                    <ArrowUpRightIcon className="w-3.5 h-3.5 -translate-x-[120%] translate-y-[120%] transition-transform duration-300 ease-out group-hover:duration-200 group-hover:ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0 group-hover:translate-y-0" strokeWidth={2.5} />
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Col 3 - Study Resources */}
          <div className="flex flex-col gap-[clamp(0.75rem,2vw,1rem)]">
            <h4 className="text-[clamp(1.1rem,2vw,1.25rem)] font-semibold text-white tracking-tight">
              Resources
            </h4>
            <div className="flex flex-col gap-3">
              {[
                { label: "CBME Curriculum", href: "/cbme-curriculum" },
                { label: "Learning Paths", href: "/learning-paths" },
                { label: "Clinical Cases", href: "/cases" },
                { label: "Practice MCQs", href: "/mcqs" },
                { label: "Flashcards", href: "/flashcards" },
                { label: "Exam Prep", href: "/exam-prep" },
                { label: "Blogs & Notes", href: "/blog" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="group flex items-center w-fit text-[0.95rem] text-gray-300 no-underline transition-colors hover:text-white"
                >
                  {link.label}
                  <div className="overflow-hidden ml-1.5 flex items-center justify-center">
                    <ArrowUpRightIcon className="w-3.5 h-3.5 -translate-x-[120%] translate-y-[120%] transition-transform duration-300 ease-out group-hover:duration-200 group-hover:ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0 group-hover:translate-y-0" strokeWidth={2.5} />
                  </div>
                </a>
              ))}
            </div>
          </div>

           {/* Col 4 - Contact */}
          <div className="flex flex-col gap-[clamp(0.75rem,2vw,1rem)]">
            <h4 className="text-[clamp(1.1rem,2vw,1.25rem)] font-semibold text-white tracking-tight">
              Contact
            </h4>
            <div className="flex flex-col gap-[clamp(1rem,3vw,1.25rem)] mt-1">
              <div className="flex flex-col gap-1">
                <span className="text-[clamp(0.7rem,1vw,0.75rem)] text-white font-semibold tracking-wider uppercase">
                  General
                </span>
                <a
                  href="mailto:support@galenai.io"
                  className="group flex items-center w-fit text-[clamp(0.85rem,1.5vw,0.95rem)] text-gray-300 no-underline transition-colors hover:text-white"
                >
                  support@galenai.io
                  <div className="overflow-hidden ml-1.5 flex items-center justify-center">
                    <ArrowUpRightIcon className="w-3.5 h-3.5 -translate-x-[120%] translate-y-[120%] transition-transform duration-300 ease-out group-hover:duration-200 group-hover:ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0 group-hover:translate-y-0" strokeWidth={2.5} />
                  </div>
                </a>
              </div>
              
              <div className="flex flex-col gap-1">
                <span className="text-[clamp(0.7rem,1vw,0.75rem)] text-white font-semibold tracking-wider uppercase">
                  WhatsApp
                </span>
                <a
                  href="https://wa.me/918848542046"
                  className="group flex items-center w-fit text-[clamp(0.85rem,1.5vw,0.95rem)] text-gray-300 no-underline transition-colors hover:text-white"
                >
                  +91 88485 42046
                  <div className="overflow-hidden ml-1.5 flex items-center justify-center">
                    <ArrowUpRightIcon className="w-3.5 h-3.5 -translate-x-[120%] translate-y-[120%] transition-transform duration-300 ease-out group-hover:duration-200 group-hover:ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0 group-hover:translate-y-0" strokeWidth={2.5} />
                  </div>
                </a>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-[clamp(0.7rem,1vw,0.75rem)] text-white font-semibold tracking-wider uppercase">
                  Office
                </span>
                <span className="text-[clamp(0.85rem,1.5vw,0.95rem)] text-white">
                  India
                </span>
                
              </div>
            </div>
          </div>

          {/* Col 5 - Socials */}
          <div className="flex flex-col gap-[clamp(0.75rem,2vw,1rem)]">
            <h4 className="text-[clamp(1.1rem,2vw,1.25rem)] font-semibold text-white tracking-tight">
              Follow us
            </h4>
            <div className="flex flex-col gap-3">
              {[
                { label: "Instagram", icon: <SiInstagram className="w-[18px] h-[18px]" />, href: "#" },
                { label: "LinkedIn", icon: <SiLinkedin className="w-[18px] h-[18px]" />, href: "#" },
                { label: "X", icon: <SiX className="w-[18px] h-[18px]" />, href: "#" },
                { label: "YouTube", icon: <SiYoutube className="w-[18px] h-[18px]" />, href: "#" }
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="group flex items-center w-fit gap-3 text-[0.95rem] text-gray-300 no-underline transition-colors hover:text-white"
                >
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
        </div>

        {/* Big Text */}
        <div className="w-full flex justify-center items-center select-none cursor-default overflow-hidden">
          <h1 
            className="text-white font-serif font-light tracking-[-0.05em] leading-[0.8] m-0"
            style={{ fontSize: "clamp(5.5rem, 24vw, 23rem)" }}
          >
            Galen<span className="font-black">AI</span>
          </h1>
        </div>
      </div>

      {/* Copyright Bar outside dark container */}
      <div className="max-w-[1240px] mx-auto mt-[clamp(1rem,3vw,1.5rem)] px-[clamp(1rem,4vw,1.5rem)] flex justify-between items-center text-[#777] text-[clamp(0.75rem,1.5vw,0.85rem)] font-medium max-[600px]:flex-col max-[600px]:gap-3 max-[600px]:text-center">
        <span>© 2025 GalenAI Pvt. Ltd.</span>
        <div className="flex items-center gap-3">
          <a href="/terms" className="hover:text-[#444] transition-colors">Terms of Service</a>
          <span className="text-[#ccc] text-[0.85rem]">|</span>
          <a href="/privacy" className="hover:text-[#444] transition-colors">Privacy Policy</a>
          <span className="text-[#ccc] text-[0.85rem]">|</span>
          <a href="/refund" className="hover:text-[#444] transition-colors">Refund Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
