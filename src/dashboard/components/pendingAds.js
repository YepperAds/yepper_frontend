import React, { useState, useEffect } from "react";
import { useClerk } from '@clerk/clerk-react';

function PendingAds() {
    const { user } = useClerk();
    const [pendingAds, setPendingAds] = useState([]);

    useEffect(() => {
        const fetchAds = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/importAds/projects/${user.id}`);
            const data = await response.json();
            setPendingAds(data.pendingAds);
        } catch (error) {
            console.error('Error fetching ads:', error);
        }
        };

        fetchAds();
    }, [user]);

    return (
        <div>
            <h2>Pending Ads</h2>
            {pendingAds.length ? (
                pendingAds.map((ad) => (
                <div key={ad._id} className="pending-ad">
                    <h3>{ad.businessName}</h3>
                    <p>{ad.businessLocation}</p>
                    <p>{ad.adDescription}</p>

                    <h4>Selected Websites</h4>
                    {ad.selectedWebsites.map((website) => (
                        <div key={website._id}>
                            <p>{website.websiteName} - <a href={website.websiteLink}>{website.websiteLink}</a></p>
                        </div>
                    ))}

                    <h4>Selected Categories</h4>
                    {ad.selectedCategories.map((category) => (
                        <div key={category._id}>
                            <p>{category.categoryName} - {category.description}</p>
                        </div>
                    ))}

                    <h4>Selected Spaces</h4>
                    {ad.selectedSpaces.map((space) => (
                        <div key={space._id}>
                            <p>Type: {space.spaceType}, Price: ${space.price}, Availability: {space.availability}</p>
                        </div>
                    ))}
                </div>
                ))
            ) : (
                <p>No pending ads</p>
            )}
        </div>
    )
}

export default PendingAds;
