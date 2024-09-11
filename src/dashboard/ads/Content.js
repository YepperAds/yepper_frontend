import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useClerk } from '@clerk/clerk-react';
import axios from "axios";
import './styles/Content.css';
import AddButton from '../components/addButton';

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
    <div className="body-content">
      <div className='ads-container'>
        <AddButton/>
        <div className='card-container'>
          {ads.length > 0 ? (
            ads.slice().reverse().map((ad) => (
              <Link key={ad._id} className="data-card">
                {ad.imageUrl && <img src={`https://yepper-backend.onrender.com${ad.imageUrl}`} alt="Ad Image" className="ad-image" />}
                  {ad.pdfUrl && <a href={`https://yepper-backend.onrender.com${ad.pdfUrl}`} target="_blank" rel="noopener noreferrer" className="ad-pdf">View PDF</a>}
                  {ad.videoUrl && (
                    <video controls className="ad-video">
                      <source src={`https://yepper-backend.onrender.com${ad.videoUrl}`} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                )}
                <div className='word'>
                  <label>{ad.adDescription}</label>
                </div>
              </Link>
            ))
          ) : (
            <div className="no-ads">No ads available</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Content;