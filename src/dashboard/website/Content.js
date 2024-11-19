import React, { useState, useEffect } from "react";
import { useClerk } from '@clerk/clerk-react';
import axios from "axios";
import './styles/Content.css';

const Content = () => {
  const { user } = useClerk();
  const userId = user?.id;
  const [ads, setAds] = useState([]); // Renamed `ad` to `ads` for clarity
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Websites You Advertise On</h1>
      {ads.length > 0 ? (
        <ul>
          {ads.map((ad) => (
            ad.selectedWebsites.map((website) => (
              <li key={website._id}>
                <p><strong>Name:</strong> {website.websiteName}</p>
                <p>
                  <strong>Link:</strong>{' '}
                  <a href={website.websiteLink} target="_blank" rel="noopener noreferrer">
                    {website.websiteLink}
                  </a>
                </p>
              </li>
            ))
          ))}
        </ul>
      ) : (
        <p>No advertisements found.</p>
      )}
    </div>
  );
};

export default Content;
