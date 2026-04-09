"use client";

import { ArrowRightIcon, ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SiWhatsapp } from "react-icons/si";
import { faqs } from "../data/faqs";
import { trackCTAClick } from "../../lib/analytics";
import { decorateUrl } from "../../lib/utm";
import { PrimaryButton } from "./PrimaryButton";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="w-full bg-[linear-gradient(to_bottom,#ffffff,#fcfaf8_20%,#fcfaf8_80%,#ffffff)] py-[clamp(4rem,10vw,4rem)] px-[clamp(2rem,6vw,4rem)] font-sans">
      <div className="max-w-[1125px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-x-[clamp(3rem,8vw,4rem)] grid-rows-none lg:grid-rows-[auto_1fr]">
        
        {/* 1. Heading Column (Top-left on desktop, Top on mobile) */}
        <div className="lg:col-span-6 lg:row-start-1 flex flex-col items-start lg:pr-8 mb-8 lg:mb-0 lg:self-start">
          <span className="text-[clamp(0.75rem,2vw,0.85rem)] text-[#666] font-semibold tracking-widest uppercase mb-[clamp(1rem,3vw,1.5rem)]">
            FAQ
          </span>
          <h2 className="text-[clamp(1.9rem,5vw,3.25rem)] leading-[1.1] font-serif font-medium text-[#222] tracking-[-0.03em] mb-[clamp(2rem,6vw,3rem)]">
            Frequently Asked<br/>Questions.
          </h2>
        </div>

        {/* 2. Right Column: FAQ Accordions (Right on desktop, Middle on mobile) */}
        <div className="lg:col-span-6 lg:row-span-2 flex flex-col gap-[clamp(0.5rem,1.5vw,0.75rem)] mb-[clamp(3rem,8vw,4rem)] lg:mb-0">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`w-full rounded-md overflow-hidden transition-all duration-300 ${
                  isOpen 
                    ? "bg-[#303030] border-2 border-[#303030] shadow-md" 
                    : "bg-[#383838] border-2 border-transparent hover:bg-[#404040]"
                }`}
              >
                <button
                  className="w-full text-left py-[clamp(0.75rem,2vw,1rem)] px-[clamp(1.25rem,3vw,1.5rem)] flex items-center justify-between gap-[clamp(0.5rem,2vw,1rem)] cursor-pointer outline-none border-none bg-transparent"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isOpen}
                >
                  <span className={`text-[clamp(0.95rem,2vw,1.05rem)] font-medium leading-[1.4] transition-colors ${isOpen ? "text-white" : "text-gray-200"}`}>
                    {faq.question}
                  </span>
                  <span className={`text-xl font-light text-gray-300 transition-transform duration-300 ${isOpen ? "rotate-45" : "rotate-0"}`}>
                    +
                  </span>
                </button>
                
                <div 
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-[clamp(1.25rem,3vw,1.5rem)] pb-[clamp(1rem,2.5vw,1.25rem)] pt-0">
                      <p className="text-[clamp(0.85rem,1.5vw,0.95rem)] text-gray-300 leading-[1.6]">
                        {faq.answer}
                      </p>
                      {faq.links && (
                        <div className="flex flex-col gap-[clamp(0.25rem,1vw,0.5rem)] mt-[clamp(0.5rem,1.5vw,0.75rem)] mb-[clamp(0.25rem,1vw,0.25rem)]">
                          {faq.links.map((link, linkIndex) => (
                            <a
                              key={linkIndex}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-[clamp(0.85rem,1.5vw,0.9rem)] font-semibold text-[#66a0ff] no-underline transition-all hover:text-[#88b6ff] group w-fit"
                            >
                              {link.label}
                              <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 3. CTA Column (Bottom-left on desktop, Bottom on mobile) */}
        <div className="lg:col-span-6 lg:row-start-2 flex flex-col items-start lg:pr-8 lg:self-start">
          <div className="w-full bg-orange rounded-md rounded-br-4xl p-[clamp(1.5rem,4vw,2rem)] flex flex-col sm:flex-row items-center justify-center gap-x-12 gap-y-4 shadow-md">
            <p className="text-[clamp(1.1rem,2vw,1.15rem)] leading-snug text-white font-medium max-w-[240px] text-center sm:text-left">
              Have a question? <br/>
              <span className="whitespace-nowrap font-medium">Let's discuss it now!</span>
            </p>
            
            <PrimaryButton 
              href="https://wa.me/919741591110" 
              text="Chat on WhatsApp"
              className="!bg-[#2e2e2e] !min-w-[160px] sm:!min-w-[180px] !py-2.5 !px-6 !text-[0.85rem]"
              onClick={() => trackCTAClick("whatsapp", { source: "faq" })}
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default FAQ;
