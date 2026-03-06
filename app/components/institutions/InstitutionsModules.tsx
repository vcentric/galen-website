import React from 'react';
import DashboardPlaceholder from './DashboardPlaceholder';

const modules = [
    {
        title: 'Cohort Analytics Engine',
        desc: 'Track competency progression across entire batches using real-time learning data generated from student learning activity.',
        features: [
            'Competency heatmaps',
            'Subject performance analytics',
            'Mastery trajectory tracking',
            "Miller's pyramid filtering",
        ],
        label: 'Analytics Dashboard',
    },
    {
        title: 'AI-Powered Lesson Planning',
        desc: 'Faculty can align teaching sessions with competencies while receiving insights on cohort learning gaps and recommended teaching formats.',
        features: [
            'Competency-linked lesson planning',
            'Teaching insight suggestions',
            'Weak topic identification',
            'Session-level analytics',
        ],
        label: 'Faculty Interface',
        flip: true,
    },
    {
        title: 'Faculty AI Content Engine',
        desc: 'Faculty can upload lecture material and automatically generate assessments mapped to curriculum competencies.',
        features: [
            'MCQ generation',
            'Clinical case generation',
            'Short-answer question creation',
            'Competency-mapped assessments',
        ],
        label: 'Assessment Generator',
    },
    {
        title: 'Academic Workflow Automation',
        desc: 'Simplify academic coordination with scheduling tools, faculty assignment workflows, and institutional calendar management.',
        features: [
            'Academic calendar automation',
            'Session scheduling',
            'Faculty assignment',
            'Department coordination',
        ],
        label: 'Calendar System',
        flip: true,
    },
    {
        title: 'Predictive Insights Engine',
        desc: 'Identify competency risks early using longitudinal learning data and predictive intelligence.',
        features: [
            'Early competency alerts',
            'Batch-level trend analysis',
            'Subject-level learning insights',
            'Performance forecasting',
        ],
        label: 'Alert Dashboard',
    },
];

const InstitutionsModules = () => (
    <section className="py-16 sm:py-24 bg-white" id="features">
        <div className="max-w-[1160px] mx-auto px-5 sm:px-8">
            <div className="text-[0.78rem] font-semibold tracking-widest uppercase text-[#eb602d] mb-4">System Modules</div>
            <h2 className="text-[2rem] sm:text-[2.6rem] font-medium leading-[1.15] tracking-[-0.03em] text-[#2e2e2e] mb-12">Everything your institution needs</h2>
            {modules.map(({ title, desc, features, label, flip }, index) => (
                <div key={title} className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center py-12 lg:py-16 ${index !== modules.length - 1 ? 'border-b border-[#2e2e2e]/[0.06]' : ''}`}>
                    <div className={`${flip ? 'lg:order-2' : ''}`}>
                        <h3 className="text-[1.75rem] font-medium tracking-[-0.025em] text-[#2e2e2e] mb-4">{title}</h3>
                        <p className="text-[1rem] leading-[1.7] text-[#2e2e2e]/60 mb-7">{desc}</p>
                        <ul className="flex flex-col gap-2.5 m-0 p-0 list-none">
                            {features.map((f) => (
                                <li key={f} className="text-[0.9rem] text-[#2e2e2e]/70 flex items-center gap-2.5">
                                    <span className="text-[#eb602d] font-bold text-[0.85rem]">✓</span> {f}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className={`flex justify-center flex-1 w-full ${flip ? 'lg:order-1' : ''}`}>
                        <DashboardPlaceholder label={label} />
                    </div>
                </div>
            ))}
        </div>
    </section>
);

export default InstitutionsModules;
