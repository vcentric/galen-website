import React from 'react';
import DashboardPlaceholder from './DashboardPlaceholder';

const platformLayers = [
    {
        layer: '01',
        title: 'Institution Governance Layer',
        desc: 'Cohort analytics, competency progress tracking, and academic oversight for administrators.',
        color: '#eb602d',
    },
    {
        layer: '02',
        title: 'Teaching Layer',
        desc: 'Faculty tools for lesson planning, assessment creation, and competency-aligned teaching.',
        color: '#2e2e2e',
    },
    {
        layer: '03',
        title: 'Student Learning Layer',
        desc: 'AI-powered learning companion helping students understand medicine through reasoning, practice, and feedback.',
        color: '#5a7fc9',
    },
];

const InstitutionsPlatform = () => (
    <section className="py-8 sm:py-16 bg-transparent" id="overview">
        <div className="max-w-[1240px] mx-auto px-[clamp(2rem,6vw,4rem)]">
            <span className="text-[clamp(0.75rem,2vw,0.85rem)] text-[#666] font-semibold tracking-widest uppercase mb-[clamp(1rem,3vw,1.5rem)] block text-left">
                THE SOLUTION
            </span>
            <h2 className="text-[clamp(1.9rem,5vw,3.25rem)] font-medium font-[var(--font-space-var)] text-dark tracking-[-0.03em] leading-[1.1] mb-[clamp(1.5rem,6vw,2.5rem)]">
                One <span className="text-orange">Connected</span> Medical Education LMS
            </h2>
            <p className="text-[1rem] sm:text-[1.15rem] leading-[1.65] text-gray-500 max-w-[640px] mb-8">
                GalenAI connects students, faculty, and institutions through a single
                intelligent learning infrastructure.
            </p>

            <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8 w-full">
                <div className="flex flex-col w-full lg:w-[60%] rounded-md overflow-hidden border border-[#2e2e2e]/[0.08] bg-white max-w-[650px] shrink-0">
                    {platformLayers.map(({ layer, title, desc, color }, index) => (
                        <div
                            key={layer}
                            className={`group flex items-center gap-8 py-8.75 px-10 relative overflow-hidden transition-colors ${index !== platformLayers.length - 1 ? 'border-b border-[#2e2e2e]/[0.06]' : ''}`}
                        >
                            <div 
                                className="absolute inset-0 z-0 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"
                                style={{ backgroundColor: color }}
                            />
                            
                            <div className="absolute left-0 top-0 bottom-0 w-1 z-10" style={{ backgroundColor: color }} />
                            
                            <div className="relative z-10 text-[1.8rem] font-bold text-[#2e2e2e]/[0.08] group-hover:text-white/20 transition-colors duration-500 tracking-[-0.04em] min-w-[52px]">
                                {layer}
                            </div>
                            <div className="relative z-10">
                                <h3 className="text-[1.1rem] font-semibold text-[#2e2e2e] group-hover:text-white transition-colors duration-500 mb-1.5">
                                    {title}
                                </h3>
                                <p className="text-[0.9rem] text-[#2e2e2e]/55 group-hover:text-white/80 transition-colors duration-500 m-0">
                                    {desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
                
                <div className="w-full lg:w-[40%] max-w-[400px] shrink-0 h-full min-h-[250px]">
                    <DashboardPlaceholder label="Institutional Analytics" accent />
                </div>
            </div>
        </div>
    </section>
);

export default InstitutionsPlatform;
