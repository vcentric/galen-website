import React from 'react';
import { 
    PresentationChartLineIcon, 
    AcademicCapIcon, 
    ClipboardDocumentCheckIcon 
} from '@heroicons/react/24/outline';

const benefits = [
    {
        icon: PresentationChartLineIcon,
        title: 'Continuous competency monitoring',
        desc: 'Move from exam-based evaluation to ongoing competency tracking across the entire curriculum.',
    },
    {
        icon: AcademicCapIcon,
        title: 'Teaching aligned with learning gaps',
        desc: 'Faculty gain visibility into student learning gaps and adjust teaching accordingly.',
    },
    {
        icon: ClipboardDocumentCheckIcon,
        title: 'Accreditation-ready analytics',
        desc: 'Generate insights for academic governance, curriculum evaluation, and accreditation reporting.',
    },
];

const deploymentSteps = [
    { n: '01', label: 'Curriculum upload' },
    { n: '02', label: 'Academic calendar setup' },
    { n: '03', label: 'Faculty onboarding' },
    { n: '04', label: 'Student app integration' },
    { n: '05', label: 'Cohort analytics activation' },
];

const InstitutionsOutcomes = () => (
    <section className="py-6 sm:py-8 bg-[linear-gradient(to_bottom,#ffffff,#f7f8f8_20%,#f7f8f8_80%,#ffffff)]" id="outcomes">
        <div className="max-w-[1160px] mx-auto px-5 sm:px-8">
            
            <div className="flex flex-col lg:flex-row items-stretch lg:items-start gap-8 lg:gap-12">
                
                {/* Left Side - THE IMPACT (Benefits) */}
                <div className="w-full lg:w-[55%]">
                    <span className="text-[clamp(0.75rem,2vw,0.85rem)] text-[#666] font-semibold tracking-widest uppercase mb-4 block">
                        THE STRATEGIC IMPACT
                    </span>
                    <h2 className="text-[clamp(1.9rem,5vw,3.25rem)] font-medium font-[var(--font-space-var)] text-dark tracking-[-0.03em] leading-[1.1] mb-10">
                        What institutions gain <br /> with 
                        <span className="text-[#eb602d] relative inline-block ml-2 pb-1.5">
                            GalenAI
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

                    <div className="space-y-6">
                        {benefits.map(({ icon: Icon, title, desc }) => (
                            <div key={title} className="group flex items-start gap-6 border-l-[2px] border-gray-100 hover:border-orange/30 pl-6 transition-colors duration-300">
                                <div className="shrink-0 mt-1">
                                    <Icon className="w-7 h-7 text-dark/70 group-hover:text-orange transition-colors duration-300" strokeWidth={1.5} />
                                </div>
                                <div>
                                    <h3 className="text-[1.1rem] font-bold text-[#2e2e2e] mb-2 tracking-tight group-hover:text-orange transition-colors">
                                        {title}
                                    </h3>
                                    <p className="text-[0.95rem] leading-[1.6] text-[#2e2e2e]/60 m-0">
                                        {desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Side - IMPLEMENTATION ROADMAP (Deployment) */}
                <div className="w-full lg:w-[45%]">
                    <div className="bg-white rounded-md border border-[#2e2e2e]/[0.06] p-8 sm:p-10 relative overflow-hidden">
                        
                        <span className="text-[0.7rem] text-[#eb602d] font-bold tracking-[0.1em] uppercase mb-6 block">
                            Deployment Roadmap
                        </span>
                        
                        <div className="relative space-y-6">
                            {/* Vertical Line Connector */}
                            <div className="absolute left-[19px] top-2 bottom-8 w-[1.5px] bg-gray-100" />

                            {deploymentSteps.map(({ n, label }, i) => (
                                <div key={n} className="flex items-start gap-6 relative z-10 group">
                                    {/* Marker */}
                                    <div className="flex flex-col items-center">
                                        <div className="w-10 h-10 rounded-full bg-white border border-gray-100 text-[#eb602d] text-[0.85rem] font-bold flex items-center justify-center shrink-0 group-hover:border-orange/40 group-hover:text-orange transition-all duration-300">
                                            {n}
                                        </div>
                                    </div>

                                    {/* Step Label */}
                                    <div className="pt-2">
                                        <div className="text-[0.95rem] font-semibold text-[#2e2e2e] leading-tight group-hover:text-orange transition-colors duration-300">
                                            {label}
                                        </div>
                                        <div className="text-[0.75rem] text-dark/40 font-medium uppercase tracking-wider mt-1">
                                            Phase {i + 1}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Surgical Note */}
                        <div className="mt-8 pt-6 border-t border-gray-50">
                            <p className="text-[0.8rem] text-dark/50 leading-relaxed italic m-0">
                                Surgical implementation approach ensures zero disruption to existing academic workflows.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </section>
);

export default InstitutionsOutcomes;
