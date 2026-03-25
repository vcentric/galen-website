import React, { useState } from 'react';
import Image from 'next/image';

const platformLayers = [
    {
        layer: '01',
        title: 'Institution Governance Layer',
        desc: 'Cohort analytics, competency tracking, and academic oversight for institutional decision-making.',
        color: '#eb602d',
        image: '/Institutional Layer.webp',
    },
    {
        layer: '02',
        title: 'Teaching Layer',
        desc: 'AI-powered tools for lesson planning, content creation, assessments, and competency-aligned teaching workflows.',
        color: '#2e2e2e',
        image: '/Teaching Layer.webp',
    },
    {
        layer: '03',
        title: 'Student Learning Layer',
        desc: 'An AI learning companion that helps students build understanding through reasoning, practice, and continuous feedback.',
        color: '#5a7fc9',
        image: '/Student Layer.webp',
    },
];

const InstitutionsPlatform = () => {
    const [activeLayer, setActiveLayer] = useState(0);

    return (
        <section className="py-8 sm:py-16 bg-transparent" id="overview">
            <div className="max-w-[1240px] mx-auto px-[clamp(2rem,6vw,4rem)]">
                <span className="text-[clamp(0.75rem,2vw,0.85rem)] text-[#666] font-semibold tracking-widest uppercase mb-[clamp(1rem,3vw,1.5rem)] block text-left">
                    THE SOLUTION
                </span>
                <h2 className="text-[clamp(1.9rem,5vw,3.25rem)] font-medium font-[var(--font-space-var)] text-dark tracking-[-0.03em] leading-[1.1] mb-[clamp(1.5rem,6vw,2.5rem)]">
                    One <span className="text-orange">Connected</span> Medical Education LMS
                </h2>
                <p className="text-[1rem] sm:text-[1.15rem] leading-[1.65] text-gray-500 max-w-[640px] mb-8">
                    GalenAI connects students, faculty, and institutions through a single
                    intelligent learning infrastructure.
                </p>

                <div className="flex flex-col gap-10 w-full">
                    {/* Layers as horizontal tabs/tiles */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                        {platformLayers.map(({ layer, title, desc, color }, index) => (
                            <div
                                key={layer}
                                onMouseEnter={() => setActiveLayer(index)}
                                className={`group flex flex-col gap-4 py-8 px-8 rounded-2xl relative overflow-hidden transition-all duration-300 cursor-pointer border ${activeLayer === index ? 'border-transparent shadow-lg' : 'border-[#2e2e2e]/[0.06] bg-white hover:border-orange/20'}`}
                            >
                                <div 
                                    className={`absolute inset-0 z-0 origin-left transition-transform duration-500 ease-out ${activeLayer === index ? 'scale-x-100' : 'scale-x-0'}`}
                                    style={{ backgroundColor: color }}
                                />
                                
                                <div className={`relative z-10 text-[1.4rem] font-bold transition-colors duration-500 tracking-[-0.04em] ${activeLayer === index ? 'text-white/20' : 'text-[#2e2e2e]/[0.08]'}`}>
                                    {layer}
                                </div>
                                <div className="relative z-10">
                                    <h3 className={`text-[1.05rem] font-semibold transition-colors duration-500 mb-2 ${activeLayer === index ? 'text-white' : 'text-[#2e2e2e]'}`}>
                                        {title}
                                    </h3>
                                    <p className={`text-[0.85rem] leading-[1.5] transition-colors duration-500 m-0 ${activeLayer === index ? 'text-white/80' : 'text-[#2e2e2e]/55'}`}>
                                        {desc}
                                    </p>
                                </div>
                                
                                {activeLayer === index && (
                                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20" />
                                )}
                            </div>
                        ))}
                    </div>
                    
                    {/* Full-width Image Card below */}
                    <div className="w-full max-w-[1100px] mx-auto">
                        <div className="relative w-full aspect-[2940/1598] rounded-xl overflow-hidden border border-black/[0.06] bg-white shadow-2xl">
                            {platformLayers.map((layer, index) => (
                                <div
                                    key={layer.layer}
                                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${activeLayer === index ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                                >
                                    <Image
                                        src={layer.image}
                                        alt={layer.title}
                                        fill
                                        className="object-contain"
                                        sizes="(max-w-1240px) 100vw, 1100px"
                                        priority={index === 0}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default InstitutionsPlatform;
