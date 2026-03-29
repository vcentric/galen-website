import { 
    PresentationChartLineIcon, 
    AcademicCapIcon, 
    ClipboardDocumentCheckIcon,
    Square3Stack3DIcon,
    BriefcaseIcon
} from '@heroicons/react/24/outline';

const benefits = [
    {
        icon: PresentationChartLineIcon,
        title: 'Continuous competency tracking',
        desc: 'Move beyond exam-based evaluation to continuous, curriculum-wide visibility into student competency and progress.',
    },
    {
        icon: ClipboardDocumentCheckIcon,
        title: 'Faster, more effective teaching preparation',
        desc: 'Reduce the time and effort required to prepare classes while improving the quality and consistency of teaching delivery.',
    },
    {
        icon: Square3Stack3DIcon,
        title: 'Accreditation-ready academic insights',
        desc: 'Gain structured visibility into curriculum coverage, student performance, and institutional outcomes for accreditation and governance.',
    },
    {
        icon: BriefcaseIcon,
        title: 'Streamlined academic operations',
        desc: 'Ensure smoother coordination across scheduling, faculty, and academic workflows, reducing operational friction across departments.',
    },
];

const InstitutionsOutcomes = () => (
    <section className="py-16 sm:py-24 bg-[linear-gradient(to_bottom,#ffffff,#fcfaf8_20%,#fcfaf8_80%,#ffffff)]" id="outcomes">
        <div className="max-w-[1240px] mx-auto px-[clamp(2rem,6vw,4rem)]">
            
            {/* Strategic Impact Section (Full Width, 2x2 Grid) */}
            <div className="text-center md:text-left mb-12 sm:mb-16">
                <span className="text-[clamp(0.75rem,2vw,0.85rem)] text-[#666] font-semibold tracking-widest uppercase mb-4 block">
                    THE STRATEGIC IMPACT
                </span>
                <h2 className="text-[clamp(1.65rem,5vw,3.25rem)] font-medium font-[var(--font-space-var)] text-dark tracking-[-0.03em] leading-[1.1]">
                    What institutions gain <br className="hidden md:block" /> with 
                    <span className="text-[#eb602d] relative inline-block ml-2 pb-1.5">
                        GalenAI
                        <svg
                            viewBox="0 0 100 10"
                            className="absolute left-0 bottom-[-4px] w-full h-[8px] pointer-events-none"
                            preserveAspectRatio="none"
                        >
                            <path
                                d="M2 5 Q 50 10 98 5"
                                stroke="currentColor"
                                strokeWidth="3"
                                fill="none"
                                strokeLinecap="round"
                            />
                        </svg>
                    </span>
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-16 gap-y-12">
                {benefits.map(({ icon: Icon, title, desc }, index) => (
                    <div 
                        key={title} 
                        className={`group flex items-start gap-6 border-l-[2px] border-gray-100/50 hover:border-orange/40 pl-6 transition-all duration-300 ${index === 4 ? 'md:col-span-2 md:max-w-[600px] md:mx-auto' : ''}`}
                    >
                        <div className="shrink-0 mt-1">
                            <Icon className="w-7 h-7 text-dark/60 group-hover:text-orange transition-colors duration-300" strokeWidth={1.5} />
                        </div>
                        <div>
                            <h3 className="text-[1.25rem] sm:text-[1.5rem] font-bold text-[#222] mb-2 tracking-tight group-hover:text-orange transition-colors">
                                {title}
                            </h3>
                            <p className="text-[0.95rem] leading-[1.6] text-[#555] m-0">
                                {desc}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    </section>
);

export default InstitutionsOutcomes;
