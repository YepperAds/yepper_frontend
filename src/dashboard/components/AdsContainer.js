import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useClerk } from '@clerk/clerk-react';
import axios from "axios";
import './styles/session2.css'

function AdsContainer() {
    const { user } = useClerk();
    const [ads, setAds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showMore, setShowMore] = useState(false);

    useEffect(() => {
      const fetchAds = async () => {
        try {
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

    const adsToShow = showMore ? ads.slice().reverse() : ads.slice().reverse().slice(0, 3);

    return (
        <div className='object'>
            <div className='title'>
                <h4>{ads.length}</h4>
                <h3>Ads</h3>
            </div>

            <div className='updates'>
                {ads.length > 0 ? (
                    adsToShow.map((ad, index) => (
                        <div key={index} className='update'>
                            {ad.imageUrl && <img src={`https://yepper-backend.onrender.com${ad.imageUrl}`} alt="Ad Image" className="ad-image" />}
                            {ad.pdfUrl && <a href={`https://yepper-backend.onrender.com${ad.pdfUrl}`} target="_blank" rel="noopener noreferrer" className="ad-pdf">View PDF</a>}
                            {ad.videoUrl && (
                                <video controls className="ad-video">
                                <source src={`https://yepper-backend.onrender.com${ad.videoUrl}`} type="video/mp4" />
                                Your browser does not support the video tag.
                                </video>
                            )}
                            <div className='word'>
                                <label>{ad.businessName}</label>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="no-ads">No ads available</div>
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