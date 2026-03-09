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
    text: `"The lovely team at GalenAI has provided my studies with significant leverage. Their work is exceptionally professional, and they take the time to understand where I'm weakest. Additionally, my learning efficiency is impressively fast!"`,
    name: "Priya Iyer",
    meta: "2nd Year, CMC Vellore",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
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
