"use client";

import React from 'react';
import Hero from '@/app/components/Hero';
import NMCBanner from '@/app/components/institutions/NMCBanner';
import InstitutionsProblem from '@/app/components/institutions/InstitutionsProblem';
import InstitutionsPlatform from '@/app/components/institutions/InstitutionsPlatform';
import InstitutionsModules from '@/app/components/institutions/InstitutionsModules';
import InstitutionsOutcomes from '@/app/components/institutions/InstitutionsOutcomes';
import InstitutionsRoadmap from '@/app/components/institutions/InstitutionsRoadmap';

const InstitutionsPage = () => (
    <>
        <main className="overflow-x-hidden">
            <Hero audience="institutions" />
            <InstitutionsProblem />
            <InstitutionsPlatform />
            <InstitutionsModules />
            <InstitutionsOutcomes />
            <InstitutionsRoadmap />
        </main>
    </>
);

export default InstitutionsPage;
