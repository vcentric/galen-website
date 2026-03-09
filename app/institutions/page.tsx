"use client";

import React from 'react';
import Hero from '../components/Hero';
import NMCBanner from '../components/institutions/NMCBanner';
import InstitutionsProblem from '../components/institutions/InstitutionsProblem';
import InstitutionsPlatform from '../components/institutions/InstitutionsPlatform';
import InstitutionsModules from '../components/institutions/InstitutionsModules';
import InstitutionsDataFlow from '../components/institutions/InstitutionsDataFlow';
import InstitutionsOutcomes from '../components/institutions/InstitutionsOutcomes';

const InstitutionsPage = () => (
    <>
        <main className="overflow-x-hidden">
            <Hero audience="institutions" />
            <InstitutionsProblem />
            <InstitutionsPlatform />
            <InstitutionsModules />
            <InstitutionsDataFlow />
            <InstitutionsOutcomes />
 
        </main>
    </>
);

export default InstitutionsPage;
