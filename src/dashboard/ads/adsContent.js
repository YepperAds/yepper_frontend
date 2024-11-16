import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useClerk } from '@clerk/clerk-react';
import axios from "axios";
import './styles/Content.css';
import AddButton from '../components/addButton';
import arrowBlue from '../../assets/img/right-arrow-blue.png';

const Content = () => {
  const { user } = useClerk();
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAds = async () => {
      try {
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
        setLoading(false);
      }
    };
    if (user) {
      fetchAds();
    }
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div className="error-container">
        <div>{error}</div>
      </div>
    );
  }

  return (
    <>
        <AddButton/>
        <div className='main-content'>
          <div className="ads-gallery">
            {ads.length > 0 ? (
              ads.slice().reverse().map((ad) => (
                <Link key={ad._id} className="ad-link">
                  <div className='impressions'>
                    <p><strong>Views:</strong> {ad.views}</p>
                    <p><strong>Clicks:</strong> {ad.clicks}</p>
                  </div>
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