import React, { useState, useEffect } from 'react';
import { useClerk } from '@clerk/clerk-react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Plus, Globe, ChevronRight, Layout, Users, ArrowUpRight, Loader2 } from 'lucide-react';
import Header from '../components/header';

function Projects() {
    const { user } = useClerk();
    const [websites, setWebsites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedFilter, setSelectedFilter] = useState('all');

    const ownerId = user?.id;

    useEffect(() => {
        const fetchWebsites = async () => {
            try {
                const response = await axios.get(`https://yepper-backend.onrender.com/api/websites/${ownerId}`);
                setWebsites(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.response ? err.response.data.message : err.message);
                setLoading(false);
            }
        };

        if (ownerId) {
            fetchWebsites();
        }
    }, [ownerId]);

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <Loader2 className="w-12 h-12 text-gray-500 animate-spin" />
            </div>
        );
    }

    const getFilteredWebsites = () => {
        const reversed = websites.slice().reverse();
        if (selectedFilter === 'all') return reversed;
        // Add more filter conditions here if needed
        return reversed;
    };

    return (
        <div className="w-full bg-white rounded-lg shadow-md container mx-auto px-4 py-8 md:py-16">
            {/* Header Section */}
            <div className="p-4 border-b border-gray-100">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center justify-center gap-5">
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
                            {websites.length}
                        </h3>
                        <h4 className="text-sm font-medium text-gray-600">
                            Active Websites
                        </h4>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                {websites.length > 0 ? (
                    getFilteredWebsites().map((website) => (
                        <div
                            key={website._id}
                            className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col h-[280px]"
                        >
                            <div className="relative h-40 bg-gradient-to-br from-blue-50 to-green-50 p-4">
                                <div className="flex justify-between">
                                    {website.imageUrl ? (
                                        <img 
                                            src={website.imageUrl} 
                                            alt={website.websiteName}
                                            className="w-16 h-16 object-contain rounded-lg"
                                        />
                                    ) : (
                                        <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center">
                                            <Globe className="w-8 h-8 text-gray-400" />
                                        </div>
                                    )}
                                    <div className="flex flex-col items-end">
                                        <span className="px-2 py-1 rounded-full text-xs font-medium text-white bg-green-500">
                                            Active
                                        </span>
                                        <a 
                                            href={website.websiteLink} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="mt-2 flex items-center text-sm text-gray-600 hover:text-gray-800"
                                        >
                                            <Globe className="w-4 h-4 mr-1" />
                                            Visit Site
                                            <ArrowUpRight className="w-3 h-3 ml-1" />
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 flex flex-col flex-grow">
                                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                                    {website.websiteName}
                                </h4>

                                <div className="flex-grow">
                                    <div className="flex justify-between mb-3 text-sm">
                                        <div className="flex items-center gap-1">
                                            <Layout className="w-4 h-4 text-green-500" />
                                            <span className="text-gray-600">
                                                5 Categories
                                            </span>
                                        </div>
                                        {/* <div className="flex items-center gap-1">
                                            <Users className="w-4 h-4 text-green-500" />
                                            <span className="text-gray-600">
                                                2.5K Visitors
                                            </span>
                                        </div> */}
                                    </div>
                                </div>

                                <Link 
                                    to={`/website/${website._id}`}
                                    className="w-full flex items-center justify-center gap-1 px-3 py-2 bg-[#3bb75e] hover:bg-green-500 hover:-translate-y-0.5 text-white font-bold rounded-md transition-all duration-300"
                                >
                                    View
                                    <ChevronRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full flex flex-col items-center justify-center py-8">
                        <Globe className="w-16 h-16 text-gray-400 mb-4" />
                        <h2 className="text-xl font-semibold mb-2 text-gray-800">
                            No Websites Yet
                        </h2>
                        <p className="text-sm text-gray-500 mb-4">
                            Start by adding a new website to track your projects.
                        </p>
                        <Link 
                            to="/website"
                            className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-all duration-300 shadow-md"
                        >
                            <Plus className="w-4 h-4" />
                            Create First Website
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Projects;