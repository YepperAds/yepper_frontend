// ApprovedAdDetail.js
import React, { useState, useEffect } from 'react';
import { useParams} from 'react-router-dom';

function ApprovedAdDetail() {
    const { adId } = useParams();
    const [ad, setAd] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAdDetails = async () => {
            try {
                const response = await fetch(`https://yepper-backend.onrender.com/api/accept/ad-details/${adId}`);

                if (!response.ok) {
                    throw new Error('Failed to fetch ad details');
                }

                const adData = await response.json();
                setAd(adData);
            } catch (error) {
                console.error('Error fetching ad details:', error);
                setError('Failed to load ad details');
            }
        };

        fetchAdDetails();
    }, [adId]);

    if (error) {
        return <p>{error}</p>;
    }

    if (!ad) {
        return <p>Loading...</p>;
    }

    return (
        <div className="ad-detail-container">
            <h2>{ad.businessName}</h2>
            <p><strong>Location:</strong> {ad.businessLocation}</p>
            <p><strong>Description:</strong> {ad.adDescription}</p>
            {ad.imageUrl && <img src={`https://yepper-backend.onrender.com${ad.imageUrl}`} alt="Ad Image" />}
            {ad.pdfUrl && <a href={`https://yepper-backend.onrender.com${ad.pdfUrl}`} target="_blank" rel="noopener noreferrer">View PDF</a>}
            {ad.videoUrl && <video controls><source src={`https://yepper-backend.onrender.com${ad.videoUrl}`} type="video/mp4" /></video>}
        </div>
    );
}

export default ApprovedAdDetail;
