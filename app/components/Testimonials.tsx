import { testimonials } from '../data/testimonials';

const Testimonials = () => {

  return (
    <section className="bg-[linear-gradient(to_bottom,#ffffff,#f7f8f8_20%,#f7f8f8_80%,#ffffff)] py-[clamp(4rem,10vw,4rem)] px-0 overflow-hidden" id="testimonials">
      <div className="max-w-[1200px] mx-auto px-[clamp(1.5rem,5vw,2.5rem)] mb-[clamp(2rem,5vw,3rem)] flex flex-col items-start">
        <span className="text-[clamp(0.75rem,2vw,0.85rem)] text-[#666] font-semibold tracking-widest uppercase mb-[clamp(1rem,3vw,1.5rem)]">
          TESTIMONIALS
        </span>
        <h2 className="text-[clamp(1.9rem,5vw,3.25rem)] leading-[1.1] font-sans font-medium text-[#222] tracking-[-0.03em] max-w-[1200px]">
          Don't Take Our Word For It!<br/>Hear It From Our Students.
        </h2>
      </div>

      <div className="pl-[clamp(1.5rem,5vw,2rem)] md:pl-[calc((100vw-1200px)/2+clamp(1.5rem,5vw,2.25rem))]">
        <div className="flex gap-[clamp(1rem,3vw,1.5rem)] overflow-x-auto overflow-y-hidden scroll-smooth pb-[clamp(2rem,5vw,3rem)] pr-[clamp(1.5rem,5vw,2rem)] snap-x snap-mandatory [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {testimonials.map((testimonial) => {
            if (testimonial.type === 'video') {
              return (
                <div 
                  key={testimonial.id}
                  className="relative shrink-0 w-[clamp(320px,80vw,400px)] h-[clamp(420px,60vh,480px)] rounded-[1.5rem] overflow-hidden snap-center shadow-[0_8px_30px_rgba(0,0,0,0.06)] group cursor-pointer"
                >
                  {/* Video Thumbnail Full Bleed */}
                  <div className="absolute inset-0 w-full h-full">
                    <img 
                      src={testimonial.image} 
                      alt={`Testimonial from ${testimonial.name}`}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10"></div>
                  </div>
                  
                  <div className="absolute bottom-[clamp(1.5rem,5vw,2rem)] left-[clamp(1.5rem,5vw,2rem)] right-[clamp(1.5rem,5vw,2rem)] z-10 flex flex-col gap-2">
                    <span className={`font-[var(--font-space-var)] font-bold text-[clamp(1.25rem,4vw,1.6rem)] text-white leading-[1.1] tracking-tight`}>
                      {testimonial.name}
                    </span>
                    <span className="text-[clamp(0.75rem,2vw,0.8rem)] text-white/80 font-sans tracking-wide leading-tight">
                      {testimonial.meta}
                    </span>
                  </div>
                </div>
              );
            }

            return (
              <div 
                key={testimonial.id}
                className="relative shrink-0 w-[clamp(320px,80vw,400px)] h-[clamp(420px,60vh,480px)] bg-white rounded-[1.5rem] p-[clamp(1.5rem,4vw,2rem)] flex flex-col justify-between snap-center shadow-[0_4px_24px_rgba(0,0,0,0.04)] transition-shadow duration-300"
              >
                <div>
                  <p 
                    className="text-[#444] text-[clamp(0.85rem,1.8vw,0.95rem)] leading-[1.7] tracking-[0.01em]"
                    dangerouslySetInnerHTML={{ __html: testimonial.text || "" }}
                  />
                </div>

                <div className="flex flex-col gap-1.5 mt-8">
                  <span className={`font-[var(--font-space-var)] font-semibold text-[clamp(1.15rem,3vw,1.4rem)] text-[#111] leading-[1.1] tracking-tight`}>
                    {testimonial.name}
                  </span>
                  <span className="text-[clamp(0.75rem,1.5vw,0.8rem)] text-[#777] font-sans tracking-wide leading-[1.4]">
                    {testimonial.meta}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
