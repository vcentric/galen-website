import Image from "next/image";
import { logos } from "../data/trustedBy";

export default function TrustedBy() {
  return (
    <div className="w-full py-2">
      <div className="w-full mx-auto">
        <h2 className="text-[clamp(0.8rem,1.5vw,0.9rem)] font-medium text-dark/60 text-center mb-4 tracking-[-0.01em] px-[clamp(1rem,4vw,3rem)]">
          Trusted by students<span className="hidden sm:inline"> from the top colleges in India</span>
        </h2>

        {/*
          .trusted-marquee  → relative container, overflow hidden, height = --mq-h
          .trusted-track    → position absolute, white-space nowrap
                              animation: marquee (translateX 0 → -50%)
                              width = 2 copies → -50% = exactly one copy
          .trusted-item     → inline-flex, explicit height, padding-right = gap
          .trusted-item img → explicit height via CSS (overrides next/image defaults)
        */}
        <div className="trusted-marquee">
          <div className="trusted-track">
            {[...logos, ...logos].map((logo, i) => {
              if (logo.name === "Bangalore Medical College") {
                return (
                  <span key={i} className="trusted-item flex-row gap-[6px] group cursor-pointer">
                    <Image
                      src={logo.src}
                      alt={logo.name}
                      width={logo.w}
                      height={80}
                    />
                    <span className="text-[10px] sm:text-[11px] md:text-[12.5px] font-bold text-dark/60 tracking-tighter leading-none whitespace-nowrap uppercase mt-[2px] group-hover:text-blue-600/70 transition-colors duration-300 scale-y-[1.05] scale-x-[0.9] origin-left">BMCRI</span>
                  </span>
                );
              }
              return (
                <span key={i} className="trusted-item">
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    width={logo.w}
                    height={80}
                  />
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
             