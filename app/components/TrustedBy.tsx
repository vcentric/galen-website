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
    <section className="bg-light pt-[clamp(2rem,6vw,4rem)] px-[clamp(2rem,6vw,4rem)] pb-[clamp(3.5rem,8vw,5rem)] overflow-hidden">
      <div className="max-w-[1100px] mx-auto">
        <h2 className="text-[clamp(1rem,2vw,1.1rem)] font-medium text-dark text-center mb-[clamp(2rem,5vw,3rem)] tracking-[-0.01em]">
          Trusted by students from the top colleges in India
        </h2>

        <div className="w-full overflow-hidden relative">
          <div className="flex gap-[clamp(2.5rem,6vw,4rem)] animate-[scroll_30s_linear_infinite] w-fit hover:[animation-play-state:paused]">
            {[...institutions, ...institutions].map((institution, index) => (
              <div
                key={`logo-${index}`}
                className="text-[clamp(0.85rem,1.5vw,1rem)] font-medium text-dark opacity-40 whitespace-nowrap transition-opacity duration-300 tracking-[0.02em] hover:opacity-70"
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
