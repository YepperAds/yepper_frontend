import React, { useState, useEffect } from "react";
import { useClerk } from '@clerk/clerk-react';
import { Link, useNavigate } from "react-router-dom";
import { ChevronRight, Eye, MousePointer, Globe, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

function MixedAds({ setLoading }) {
    const { user } = useClerk();
    const userId = user?.id;
    const navigate = useNavigate();
    const [mixedAds, setMixedAds] = useState([]);
    const [error, setError] = useState(null);
    const [selectedFilter, setSelectedFilter] = useState('all');

    useEffect(() => {
        const fetchMixedAds = async () => {
            try {
                setLoading(true);
                if (!userId) {
                    setLoading(false);
                    return;
                }

                const response = await fetch(`http://localhost:5000/api/accept/mixed/${userId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch ads');
                }

                const ads = await response.json();
                setMixedAds(ads);
            } catch (error) {
                setError('Failed to load ads');
            } finally {
                setLoading(false);
            }
        };

        fetchMixedAds();
    }, [userId]);

    const formatNumber = (number) => {
        if (number >= 1000 && number < 1000000) {
            return (number / 1000).toFixed(1) + 'K';
        } else if (number >= 1000000) {
            return (number / 1000000).toFixed(1) + 'M';
        }
        return number;
    };

    const getFilteredAds = () => {
        const reversed = mixedAds.slice().reverse();
        return selectedFilter === 'all' 
            ? reversed 
            : reversed.filter(ad => ad.status === selectedFilter);
    };

    const getStatusColor = (status) => {
        return status === 'approved' 
            ? 'bg-gradient-to-r from-green-500 to-green-600'
            : 'bg-gradient-to-r from-green-500 to-green-600';
    };

    return (
        <div className="w-full bg-white rounded-lg shadow-md container mx-auto px-4 py-8 md:py-16">
            {/* Header Section */}
            <div className="p-4 border-b border-gray-100">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center justify-center gap-5">
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
                            {mixedAds.length}
                        </h3>
                        <h4 className="text-sm font-medium text-gray-600">
                            Active Campaigns
                        </h4>
                    </div>
                    <motion.button 
                        className="flex items-center justify-center gap-5 text-blue-950 font-bold"
                        onClick={() => navigate('/projects')}
                    >
                        <Globe className="w-6 h-6 text-green-500" />
                        Switch to projects
                    </motion.button>
                </div>

                <div className="flex gap-2">
                    {['all', 'approved', 'pending'].map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setSelectedFilter(filter)}
                            className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                                selectedFilter === filter
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            {filter.charAt(0).toUpperCase() + filter.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                {mixedAds.length > 0 ? (
                    getFilteredAds().map((ad, index) => (
                        <div
                            key={index}
                            className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col h-[280px]"
                        >
                            <div className="relative h-40">
                                {ad.videoUrl ? (
                                    <video 
                                        autoPlay 
                                        loop 
                                        muted 
                                        onTimeUpdate={(e) => {
                                            if (e.target.currentTime >= 6) e.target.currentTime = 0;
                                        }}
                                        className="w-full h-full object-cover"
                                    >
                                        <source src={ad.videoUrl} type="video/mp4" />
                                    </video>
                                ) : (
                                    <img 
                                        src={ad.imageUrl} 
                                        alt={ad.businessName}
                                        className="w-full h-full object-cover"
                                    />
                                )}
                                <div className="absolute top-2 right-2">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(ad.status)}`}>
                                        {ad.status === 'approved' ? 'Live' : 'In Review'}
                                    </span>
                                </div>
                            </div>

                            <div className="p-3 flex flex-col flex-grow">
                                <h4 className="text-sm font-semibold text-gray-800 mb-2">
                                    {ad.businessName}
                                </h4>

                                <div className="flex-grow">
                                    {ad.status === 'approved' ? (
                                        <div className="flex justify-between mb-3 text-xs">
                                            <div className="flex items-center gap-1">
                                                <Eye className="w-3 h-3 text-blue-500" />
                                                <span className="text-gray-600">
                                                    {formatNumber(ad.views)} views
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <MousePointer className="w-3 h-3 text-green-500" />
                                                <span className="text-gray-600">
                                                    {formatNumber(ad.clicks)} clicks
                                                </span>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="mb-3 text-xs text-gray-500">
                                            Campaign is under review
                                        </div>
                                    )}
                                </div>

                                <Link 
                                    to={`/${ad.status === 'approved' ? 'approved' : 'approved'}-detail/${ad._id}`}
                                    className="w-full flex items-center justify-center gap-1 px-3 py-2 bg-[#3bb75e] hover:bg-green-500 hover:-translate-y-0.5 text-white sm:text-base font-bold rounded-md transition-all duration-300"
                                >
                                    View Campaign
                                    <ChevronRight className="w-3 h-3" />
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full flex flex-col items-center justify-center py-8">
                        <Clock className="w-8 h-8 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-500">
                            No active campaigns yet
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default MixedAds;