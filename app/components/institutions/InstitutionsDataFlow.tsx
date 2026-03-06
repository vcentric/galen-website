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
    <section className="py-16 sm:py-24 bg-[#2e2e2e] text-white">
        <div className="max-w-[1160px] mx-auto px-5 sm:px-8">
            <div className="text-[0.78rem] font-semibold tracking-widest uppercase text-[#eb602d]/85 mb-4">How It Works</div>
            <h2 className="text-[2rem] sm:text-[2.6rem] font-medium leading-[1.15] tracking-[-0.03em] text-white mb-12">
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
