import React from 'react';
import { PrimaryButton } from '../PrimaryButton';

const InstitutionsCTA = () => (
    <section className="py-24 px-5 sm:px-8 bg-transparent relative overflow-hidden" id="contact">
        <div className="absolute w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(235,96,45,0.06)_0%,transparent_70%)] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="max-w-[1160px] mx-auto text-center flex flex-col items-center relative z-10">
            <div className="inline-block bg-[#eb602d]/10 text-[#eb602d] text-[0.78rem] font-semibold tracking-wide uppercase px-3 py-1.5 rounded-full mb-7">Partnership</div>
            <h2 className="text-[2rem] sm:text-[2.75rem] font-medium tracking-[-0.03em] text-[#2e2e2e] mx-auto mb-5 max-w-[600px] leading-[1.15]">
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
