"use client";

import React from "react";
import Image from "next/image";

// Simple, crisp SVGs matching the reference minimalist style
const CommentIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" fill="#1a1a1c"/>
  </svg>
);

const Features = () => {
  const cards = [
    {
      title: "Clinical Cases",
      desc: "Practice diagnosis on realistic clinical scenarios spanning various specialties.",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#1a1a1c]">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
      )
    },
    {
      title: "Question Banks",
      desc: "Adaptive questions tracking your weak areas as you improve your knowledge.",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#1a1a1c]">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
      )
    },
    {
      title: "Flashcards",
      desc: "Active recall + spaced repetition directly built from your syllabus.",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#1a1a1c]">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
      )
    }
  ];

  return (
    <section className="w-full py-[clamp(4rem,10vw,8rem)] px-[clamp(1rem,5vw,2rem)] font-sans relative z-10">
      <div className="max-w-[1100px] mx-auto">
        
        {/* Top Split Layout: AI Tutor */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start lg:items-center mb-16 lg:mb-24">
          <div className="w-full lg:w-[35%] flex flex-col items-start pr-0 lg:pr-8">
            <div className="mb-8 hidden lg:block">
              <CommentIcon />
            </div>
            <h2 className="text-[clamp(1.75rem,2.5vw,2.25rem)] leading-[1.25] font-semibold text-[#1a1a1c] tracking-tight mb-5">
              Summary, quizzes, podcast, and more
            </h2>
            <p className="text-[clamp(0.95rem,1.2vw,1.05rem)] text-[#8c8c8e] leading-[1.6]">
              Understand the key points, test your knowledge, get answers with references, and listen to an AI tutor.
            </p>
          </div>
          
          <div className="w-full lg:w-[65%]">
            {/* Minimalist Browser/App Mockup Wrapper */}
            <div className="bg-[#151516] rounded-[24px] sm:rounded-[32px] p-2 sm:p-4 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] relative w-full aspect-[4/3] sm:aspect-[16/10] overflow-hidden border border-[#e5e5e7] group">
               {/* Decorative top bar for app feel */}
               <div className="relative top-0 left-0 right-0 h-8 rounded-t-[20px] sm:rounded-t-[28px] flex items-center px-4 gap-2 z-20 opacity-80 mb-2">
                   <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]"></div>
                   <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]"></div>
                   <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]"></div>
                   <div className="ml-4 text-xs font-medium text-white/50 truncate w-full">Justice: What's The Right Thing To Do?</div>
               </div>
               <div className="relative w-full h-[calc(100%-40px)] rounded-[16px] sm:rounded-[20px] overflow-hidden">
                  <Image 
                    src="/aitutor.png" 
                    alt="AI Tutor Interface" 
                    fill 
                    className="object-cover object-top transform group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                    sizes="(max-width: 1024px) 100vw, 65vw"
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
              className="bg-[#f9f9fb] rounded-[24px] p-8 flex flex-col items-start transition-all duration-300 hover:bg-[#f2f2f5] border border-[#e5e5e7]/50 hover:border-[#e5e5e7]"
            >
              <div className="mb-6 text-[#1a1a1c]">
                 {card.icon}
              </div>
              <h3 className="text-lg font-semibold text-[#1a1a1c] tracking-tight mb-2">
                {card.title}
              </h3>
              <p className="text-[#8c8c8e] text-[14px] sm:text-[15px] leading-relaxed font-medium">
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