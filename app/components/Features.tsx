"use client";

import React from "react";
import Image from "next/image";

// Simple, crisp SVGs matching the reference minimalist style
const CommentIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" fill="currentColor"/>
  </svg>
);

const Features = () => {
  const cards = [
    {
      title: "Question Banks",
      desc: "Practice questions that tell you why, not just what. Every question becomes a learning moment — get explanations that connect concepts, highlight traps, and show how examiners think.",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
      )
    },
    {
      title: "Flashcards",
      desc: "Remember what actually matters. High-yield flashcards built from concepts — not random facts. Perfect for quick revisions, spaced recall, and busy days.",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
      )
    },
    {
      title: "Clinical Cases",
      desc: "Learn medicine the way it's practiced. Work through real-world clinical scenarios. Build diagnostic thinking, connect theory to patients, and prepare for viva and ward discussions.",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
      )
    }
  ];

  return (
    <section className="w-full py-[clamp(4rem,10vw,8rem)] px-[clamp(1rem,5vw,2rem)] font-sans relative z-10">
      <div className="max-w-[1100px] mx-auto">
        
        {/* Top Feature: Split into 3/4 + 1/4 */}
        <div className="flex flex-col lg:flex-row gap-6 mb-6">

          {/* 3/4 Card — AI Tutor content */}
          <div className="relative group bg-[var(--color-bg-primary)] rounded-[32px] sm:rounded-[40px] border border-[var(--color-border)] overflow-hidden flex items-center transition-all duration-300 hover:bg-[#ffffff] hover:border-[var(--color-border-strong)] lg:w-3/4">
            
            {/* Huge AI TUTOR watermark */}
            <div className="absolute bottom-[-6.5rem] left-0 pointer-events-none z-10 select-none overflow-hidden h-[45%]">
              <span className="block text-[clamp(3.5rem,9vw,7rem)] font-black font-[var(--font-space-var)] uppercase text-[var(--color-orange)]/20 group-hover:text-[var(--color-dark)]/20 transition-colors duration-500 whitespace-nowrap leading-none tracking-tighter">
                AI TUTOR
              </span>
            </div>

            <div className="flex flex-col items-start justify-center p-8 sm:p-12 lg:p-16 z-20">
              <div className="mb-6 hidden lg:block text-[var(--color-orange)]">
                <CommentIcon />
              </div>
              <h2 className="text-[clamp(1.75rem,2.5vw,2.25rem)] leading-[1.25] font-semibold font-[var(--font-space-var)] text-[var(--color-dark)] tracking-tight mb-5 uppercase">
                Your Personal Medical Tutor, On Demand
              </h2>
              <p className="text-[clamp(0.95rem,1.2vw,1.05rem)] text-[var(--color-text-secondary)] leading-[1.6]">
                Ask questions the way you actually think. GalenAI explains concepts step-by-step, aligned with standard textbooks — so you stop guessing and start understanding.
              </p>
            </div>
          </div>

          {/* 1/4 Card — Phone Mockup */}
          <div className="group bg-[var(--color-bg-primary)] rounded-[32px] sm:rounded-[40px] border border-[var(--color-border)] overflow-hidden flex flex-col items-center justify-end transition-all duration-300 hover:bg-[#ffffff] hover:border-[var(--color-border-strong)] lg:w-1/4 min-h-[350px] sm:min-h-[420px] pt-8 px-4 relative">
            <p className="absolute top-7 left-0 right-0 text-center text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--color-text-secondary)] z-20">
              Try the App
            </p>
            {/* Phone Mockup */}
            <div className="bg-[#151516] rounded-t-[24px] sm:rounded-t-[36px] p-1 pb-0 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.15)] w-full max-w-[140px] sm:max-w-[170px] aspect-[9/16] border-[2px] border-b-0 border-[#2a2a2c] relative translate-y-[20%] group-hover:translate-y-[15%] transition-transform duration-500 ease-out">
              <div className="relative w-full h-full rounded-t-[20px] sm:rounded-t-[30px] overflow-hidden bg-white">
                <Image 
                  src="/mobile.png" 
                  alt="AI Tutor Mobile Interface" 
                  fill 
                  className="object-cover object-top"
                  sizes="200px"
                  priority
                />
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Minimal Grid for the remaining 5 features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          {cards.map((card, idx) => (
            <div 
              key={idx} 
              className="group bg-[var(--color-orange)] rounded-[24px] p-8 flex flex-col items-start transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-10px_rgba(235,96,45,0.3)] border border-transparent hover:border-[#ff8c61]"
            >
              <div className="mb-6 text-[#ffffff] transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3">
                 {card.icon}
              </div>
              <h3 className="text-lg font-semibold text-[#ffffff] tracking-tight mb-2 uppercase group-hover:text-[#fff0e4] transition-colors">
                {card.title}
              </h3>
              <p className="text-[var(--color-beige)] text-[14px] sm:text-[15px] leading-relaxed font-medium opacity-90 group-hover:opacity-100 transition-opacity">
                {card.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Features;