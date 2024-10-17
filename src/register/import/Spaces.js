// ImportAd.js
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles/spaces.css';
import BackButton from '../../components/backToPreviusButton';

function ImportAd() {
  const location = useLocation();
  const navigate = useNavigate();
  const { file, userId, businessName, businessLocation, adDescription, selectedWebsites, selectedCategories } = location.state || {};
  const [categoryDetails, setCategoryDetails] = useState([]);
  const [selectedSpaces, setSelectedSpaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
            logoUrl: websiteData.logoUrl,  // Adding logo
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
    if (remainingCount <= 0) return; // Prevent selecting a full space

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
      formData.append('file', file);
      formData.append('userId', userId);
      formData.append('businessName', businessName);
      formData.append('businessLocation', businessLocation);
      formData.append('adDescription', adDescription);
      formData.append('selectedWebsites', JSON.stringify(selectedWebsites));
      formData.append('selectedCategories', JSON.stringify(selectedCategories));
      formData.append('selectedSpaces', JSON.stringify(selectedSpaces));

      await axios.post('https://yepper-backend.onrender.com/api/importAds', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      navigate('/');
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
      <div className='ad-spaces'>
        <h1>Available Ad Spaces for Selected Categories</h1>
        {loading && <div>Loading...</div>}

        {categoryDetails.length > 0 ? (
          categoryDetails.map((detail) => (
            <div key={detail.category._id} className="category-section">
              <div className="website-logo">
                {detail.logoUrl && <img src={detail.logoUrl} alt={detail.websiteName} />}
                <span>{detail.websiteName}</span>
              </div>
              <h3>{detail.category.categoryName}</h3>
              {detail.spaces.length > 0 ? (
                detail.spaces.map((space) => (
                  <div key={space._id} className="space-item">
                    <label>
                      <div className="space-header">
                        <input
                          type="checkbox"
                          value={space._id}
                          onChange={() => handleSpaceSelect(space._id, space.remainingUserCount)}
                          checked={selectedSpaces.includes(space._id)}
                          disabled={space.remainingUserCount <= 0}
                        />
                        <span className="price-badge">${space.price}</span>
                      </div>
                      <div className="availability-section">
                        <strong>Space Type:</strong> {space.spaceType} | 
                        <strong>Availability:</strong> 
                        {space.availability === 'Always available' ? (
                          <span className="badge badge-success">Always Available</span>
                        ) : space.availability === 'Pick a date' ? (
                          <span className="badge badge-warning">
                            From {new Date(space.startDate).toLocaleDateString()} to {new Date(space.endDate).toLocaleDateString()}
                          </span>
                        ) : (
                          <span className="badge badge-info">{space.availability}</span>
                        )}
                      </div>
                      <div className="user-count">
                        <strong>User Count:</strong> 
                        {space.remainingUserCount > 0 ? (
                          <span className="badge badge-primary">{space.remainingUserCount} remaining</span>
                        ) : (
                          <span className="badge badge-danger">Full</span>
                        )}
                      </div>
                      {space.instructions && (
                        <div className="instructions">
                          <strong>Instructions:</strong> {space.instructions}
                        </div>
                      )}
                    </label>
                  </div>

                ))
              ) : (
                <p>No spaces available for this category.</p>
              )}
            </div>
          ))
        ) : (
          <p>No spaces available for the selected categories.</p>
        )}

        {error && <div className="error-message">{error}</div>}

        <button type="submit" onClick={handlePublish} disabled={loading || selectedSpaces.length === 0}>
          Publish Ad
        </button>
      </div>
    </>
  );
}

export default ImportAd;