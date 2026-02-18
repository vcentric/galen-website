import React, { useState, useEffect, useRef } from 'react';
import './Features.css';

const Features = () => {
    const features = [
        {
            id: 'ai-tutor',
            label: 'AI Tutor',
            title: 'Your personal medical tutor, on demand',
            description: 'Ask questions the way you actually think. GalenAI explains concepts step-by-step, aligned with standard textbooks — so you stop guessing and start understanding.',
            cta: 'Ask GalenAI now'
        },
        {
            id: 'qbanks',
            label: 'Q-Banks',
            title: 'Practice questions that tell you why, not just what',
            description: 'Every question becomes a learning moment. Get explanations that connect concepts, highlight traps, and show how examiners think — not just the right option.',
            cta: 'Practice smart questions'
        },
        {
            id: 'flashcards',
            label: 'Flashcards',
            title: 'Remember what actually matters',
            description: 'High-yield flashcards built from concepts — not random facts. Perfect for quick revisions, spaced recall, and busy days.',
            cta: 'Revise in minutes'
        },
        {
            id: 'cases',
            label: 'Clinical Cases',
            title: 'Learn medicine the way it\'s practiced',
            description: 'Work through real-world clinical scenarios. Build diagnostic thinking, connect theory to patients, and prepare for viva and ward discussions — not just MCQs.',
            cta: 'Solve a clinical case'
        },
        {
            id: 'coming-soon',
            label: 'Coming Soon',
            title: 'More clinical intelligence on the way.',
            description: 'We\'re building deeper tools to support your journey from student to confident clinician.',
            cta: 'Join the waitlist',
            comingSoonItems: [
                {
                    title: 'Analytics',
                    subtitle: 'Your learning, mapped and measured',
                    description: 'Track what you\'ve mastered, spot weak areas early, and follow a clear competency path—topic by topic.'
                },
                {
                    title: 'Viva Agent',
                    subtitle: 'Practice viva like a real exam',
                    description: 'Rapid-fire questioning, instant feedback, and model answers—so you speak with clarity in clinics and exams.'
                },
                {
                    title: 'Productivity Agent',
                    subtitle: 'Turn your day into a study plan',
                    description: 'Convert your syllabus + time into a realistic daily routine—revision, Qs, flashcards, and reminders done for you.'
                }
            ]
        }
    ];

    const [activeIndex, setActiveIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const [isSwapping, setIsSwapping] = useState(false);
    const timerRef = useRef(null);
    const startTimeRef = useRef(null);
    const DURATION = 4800; // 4.8 seconds per feature

    const activeFeature = features[activeIndex];

    const activateFeature = (index) => {
        setIsSwapping(true);
        setActiveIndex(index);
        setProgress(0);
        startTimeRef.current = Date.now();

        setTimeout(() => setIsSwapping(false), 100);
    };

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        startTimeRef.current = Date.now();

        const updateProgress = () => {
            const elapsed = Date.now() - startTimeRef.current;
            const newProgress = Math.min((elapsed / DURATION) * 100, 100);
            setProgress(newProgress);

            if (newProgress >= 100) {
                // Move to next feature
                const nextIndex = (activeIndex + 1) % features.length;
                activateFeature(nextIndex);
            }
        };

        timerRef.current = setInterval(updateProgress, 16);

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [activeIndex]);

    // Scroll reveal animation for phone
    useEffect(() => {
        const section = document.getElementById('features');
        if (!section) return;

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) {
            section.classList.add('is-inview');
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        section.classList.add('is-inview');

                        // Start bob after entrance animation completes
                        setTimeout(() => {
                            section.classList.add('is-bobbing');
                        }, 950);

                        observer.disconnect();
                    }
                });
            },
            { threshold: 0.25 }
        );

        observer.observe(section);

        return () => observer.disconnect();
    }, []);

    return (
        <section className="features-section" id="features">
            <div className="features-wrap">
                <div className="features-card">
                    {/* Left Column */}
                    <div className="features-left">
                        {/* Feature Pills */}
                        <div className="features-pills" role="tablist" aria-label="Feature toggles">
                            {features.map((feature, index) => (
                                <button
                                    key={feature.id}
                                    className={`feature-pill ${activeIndex === index ? 'is-active' : ''} ${feature.disabled ? 'is-disabled' : ''}`}
                                    role="tab"
                                    aria-selected={activeIndex === index}
                                    aria-disabled={feature.disabled}
                                    onClick={() => activateFeature(index)}
                                    onMouseEnter={() => !feature.disabled && activateFeature(index)}
                                >
                                    {feature.label}
                                </button>
                            ))}
                        </div>

                        {/* Content */}
                        <div className={`features-content ${isSwapping ? 'is-swapping' : ''}`} aria-live="polite">
                            <h2 className="feature-title">{activeFeature.title}</h2>
                            <p className="feature-desc">{activeFeature.description}</p>
                            <button className="feature-cta">{activeFeature.cta}</button>

                            {/* Progress Bar */}
                            <div className="feature-progress" aria-hidden="true">
                                <div
                                    className="progress-fill"
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="features-right">
                        {/* Floating Icons Ribbon */}
                        <div className="features-ribbon" aria-hidden="true">
                            <div className="ribbon-track">
                                <span className="ribbon-icon">🧬</span>
                                <span className="ribbon-icon">📚</span>
                                <span className="ribbon-icon">🫀</span>
                                <span className="ribbon-icon">🩻</span>
                                <span className="ribbon-icon">🧠</span>
                                <span className="ribbon-icon">💊</span>
                                <span className="ribbon-icon">🩺</span>
                                <span className="ribbon-icon">📈</span>
                                <span className="ribbon-icon">🔬</span>
                            </div>
                        </div>

                        {/* Phone Mockup */}
                        <div className="features-phone">
                            <div className="phone-frame">
                                {features.map((feature, index) => (
                                    <div
                                        key={feature.id}
                                        className={`phone-media ${activeIndex === index ? 'is-active' : ''}`}
                                    >
                                        {feature.id === 'coming-soon' ? (
                                            <div className="coming-soon-content">
                                                {feature.comingSoonItems.map((item, idx) => (
                                                    <div key={idx} className="cs-item">
                                                        <div className="cs-item-title">{item.title}</div>
                                                        <div className="cs-item-subtitle">{item.subtitle}</div>
                                                        <div className="cs-item-desc">{item.description}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="media-placeholder">
                                                <div className="placeholder-text">{feature.label}</div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Features;
