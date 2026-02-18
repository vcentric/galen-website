import React from 'react';
import './Comparison.css';
import galenIcon from '../assets/galenai-icon.png';

const Comparison = () => {
    const features = [
        {
            title: 'Daily personalised learning companion',
            legacy: false,
            generic: false,
            openevidence: false,
            galen: true
        },
        {
            title: 'Competency‑based continuous learning',
            legacy: false,
            generic: false,
            openevidence: false,
            galen: true
        },
        {
            title: 'Verified sources & curriculum alignment',
            legacy: false,
            generic: false,
            openevidence: true,
            galen: true
        },
        {
            title: 'Medical‑only trained AI',
            legacy: false,
            generic: false,
            openevidence: 'limited',
            galen: true
        },
        {
            title: 'Adaptive practice (MCQs, flashcards & cases)',
            legacy: false,
            generic: false,
            openevidence: false,
            galen: true
        },
        {
            title: 'Affordability (under ₹20k/year)',
            legacy: false,
            generic: false,
            openevidence: true,
            galen: true
        },
        {
            title: 'Ecosystem‑friendly (supports faculty & classrooms)',
            legacy: false,
            generic: false,
            openevidence: false,
            galen: true
        }
    ];

    const renderIcon = (hasFeature) => {
        if (hasFeature === true) {
            return <span className="icon-check">✓</span>;
        } else if (hasFeature === 'limited') {
            return <span className="icon-limited">Limited</span>;
        }
        return <span className="icon-cross">✗</span>;
    };

    return (
        <section className="comparison-section" id="comparison">
            <div className="comp-container">
                <h2 className="comp-heading">GalenAI builds confidence in medicine</h2>
                <p className="comp-subheading">unlike Legacy Apps or Generic AI Tools</p>

                {/* Column Labels Above Table */}
                <div className="column-labels-row">
                    <div></div>
                    <div className="column-label">Traditional Learning Apps</div>
                    <div className="column-label">Generic AI</div>
                    <div className="column-label">Clinical Decision Tools</div>
                    <div></div>
                </div>

                <div className="comparison-table-wrapper">
                    <table className="comparison-table">
                        <thead>
                            <tr className="header-row">
                                <th className="feature-header"></th>
                                <th className="competitor-header">
                                    <div className="header-logo-container">
                                        <img src="/traditional.png" alt="Traditional Learning Apps" className="competitor-logo" />
                                    </div>
                                </th>
                                <th className="competitor-header">
                                    <div className="header-logo-container">
                                        <img src="/genericai.png" alt="Generic AI" className="competitor-logo" />
                                    </div>
                                </th>
                                <th className="competitor-header">
                                    <div className="header-logo-container">
                                        <img src="/openevidence.png" alt="OpenEvidence" className="competitor-logo" />
                                    </div>
                                </th>
                                <th className="galen-header">
                                    <div className="header-logo-container">
                                        <img src={galenIcon} alt="GalenAI" className="galen-logo" />
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {features.map((feature, index) => (
                                <tr key={index} className="feature-row">
                                    <td className="feature-name">{feature.title}</td>
                                    <td className="feature-value">{renderIcon(feature.legacy)}</td>
                                    <td className="feature-value">{renderIcon(feature.generic)}</td>
                                    <td className="feature-value">{renderIcon(feature.openevidence)}</td>
                                    <td className="feature-value galen-col">{renderIcon(feature.galen)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default Comparison;
