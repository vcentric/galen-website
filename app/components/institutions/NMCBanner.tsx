import React from 'react';

const NMCBanner = () => (
    <div className="flex items-center justify-center gap-2 px-6 py-1.5 bg-[#eb602d] text-white text-[0.75rem] font-medium tracking-[0.01em] leading-[1.4] text-center">
        <span className="flex items-center shrink-0 opacity-90" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="7.5" stroke="rgba(255,255,255,0.5)" />
                <path d="M4.5 8.5l2.5 2.5 4.5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </span>
        <span className="max-w-[760px]">
            Fully aligned with NMC's Revised 2024 Competency-Based Medical Education (CBME) Framework
        </span>
    </div>
);

export default NMCBanner;
