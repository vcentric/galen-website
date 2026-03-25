import Image from "next/image";

interface Feature {
  title: string;
  marrow: boolean | string;
  chatgpt: boolean | string;
  openevidence: boolean | string;
  galen: boolean | string;
}

const Comparison = () => {
  const features: Feature[] = [
    { title: "Continuous AI Learning Companion", marrow: false, chatgpt: false, openevidence: false, galen: true },
    { title: "Competency-Aligned Learning System",  marrow: false, chatgpt: false, openevidence: false, galen: true },
    { title: "Verified & Curriculum-Aligned Intelligence", marrow: true, chatgpt: false, openevidence: true,  galen: true },  
    { title: "Adapts to How You Learn",               marrow: false, chatgpt: false, openevidence:false, galen: true },
    { title: "Tracks Your Learning Progress & Patterns", marrow: false, chatgpt: false, openevidence: false, galen: true },
    { title: "Integrated Learning (Tutor + Qbanks + Cases + Flashcards)", marrow: false, chatgpt: false, openevidence: false,  galen: true },  
    { title: "Accessible Pricing (Built for Students)",       marrow: false, chatgpt: false, openevidence: true,  galen: true },
    { title: "Built for Students, Faculty & Classrooms", marrow: false, chatgpt: false, openevidence: false, galen: true },
  ];

  const CheckIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <polyline points="3,10 8,15 17,5" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter"/>
    </svg>
  );

  const CrossIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <line x1="4" y1="4" x2="16" y2="16" stroke="#ef4444" strokeWidth="2" strokeLinecap="square"/>
      <line x1="16" y1="4" x2="4" y2="16" stroke="#ef4444" strokeWidth="2" strokeLinecap="square"/>
    </svg>
  );

  const LimitedIcon = () => (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200">
      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
      <span className="text-[10px] font-semibold text-amber-700 tracking-wide uppercase">Limited</span>
    </span>
  );

  const renderIcon = (hasFeature: boolean | string) => {
    if (hasFeature === true) return <CheckIcon />;
    if (hasFeature === "limited") return <LimitedIcon />;
    return <CrossIcon />;
  };



  return (
    <section className="py-[clamp(3.5rem,8vw,4rem)] px-[clamp(2rem,6vw,4rem)] bg-transparent" id="comparison">
      <div className="max-w-[1125px] mx-auto text-center">
        <div className="flex flex-col items-center">
          <span className="text-[clamp(0.75rem,2vw,0.85rem)] text-[#666] font-semibold tracking-widest uppercase mb-[clamp(1rem,3vw,1.5rem)]">
            COMPARISON
          </span>
          <h2 className="text-[clamp(1.9rem,5vw,3.25rem)] leading-[1.1] text-center font-sans font-medium text-[#222] tracking-[-0.03em] max-w-[1200px]">
            GalenAI &ndash; <span className="text-[#EB602D]">Your Best Choice</span> for<br className="hidden md:block" /> Medical Excellence &amp; Affordability
          </h2>
        </div>

        <div className="mt-12 bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden max-[900px]:overflow-x-auto">
          <table className="w-full border-collapse text-left max-[900px]:min-w-[850px]">
            <thead>
              <tr className="divide-x divide-[rgba(255,255,255,0.25)]">
                <th className="w-[30%] text-center p-[clamp(1.2rem,2vw,2rem)] align-middle bg-[#EB602D] border-r border-[rgba(255,255,255,0.25)]">
                  <span className="text-lg md:text-xl font-bold text-white tracking-tight">Features</span>
                </th>

                {/* Marrow */}
                <th className="w-[17.5%] text-center p-[clamp(1.2rem,2vw,2rem)] align-middle bg-[#EB602D] border-r border-[rgba(255,255,255,0.25)]">
                  <div className="flex flex-col items-center gap-2 h-full justify-center">
                    <Image src="/marrow.webp" alt="Marrow" width={80} height={40} className="h-6 md:h-7 w-auto object-contain" />
                    <span className="font-semibold text-white text-base">Traditional <br/> Ed-Tech</span>
                  </div>
                </th>

                {/* ChatGPT */}
                <th className="w-[17.5%] text-center p-[clamp(1.2rem,2vw,2rem)] align-middle bg-[#EB602D] border-r border-[rgba(255,255,255,0.25)]">
                  <div className="flex flex-col items-center gap-2 h-full justify-center">
                    <Image src="/chatgpt.webp" alt="ChatGPT" width={80} height={40} className="h-6 md:h-7 w-auto object-contain" />
                    <span className="font-semibold text-white text-base">Generic LLM</span>
                  </div>
                </th>

                {/* OpenEvidence */}
                <th className="w-[17.5%] text-center p-[clamp(1.2rem,2vw,2rem)] align-middle bg-[#EB602D] border-r border-[rgba(255,255,255,0.25)]">
                  <div className="flex flex-col items-center gap-2 h-full justify-center">
                    <Image src="/openevidence.webp" alt="OpenEvidence" width={80} height={40} className="h-6 md:h-7 w-auto object-contain" />
                    <span className="font-semibold text-white text-base">OpenEvidence</span>
                  </div>
                </th>

                {/* GalenAI — rightmost */}
                <th className="w-[17.5%] text-center p-[clamp(1.2rem,2vw,2rem)] align-middle bg-[#EB602D]">
                  <div className="flex flex-col items-center gap-2 h-full justify-center">
                    <Image src="/galenai-icon.webp" alt="GalenAI" width={80} height={40} className="h-7 md:h-9 w-auto object-contain" />
                    <span className="font-bold text-white text-base">GalenAI</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {features.map((feature, index) => {
                const isLast = index === features.length - 1;
                const borderClass = isLast ? "" : "border-b border-slate-100";

                return (
                  <tr key={index} className="group transition-colors duration-200 hover:bg-slate-50/50 divide-x divide-slate-100">
                    <td className={`p-[clamp(1.2rem,2vw,1.8rem)] text-center align-middle bg-white border-r border-slate-100 ${borderClass}`}>
                      <span className="font-medium text-slate-700 text-[0.95rem] md:text-[1.05rem]">{feature.title}</span>
                    </td>

                    <td className={`px-[clamp(1.2rem,2vw,2rem)] py-[clamp(1rem,2vw,1.5rem)] text-center align-middle bg-white ${borderClass}`}>
                      <div className="flex justify-center">{renderIcon(feature.marrow)}</div>
                    </td>

                    <td className={`px-[clamp(1.2rem,2vw,2rem)] py-[clamp(1rem,2vw,1.5rem)] text-center align-middle bg-white ${borderClass}`}>
                      <div className="flex justify-center">{renderIcon(feature.chatgpt)}</div>
                    </td>

                    <td className={`px-[clamp(1.2rem,2vw,2rem)] py-[clamp(1rem,2vw,1.5rem)] text-center align-middle bg-white ${borderClass}`}>
                      <div className="flex justify-center">{renderIcon(feature.openevidence)}</div>
                    </td>

                    <td className={`px-[clamp(1.2rem,2vw,2rem)] py-[clamp(1rem,2vw,1.5rem)] text-center align-middle bg-[rgba(235,96,45,0.06)] ${borderClass}`}>
                      <div className="flex justify-center">{renderIcon(feature.galen)}</div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Comparison;
