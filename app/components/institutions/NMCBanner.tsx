import React from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

const NMCBanner = () => (
    <div className="flex items-center justify-center gap-2 px-6 py-1.5 bg-[#eb602d] text-white text-[0.75rem] font-medium tracking-[0.01em] leading-[1.4] text-center">
        <span className="flex items-center shrink-0 opacity-90" aria-hidden="true">
            <CheckCircleIcon className="w-4 h-4 text-white/90" />
        </span>
        <span className="max-w-[760px]">
            Fully aligned with NMC's Revised 2024 Competency-Based Medical Education (CBME) Framework
        </span>
    </div>
);

export default NMCBanner;
