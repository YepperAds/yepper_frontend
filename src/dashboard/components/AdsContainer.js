// AdsContainer.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useClerk } from '@clerk/clerk-react';
import axios from "axios";
import './styles/session2.css'
import './styles/adsContainer.css'

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
            setAds(data); // Directly setting the array of ads
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
        <div className="error-container">
          <div>{error}</div>
        </div>
      );
    }

    const adsToShow = showMore ? ads.slice().reverse() : ads.slice().reverse().slice(0, 3);

    return (
        <div className='object adsList-container'>
            <div className='title'>
                <h4>{ads.length}</h4>
                <h3>Ads</h3>
            </div>

            <div className='updates'>
                {ads.length > 0 ? (
                    adsToShow.map((ad, index) => (
                      <div key={index} className='update'>
                        {ad.videoUrl ? (
                            <div className="video-background">
                              <video autoPlay loop muted onTimeUpdate={(e) => {
                                if (e.target.currentTime >= 6) e.target.currentTime = 0;
                              }} className="background-video">
                                <source src={`https://yepper-backend.onrender.com${ad.videoUrl}`} type="video/mp4" />
                              </video>
                              <div className="overlay">
                                <h4 className="business-name">{ad.businessName}</h4>
                              </div>
                            </div>
                        ) : (
                          <div className="image-container">
                            <img src={`https://yepper-backend.onrender.com${ad.imageUrl}`} alt="Ad" className="ad-image" />
                            <h4 className="business-name">{ad.businessName}</h4>
                          </div>
                        )}
                        <div className="ad-content">
                          <Link to={`/ad-detail/${ad._id}`} className="view-button">View</Link>
                        </div>
                      </div>
                    ))
                ) : (
                    <p className="no-ads-message">No ads available</p>
                )}
            </div>
            <Link to='/ads-dashboard' className='showMore'>
                Show more
                <img src='https://cdn-icons-png.flaticon.com/128/8213/8213522.png' alt='' />
            </Link>
        </div>
    )
}

export default AdsContainer