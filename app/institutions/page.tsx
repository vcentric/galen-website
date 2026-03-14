"use client";

import React from 'react';
import Hero from '../components/Hero';
import NMCBanner from '../components/institutions/NMCBanner';
import InstitutionsProblem from '../components/institutions/InstitutionsProblem';
import InstitutionsPlatform from '../components/institutions/InstitutionsPlatform';
import InstitutionsModules from '../components/institutions/InstitutionsModules';
import InstitutionsOutcomes from '../components/institutions/InstitutionsOutcomes';
import InstitutionsRoadmap from '../components/institutions/InstitutionsRoadmap';

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
