import React from 'react';
import './TrustedBy.css';

const TrustedBy = () => {
    const institutions = [
        'AIIMS',
        'CMC Vellore',
        'JIPMER',
        'St. John\'s Medical College',
        'Bangalore Medical College',
        'KMC',
        'MVJ Medical College'
    ];

    return (
        <section className="trusted-by-section">
            <div className="trusted-by-container">
                <h2 className="trusted-by-title">
                    Trusted by students from the top colleges in India
                </h2>

                <div className="logo-strip-wrapper">
                    <div className="logo-strip">
                        {/* First set of logos */}
                        {institutions.map((institution, index) => (
                            <div key={`logo-1-${index}`} className="logo-item">
                                {institution}
                            </div>
                        ))}
                        {/* Duplicate set for seamless loop */}
                        {institutions.map((institution, index) => (
                            <div key={`logo-2-${index}`} className="logo-item">
                                {institution}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TrustedBy;
