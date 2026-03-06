import Image from "next/image";
import { logos } from "../data/trustedBy";

export default function TrustedBy() {
  return (
    <section className="bg-[linear-gradient(to_bottom,#ffffff,#fff0e4_20%,#fff0e4_80%,#ffffff)] pt-[clamp(2rem,6vw,4rem)] pb-[clamp(3.5rem,8vw,5rem)]">
      <div className="max-w-[1400px] mx-auto">
        <h2 className="text-[clamp(0.9rem,2vw,1.1rem)] font-medium text-dark text-center mb-[clamp(2rem,5vw,3rem)] tracking-[-0.01em] px-[clamp(1rem,4vw,3rem)]">
          Trusted by students from the top colleges in India
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
            {[...logos, ...logos].map((logo, i) => (
              <span key={i} className="trusted-item">
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={logo.w}
                  height={80}
                />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
