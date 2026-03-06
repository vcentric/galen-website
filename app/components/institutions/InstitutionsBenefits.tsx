import React from 'react';

const InstitutionsBenefits = () => (
    <section className="py-16 sm:py-24 bg-[#f6f4f1]">
        <div className="max-w-[1160px] mx-auto px-5 sm:px-8">
            <div className="text-[0.78rem] font-semibold tracking-widest uppercase text-[#eb602d] mb-4">Institution Benefits</div>
            <h2 className="text-[2rem] sm:text-[2.6rem] font-medium leading-[1.15] tracking-[-0.03em] text-[#2e2e2e] mb-5">What institutions gain</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
                {[
                    {
                        icon: '📈',
                        title: 'Continuous competency monitoring',
                        desc: 'Move from exam-based evaluation to ongoing competency tracking across the entire curriculum.',
                    },
                    {
                        icon: '🎯',
                        title: 'Teaching aligned with learning gaps',
                        desc: 'Faculty gain visibility into student learning gaps and adjust teaching accordingly.',
                    },
                    {
                        icon: '📋',
                        title: 'Accreditation-ready analytics',
                        desc: 'Generate insights for academic governance, curriculum evaluation, and accreditation reporting.',
                    },
                ].map(({ icon, title, desc }) => (
                    <div key={title} className="p-10 bg-white rounded-2xl border border-[#2e2e2e]/[0.06] shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
                        <div className="text-[2rem] mb-5">{icon}</div>
                        <h3 className="text-[1.05rem] font-semibold text-[#2e2e2e] mb-3">{title}</h3>
                        <p className="text-[0.9rem] leading-[1.65] text-[#2e2e2e]/60 m-0">{desc}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

export default InstitutionsBenefits;
