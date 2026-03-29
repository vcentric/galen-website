export type Testimonial = {
  id: number;
  type: "text" | "video";
  text?: string;
  image?: string;
  name: string;
  meta: string;
  avatar?: string;
};

export const testimonials: Testimonial[] = [
  {
    id: 1,
    type: "text",
    text: `"The lovely team at GalenAI has provided my studies with <span class="highlight-text">significant leverage</span>. Their work is exceptionally professional, and they take the time to understand where I'm weakest. Additionally, my learning efficiency is <span class="highlight-text">impressively fast!</span>"`,
    name: "Priya Iyer",
    meta: "2nd Year, CMC Vellore",
  },
  {
    id: 3,
    type: "text",
    text: `"GalenAI has <span class="highlight-text">greatly exceeded our expectations</span>. The communication is always excellent, the turnaround is extremely quick, and the insights are <span class="highlight-text">fresh, innovative, and spot on!</span>"`,
    name: "Rahul Patel",
    meta: "Final Year, MAMC Delhi",
  },
  {
    id: 4,
    type: "text",
    text: `"I was overwhelmed by the syllabus until GalenAI. The clinical cases helped me <span class="highlight-text">apply theory to real patients</span>. It feels like I'm preparing for internship already. My <span class="highlight-text">confidence skyrocketed.</span>"`,
    name: "Sneha Reddy",
    meta: "1st Year, St. John's Med College",
  }
];
