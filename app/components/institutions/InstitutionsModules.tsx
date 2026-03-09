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
        desc: 'Deep learning insights across student batches using real-time learning data generated from student activity. Validate progress and identify gaps automatically.',
        icon: ChartBarIcon,
    },
    {
        title: 'AI Lesson Planning',
        desc: 'Align teaching sessions with competencies while receiving insights on curriculum gaps. Receive automated feedback on faculty session plans.',
        icon: LightBulbIcon,
    },
    {
        title: 'Faculty Content Engine',
        desc: 'Upload lecture material and automatically generate assessments mapped to your institutional competencies. High-fidelity results in seconds.',
        icon: DocumentPlusIcon,
    },
    {
        title: 'Workflow Automation',
        desc: 'Simplify institutional coordination with automated scheduling and task management. Connect faculty and administrators seamlessly.',
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
        <section className="bg-[linear-gradient(to_bottom,#ffffff,#f7f8f8_20%,#f7f8f8_80%,#ffffff)] min-h-[100vh] flex flex-col justify-center py-12 sm:py-16 overflow-hidden" id="modules">
            <div className="max-w-[1160px] mx-auto px-5 sm:px-8 w-full">
                
                {/* Header Area Matched with Solution Section */}
                <div className="text-center lg:text-left mb-12 sm:mb-16">
                    <span className="text-[clamp(0.75rem,2vw,0.85rem)] text-[#666] font-semibold tracking-widest uppercase mb-[clamp(1rem,3vw,1.25rem)] block">
                        SYSTEM MODULES
                    </span>
                    <h2 className="text-[clamp(1.9rem,5vw,3.25rem)] font-medium font-[var(--font-space-var)] text-dark tracking-[-0.03em] leading-[1.1] mb-5 max-w-[850px] mx-auto lg:mx-0">
                        Everything your institution needs, <br className="hidden md:block" /> works for you, no matter your role
                    </h2>
                </div>

                {/* Minimal Illustrative Row with In-between Separators */}
                <div className="flex flex-col lg:flex-row items-stretch justify-between gap-10 lg:gap-0">
                    {modules.map((m, i) => (
                        <React.Fragment key={m.title}>
                            <div className="flex-1 flex flex-col items-center text-center group px-4 lg:px-6">
                                {/* Illustrative Icon Block */}
                                <div className="relative mb-6 w-16 h-16 flex items-center justify-center">
                                    <div className="absolute inset-0 rounded-full bg-[#eb602d] opacity-5 blur-xl group-hover:opacity-15 transition-opacity duration-500" />
                                    <div className="relative w-14 h-14 rounded-xl flex items-center justify-center border border-[#eb602d]/10 bg-[#eb602d]/[0.02] group-hover:scale-110 transition-transform duration-500">
                                        <m.icon className="w-7 h-7 text-[#eb602d] stroke-[1.5]" />
                                    </div>
                                </div>

                                {/* Title */}
                                <h3 className="text-[17px] font-bold text-[#3a2c27] mb-4 tracking-tight">
                                    {m.title}
                                </h3>

                                {/* Description */}
                                <p className="text-[13px] leading-[1.6] text-[#3a2c27]/50 font-medium max-w-[280px] lg:max-w-[185px]">
                                    {m.desc}
                                </p>
                            </div>

                            {/* Mobile Horizontal Separator: Line -> Dot -> Line */}
                            {i < modules.length - 1 && (
                                <div className="flex lg:hidden items-center justify-center w-full px-10 my-2">
                                    <div className="h-[1px] flex-1 bg-[#eb602d]/20" />
                                    <div className="mx-4 w-1.5 h-1.5 rounded-full bg-[#eb602d] shadow-[0_0_8px_rgba(235,96,45,0.3)] shrink-0" />
                                    <div className="h-[1px] flex-1 bg-[#eb602d]/20" />
                                </div>
                            )}

                            {/* Vertical Separator: Line -> Dot -> Line */}
                            {i < modules.length - 1 && (
                                <div className="hidden lg:flex flex-col items-center justify-center px-4 w-px">
                                    <div className="h-32 w-[1px] bg-[#eb602d]/20" />
                                    <div className="my-4 w-1.5 h-1.5 rounded-full bg-[#eb602d] shadow-[0_0_8px_rgba(235,96,45,0.3)] shrink-0" />
                                    <div className="h-32 w-[1px] bg-[#eb602d]/20" />
                                </div>
                            )}
                        </React.Fragment>
                    ))}
                </div>

                {/* Bottom CTA Area - Centered and Compact */}
                <div className="mt-8 sm:mt-16 text-center">
                    <PrimaryButton 
                        href="#contact" 
                        text="Request Institutional Demo" 
                        icon={ArrowUpRightIcon} 
                        className="!min-w-0 !w-fit mx-auto !px-10" 
                    />
                </div>

            </div>
        </section>
    );
};

export default InstitutionsModules;





