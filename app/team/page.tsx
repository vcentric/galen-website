"use client";

import { useEffect, useRef, useState } from "react";

const TeamPage = () => {
  const timelineRef = useRef<HTMLElement>(null);
  const timelineLineRef = useRef<HTMLDivElement>(null);
  const [timelineProgress, setTimelineProgress] = useState(0);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: "0px 0px -100px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("!opacity-100", "!translate-x-0", "!translate-y-0");
        }
      });
    }, observerOptions);

    const timelineItems = document.querySelectorAll(".timeline-item");
    timelineItems.forEach((item) => observer.observe(item));

    const handleScroll = () => {
      if (timelineRef.current && timelineLineRef.current) {
        const rect = timelineRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const sectionTop = rect.top;
        const sectionHeight = rect.height;
        const visibleStart = Math.max(0, windowHeight - sectionTop);
        const visibleAmount = Math.min(visibleStart, sectionHeight);
        const progress = Math.max(0, Math.min(100, (visibleAmount / sectionHeight) * 100));
        setTimelineProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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

  const LinkedInIcon = () => (
    <svg className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M18.5 18.5V13.2A3.26 3.26 0 0 0 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17A1.4 1.4 0 0 1 15.71 13.57V18.5H18.5M6.88 8.56A1.68 1.68 0 0 0 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19A1.69 1.69 0 0 0 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56M8.27 18.5V10.13H5.5V18.5H8.27Z" />
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

      {/* ── Founders ─────────────────────────────── */}
      <section className="py-16 px-6">
        <div className="max-w-[1100px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {founders.map((founder) => (
              <div
                key={founder.name}
                className="group bg-white rounded-3xl p-10 text-center border border-black/5
                           shadow-[0_2px_20px_rgba(0,0,0,0.04)]
                           hover:shadow-[0_12px_40px_rgba(235,96,45,0.12)]
                           hover:-translate-y-1 transition-all duration-500"
              >
                {/* Avatar */}
                <div className="w-28 h-28 mx-auto mb-6 rounded-full overflow-hidden border-4 border-light shadow-md animate-[float_3s_ease-in-out_infinite] group-hover:shadow-[0_10px_30px_rgba(235,96,45,0.2)] transition-shadow duration-500">
                  <img
                    src="https://via.placeholder.com/200"
                    alt={founder.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <h2 className="font-primary text-[1.6rem] font-semibold text-dark mb-1 tracking-[-0.02em]">
                  {founder.name}
                </h2>
                <p className="font-primary text-[0.75rem] font-bold text-orange uppercase tracking-[0.1em] mb-6">
                  {founder.title}
                </p>
                <blockquote className="font-secondary text-[0.95rem] italic text-dark/55 leading-relaxed mb-8 px-2">
                  {founder.quote}
                </blockquote>

                <a
                  href="#"
                  className="group/li inline-flex items-center gap-2 bg-beige border border-black/8 rounded-full px-5 py-2.5
                             font-primary text-[0.8rem] font-semibold text-dark no-underline
                             transition-all duration-300 hover:bg-[#0077b5] hover:text-white hover:border-[#0077b5]
                             will-change-transform"
                  onMouseMove={handleMagneticHover}
                  onMouseLeave={handleMagneticLeave}
                >
                  <span className="text-[#0077b5] group-hover/li:text-white transition-colors duration-300">
                    <LinkedInIcon />
                  </span>
                  LinkedIn
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Divider ──────────────────────────────── */}
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-dark/10 to-transparent" />
      </div>

      {/* ── Strategic Advisors ───────────────────── */}
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {advisors.map((advisor) => (
              <div
                key={advisor.name}
                className="group bg-white rounded-3xl p-10 text-center border border-black/5
                           shadow-[0_2px_20px_rgba(0,0,0,0.04)]
                           hover:shadow-[0_12px_40px_rgba(235,96,45,0.12)]
                           hover:-translate-y-1 transition-all duration-500"
              >
                <div className="w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden border-4 border-light shadow-md animate-[float_3s_ease-in-out_infinite] group-hover:shadow-[0_10px_30px_rgba(235,96,45,0.2)] transition-shadow duration-500">
                  <img
                    src="https://via.placeholder.com/200"
                    alt={advisor.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <h3 className="font-primary text-[1.25rem] font-semibold text-dark mb-1 tracking-[-0.02em]">
                  {advisor.name}
                </h3>
                <p className="font-primary text-[0.75rem] font-bold text-orange uppercase tracking-[0.1em] mb-5">
                  {advisor.title}
                </p>
                <p className="font-secondary text-[0.875rem] text-dark/55 leading-relaxed mb-8">
                  {advisor.bio}
                </p>

                <a
                  href="#"
                  className="group/li inline-flex items-center gap-2 bg-beige border border-black/8 rounded-full px-5 py-2.5
                             font-primary text-[0.8rem] font-semibold text-dark no-underline
                             transition-all duration-300 hover:bg-[#0077b5] hover:text-white hover:border-[#0077b5]
                             will-change-transform"
                  onMouseMove={handleMagneticHover}
                  onMouseLeave={handleMagneticLeave}
                >
                  <span className="text-[#0077b5] group-hover/li:text-white transition-colors duration-300">
                    <LinkedInIcon />
                  </span>
                  LinkedIn
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ─────────────────────────────── */}
      <section ref={timelineRef} className="py-24 px-6 relative">
        <div className="max-w-[1100px] mx-auto relative">

          {/* Section header */}
          <div className="mb-16 text-center">
            <span className="inline-block mb-3 text-[0.75rem] font-primary font-semibold uppercase tracking-[0.12em] text-orange">
              Our Story
            </span>
            <h2 className="font-primary text-[clamp(1.6rem,4vw,2.2rem)] font-semibold text-dark tracking-[-0.025em]">
              How It All Started
            </h2>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div
              ref={timelineLineRef}
              className="absolute left-1/2 top-0 w-[2px] -translate-x-1/2 z-0 origin-top transition-[height] duration-300 ease-out hidden lg:block"
              style={{
                height: `${timelineProgress}%`,
                backgroundImage: "linear-gradient(to bottom, #eb602d 50%, transparent 50%)",
                backgroundSize: "2px 20px",
              }}
            />

            {timelineItems.map((item, index) => (
              <div
                key={index}
                className={`timeline-item relative mb-20 flex items-center opacity-0 transition-all duration-500
                            lg:flex-row flex-col
                            ${item.side === "right"
                              ? "lg:justify-end lg:translate-x-[50px] translate-y-[30px]"
                              : "lg:justify-start lg:-translate-x-[50px] translate-y-[30px]"
                            }`}
              >
                {/* Center icon */}
                <div className="absolute left-1/2 -translate-x-1/2 w-11 h-11 bg-white border-[3px] border-orange rounded-full flex items-center justify-center text-orange z-10 shadow-md animate-[heartbeat_2s_infinite] hover:scale-110 transition-transform duration-300 hidden lg:flex">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d={item.icon} />
                  </svg>
                </div>

                {/* Mobile icon */}
                <div className="w-10 h-10 bg-white border-[3px] border-orange rounded-full flex items-center justify-center text-orange shadow-md mb-4 lg:hidden">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d={item.icon} />
                  </svg>
                </div>

                {/* Card */}
                <div
                  className={`bg-white rounded-2xl p-7 shadow-[0_2px_16px_rgba(0,0,0,0.06)]
                              border-t-2 ${item.accent === "orange" ? "border-t-orange" : "border-t-dark"}
                              hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(0,0,0,0.1)]
                              transition-all duration-300
                              w-full lg:max-w-[44%]
                              ${item.side === "right" ? "lg:ml-14" : "lg:mr-14"}`}
                >
                  <p className="font-primary text-[0.7rem] font-bold uppercase tracking-[0.1em] text-orange mb-2">
                    {item.date}
                  </p>
                  <h3 className="font-primary text-[1.1rem] font-semibold text-dark mb-2 tracking-[-0.01em]">
                    {item.title}
                  </h3>
                  <p className="font-secondary text-[0.875rem] text-dark/60 leading-relaxed m-0">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default TeamPage;
