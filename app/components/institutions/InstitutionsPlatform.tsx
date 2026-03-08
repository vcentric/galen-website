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
    <section className="py-16 sm:py-24 bg-transparent" id="overview">
        <div className="max-w-[1160px] mx-auto px-5 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-[1.1fr,0.9fr] gap-12 lg:gap-16 items-center">
                <div className="flex flex-col">
                    <div className="text-[0.78rem] font-semibold tracking-widest uppercase text-[#eb602d] mb-4">The Solution</div>
                    <h2 className="text-[2rem] sm:text-[2.6rem] font-medium leading-[1.15] tracking-[-0.03em] text-[#2e2e2e] mb-5">
                        One Connected Medical Education LMS
                    </h2>
                    <p className="text-[1.15rem] leading-[1.65] text-[#2e2e2e]/65 max-w-[640px] mb-10">
                        GalenAI connects students, faculty, and institutions through a single
                        intelligent learning infrastructure.
                    </p>
                    <div className="flex flex-col rounded-[24px] overflow-hidden border border-[#2e2e2e]/[0.08] shadow-[0_8px_40px_rgba(0,0,0,0.06)] bg-white">
                        {platformLayers.map(({ layer, title, desc, color }, index) => (
                            <div
                                key={layer}
                                className={`flex items-center gap-8 py-8 px-10 relative transition-colors hover:bg-[#fafaf9] ${index !== platformLayers.length - 1 ? 'border-b border-[#2e2e2e]/[0.06]' : ''}`}
                            >
                                <div className="absolute left-0 top-0 bottom-0 w-1" style={{ backgroundColor: color }} />
                                <div className="text-[1.8rem] font-bold text-[#2e2e2e]/[0.08] tracking-[-0.04em] min-w-[52px]">{layer}</div>
                                <div>
                                    <h3 className="text-[1.1rem] font-semibold text-[#2e2e2e] mb-1.5">{title}</h3>
                                    <p className="text-[0.9rem] text-[#2e2e2e]/55 m-0">{desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex justify-center items-start lg:mt-0 mt-8">
                    <DashboardPlaceholder label="Institutional Analytics" accent />
                </div>
            </div>
        </div>
    </section>
);

export default InstitutionsPlatform;
