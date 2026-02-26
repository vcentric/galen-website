"use client";

import { ArrowRightIcon, ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface FAQItem {
  question: string;
  answer: string;
  links?: { label: string; url: string }[];
}

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const tryBtnRef = useRef<HTMLAnchorElement>(null);
  const tryBgRef = useRef<HTMLDivElement>(null);
  const tryTextRef = useRef<HTMLSpanElement>(null);
  const tryIconRef = useRef<SVGSVGElement>(null);

  const { contextSafe: contextSafeTry } = useGSAP({ scope: tryBtnRef });

  useGSAP(() => {
    gsap.set(tryBgRef.current, { scaleY: 0, transformOrigin: "bottom center" });
    gsap.set(tryTextRef.current, { x: 0 }); // Initially centered
    gsap.set(tryIconRef.current, { x: 0, y: 15, opacity: 0 }); // Starts below, no x offset
  }, { scope: tryBtnRef });

  const handleTryEnter = contextSafeTry(() => {
    gsap.to(tryBgRef.current, {
      scaleY: 1,
      duration: 0.25,
      ease: "power4.out",
      overwrite: "auto"
    });
    gsap.to(tryTextRef.current, {
      x: -12, // Slide text to the left to make room
      color: "#ffffff",
      duration: 0.25,
      ease: "power4.out",
      overwrite: "auto"
    });
    gsap.to(tryIconRef.current, {
      y: 0, // Pop up
      opacity: 1,
      duration: 0.3,
      ease: "back.out(1.5)",
      overwrite: "auto",
    });
  });

  const handleTryLeave = contextSafeTry(() => {
    gsap.to(tryBgRef.current, {
      scaleY: 0,
      duration: 0.25,
      ease: "power4.out",
      overwrite: "auto"
    });
    gsap.to(tryTextRef.current, {
      x: 0, // Slide text back to exact center
      color: "var(--color-orange)",
      duration: 0.25,
      ease: "power4.out",
      overwrite: "auto"
    });
    gsap.to(tryIconRef.current, {
      y: 15, // Drop back down
      opacity: 0,
      duration: 0.2,
      ease: "power3.in",
      overwrite: "auto"
    });
  });

  const faqs: FAQItem[] = [
    {
      question: "How can GalenAI help me in my medical studies?",
      answer:
        "GalenAI is your daily medical learning companion. It helps you understand concepts clearly, revise efficiently with flashcards and quizzes, practise clinical reasoning, and stay consistent with smart planning and progress tracking.",
    },
    {
      question: "Is GalenAI free to use?",
      answer:
        "Yes. GalenAI currently offers a free version available till May with access to core learning features. Advanced features will be part of paid plans when we fully launch.",
    },
    {
      question: "Can I trust the answers on GalenAI?",
      answer:
        "Yes. All answers are backed by verified medical sources with references you can check instantly. Source transparency is built into the product.",
    },
    {
      question: "What stage is GalenAI currently at?",
      answer:
        "GalenAI is live and actively evolving. We are rolling out features in phases while learning from real medical students using the platform.",
    },
    {
      question: "Is my data safe on GalenAI?",
      answer:
        "Absolutely. GalenAI follows privacy-first principles. Your data is secure, private, and never shared.",
    },
    {
      question: "Where is GalenAI available? (Web / iOS / Android)",
      answer:
        "GalenAI is currently available as a web app. Native mobile apps are coming soon.",
      links: [
        {
          label: "iOS App",
          url: "https://apps.apple.com/in/app/galenai/id6755653561",
        },
        {
          label: "Android App",
          url: "https://play.google.com/store/apps/details?id=com.galenai.galenai",
        },
      ],
    },
    {
      question:
        "I already use textbooks and video lectures. Why GalenAI?",
      answer:
        "GalenAI doesn't replace textbooks or videos — it helps you learn actively. It explains, tests, tracks progress, and guides you on what to study next.",
    },
    {
      question: "How does GalenAI help me stay consistent and motivated?",
      answer:
        "With built-in reminders, progress tracking, focused study sessions, and gentle nudges, GalenAI helps you build daily study habits — not last-minute cramming.",
    },
    {
      question: "Who is GalenAI built for?",
      answer:
        "GalenAI is designed for MBBS, MD/MS, SS aspirants, and early-career doctors who want to learn medicine better — not just crack exams.",
    },
    {
      question: "How can I get support or report an issue?",
      answer:
        "You can reach us at support@galenai.io. In-app support and instant doubt resolution are coming soon.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full bg-[#fcfaf8] py-[clamp(4rem,10vw,6rem)] px-[clamp(1.5rem,5vw,2rem)] font-sans">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-x-[clamp(3rem,8vw,4rem)] grid-rows-none lg:grid-rows-[auto_1fr]">
        
        {/* 1. Heading Column (Top-left on desktop, Top on mobile) */}
        <div className="lg:col-span-6 lg:row-start-1 flex flex-col items-start lg:pr-8 mb-8 lg:mb-0 lg:self-start">
          <span className="text-[clamp(0.75rem,2vw,0.85rem)] text-[#666] font-semibold tracking-widest uppercase mb-[clamp(1rem,3vw,1.5rem)]">
            FAQ
          </span>
          <h2 className="text-[clamp(2.25rem,5vw,3.25rem)] leading-[1.1] font-serif font-medium text-[#222] tracking-[-0.03em] mb-[clamp(2rem,6vw,3rem)]">
            Frequently asked<br/>questions about us.
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
          <div className="w-full bg-orange rounded-md rounded-br-4xl p-[clamp(1.5rem,4vw,2rem)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-[clamp(1rem,3vw,1.5rem)] shadow-md">
            <p className="text-[clamp(1.05rem,2vw,1.15rem)] leading-snug text-white font-medium max-w-[200px]">
              Have a question? Let's discuss it now!
            </p>
            <a 
              href="https://wa.me/918848542046" 
              ref={tryBtnRef}
              onMouseEnter={handleTryEnter}
              onMouseLeave={handleTryLeave}
              className="group relative flex items-center justify-center py-[clamp(0.75rem,2vw,0.85rem)] px-[clamp(1.5rem,4vw,2rem)] rounded-full text-[clamp(0.85rem,1.5vw,0.85rem)] font-primary font-medium text-orange bg-white no-underline transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-105 active:scale-[0.98] overflow-hidden min-w-[200px]"
            >
              <div ref={tryBgRef} className="absolute inset-0 bg-[#303030] z-0 rounded-full"></div>
              <div className="relative z-10 flex items-center justify-center w-full">
                <span ref={tryTextRef} className="text-orange transition-colors block" style={{ color: "var(--color-orange)" }}>Chat on WhatsApp</span>
                <div className="absolute -right-[0.25rem] w-[1.25rem] h-[1.25rem] overflow-hidden flex items-center justify-center">
                  <ArrowUpRightIcon ref={tryIconRef} className="absolute w-[12px] h-[12px] text-white" strokeWidth={3} />
                </div>
              </div>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default FAQ;
