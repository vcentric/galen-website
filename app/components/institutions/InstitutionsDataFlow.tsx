import React from 'react';
import { 
    FingerPrintIcon, 
    LinkIcon, 
    ArrowTrendingUpIcon, 
    CircleStackIcon, 
    LightBulbIcon, 
    DocumentCheckIcon 
} from '@heroicons/react/24/outline';

const dataFlowSteps = [
    {
        title: 'Student learning activity',
        desc: 'Direct interaction with tutor and Q-Banks',
        icon: FingerPrintIcon
    },
    {
        title: 'Competency-tagged learning events',
        desc: 'Automatic categorization of performance data',
        icon: LinkIcon
    },
    {
        title: 'Student mastery calculation',
        desc: 'Advanced AI analysis of knowledge gaps',
        icon: ArrowTrendingUpIcon
    },
    {
        title: 'Cohort analytics generation',
        desc: 'Aggregated insights for institutional oversight',
        icon: CircleStackIcon
    },
    {
        title: 'Faculty teaching insights',
        desc: 'Data-driven guidance for classroom focus',
        icon: LightBulbIcon
    },
    {
        title: 'Assessment & intervention',
        desc: 'Closing the loop on student outcomes',
        icon: DocumentCheckIcon
    },
];

const InstitutionsDataFlow = () => (
    <section className="py-12 sm:py-16 bg-transparent text-white overflow-hidden">
        <div className="w-full mx-auto bg-[#1a1a1b] rounded-[40px] p-10 sm:p-14 relative border border-white/[0.05]">
            
            <div className="relative z-10 mb-12 sm:mb-16 text-center max-w-[1000px] mx-auto">
                <span className="text-[clamp(0.75rem,2vw,0.85rem)] text-white/50 font-semibold tracking-widest uppercase mb-4 block">
                    HOW IT WORKS
                </span>
                <h2 className="text-[clamp(1.9rem,5vw,3.25rem)] font-medium font-[var(--font-space-var)] text-white tracking-[-0.03em] leading-[1.1]">
                    A Connected Learning <span className="text-orange">Intelligence System</span>
                </h2>
            </div>

            {/* Steps Grid */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-x-12 lg:gap-y-16">
                {dataFlowSteps.map((step, i) => (
                    <div key={step.title} className="group relative">
                        {/* Connection indicators for desktop (lg) */}
                        {i < dataFlowSteps.length - 1 && (i + 1) % 3 !== 0 && (
                            <div className="hidden lg:block absolute top-[40px] -right-[15%] w-[30%] h-[1px] bg-white/[0.1] z-0">
                                <div className="absolute top-1/2 right-0 -translate-y-1/2 w-1 h-1 rounded-full bg-white/20" />
                            </div>
                        )}
                        
                        <div className="relative z-10 flex flex-col items-start p-8 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] hover:border-orange/20 transition-all duration-500 group-hover:-translate-y-1">
                            {/* Large Background Step Number */}
                            <div className="absolute top-4 right-6 text-[4rem] font-bold text-white/[0.03] select-none group-hover:text-orange/[0.05] transition-colors duration-500">
                                {String(i + 1).padStart(2, '0')}
                            </div>

                            {/* Icon Box - Flat Background with Theme Color on Hover */}
                            <div className="w-14 h-14 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center mb-6 group-hover:border-orange/30 transition-all duration-500">
                                <step.icon className="w-7 h-7 text-white/80 group-hover:text-orange transition-colors duration-500" strokeWidth={1.5} />
                            </div>

                            {/* Text Content */}
                            <h3 className="text-[1.15rem] font-semibold text-white mb-2 tracking-tight group-hover:text-orange/90 transition-colors duration-500">
                                {step.title}
                            </h3>
                            <p className="text-[0.9rem] leading-[1.6] text-white/50 group-hover:text-white/70 transition-colors duration-500">
                                {step.desc}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

export default InstitutionsDataFlow;
