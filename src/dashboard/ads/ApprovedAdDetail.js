import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useClerk } from '@clerk/clerk-react';
import { 
    ArrowLeft, 
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
    Expand
} from 'lucide-react';
import axios from 'axios';
import './styles/ApprovedAdDetail.css';
import cancel from  '../../assets/img/close.png';

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
                const adResponse = await axios.get(`https://yepper-backend.onrender.com/api/accept/ad-details/${adId}`);
                setAd(adResponse.data);

                const relatedResponse = await axios.get(`https://yepper-backend.onrender.com/api/accept/approved-awaiting-confirmation/${userId}`);
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

    // const confirmAd = async () => {
    //     try {
    //         const response = await fetch(`https://yepper-backend.onrender.com/api/accept/confirm/${adId}`, {
    //             method: 'PUT',
    //             headers: { 'Content-Type': 'application/json' },
    //         });
    //         if (response.ok) {
    //             const data = await response.json();
    //             alert(`Ad confirmed and now live! Total Price: ${data.totalPrice}`);
    //             setAd(prevAd => ({ ...prevAd, confirmed: true }));
    //         } else {
    //             throw new Error('Failed to confirm ad');
    //         }
    //     } catch (error) {
    //         console.error('Error confirming ad:', error);
    //         alert('Failed to confirm ad. Please try again later.');
    //     }
    // };

    const handleAdSelect = () => {
        setSelectedAd(true);
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

    if (loading) return <p>Loading...</p>;
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
                    <div>
                        <h2 className="text-3xl font-bold text-[#02A6BC]">{ad.businessName}</h2>
                        <div className="flex items-center space-x-4 mt-2">
                            <div className="flex items-center space-x-2 text-gray-600">
                                <Eye className="text-[#ff6347]" size={20} />
                                <span>{ad.views} Views</span>
                            </div>
                            <div className="flex items-center space-x-2 text-gray-600">
                                <MousePointer className="text-[#02A6BC]" size={20} />
                                <span>{ad.clicks} Clicks</span>
                            </div>
                        </div>
                    </div>
                    {!ad.confirmed && (
                        <div className='confirm-btn-container'>
                            <button onClick={handleAdSelect} className="confirm-ad-button">Confirm Ad</button>
                        </div>
                    )}
                    {selectedAd && (
                        <div className="modal">
                            <div className="modal-content">
                                <div className='cancelIcon'>
                                    <img src={cancel} alt='' onClick={handleCancel}/>
                                </div>
                                <h3>Enter Your Details to Proceed with Payment</h3>
                                <label>Email:</label>
                                <input 
                                    type="email" 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    required 
                                />
                                <label>Phone Number:</label>
                                <input 
                                    type="tel" 
                                    value={phoneNumber} 
                                    onChange={(e) => setPhoneNumber(e.target.value)} 
                                    required 
                                />
                                <button onClick={initiatePayment}>Proceed</button>
                            </div>
                        </div>
                    )}
                </div>

                <div className="description relative">
                    <h3 className="text-xl font-semibold text-[#ff6347] mb-2">Description</h3>
                    <p className={`text-gray-700 leading-relaxed ${!isDescriptionExpanded ? 'line-clamp-3' : ''}`}>
                        {isDescriptionExpanded ? ad.adDescription : truncateDescription(ad.adDescription)}
                    </p>
                    
                    {ad.adDescription.length > 150 && (
                        <button 
                            onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                            className="absolute bottom-0 right-0 flex items-center text-[#02A6BC] bg-blue-100 p-1 rounded-full transition"
                        >
                            <ChevronsDown size={20} />
                            <span className="text-sm ml-1">
                                {isDescriptionExpanded ? 'Show Less' : 'Read More'}
                            </span>
                        </button>
                    )}
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div className="location-info">
                        <h3 className="text-xl font-semibold text-[#ff6347] mb-2 flex items-center">
                            <MapPin className="mr-2 text-[#02A6BC]" size={20} />
                            Location
                        </h3>
                        <p className="text-gray-700">{ad.businessLocation}</p>
                    </div>

                    <div className="websites-section">
                        <h3 className="text-xl font-semibold text-[#ff6347] mb-2 flex items-center">
                            <Globe className="mr-2 text-[#02A6BC]" size={20} />
                            Websites
                        </h3>
                        <div className="space-y-2">
                            {ad.selectedWebsites.map((website) => (
                                <div key={website._id} className="bg-gray-50 p-3 rounded-lg">
                                    <p className="font-medium text-gray-800">{website.websiteName}</p>
                                    <a 
                                        href={website.websiteLink} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="text-[#02A6BC] hover:underline text-sm"
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
                        <h3 className="text-xl font-semibold text-[#ff6347] mb-2 flex items-center">
                            <Tags className="mr-2 text-[#02A6BC]" size={20} />
                            Categories
                        </h3>
                        <div className="space-y-2">
                            {ad.selectedCategories.map((category) => (
                                <div 
                                    key={category._id} 
                                    className="bg-gray-50 p-3 rounded-lg flex justify-between items-center"
                                >
                                    <span className="text-gray-800">{category.categoryName}</span>
                                    <span className="text-[#ff6347] font-semibold">${category.price}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="spaces-section">
                        <h3 className="text-xl font-semibold text-[#ff6347] mb-2 flex items-center">
                            <Folder className="mr-2 text-[#02A6BC]" size={20} />
                            Spaces
                        </h3>
                        <div className="space-y-2">
                            {ad.selectedSpaces.map((space) => (
                                <div 
                                    key={space._id} 
                                    className="bg-gray-50 p-3 rounded-lg flex justify-between items-center"
                                >
                                    <span className="text-gray-800">{space.spaceType}</span>
                                    <span className="text-[#ff6347] font-semibold">${space.price}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="ad-detail-youtube-style bg-white min-h-screen">
            <div className="header bg-white shadow-sm p-4 flex items-center justify-between flex-wrap">
                <div className="flex items-center mb-2 md:mb-0">
                    <button
                        onClick={() => navigate('/ads-dashboard')}
                        className="mr-4 text-[#02A6BC] hover:bg-blue-100 p-2 rounded-full"
                    >
                        <ArrowLeft size={24} />
                    </button>
                    <h1 className="text-lg md:text-xl font-bold text-[#02A6BC]">Approved Ad Details</h1>
                </div>
                <input
                    type="text"
                    placeholder="Search related ads..."
                    value={searchQuery}
                    onChange={handleSearch}
                    className="px-4 py-2 border rounded-full w-full md:w-64 text-sm focus:outline-none focus:ring-2 focus:ring-[#02A6BC]"
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
                    <h3 className="text-lg md:text-xl font-bold mb-4 text-[#02A6BC]">Related Ads</h3>
                    <div className="space-y-4">
                        {filteredAds.slice().reverse().map((otherAd) => (
                            <div
                                key={otherAd._id}
                                className="related-ad-card border border-[#02A6BC] rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-all"
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
                                            <span className="text-xs text-[#ff6347]">{otherAd.clicks} Clicks</span>
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