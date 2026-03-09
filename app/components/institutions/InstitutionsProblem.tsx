"use client";

import React, { useEffect, useRef } from 'react';
import { 
    BuildingLibraryIcon, 
    AcademicCapIcon, 
    DocumentChartBarIcon 
} from '@heroicons/react/24/outline';

const challengeCards = [
    {
        icon: BuildingLibraryIcon,
        title: 'Clinical Responsibility',
        desc: 'Doctors must prioritize patient care and hospital duties while also serving as academic faculty.',
    },
    {
        icon: AcademicCapIcon,
        title: 'Teaching Responsibility',
        desc: 'Faculty must guide students through lectures, ward rounds, and clinical discussions.',
    },
    {
        icon: DocumentChartBarIcon,
        title: 'Administrative Burden',
        desc: 'Lesson planning, competency tracking, and assessment documentation consume valuable teaching time.',
    },
];

const InstitutionsProblem = () => {
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const observers = cardRefs.current.map((el, i) => {
            if (!el) return null;
            const obs = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            if (el) {
                                el.style.opacity = '1';
                                el.style.transform = 'translateY(0)';
                            }
                        }, i * 150);
                        obs.disconnect();
                    }
                },
                { threshold: 0.15 }
            );
            obs.observe(el);
            return obs;
        });
        return () => observers.forEach((o) => o && o.disconnect());
    }, []);

    return (
        <section className="relative pt-24 pb-36 sm:pt-32 sm:pb-48 bg-[linear-gradient(to_bottom,transparent,#fff0e4_10%,#fff0e4_90%,transparent)] overflow-hidden">
            <div className="relative z-10 max-w-[1240px] mx-auto px-5 sm:px-8">
                
                {/* Header Area */}
                <div className="flex flex-col items-center text-center">
                    <span className="text-[clamp(0.75rem,2vw,0.85rem)] text-[#666] font-semibold tracking-widest uppercase mb-[clamp(1rem,3vw,1.5rem)] block text-center">
                        THE CHALLENGE
                    </span>
                    
                    <h2 className="text-[clamp(1.9rem,5vw,3.25rem)] font-medium font-[var(--font-space-var)] text-dark tracking-[-0.03em] leading-[1.1] mb-[clamp(1.5rem,6vw,1rem)] max-w-[800px] text-center">
                        Medical Faculty Are 
                        <span 
                            className="text-[#eb602d] relative inline-block ml-2 pb-2"
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
                    
                    <p className="text-[1rem] sm:text-[1.15rem] leading-[1.65] text-gray-500 max-w-[700px] m-0">
                        Faculty members balance multiple critical responsibilities — treating patients, teaching students, and monitoring training. Administrative tasks should not reduce their valuable teaching time.
                    </p>
                </div>

                {/* Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
                    {challengeCards.map((card, i) => (
                        <div
                            key={card.title}
                            className="flex flex-col bg-white rounded-[16px] overflow-hidden shadow-[0_2px_15px_rgba(235,96,45,0.04)] border border-orange/10 p-2.5 sm:p-3 transition-all duration-700 opacity-0 translate-y-12"
                            ref={(el) => {
                                cardRefs.current[i] = el;
                            }}
                        >
                            {/* Icon Container Top */}
                            <div className="relative w-full h-[180px] sm:h-[200px] rounded-[10px] bg-[#fff5ef] border border-orange/10 flex items-center justify-center overflow-hidden mb-4 group">
                                {/* Grid Pattern */}
                                <div className="absolute inset-0 opacity-[0.25]" style={{ backgroundImage: "linear-gradient(#fcdabe 1px, transparent 1px), linear-gradient(90deg, #fcdabe 1px, transparent 1px)", backgroundSize: "20px 20px" }}></div>
                                <div className="relative z-10 p-5 rounded-2xl bg-white/40 backdrop-blur-sm border border-orange/10 group-hover:scale-110 transition-transform duration-500">
                                    <card.icon className="w-12 h-12 sm:w-16 sm:h-16 text-[#eb602d] stroke-[1.5]" />
                                </div>
                            </div>

                            {/* Text Bottom */}
                            <div className="px-3 pb-0">
                                <h3 className="text-[1.1rem] sm:text-[1.15rem] font-bold text-[#222] mb-1.5">{card.title}</h3>
                                <p className="text-[0.85rem] sm:text-[0.9rem] leading-[1.4] text-[#666] m-0">{card.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default InstitutionsProblem;

