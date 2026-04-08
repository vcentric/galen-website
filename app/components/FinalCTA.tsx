"use client";

import React from "react";
import { PrimaryButton } from "./PrimaryButton";

export const FinalCTA = () => {
  return (
    <section className="w-full py-12 px-[clamp(2rem,6vw,4rem)] bg-transparent">
      <div className="max-w-[1100px] mx-auto text-center flex flex-col items-center">
        
        {/* Refined Heading */}
        <h2 className="text-[clamp(2.2rem,6vw,4rem)] font-medium font-[var(--font-space-var)] text-[var(--color-dark)] tracking-[-0.04em] leading-[1.1] mb-6">
          Ready To <span className="text-[var(--color-orange)]">Redefine</span> Your <br className="hidden sm:block" /> <span className="text-[var(--color-orange)] italic">Medical Learning?</span>
        </h2>

        {/* Minimal Subtext */}
        <p className="text-[clamp(0.85rem,1.2vw,1rem)] text-[var(--color-text-muted)] font-medium font-[var(--font-raleway-var)] max-w-[750px] mb-8 leading-relaxed opacity-70">
          GalenAI brings together clinical reasoning, curriculum-wide guidance, and smart support 
          in one simple platform designed for the modern medical student.
        </p>

        {/* Hero-style Primary Button */}
        <div className="flex justify-center w-full md:w-auto">
          <PrimaryButton href="/qr" text="Try GalenAI Today" />
        </div>

      </div>
    </section>
  );
};

export default FinalCTA;
