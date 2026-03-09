"use client";

import React, { useEffect, useRef } from 'react';

const challengeCards = [
    {
        image: '/clinicalcases.png',
        title: 'Clinical Responsibility',
        desc: 'Doctors must prioritize patient care and hospital duties while also serving as academic faculty.',
    },
    {
        image: '/Flashcards.png',
        title: 'Teaching Responsibility',
        desc: 'Faculty must guide students through lectures, ward rounds, and clinical discussions.',
    },
    {
        image: '/qbanks.png',
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
        <section className="relative pt-12 pb-24 sm:pt-16 sm:pb-32 bg-[linear-gradient(to_bottom,transparent,#fff0e4_20%,#fff0e4_80%,transparent)] overflow-hidden">
            <div className="relative z-10 max-w-[1240px] mx-auto px-5 sm:px-8">
                
                {/* Header Area */}
                <div className="flex flex-col items-center text-center mb-6 sm:mb-8">
                    <span className="text-[clamp(0.75rem,2vw,0.85rem)] text-[#666] font-semibold tracking-widest uppercase mb-[clamp(1rem,3vw,1.5rem)] block text-center">
                        THE CHALLENGE
                    </span>
                    
                    <h2 className="text-[clamp(1.9rem,5vw,3.25rem)] font-medium font-[var(--font-space-var)] text-dark tracking-[-0.03em] leading-[1.1] mb-[clamp(1.5rem,6vw,1rem)] max-w-[800px] text-center">
                        Medical Faculty Are <span className="text-[#eb602d] relative inline-block metrics-title pb-2 ml-2">Overloaded</span>
                    </h2>
                    
                    <p className="text-[0.95rem] sm:text-[1.05rem] leading-[1.6] text-gray-500 max-w-[700px] m-0">
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
                            {/* Image Container Top */}
                            <div className="relative w-full h-[180px] sm:h-[200px] rounded-[10px] bg-[#fff5ef] border border-orange/10 flex items-center justify-center overflow-hidden mb-4 group">
                                {/* Grid Pattern */}
                                <div className="absolute inset-0 opacity-[0.25]" style={{ backgroundImage: "linear-gradient(#fcdabe 1px, transparent 1px), linear-gradient(90deg, #fcdabe 1px, transparent 1px)", backgroundSize: "20px 20px" }}></div>
                                <img src={card.image} alt={card.title} className="relative z-10 w-[92%] h-[92%] object-contain drop-shadow-sm group-hover:scale-[1.02] transition-transform duration-500" />
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
