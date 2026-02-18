import React, { useState, useEffect } from 'react';
import './Hero.css';
import galenaiLogo from '../assets/galenai-logo.png';

const PHRASES = [
    "for daily medical learning",
    "to crack any medical exam",
    "that saves time for you"
];

const Hero = () => {
    const [textIndex, setTextIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [displayText, setDisplayText] = useState('');
    const [delta, setDelta] = useState(100);
    const [isExpanded, setIsExpanded] = useState(false);
    const [spawnedKeywords, setSpawnedKeywords] = useState([]);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [hoverTimer, setHoverTimer] = useState(null);
    const [keywordIndex, setKeywordIndex] = useState(0);

    const keywordPhrases = [
        "Clarity over chaos",
        "Avoid cognitive overload",
        "Mentoring, not more videos",
        "Know where you stand",
        "Know what to study next",
        "Think like a doctor",
        "Assess. Apply.",
        "Make time for yourself"
    ];

    useEffect(() => {
        let ticker = setInterval(() => {
            tick();
        }, delta);

        return () => clearInterval(ticker);
    }, [displayText, isDeleting]);

    const tick = () => {
        let i = textIndex % PHRASES.length;
        let fullText = PHRASES[i];
        let updatedText = isDeleting
            ? fullText.substring(0, displayText.length - 1)
            : fullText.substring(0, displayText.length + 1);

        setDisplayText(updatedText);

        if (isDeleting) {
            setDelta(50);
        }

        if (!isDeleting && updatedText === fullText) {
            setIsDeleting(true);
            setDelta(2000); // Wait before deleting
        } else if (isDeleting && updatedText === '') {
            setIsDeleting(false);
            setTextIndex(textIndex + 1);
            setDelta(100);
        } else if (!isDeleting && updatedText !== fullText) {
            setDelta(100);
        }
    };

    const handlePlayClick = () => {
        setIsExpanded(!isExpanded);
    };

    const spawnKeyword = (x, y) => {
        const phrase = keywordPhrases[keywordIndex % keywordPhrases.length];
        const rotation = Math.random() * 10 - 5; // Random rotation between -5 and 5 degrees

        const newKeyword = {
            id: Date.now(),
            text: phrase,
            x: x,
            y: y,
            rotation: rotation
        };

        setSpawnedKeywords(prev => [...prev, newKeyword]);
        setKeywordIndex(prev => prev + 1);

        // Remove keyword after 8 seconds
        setTimeout(() => {
            setSpawnedKeywords(prev => prev.filter(k => k.id !== newKeyword.id));
        }, 8000);
    };

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        setMousePosition({ x, y });

        // Clear existing timer
        if (hoverTimer) {
            clearTimeout(hoverTimer);
        }

        // Set new timer for 2.5 seconds
        const timer = setTimeout(() => {
            spawnKeyword(x, y);
        }, 2500);

        setHoverTimer(timer);
    };

    const handleMouseLeave = () => {
        if (hoverTimer) {
            clearTimeout(hoverTimer);
            setHoverTimer(null);
        }
    };

    const handleClick = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        spawnKeyword(x, y);
    };

    return (
        <section
            className="hero-section"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
        >
            {/* Lined Paper Background */}
            <div className="notebook-background"></div>

            {/* Pencil Keywords - Dynamically spawned */}
            <div className="pencil-keywords">
                {spawnedKeywords.map((keyword) => (
                    <div
                        key={keyword.id}
                        className="pencil-word written"
                        style={{
                            left: `${keyword.x}px`,
                            top: `${keyword.y}px`,
                            transform: `translate(-50%, -50%) rotate(${keyword.rotation}deg)`
                        }}
                    >
                        {keyword.text}
                    </div>
                ))}
            </div>
            <div className="hero-container">

                {/* Left Column: Text */}
                <div className="hero-content">
                    {/* Audience Toggle */}
                    <div className="audience-toggle">
                        <button className="toggle-option active">Students</button>
                        <button className="toggle-option">Institutions</button>
                    </div>

                    {/* Exam Keywords */}
                    <div className="exam-keywords">
                        <span>NEET PG</span>
                        <span>NEET SS</span>
                        <span>EMREE</span>
                        <span>FMGE</span>
                    </div>

                    <h1 className="hero-headline">
                        Your personal AI companion <br />
                        <span className="typing-text">&gt; {displayText}</span><span className="cursor">|</span>
                    </h1>

                    <p className="hero-description">
                        GalenAI is your AI medical mentor that explains, tests, and guides you,
                        so you spend less time planning and more time understanding.
                    </p>

                    <div className="hero-cta-row">
                        <a href="#ask" className="btn btn-primary">Ask GalenAI</a>
                        <a href="#download" className="btn btn-secondary">Download Now</a>
                    </div>

                    <div className="trust-indicator">
                        <div className="trust-rating">
                            <div className="stars">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <svg key={star} width="16" height="16" viewBox="0 0 24 24" fill={star <= 4 ? "#eb602d" : "none"} stroke={star === 5 ? "#eb602d" : "none"} strokeWidth="2">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                ))}
                            </div>
                            <span className="rating-text">4.2 / 5</span>
                        </div>
                        <div className="trust-partners">
                            <span className="backed-by">Backed by</span>
                            <span className="partner-logo">Kerala Startup Mission</span>
                            <span className="partner-logo">Google Cloud</span>
                        </div>
                    </div>
                </div>

                {/* Right Column: Visual */}
                <div className={`hero-visual ${isExpanded ? 'expanded' : ''}`}>
                    <div className="phone-container">
                        {/* Phone Mockup */}
                        <div className="phone-mockup" onClick={handlePlayClick}>
                            <div className="phone-frame">
                                <div className="phone-screen">
                                    {/* Play Button Overlay - Only when not expanded */}
                                    {!isExpanded && (
                                        <div className="play-button-overlay">
                                            <div className="play-button">
                                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M8 5V19L19 12L8 5Z" fill="white" />
                                                </svg>
                                            </div>
                                        </div>
                                    )}

                                    {/* Video Content - YouTube Video */}
                                    {isExpanded && (
                                        <div className="video-content">
                                            <iframe
                                                src="https://www.youtube.com/embed/1l0-dJic1dE?autoplay=1&mute=0&controls=1&rel=0"
                                                className="phone-video"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            ></iframe>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Floating Overlays - Outside phone, only visible when not expanded */}
                        {!isExpanded && (
                            <>
                                <div className="float-card card-reminder">
                                    <div className="card-icon">🔔</div>
                                    <div className="card-text">
                                        <span className="card-title">Revision reminder</span>
                                        <span className="card-subtitle">Upper Limb – Today</span>
                                    </div>
                                </div>

                                <div className="float-card card-metric">
                                    <div className="card-text">
                                        <span className="card-title">60%</span>
                                        <span className="card-subtitle">Competency achieved</span>
                                    </div>
                                </div>

                                <div className="float-card card-insight">
                                    <div className="card-icon">⚠️</div>
                                    <div className="card-text">
                                        <span className="card-title">Weak area detected</span>
                                        <span className="card-subtitle">Shoulder Joint</span>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Hero;
