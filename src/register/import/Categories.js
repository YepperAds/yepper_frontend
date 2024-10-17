// Categories.js
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './styles/categories.css';

function Categories() {
  const location = useLocation();
  const navigate = useNavigate();
  const { file, userId, businessName, businessLocation, adDescription, selectedWebsites } = location.state || {};
  const [categoriesByWebsite, setCategoriesByWebsite] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const promises = selectedWebsites.map(async (websiteId) => {
          const websiteResponse = await fetch(`https://yepper-backend.onrender.com/api/websites/website/${websiteId}`);
          const websiteData = await websiteResponse.json();
          const categoriesResponse = await fetch(`https://yepper-backend.onrender.com/api/ad-categories/${websiteId}`);
          const categoriesData = await categoriesResponse.json();

          if (websiteData && categoriesData.categories) {
            return {
              websiteName: websiteData.websiteName,
              websiteLink: websiteData.websiteLink,
              categories: categoriesData.categories,
            };
          } else {
            return { websiteName: 'Unknown Website', websiteLink: '#', categories: [] };
          }
        });
        const result = await Promise.all(promises);
        setCategoriesByWebsite(result);
      } catch (error) {
        console.error('Failed to fetch categories or websites:', error);
      }
    };

    if (selectedWebsites) fetchCategories();
  }, [selectedWebsites]);

  const handleCategorySelection = (categoryId) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(categoryId) ? prevSelected.filter((id) => id !== categoryId) : [...prevSelected, categoryId]
    );
  };

  const handleNext = (e) => {
    e.preventDefault();
    navigate('/spaces', {
      state: { file, userId, businessName, businessLocation, adDescription, selectedWebsites, selectedCategories },
    });
  };

  return (
    <div className="ad-categories">
      <div className="selected-summary">
        <h3>Selected Categories</h3>
        <ul>
          {selectedCategories.length > 0 ? (
            selectedCategories.map((id) => (
              <li key={id}>{id}</li> // Ideally, show actual category names
            ))
          ) : (
            <p>No categories selected yet.</p>
          )}
        </ul>
      </div>

      <form onSubmit={handleNext}>
        <button className="next-btn" type="submit">Next</button>
        <h1>Available Categories for Selected Websites</h1>
        <div className="ctn">
          {categoriesByWebsite.length > 0 ? (
            categoriesByWebsite.map((website) => (
              <div className="website-card" key={website.websiteName}>
                <h2>{website.websiteName} - <a href={website.websiteLink}>{website.websiteLink}</a></h2>
                <div className="categories-list">
                  {website.categories.length > 0 ? (
                    <ul>
                      {website.categories.map((category) => (
                        <li key={category._id}>
                          <label>
                            <input
                              type="checkbox"
                              value={category._id}
                              onChange={() => handleCategorySelection(category._id)}
                              checked={selectedCategories.includes(category._id)}
                            />
                            {category.categoryName} 
                            <span className="category-price">(${category.price})</span>
                          </label>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No categories available for this website.</p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p>No categories available for the selected websites.</p>
          )}
        </div>
      </form>
    </div>
  );
}

export default Categories;
