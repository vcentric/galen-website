const TrustedBy = () => {
  const institutions = [
    "AIIMS",
    "CMC Vellore",
    "JIPMER",
    "St. John's Medical College",
    "Bangalore Medical College",
    "KMC",
    "MVJ Medical College",
  ];

  return (
    <section className="bg-[#fff0e4] py-8 px-8 pb-16 overflow-hidden max-[768px]:py-12 max-[768px]:px-6">
      <div className="max-w-[1200px] mx-auto">
        <h2 className="text-[1.1rem] font-medium text-[#2e2e2e] text-center mb-12 tracking-[-0.01em] max-[768px]:text-base max-[768px]:mb-10">
          Trusted by students from the top colleges in India
        </h2>

        <div className="w-full overflow-hidden relative">
          <div className="flex gap-16 animate-[scroll_30s_linear_infinite] w-fit hover:[animation-play-state:paused] max-[768px]:gap-12">
            {[...institutions, ...institutions].map((institution, index) => (
              <div
                key={`logo-${index}`}
                className="text-base font-medium text-[#2e2e2e] opacity-40 whitespace-nowrap transition-opacity duration-300 tracking-[0.02em] hover:opacity-70 max-[768px]:text-[0.9rem]"
              >
                {institution}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;
