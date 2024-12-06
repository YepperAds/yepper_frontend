// // Categories.js
// import React, { useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import './styles/categories.css';
// import BackButton from '../../components/backToPreviusButton';

// function Categories() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { file, userId, businessName, businessLink, businessLocation, adDescription, selectedWebsites } = location.state || {};
//   const [categoriesByWebsite, setCategoriesByWebsite] = useState([]);
//   const [selectedCategories, setSelectedCategories] = useState([]);
//   const [error, setError] = useState(false); // Error state for validation

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const promises = selectedWebsites.map(async (websiteId) => {
//           const websiteResponse = await fetch(`https://yepper-backend.onrender.com/api/websites/website/${websiteId}`);
//           const websiteData = await websiteResponse.json();
//           const categoriesResponse = await fetch(`https://yepper-backend.onrender.com/api/ad-categories/${websiteId}`);
//           const categoriesData = await categoriesResponse.json();

//           if (websiteData && categoriesData.categories) {
//             return {
//               websiteName: websiteData.websiteName,
//               websiteLink: websiteData.websiteLink,
//               categories: categoriesData.categories,
//             };
//           } else {
//             return { websiteName: 'Unknown Website', websiteLink: '#', categories: [] };
//           }
//         });
//         const result = await Promise.all(promises);
//         setCategoriesByWebsite(result);
//       } catch (error) {
//         console.error('Failed to fetch categories or websites:', error);
//       }
//     };

//     if (selectedWebsites) fetchCategories();
//   }, [selectedWebsites]);

//   const handleCategorySelection = (categoryId) => {
//     setSelectedCategories((prevSelected) =>
//       prevSelected.includes(categoryId) ? prevSelected.filter((id) => id !== categoryId) : [...prevSelected, categoryId]
//     );
//   };

//   const handleNext = (e) => {
//     e.preventDefault();

//     // Ensure at least one category is selected
//     if (selectedCategories.length === 0) {
//       setError(true);
//       return;
//     }

//     setError(false); // Clear error if categories are selected
//     navigate('/spaces', {
//       state: { file, userId, businessName, businessLink, businessLocation, adDescription, selectedWebsites, selectedCategories },
//     });
//   };

//   return (
//     <>
//       <BackButton />
//       <div className="ad-categories web-app">
//         <form onSubmit={handleNext}>
//           <button className="next-btn" type="submit" disabled={selectedCategories.length === 0}>Next</button>
//           <h1>Available Categories for Selected Websites</h1>
//           <div className="ctn">
//             {categoriesByWebsite.length > 0 ? (
//               categoriesByWebsite.map((website) => (
//                 <div className="website-card" key={website.websiteName}>
//                   <label>{website.websiteName} - <a href={website.websiteLink}>{website.websiteLink}</a></label>
//                   <div className="categories-list">
//                     {website.categories.length > 0 ? (
//                       <ul>
//                         {website.categories.map((category) => (
//                           <li key={category._id}>
//                             <label>
//                               <input
//                                 type="checkbox"
//                                 value={category._id}
//                                 onChange={() => handleCategorySelection(category._id)}
//                                 checked={selectedCategories.includes(category._id)}
//                               />
//                               {category.categoryName} 
//                               <span className="category-price">(${category.price})</span>
//                             </label>
//                           </li>
//                         ))}
//                       </ul>
//                     ) : (
//                       <p>No categories available for this website.</p>
//                     )}
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p>No categories available for the selected websites.</p>
//             )}
//           </div>

//           {/* Validation Error Message */}
//           {error && <p className="error-message">Please select at least one category to proceed.</p>}
          
//         </form>
//       </div>
//     </>
//   );
// }

// export default Categories;

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckIcon, LinkIcon } from 'lucide-react';
import './styles/categories.css';
import BackButton from '../../components/backToPreviusButton';

const Categories = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { 
    file,
    userId,
    businessName,
    businessLink,
    businessLocation,
    adDescription,
    selectedWebsites
  } = location.state || {};

  const [categoriesByWebsite, setCategoriesByWebsite] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const promises = selectedWebsites.map(async (websiteId) => {
          const websiteResponse = await fetch(`https://yepper-backend.onrender.com/api/websites/website/${websiteId}`);
          const websiteData = await websiteResponse.json();
          const categoriesResponse = await fetch(`https://yepper-backend.onrender.com/api/ad-categories/${websiteId}`);
          const categoriesData = await categoriesResponse.json();

          return {
            websiteName: websiteData.websiteName || 'Unknown Website',
            websiteLink: websiteData.websiteLink || '#',
            categories: categoriesData.categories || [],
          };
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
      prevSelected.includes(categoryId) 
        ? prevSelected.filter((id) => id !== categoryId) 
        : [...prevSelected, categoryId]
    );
  };

  const handleNext = (e) => {
    e.preventDefault();

    if (selectedCategories.length === 0) {
      setError(true);
      return;
    }

    setError(false);
    navigate('/spaces', {
      state: { 
        file, 
        userId, 
        businessName, 
        businessLink, 
        businessLocation, 
        adDescription, 
        selectedWebsites, 
        selectedCategories 
      },
    });
  };

  return (
    <>
      <BackButton />
      <div className="categories-container">
        <div className="categories-wrapper">
          <div className="categories-header">
            <h1 className="header-title">Select Advertisement Categories</h1>
            <button 
              onClick={handleNext}
              disabled={selectedCategories.length === 0}
              className={`next-button ${selectedCategories.length === 0 ? 'button-disabled' : ''}`}
            >
              Next <CheckIcon className="icon" />
            </button>
          </div>

          <div className="categories-content">
            {error && (
              <div className="error-message" role="alert">
                <span>Please select at least one category to proceed.</span>
              </div>
            )}

            {categoriesByWebsite.length > 0 ? (
              <div className="website-grid">
                {categoriesByWebsite.map((website) => (
                  <div 
                    key={website.websiteName} 
                    className="website-card"
                  >
                    <div className="card-header">
                      <h2 className="website-title">{website.websiteName}</h2>
                      <a 
                        href={website.websiteLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="website-link"
                      >
                        <LinkIcon className="icon" />
                      </a>
                    </div>
                    
                    {website.categories.length > 0 ? (
                      <div className="categories-list">
                        {website.categories.map((category) => (
                          <label 
                            key={category._id} 
                            className="category-item"
                          >
                            <input
                              type="checkbox"
                              value={category._id}
                              onChange={() => handleCategorySelection(category._id)}
                              checked={selectedCategories.includes(category._id)}
                              className="category-checkbox"
                            />
                            <span className="category-name">{category.categoryName}</span>
                            <span className="category-price">${category.price}</span>
                          </label>
                        ))}
                      </div>
                    ) : (
                      <p className="no-categories">No categories available for this website.</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-websites">
                <p>No categories available for the selected websites.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Categories;
