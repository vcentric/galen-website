"use client";

import { useState } from "react";

const FinalCTA = () => {
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      window.open("https://galenai.io", "_blank");
    }
  };

  return (
    <section className="py-20 px-8 bg-[#f6f4f1] max-[768px]:py-20 max-[768px]:px-6 max-[480px]:py-16 max-[480px]:px-5">
      <div className="max-w-[1100px] mx-auto bg-[#2e2e2e] rounded-[2rem] py-16 px-12 text-center relative overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.12)] max-[768px]:py-12 max-[768px]:px-8 max-[768px]:rounded-[1.5rem] max-[480px]:py-10 max-[480px]:px-6 max-[480px]:rounded-[1.25rem]">
        {/* AI Icon with Breathing Animation */}
        <div className="mb-10 flex justify-center">
          <div className="w-[60px] h-[60px] bg-[rgba(235,96,45,0.1)] rounded-full flex items-center justify-center animate-[breathe_4s_ease-in-out_infinite] overflow-hidden border-[3px] border-[rgba(235,96,45,0.2)] max-[480px]:w-[50px] max-[480px]:h-[50px]">
            <img
              src="/galenai-icon.png"
              alt="GalenAI Mascot"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Header Content */}
        <div className="mb-12">
          <h2 className="font-[Inter,system-ui,-apple-system,sans-serif] text-[2.75rem] font-bold text-white mb-4 tracking-[-0.02em] leading-[1.2] max-[768px]:text-[2.25rem] max-[480px]:text-[1.875rem]">
            Learn medicine better.{" "}
            <span className="text-[#eb602d] relative">Every single day.</span>
          </h2>
          <p className="font-[Inter,system-ui,-apple-system,sans-serif] text-[1.15rem] text-[rgba(255,255,255,0.7)] font-normal leading-[1.6] max-w-[600px] mx-auto max-[768px]:text-[1.05rem] max-[480px]:text-base">
            Ask GalenAI anything — concepts, cases, revisions, or what to study
            next.
          </p>
        </div>

        {/* Ask-AI Input Bar */}
        <form className="mb-12" onSubmit={handleSubmit}>
          <div
            className={`bg-[rgba(255,255,255,0.08)] border-2 rounded-[1rem] py-2 pr-2 pl-6 flex items-center gap-3 transition-all duration-300 backdrop-blur-[10px] max-[768px]:pl-5 max-[480px]:p-2 ${
              isFocused
                ? "border-[#eb602d] shadow-[0_0_0_4px_rgba(235,96,45,0.15)] bg-[rgba(255,255,255,0.1)]"
                : "border-[rgba(255,255,255,0.12)]"
            }`}
          >
            <input
              type="text"
              className="flex-1 bg-none border-none outline-none font-[Inter,system-ui,-apple-system,sans-serif] text-base text-white py-3 px-0 placeholder:text-[rgba(255,255,255,0.5)] max-[768px]:text-[0.95rem] max-[480px]:text-[0.9rem] max-[480px]:py-[0.625rem] max-[480px]:px-3"
              placeholder="Ask GalenAI a doubt, concept, or clinical question…"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
            <button
              type="submit"
              className="w-12 h-12 bg-[#eb602d] border-none rounded-[0.75rem] flex items-center justify-center cursor-pointer transition-all duration-300 shrink-0 hover:bg-[#d14d1f] hover:translate-x-[2px] max-[480px]:w-11 max-[480px]:h-11"
              aria-label="Send question"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-5 h-5 text-white"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          <p className="font-[Inter,system-ui,-apple-system,sans-serif] text-[0.875rem] text-[rgba(255,255,255,0.5)] mt-3">
            Instant, source-backed medical explanations
          </p>
        </form>

        {/* Download Buttons */}
        <div className="flex flex-col items-center gap-6">
          <div className="flex gap-4 flex-wrap justify-center max-[768px]:flex-col max-[768px]:w-full max-[768px]:max-w-[320px]">
            <a
              href="https://apps.apple.com/in/app/galenai/id6755653561"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.15)] rounded-[0.875rem] py-[0.875rem] px-6 flex items-center gap-[0.875rem] no-underline transition-all duration-300 backdrop-blur-[10px] hover:bg-[rgba(255,255,255,0.12)] hover:border-[rgba(255,255,255,0.25)] hover:-translate-y-[2px] hover:shadow-[0_8px_24px_rgba(0,0,0,0.3)] max-[768px]:w-full max-[768px]:justify-center"
            >
              <svg
                className="w-8 h-8 text-white shrink-0"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              <div className="flex flex-col items-start text-left">
                <span className="font-[Inter,system-ui,-apple-system,sans-serif] text-[0.75rem] text-[rgba(255,255,255,0.7)] font-normal">
                  Download on the
                </span>
                <span className="font-[Inter,system-ui,-apple-system,sans-serif] text-[1.05rem] text-white font-semibold">
                  App Store
                </span>
              </div>
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.galenai.galenai"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.15)] rounded-[0.875rem] py-[0.875rem] px-6 flex items-center gap-[0.875rem] no-underline transition-all duration-300 backdrop-blur-[10px] hover:bg-[rgba(255,255,255,0.12)] hover:border-[rgba(255,255,255,0.25)] hover:-translate-y-[2px] hover:shadow-[0_8px_24px_rgba(0,0,0,0.3)] max-[768px]:w-full max-[768px]:justify-center"
            >
              <svg
                className="w-8 h-8 text-white shrink-0"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
              </svg>
              <div className="flex flex-col items-start text-left">
                <span className="font-[Inter,system-ui,-apple-system,sans-serif] text-[0.75rem] text-[rgba(255,255,255,0.7)] font-normal">
                  Get it on
                </span>
                <span className="font-[Inter,system-ui,-apple-system,sans-serif] text-[1.05rem] text-white font-semibold">
                  Google Play
                </span>
              </div>
            </a>
          </div>
          <p className="font-[Inter,system-ui,-apple-system,sans-serif] text-[0.875rem] text-[rgba(255,255,255,0.4)] font-normal">
            Used by medical students across India
          </p>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
