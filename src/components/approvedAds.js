import React, { useState, useEffect } from "react";
import { useClerk } from '@clerk/clerk-react';
import { Link } from "react-router-dom";

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
            return (number / 1000).toFixed(1) + 'K';
        } else if (number >= 1000000) {
            return (number / 1000000).toFixed(1) + 'M';
        }
        return number;
    };

    const adsToShow = showMore ? approvedAds.slice().reverse() : approvedAds.slice().reverse().slice(0, 3);

    return (
        <div className="flex flex-col w-full max-w-[450px] bg-white rounded-lg shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl overflow-hidden">
            <div className="flex justify-between items-center p-6 pb-4 border-b border-gray-100">
                <h3 className="text-2xl font-bold text-gray-800">{approvedAds.length}</h3>
                <h4 className="text-lg font-semibold bg-blue-500 text-white px-4 py-2 rounded-full">
                    Approved Ads
                </h4>
            </div>

            <div className="flex flex-col gap-6 p-6">
                {approvedAds.length > 0 ? (
                    adsToShow.map((ad, index) => (
                        <div key={index} className="relative bg-gray-50 rounded-lg overflow-hidden shadow-md transition-all duration-300 flex flex-col">
                            <div className="flex justify-between p-4 bg-white border-b border-gray-100 flex-wrap gap-2">
                                <p className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-full text-sm">
                                    <strong>Views:</strong> {formatNumber(ad.views)}
                                </p>
                                <p className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-full text-sm">
                                    <strong>Clicks:</strong> {formatNumber(ad.clicks)}
                                </p>
                            </div>

                            {ad.videoUrl ? (
                                <div className="relative w-full h-[250px] flex items-center justify-center overflow-hidden group">
                                    <video 
                                        autoPlay 
                                        loop 
                                        muted 
                                        onTimeUpdate={(e) => {
                                            if (e.target.currentTime >= 6) e.target.currentTime = 0;
                                        }}
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    >
                                        <source src={ad.videoUrl} type="video/mp4" />
                                    </video>
                                    <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4 flex justify-center">
                                        <h4 className="text-white text-lg font-semibold text-center bg-black/50 px-4 py-2 rounded-full">
                                            {ad.businessName}
                                        </h4>
                                    </div>
                                </div>
                            ) : (
                                <div className="relative w-full h-[250px] flex items-center justify-center overflow-hidden group">
                                    <img 
                                        src={ad.imageUrl} 
                                        alt="Ad" 
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                    <h4 className="absolute bottom-4 text-white text-lg font-semibold text-center bg-black/50 px-4 py-2 rounded-full">
                                        {ad.businessName}
                                    </h4>
                                </div>
                            )}

                            <div className="p-4 text-center bg-gray-50">
                                <Link 
                                    to={`/approved-detail/${ad._id}`}
                                    className="block w-full py-3 px-6 bg-blue-500 text-white font-semibold rounded hover:bg-orange-500 transition-all duration-300 hover:-translate-y-1"
                                >
                                    View
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-xl text-orange-500 text-center py-8">
                        No approved ads yet
                    </p>
                )}
            </div>

            <Link 
                to='/approved-dashboard' 
                className="flex items-center justify-center p-4 text-blue-500 font-semibold hover:text-orange-500 transition-colors duration-300"
            >
                Show more
                <img 
                    src='https://cdn-icons-png.flaticon.com/128/8213/8213522.png' 
                    alt='' 
                    className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                />
            </Link>
        </div>
    );
}

export default ApprovedAds;