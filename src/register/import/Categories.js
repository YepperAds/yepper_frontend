// import React from 'react'
// import './styles/categories.css'
// import { Link } from 'react-router-dom'

// function Categories() {
//   const categories = [
//     {
//       id: 'manufacturing',
//       label: 'Manufacturing',
//       imgSrc: 'https://img.freepik.com/free-photo/new-york-city-manhattan-aerial-view_649448-2832.jpg?uid=R102997587&ga=GA1.1.2142793496.1716934876&semt=sph',
//       link: '/business'
//     },
//     {
//       id: 'technology',
//       label: 'Technology',
//       imgSrc: 'https://img.freepik.com/free-photo/amazing-beautiful-sky-with-clouds-with-antenna_58702-1670.jpg?uid=R102997587&ga=GA1.1.2142793496.1716934876&semt=ais_hybrid',
//       link: '/business'
//     },
//     {
//       id: 'agriculture',
//       label: 'Agriculture',
//       imgSrc: 'https://img.freepik.com/premium-photo/dirt-road-through-maize-green-field-blue-sky-ukraine_483766-183.jpg?uid=R102997587&ga=GA1.1.2142793496.1716934876&semt=sph',
//       link: '/business'
//     },
//     {
//       id: 'retail',
//       label: 'Retail',
//       imgSrc: 'https://img.freepik.com/free-photo/vendor-checks-out-groceries-desk_482257-76087.jpg?uid=R102997587&ga=GA1.1.2142793496.1716934876&semt=ais_hybrid',
//       link: '/business'
//     },
//     {
//       id: 'services',
//       label: 'Services',
//       imgSrc: 'https://img.freepik.com/free-photo/black-man-using-computer_23-2149370615.jpg?uid=R102997587&ga=GA1.1.2142793496.1716934876&semt=ais_hybrid',
//       link: '/business'
//     },
//     {
//       id: 'hospitality',
//       label: 'Hospitality',
//       imgSrc: 'https://img.freepik.com/free-photo/black-wooden-table_417767-153.jpg?uid=R102997587&ga=GA1.1.2142793496.1716934876&semt=ais_hybrid',
//       link: '/business'
//     },
//     {
//       id: 'transportationAndLogistics',
//       label: 'Transportation & Logistics',
//       imgSrc: 'https://img.freepik.com/free-photo/young-man-working-warehouse-with-boxes_1303-16615.jpg?uid=R102997587&ga=GA1.1.2142793496.1716934876&semt=sph',
//       link: '/business'
//     },
//     {
//       id: 'realEstate',
//       label: 'Real Estate',
//       imgSrc: 'https://img.freepik.com/premium-photo/path-field_5219-2713.jpg?uid=R102997587&ga=GA1.1.2142793496.1716934876&semt=ais_hybrid',
//       link: '/business'
//     }
//   ];

//   return (
//     <div className='category-container'>
//       <div className='container'>
//         {categories.map(category => (
//           <div key={category.id} className='category-item'>
//             <input type="radio" id={category.id} name="category" value={category.id} />
//             <label htmlFor={category.id}>
//               <div className='category-content'>
//                 <h3>{category.label}</h3>
//                 <Link to={category.link}>Select</Link>
//               </div>
//             </label>
//             <img src={category.imgSrc} alt={category.label} />
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default Categories

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
    navigate('/business', {
      state: {
        file,
        selectedCategories,
        userId: user.id,
      }
    });
  };

  return (
    <div className='categories-container'>
      <h1>Select Your Business Category</h1>
      <form onSubmit={handleSubmit}>
        <div className='categories-grid'>
          {categories.map(category => (
            <div
              key={category.id}
              className={`category-item ${selectedCategories.includes(category.id) ? 'selected' : ''}`}
              onClick={() => handleCategoryClick(category.id)}
            >
              <img src={category.imgSrc} alt={category.label} />
              <div className='category-overlay'>
                <h3>{category.label}</h3>
              </div>
            </div>
          ))}
        </div>
        {error && <div className="error">{error}</div>}
        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
  );
}

export default Categories;
