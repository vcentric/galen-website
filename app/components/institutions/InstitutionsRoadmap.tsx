"use client";

import React from 'react';

const deploymentSteps = [
    { n: '01', label: 'Data Configuration', phase: 'Phase 1' },
    { n: '02', label: 'Timetable & Academic Setup', phase: 'Phase 2' },
    { n: '03', label: 'Faculty onboarding', phase: 'Phase 3' },
    { n: '04', label: 'Student app onboarding', phase: 'Phase 4' },
    { n: '05', label: 'Institution-Wide Training & Integration', phase: 'Phase 5' },
    { n: '06', label: 'Faculty Workspace Activation', phase: 'Phase 6' },
    { n: '07', label: 'Analytics & Insights Enablement', phase: 'Phase 7' },
];

const InstitutionsRoadmap = () => (
    <section className="py-12 sm:py-16 bg-transparent" id="roadmap">
        <div className="max-w-[1240px] mx-auto px-[clamp(2rem,6vw,4rem)]">
            
            {/* Standardized Header */}
            <div className="text-center mb-12 sm:mb-16">
                <span className="text-[clamp(0.75rem,2vw,0.85rem)] text-[#666] font-semibold tracking-widest uppercase mb-4 block">
                    DEPLOYMENT ROADMAP
                </span>
                <h2 className="text-[clamp(1.9rem,5vw,3.25rem)] font-medium font-[var(--font-space-var)] text-dark tracking-[-0.03em] leading-[1.1]">
                    Seamless Institutional <br className="hidden md:block" />
                    <span className="text-[#eb602d] relative inline-block pb-1.5">
                        Onboarding
                        <svg
                            viewBox="0 0 100 10"
                            className="absolute left-0 bottom-[-4px] w-full h-[8px] pointer-events-none"
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
            </div>

            {/* Steps Container */}
            <div className="relative mb-16">
                
                {/* 1. Desktop Layout (Alternating Top/Bottom) */}
                <div className="hidden md:block relative h-[300px]">
                    {/* Central Horizontal Line */}
                    <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-[#eb602d]/20 -translate-y-1/2" />
                    
                    <div className="flex justify-between h-full relative z-10">
                        {deploymentSteps.map(({ n, label, phase }, i) => {
                            const isTop = i % 2 === 0;
                            return (
                                <div key={n} className="flex-1 flex flex-col items-center relative">
                                    {/* Vertical Connector Stem */}
                                    <div className={`absolute left-1/2 -translate-x-1/2 w-[2px] bg-[#eb602d]/20 ${isTop ? 'bottom-1/2 h-12' : 'top-1/2 h-12'}`} />
                                    
                                    {/* Content Block */}
                                    <div className={`absolute left-1/2 -translate-x-1/2 w-full text-center px-4 ${isTop ? 'bottom-[calc(50%+60px)]' : 'top-[calc(50%+60px)]'}`}>
                                        <span className="text-[0.65rem] text-dark/30 font-bold tracking-widest uppercase mb-1 block italic">
                                            {phase}
                                        </span>
                                        <h3 className="text-[0.9rem] font-bold text-dark tracking-tight leading-tight">
                                            {label}
                                        </h3>
                                    </div>

                                    {/* Central Marker */}
                                    <div className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white border border-orange shadow-sm shadow-orange/20" />
                                    <span className={`absolute top-1/2 -translate-y-1/2 text-[0.7rem] font-bold text-orange/60 font-mono ${isTop ? 'mt-6' : '-mt-6'}`}>
                                        {n}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* 2. Mobile Layout (Alternating Left/Right Split) */}
                <div className="md:hidden flex flex-col items-stretch space-y-16 relative">
                    {/* Central Vertical Line */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-[#eb602d]/20 -translate-x-1/2" />

                    {deploymentSteps.map(({ n, label, phase }, i) => {
                        const phaseOnLeft = i % 2 === 0;
                        return (
                            <div key={n} className="flex items-center relative z-10">
                                {/* Left Side */}
                                <div className={`flex-1 flex justify-end pr-8 text-right`}>
                                    {phaseOnLeft ? (
                                        <span className="text-[0.65rem] text-dark/30 font-bold tracking-widest uppercase italic">{phase}</span>
                                    ) : (
                                        <h3 className="text-[0.85rem] font-bold text-dark leading-snug">{label}</h3>
                                    )}
                                </div>

                                {/* Central Number Marker */}
                                <div className="w-8 h-8 rounded-full bg-white border border-gray-100 text-orange text-[0.7rem] font-bold flex items-center justify-center shrink-0 shadow-sm z-10">
                                    {n}
                                </div>

                                {/* Right Side */}
                                <div className={`flex-1 flex justify-start pl-8 text-left`}>
                                    {!phaseOnLeft ? (
                                        <span className="text-[0.65rem] text-dark/30 font-bold tracking-widest uppercase italic">{phase}</span>
                                    ) : (
                                        <h3 className="text-[0.85rem] font-bold text-dark leading-snug">{label}</h3>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </div>
    </section>
);

export default InstitutionsRoadmap;
