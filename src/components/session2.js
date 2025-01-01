// session2.js
import React, { useState } from "react";
import AdsContainer from "./AdsContainer";
import LoadingSpinner from './LoadingSpinner';

function Session2() {
    const [loading, setLoading] = useState(true);

    // Update loading state based on children
    const handleLoading = (status) => {
        setLoading(status);
    };

    return (
        <div className='ad-waitlist min-h-screen bg-gradient-to-br from-white to-green-50'>
            {loading && <LoadingSpinner />}
            <AdsContainer setLoading={handleLoading} />
        </div>
    );
}

export default Session2;
