// src/pages/PrivacyPolicy.js

import React from 'react';
import './LegalPages.css';
import BackButton from '../components/backToPreviusButton';

function PrivacyPolicy() {
  return (
    <div className="privacy-page legal-page">
        <BackButton />
        <div className="privacy-container legal-container">
            <h1 className="privacy-title legal-title">Privacy Policy</h1>
            <p className="privacy-subtitle legal-subtitle">Effective Date: [Insert Date]</p>
            <section>
            <h2 className="privacy-heading">1. Information Collection</h2>
            <p className="privacy-text">
                Yepper collects personal and non-personal information to enhance and support our services. Personal data is kept secure.
            </p>
            </section>
            {/* Additional sections here */}
            <section>
            <h2 className="privacy-heading">9. Contact Information</h2>
            <p className="privacy-text">
                For inquiries regarding this Privacy Policy, please contact us at <a href="mailto:support@yepper.com" className="privacy-link">support@yepper.com</a>.
            </p>
            </section>
        </div>
    </div>
  );
}

export default PrivacyPolicy;
