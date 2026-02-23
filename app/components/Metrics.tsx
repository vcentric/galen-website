const Metrics = () => {
  const metrics = [
    { number: 1, text: "more effective study sessions", highlight: "~30–40%" },
    { number: 2, text: "fewer resource switches per topic", highlight: "~50%" },
    {
      number: 3,
      text: "stronger concept connections across subjects",
      highlight: "2–3×",
    },
    {
      number: 4,
      text: "more confidence in viva and case discussions",
      highlight: "2×",
    },
  ];

  return (
    <section className="bg-light pt-[clamp(1rem,2vw,2rem)] px-[clamp(1.5rem,5vw,2rem)] pb-[clamp(1.5rem,5vw,2rem)]">
      <div className="max-w-[1200px] mx-auto flex flex-col items-start mb-[clamp(1rem,3vw,1.5rem)]">
        <span className="text-[clamp(0.75rem,1vw,0.85rem)] text-[#666] font-semibold tracking-widest uppercase">
          METRICS
        </span>
      </div>
      <div className="max-w-[900px] mx-auto flex flex-col items-center">
        {/* Pencil-Style Title */}
        <h2 className="metrics-title text-[clamp(2rem,5vw,2.5rem)] font-semibold text-dark text-center mb-[clamp(1.25rem,3vw,1.5rem)] relative inline-block pb-2">
          Study like a doctor, not an exam candidate
        </h2>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[clamp(1rem,3vw,1.5rem)] gap-y-[clamp(1rem,2vw,1rem)] w-full">
          {metrics.map((metric) => (
            <div
              key={metric.number}
              className="flex items-start gap-[clamp(0.65rem,1.5vw,0.75rem)]"
            >
              <div className="shrink-0 w-[clamp(22px,2.5vw,24px)] h-[clamp(22px,2.5vw,24px)] bg-transparent text-dark border-[1.5px] border-[rgba(46,46,46,0.2)] rounded-full flex items-center justify-center text-[clamp(0.7rem,1vw,0.75rem)] font-medium opacity-60">
                {metric.number}
              </div>
              <div className="text-[clamp(0.8rem,1.5vw,1rem)] text-dark leading-[1.5] pt-[0.125rem]">
                <span className="metric-highlight font-bold relative inline-block pb-1">
                  {metric.highlight}
                </span>{" "}
                {metric.text}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Metrics;
