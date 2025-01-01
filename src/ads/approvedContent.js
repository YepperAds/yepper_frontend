import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useClerk } from '@clerk/clerk-react';
import axios from "axios";
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
        const response = await axios.get(`https://yepper-backend.onrender.com/api/accept/approved-awaiting-confirmation/${userId}`);
        setAds(response.data || []);
        setLoading(false);
      } catch (error) {
        setError(error.response ? 'Error fetching ads' : 'No internet connection');
        setLoading(false);
      }
    };
    if (userId) fetchAds();
  }, [userId]);

  const formatNumber = (number) => {
    if (number >= 1000000) return `${(number / 1000000).toFixed(1)}M`;
    if (number >= 1000) return `${(number / 1000).toFixed(1)}K`;
    return number;
  };

  if (loading) return <div className="loading-container">Loading...</div>;
  if (error) return <div className="error-container">{error}</div>;

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
                <div className="ad-metrics">
                  <div className="metric">
                    <Eye size={16} />
                    <span>{formatNumber(ad.views)}</span>
                  </div>
                  <div className="metric">
                    <MousePointer size={16} />
                    <span>{formatNumber(ad.clicks)}</span>
                  </div>
                </div>
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