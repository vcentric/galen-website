"use client";

import React, { useEffect, useRef } from 'react';
import { 
    BuildingLibraryIcon, 
    AcademicCapIcon, 
    DocumentChartBarIcon 
} from '@heroicons/react/24/outline';

const challengeCards = [
    {
        number: '01',
        title: 'Clinical Responsibility',
        desc: "Doctors must prioritize patient care and hospital duties while also serving as academic faculty.",
    },
    {
        number: '02',
        title: 'Teaching Responsibility',
        desc: "Faculty must guide students through lectures, ward rounds, and clinical discussions.",
    },
    {
        number: '03',
        title: 'Administrative Burden',
        desc: "Lesson planning, competency tracking, and assessment documentation consume valuable teaching time.",
    },
];

const InstitutionsProblem = () => {
    return (
        <section className="relative pt-24 pb-36 sm:pt-32 sm:pb-36 bg-[linear-gradient(to_bottom,transparent,#fff0e4_10%,#fff0e4_90%,transparent)] overflow-hidden">
            <div className="relative z-10 max-w-[1240px] mx-auto px-[clamp(1.5rem,5vw,3rem)]">
                
                {/* Header Area */}
                <div className="flex flex-col items-center text-center mb-15">
                    <span className="text-[clamp(0.75rem,2vw,0.85rem)] text-[#666] font-semibold tracking-widest uppercase mb-[clamp(1rem,3vw,1.5rem)] block text-center">
                        THE CHALLENGE
                    </span>
                    
                    <h2 className="text-[clamp(2rem,5.5vw,3.5rem)] font-medium font-[var(--font-primary)] text-dark tracking-[-0.03em] leading-[1.05] mb-[clamp(1rem,4.5vw,1.5rem)] max-w-[850px] text-center">
                        Medical Faculty Are 
                        <span 
                            className="text-[#eb602d] relative inline-block ml-3 pb-2"
                        >
                            Overloaded
                            <svg
                                viewBox="0 0 100 10"
                                className="absolute left-0 bottom-[-4px] w-full h-[12px] pointer-events-none"
                                preserveAspectRatio="none"
                            >
                                <path
                                    d="M2 5 Q 50 10 98 5"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    fill="none"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </span>
                    </h2>
                    
                    <p className="text-[1rem] sm:text-[1.15rem] leading-[1.6] text-gray-500 max-w-[750px] m-0">
                        Faculty members balance multiple critical responsibilities — treating patients, teaching students, and monitoring training. Administrative tasks should not reduce their valuable teaching time.
                    </p>
                </div>

                {/* Grid Layout - Hero-style Number + Title Header */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
                    {challengeCards.map((card, i) => (
                        <div
                            key={card.title}
                            className="flex flex-col"
                        >
                            <div className="flex flex-col gap-6">
                                {/* Top Row: Number + Title */}
                                <div className="flex items-center gap-6">
                                    <span 
                                        className="text-[clamp(5rem,14vw,7.5rem)] font-bold text-[#eb602d] leading-none select-none"
                                        style={{ fontFamily: 'var(--font-space-var), sans-serif' }}
                                    >
                                        {card.number}
                                    </span>
                                    <h3 className="text-[1.6rem] sm:text-[1.75rem] font-bold text-[#222] tracking-tight leading-[1] pt-4 lg:pt-5">
                                        {card.title}
                                    </h3>
                                </div>

                                {/* Bottom Row: Description */}
                                <p className="text-[1rem] sm:text-[1.05rem] leading-[1.65] text-[#555] max-w-[350px]">
                                    {card.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default InstitutionsProblem;

