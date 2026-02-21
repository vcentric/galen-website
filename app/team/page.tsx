"use client";

import { useEffect, useRef, useState } from "react";
import type { Metadata } from "next";

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
        const progress = Math.max(
          0,
          Math.min(100, (visibleAmount / sectionHeight) * 100)
        );
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
    const buttonCenterX = rect.left + rect.width / 2;
    const buttonCenterY = rect.top + rect.height / 2;
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const deltaX = mouseX - buttonCenterX;
    const deltaY = mouseY - buttonCenterY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const maxDistance = 20;

    if (distance < maxDistance) {
      const pullStrength = (maxDistance - distance) / maxDistance;
      const moveX = deltaX * pullStrength * 0.3;
      const moveY = deltaY * pullStrength * 0.3;
      button.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }
  };

  const handleMagneticLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.transform = "translate(0, 0)";
  };

  const LinkedInIcon = () => (
    <svg className="w-5 h-5 text-[#0077b5] transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M18.5 18.5V13.2A3.26 3.26 0 0 0 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17A1.4 1.4 0 0 1 15.71 13.57V18.5H18.5M6.88 8.56A1.68 1.68 0 0 0 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19A1.69 1.69 0 0 0 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56M8.27 18.5V10.13H5.5V18.5H8.27Z" />
    </svg>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#fff5ed] to-[#ffe8d6] pt-24 pb-16 px-8 text-left max-[768px]:pt-24 max-[768px]:pb-12 max-[768px]:px-6">
        <div className="max-w-[1200px] mx-auto">
          <h1 className="font-sans text-[2.5rem] font-semibold text-foreground mb-6 tracking-[-0.03em] leading-[1.1] inline-block relative pb-3 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-[60px] after:h-[3px] after:bg-cta after:rounded-sm max-[768px]:text-[2.5rem] max-[480px]:text-[2rem]">
            Meet the Minds Behind GalenAI
          </h1>
          <p className="font-sans text-[1.25rem] font-normal text-foreground/60 leading-[1.7] m-0 max-w-[700px] max-[768px]:text-[1.125rem] max-[480px]:text-base">
            Built by medicos, engineers, and industry veterans.
          </p>
        </div>
      </section>

      {/* Founders Section */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-[1200px] mx-auto grid grid-cols-2 gap-8 max-[1024px]:grid-cols-1">
          {[
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
          ].map((founder) => (
            <div
              key={founder.name}
              className="bg-[#fff7ed] border border-[#fed7aa] rounded-3xl p-10 text-center transition-all duration-500 shadow-sm hover:shadow-xl hover:bg-white hover:[transform:perspective(1000px)_rotateX(2deg)_rotateY(-2deg)_scale(1.02)] max-[768px]:p-8"
            >
              <div className="w-40 h-40 mx-auto mb-6 rounded-full overflow-hidden border-4 border-white shadow-lg animate-[float_3s_ease-in-out_infinite] transition-all duration-500 hover:scale-105 hover:shadow-[0_15px_25px_-5px_rgba(235,96,45,0.3)] max-[768px]:w-[140px] max-[768px]:h-[140px] max-[480px]:w-[120px] max-[480px]:h-[120px]">
                <img
                  src="https://via.placeholder.com/200"
                  alt={founder.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="font-sans text-[1.875rem] font-bold text-[#0f172a] mb-2 max-[768px]:text-2xl">
                {founder.name}
              </h2>
              <p className="font-sans text-[0.875rem] font-bold text-[#f97316] uppercase tracking-[0.05em] mb-6">
                {founder.title}
              </p>
              <blockquote className="font-sans text-base font-normal italic text-[#4b5563] leading-relaxed mb-6">
                {founder.quote}
              </blockquote>
              <a
                href="#"
                className="group inline-flex items-center gap-2 bg-white border border-[#e5e7eb] rounded-lg px-4 py-2 font-sans text-[0.875rem] font-semibold text-[#374151] no-underline transition-all duration-500 will-change-transform hover:bg-[#f9fafb] hover:border-[#0077b5] hover:shadow-[0_4px_12px_rgba(0,119,181,0.2)]"
                onMouseMove={handleMagneticHover}
                onMouseLeave={handleMagneticLeave}
              >
                <LinkedInIcon />
                LinkedIn
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Advisors Section */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="font-sans text-[2rem] font-semibold text-foreground text-left mb-12 relative inline-block pb-3 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-[60px] after:h-[3px] after:bg-cta after:rounded-sm max-[768px]:text-[2rem]">
            Strategic Advisors
          </h2>
          <div className="grid grid-cols-2 gap-8 max-[1024px]:grid-cols-1">
            {[
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
            ].map((advisor) => (
              <div
                key={advisor.name}
                className="bg-[#fff7ed] border border-[#fed7aa] rounded-3xl p-10 text-center transition-all duration-500 shadow-sm hover:shadow-xl hover:bg-white hover:[transform:perspective(1000px)_rotateX(2deg)_rotateY(-2deg)_scale(1.02)] max-[768px]:p-8 max-[480px]:p-6"
              >
                <div className="w-40 h-40 mx-auto mb-6 rounded-full overflow-hidden border-4 border-white shadow-lg animate-[float_3s_ease-in-out_infinite] transition-all duration-500 hover:scale-105 hover:shadow-[0_15px_25px_-5px_rgba(235,96,45,0.3)] max-[768px]:w-[140px] max-[768px]:h-[140px] max-[480px]:w-[120px] max-[480px]:h-[120px]">
                  <img
                    src="https://via.placeholder.com/200"
                    alt={advisor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-sans text-xl font-bold text-[#0f172a] mb-2">
                  {advisor.name}
                </h3>
                <p className="font-sans text-[0.875rem] font-bold text-[#f97316] uppercase tracking-[0.05em] mb-4">
                  {advisor.title}
                </p>
                <p className="font-sans text-[0.875rem] text-[#4b5563] leading-relaxed mb-6">
                  {advisor.bio}
                </p>
                <a
                  href="#"
                  className="group inline-flex items-center gap-2 bg-white border border-[#e5e7eb] rounded-lg px-4 py-2 font-sans text-[0.875rem] font-semibold text-[#374151] no-underline transition-all duration-500 will-change-transform hover:bg-[#f9fafb] hover:border-[#0077b5] hover:shadow-[0_4px_12px_rgba(0,119,181,0.2)]"
                  onMouseMove={handleMagneticHover}
                  onMouseLeave={handleMagneticLeave}
                >
                  <LinkedInIcon />
                  LinkedIn
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section ref={timelineRef} className="py-24 px-4 bg-[#f9fafb] relative max-[768px]:py-16 max-[768px]:px-6">
        <div className="max-w-[1200px] mx-auto relative">
          <h2 className="font-sans text-[2rem] font-semibold text-foreground text-left mb-12 relative inline-block pb-3 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-[60px] after:h-[3px] after:bg-cta after:rounded-sm max-[768px]:text-[2rem]">
            How It All Started
          </h2>

          <div className="relative">
            {/* Timeline Line */}
            <div
              ref={timelineLineRef}
              className="absolute left-1/2 top-0 w-[2px] -translate-x-1/2 z-0 transition-[height] duration-300 ease-out origin-top max-[1024px]:hidden"
              style={{
                height: `${timelineProgress}%`,
                backgroundImage:
                  "linear-gradient(to bottom, #f97316 50%, transparent 50%)",
                backgroundSize: "2px 20px",
              }}
            />

            {/* Timeline Items */}
            {[
              {
                title: 'The "Aha" Moment',
                date: "Mid 2025",
                description: "Dr. Arun realized textbooks hadn't changed, but exams had. He called Varun.",
                side: "right" as const,
                color: "orange" as const,
                icon: "M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6C7.8 12.16 7 10.63 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z",
              },
              {
                title: "Building the Prototype",
                date: "Late 2025",
                description: "Built the first AI Tutor. When it diagnosed a complex case simulation, the team knew they had something special.",
                side: "left" as const,
                color: "dark" as const,
                icon: "M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z",
              },
              {
                title: "The Tribe Grows",
                date: "Late 2025",
                description: "Brought in top rankers and senior engineers. A medical company at heart.",
                side: "right" as const,
                color: "orange" as const,
                icon: "M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z",
              },
              {
                title: "The Mission",
                date: "Today & Beyond",
                description: "Working to ensure every student gets personalized mentorship. Empowering the next generation of doctors.",
                side: "left" as const,
                color: "dark" as const,
                icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM9.29 16.29L5.7 12.7c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0L10 14.17l6.88-6.88c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41l-7.59 7.59c-.38.39-1.02.39-1.41 0z",
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`timeline-item relative mb-24 flex items-center opacity-0 transition-all duration-600 max-[1024px]:flex-col max-[1024px]:mb-12 ${
                  item.side === "right"
                    ? "justify-end translate-x-[50px] max-[1024px]:translate-x-0 max-[1024px]:translate-y-[30px]"
                    : "justify-start -translate-x-[50px] max-[1024px]:translate-x-0 max-[1024px]:translate-y-[30px]"
                }`}
              >
                {/* Icon */}
                <div className="absolute left-1/2 -translate-x-1/2 w-12 h-12 bg-white border-4 border-[#f97316] rounded-full flex items-center justify-center text-[#f97316] z-10 transition-all duration-500 animate-[heartbeat_2s_infinite] hover:scale-[1.15] hover:shadow-[0_0_20px_rgba(249,115,22,0.5)] max-[1024px]:relative max-[1024px]:left-auto max-[1024px]:translate-x-0 max-[1024px]:mx-auto max-[1024px]:animate-none">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d={item.icon} />
                  </svg>
                </div>

                {/* Content */}
                <div
                  className={`bg-white rounded-xl p-6 shadow-sm max-w-[45%] transition-all duration-500 hover:-translate-y-1 hover:shadow-lg ${
                    item.color === "orange"
                      ? "border-l-4 border-l-[#f97316]"
                      : "border-l-4 border-l-[#0f172a]"
                  } ${
                    item.side === "right" ? "ml-16" : "mr-16"
                  } max-[1024px]:max-w-full max-[1024px]:ml-0 max-[1024px]:mr-0 max-[1024px]:mt-16`}
                >
                  <h3 className="font-sans text-[1.125rem] font-bold text-[#0f172a] mb-1">
                    {item.title}
                  </h3>
                  <p className="font-sans text-xs text-[#9ca3af] mb-2">
                    {item.date}
                  </p>
                  <p className="font-sans text-[0.875rem] text-[#4b5563] leading-relaxed m-0">
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
