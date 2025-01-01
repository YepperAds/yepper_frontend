// Content.js
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useClerk } from '@clerk/clerk-react';
import axios from "axios";
import './styles/Content.css';
import { ArrowRight, Eye, MousePointer } from 'lucide-react';

const Content = () => {
  const { user } = useClerk();
  const userId = user?.id;
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await axios.get(`https://yepper-backend.onrender.com/api/accept/user-pending/${userId}`);
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
        setError(error.response ? 'Error fetching ads' : 'No internet connection');
        setLoading(false);
      }
    };
    if (userId) fetchAds();
  }, [userId]);

  if (loading) {
    return <div className="main-content loading-spinner">Loading...</div>;
  }

  if (error) {
    return (
      <div className="main-content error-container">
        <div>{error}</div>
      </div>
    );
  }

  return (
    <div className="ad-gallery-container">
      {ads.length > 0 ? (
        <div className="ad-grid">
          {ads.slice().reverse().map((ad) => (
            <Link 
              key={ad._id} 
              to={`/approved-detail/${ad._id}`} 
              className={`ad-card ${ad.isConfirmed ? 'confirmed' : 'pending'}`}
            >
              <div className="ad-media-container">
                {ad.videoUrl ? (
                  <video 
                    autoPlay 
                    loop 
                    muted 
                    className="ad-media"
                  >
                    <source src={ad.videoUrl} type="video/mp4" />
                  </video>
                ) : (
                  ad.imageUrl && (
                    <img 
                      src={ad.imageUrl} 
                      alt="Ad Visual" 
                      className="ad-media" 
                    />
                  )
                )}
              </div>
              <div className="ad-details">
                <h2 className="ad-title">{ad.businessName}</h2>
                <div className="ad-action">
                  <ArrowRight size={24} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="no-ads">No ads available</div>
      )}
    </div>
  );
};

export default Content;