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
    text: `"What I like most about GalenAI is how it supports continuous learning. It has become my go-to platform for NEET PG. The AI truly understands what I’m looking for, and the <span class="highlight-text">clinical cases are both engaging and challenging</span> — it has changed my perspective on how exam preparation should be approached."`,
    name: "Dr. Dhanya Rao",
    meta: "MBBS | Father Muller Medical College | NEET PG Aspirant",
  },
  {
    id: 2,
    type: "text",
    text: `"GalenAI has become a part of my day-to-day medical studies. It really helps with both pre-lecture preparation and post-lecture revision, especially for internals. The AI understands my syllabus well, and having all 19 subjects in one place makes it easy to query and learn. The <span class="highlight-text">clinical cases are challenging</span> and push me to improve my clinical thinking and skills."`,
    name: "Dr. Navya Yalangi Rao",
    meta: "MBBS, 3rd Year | Bharati Vidyapeeth Medical College",
  },
  {
    id: 3,
    type: "text",
    text: `"The AI Tutor, particularly with its various learning modes, has been a constant source of support throughout my studies. I have found the subject-wise Q-Banks to be exceptionally helpful; because they are aligned with specific competencies, they have made my revision process <span class="highlight-text">both structured and highly effective</span>. GalenAI makes incorporating AI into serious medical preparation feel natural, reliable, and intuitive."`,
    name: "Dr. Varun Gopal Rajan",
    meta: "MBBS | MRCS Aspirant, Adichunchanagiri Institute of Medical Science",
  },
  {
    id: 4,
    type: "text",
    text: `"As a final year student, Galen AI is like my study buddy. I use it during my postings for fast reading and answering questions, and during my study sessions to keep things concise. As a person who learns through application, the <span class="highlight-text">case based learning and the different modes</span> available in the tutor are my personal favourite. It helps me learn through cases, questions, flash cards and it truly feels like a buddy."`,
    name: "Siddhartha Kakani",
    meta: "III MBBS Phase - II, Bharati Vidyapeeth Medical College, Pune",
  }
];
