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
        <section className="relative py-12 sm:py-16 bg-black rounded-4xl overflow-hidden" id="modules">
            <div className="relative z-10 max-w-[1240px] mx-auto px-[clamp(1.5rem,5vw,3rem)]">
                
                {/* Header Area - Clean & Professional in Dark Mode */}
                <div className="text-center mb-10 sm:mb-14 relative z-10">
                    <span className="text-[clamp(0.75rem,2vw,0.85rem)] text-gray-500 font-semibold tracking-widest uppercase mb-[clamp(1rem,3vw,1.5rem)] block">
                        SYSTEM MODULES
                    </span>
                    <h2 className="text-[clamp(2rem,5.5vw,3.2rem)] font-medium font-[var(--font-space-var)] text-white tracking-[-0.03em] leading-[1.05] mb-5 lg:mb-6 max-w-[900px] mx-auto">
                        Everything your institution needs, <br className="hidden md:block" /> <span className="text-[#eb602d]">works for you</span>
                    </h2>
                </div>

                {/* Stack Layout - Widen Dark Rows (No gap, Color Indicator, Hover Fill) */}
                <div className="flex flex-col relative z-10 border border-white/10 rounded-sm overflow-hidden bg-[#0a0a0a] max-w-[1100px] mx-auto">
                    {modules.map((m, i) => (
                        <div 
                            key={m.title} 
                            className="group relative flex flex-col md:flex-row items-stretch border-b border-white/[0.05] last:border-b-0 transition-all duration-500 overflow-hidden cursor-default"
                        >
                            {/* Hover Fill Background - Animation (Subtle Dark Orange) */}
                            <div className="absolute inset-0 bg-[#eb602d]/[0.03] -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] z-0"></div>
                            
                            {/* Left Color Indicator */}
                            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#eb602d] transform scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-out origin-top z-20"></div>

                            {/* Main Content Area - Refined Typography */}
                            <div className="relative z-10 flex flex-col md:flex-row items-center w-full px-6 py-8 sm:px-12">
                                {/* Icon Container (Balanced) */}
                                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#eb602d]/10 border border-[#eb602d]/20 flex items-center justify-center mb-5 md:mb-0 md:mr-10 group-hover:bg-[#eb602d] transition-all duration-500 transform group-hover:rotate-[10deg]">
                                    {m.icon && <m.icon className="w-6 h-6 text-[#eb602d] group-hover:text-white transition-colors duration-500 stroke-[1.5]" />}
                                </div>
                                
                                {/* Info Column */}
                                <div className="flex-1 text-center md:text-left">
                                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-2">
                                        <h3 className="text-[1.5rem] sm:text-[1.85rem] font-bold text-white tracking-tight group-hover:text-[#eb602d] transition-colors duration-500 m-0 leading-tight">
                                            {m.title}
                                        </h3>
                                        <div className="text-[0.7rem] font-bold text-gray-700 group-hover:text-[#eb602d]/30 transition-colors duration-500 font-[var(--font-space-var)]">
                                            / {String(i + 1).padStart(2, '0')}
                                        </div>
                                    </div>
                                    <p className="text-[0.82rem] sm:text-[0.88rem] leading-[1.6] text-gray-400 group-hover:text-gray-300 transition-colors duration-500 m-0">
                                        {m.desc}
                                    </p>
                                </div>

                               
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer CTA */}
                <div className="mt-10 sm:mt-14 text-center relative z-10">
                    <PrimaryButton 
                        href="#contact" 
                        text="Request Institutional Demo" 
                        icon={ArrowUpRightIcon} 
                        className="!min-w-0 !w-fit mx-auto !px-10 !h-12 sm:!h-14 !text-[1rem]" 
                    />
                </div>
            </div>

        </section>
    );
};

export default InstitutionsModules;





