import { Caveat } from 'next/font/google';

const caveat = Caveat({ subsets: ['latin'], weight: ['400', '700'], display: 'swap' });

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      type: "text",
      text: `"The lovely team at GalenAI has provided my studies with significant leverage. Their work is exceptionally professional, and they take the time to understand where I'm weakest. Additionally, my learning efficiency is impressively fast!"`,
      name: "Priya Iyer",
      meta: "2nd Year, CMC Vellore",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
    },
    {
      id: 2,
      type: "video",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop",
      name: "Arjun Sharma",
      meta: "3rd Year, AIIMS Delhi",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun",
    },
    {
      id: 3,
      type: "text",
      text: `"GalenAI has greatly exceeded our expectations. The communication is always excellent, the turnaround is extremely quick, and the insights are fresh, innovative, and spot on!"`,
      name: "Rahul Patel",
      meta: "Final Year, MAMC Delhi",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul",
    },
    {
      id: 4,
      type: "text",
      text: `"I was overwhelmed by the syllabus until GalenAI. The clinical cases helped me apply theory to real patients. It feels like I'm preparing for internship already. My confidence skyrocketed."`,
      name: "Sneha Reddy",
      meta: "1st Year, St. John's Med College",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha",
    }
  ];

  return (
    <section className="bg-[linear-gradient(to_bottom,#ffffff,#f7f8f8_20%,#f7f8f8_80%,#ffffff)] py-[clamp(4rem,10vw,4rem)] px-0 overflow-hidden" id="testimonials">
      <div className="max-w-[1200px] mx-auto px-[clamp(1.5rem,5vw,2.5rem)] mb-[clamp(2rem,5vw,3rem)] flex flex-col items-start">
        <span className="text-[clamp(0.75rem,2vw,0.85rem)] text-[#666] font-semibold tracking-widest uppercase mb-[clamp(1rem,3vw,1.5rem)]">
          TESTIMONIALS
        </span>
        <h2 className="text-[clamp(1.8rem,5vw,3.25rem)] leading-[1.1] font-sans font-medium text-[#222] tracking-[-0.03em] max-w-[1200px]">
          Don't take our word for it!<br/>Hear it from our students.
        </h2>
      </div>

      <div className="pl-[clamp(1.5rem,5vw,2rem)] md:pl-[calc((100vw-1200px)/2+clamp(1.5rem,5vw,2.25rem))]">
        <div className="flex gap-[clamp(1rem,3vw,1.5rem)] overflow-x-auto overflow-y-hidden scroll-smooth pb-[clamp(2rem,5vw,3rem)] pr-[clamp(1.5rem,5vw,2rem)] snap-x snap-mandatory [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {testimonials.map((testimonial) => {
            if (testimonial.type === 'video') {
              return (
                <div 
                  key={testimonial.id}
                  className="relative shrink-0 w-[clamp(320px,80vw,400px)] h-[clamp(450px,70vh,520px)] rounded-[1.5rem] overflow-hidden snap-center shadow-[0_8px_30px_rgba(0,0,0,0.06)] group cursor-pointer"
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
                  
                  {/* Name Overlay (Bottom Left) */}
                  <div className="absolute bottom-[clamp(1.5rem,5vw,2rem)] left-[clamp(1.5rem,5vw,2rem)] right-[clamp(1.5rem,5vw,2rem)] z-10 flex flex-col gap-1">
                    <span className={`${caveat.className} text-[clamp(2rem,6vw,3rem)] text-white leading-none tracking-wide -mb-1`}>
                      {testimonial.name}
                    </span>
                    <span className="text-[clamp(0.75rem,2vw,0.85rem)] text-white/70 font-sans tracking-wide">
                      {testimonial.meta}
                    </span>
                  </div>
                </div>
              );
            }

            return (
              <div 
                key={testimonial.id}
                className="relative shrink-0 w-[clamp(320px,80vw,400px)] h-[clamp(450px,70vh,520px)] bg-white rounded-[1.5rem] p-[clamp(2rem,5vw,2.5rem)] flex flex-col justify-between snap-center shadow-[0_4px_24px_rgba(0,0,0,0.04)] transition-shadow duration-300"
              >
                <div>
                  <img src={testimonial.avatar} alt={testimonial.name} className="w-[clamp(2.5rem,5vw,3rem)] h-[clamp(2.5rem,5vw,3rem)] rounded-full mb-[clamp(1.5rem,4vw,2rem)] bg-[#f5f5f5]" />
                  <p className="text-[#333] text-[clamp(0.95rem,2vw,1.05rem)] leading-[1.65] tracking-[-0.01em]">
                    {testimonial.text}
                  </p>
                </div>

                <div className="flex flex-col gap-1 mt-6">
                  <span className={`${caveat.className} text-[clamp(2rem,6vw,3rem)] text-[#222] leading-none tracking-wide -mb-1`}>
                    {testimonial.name}
                  </span>
                  <span className="text-[clamp(0.75rem,2vw,0.85rem)] text-[#888] font-sans tracking-wide">
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
