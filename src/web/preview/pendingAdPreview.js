// PendingAdPreview.js
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useUser } from "@clerk/clerk-react";

import '../styles/pendingDetails.css';
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
  ChevronsDown,
  Expand
} from 'lucide-react';

function PendingAdPreview() {
  const { adId } = useParams();
  const { user } = useUser();
  const navigate = useNavigate();
  const [ad, setAd] = useState(null);
  const [relatedAds, setRelatedAds] = useState([]);

  const [error, setError] = useState(null);
  const [filteredAds, setFilteredAds] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [muted, setMuted] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const videoRef = useRef(null);
  const [isVideoFullScreen, setIsVideoFullScreen] = useState(false);
  const [isImageFullScreen, setIsImageFullScreen] = useState(false);
  const videoContainerRef = useRef(null);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  useEffect(() => {
    const fetchAdDetails = async () => {
      if(user){
        const ownerId = user.id;

        try {
          const response = await axios.get(`https://yepper-backend.onrender.com/api/accept/pending-ad/${adId}`);
          setAd(response.data);
  
          const relatedResponse = await axios.get(`https://yepper-backend.onrender.com/api/accept/pending/${ownerId}`);
          const relatedAdsData = relatedResponse.data.filter((otherAd) => otherAd._id !== adId);
          setRelatedAds(relatedAdsData);
          setFilteredAds(relatedAdsData);
  
          setLoading(false);
        } catch (err) {
          console.error('Error fetching ad details:', err);
          setError('Failed to load ad details');
        }
      }
    };
    fetchAdDetails();
  }, [adId, , user]);

  const handleConfirm = async () => {
    try {
      await axios.put(`https://yepper-backend.onrender.com/api/accept/approve/${adId}`);
      navigate('/pending'); // Redirect to the list of pending ads
    } catch (err) {
      console.error('Error confirming ad:', err);
    }
  };

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
    navigate(`/pending-ad/${newAdId}`);
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  
  const renderAdInfo = () => {
    if (!ad) return null;

    const truncateDescription = (text, maxLength = 150) => {
      if (text.length <= maxLength) return text;
      return text.substr(0, maxLength) + '...';
    };
  
    return (
          <div className="rounded-lg shadow-md p-4 md:p-6 mt-4 space-y-4 md:space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b pb-4">
              <div className="mb-4 md:mb-0 w-full">
                <h2 className="text-2xl md:text-3xl font-bold text-[#6a1b9a] text-center md:text-left">{ad.businessName}</h2>
              </div>
              <div className='confirm-btn-container w-full md:w-auto text-center md:text-right'>
                <button onClick={handleConfirm} className="confirm-ad-button px-4 py-2 rounded-lg">Approve</button>
              </div>
            </div>
    
            <div className="description relative">
              <h3 className="text-lg md:text-xl font-semibold text-[#ff6347] mb-2">Description</h3>
              <p className={`text-gray-700 leading-relaxed ${!isDescriptionExpanded ? 'line-clamp-3' : ''}`}>
                {isDescriptionExpanded ? ad.adDescription : truncateDescription(ad.adDescription)}
              </p>
              
              {ad.adDescription.length > 150 && (
                <button 
                  onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                  className="w-full md:w-auto mt-2 md:absolute md:bottom-0 md:right-0 flex items-center justify-center text-[#6a1b9a] bg-blue-100 p-2 rounded-full transition"
                >
                  <ChevronsDown size={20} />
                  <span className="text-sm ml-1">
                    {isDescriptionExpanded ? 'Show Less' : 'Read More'}
                  </span>
                </button>
              )}
            </div>
    
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="">
                <h3 className="text-lg md:text-xl font-semibold text-[#ff6347] mb-2 flex items-center">
                  <MapPin className="mr-2 text-[#6a1b9a]" size={20} />
                  Location
                </h3>
                <p className="text-gray-700">{ad.businessLocation}</p>
              </div>
    
              <div className="">
                <h3 className="text-lg md:text-xl font-semibold text-[#ff6347] mb-2 flex items-center">
                  <Globe className="mr-2 text-[#6a1b9a]" size={20} />
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
                        className="text-[#6a1b9a] hover:underline text-sm break-all"
                      >
                        {website.websiteLink}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
    
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-4">
              <div className="">
                <h3 className="text-lg md:text-xl font-semibold text-[#ff6347] mb-2 flex items-center">
                  <Tags className="mr-2 text-[#6a1b9a]" size={20} />
                  Categories
                </h3>
                <div className="space-y-2">
                  {ad.selectedCategories.map((category) => (
                    <div 
                      key={category._id} 
                      className="bg-gray-50 p-3 rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center"
                    >
                      <span className="text-gray-800 mb-2 md:mb-0">{category.categoryName}</span>
                      <span className="text-[#ff6347] font-semibold">${category.price}</span>
                    </div>
                  ))}
                </div>
              </div>
    
              <div className="">
                <h3 className="text-lg md:text-xl font-semibold text-[#ff6347] mb-2 flex items-center">
                  <Folder className="mr-2 text-[#6a1b9a]" size={20} />
                  Spaces
                </h3>
                <div className="space-y-2">
                  {ad.selectedSpaces.map((space) => (
                    <div 
                      key={space._id} 
                      className="bg-gray-50 p-3 rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center"
                    >
                      <span className="text-gray-800 mb-2 md:mb-0">{space.spaceType}</span>
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
      <div className="min-h-screen">
        <div className="shadow-sm p-4 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center w-full mb-4 md:mb-0">
            <button
              onClick={() => navigate('/ads')}
              className="mr-4 text-[#6a1b9a] hover:bg-blue-100 p-2 rounded-full"
            >
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-lg md:text-xl font-bold text-[#6a1b9a]">Ad Details</h1>
          </div>
          <div className="w-full md:w-64">
            <input
              type="text"
              placeholder="Search related ads..."
              value={searchQuery}
              onChange={handleSearch}
              className="px-4 py-2 border rounded-full w-full text-sm focus:outline-none focus:ring-2 focus:ring-[#6a1b9a]"
            />
          </div>
        </div>
  
        <div className="flex flex-col lg:flex-row p-4">
          {/* Video/Image Section */}
          <div className="lg:w-3/4 w-full pr-0 lg:pr-4">
            {ad.videoUrl ? (
              <div 
                ref={videoContainerRef}
                className={`relative group 
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
          <div className="lg:w-1/4 w-full bg-gray-50 p-4 rounded-lg mt-4 lg:mt-0">
            <h3 className="text-lg md:text-xl font-bold mb-4 text-[#6a1b9a]">Related Ads</h3>
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
              {filteredAds.slice().reverse().map((otherAd) => (
                <div
                  key={otherAd._id}
                  className="border border-[#6a1b9a] rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-all"
                  onClick={() => handleAdClick(otherAd._id)}
                >
                  {otherAd.videoUrl ? (
                    <video
                      autoPlay
                      loop
                      muted
                      className="w-full h-24 md:h-32 object-cover"
                    >
                      <source src={otherAd.videoUrl} type="video/mp4" />
                    </video>
                  ) : (
                    otherAd.imageUrl && (
                      <img
                        src={otherAd.imageUrl}
                        alt="Related Ad"
                        className="w-full h-24 md:h-32 object-cover"
                      />
                    )
                  )}
                  <div className="p-2 bg-white">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                      <span className="text-xs md:text-sm font-medium mb-1 md:mb-0">{otherAd.businessName}</span>
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

export default PendingAdPreview;
