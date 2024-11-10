// session2.js
import React, { useState } from "react";
import './styles/session2.css';
import ApprovedAds from "./approvedAds";
import PendingAds from "./pendingAds";
import AdsContainer from "./AdsContainer";
import LoadingSpinner from '../LoadingSpinner';
import WebsContainer from "./WebsContainer";

function Session2() {
    const [loading, setLoading] = useState(true);

    // Update loading state based on children
    const handleLoading = (status) => {
        setLoading(status);
    };

    return (
        <div className='posts-container'>
            {loading && <LoadingSpinner />}
            <ApprovedAds setLoading={handleLoading} />
            <PendingAds setLoading={handleLoading} />
            <AdsContainer setLoading={handleLoading} />
        </div>
    );
}

export default Session2;
