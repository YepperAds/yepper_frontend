// Content.js
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useClerk } from '@clerk/clerk-react';
import axios from "axios";
import './styles/Content.css';
import AddButton from '../components/addButton';
import arrowBlue from '../../assets/img/right-arrow-blue.png';

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
    <>
      <AddButton />
      <div className="main-content">
        <div className="ads-gallery">
          {ads.length > 0 ? (
            ads.slice().reverse().map((ad) => (
              <Link key={ad._id} to={`/ad-detail/${ad._id}`} className={`ad-link ${ad.isConfirmed ? 'confirmed' : 'awaiting-confirmation'}`}>
                {ad.videoUrl ? (
                  <video
                    autoPlay
                    loop
                    muted
                    className="ad-background-video"
                  >
                    <source src={`https://yepper-backend.onrender.com${ad.videoUrl}`} type="video/mp4" />
                  </video>
                ) : (
                  ad.imageUrl && (
                    <img
                      src={`https://yepper-backend.onrender.com${ad.imageUrl}`}
                      alt="Ad Visual"
                      className="ad-background-image"
                    />
                  )
                )}
                <div className="overlay">
                  <h1 className="ad-title">{ad.businessName}</h1>
                  <p><strong>Views:</strong> {ad.views}</p>
                  <p><strong>Clicks:</strong> {ad.clicks}</p>
                  <div className="arrow-icon">
                    <img src={arrowBlue} alt="Arrow Icon" />
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="no-ads">No ads available</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Content;