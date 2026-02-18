import React from 'react';
import './Testimonials.css';

const Testimonials = () => {
    const testimonials = [
        {
            id: 1,
            text: 'GalenAI has made my anatomy revision so much easier. The AI tutor gives crisp explanations and the flashcards actually stick. I\'m saving hours every week, and I can focus on clinics.',
            accent: 'anatomy',
            name: 'Arjun Sharma',
            meta: '3rd Year, AIIMS Delhi',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun'
        },
        {
            id: 2,
            text: 'As a 2nd‑year student juggling multiple subjects, GalenAI\'s personalised guidance is a lifesaver. It helps me understand complex topics without drowning in lectures, and the Q‑banks show me where I stand.',
            accent: 'personalised guidance',
            name: 'Priya Iyer',
            meta: '2nd Year, CMC Vellore',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya'
        },
        {
            id: 3,
            text: 'The clinical cases on GalenAI helped me apply theory to real patients. It feels like I\'m preparing for internship already. My confidence in case presentations has skyrocketed.',
            accent: 'clinical cases',
            name: 'Rahul Patel',
            meta: 'Final Year, MAMC Delhi',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul'
        },
        {
            id: 4,
            text: 'I was overwhelmed by the syllabus. GalenAI breaks it down into manageable bits and offers active recall exercises. I love that it aligns with our textbooks and exam patterns.',
            accent: 'active recall',
            name: 'Sneha Reddy',
            meta: '1st Year, St. John\'s Med College',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha'
        }
    ];

    const highlightAccent = (text, accent) => {
        const parts = text.split(accent);
        return (
            <>
                {parts[0]}
                <span className="accent">{accent}</span>
                {parts[1]}
            </>
        );
    };

    return (
        <section className="testimonials-section" id="testimonials">
            <div className="testimonials-container">
                <div className="section-label">TESTIMONIALS</div>
                <h2 className="section-heading">What our students say</h2>

                <div className="testimonials-grid">
                    {testimonials.map((testimonial) => (
                        <article key={testimonial.id} className="testimonial-card">
                            <span className="quote-icon">"</span>
                            <p className="testimonial-text">
                                {highlightAccent(testimonial.text, testimonial.accent)}
                            </p>
                            <div className="testimonial-footer">
                                <img
                                    className="avatar"
                                    src={testimonial.avatar}
                                    alt={testimonial.name}
                                />
                                <div className="student-info">
                                    <span className="student-name">{testimonial.name}</span>
                                    <span className="student-meta">{testimonial.meta}</span>
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
