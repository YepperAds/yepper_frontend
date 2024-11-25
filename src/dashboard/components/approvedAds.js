// import React, { useState, useEffect } from "react";
// import { useClerk } from '@clerk/clerk-react';
// import { Link } from "react-router-dom";
// import './styles/ApprovedAds.css';

// function ApprovedAds({ setLoading }) {
//     const { user } = useClerk();
//     const userId = user?.id;
//     const [approvedAds, setApprovedAds] = useState([]);
//     const [error, setError] = useState(null);
//     const [showMore, setShowMore] = useState(false);

//     useEffect(() => {
//         const fetchApprovedAdsAwaitingConfirmation = async () => {
//             try {
//                 setLoading(true);
//                 if (!userId) {
//                     setLoading(false);
//                     return;
//                 }

//                 const response = await fetch(`https://yepper-backend.onrender.com/api/accept/approved-awaiting-confirmation/${userId}`);
//                 if (!response.ok) {
//                     throw new Error('Failed to fetch approved ads');
//                 }

//                 const ads = await response.json();
//                 setApprovedAds(ads);
//             } catch (error) {
//                 setError('Failed to load ads');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchApprovedAdsAwaitingConfirmation();
//     }, [userId]);

//     const adsToShow = showMore ? approvedAds.slice().reverse() : approvedAds.slice().reverse().slice(0, 3);

//     return (
//         <div className="object approved-ads-container">
//             <div className="title">
//                 <h4>{approvedAds.length}</h4>
//                 <h3>Approved Ads</h3>
//             </div>
//             <div className="updates">
//                 {approvedAds.length > 0 ? (
//                     adsToShow.map((ad, index) => (
//                         <div key={index} className='update'>
//                             <div className='impressions'>
//                                 <p><strong>Views:</strong> {ad.views}</p>
//                                 <p><strong>Clicks:</strong> {ad.clicks}</p>
//                             </div>
//                             {ad.videoUrl ? (
//                                 <div className="video-background">
//                                     <video autoPlay loop muted onTimeUpdate={(e) => {
//                                         if (e.target.currentTime >= 6) e.target.currentTime = 0;
//                                     }} className="background-video">
//                                         <source src={`https://yepper-backend.onrender.com${ad.videoUrl}`} type="video/mp4" />
//                                     </video>
//                                     <div className="overlay">
//                                         <h4 className="business-name">{ad.businessName}</h4>
//                                     </div>
//                                 </div>
//                             ) : (
//                                 <div className="image-container">
//                                     <img src={`https://yepper-backend.onrender.com${ad.imageUrl}`} alt="Ad" className="ad-image" />
//                                     <h4 className="business-name">{ad.businessName}</h4>
//                                 </div>
//                             )}
//                             <div className="ad-content">
//                                 <Link to={`/approved-detail/${ad._id}`} className="view-button">View</Link>
//                             </div>
//                         </div>
//                     ))
//                 ) : (
//                     <p className="no-ads-message">No approved ads yet</p>
//                 )}
//             </div>
//             <Link to='/approved-dashboard' className='showMore'>
//                 Show more
//                 <img src='https://cdn-icons-png.flaticon.com/128/8213/8213522.png' alt='' />
//             </Link>
//         </div>
//     );
// }

// export default ApprovedAds;

import React, { useState, useEffect } from "react";
import { useClerk } from '@clerk/clerk-react';
import { Link } from "react-router-dom";
import './styles/ApprovedAds.css';

function ApprovedAds({ setLoading }) {
    const { user } = useClerk();
    const userId = user?.id;
    const [approvedAds, setApprovedAds] = useState([]);
    const [error, setError] = useState(null);
    const [showMore, setShowMore] = useState(false);

    useEffect(() => {
        const fetchApprovedAdsAwaitingConfirmation = async () => {
            try {
                setLoading(true);
                if (!userId) {
                    setLoading(false);
                    return;
                }

                const response = await fetch(`https://yepper-backend.onrender.com/api/accept/approved-awaiting-confirmation/${userId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch approved ads');
                }

                const ads = await response.json();
                setApprovedAds(ads);
            } catch (error) {
                setError('Failed to load ads');
            } finally {
                setLoading(false);
            }
        };

        fetchApprovedAdsAwaitingConfirmation();
    }, [userId]);

    const formatNumber = (number) => {
        if (number >= 1000 && number < 1000000) {
            return (number / 1000).toFixed(1) + 'K'; // e.g., 1.2K
        } else if (number >= 1000000) {
            return (number / 1000000).toFixed(1) + 'M'; // e.g., 1.2M
        }
        return number; // Return the number as is if less than 1000
    };

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
                            <div className='impressions'>
                                <p><strong>Views:</strong> {formatNumber(ad.views)}</p>
                                <p><strong>Clicks:</strong> {formatNumber(ad.clicks)}</p>
                            </div>
                            {ad.videoUrl ? (
                                <div className="video-background">
                                    <video autoPlay loop muted onTimeUpdate={(e) => {
                                        if (e.target.currentTime >= 6) e.target.currentTime = 0;
                                    }} className="background-video">
                                        <source src={ad.videoUrl} type="video/mp4" />
                                    </video>
                                    <div className="overlay">
                                        <h4 className="business-name">{ad.businessName}</h4>
                                    </div>
                                </div>
                            ) : (
                                <div className="image-container">
                                    <img src={ad.imageUrl} alt="Ad" className="ad-image" />
                                    <h4 className="business-name">{ad.businessName}</h4>
                                </div>
                            )}
                            <div className="ad-content">
                                <Link to={`/approved-detail/${ad._id}`} className="view-button">View</Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="no-ads-message">No approved ads yet</p>
                )}
            </div>
            <Link to='/approved-dashboard' className='showMore'>
                Show more
                <img src='https://cdn-icons-png.flaticon.com/128/8213/8213522.png' alt='' />
            </Link>
        </div>
    );
}

export default ApprovedAds;
