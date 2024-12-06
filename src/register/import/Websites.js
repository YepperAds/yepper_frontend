// // Advertisers.js
// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import './styles/websites.css';
// import BackButton from '../../components/backToPreviusButton';

// function Advertisers() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { file, userId, businessName, businessLink, businessLocation, adDescription } = location.state || {};
//   const [websites, setWebsites] = useState([]);
//   const [selectedWebsites, setSelectedWebsites] = useState([]);
//   const [error, setError] = useState(false);

//   useEffect(() => {
//     const fetchWebsites = async () => {
//       try {
//         const response = await fetch('https://yepper-backend.onrender.com/api/websites');
//         const data = await response.json();
//         setWebsites(data);
//       } catch (error) {
//         console.error('Failed to fetch websites:', error);
//       }
//     };

//     fetchWebsites();
//   }, []);

//   const handleSelect = (websiteId) => {
//     setSelectedWebsites((prevSelected) => {
//       if (prevSelected.includes(websiteId)) {
//         return prevSelected.filter(id => id !== websiteId); // Uncheck if already selected
//       } else {
//         return [...prevSelected, websiteId]; // Add if not already selected
//       }
//     });
//   };

//   const handleNext = (e) => {
//     e.preventDefault();

//     // If no website is selected, show error and prevent navigation
//     if (selectedWebsites.length === 0) {
//       setError(true);
//       return;
//     }

//     setError(false); // Clear any previous error

//     navigate('/categories', {
//       state: {
//         file,
//         userId,
//         businessName,
//         businessLink,
//         businessLocation,
//         adDescription,
//         selectedWebsites, // Pass selected websites to the next page
//       },
//     });
//   };

//   return (
//     <>
//       <BackButton />
//       <div className="webs-select web-app">
//         <form onSubmit={handleNext}>
//           <h1>Select Websites to Advertise</h1>
//           <div className="websites-grid">
//             {websites.map((website) => (
//               <div key={website._id} className={`website-card ${selectedWebsites.includes(website._id) ? 'selected' : ''}`} onClick={() => handleSelect(website._id)}>
//                 <img src={website.logoUrl || 'global.png'} alt={`${website.websiteName} logo`} className="website-logo" />
//                 <div className="website-info">
//                   <h2>{website.websiteName}</h2>
//                   <p>{website.websiteLink}</p>
//                 </div>
//                 <div className="toggle-switch">
//                   <input
//                     type="checkbox"
//                     checked={selectedWebsites.includes(website._id)}
//                     onChange={() => handleSelect(website._id)}
//                   />
//                   <span className="slider"></span>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Validation Error Message */}
//           {error && <p className="error-message">Please select at least one website to proceed.</p>}

//           {/* Fixed button container */}
//           <div className="fixed-button-container">
//             <button type="submit" disabled={selectedWebsites.length === 0}>Next</button>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// }

// export default Advertisers;

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Globe, Check, ArrowRight, Search, Filter } from 'lucide-react';
import './styles/websites.css';
import BackButton from '../../components/backToPreviusButton';

function ImprovedAdvertisers() {
  const location = useLocation();
  const navigate = useNavigate();
  const { file, userId, businessName, businessLink, businessLocation, adDescription } = location.state || {};
  
  const [websites, setWebsites] = useState([]);
  const [filteredWebsites, setFilteredWebsites] = useState([]);
  const [selectedWebsites, setSelectedWebsites] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWebsites = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('https://yepper-backend.onrender.com/api/websites');
        const data = await response.json();
        
        setWebsites(data);
        setFilteredWebsites(data);
        
        // Extract unique categories
        const uniqueCategories = ['All', ...new Set(data.map(site => site.category))];
        setCategories(uniqueCategories);
        
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch websites:', error);
        setIsLoading(false);
      }
    };

    fetchWebsites();
  }, []);

  useEffect(() => {
    // Filter websites based on search term and category
    let result = websites;
    
    if (searchTerm) {
      result = result.filter(site => 
        site.websiteName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        site.websiteLink.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedCategory !== 'All') {
      result = result.filter(site => site.category === selectedCategory);
    }
    
    setFilteredWebsites(result);
  }, [searchTerm, selectedCategory, websites]);

  const handleSelect = (websiteId) => {
    setSelectedWebsites(prev => 
      prev.includes(websiteId) 
        ? prev.filter(id => id !== websiteId)
        : [...prev, websiteId]
    );
  };

  const handleNext = () => {
    if (selectedWebsites.length === 0) return;

    navigate('/categories', {
      state: {
        file,
        userId,
        businessName,
        businessLink,
        businessLocation,
        adDescription,
        selectedWebsites,
      },
    });
  };

  return (
    <>
      <BackButton />
      <div className="advertisers-container">
        <div className="advertisers-content">
          <div className="advertisers-header">
            <h1>Choose Your Advertising Platforms</h1>
            <p>Select the websites that best match your target audience</p>
          </div>

          <div className="filters-container">
            <div className="search-wrapper">
              <Search size={20} className="search-icon" />
              <input 
                type="text" 
                placeholder="Search websites" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>

            <div className="category-filter">
              <Filter size={20} />
              <select 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="category-select"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {isLoading ? (
            <div className="loading-container">
              <div className="spinner"></div>
              <p>Loading websites...</p>
            </div>
          ) : (
            <div className="websites-grid">
              {filteredWebsites.length === 0 ? (
                <div className="no-results">
                  <Globe size={48} />
                  <p>No websites found matching your search</p>
                </div>
              ) : (
                filteredWebsites.map((website) => (
                  <div 
                    key={website._id} 
                    className={`website-card ${selectedWebsites.includes(website._id) ? 'selected' : ''}`}
                    onClick={() => handleSelect(website._id)}
                  >
                    <div className="website-card-content">
                      <img 
                        src={website.logoUrl || 'global.png'} 
                        alt={`${website.websiteName} logo`} 
                        className="website-logo" 
                      />
                      <div className="website-details">
                        <h2>{website.websiteName}</h2>
                        <p>{website.websiteLink}</p>
                        <span className="website-category">{website.category}</span>
                      </div>
                    </div>
                    <div className="selection-indicator">
                      {selectedWebsites.includes(website._id) && <Check size={24} />}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          <div className="action-bar">
            <div className="selected-count">
              {selectedWebsites.length > 0 && (
                <span>{selectedWebsites.length} website{selectedWebsites.length !== 1 ? 's' : ''} selected</span>
              )}
            </div>
            <button 
              onClick={handleNext} 
              disabled={selectedWebsites.length === 0}
              className="next-button"
            >
              Continue <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ImprovedAdvertisers;