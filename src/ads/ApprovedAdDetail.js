import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useClerk } from '@clerk/clerk-react';
import { 
    Volume2, 
    VolumeX, 
    Play, 
    Minimize2,
    MapPin, 
    Globe, 
    Tags, 
    Folder, 
    Eye,
    MousePointer,
    ChevronsDown,
    ChevronLeft,
    Expand,
    X
} from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner';

function ApprovedAdDetail() {
    const { adId } = useParams();
    const navigate = useNavigate();
    const { user } = useClerk();
    const userId = user?.id;
    const [ad, setAd] = useState(null);
    const [relatedAds, setRelatedAds] = useState([]);
    const [filteredAds, setFilteredAds] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [muted, setMuted] = useState(true);
    const [isPaused, setIsPaused] = useState(false);
    const videoRef = useRef(null);
    const [isVideoFullScreen, setIsVideoFullScreen] = useState(false);
    const [isImageFullScreen, setIsImageFullScreen] = useState(false);
    const videoContainerRef = useRef(null);
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [selectedAd, setSelectedAd] = useState(false);

    useEffect(() => {
        const fetchAdDetails = async () => {
            try {
                const adResponse = await axios.get(`http://localhost:5000/api/accept/ad-details/${adId}`);
                setAd(adResponse.data);

                const relatedResponse = await axios.get(`http://localhost:5000/api/accept/mixed/${userId}`);
                const relatedAdsData = relatedResponse.data.filter((otherAd) => otherAd._id !== adId);
                setRelatedAds(relatedAdsData);
                setFilteredAds(relatedAdsData);

                setLoading(false);
            } catch (err) {
                setError('Failed to load ad details or related ads');
                setLoading(false);
            }
        };

        if (userId) fetchAdDetails();
    }, [adId, userId]);

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        const matchedAds = relatedAds.filter((otherAd) =>
            otherAd.businessName.toLowerCase().includes(query)
        );
        setFilteredAds(matchedAds);
    };

    const toggleVideoFullScreen = () => {
        setIsVideoFullScreen(!isVideoFullScreen);
    };

    const toggleImageFullScreen = () => {
        setIsImageFullScreen(!isImageFullScreen);
    };

    const confirmAd = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/accept/confirm/${adId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
            });
            if (response.ok) {
                const data = await response.json();
                alert(`Ad confirmed and now live! Total Price: ${data.totalPrice}`);
                setAd(prevAd => ({ ...prevAd, confirmed: true }));
            } else {
                throw new Error('Failed to confirm ad');
            }
        } catch (error) {
            console.error('Error confirming ad:', error);
            alert('Failed to confirm ad. Please try again later.');
        }
    };

    const handleCancel = () => {
        setSelectedAd(false);
    }

    const initiatePayment = async () => {
        setLoading(true);
        setError(null); // Reset error message before a new attempt
    
        try {
            const response = await axios.post('https://yepper-backend.onrender.com/api/accept/initiate-payment', {
                adId: ad._id,
                amount: ad.totalPrice,
                email,
                phoneNumber,
                userId
            });
        
            if (response.data.paymentLink) {
                console.log('Redirecting to payment link:', response.data.paymentLink);
                window.location.href = response.data.paymentLink;
            } else {
                setError('Payment link generation failed. Please try again.');
            }
        } catch (error) {
            if (error.response) {
                // Backend returned a specific error message
                console.error('Error response:', error.response.data);
        
                if (error.response.status === 400) {
                setError(`Bad Request: ${error.response.data.message}`);
                } else if (error.response.status === 500) {
                setError(`Server Error: ${error.response.data.message || 'An error occurred on the server.'}`);
                } else {
                setError('Unexpected error: Please try again later.');
                }
            } else if (error.request) {
                // No response was received from the backend
                console.error('No response received:', error.request);
                setError('Network error: Unable to reach the server. Check your connection.');
            } else {
                // Any other errors (possibly in the frontend code itself)
                console.error('Error:', error.message);
                setError(`Error: ${error.message}`);
            }
        } finally {
            setLoading(false);
        }
    };

    const toggleMute = (e) => {
        e.stopPropagation();
        setMuted(!muted);
    };

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

    const handleAdClick = (newAdId) => {
        navigate(`/approved-detail/${newAdId}`);
    };

    if (loading) {
        return(
            <LoadingSpinner />
        )
    };
    if (error) return <p>{error}</p>;

    const renderAdInfo = () => {
        if (!ad) return null;

        const truncateDescription = (text, maxLength = 150) => {
            if (text.length <= maxLength) return text;
            return text.substr(0, maxLength) + '...';
        };

        return (
            <div className="ad-info-container bg-white rounded-lg shadow-md p-6 mt-4 space-y-6">
                <div className="header flex justify-between items-center border-b pb-4">
                    <div className='w-full mt-6'>
                        <h2 className="text-3xl font-bold text-blue-950">{ad.businessName}</h2>
                        <div className="flex items-center space-x-4 mt-2">
                            <div className="flex items-center space-x-2 text-gray-600">
                                <Eye className="text-[#FF4500]" size={20} />
                                <span>{ad.views} Views</span>
                            </div>
                            <div className="flex items-center space-x-2 text-gray-600">
                                <MousePointer className="text-[#FF4500]" size={20} />
                                <span>{ad.clicks} Clicks</span>
                            </div>
                        </div>
                    </div>
                    {ad.approved && !ad.confirmed && (
                        <div className='w-full mt-6'>
                            <button 
                                onClick={confirmAd} 
                                className="w-full mt-6 flex items-center justify-center px-3 py-2 rounded-lg font-bold text-white sm:text-base transition-all duration-300 bg-[#FF4500] hover:bg-orange-500 hover:-translate-y-0.5"
                            >
                                Confirm Ad
                            </button>
                        </div>
                    )}
                    {selectedAd && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                            <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
                                <div className="p-6">
                                    {/* Header with close button */}
                                    <div className="flex justify-between items-center mb-6">
                                        <h3 className="text-xl font-semibold text-gray-900">
                                            Enter Your Details to Proceed with Payment
                                        </h3>
                                        <button 
                                            onClick={handleCancel}
                                            className="text-gray-400 hover:text-gray-500 transition-colors"
                                        >
                                            <X className="h-6 w-6" />
                                        </button>
                                    </div>
                            
                                        {/* Form */}
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Email:
                                            </label>
                                            <input 
                                                type="email" 
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                                                required 
                                            />
                                        </div>
                        
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Phone Number:
                                            </label>
                                            <input 
                                                type="tel" 
                                                value={phoneNumber}
                                                onChange={(e) => setPhoneNumber(e.target.value)}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                                                required 
                                            />
                                        </div>
                            
                                        <motion.button
                                            className=" flex items-center w-full justify-center text-white px-3 py-2 rounded-lg text-sm font-bold sm:text-base bg-[#FF4500] hover:bg-orange-500 transition-colors"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={initiatePayment}
                                        >
                                            Proceed
                                        </motion.button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="description relative">
                    <h3 className="text-xl font-semibold text-blue-950 mb-2">Description</h3>
                    <p className={`text-gray-600 leading-relaxed ${!isDescriptionExpanded ? 'line-clamp-3' : ''}`}>
                        {isDescriptionExpanded ? ad.adDescription : truncateDescription(ad.adDescription)}
                    </p>
                    
                    {ad.adDescription.length > 150 && (
                        <button 
                            onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                            className="absolute bottom-0 right-0 flex items-center text-orange-500 bg-red-100 p-1 rounded-full transition"
                        >
                            <ChevronsDown size={20} />
                            <span className="text-sm ml-1">
                                {isDescriptionExpanded ? 'Show Less' : 'Read More'}
                            </span>
                        </button>
                    )}
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <h3 className="text-xl font-semibold text-blue-950 mb-2 flex items-center">
                            <MapPin className="mr-2 text-[#FF4500]" size={20} />
                            Location
                        </h3>
                        <p className="text-gray-700">{ad.businessLocation}</p>
                    </div>

                    <div className="websites-section">
                        <h3 className="text-xl font-semibold text-blue-950 mb-2 flex items-center">
                            <Globe className="mr-2 text-[#FF4500]" size={20} />
                            Websites
                        </h3>
                        <div className="space-y-2">
                            {ad.selectedWebsites.map((website) => (
                                <div key={website._id} className="bg-gray-50 p-3 rounded-lg">
                                    <p className="font-medium text-blue-950">{website.websiteName}</p>
                                    <a 
                                        href={website.websiteLink} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="text-blue-500 hover:underline text-sm"
                                    >
                                        {website.websiteLink}
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-6 mt-4">
                    <div className="categories-section">
                        <h3 className="text-xl font-semibold text-blue-950 mb-2 flex items-center">
                            <Tags className="mr-2 text-[#FF4500]" size={20} />
                            Categories
                        </h3>
                        <div className="space-y-2">
                            {ad.selectedCategories.map((category) => (
                                <div 
                                    key={category._id} 
                                    className="bg-gray-50 p-3 rounded-lg flex justify-between items-center"
                                >
                                    <span className="text-gray-800">{category.categoryName}</span>
                                    <span className="text-blue-950 font-semibold">${category.price}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* <div className="spaces-section">
                        <h3 className="text-xl font-semibold text-blue-950 mb-2 flex items-center">
                            <Folder className="mr-2 text-[#FF4500]" size={20} />
                            Spaces
                        </h3>
                        <div className="space-y-2">
                            {ad.selectedSpaces.map((space) => (
                                <div 
                                    key={space._id} 
                                    className="bg-gray-50 p-3 rounded-lg flex justify-between items-center"
                                >
                                    <span className="text-gray-800">{space.spaceType}</span>
                                    <span className="text-blue-950 font-semibold">${space.price}</span>
                                </div>
                            ))}
                        </div>
                    </div> */}
                </div>
            </div>
        );
    };

    return (
        <div className="ad-detail-youtube-style bg-white min-h-screen">
            <div className="header bg-white shadow-sm p-4 flex items-center justify-between flex-wrap">
                <div className="flex items-center mb-2 md:mb-0 gap-5">
                    <motion.button 
                        className={'flex items-center text-white p-2 rounded-full text-sm font-bold sm:text-base bg-[#FF4500] hover:bg-orange-500 transition-colors'}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/dashboard')}
                    >
                        <ChevronLeft 
                            className="text-white w-6 h-6 sm:w-8 sm:h-8" 
                            strokeWidth={2.5}
                        />
                    </motion.button>
                    <h1 className="text-lg md:text-xl font-bold text-blue-950">Ad Details</h1>
                </div>
                <input
                    type="text"
                    placeholder="Search related ads..."
                    value={searchQuery}
                    onChange={handleSearch}
                    className="px-4 py-2 border rounded-full w-full md:w-64 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
            </div>

            <div className="main-content flex flex-col lg:flex-row p-4">
                <div className="video-section lg:w-3/4 w-full pr-0 lg:pr-4">
                    {ad.videoUrl ? (
                        <div 
                            ref={videoContainerRef}
                            className={`video-container relative group 
                                ${isVideoFullScreen 
                                    ? 'fixed inset-0 z-50 w-full h-full bg-black bg-opacity-90 flex items-center justify-center' 
                                    : 'relative'}`}
                            onClick={togglePause}
                        >
                            <video
                                ref={videoRef}
                                src={ad.videoUrl}
                                autoPlay
                                loop
                                muted={muted}
                                className={`w-full rounded-lg 
                                    ${isVideoFullScreen 
                                        ? 'fixed inset-0 z-50 w-full bg-black bg-opacity-90 h-full object-contain' 
                                        : ''}`}
                            />
                            <div className="absolute top-4 right-4 space-x-2 z-10">
                                <button
                                    onClick={toggleMute}
                                    className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
                                >
                                    {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                                </button>
                                <button
                                    onClick={toggleVideoFullScreen}
                                    className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 group-hover:opacity-100"
                                >
                                    {isVideoFullScreen ? <Minimize2 size={20} /> : <Expand size={20} />}
                                </button>
                            </div>
                            {isPaused && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Play size={64} className="text-white opacity-75" />
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="relative group">
                            <img
                                src={ad.imageUrl}
                                alt="Ad Visual"
                                className={`w-full rounded-lg 
                                    ${isImageFullScreen 
                                        ? 'fixed inset-0 z-50 object-contain bg-black bg-opacity-90 w-full h-full' 
                                        : ''}`}
                            />
                            {ad.imageUrl && (
                                <button
                                    onClick={toggleImageFullScreen}
                                    className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 opacity-0 group-hover:opacity-100 z-10"
                                >
                                    {isImageFullScreen ? <Minimize2 size={20} /> : <Expand size={20} />}
                                </button>
                            )}
                        </div>
                    )}

                    {renderAdInfo()}
                </div>

                {/* Related Ads Section */}
                <div className="related-ads-section lg:w-1/4 w-full bg-gray-50 p-4 rounded-lg mt-4 lg:mt-0">
                    <h3 className="text-lg md:text-xl font-bold mb-4 text-blue-950">Related Ads</h3>
                    <div className="space-y-4">
                        {filteredAds.slice().reverse().map((otherAd) => (
                            <div
                                key={otherAd._id}
                                className="related-ad-card border border-blue-600 rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-all"
                                onClick={() => handleAdClick(otherAd._id)}
                            >
                                {otherAd.videoUrl ? (
                                    <video
                                        autoPlay
                                        loop
                                        muted
                                        className="w-full h-32 object-cover"
                                    >
                                        <source src={otherAd.videoUrl} type="video/mp4" />
                                    </video>
                                ) : (
                                    otherAd.imageUrl && (
                                        <img
                                            src={otherAd.imageUrl}
                                            alt="Related Ad"
                                            className="w-full h-32 object-cover"
                                        />
                                    )
                                )}
                                <div className="p-2 bg-white">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-medium">{otherAd.businessName}</span>
                                        <div className="flex items-center space-x-2">
                                            <span className="text-xs text-gray-600">{otherAd.views} Views</span>
                                            <span className="text-xs text-gray-600">{otherAd.clicks} Clicks</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {(isVideoFullScreen || isImageFullScreen) && (
                <button 
                    onClick={isVideoFullScreen ? toggleVideoFullScreen : toggleImageFullScreen}
                    className="fixed top-4 right-4 z-50 bg-white/50 hover:bg-white/75 p-2 rounded-full"
                >
                    <Minimize2 size={24} />
                </button>
            )}
        </div>
    );
}

export default ApprovedAdDetail;