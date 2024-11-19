// PendingAds.js
import React, { useState, useEffect } from "react";
import { useClerk } from '@clerk/clerk-react';
import './styles/PendingAds.css';
import axios from 'axios'
import { Link } from "react-router-dom";

function PendingAds({ setLoading }) {
    const { user } = useClerk();
    const userId = user?.id;
    const [pendingAds, setPendingAds] = useState([]);
    const [error, setError] = useState(null);
    const [showMore, setShowMore] = useState(false);

    useEffect(() => {
      const fetchPendingAds = async () => {
            try {
                setLoading(true);
                setLoading(true);
                const response = await axios.get(`https://yepper-backend.onrender.com/api/accept/user-pending/${userId}`);
                setPendingAds(response.data);
            } catch (err) {
                setError('Error fetching pending ads');
            } finally {;
                setLoading(false);
            }
        };

        fetchPendingAds();
    }, [userId]);

    if (error) return <p>{error}</p>;

    const adsToShow = showMore ? pendingAds.slice().reverse() : pendingAds.slice().reverse().slice(0, 3);

    return (
        <div className="object pending-ads-container">
            <div className="title">
                <h4>{pendingAds.length}</h4>
                <h3>Pending Ads</h3>
            </div>
            <div className="updates">
                {pendingAds.length > 0 ? (
                    adsToShow.map((ad, index) => (
                        <div key={index} className='update'>
                            {ad.videoUrl ? (
                                <div className="video-background">
                                    <video autoPlay loop muted onTimeUpdate={(e) => {
                                        if (e.target.currentTime >= 6) e.target.currentTime = 0;
                                    }} className="background-video">
                                        <source src={`https://yepper-backend.onrender.com${ad.videoUrl}`} type="video/mp4" />
                                    </video>
                                    <div className="overlay">
                                        <h4 className="business-name">{ad.businessName}</h4>
                                    </div>
                                </div>
                            ) : (
                                <div className="image-container">
                                    <img src={`https://yepper-backend.onrender.com${ad.imageUrl}`} alt="Ad" className="ad-image" />
                                    <h4 className="business-name">{ad.businessName}</h4>
                                </div>
                            )}
                            <div className="ad-content">
                                <p className="ad-description"><strong>Description:</strong> {ad.adDescription.substring(0, 50)}...</p>
                                <Link to={`/ad-detail/${ad._id}`} className="view-button">View</Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="no-ads-message">You have no pending ads at the moment.</p>
                )}
            </div>
            <Link to='/pending-dashboard' className='showMore'>
                Show more
                <img src='https://cdn-icons-png.flaticon.com/128/8213/8213522.png' alt='' />
            </Link>
        </div>
    );
}

export default PendingAds;