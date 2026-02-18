import React, { useState } from 'react';
import './FinalCTA.css';

const FinalCTA = () => {
    const [inputValue, setInputValue] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue.trim()) {
            // Redirect to app or handle query
            window.open('https://galenai.io', '_blank');
        }
    };

    return (
        <section className="final-cta-section">
            <div className="final-cta-container">
                {/* AI Avatar/Icon with breathing animation */}
                <div className="cta-icon-wrapper">
                    <div className="cta-icon">
                        <img
                            src="/.gemini/antigravity/brain/4e68e5d5-3983-4ba4-8688-1b05b1373014/uploaded_media_1769629980449.png"
                            alt="GalenAI Mascot"
                            className="mascot-image"
                        />
                    </div>
                </div>

                {/* Header Content */}
                <div className="cta-header">
                    <h2 className="cta-heading">
                        Learn medicine better. <span className="highlight">Every single day.</span>
                    </h2>
                    <p className="cta-subheading">
                        Ask GalenAI anything — concepts, cases, revisions, or what to study next.
                    </p>
                </div>

                {/* Ask-AI Input Bar */}
                <form className="cta-input-form" onSubmit={handleSubmit}>
                    <div className={`cta-input-wrapper ${isFocused ? 'focused' : ''}`}>
                        <input
                            type="text"
                            className="cta-input"
                            placeholder="Ask GalenAI a doubt, concept, or clinical question…"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                        />
                        <button type="submit" className="cta-send-btn" aria-label="Send question">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                    <p className="cta-input-caption">Instant, source-backed medical explanations</p>
                </form>

                {/* Download Buttons */}
                <div className="cta-download-section">
                    <div className="cta-download-buttons">
                        <a
                            href="https://apps.apple.com/in/app/galenai/id6755653561"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="download-btn app-store"
                        >
                            <svg className="btn-icon" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                            </svg>
                            <div className="btn-text">
                                <span className="btn-label">Download on the</span>
                                <span className="btn-store">App Store</span>
                            </div>
                        </a>
                        <a
                            href="https://play.google.com/store/apps/details?id=com.galenai.galenai"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="download-btn google-play"
                        >
                            <svg className="btn-icon" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                            </svg>
                            <div className="btn-text">
                                <span className="btn-label">Get it on</span>
                                <span className="btn-store">Google Play</span>
                            </div>
                        </a>
                    </div>
                    <p className="cta-trust-line">Used by medical students across India</p>
                </div>
            </div>
        </section>
    );
};

export default FinalCTA;
