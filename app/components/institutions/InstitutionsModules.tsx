"use client";

import React from 'react';
import { 
    ChartBarIcon, 
    LightBulbIcon, 
    DocumentPlusIcon, 
    CalendarIcon,
    SparklesIcon,
    ArrowUpRightIcon
} from '@heroicons/react/24/outline';
import { PrimaryButton } from '../PrimaryButton';

const modules = [
    {
        title: 'Cohort Analytics',
        desc: 'Track student performance across batches with real-time insights. Monitor progress, validate learning, and identify gaps early.',
        icon: ChartBarIcon,
    },
    {
        title: 'AI Lesson Planning',
        desc: 'Plan teaching sessions aligned to competencies with AI support. Get structured guidance and feedback on lesson plans.',
        icon: LightBulbIcon,
    },
    {
        title: 'Faculty Content Engine',
        desc: 'Upload lecture material and instantly generate competency-mapped assessments. Use the AI workspace to create lecture slides, notes, and structured lesson plans for lectures, SGD, bedside teaching, and simulations, ready to use in class.',
        icon: DocumentPlusIcon,
    },
    {
        title: 'Timetables & Scheduling',
        desc: 'Identify at-risk students early using learning data. Enable timely interventions and improve academic outcomes.',
        icon: CalendarIcon,
    },
    {
        title: 'Predictive Insights Engine',
        desc: 'Identify student at-risk status early using longitudinal data. Enable early intervention workflows to improve institutional outcomes.',
        icon: SparklesIcon,
    },
];

const InstitutionsModules = () => {
    return (
        <section className="bg-transparent py-10 sm:py-16 overflow-hidden" id="modules">
            <div className="w-full mx-auto ">
                <div className="bg-[#1a1a1b] rounded-[40px] p-10 sm:p-14 relative border border-white/[0.05] overflow-hidden">
                    
                    {/* Header Area Matched with Solution Section */}
                    <div className="text-center mb-12 sm:mb-16 relative z-10">
                        <span className="text-[clamp(0.75rem,2vw,0.85rem)] text-white/50 font-semibold tracking-widest uppercase mb-[clamp(1rem,3vw,1.25rem)] block">
                            SYSTEM MODULES
                        </span>
                        <h2 className="text-[clamp(1.9rem,5vw,3.25rem)] font-medium font-[var(--font-space-var)] text-white tracking-[-0.03em] leading-[1.1] mb-5 max-w-[850px] mx-auto ">
                            Everything your institution needs, <br className="hidden md:block" /> <span className="text-orange">works for you</span>, no matter your role
                        </h2>
                    </div>

                    {/* Minimal Illustrative Row with In-between Separators */}
                    <div className="flex flex-col lg:flex-row items-stretch justify-between gap-10 lg:gap-0 relative z-10">
                        {modules.map((m, i) => (
                            <React.Fragment key={m.title}>
                                <div className="flex-1 flex flex-col items-center text-center group px-4 lg:px-6">
                                    {/* Illustrative Icon Block */}
                                    <div className="relative mb-6 w-16 h-16 flex items-center justify-center">
                                        <div className="relative w-14 h-14 rounded-xl flex items-center justify-center border border-white/10 bg-white/[0.03] group-hover:border-orange/30 transition-all duration-500">
                                            {m.icon && <m.icon className="w-7 h-7 text-white/80 group-hover:text-orange transition-colors duration-500 stroke-[1.5]" />}
                                        </div>
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-[17px] font-bold text-white mb-4 tracking-tight group-hover:text-orange transition-colors duration-500">
                                        {m.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-[13px] leading-[1.6] text-white/40 font-medium max-w-[280px] lg:max-w-[185px] group-hover:text-white/60 transition-colors duration-500">
                                        {m.desc}
                                    </p>
                                </div>

                                {/* Mobile Horizontal Separator */}
                                {i < modules.length - 1 && (
                                    <div className="flex lg:hidden items-center justify-center w-full px-10 my-2">
                                        <div className="h-[1px] flex-1 bg-white/[0.08]" />
                                        <div className="mx-4 w-1.5 h-1.5 rounded-full bg-orange/40 shrink-0" />
                                        <div className="h-[1px] flex-1 bg-white/[0.08]" />
                                    </div>
                                )}

                                {/* Vertical Separator */}
                                {i < modules.length - 1 && (
                                    <div className="hidden lg:flex flex-col items-center justify-center px-4 w-px">
                                        <div className="h-32 w-[1px] bg-white/[0.08]" />
                                        <div className="my-4 w-1.5 h-1.5 rounded-full bg-orange/40 shrink-0" />
                                        <div className="h-32 w-[1px] bg-white/[0.08]" />
                                    </div>
                                )}
                            </React.Fragment>
                        ))}
                    </div>

                    <div className=" mt-15 py-3 sm:py-0 sm:mb-0 text-center relative z-10">
                        <PrimaryButton 
                            href="#contact" 
                            text="Request Institutional Demo" 
                            icon={ArrowUpRightIcon} 
                            className="!min-w-0 !w-fit mx-auto !px-10" 
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default InstitutionsModules;





