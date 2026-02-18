import React, { useEffect, useRef, useState } from 'react';

import './TeamPage.css';

const TeamPage = () => {
    const timelineRef = useRef(null);
    const timelineLineRef = useRef(null);
    const [timelineProgress, setTimelineProgress] = useState(0);

    useEffect(() => {
        // Intersection Observer for timeline items
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach(item => observer.observe(item));

        // Scroll handler for progressive timeline drawing
        const handleScroll = () => {
            if (timelineRef.current && timelineLineRef.current) {
                const timelineSection = timelineRef.current;
                const rect = timelineSection.getBoundingClientRect();
                const windowHeight = window.innerHeight;

                // Calculate how much of the timeline is visible
                const sectionTop = rect.top;
                const sectionHeight = rect.height;
                const visibleStart = Math.max(0, windowHeight - sectionTop);
                const visibleAmount = Math.min(visibleStart, sectionHeight);
                const progress = Math.max(0, Math.min(100, (visibleAmount / sectionHeight) * 100));

                setTimelineProgress(progress);
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial call

        return () => {
            observer.disconnect();
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Magnetic button effect
    const handleMagneticHover = (e) => {
        const button = e.currentTarget;
        const rect = button.getBoundingClientRect();
        const buttonCenterX = rect.left + rect.width / 2;
        const buttonCenterY = rect.top + rect.height / 2;
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        const deltaX = mouseX - buttonCenterX;
        const deltaY = mouseY - buttonCenterY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        const maxDistance = 20; // 20px magnetic radius

        if (distance < maxDistance) {
            const pullStrength = (maxDistance - distance) / maxDistance;
            const moveX = deltaX * pullStrength * 0.3;
            const moveY = deltaY * pullStrength * 0.3;

            button.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }
    };

    const handleMagneticLeave = (e) => {
        const button = e.currentTarget;
        button.style.transform = 'translate(0, 0)';
    };

    return (
        <>
            <title>Our Story & Team | GalenAI</title>
            <meta name="description" content="Meet the minds behind GalenAI - built by medicos, engineers, and industry veterans shaping the future of medical learning." />

            <div className="team-page">
                {/* Hero Section */}
                <section className="team-hero">
                    <div className="team-hero-content">
                        <h1 className="team-hero-title">Meet the Minds Behind GalenAI</h1>
                        <p className="team-hero-subtitle">
                            Built by medicos, engineers, and industry veterans.
                        </p>
                    </div>
                </section>

                {/* Founders Section */}
                <section className="founders-section">
                    <div className="founders-container">
                        {/* Dr. Arun Biju */}
                        <div className="founder-card" data-tilt>
                            <div className="founder-photo-wrapper floating">
                                <img
                                    src="https://via.placeholder.com/200"
                                    alt="Dr. Arun Biju"
                                    className="founder-photo"
                                />
                            </div>
                            <h2 className="founder-name">Dr. Arun Biju</h2>
                            <p className="founder-title">COO & Medical Director</p>
                            <blockquote className="founder-quote">
                                "Medical students deserve more than static lectures. Learning should feel like guidance."
                            </blockquote>
                            <a
                                href="#"
                                className="linkedin-button magnetic"
                                onMouseMove={handleMagneticHover}
                                onMouseLeave={handleMagneticLeave}
                            >
                                <svg className="linkedin-icon" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M18.5 18.5V13.2A3.26 3.26 0 0 0 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17A1.4 1.4 0 0 1 15.71 13.57V18.5H18.5M6.88 8.56A1.68 1.68 0 0 0 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19A1.69 1.69 0 0 0 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56M8.27 18.5V10.13H5.5V18.5H8.27Z" />
                                </svg>
                                LinkedIn
                            </a>
                        </div>

                        {/* Varun Jagannathan */}
                        <div className="founder-card" data-tilt>
                            <div className="founder-photo-wrapper floating">
                                <img
                                    src="https://via.placeholder.com/200"
                                    alt="Varun Jagannathan"
                                    className="founder-photo"
                                />
                            </div>
                            <h2 className="founder-name">Varun Jagannathan</h2>
                            <p className="founder-title">CEO</p>
                            <blockquote className="founder-quote">
                                "Building the systems, structure, and execution that make good ideas real."
                            </blockquote>
                            <a
                                href="#"
                                className="linkedin-button magnetic"
                                onMouseMove={handleMagneticHover}
                                onMouseLeave={handleMagneticLeave}
                            >
                                <svg className="linkedin-icon" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M18.5 18.5V13.2A3.26 3.26 0 0 0 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17A1.4 1.4 0 0 1 15.71 13.57V18.5H18.5M6.88 8.56A1.68 1.68 0 0 0 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19A1.69 1.69 0 0 0 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56M8.27 18.5V10.13H5.5V18.5H8.27Z" />
                                </svg>
                                LinkedIn
                            </a>
                        </div>
                    </div>
                </section>

                {/* Advisors Section - Now before timeline */}
                <section className="advisors-section">
                    <div className="advisors-container">
                        <h2 className="section-title">Strategic Advisors</h2>
                        <div className="advisors-grid">
                            <div className="advisor-card" data-tilt>
                                <div className="advisor-photo-wrapper floating">
                                    <img
                                        src="https://via.placeholder.com/200"
                                        alt="Sridhar Vaidyanathan"
                                        className="advisor-photo"
                                    />
                                </div>
                                <h3 className="advisor-name">Sridhar Vaidyanathan</h3>
                                <p className="advisor-title">Advisor, Finance & Investments</p>
                                <p className="advisor-bio">
                                    Ex-Investec, Ex-BNP Paribas, Ex-Myelin Foundry | 30+ years across banking, deep tech, capital and regulatory strategy across emerging markets.
                                </p>
                                <a
                                    href="#"
                                    className="linkedin-button magnetic"
                                    onMouseMove={handleMagneticHover}
                                    onMouseLeave={handleMagneticLeave}
                                >
                                    <svg className="linkedin-icon" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M18.5 18.5V13.2A3.26 3.26 0 0 0 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17A1.4 1.4 0 0 1 15.71 13.57V18.5H18.5M6.88 8.56A1.68 1.68 0 0 0 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19A1.69 1.69 0 0 0 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56M8.27 18.5V10.13H5.5V18.5H8.27Z" />
                                    </svg>
                                    LinkedIn
                                </a>
                            </div>

                            <div className="advisor-card" data-tilt>
                                <div className="advisor-photo-wrapper floating">
                                    <img
                                        src="https://via.placeholder.com/200"
                                        alt="Dr. Sivaramakrishnan R Guruvayur"
                                        className="advisor-photo"
                                    />
                                </div>
                                <h3 className="advisor-name">Dr. Sivaramakrishnan R Guruvayur</h3>
                                <p className="advisor-title">Advisor - AI & Innovation</p>
                                <p className="advisor-bio">
                                    Global AI Policy Leader | Chief AI Scientist, Aaquarians.ai | Research Fellow, IIT Madras (CeRAI) | Member- MEG & UNESCO for Artificial Intelligence | 30+ years across applied AI & enterprise platforms.
                                </p>
                                <a
                                    href="#"
                                    className="linkedin-button magnetic"
                                    onMouseMove={handleMagneticHover}
                                    onMouseLeave={handleMagneticLeave}
                                >
                                    <svg className="linkedin-icon" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M18.5 18.5V13.2A3.26 3.26 0 0 0 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17A1.4 1.4 0 0 1 15.71 13.57V18.5H18.5M6.88 8.56A1.68 1.68 0 0 0 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19A1.69 1.69 0 0 0 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56M8.27 18.5V10.13H5.5V18.5H8.27Z" />
                                    </svg>
                                    LinkedIn
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Timeline Section */}
                <section className="timeline-section" ref={timelineRef}>
                    <div className="timeline-container">
                        <h2 className="section-title">How It All Started</h2>

                        <div className="timeline">
                            <div
                                className="timeline-line"
                                ref={timelineLineRef}
                                style={{ height: `${timelineProgress}%` }}
                            ></div>

                            {/* Milestone 1 */}
                            <div className="timeline-item timeline-right">
                                <div className="timeline-icon icon-pulse">
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6C7.8 12.16 7 10.63 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z" />
                                    </svg>
                                </div>
                                <div className="timeline-content timeline-content-orange">
                                    <h3 className="timeline-title">The "Aha" Moment</h3>
                                    <p className="timeline-date">Mid 2025</p>
                                    <p className="timeline-description">
                                        Dr. Arun realized textbooks hadn't changed, but exams had. He called Varun.
                                    </p>
                                </div>
                            </div>

                            {/* Milestone 2 */}
                            <div className="timeline-item timeline-left">
                                <div className="timeline-icon icon-pulse">
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" />
                                    </svg>
                                </div>
                                <div className="timeline-content timeline-content-dark">
                                    <h3 className="timeline-title">Building the Prototype</h3>
                                    <p className="timeline-date">Late 2025</p>
                                    <p className="timeline-description">
                                        Built the first AI Tutor. When it diagnosed a complex case simulation, the team knew they had something special.
                                    </p>
                                </div>
                            </div>

                            {/* Milestone 3 */}
                            <div className="timeline-item timeline-right">
                                <div className="timeline-icon icon-pulse">
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                                    </svg>
                                </div>
                                <div className="timeline-content timeline-content-orange">
                                    <h3 className="timeline-title">The Tribe Grows</h3>
                                    <p className="timeline-date">Late 2025</p>
                                    <p className="timeline-description">
                                        Brought in top rankers and senior engineers. A medical company at heart.
                                    </p>
                                </div>
                            </div>

                            {/* Milestone 4 */}
                            <div className="timeline-item timeline-left">
                                <div className="timeline-icon icon-pulse">
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM9.29 16.29L5.7 12.7c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0L10 14.17l6.88-6.88c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41l-7.59 7.59c-.38.39-1.02.39-1.41 0z" />
                                    </svg>
                                </div>
                                <div className="timeline-content timeline-content-dark">
                                    <h3 className="timeline-title">The Mission</h3>
                                    <p className="timeline-date">Today & Beyond</p>
                                    <p className="timeline-description">
                                        Working to ensure every student gets personalized mentorship. Empowering the next generation of doctors.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default TeamPage;
