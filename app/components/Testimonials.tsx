import { Caveat } from 'next/font/google';
import { PlayIcon } from "@heroicons/react/24/solid";

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
    <section className="bg-[#f7f8f8] py-16 px-0 max-[600px]:py-16 overflow-hidden" id="testimonials">
      <div className="max-w-[1200px] mx-auto px-8 max-[600px]:px-6 mb-12 flex flex-col items-start">
        <span className="text-[0.85rem] text-[#666] font-semibold tracking-widest uppercase mb-6">
          TESTIMONIALS
        </span>
        <h2 className="text-[3.5rem] leading-[1.1] font-sans font-medium text-[#222] tracking-[-0.03em] max-[900px]:text-[2.75rem] max-[600px]:text-[2.25rem] max-w-[1200px]">
          Don't take our word for it!<br/>Hear it from our students.
        </h2>
      </div>

      <div className="pl-6 md:pl-[calc((100vw-1200px)/2+2rem)]">
        <div className="flex gap-6 overflow-x-auto overflow-y-hidden scroll-smooth pb-12 pr-8 snap-x snap-mandatory [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {testimonials.map((testimonial) => {
            if (testimonial.type === 'video') {
              return (
                <div 
                  key={testimonial.id}
                  className="relative shrink-0 w-[400px] h-[520px] rounded-[1.5rem] overflow-hidden snap-center shadow-[0_8px_30px_rgba(0,0,0,0.06)] group cursor-pointer max-[600px]:w-[320px] max-[600px]:h-[450px]"
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
                  <div className="absolute bottom-8 left-8 right-8 z-10 flex flex-col gap-1">
                    <span className={`${caveat.className} text-[3rem] text-white leading-none tracking-wide -mb-1`}>
                      {testimonial.name}
                    </span>
                    <span className="text-[0.85rem] text-white/70 font-sans tracking-wide">
                      {testimonial.meta}
                    </span>
                  </div>
                </div>
              );
            }

            return (
              <div 
                key={testimonial.id}
                className="relative shrink-0 w-[400px] h-[520px] bg-white rounded-[1.5rem] p-10 flex flex-col justify-between snap-center shadow-[0_4px_24px_rgba(0,0,0,0.04)] transition-shadow duration-300 max-[600px]:w-[320px] max-[600px]:h-[450px] max-[600px]:p-8"
              >
                <div>
                  <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full mb-8 bg-[#f5f5f5]" />
                  <p className="text-[#333] text-[1.05rem] leading-[1.65] tracking-[-0.01em] max-[600px]:text-[0.95rem]">
                    {testimonial.text}
                  </p>
                </div>

                <div className="flex flex-col gap-1 mt-6">
                  <span className={`${caveat.className} text-[3rem] text-[#222] leading-none tracking-wide -mb-1`}>
                    {testimonial.name}
                  </span>
                  <span className="text-[0.85rem] text-[#888] font-sans tracking-wide">
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
