import React, { useState, useEffect } from "react";
import { useClerk } from '@clerk/clerk-react';
import './styles/PendingAds.css';
import axios from 'axios'
import { Link } from "react-router-dom";

function PendingAds() {
    const { user } = useClerk();
    const userId = user?.id;
    const [pendingAds, setPendingAds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showMore, setShowMore] = useState(false);

    useEffect(() => {
      const fetchPendingAds = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`https://yepper-backend.onrender.com/api/accept/user-pending/${userId}`);
                setPendingAds(response.data);
                setLoading(false);
            } catch (err) {
                setError('Error fetching pending ads');
                setLoading(false);
            }
        };

        fetchPendingAds();
    }, [userId]);

    if (loading) return <p>Loading your pending ads...</p>;
    if (error) return <p>{error}</p>;

    const adsToShow = showMore ? pendingAds.slice().reverse() : pendingAds.slice().reverse().slice(0, 3);

    return (
        <div className="object user-pending-ads-page">
            <h2>Your Pending Ads</h2>
            <div className="title">
                <h4>{pendingAds.length}</h4>
                <h3>Pending Ads</h3>
            </div>
            <div className="updates">
                {pendingAds.length > 0 ? (
                    adsToShow.map((ad, index) => (
                        <div key={index} className="update">
                            {ad.imageUrl && <img src={`https://yepper-backend.onrender.com${ad.imageUrl}`} alt="Ad Image" className="ad-image" />}
                            {ad.pdfUrl && <a href={`https://yepper-backend.onrender.com${ad.pdfUrl}`} target="_blank" rel="noopener noreferrer" className="ad-pdf">View PDF</a>}
                            {ad.videoUrl && (
                                <video controls className="ad-video">
                                <source src={`https://yepper-backend.onrender.com${ad.videoUrl}`} type="video/mp4" />
                                Your browser does not support the video tag.
                                </video>
                            )}
                            <div className="word">
                                <label>{ad.businessName}</label>
                                <p className="ad-description">{ad.adDescription.substring(0, 50)}...</p>
                            </div>
                            <p><strong>Location:</strong> {ad.businessLocation}</p>
                            {/* <p><strong>Description:</strong> {ad.adDescription}</p>
                            <p><strong>Categories:</strong> {ad.selectedCategories.map(cat => cat.categoryName).join(', ')}</p>
                            <p><strong>Spaces:</strong> {ad.selectedSpaces.map(space => space.spaceType).join(', ')}</p>
                            <p><strong>Status:</strong> {ad.approved ? 'Approved' : 'Pending Approval'}</p> */}
                        </div>
                    ))
                ) : (
                    <p>You have no pending ads at the moment.</p>
                )}
            </div>
            <Link to='/ads-dashboard' className='showMore'>
                Show more
                <img src='https://cdn-icons-png.flaticon.com/128/8213/8213522.png' alt='' />
            </Link>
        </div>
    );
}

export default PendingAds;
