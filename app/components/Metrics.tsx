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
    <section className="bg-light py-2 px-8 pb-8 max-[768px]:py-4 max-[768px]:px-6 max-[768px]:pb-6">
      <div className="max-w-[900px] mx-auto flex flex-col items-center">
        {/* Pencil-Style Title */}
        <h2 className="metrics-title text-[2.25rem] font-semibold text-dark text-center mb-6 relative inline-block pb-2 max-[768px]:text-[2.5rem] max-[768px]:mb-5">
          Study like a doctor, not an exam candidate
        </h2>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-4 w-full max-[768px]:grid-cols-1 max-[768px]:gap-4">
          {metrics.map((metric) => (
            <div
              key={metric.number}
              className="flex items-start gap-3 max-[768px]:gap-[0.65rem]"
            >
              <div className="shrink-0 w-6 h-6 bg-transparent text-dark border-[1.5px] border-[rgba(46,46,46,0.2)] rounded-full flex items-center justify-center text-[0.75rem] font-medium opacity-60 max-[768px]:w-[22px] max-[768px]:h-[22px] max-[768px]:text-[0.7rem]">
                {metric.number}
              </div>
              <div className="text-base text-dark leading-[1.5] pt-[0.125rem] max-[768px]:text-[0.8rem]">
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
