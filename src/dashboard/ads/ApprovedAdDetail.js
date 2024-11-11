import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useClerk } from '@clerk/clerk-react';
import axios from 'axios';
import './styles/ApprovedAdDetail.css';

function ApprovedAdDetail() {
    const { adId } = useParams();
    const navigate = useNavigate();
    const { user } = useClerk();
    const userId = user?.id;

    const [ad, setAd] = useState(null);             // Main ad details
    const [relatedAds, setRelatedAds] = useState([]); // List of related ads
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [muted, setMuted] = useState(true);        // Video mute state
    const [isPaused, setIsPaused] = useState(false); // Video pause state
    const [isZoomed, setIsZoomed] = useState(false);
    const videoRef = useRef(null);

    useEffect(() => {
        const fetchAdDetails = async () => {
            try {
                // Fetch main ad details by adId
                const adResponse = await axios.get(`http://localhost:5000/api/accept/ad-details/${adId}`);
                setAd(adResponse.data);

                // Fetch related ads for the right sidebar
                const relatedResponse = await axios.get(`http://localhost:5000/api/accept/approved-awaiting-confirmation/${userId}`);
                setRelatedAds(relatedResponse.data.filter((otherAd) => otherAd._id !== adId));

                setLoading(false);
            } catch (err) {
                setError('Failed to load ad details or related ads');
                setLoading(false);
            }
        };

        if (userId) fetchAdDetails();
    }, [adId, userId]);

    const confirmAd = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/accept/confirm/${adId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
            });
            if (response.ok) {
                const data = await response.json();
                alert(`Ad confirmed and now live! Total Price: ${data.totalPrice}`);
                // Update the ad's confirmation status
                setAd(prevAd => ({ ...prevAd, confirmed: true }));
            } else {
                throw new Error('Failed to confirm ad');
            }
        } catch (error) {
            console.error('Error confirming ad:', error);
            alert('Failed to confirm ad. Please try again later.');
        }
    };

    const toggleMute = () => setMuted(!muted);

    const togglePause = () => {
        if (videoRef.current) {
            if (isPaused) {
                videoRef.current.play();
            } else {
                videoRef.current.pause();
            }
            setIsPaused(!isPaused);
        }
    };

    const toggleZoom = () => setIsZoomed(!isZoomed);

    const handleAdClick = (newAdId) => {
        navigate(`/ad-detail/${newAdId}`);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="ad-detail-container">
            <div className="ad-main-content">
                {ad.videoUrl ? (
                    <div className="video-container" onClick={togglePause}>
                        <video
                            ref={videoRef}
                            src={`http://localhost:5000${ad.videoUrl}`}
                            autoPlay
                            loop
                            muted={muted}
                            className="ad-video"
                        />
                        <div className="video-controls">
                            <button className="mute-button" onClick={(e) => { e.stopPropagation(); toggleMute(); }}>
                                {muted ? '🔇' : '🔊'}
                            </button>
                        </div>
                        <div className="pause-overlay">
                            {isPaused ? '▶️' : '⏸️'}
                        </div>
                    </div>
                ) : (
                    <div className={`image-container ${isZoomed ? 'zoomed' : ''}`} onClick={toggleZoom}>
                        <img
                            src={`http://localhost:5000${ad.imageUrl}`}
                            alt="Ad Visual"
                            className="ad-image"
                        />
                    </div>
                )}
                <div className="ad-info">
                    <h2>{ad.businessName}</h2>
                    <p><strong>Location:</strong> {ad.businessLocation}</p>
                    <p><strong>Description:</strong> {ad.adDescription}</p>

                    <h3>Websites</h3>
                    <ul>
                        {ad.selectedWebsites.map((website) => (
                            <li key={website._id}>
                                <p><strong>Name:</strong> {website.websiteName}</p>
                                <p><strong>Link:</strong> <a href={website.websiteLink} target="_blank" rel="noopener noreferrer">{website.websiteLink}</a></p>
                            </li>
                        ))}
                    </ul>

                    <h3>Categories</h3>
                    <ul>
                        {ad.selectedCategories.map((category) => (
                            <li key={category._id}>
                                <p><strong>ID:</strong> {category.ownerId}</p>
                                <p><strong>Name:</strong> {category.categoryName}</p>
                                <p><strong>Price:</strong> ${category.price}</p>
                            </li>
                        ))}
                    </ul>

                    <h3>Spaces</h3>
                    <ul>
                        {ad.selectedSpaces.map((space) => (
                            <li key={space._id}>
                                <p><strong>Email:</strong> {space.webOwnerEmail}</p>
                                <p><strong>Type:</strong> {space.spaceType}</p>
                                <p><strong>Price:</strong> ${space.price}</p>
                            </li>
                        ))}
                    </ul>

                    {ad.pdfUrl && <a href={`http://localhost:5000${ad.pdfUrl}`} target="_blank" rel="noopener noreferrer">View PDF</a>}
                </div>
                {!ad.confirmed && (
                    <button onClick={confirmAd} className="confirm-ad-button">
                        Confirm Ad
                    </button>
                )}
            </div>
            <div className="related-ads">
                <h3>Related Ads</h3>
                {relatedAds.map(otherAd => (
                    <div key={otherAd._id} className="related-ad" onClick={() => handleAdClick(otherAd._id)}>
                        {otherAd.imageUrl && <img src={`http://localhost:5000${otherAd.imageUrl}`} alt="Related Ad" />}
                        <p>{otherAd.businessName}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ApprovedAdDetail;