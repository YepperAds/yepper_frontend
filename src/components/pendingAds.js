import React, { useState, useEffect } from "react";
import { useClerk } from '@clerk/clerk-react';
import axios from 'axios';
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
                const response = await axios.get(`https://yepper-backend.onrender.com/api/accept/user-pending/${userId}`);
                setPendingAds(response.data);
            } catch (err) {
                setError('Error fetching pending ads');
            } finally {
                setLoading(false);
            }
        };

        fetchPendingAds();
    }, [userId]);

    if (error) return <p className="text-red-500">{error}</p>;

    const adsToShow = showMore ? pendingAds.slice().reverse() : pendingAds.slice().reverse().slice(0, 3);

    return (
        <div className="flex flex-col w-full max-w-xl bg-white rounded-lg shadow-lg transition-all duration-300 hover:-translate-y-2 overflow-hidden">
            <div className="flex justify-between items-center p-6 pb-4 border-b border-gray-100">
                <h3 className="text-2xl font-bold text-gray-800">{pendingAds.length}</h3>
                <h4 className="text-lg font-semibold bg-blue-500 text-white px-4 py-2 rounded-full">
                    Pending Ads
                </h4>
            </div>
            
            <div className="flex flex-col gap-6 p-6">
                {pendingAds.length > 0 ? (
                    adsToShow.map((ad, index) => (
                        <div key={index} className="relative bg-gray-50 rounded-lg overflow-hidden shadow-md transition-all duration-300 flex flex-col">
                            {ad.videoUrl ? (
                                <div className="relative w-full h-64 flex items-center justify-center overflow-hidden">
                                    <video 
                                        autoPlay 
                                        loop 
                                        muted 
                                        onTimeUpdate={(e) => {
                                            if (e.target.currentTime >= 6) e.target.currentTime = 0;
                                        }}
                                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
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
                                <div className="relative w-full h-64 flex items-center justify-center overflow-hidden">
                                    <img 
                                        src={ad.imageUrl} 
                                        alt="Ad" 
                                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                    />
                                    <h4 className="absolute bottom-4 text-white text-lg font-semibold text-center bg-black/50 px-4 py-2 rounded-full">
                                        {ad.businessName}
                                    </h4>
                                </div>
                            )}
                            <div className="p-4 text-center bg-gray-50">
                                <Link 
                                    to={`/ad-detail/${ad._id}`}
                                    className="block w-full bg-blue-500 text-white py-3 px-6 rounded font-semibold transition-all duration-300 hover:bg-orange-500 hover:-translate-y-1"
                                >
                                    View
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-xl text-orange-500 text-center py-8">
                        You have no pending ads at the moment.
                    </p>
                )}
            </div>
            
            <Link 
                to="/pending-dashboard" 
                className="flex items-center justify-center p-4 text-blue-500 font-semibold transition-all duration-300 hover:text-orange-500"
            >
                Show more
                <img 
                    src="https://cdn-icons-png.flaticon.com/128/8213/8213522.png" 
                    alt="" 
                    className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                />
            </Link>
        </div>
    );
}

export default PendingAds;