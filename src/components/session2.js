// session2.js
import React, { useState } from "react";
import ApprovedAds from './approvedAds';
import LoadingSpinner from './LoadingSpinner';

function Session2() {
    const [loading, setLoading] = useState(true);

    // Update loading state based on children
    const handleLoading = (status) => {
        setLoading(status);
    };

    return (
        <div className='ad-waitlist min-h-screen flex bg-gradient-to-br from-white to-green-50'>
            {loading && <LoadingSpinner />}
            <ApprovedAds setLoading={handleLoading} />
        </div>
    );
}

export default Session2;
