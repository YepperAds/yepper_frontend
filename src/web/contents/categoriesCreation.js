import React, { useState, useMemo, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useClerk } from '@clerk/clerk-react';
import { 
    Info, 
    Check, 
    DollarSign, 
    Image, 
    Maximize2,
    X,
    LayoutGrid, 
    AlignVerticalSpaceAround, 
} from 'lucide-react';
import '../styles/categories.css';

function CategoriesCreation() {
    const { user } = useClerk();
    const ownerId = user?.id;
    const { websiteId } = useParams();
    const { state } = useLocation();
    const navigate = useNavigate();

    const [websiteDetails] = useState(state?.websiteDetails || null);
    
    useEffect(() => {
        // Verify we have necessary website data
        if (!websiteId) {
            navigate('/create-website');
            return;
        }

        // Optional: Fetch website details if not passed through state
        if (!websiteDetails) {
            const fetchWebsiteDetails = async () => {
                try {
                    const response = await axios.get(`https://yepper-backend.onrender.com/api/websites/${websiteId}`);
                    // Handle the website details...
                } catch (error) {
                    console.error('Failed to fetch website details:', error);
                    navigate('/create-website');
                }
            };
            fetchWebsiteDetails();
        }
    }, [websiteId, websiteDetails, navigate]);

    const [selectedCategories, setSelectedCategories] = useState({
        banner: false,
        display: false,
        native: false,
        popup: false,
    });
  
    const [prices, setPrices] = useState({});
    const [activeInfoModal, setActiveInfoModal] = useState(null);
  
    const categoryDetails = useMemo(() => ({
        banner: {
            icon: <Image className="icon-target" />,
            description: "Banner ads are traditional rectangular advertisements placed at the top, bottom, or sides of a webpage.",
            benefits: [
            "High visibility across the entire page",
            "Classic advertising format recognized by users",
            "Flexible sizing options"
            ],
        },
        display: {
            icon: <AlignVerticalSpaceAround className="icon-bar-chart" />,
            description: "Display ads use rich media, text, and images to communicate an advertising message.",
            benefits: [
            "Supports complex visual storytelling",
            "Can include interactive elements",
            "Targets specific audience segments"
            ],
        },
        native: {
            icon: <LayoutGrid className="icon-target" />,
            description: "Native ads match the look, feel, and function of the media format in which they appear.",
            benefits: [
            "Blends seamlessly with content",
            "Higher engagement rates",
            "Less disruptive to user experience"
            ],
        },
        popup: {
            icon: <Maximize2 className="icon-maximize" />,
            description: "Popup ads appear in a new window, capturing immediate user attention.",
            benefits: [
            "Immediate user focus",
            "Can trigger specific actions",
            "Highly noticeable"
            ],
        }
    }), []);
  
    const handleCategoryChange = (category) => {
      setSelectedCategories((prevState) => ({
        ...prevState,
        [category]: !prevState[category],
      }));
    };
  
    const handlePriceChange = (category, price) => {
      setPrices((prevState) => ({
        ...prevState,
        [category]: price,
      }));
    };
  
    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
          const categoriesToSubmit = Object.entries(selectedCategories)
            .filter(([, selected]) => selected)
            .map(([category]) => ({
              ownerId: user?.id,
              websiteId,
              categoryName: category.charAt(0).toUpperCase() + category.slice(1),
              price: prices[category],
              description: categoryDetails[category]?.description || '',
              customAttributes: {},
            }));
    
          const responses = await Promise.all(
            categoriesToSubmit.map(async (category) => {
              const response = await axios.post('https://yepper-backend.onrender.com/api/ad-categories', category);
              return { ...response.data, name: category.categoryName };
            })
          );
    
          const categoriesWithId = responses.reduce((acc, category) => {
            acc[category.name.toLowerCase()] = { id: category._id, price: category.price };
            return acc;
          }, {});
    
          // Navigate to spaces with both website and category information
          navigate('/create-spaces', {
            state: {
              websiteId,
              websiteDetails,
              selectedCategories: categoriesWithId,
              prices,
            },
          });
        } catch (error) {
          console.error('Failed to submit categories:', error);
        }
    };
  
    const renderCategoryOption = (category) => {
      if (!category || !categoryDetails[category]) return null;

      const details = categoryDetails[category];
      return (
        <div 
          key={category}
          className="category-option"
        >
          <label className="category-label">
            {details.icon}
            <input
              type="checkbox"
              checked={selectedCategories[category] || false}
              onChange={() => handleCategoryChange(category)}
              className="category-checkbox"
            />
            <span className="category-label-text">
              {category || 'Unknown'}
            </span>
          </label>
          <div className="price-input-container">
            <button 
              type="button" 
              onClick={() => setActiveInfoModal(category)}
              className="info-button"
            >
              <Info className="icon-info" />
            </button>
            {selectedCategories[category] && (
              <div className="price-input-container">
                <DollarSign className="icon-dollar" />
                <input
                  type="number"
                  placeholder="Price"
                  className="price-input"
                  value={prices[category] || ''}
                  onChange={(e) => handlePriceChange(category, e.target.value)}
                />
              </div>
            )}
          </div>
        </div>
      );
    };
  
    const renderInfoModal = (category) => {
      if (!category || !categoryDetails[category]) return null;
      
      const details = categoryDetails[category];
      return (
        <div className="info-modal-overlay">
          <div className="info-modal-content">
            <h2 className="info-modal-title">
              {details.icon}
              <span>{category ? category.charAt(0).toUpperCase() + category.slice(1) : 'Ad'} Ads</span>
            </h2>
            <div className="grid">
              <img 
                src={details.image} 
                alt={`${category || 'ad'} ad example`} 
                className="w-full rounded-lg shadow-lg transform transition-transform hover:scale-105"
              />
              <div>
                <blockquote className="info-modal-description">
                  {details.description}
                </blockquote>
                <h3 className="info-modal-benefits-title">
                  Key Benefits
                </h3>
                <ul className="info-modal-benefits-list">
                  {details.benefits.map((benefit, index) => (
                    <li key={index} className="info-modal-benefits-item">
                      <Check className="icon-check" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <button 
              onClick={() => setActiveInfoModal(null)} 
              className="info-modal-close"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      );
    };
  
    return (
      <div className="categories-container">
        <h2 className="categories-title">
          Select Ad Categories
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            {Object.keys(categoryDetails).map(renderCategoryOption)}
            {renderInfoModal(activeInfoModal)}
          </div>
          <button 
            type="submit" 
            className="submit-button"
          >
            <Check className="icon-check" /> Continue
          </button>
        </form>
      </div>
    );
}

export default CategoriesCreation;