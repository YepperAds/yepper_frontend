import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useClerk } from '@clerk/clerk-react';
import axios from "axios";

function AdsContainer({ setLoading }) {
    const { user } = useClerk();
    const [ads, setAds] = useState([]);
    const [error, setError] = useState(null);
    const [showMore, setShowMore] = useState(false);

    useEffect(() => {
      const fetchAds = async () => {
        try {
          setLoading(true);
          const response = await axios.get(`https://yepper-backend.onrender.com/api/importAds/ads/${user.id}`);
          if (response.status !== 200) {
            throw new Error('Failed to fetch ads');
          }
          const data = response.data;
          if (Array.isArray(data)) {
            setAds(data);
          } else {
            console.error('Received data is not an array:', data);
          }
          setLoading(false);
        } catch (error) {
          if (!error.response) {
            setError('No internet connection');
          } else {
            setError('Error fetching ads');
          }
        } finally {
          setLoading(false);
        }
      };
      if (user) {
        fetchAds();
      }
    }, [user]);

    if (error) {
      return (
        <div className="flex items-center justify-center p-4 text-red-500">
          <div>{error}</div>
        </div>
      );
    }

    const adsToShow = showMore ? ads.slice().reverse() : ads.slice().reverse().slice(0, 3);

    return (
        <div className="flex flex-col w-full max-w-lg bg-white rounded-lg shadow-lg transition-all duration-300 overflow-hidden hover:transform hover:-translate-y-2 hover:shadow-xl">
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
                <h3 className="text-xl font-bold text-gray-900">{ads.length}</h3>
                <h4 className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold">Ads</h4>
            </div>

            <div className="flex flex-col gap-6 p-6">
                {ads.length > 0 ? (
                    adsToShow.map((ad, index) => (
                      <div key={index} className="relative bg-gray-50 rounded-lg overflow-hidden shadow-md transition-all duration-300">
                        {ad.videoUrl ? (
                            <div className="relative w-full h-64">
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
                              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4">
                                <h4 className="text-white text-lg font-semibold text-center bg-black/50 px-4 py-2 rounded-full">
                                  {ad.businessName}
                                </h4>
                              </div>
                            </div>
                        ) : (
                          <div className="relative w-full h-64">
                            <img 
                              src={ad.imageUrl} 
                              alt="Ad" 
                              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                            />
                            <h4 className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-lg font-semibold bg-black/50 px-4 py-2 rounded-full">
                              {ad.businessName}
                            </h4>
                          </div>
                        )}
                        <div className="p-4 bg-gray-50 text-center">
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
                    <p className="text-lg text-orange-500 text-center py-8">No ads available</p>
                )}
            </div>
            <Link 
              to='/ads-dashboard' 
              className="flex items-center justify-center p-4 text-blue-500 font-semibold transition-all duration-300 hover:text-orange-500 group"
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

export default AdsContainer;