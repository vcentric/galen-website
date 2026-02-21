const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      text: "GalenAI has made my anatomy revision so much easier. The AI tutor gives crisp explanations and the flashcards actually stick. I'm saving hours every week, and I can focus on clinics.",
      accent: "anatomy",
      name: "Arjun Sharma",
      meta: "3rd Year, AIIMS Delhi",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun",
    },
    {
      id: 2,
      text: "As a 2nd‑year student juggling multiple subjects, GalenAI's personalised guidance is a lifesaver. It helps me understand complex topics without drowning in lectures, and the Q‑banks show me where I stand.",
      accent: "personalised guidance",
      name: "Priya Iyer",
      meta: "2nd Year, CMC Vellore",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
    },
    {
      id: 3,
      text: "The clinical cases on GalenAI helped me apply theory to real patients. It feels like I'm preparing for internship already. My confidence in case presentations has skyrocketed.",
      accent: "clinical cases",
      name: "Rahul Patel",
      meta: "Final Year, MAMC Delhi",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul",
    },
    {
      id: 4,
      text: "I was overwhelmed by the syllabus. GalenAI breaks it down into manageable bits and offers active recall exercises. I love that it aligns with our textbooks and exam patterns.",
      accent: "active recall",
      name: "Sneha Reddy",
      meta: "1st Year, St. John's Med College",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha",
    },
  ];

  const highlightAccent = (text: string, accent: string) => {
    const parts = text.split(accent);
    return (
      <>
        {parts[0]}
        <span className="text-[#eb602d] font-semibold">{accent}</span>
        {parts[1]}
      </>
    );
  };

  return (
    <section
      className="bg-gradient-to-br from-[#fef9f5] to-[#fff0e4] py-20 px-8 max-[600px]:py-14 max-[600px]:px-6"
      id="testimonials"
    >
      <div className="max-w-[1200px] mx-auto text-center">
        <div className="uppercase text-[0.75rem] font-semibold tracking-[0.15em] text-[#eb602d] mb-3">
          TESTIMONIALS
        </div>
        <h2 className="text-[2.5rem] font-bold text-[#2e2e2e] mb-12 tracking-[-0.02em] max-[900px]:text-[2rem] max-[600px]:text-[1.75rem]">
          What our students say
        </h2>

        <div className="testimonials-grid flex gap-6 overflow-x-auto overflow-y-hidden scroll-smooth pb-4 [-webkit-overflow-scrolling:touch]">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.id}
              className="relative bg-white rounded-[1.25rem] p-8 shadow-[0_8px_24px_rgba(0,0,0,0.06)] flex flex-col justify-between text-left min-w-[380px] max-w-[380px] shrink-0 transition-all duration-[220ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.1)] max-[900px]:min-w-[320px] max-[900px]:max-w-[320px] max-[600px]:p-6 max-[600px]:min-w-[280px] max-[600px]:max-w-[280px]"
            >
              <span className="text-[4rem] text-[rgba(235,96,45,0.08)] absolute top-2 left-5 leading-none max-[600px]:text-[3rem]">
                &ldquo;
              </span>
              <p className="mt-10 mb-7 text-[#444] text-base leading-[1.65] max-[600px]:text-[0.95rem] max-[600px]:mt-8">
                {highlightAccent(testimonial.text, testimonial.accent)}
              </p>
              <div className="flex items-center gap-[0.875rem] mt-auto">
                <img
                  className="w-12 h-12 rounded-full shrink-0 bg-[#f6f4f1]"
                  src={testimonial.avatar}
                  alt={testimonial.name}
                />
                <div className="flex flex-col gap-[0.15rem]">
                  <span className="font-semibold text-[0.95rem] text-[#2e2e2e]">
                    {testimonial.name}
                  </span>
                  <span className="text-[0.8rem] text-[#777]">
                    {testimonial.meta}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
