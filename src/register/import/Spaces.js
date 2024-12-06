// ImportAd.js
import React, { useState, useEffect } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react'
import axios from 'axios';
import './styles/spaces.css';
import BackButton from '../../components/backToPreviusButton';

const SelectSpace = () => {
  const { user } = useUser();
  const location = useLocation();
  const navigate = useNavigate();
  const { file, userId, businessName, businessLink, businessLocation, adDescription, selectedWebsites, selectedCategories } = location.state || {};

  const [categoryDetails, setCategoryDetails] = useState([]);
  const [selectedSpaces, setSelectedSpaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const adOwnerEmail = user.primaryEmailAddress.emailAddress;

  useEffect(() => {
    const fetchCategoryDetails = async () => {
      try {
        const promises = selectedCategories.map(async (categoryId) => {
          const categoryResponse = await fetch(`https://yepper-backend.onrender.com/api/ad-categories/category/${categoryId}`);
          const categoryData = await categoryResponse.json();

          const websiteResponse = await fetch(`https://yepper-backend.onrender.com/api/websites/website/${categoryData.websiteId}`);
          const websiteData = await websiteResponse.json();

          const spacesResponse = await fetch(`https://yepper-backend.onrender.com/api/ad-spaces/${categoryId}`);
          const spacesData = await spacesResponse.json();

          return {
            websiteName: websiteData.websiteName,
            logoUrl: websiteData.logoUrl,
            category: categoryData,
            spaces: spacesData,
          };
        });

        const result = await Promise.all(promises);
        setCategoryDetails(result);
      } catch (error) {
        console.error('Failed to fetch spaces or categories:', error);
      }
    };

    if (selectedCategories && selectedCategories.length > 0) {
      fetchCategoryDetails();
    }
  }, [selectedCategories]);

  const handleSpaceSelect = (spaceId, remainingCount) => {
    if (remainingCount <= 0) return;

    setSelectedSpaces((prevSelected) =>
      prevSelected.includes(spaceId)
        ? prevSelected.filter((id) => id !== spaceId)
        : [...prevSelected, spaceId]
    );
  };

  const handlePublish = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('adOwnerEmail', adOwnerEmail);
      formData.append('file', file);
      formData.append('userId', userId);
      formData.append('businessName', businessName);
      formData.append('businessLink', businessLink);
      formData.append('businessLocation', businessLocation);
      formData.append('adDescription', adDescription);
      formData.append('selectedWebsites', JSON.stringify(selectedWebsites));
      formData.append('selectedCategories', JSON.stringify(selectedCategories));
      formData.append('selectedSpaces', JSON.stringify(selectedSpaces));

      await axios.post('https://yepper-backend.onrender.com/api/importAds', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      navigate('/dashboard');
    } catch (error) {
      console.error('Error during ad upload:', error);
      setError('An error occurred while uploading the ad');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <BackButton />
      <div className="ad-spaces web-app">
        <div className="space-y-8">
          <h1 className="title">Select Ad Spaces</h1>

          {loading && <div className="loading-overlay">Loading...</div>}

          {categoryDetails.map((detail) => (
            <div key={detail.category._id} className="category-card">
              <div className="category-header">
                {detail.logoUrl && <img src={detail.logoUrl} alt={detail.websiteName} />}
                <div>
                  <h2>{detail.websiteName}</h2>
                  <p>{detail.category.categoryName}</p>
                </div>
              </div>
              <div className="space-list">
                {detail.spaces.map((space) => (
                  <label key={space._id} className="space-item">
                    <input
                      type="checkbox"
                      className="space-checkbox"
                      checked={selectedSpaces.includes(space._id)}
                      onChange={() => handleSpaceSelect(space._id, space.remainingUserCount)}
                      disabled={space.remainingUserCount <= 0}
                    />
                    <div className="space-details">
                      <div className="header">
                        <span>{space.spaceType}</span>
                        <span className="price">${space.price}</span>
                      </div>
                      <div className="availability">
                        {space.availability === 'Always available' ? (
                          <span className="text-green-600">
                            <CheckCircle2 className="mr-1" />
                            Always Available
                          </span>
                        ) : space.availability === 'Pick a date' ? (
                          <span>
                            {new Date(space.startDate).toLocaleDateString()} - {new Date(space.endDate).toLocaleDateString()}
                          </span>
                        ) : (
                          <span>{space.availability}</span>
                        )}
                      </div>
                      <div className={`remaining ${space.remainingUserCount > 0 ? 'available' : 'full'}`}>
                        {space.remainingUserCount > 0 ? (
                          `${space.remainingUserCount} remaining`
                        ) : (
                          <>
                            <XCircle className="mr-1" />
                            Full
                          </>
                        )}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          ))}

          {error && <div className="error">{error}</div>}

          <div className="publish-container">
            <button
              onClick={handlePublish}
              disabled={loading || selectedSpaces.length === 0}
              className="publish-button"
            >
              {loading ? 'Publishing...' : 'Publish Ad'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectSpace;