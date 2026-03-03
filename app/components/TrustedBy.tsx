import Image from "next/image";

const logos = [
  { name: "AIIMS",                      src: "/AIIMS.png",    w: 300 },
  { name: "CMC Vellore",                src: "/CMC.png",      w: 300 },
  { name: "JIPMER",                     src: "/JIPMER.png",   w: 300 },
  { name: "St. John's Medical College", src: "/stjohns.png",  w: 300 },
  { name: "Bangalore Medical College",  src: "/bangalore.png",w: 300 },
  { name: "KMC",                        src: "/KMC.svg",      w: 300 },
  { name: "MVJ Medical College",        src: "/mvjmc.png",    w: 300 },
];

export default function TrustedBy() {
  return (
    <section className="bg-light pt-[clamp(2rem,6vw,4rem)] px-[clamp(1rem,4vw,3rem)] pb-[clamp(3.5rem,8vw,5rem)] overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <h2 className="text-[clamp(0.9rem,2vw,1.1rem)] font-medium text-dark text-center mb-[clamp(2rem,5vw,3rem)] tracking-[-0.01em]">
          Trusted by students from the top colleges in India
        </h2>

        {/* Edge-fade mask */}
        <div
          className="w-full overflow-hidden relative"
          style={{
            maskImage:
              "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
          }}
        >
          {/*
            Two copies → the 'scroll' keyframe moves -50% of the track,
            which equals exactly one full copy, so the reset is invisible.
          */}
          <div
            className="flex items-center gap-[clamp(2rem,4vw,3.5rem)] w-fit
                        animate-[scroll_18s_linear_infinite]
                        hover:[animation-play-state:paused]"
            style={{ willChange: "transform" }}
          >
            {[...logos, ...logos, ...logos, ...logos].map((logo, i) => (
              <div
                key={i}
                className="flex-shrink-0 grayscale opacity-40
                           hover:grayscale-0 hover:opacity-100
                           transition-all duration-300"
              >
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={logo.w}
                  height={80}
                  className="h-[clamp(2.5rem,5vw,4rem)] w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
