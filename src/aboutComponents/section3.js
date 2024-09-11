import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import './styles/section3.css';

function Section3() {
  const [allAds, setAllAds] = useState([]);
  const [filteredAds, setFilteredAds] = useState([]);

  useEffect(() => {
    const fetchAllAds = async () => {
      try {
        const response = await axios.get('https://yepper-backend.onrender.com/api/importAds');
        const ads = response.data;
        setAllAds(ads);
        setFilteredAds(ads);
      } catch (error) {
        console.error('Error fetching ads:', error);
      }
    };

    fetchAllAds();

  }, []);

  return (
    <div className='slide3-container'>
      <div className='slide3'>
        <div className='ads'>
          {filteredAds.length > 0 ? (
            filteredAds.map((ad) => (
              <div key={ad._id} className='slide-track'>
                {ad.imageUrl && <img src={`https://yepper-backend.onrender.com${ad.imageUrl}`} alt="Ad Image" />}
              </div>
            ))
          ) : (
            <p>No ads found</p>
          )}
        </div>
      </div>
      <div className='slide3 reverse'>
        <div className='ads'>
          {filteredAds.length > 0 ? (
            filteredAds.map((ad) => (
              <div key={ad._id} className='slide-track'>
                {ad.imageUrl && <img src={`https://yepper-backend.onrender.com${ad.imageUrl}`} alt="Ad Image" />}
              </div>
            ))
          ) : (
            <p>No ads found</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Section3;
