import React, { useState, useEffect } from "react";
import { useClerk } from '@clerk/clerk-react';
import './styles/ApprovedAds.css'; // Import the CSS file for styles

function ApprovedAds() {
    const { user } = useClerk();
    const [approvedAds, setApprovedAds] = useState([]);
    const [selectedAd, setSelectedAd] = useState(null); // For the modal
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        const fetchAds = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/importAds/projects/${user.id}`);
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
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedAd(null);
    };

    return (
        <div className="approved-ads-container">
            <h2>Approved Ads</h2>
            {approvedAds.length ? (
                approvedAds.map((ad) => (
                <div key={ad._id} className="approved-ad" onClick={() => openModal(ad)}>
                    <h3>{ad.businessName}</h3>
                    <p>{ad.businessLocation}</p>
                    <p>{ad.adDescription.substring(0, 50)}...</p>
                </div>
                ))
            ) : (
                <p>No approved ads yet</p>
            )}

            {modalOpen && selectedAd && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <span className="close-button" onClick={closeModal}>&times;</span>
                        <h3>{selectedAd.businessName}</h3>
                        <p>{selectedAd.businessLocation}</p>
                        <p>{selectedAd.adDescription}</p>

                        <h4>Selected Websites</h4>
                        {selectedAd.selectedWebsites.map((website) => (
                            <div key={website._id}>
                                <p>{website.websiteName} - <a href={website.websiteLink}>{website.websiteLink}</a></p>
                            </div>
                        ))}

                        <h4>Selected Categories</h4>
                        {selectedAd.selectedCategories.map((category) => (
                            <div key={category._id}>
                                <p>{category.categoryName} - {category.description}</p>
                            </div>
                        ))}

                        <h4>Selected Spaces</h4>
                        {selectedAd.selectedSpaces.map((space) => (
                            <div key={space._id}>
                                <p>Type: {space.spaceType}, Price: ${space.price}, Availability: {space.availability}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default ApprovedAds;
