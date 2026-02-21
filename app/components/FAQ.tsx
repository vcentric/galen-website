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
    <section className="w-full bg-[#fcfaf8] py-16 px-8 max-[768px]:py-16 max-[600px]:px-6 font-sans">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12">
        
        {/* Left Column: Heading & CTA */}
        <div className="lg:col-span-6 flex flex-col items-start lg:pr-8">
          <span className="text-[0.95rem] text-[#555] font-medium tracking-wide uppercase mb-6">
            FAQ
          </span>
          <h2 className="text-[3.25rem] leading-[1.1] font-serif font-medium text-[#222] tracking-[-0.03em] mb-12 max-[900px]:text-[2.75rem]">
            Frequently asked<br/>questions about us.
          </h2>

          {/* Call to Action Box */}
          <div className="w-full bg-orange rounded-md rounded-br-4xl p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-md">
            <p className="text-[1.15rem] leading-snug text-white font-medium max-w-[200px]">
              Have a question? Let's discuss it now!
            </p>
            <button className="whitespace-nowrap rounded-full bg-white text-orange py-3.5 px-6 font-semibold text-[0.95rem] transition-transform hover:scale-105 active:scale-95 shadow-sm">
              Browse Help Center
            </button>
          </div>
        </div>

        {/* Right Column: FAQ Accordions */}
        <div className="lg:col-span-6 flex flex-col gap-3">
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
                  className="w-full text-left py-3 px-6 flex items-center justify-between gap-4 cursor-pointer outline-none border-none bg-transparent"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isOpen}
                >
                  <span className={`text-[1.05rem] font-medium leading-[1.4] transition-colors ${isOpen ? "text-white" : "text-gray-200"}`}>
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
                    <div className="px-6 pb-5 pt-0">
                      <p className="text-[0.95rem] text-gray-300 leading-[1.6]">
                        {faq.answer}
                      </p>
                      {faq.links && (
                        <div className="flex flex-col gap-2 mt-3 mb-1">
                          {faq.links.map((link, linkIndex) => (
                            <a
                              key={linkIndex}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-[0.9rem] font-semibold text-[#66a0ff] no-underline transition-all hover:text-[#88b6ff] group w-fit"
                            >
                              {link.label}
                              <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                className="w-4 h-4 transition-transform group-hover:translate-x-1"
                              >
                                <path d="M5 12h14M12 5l7 7-7 7" />
                              </svg>
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
      </div>
    </section>
  );
};

export default FAQ;
