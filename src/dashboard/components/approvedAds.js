import React, { useState, useEffect } from "react";
import { useClerk } from '@clerk/clerk-react';
import './styles/ApprovedAds.css'; // Import the CSS styles

function ApprovedAds() {
    const { user } = useClerk();
    const [approvedAds, setApprovedAds] = useState([]);
    const [selectedAd, setSelectedAd] = useState(null);

    useEffect(() => {
        const fetchAds = async () => {
        try {
            const response = await fetch(`https://yepper-backend.onrender.com/api/importAds/projects/${user.id}`);
            const data = await response.json();
            setApprovedAds(data.approvedAds);
        } catch (error) {
            console.error('Error fetching ads:', error);
        }
        };

        fetchAds();
    }, [user]);

    const openModal = (ad) => {
        setSelectedAd(ad);
    };

    const closeModal = () => {
        setSelectedAd(null);
    };

    return (
        <div className="approved-ads-container">
            <h2 className="title">Approved Ads</h2>
            <div className="ads-grid">
                {approvedAds.length ? (
                    approvedAds.map((ad) => (
                        <div key={ad._id} className="ad-card">
                            <h3 className="business-name">{ad.businessName}</h3>
                            <p className="business-location">{ad.businessLocation}</p>
                            <p className="ad-description">{ad.adDescription.substring(0, 50)}...</p>
                            <button className="view-more-btn" onClick={() => openModal(ad)}>View More</button>
                        </div>
                    ))
                ) : (
                    <p className="no-ads-message">No approved ads yet</p>
                )}
            </div>

            {selectedAd && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h3 className="modal-title">{selectedAd.businessName}</h3>
                        <p className="modal-subtitle">{selectedAd.businessLocation}</p>
                        <p className="modal-description">{selectedAd.adDescription}</p>

                        <div className="modal-section">
                            <h4 className="section-title">Selected Websites</h4>
                            <ul className="website-list">
                                {selectedAd.selectedWebsites.map((website) => (
                                    <li key={website._id} className="website-item">
                                        <span className="website-name">{website.websiteName}</span>
                                        <a className="website-link" href={website.websiteLink} target="_blank" rel="noopener noreferrer">{website.websiteLink}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="modal-section">
                            <h4 className="section-title">Selected Categories</h4>
                            <ul className="category-list">
                                {selectedAd.selectedCategories.map((category) => (
                                    <li key={category._id} className="category-item">
                                        <span className="category-name">{category.categoryName}</span> - {category.description}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="modal-section">
                            <h4 className="section-title">Selected Spaces</h4>
                            <ul className="space-list">
                                {selectedAd.selectedSpaces.map((space) => (
                                    <li key={space._id} className="space-item">
                                        <span className="space-type">Type: {space.spaceType}</span>
                                        <span className="space-price">Price: ${space.price}</span>
                                        <span className="space-availability">Availability: {space.availability}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <button className="close-modal-btn" onClick={closeModal}>Close</button>
                    </div>
                </div>
            )}

        </div>
    );
}

export default ApprovedAds;
