import React from 'react';
import './Metrics.css';

const Metrics = () => {
    const metrics = [
        { number: 1, text: 'more effective study sessions', highlight: '~30–40%' },
        { number: 2, text: 'fewer resource switches per topic', highlight: '~50%' },
        { number: 3, text: 'stronger concept connections across subjects', highlight: '2–3×' },
        { number: 4, text: 'more confidence in viva and case discussions', highlight: '2×' }
    ];

    return (
        <section className="metrics-section">
            <div className="metrics-container">
                {/* Pencil-Style Title */}
                <h2 className="metrics-title">
                    Study like a doctor, not an exam candidate
                </h2>

                {/* Metrics Grid */}
                <div className="metrics-grid">
                    {metrics.map((metric) => (
                        <div key={metric.number} className="metric-row">
                            <div className="metric-number-circle">
                                {metric.number}
                            </div>
                            <div className="metric-text">
                                <span className="metric-highlight">{metric.highlight}</span> {metric.text}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Metrics;
