"use client";

import React, { useEffect, useRef } from 'react';

const challengeCards = [
    {
        icon: '🏥',
        title: 'Clinical Responsibility',
        desc: 'Doctors must prioritize patient care and hospital duties while also serving as academic faculty.',
    },
    {
        icon: '🎓',
        title: 'Teaching Responsibility',
        desc: 'Faculty must guide students through lectures, ward rounds, and clinical discussions.',
    },
    {
        icon: '📋',
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
                        }, i * 120);
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
        <section className="py-16 sm:py-24 bg-transparent">
            <div className="max-w-[1160px] mx-auto px-5 sm:px-8">
                <div className="text-[0.78rem] font-semibold tracking-widest uppercase text-[#eb602d] mb-4">The Challenge</div>
                <h2 className="text-[2rem] sm:text-[2.6rem] font-medium leading-[1.15] tracking-[-0.03em] text-[#2e2e2e] mb-5">Medical Faculty Are Overloaded</h2>
                <p className="text-[1.05rem] leading-[1.7] text-[#2e2e2e]/65 max-w-[700px] m-0">
                    Faculty members in medical colleges balance multiple critical responsibilities —
                    treating patients, teaching students, and monitoring clinical training.
                    Administrative tasks like lesson planning, competency mapping, and assessment
                    tracking should not consume their time.
                </p>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
                    {challengeCards.map(({ icon, title, desc }, i) => (
                        <div
                            key={title}
                            className="p-8 bg-[#faf9f7] rounded-[18px] border border-[#2e2e2e]/[0.06] transition-all duration-300 opacity-0 translate-y-6 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.07)]"
                            ref={(el) => {
                                cardRefs.current[i] = el;
                            }}
                        >
                            <div className="text-[1.8rem] mb-4">{icon}</div>
                            <h3 className="text-[1.05rem] font-semibold text-[#2e2e2e] mb-3">{title}</h3>
                            <p className="text-[0.9rem] leading-[1.65] text-[#2e2e2e]/60 m-0">{desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default InstitutionsProblem;
