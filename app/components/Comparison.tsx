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
      return <span className="text-[#34A853] font-bold text-[1.75rem] leading-none">✓</span>;
    } else if (hasFeature === "limited") {
      return <span className="text-orange font-semibold text-[0.8rem] uppercase tracking-[0.05em]">Limited</span>;
    }
    return <span className="text-[#EA4335] font-bold text-[1.75rem] leading-none">✗</span>;
  };

  return (
    <section className="py-20 px-8 bg-transparent max-[700px]:py-14 max-[700px]:px-6" id="comparison">
      <div className="max-w-[1150px] mx-auto text-center px-6">
        <h2 className="text-[2.75rem] font-bold text-[#1a1a1a] mb-2 tracking-[-0.03em] max-[900px]:text-[2rem] max-[700px]:text-[1.75rem]">
          GalenAI builds confidence in medicine
        </h2>
        <p className="text-[1.15rem] text-orange font-medium mb-14 tracking-[0.01em] max-[700px]:text-base">
          unlike Legacy Apps or Generic AI Tools
        </p>

        {/* Column Labels Row - hidden since logos are used */}
        <div className="hidden">
          <div></div>
          <div>Traditional Learning Apps</div>
          <div>Generic AI</div>
          <div>Clinical Decision Tools</div>
          <div></div>
        </div>

        <div className="bg-white rounded-[1.5rem] overflow-hidden shadow-[0_20px_40px_-10px_rgba(0,0,0,0.06),0_0_1px_0_rgba(0,0,0,0.1)] max-[700px]:overflow-x-auto">
          <table className="w-full border-collapse border-separate border-spacing-0 max-[700px]:min-w-[600px]">
            <thead>
              <tr>
                <th className="w-[35%] text-left p-8 border-b border-[rgba(0,0,0,0.08)] align-middle bg-white max-[900px]:p-5 max-[700px]:p-4"></th>
                <th className="w-[16.25%] text-center p-8 border-b border-[rgba(0,0,0,0.08)] align-middle bg-white max-[900px]:py-5 max-[900px]:px-3 max-[700px]:py-4 max-[700px]:px-2">
                  <div className="flex items-center justify-center h-20 w-full">
                    <Image src="/traditional.png" alt="Traditional Learning Apps" width={100} height={60} className="h-auto w-auto max-h-[60px] max-w-full object-contain transition-transform duration-200 hover:scale-105 opacity-90 max-[1100px]:h-7 max-[1100px]:max-w-[100px] max-[900px]:h-6" />
                  </div>
                </th>
                <th className="w-[16.25%] text-center p-8 border-b border-[rgba(0,0,0,0.08)] align-middle bg-white max-[900px]:py-5 max-[900px]:px-3 max-[700px]:py-4 max-[700px]:px-2">
                  <div className="flex items-center justify-center h-20 w-full">
                    <Image src="/genericai.png" alt="Generic AI" width={100} height={60} className="h-auto w-auto max-h-[60px] max-w-full object-contain transition-transform duration-200 hover:scale-105 opacity-90 max-[1100px]:h-7 max-[1100px]:max-w-[100px] max-[900px]:h-6" />
                  </div>
                </th>
                <th className="w-[16.25%] text-center p-8 border-b border-[rgba(0,0,0,0.08)] align-middle bg-white max-[900px]:py-5 max-[900px]:px-3 max-[700px]:py-4 max-[700px]:px-2">
                  <div className="flex items-center justify-center h-20 w-full">
                    <Image src="/openevidence.png" alt="OpenEvidence" width={100} height={60} className="h-auto w-auto max-h-[60px] max-w-full object-contain transition-transform duration-200 hover:scale-105 opacity-90 max-[1100px]:h-7 max-[1100px]:max-w-[100px] max-[900px]:h-6" />
                  </div>
                </th>
                <th className="w-[16.25%] text-center p-8 border-b border-[rgba(0,0,0,0.08)] align-middle bg-[rgba(235,96,45,0.03)] max-[900px]:py-5 max-[900px]:px-3 max-[700px]:py-4 max-[700px]:px-2">
                  <div className="flex items-center justify-center h-20 w-full">
                    <Image src="/galenai-icon.png" alt="GalenAI" width={100} height={70} className="h-auto w-auto max-h-[70px] max-w-full object-contain transition-transform duration-200 hover:scale-105 max-[1100px]:h-9 max-[900px]:h-8" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {features.map((feature, index) => (
                <tr key={index} className="group transition-colors duration-200 hover:bg-[rgba(0,0,0,0.005)]">
                  <td className={`text-left font-semibold text-[#1a1a1a] text-base pl-8 pr-4 py-[1.35rem] align-middle tracking-[-0.01em] border-b border-[rgba(0,0,0,0.04)] max-[1100px]:text-[0.9rem] max-[1100px]:pl-5 max-[900px]:text-[0.85rem] max-[900px]:pl-4 max-[700px]:text-[0.8rem] max-[700px]:pl-3 ${index === features.length - 1 ? "border-b-0" : ""}`}>
                    {feature.title}
                  </td>
                  <td className={`text-center text-[0.95rem] py-[1.35rem] px-4 align-middle border-b border-[rgba(0,0,0,0.04)] max-[900px]:py-4 max-[900px]:px-3 max-[700px]:py-[0.875rem] max-[700px]:px-2 ${index === features.length - 1 ? "border-b-0" : ""}`}>
                    {renderIcon(feature.legacy)}
                  </td>
                  <td className={`text-center text-[0.95rem] py-[1.35rem] px-4 align-middle border-b border-[rgba(0,0,0,0.04)] max-[900px]:py-4 max-[900px]:px-3 max-[700px]:py-[0.875rem] max-[700px]:px-2 ${index === features.length - 1 ? "border-b-0" : ""}`}>
                    {renderIcon(feature.generic)}
                  </td>
                  <td className={`text-center text-[0.95rem] py-[1.35rem] px-4 align-middle border-b border-[rgba(0,0,0,0.04)] max-[900px]:py-4 max-[900px]:px-3 max-[700px]:py-[0.875rem] max-[700px]:px-2 ${index === features.length - 1 ? "border-b-0" : ""}`}>
                    {renderIcon(feature.openevidence)}
                  </td>
                  <td className={`text-center text-[0.95rem] py-[1.35rem] px-4 align-middle border-b border-[rgba(0,0,0,0.04)] bg-[rgba(235,96,45,0.03)] font-semibold max-[900px]:py-4 max-[900px]:px-3 max-[700px]:py-[0.875rem] max-[700px]:px-2 ${index === features.length - 1 ? "border-b-0" : ""}`}>
                    {renderIcon(feature.galen)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Comparison;
