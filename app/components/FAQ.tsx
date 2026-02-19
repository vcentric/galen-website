"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
  links?: { label: string; url: string }[];
}

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
    <section className="py-20 px-8 bg-transparent max-[768px]:py-16 max-[768px]:px-6 max-[480px]:py-14 max-[480px]:px-5">
      <div className="max-w-[900px] mx-auto">
        <div className="text-center mb-14 max-[768px]:mb-10">
          <h2 className="text-[2.5rem] font-bold text-[#2e2e2e] mb-3 tracking-[-0.02em] max-[768px]:text-[2rem] max-[480px]:text-[1.75rem]">
            Frequently Asked Questions
          </h2>
          <p className="text-[1.1rem] text-[#666] font-normal max-[768px]:text-base">
            Everything you need to know about GalenAI
          </p>
        </div>

        <div className="flex flex-col">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`faq-item border-b border-[rgba(0,0,0,0.08)] transition-all duration-300 hover:bg-[rgba(235,96,45,0.02)] ${
                index === 0 ? "border-t border-t-[rgba(0,0,0,0.08)]" : ""
              } ${openIndex === index ? "active" : ""}`}
            >
              <button
                className="w-full bg-none border-none py-7 px-0 flex items-center justify-between gap-8 cursor-pointer text-left transition-all duration-300 max-[768px]:py-6 max-[768px]:gap-5 max-[480px]:py-5"
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
              >
                <span className="text-[1.05rem] font-semibold text-[#2e2e2e] leading-[1.5] flex-1 max-[768px]:text-base max-[480px]:text-[0.95rem]">
                  {faq.question}
                </span>
                <svg
                  className={`faq-icon w-6 h-6 text-[#eb602d] shrink-0 transition-transform duration-300 max-[768px]:w-5 max-[768px]:h-5`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="faq-answer-wrapper max-h-0 overflow-hidden transition-[max-height] duration-400 ease-[cubic-bezier(0.4,0,0.2,1)]">
                <div className="faq-answer pb-7 max-[768px]:pb-6">
                  <p className="text-[0.975rem] text-[#555] leading-[1.7] m-0 max-[768px]:text-[0.925rem] max-[480px]:text-[0.9rem]">
                    {faq.answer}
                  </p>
                  {faq.links && (
                    <div className="flex flex-col gap-3 mt-5">
                      {faq.links.map((link, linkIndex) => (
                        <a
                          key={linkIndex}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-[0.95rem] font-medium text-[#eb602d] no-underline transition-all duration-200 w-fit hover:text-[#d14d1f] hover:gap-[0.625rem] group"
                        >
                          {link.label}
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
                          >
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                          </svg>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
