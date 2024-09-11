import React, { useState } from 'react';
import { useClerk } from "@clerk/clerk-react";
import { useNavigate, useLocation } from "react-router-dom";
import './styles/categories.css';

function Categories() {
  const { user } = useClerk();
  const location = useLocation();
  const { file } = location.state || {};
  const navigate = useNavigate();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [error, setError] = useState(null);

  const categories = [
    { id: 'manufacturing', label: 'Manufacturing', imgSrc: 'https://img.freepik.com/free-photo/new-york-city-manhattan-aerial-view_649448-2832.jpg?uid=R102997587&ga=GA1.1.2142793496.1716934876&semt=sph' },
    { id: 'technology', label: 'Technology', imgSrc: 'https://img.freepik.com/free-photo/amazing-beautiful-sky-with-clouds-with-antenna_58702-1670.jpg?uid=R102997587&ga=GA1.1.2142793496.1716934876&semt=ais_hybrid' },
    { id: 'agriculture', label: 'Agriculture', imgSrc: 'https://img.freepik.com/premium-photo/dirt-road-through-maize-green-field-blue-sky-ukraine_483766-183.jpg?uid=R102997587&ga=GA1.1.2142793496.1716934876&semt=sph' },
    { id: 'retail', label: 'Retail', imgSrc: 'https://img.freepik.com/free-photo/vendor-checks-out-groceries-desk_482257-76087.jpg?uid=R102997587&ga=GA1.1.2142793496.1716934876&semt=ais_hybrid' },
    { id: 'services', label: 'Services', imgSrc: 'https://img.freepik.com/free-photo/black-man-using-computer_23-2149370615.jpg?uid=R102997587&ga=GA1.1.2142793496.1716934876&semt=ais_hybrid' },
    { id: 'hospitality', label: 'Hospitality', imgSrc: 'https://img.freepik.com/free-photo/black-wooden-table_417767-153.jpg?uid=R102997587&ga=GA1.1.2142793496.1716934876&semt=ais_hybrid' },
    { id: 'transportationAndLogistics', label: 'Transportation & Logistics', imgSrc: 'https://img.freepik.com/free-photo/young-man-working-warehouse-with-boxes_1303-16615.jpg?uid=R102997587&ga=GA1.1.2142793496.1716934876&semt=sph' },
    { id: 'realEstate', label: 'Real Estate', imgSrc: 'https://img.freepik.com/premium-photo/path-field_5219-2713.jpg?uid=R102997587&ga=GA1.1.2142793496.1716934876&semt=ais_hybrid' },
  ];

  const handleCategoryClick = (categoryId) => {
    setSelectedCategories(prevState =>
      prevState.includes(categoryId)
        ? prevState.filter(category => category !== categoryId)
        : [...prevState, categoryId]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedCategories.length === 0) {
      setError('Please select at least one category');
      return;
    }
    setError(null);
    navigate('/add-info', {
        state: {
            file,
            selectedCategories,
            userId: user.id,
        }
    });
  };

  return (
    <div className="categories-choose">
      <div className="categories-header">
        <h1>Select a Business Category</h1>
        <p>Choose one or more categories that best fit your business</p>
      </div>
      <form onSubmit={handleSubmit} className="categories-form">
        <div className="categories-grid">
          {categories.map(category => (
            <div
              key={category.id}
              className={`category-card ${selectedCategories.includes(category.id) ? 'selected' : ''}`}
              onClick={() => handleCategoryClick(category.id)}
            >
              <img src={category.imgSrc} alt={category.label} className="category-image" />
              <div className="category-content">
                <h3>{category.label}</h3>
              </div>
            </div>
          ))}
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit" className="submit-button">Continue</button>
      </form>
    </div>
  );
}

export default Categories;
