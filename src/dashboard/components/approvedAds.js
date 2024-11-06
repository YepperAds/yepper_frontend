import React, { useState, useEffect } from "react";
import { useClerk } from '@clerk/clerk-react';
import './styles/ApprovedAds.css';
import { Link } from "react-router-dom";

function ApprovedAds() {
    const { user } = useClerk();
    const userId = user?.id;
    const [approvedAds, setApprovedAds] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showMore, setShowMore] = useState(false);

    useEffect(() => {
        const fetchApprovedAdsAwaitingConfirmation = async () => {
          try {
            if (!userId) {
              console.log("User ID not found, aborting fetch.");
              setLoading(false);
              return;
            }
        
            console.log("Fetching ads for user ID:", userId);
            const response = await fetch(`https://yepper-backend.onrender.com/api/accept/approved-awaiting-confirmation/${userId}`);
            
            if (!response.ok) {
              throw new Error('Failed to fetch approved ads');
            }
        
            const ads = await response.json();
            console.log('Fetched ads:', ads); // Log the fetched ads
            setApprovedAds(ads);
          } catch (error) {
            console.error('Error fetching approved ads:', error);
            setError('Failed to load ads');
          } finally {
            setLoading(false);
          }
        };
        
        fetchApprovedAdsAwaitingConfirmation();
    }, [userId]);

    const adsToShow = showMore ? approvedAds.slice().reverse() : approvedAds.slice().reverse().slice(0, 3);

    return (
        <div className="object approved-ads-container">
            <div className="title">
                <h4>{approvedAds.length}</h4>
                <h3>Approved Ads</h3>
            </div>
            <div className="updates">
                {approvedAds.length > 0 ? (
                    adsToShow.map((ad, index) => (
                        <div key={index} className='update'>
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
                            {/* <p className="business-location">{ad.businessLocation}</p> */}
                            {/* <Link className="view-more-btn" >View More</Link> */}
                        </div>
                    ))
                ) : (
                    <p className="no-ads-message">No approved ads yet</p>
                )}
            </div>
            <Link to='/ads-dashboard' className='showMore'>
                Show more
                <img src='https://cdn-icons-png.flaticon.com/128/8213/8213522.png' alt='' />
            </Link>
        </div>
    );
}

export default ApprovedAds;
