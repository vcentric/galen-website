import React from 'react';

const dataFlowSteps = [
    'Student learning activity',
    'Competency-tagged learning events',
    'Student mastery calculation',
    'Cohort analytics generation',
    'Faculty teaching insights',
    'Assessment generation & intervention',
];

const InstitutionsDataFlow = () => (
    <section className="py-16 sm:py-24 bg-transparent text-white">
        <div className="max-w-[1160px] mx-auto px-5 sm:px-8 bg-[#2e2e2e] rounded-3xl p-10 sm:p-16">
            <span className="text-[clamp(0.75rem,2vw,0.85rem)] text-white/50 font-semibold tracking-widest uppercase mb-[clamp(1rem,3vw,1.5rem)] block text-center">
                HOW IT WORKS
            </span>
            <h2 className="text-[clamp(1.9rem,5vw,3.25rem)] font-medium font-[var(--font-space-var)] text-white tracking-[-0.03em] leading-[1.1] mb-[clamp(1.5rem,6vw,1rem)] text-center">
                A connected learning intelligence system
            </h2>
            <div className="flex flex-col items-center mt-12 w-full">
                {dataFlowSteps.map((step, i) => (
                    <React.Fragment key={step}>
                        <div className="flex items-center gap-6 bg-white/5 border border-white/10 rounded-xl px-8 py-5 w-full max-w-[560px] transition-colors hover:bg-[#eb602d]/10 hover:border-[#eb602d]/20">
                            <div className="text-[1.4rem] font-bold text-[#eb602d] opacity-70 min-w-[36px] tracking-[-0.04em]">
                                {String(i + 1).padStart(2, '0')}
                            </div>
                            <div className="text-[1rem] font-normal text-white/80">{step}</div>
                        </div>
                        {i < dataFlowSteps.length - 1 && (
                            <div className="text-[1.4rem] text-[#eb602d]/40 leading-none py-1.5 align-middle">↓</div>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    </section>
);

export default InstitutionsDataFlow;
