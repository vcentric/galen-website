import React from 'react';

const deploymentSteps = [
    { n: '01', label: 'Curriculum upload' },
    { n: '02', label: 'Academic calendar setup' },
    { n: '03', label: 'Faculty onboarding' },
    { n: '04', label: 'Student app integration' },
    { n: '05', label: 'Cohort analytics activation' },
];

const InstitutionsDeployment = () => (
    <section className="py-16 sm:py-24 bg-transparent">
        <div className="max-w-[1160px] mx-auto px-5 sm:px-8 flex flex-col items-center">
            <span className="text-[clamp(0.75rem,2vw,0.85rem)] self-start sm:self-auto sm:text-center w-full text-[#666] font-semibold tracking-widest uppercase mb-[clamp(1rem,3vw,1.5rem)] block">
                DEPLOYMENT
            </span>
            <h2 className="text-[clamp(1.9rem,5vw,3.25rem)] self-start sm:self-auto sm:text-center w-full font-medium font-[var(--font-space-var)] text-dark tracking-[-0.03em] leading-[1.1] mb-[clamp(1.5rem,6vw,1rem)]">
                Designed for medical colleges
            </h2>
            <div className="flex flex-wrap justify-center items-start gap-4 sm:gap-0 mt-12">
                {deploymentSteps.map(({ n, label }, i) => (
                    <React.Fragment key={n}>
                        <div className="flex flex-col items-center gap-3 min-w-[140px] text-center">
                            <div className="w-[54px] h-[54px] rounded-full bg-[#eb602d]/10 text-[#eb602d] text-[0.9rem] font-bold flex items-center justify-center tracking-[-0.02em] border-[1.5px] border-[#eb602d]/20">
                                {n}
                            </div>
                            <div className="text-[0.85rem] font-medium text-[#2e2e2e] leading-[1.4] max-w-[100px]">
                                {label}
                            </div>
                        </div>
                        {i < deploymentSteps.length - 1 && (
                            <div className="hidden sm:block text-[1.5rem] text-[#2e2e2e]/20 self-center mx-1 mb-10">→</div>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    </section>
);

export default InstitutionsDeployment;
