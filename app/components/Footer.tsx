import Link from "next/link";
import { SiInstagram, SiLinkedin, SiX, SiYoutube } from "react-icons/si";

const Footer = () => {
  return (
    <footer className="w-full pt-12 pb-6 px-4 font-sans">
      <div className="max-w-[1240px] mx-auto bg-[#303030] rounded-[40px] px-8 pt-12 pb-8 text-white relative overflow-hidden shadow-sm">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12 md:gap-8 lg:gap-12 mb-20 md:mb-16">
          
          {/* Col 1 - Icon */}
          <div className="col-span-2 md:col-span-1">
            <img 
              src="/galenai-icon.png" 
              alt="GalenAI" 
              className="w-10 h-10 object-contain"
            />
          </div>

          {/* Col 2 - Company */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[1.25rem] font-semibold text-white tracking-tight">
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
                  className="text-[0.95rem] text-gray-300 no-underline transition-colors hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Col 3 - Study Resources */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[1.25rem] font-semibold text-white tracking-tight">
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
                  className="text-[0.95rem] text-gray-300 no-underline transition-colors hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Col 4 - Contact */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[1.25rem] font-semibold text-white tracking-tight">
              Contact
            </h4>
            <div className="flex flex-col gap-5 mt-1">
              <div className="flex flex-col gap-1">
                <span className="text-[0.75rem] text-white font-semibold tracking-wider uppercase">
                  General
                </span>
                <a
                  href="mailto:support@galenai.io"
                  className="text-[0.95rem] text-gray-300 no-underline transition-colors hover:text-white"
                >
                  support@galenai.io
                </a>
              </div>
              
              <div className="flex flex-col gap-1">
                <span className="text-[0.75rem] text-white font-semibold tracking-wider uppercase">
                  WhatsApp
                </span>
                <a
                  href="https://wa.me/918848542046"
                  className="text-[0.95rem] text-gray-300 no-underline transition-colors hover:text-white"
                >
                  +91 88485 42046
                </a>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-[0.75rem] text-white font-semibold tracking-wider uppercase">
                  Office
                </span>
                <span className="text-[0.95rem] text-white">
                  India
                </span>
              </div>
            </div>
          </div>

          {/* Col 5 - Socials */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[1.25rem] font-semibold text-white tracking-tight">
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
                  className="flex items-center gap-3 text-[0.95rem] text-gray-300 no-underline transition-colors hover:text-white"
                >
                  {social.icon}
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Big Text */}
        <div className="w-full flex justify-center items-center select-none cursor-default overflow-hidden mb-4 md:mb-4">
          <h1 
            className="text-white font-serif font-light tracking-[-0.05em] leading-[0.8] m-0"
            style={{ fontSize: "clamp(6rem, 25vw, 22rem)" }}
          >
            Galen<span className="font-black">AI</span>
          </h1>
        </div>
      </div>

      {/* Copyright Bar outside dark container */}
      <div className="max-w-[1240px] mx-auto mt-6 px-4 md:px-8 flex justify-between items-center text-[#777] text-[0.85rem] font-medium max-[600px]:flex-col max-[600px]:gap-3 max-[600px]:text-center">
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
