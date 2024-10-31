// src/pages/TermsAndConditions.js

import React from 'react';
import './LegalPages.css';
import BackButton from '../components/backToPreviusButton';

function TermsAndConditions() {
  return (
    <div className="terms-page legal-page">
        <BackButton />
        <div className="terms-container legal-container">
            <h1 className="terms-title legal-title">Terms and Conditions</h1>
            <p className="terms-subtitle legal-subtitle">Effective Date: [Insert Date]</p>
            <section>
            <h2 className="terms-heading">1. Acceptance of Terms</h2>
            <p className="terms-text">
                By accessing or using Yepper, you agree to comply with these Terms and Conditions. If you do not agree, you are not permitted to use Yepper.
            </p>
            </section>
            {/* Additional sections here */}
            <section>
            <h2 className="terms-heading">10. Contact Information</h2>
            <p className="terms-text">
                For any questions or concerns regarding these Terms, please contact us at <a href="mailto:support@yepper.com" className="terms-link">support@yepper.com</a>.
            </p>
            </section>
        </div>
    </div>
  );
}

export default TermsAndConditions;
