import React, { useState, useEffect } from "react";
import { useClerk } from "@clerk/clerk-react";
import axios from "axios";
import "./styles/Content.css";

const Content = () => {
  const { user } = useClerk();
  const userId = user?.id;
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await axios.get(
          `https://yepper-backend.onrender.com/api/accept/approved-awaiting-confirmation/${userId}`
        );
        if (response.status !== 200) {
          throw new Error("Failed to fetch ads");
        }
        const data = response.data;
        if (Array.isArray(data)) {
          setAds(data);
        } else {
          console.error("Received data is not an array:", data);
        }
        setLoading(false);
      } catch (error) {
        setError(
          error.response ? "Error fetching ads" : "No internet connection"
        );
        setLoading(false);
      }
    };

    if (userId) fetchAds();
  }, [userId]);

  if (loading) return <div className="websites-container">Loading...</div>;
  if (error) return <div className="websites-container">Error: {error}</div>;

  return (
    <div className='webs-container'>
      {ads.length > 0 ? (
        <ul className='card-container'>
          {ads.map((ad) =>
            ad.selectedWebsites.map((website) => (
              <div key={website._id} className='data-card'>
                <div className='app'>
                  {website.logoUrl && (
                    <img
                      src={website.logoUrl}
                      alt={`${website.websiteName} logo`}
                    />
                  )}
                </div>
                <div className='details'>
                  <div className='word'>
                    <p>
                      {website.websiteName}
                    </p>
                  </div>
                </div>
                
                <p>
                  <a
                    href={website.websiteLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit Website
                  </a>
                </p>
              </div>
            ))
          )}
        </ul>
      ) : (
        <p className="no-ads">No advertisements found.</p>
      )}
    </div>
  );
};

export default Content;