"use client";
import React, { useEffect } from "react";

const TeamPage = () => {
  const handleMagneticHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const deltaX = e.clientX - (rect.left + rect.width / 2);
    const deltaY = e.clientY - (rect.top + rect.height / 2);
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const maxDistance = 20;
    if (distance < maxDistance) {
      const pull = (maxDistance - distance) / maxDistance;
      button.style.transform = `translate(${deltaX * pull * 0.3}px, ${deltaY * pull * 0.3}px)`;
    }
  };

  const handleMagneticLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.transform = "translate(0, 0)";
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target); // Run once per element
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px", // Trigger slightly before it comes into view
      }
    );

    const revealElements = document.querySelectorAll(".reveal");
    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const LinkedInIcon = ({ className }: { className?: string }) => (
    <svg className={`w-4 h-4 transition-transform duration-300 group-hover:scale-110 ${className || ""}`} viewBox="0 0 24 24" fill="currentColor">
      <path fill="currentColor" d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M18.5 18.5V13.2A3.26 3.26 0 0 0 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17A1.4 1.4 0 0 1 15.71 13.57V18.5H18.5M6.88 8.56A1.68 1.68 0 0 0 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19A1.69 1.69 0 0 0 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56M8.27 18.5V10.13H5.5V18.5H8.27Z" />
    </svg>
  );

  const founders = [
    {
      name: "Dr. Arun Biju",
      title: "COO & Medical Director",
      quote: '"Medical students deserve more than static lectures. Learning should feel like guidance."',
    },
    {
      name: "Varun Jagannathan",
      title: "CEO",
      quote: '"Building the systems, structure, and execution that make good ideas real."',
    },
  ];

  const advisors = [
    {
      name: "Sridhar Vaidyanathan",
      title: "Advisor, Finance & Investments",
      bio: "Ex-Investec, Ex-BNP Paribas, Ex-Myelin Foundry | 30+ years across banking, deep tech, capital and regulatory strategy across emerging markets.",
    },
    {
      name: "Dr. Sivaramakrishnan R Guruvayur",
      title: "Advisor - AI & Innovation",
      bio: "Global AI Policy Leader | Chief AI Scientist, Aaquarians.ai | Research Fellow, IIT Madras (CeRAI) | Member- MEG & UNESCO for Artificial Intelligence | 30+ years across applied AI & enterprise platforms.",
    },
  ];

  const timelineItems = [
    {
      title: 'The "Aha" Moment',
      date: "Mid 2025",
      description: "Dr. Arun realized textbooks hadn't changed, but exams had. He called Varun.",
      side: "right" as const,
      accent: "orange",
      icon: "M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6C7.8 12.16 7 10.63 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z",
    },
    {
      title: "Building the Prototype",
      date: "Late 2025",
      description: "Built the first AI Tutor. When it diagnosed a complex case simulation, the team knew they had something special.",
      side: "left" as const,
      accent: "dark",
      icon: "M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z",
    },
    {
      title: "The Tribe Grows",
      date: "Late 2025",
      description: "Brought in top rankers and senior engineers. A medical company at heart.",
      side: "right" as const,
      accent: "orange",
      icon: "M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z",
    },
    {
      title: "The Mission",
      date: "Today & Beyond",
      description: "Working to ensure every student gets personalized mentorship. Empowering the next generation of doctors.",
      side: "left" as const,
      accent: "dark",
      icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM9.29 16.29L5.7 12.7c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0L10 14.17l6.88-6.88c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41l-7.59 7.59c-.38.39-1.02.39-1.41 0z",
    },
  ];

  return (
    <div className="min-h-screen">

      {/* ── Hero ─────────────────────────────────── */}
      <section className="pt-32 pb-20 px-6 text-center">
        <div className="max-w-[780px] mx-auto">
          {/* Eyebrow */}
          <span className="inline-block mb-5 text-[0.75rem] font-primary font-semibold uppercase tracking-[0.12em] text-orange">
            The People
          </span>

          <h1 className="font-primary text-[clamp(2.2rem,6vw,3.5rem)] font-semibold text-dark leading-[1.1] tracking-[-0.03em] mb-5">
            Meet the Minds Behind GalenAI
          </h1>

          {/* Decorative rule */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-12 bg-orange/30" />
            <div className="w-1.5 h-1.5 rounded-full bg-orange" />
            <div className="h-px w-12 bg-orange/30" />
          </div>

          <p className="font-secondary text-[clamp(1rem,2.5vw,1.2rem)] text-dark/60 leading-[1.7] m-0">
            Built by medicos, engineers, and industry veterans.
          </p>
        </div>
      </section>

      <style jsx global>{`
        .reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reveal.active {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      {/* ── Founders ─────────────────────────────── */}
      <section className="py-16 px-6 bg-[linear-gradient(to_bottom,#ffffff,#fff0e4_20%,#fff0e4_80%,#ffffff)]">
        <div className="max-w-[1100px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[800px] mx-auto">
            {founders.map((founder, i) => (
              <div
                key={founder.name}
                className="group relative rounded-3xl overflow-hidden cursor-pointer outline-none focus-visible:ring-4 focus-visible:ring-orange/50"
                style={{ aspectRatio: "3/4" }}
                tabIndex={0}
              >
                {/* Full-bleed portrait photo */}
                <img
                  src={`https://images.unsplash.com/photo-${
                    i === 0
                      ? "1560250097-0b93528c311a?q=80&w=600&h=800&fit=crop"
                      : "1519085360753-af0119f7cbe7?q=80&w=600&h=800&fit=crop"
                  }`}
                  alt={founder.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-focus:scale-105 group-active:scale-105"
                />

                {/* Warm orange gradient overlay — transparent top → solid bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#eb602d]/40 via-transparent to-transparent pointer-events-none" />
                
                {/* Dark dim overlay on hover so text is readable */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 group-focus:opacity-100 group-active:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Content Container */}
                <div className="absolute bottom-0 left-0 right-0 p-7 flex flex-col justify-end z-10 pointer-events-none">
                  {/* Name + title */}
                  <div className="transform transition-transform duration-500 ease-out translate-y-2 group-hover:translate-y-0 group-focus:translate-y-0 group-active:translate-y-0">
                    <h2 className="font-primary text-white text-[1.6rem] font-bold leading-tight tracking-[-0.02em] mb-1 drop-shadow-sm group-hover:drop-shadow-none group-focus:drop-shadow-none group-active:drop-shadow-none">
                      {founder.name}
                    </h2>
                    <p className="font-primary text-white/80 text-[0.85rem] font-medium tracking-[0.04em] drop-shadow-sm group-hover:drop-shadow-none group-focus:drop-shadow-none group-active:drop-shadow-none group-hover:text-white group-focus:text-white group-active:text-white transition-colors duration-500">
                      {founder.title}
                    </p>
                  </div>

                  {/* Hidden Quote + LinkedIn */}
                  <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] group-focus:grid-rows-[1fr] group-active:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out">
                    <div className="overflow-hidden opacity-0 group-hover:opacity-100 group-focus:opacity-100 group-active:opacity-100 transition-opacity duration-500 delay-100 pointer-events-none group-hover:pointer-events-auto group-focus:pointer-events-auto group-active:pointer-events-auto">
                      <div className="pt-5 pb-1 flex flex-col gap-4">
                        <blockquote className="font-primary text-white/95 text-[0.85rem] font-medium leading-[1.4] tracking-[-0.01em]">
                          {founder.quote}
                        </blockquote>
                        <div className="flex justify-end w-full">
                          <a
                            href="#"
                            className="text-[#ffffff] opacity-80 hover:opacity-100 transition-all duration-300 transform hover:scale-110 outline-none focus-visible:ring-2 focus-visible:ring-white rounded-sm drop-shadow-sm pointer-events-none group-hover:pointer-events-auto"
                            aria-label={`${founder.name} LinkedIn`}
                          >
                            <LinkedInIcon className="w-6 h-6 text-[#ffffff]" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ── Divider ──────────────────────────────── */}
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-dark/10 to-transparent" />
      </div>

      {/* ── Strategic Advisors ──────────────────── */}
      <section className="py-16 px-6">
        <div className="max-w-[1100px] mx-auto">
          {/* Section header */}
          <div className="mb-12 text-center">
            <span className="inline-block mb-3 text-[0.75rem] font-primary font-semibold uppercase tracking-[0.12em] text-orange">
              Guidance
            </span>
            <h2 className="font-primary text-[clamp(1.6rem,4vw,2.2rem)] font-semibold text-dark tracking-[-0.025em]">
              Strategic Advisors
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[800px] mx-auto">
            {advisors.map((advisor, i) => (
              <div
                key={advisor.name}
                className="group relative rounded-3xl overflow-hidden cursor-pointer outline-none focus-visible:ring-4 focus-visible:ring-orange/50"
                style={{ aspectRatio: "3/4" }}
                tabIndex={0}
              >
                {/* Full-bleed photo */}
                <img
                  src={`https://images.unsplash.com/photo-${
                    i === 0
                      ? "1507003211169-0a1dd7228f2d?q=80&w=600&h=800&fit=crop"
                      : "1500648767791-00dcc994a43e?q=80&w=600&h=800&fit=crop"
                  }`}
                  alt={advisor.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-focus:scale-105 group-active:scale-105"
                />

                {/* Warm orange gradient overlay — transparent top → solid bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#eb602d]/40 via-transparent to-transparent pointer-events-none" />

                {/* Dark dim overlay on hover so text is readable */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 group-focus:opacity-100 group-active:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Content Container */}
                <div className="absolute bottom-0 left-0 right-0 p-7 flex flex-col justify-end z-10 pointer-events-none">
                  {/* Name + title */}
                  <div className="transform transition-transform duration-500 ease-out translate-y-2 group-hover:translate-y-0 group-focus:translate-y-0 group-active:translate-y-0">
                    <h3 className="font-primary text-white text-[1.25rem] font-bold leading-tight tracking-[-0.02em] mb-1 drop-shadow-sm group-hover:drop-shadow-none group-focus:drop-shadow-none group-active:drop-shadow-none">
                      {advisor.name}
                    </h3>
                    <p className="font-primary text-white/80 text-[0.8rem] font-semibold tracking-[0.06em] uppercase drop-shadow-sm group-hover:drop-shadow-none group-focus:drop-shadow-none group-active:drop-shadow-none group-hover:text-white group-focus:text-white group-active:text-white transition-colors duration-500">
                      {advisor.title}
                    </p>
                  </div>

                  {/* Hidden Bio */}
                  <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] group-focus:grid-rows-[1fr] group-active:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out">
                    <div className="overflow-hidden opacity-0 group-hover:opacity-100 group-focus:opacity-100 group-active:opacity-100 transition-opacity duration-500 delay-100 pointer-events-none group-hover:pointer-events-auto group-focus:pointer-events-auto group-active:pointer-events-auto">
                      <div className="pt-5 pb-1 flex flex-col gap-4">
                        <p className="font-primary text-white/95 text-[0.85rem] font-medium leading-[1.4] tracking-[-0.01em]">
                          {advisor.bio}
                        </p>
                        <div className="flex justify-end w-full">
                          <a
                            href="#"
                            className="text-[#ffffff] opacity-80 hover:opacity-100 transition-all duration-300 transform hover:scale-110 outline-none focus-visible:ring-2 focus-visible:ring-white rounded-sm drop-shadow-sm pointer-events-none group-hover:pointer-events-auto"
                            aria-label={`${advisor.name} LinkedIn`}
                          >
                            <LinkedInIcon className="w-6 h-6 text-[#ffffff]" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Custom Vertical Timeline ──────────────── */}
      <section className="py-24 px-6 bg-[linear-gradient(to_bottom,#ffffff,#fff0e4_20%,#fff0e4_80%,#ffffff)] relative overflow-hidden">
        <div className="max-w-[1000px] mx-auto relative z-10">
          
          {/* Header */}
          <div className="text-center mb-20">
            <span className="inline-block mb-3 text-[0.75rem] font-primary font-semibold uppercase tracking-[0.12em] text-orange">
              Our Story
            </span>
            <h2 className="font-primary text-[clamp(2rem,4vw,2.8rem)] font-semibold text-dark leading-tight tracking-[-0.03em] mb-4">
              How It All Started.
            </h2>
            <p className="font-secondary text-dark/60 leading-relaxed text-[1.05rem] max-w-[600px] mx-auto">
              From a simple realization that medical training wasn't evolving, to a fast-growing platform serving students nationwide. Here is our journey so far.
            </p>
          </div>

          {/* Timeline Container */}
          <div className="relative w-full pb-10">
            {/* The Central Line (hidden on mobile, centered on md+) */}
            <div className="absolute left-[24px] md:left-1/2 top-4 bottom-0 w-px bg-dark/10 transform md:-translate-x-1/2" />
            
            <div className="flex flex-col gap-12 md:gap-24">
              {timelineItems.map((item, index) => {
                const isEven = index % 2 === 0;
                return (
                  <div key={index} className="reveal relative flex flex-col md:flex-row items-center justify-between group">
                    
                    {/* Content Box (Left or Right) */}
                    <div className={`w-full md:w-[45%] pl-16 md:pl-0 ${isEven ? 'md:text-right md:pr-12' : 'md:order-3 md:pl-12'}`}>
                      <div className={`flex flex-col gap-1.5 mb-3 ${isEven ? 'md:items-end' : 'md:items-start'}`}>
                        <span className="inline-block bg-white px-3 py-1 rounded-full border border-black/5 shadow-sm font-primary text-[0.7rem] font-bold uppercase tracking-[0.1em] text-orange">
                          {item.date}
                        </span>
                        <h3 className="font-primary text-[1.4rem] font-bold text-dark tracking-[-0.01em]">
                          {item.title}
                        </h3>
                      </div>
                      <p className="font-secondary text-[1rem] text-dark/70 leading-[1.6]">
                        {item.description}
                      </p>
                    </div>

                    {/* Center Node / Icon */}
                    <div className={`absolute left-[0px] md:left-1/2 transform translate-x-[4px] md:-translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full border-[3px] bg-white transition-all duration-500 ease-out md:order-2 z-10 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(235,96,45,0.2)]
                                    ${item.accent === "orange" ? "border-orange text-orange" : "border-dark/10 text-dark/60 group-hover:border-orange/50 group-hover:text-orange"}`}>
                      <svg className="w-5 h-5 transition-transform duration-500 group-hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
                        <path d={item.icon} />
                      </svg>
                    </div>

                    {/* Empty Spacer for alternating layout */}
                    <div className={`hidden md:block w-[45%] ${isEven ? 'md:order-3' : 'md:order-1'}`} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TeamPage;
