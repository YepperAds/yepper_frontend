import React from 'react';
import './styles/AdSuccess.css';

const AdSuccess = () => {
  return (
    <div className="ad-success-container">
      <div className="ad-success-card">
        <h1 className="success-message">🎉 Ad Published Successfully!</h1>
        <p className="detail-message">
          Your ad has been published and is being processed for detailed tracking. You can now move to your dashboard to view the status of your published ad.
        </p>
        <button className="dashboard-button">Go to Dashboard</button>
      </div>
    </div>
  );
};

export default AdSuccess;
