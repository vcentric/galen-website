import Image from "next/image";

interface Feature {
  title: string;
  legacy: boolean | string;
  generic: boolean | string;
  openevidence: boolean | string;
  galen: boolean | string;
}

const Comparison = () => {
  const features: Feature[] = [
    { title: "Daily personalised learning companion", legacy: false, generic: false, openevidence: false, galen: true },
    { title: "Competency‑based continuous learning", legacy: false, generic: false, openevidence: false, galen: true },
    { title: "Verified sources & curriculum alignment", legacy: false, generic: false, openevidence: true, galen: true },
    { title: "Medical‑only trained AI", legacy: false, generic: false, openevidence: "limited", galen: true },
    { title: "Adaptive practice (MCQs, flashcards & cases)", legacy: false, generic: false, openevidence: false, galen: true },
    { title: "Affordability (under ₹20k/year)", legacy: false, generic: false, openevidence: true, galen: true },
    { title: "Ecosystem‑friendly (supports faculty & classrooms)", legacy: false, generic: false, openevidence: false, galen: true },
  ];

  const renderIcon = (hasFeature: boolean | string) => {
    if (hasFeature === true) {
      return <span className="text-[#34A853] font-bold text-[1.25rem] md:text-[1.5rem] leading-none">✓</span>;
    } else if (hasFeature === "limited") {
      return <span className="text-[#EA4335] font-bold text-[1.25rem] md:text-[1.5rem] leading-none opacity-80">✗</span>;
    }
    return <span className="text-[#EA4335] font-bold text-[1.25rem] md:text-[1.5rem] leading-none opacity-80">✗</span>;
  };

  return (
    <section className="py-[clamp(3.5rem,8vw,5rem)] px-[clamp(1.5rem,5vw,2rem)] bg-transparent" id="comparison">
      <div className="max-w-[1150px] mx-auto text-center px-[clamp(1rem,4vw,1.5rem)]">
        <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-bold text-[#1a1a1a] mb-[clamp(0.5rem,2vw,1rem)] tracking-[-0.03em] leading-tight">
          GalenAI &ndash; <span className="text-orange">Your Best Choice</span> for <br className="hidden md:block" />
          Medical Excellence & Affordability
        </h2>
        
        <div className="mt-12 bg-white rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden max-[900px]:overflow-x-auto">
          <table className="w-full border-collapse text-left max-[900px]:min-w-[850px]">
            <thead>
              <tr>
                <th className="w-[30%] text-left p-[clamp(1.2rem,2vw,2rem)] border-b border-slate-100 align-bottom bg-white">
                  <span className="text-lg md:text-xl font-bold text-slate-800 tracking-tight">Features</span>
                </th>
                
                {/* GalenAI (Highlighted 1st option) */}
                <th className="w-[17.5%] text-left p-[clamp(1.2rem,2vw,2rem)] border-b border-slate-100 align-bottom bg-[rgba(235,96,45,0.06)]">
                  <div className="flex flex-col items-start gap-3 h-full justify-end">
                    <Image src="/galenai-icon.png" alt="GalenAI" width={80} height={40} className="h-8 md:h-10 w-auto object-contain" />
                    <span className="font-bold text-[#1a1a1a] text-lg">GalenAI</span>
                  </div>
                </th>

                {/* OpenEvidence */}
                <th className="w-[17.5%] text-left p-[clamp(1.2rem,2vw,2rem)] border-b border-slate-100 align-bottom bg-white">
                  <div className="flex flex-col items-start gap-3 h-full justify-end">
                    <Image src="/openevidence.png" alt="OpenEvidence" width={80} height={40} className="h-6 md:h-8 w-auto object-contain opacity-90" />
                    <span className="font-bold text-slate-800 text-lg">OpenEvidence</span>
                  </div>
                </th>

                {/* Traditional Apps */}
                <th className="w-[17.5%] text-left p-[clamp(1.2rem,2vw,2rem)] border-b border-slate-100 align-bottom bg-white">
                  <div className="flex flex-col items-start gap-3 h-full justify-end">
                    <Image src="/traditional.png" alt="Traditional Books" width={80} height={40} className="h-6 md:h-8 w-auto object-contain opacity-90" />
                    <span className="font-bold text-slate-800 text-lg leading-tight w-min md:w-auto">Traditional Apps</span>
                  </div>
                </th>

                {/* Generic AI */}
                <th className="w-[17.5%] text-left p-[clamp(1.2rem,2vw,2rem)] border-b border-slate-100 align-bottom bg-white">
                  <div className="flex flex-col items-start gap-3 h-full justify-end">
                    <Image src="/genericai.png" alt="Generic AI" width={80} height={40} className="h-6 md:h-8 w-auto object-contain opacity-90" />
                    <span className="font-bold text-slate-800 text-lg">Generic AI</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {features.map((feature, index) => {
                const isLast = index === features.length - 1;
                const borderClass = isLast ? "" : "border-b border-slate-100";
                
                return (
                  <tr key={index} className="group transition-colors duration-200 hover:bg-slate-50/50">
                    <td className={`p-[clamp(1.2rem,2vw,1.8rem)] align-middle bg-white ${borderClass}`}>
                      <span className="font-medium text-slate-700 text-[0.95rem] md:text-[1.05rem]">{feature.title}</span>
                    </td>
                    
                    <td className={`px-[clamp(1.2rem,2vw,2rem)] py-[clamp(1rem,2vw,1.5rem)] align-middle bg-[rgba(235,96,45,0.06)] ${borderClass}`}>
                      {renderIcon(feature.galen)}
                    </td>

                    <td className={`px-[clamp(1.2rem,2vw,2rem)] py-[clamp(1rem,2vw,1.5rem)] align-middle bg-white ${borderClass}`}>
                      {feature.openevidence === "limited" ? (
                         <span className="text-[#EA4335] font-bold text-[1.25rem] md:text-[1.5rem] leading-none opacity-80">✗</span>
                      ) : (
                         renderIcon(feature.openevidence)
                      )}
                    </td>

                    <td className={`px-[clamp(1.2rem,2vw,2rem)] py-[clamp(1rem,2vw,1.5rem)] align-middle bg-white ${borderClass}`}>
                      {renderIcon(feature.legacy)}
                    </td>

                    <td className={`px-[clamp(1.2rem,2vw,2rem)] py-[clamp(1rem,2vw,1.5rem)] align-middle bg-white ${borderClass}`}>
                      {renderIcon(feature.generic)}
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
