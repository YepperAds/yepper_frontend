// Advertisers.js
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './styles/websites.css';

function Advertisers() {
  const location = useLocation();
  const navigate = useNavigate();
  const { file, userId, businessName, businessLocation, adDescription } = location.state || {};
  const [websites, setWebsites] = useState([]);
  const [selectedWebsites, setSelectedWebsites] = useState([]);

  useEffect(() => {
    const fetchWebsites = async () => {
      try {
        const response = await fetch('https://yepper-backend.onrender.com/api/websites');
        const data = await response.json();
        setWebsites(data);
      } catch (error) {
        console.error('Failed to fetch websites:', error);
      }
    };

    fetchWebsites();
  }, []);

  const handleSelect = (websiteId) => {
    setSelectedWebsites((prevSelected) => {
      if (prevSelected.includes(websiteId)) {
        return prevSelected.filter(id => id !== websiteId); // Uncheck if already selected
      } else {
        return [...prevSelected, websiteId]; // Add if not already selected
      }
    });
  };

  const handleNext = (e) => {
    e.preventDefault();
    navigate('/categories', {
      state: {
        file,
        userId,
        businessName,
        businessLocation,
        adDescription,
        selectedWebsites, // Pass selected websites to the next page
      },
    });
  };

  return (
    <>
      <div className="webs-select">
        <form onSubmit={handleNext}>
          <h1>Select Websites to Advertise</h1>
          <div className="websites-grid">
            {websites.map((website) => (
              <div key={website._id} className={`website-card ${selectedWebsites.includes(website._id) ? 'selected' : ''}`} onClick={() => handleSelect(website._id)}>
                <img src={website.logoUrl || '/default-logo.png'} alt={`${website.websiteName} logo`} className="website-logo" />
                <div className="website-info">
                  <h2>{website.websiteName}</h2>
                  <p>{website.websiteLink}</p>
                </div>
                <div className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={selectedWebsites.includes(website._id)}
                    onChange={() => handleSelect(website._id)}
                  />
                  <span className="slider"></span>
                </div>
              </div>
            ))}
          </div>
          {/* Fixed button container */}
          <div className="fixed-button-container">
            <button type="submit">Next</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Advertisers;
