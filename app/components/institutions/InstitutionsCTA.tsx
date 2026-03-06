import React from 'react';

const InstitutionsCTA = () => (
    <section className="py-24 px-5 sm:px-8 bg-gradient-to-br from-[#faf8f5] to-[#f0ece6] relative overflow-hidden" id="contact">
        <div className="absolute w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(235,96,45,0.06)_0%,transparent_70%)] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="max-w-[1160px] mx-auto text-center relative z-10">
            <div className="inline-block bg-[#eb602d]/10 text-[#eb602d] text-[0.78rem] font-semibold tracking-wide uppercase px-3 py-1.5 rounded-full mb-7">Partnership</div>
            <h2 className="text-[2rem] sm:text-[2.75rem] font-medium tracking-[-0.03em] text-[#2e2e2e] mx-auto mb-5 max-w-[600px] leading-[1.15]">
                Partner with GalenAI to modernise medical education
            </h2>
            <p className="text-[1.1rem] leading-[1.65] text-[#2e2e2e]/60 max-w-[520px] mx-auto mb-11">
                We collaborate with forward-looking medical colleges to deploy the
                GalenAI Medical Education Operating System and enable
                competency-driven learning.
            </p>
            <a href="mailto:institutions@galenai.io" className="inline-block px-10 py-4 bg-[#eb602d] text-white rounded-2xl text-[1.05rem] font-medium transition-all hover:brightness-110 hover:-translate-y-px">
                Request Institutional Demo
            </a>
        </div>
    </section>
);

export default InstitutionsCTA;
