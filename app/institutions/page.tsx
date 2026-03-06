"use client";

import React from 'react';
import Hero from '../components/Hero';
import NMCBanner from '../components/institutions/NMCBanner';
import InstitutionsProblem from '../components/institutions/InstitutionsProblem';
import InstitutionsPlatform from '../components/institutions/InstitutionsPlatform';
import InstitutionsModules from '../components/institutions/InstitutionsModules';
import InstitutionsDataFlow from '../components/institutions/InstitutionsDataFlow';
import InstitutionsBenefits from '../components/institutions/InstitutionsBenefits';
import InstitutionsDeployment from '../components/institutions/InstitutionsDeployment';
import InstitutionsCTA from '../components/institutions/InstitutionsCTA';

const InstitutionsPage = () => (
    <>
        <main className="overflow-x-hidden">
            <Hero audience="institutions" />
            <InstitutionsProblem />
            <InstitutionsPlatform />
            <InstitutionsModules />
            <InstitutionsDataFlow />
            <InstitutionsBenefits />
            <InstitutionsDeployment />
            <InstitutionsCTA />
        </main>
    </>
);

export default InstitutionsPage;
