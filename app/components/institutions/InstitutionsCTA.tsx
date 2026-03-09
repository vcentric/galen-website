import React from 'react';
import { PrimaryButton } from '../PrimaryButton';

const InstitutionsCTA = () => (
    <section className="py-24 px-5 sm:px-8 bg-transparent relative overflow-hidden" id="contact">
        <div className="absolute w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(235,96,45,0.08)_0%,transparent_70%)] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="max-w-[1160px] mx-auto text-center flex flex-col items-center relative z-10">
            <span className="text-[clamp(0.75rem,2vw,0.85rem)] text-[#666] font-semibold tracking-widest uppercase mb-[clamp(1rem,3vw,1.5rem)] block text-center">
                PARTNERSHIP
            </span>
            <h2 className="text-[clamp(1.9rem,5vw,3.25rem)] font-medium font-[var(--font-space-var)] text-dark tracking-[-0.03em] leading-[1.1] mx-auto mb-[clamp(1.5rem,6vw,1rem)] max-w-[600px] text-center">
                Partner with GalenAI to modernise medical education
            </h2>
            <p className="text-[1.1rem] leading-[1.65] text-[#2e2e2e]/60 max-w-[520px] mx-auto mb-11">
                We collaborate with forward-looking medical colleges to deploy the
                GalenAI Medical Education Operating System and enable
                competency-driven learning.
            </p>
            <PrimaryButton href="mailto:institutions@galenai.io" text="Request Institutional Demo" />
        </div>
    </section>
);

export default InstitutionsCTA;
