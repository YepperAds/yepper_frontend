// // Business.js
// import React, { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import './styles/businessForm.css';
// import BackButton from '../../components/backToPreviusButton';

// function BusinessForm() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { file, userId } = location.state || {};

//   const [businessName, setBusinessName] = useState('');
//   const [businessLink, setBusinessLink] = useState('');
//   const [businessLocation, setBusinessLocation] = useState('');
//   const [adDescription, setAdDescription] = useState('');

//   const [emptyField, setEmptyField] = useState([]);
//   const [error, setError] = useState(null);

//   const handleNext = (e) => {
//     e.preventDefault();

//     if (!businessName || !businessLocation || !adDescription) {
//       setEmptyField(['businessName', 'businessLocation', 'adDescription']);
//       setError('All fields are required');
//       return;
//     }

//     navigate('/websites', {
//       state: {
//         file,
//         userId,
//         businessName,
//         businessLink,
//         businessLocation,
//         adDescription,
//       },
//     });
//   };

//   return (
//     <>
//       <BackButton />
//       <div className='business-form-container web-app'>
//         <form onSubmit={handleNext} className='business-form'>
//           <h1>Add Your Business</h1>
//           {error && <p className="error">{error}</p>}
//           <div className='form-group'>
//             <label htmlFor='business-name'>Business Name</label>
//             <input 
//               type='text'
//               id='business-name'
//               name='business-name'
//               placeholder='Enter your business name'
//               value={businessName}
//               onChange={(e) => setBusinessName(e.target.value)}
//               className={emptyField.includes('businessName') ? 'error' : ''}
//               required
//             />
//           </div>
//           <div className='form-group'>
//             <label htmlFor='business-link'>Business Link</label>
//             <input 
//               type='text'
//               id='business-link'
//               name='business-link'
//               placeholder='Enter your business website Link'
//               value={businessLink}
//               onChange={(e) => setBusinessLink(e.target.value)}
//               className={emptyField.includes('businessLink') ? 'error' : ''}
//               required
//             />
//           </div>
//           <div className='form-group'>
//             <label htmlFor='business-location'>Business Location</label>
//             <input 
//               type='text'
//               id='business-location'
//               name='business-location'
//               placeholder='Enter your business location'
//               value={businessLocation}
//               onChange={(e) => setBusinessLocation(e.target.value)}
//               className={emptyField.includes('businessLocation') ? 'error' : ''}
//               required
//             />
//           </div>
//           <div className='form-group'>
//             <label htmlFor='business-description'>Business Description</label>
//             <textarea 
//               id='business-description' 
//               name='business-description' 
//               placeholder='Enter your business description'
//               value={adDescription}
//               onChange={(e) => setAdDescription(e.target.value)}
//               className={emptyField.includes('adDescription') ? 'error' : ''}
//               required
//             />
//           </div>
//           <button type="submit" className='submit-btn'>Submit</button>
//         </form>
//       </div>
//     </>
//   )
// }

// export default BusinessForm;

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Building2, MapPin, Link, FileText, ArrowRight } from 'lucide-react';
import './styles/businessForm.css';
import BackButton from '../../components/backToPreviusButton';

function ImprovedBusinessForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const { file, userId } = location.state || {};

  const [businessData, setBusinessData] = useState({
    businessName: '',
    businessLink: '',
    businessLocation: '',
    adDescription: ''
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBusinessData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear specific field error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    Object.entries(businessData).forEach(([key, value]) => {
      if (!value.trim()) {
        newErrors[key] = 'This field is required';
      }
    });

    // Validate business link (optional, but should be a valid URL if provided)
    if (businessData.businessLink && 
        !/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(businessData.businessLink)) {
      newErrors.businessLink = 'Please enter a valid URL';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = (e) => {
    e.preventDefault();

    if (validateForm()) {
      navigate('/websites', {
        state: {
          file,
          userId,
          ...businessData
        },
      });
    }
  };

  return (
    <>
      <BackButton />
      <div className="business-form-wrapper">
        <div className="business-form-container">
          <div className="form-illustration">
            <div className="illustration-content">
              <h2>Tell Us About Your Business</h2>
              <p>Share the details that will help create a compelling ad</p>
              <div className="form-highlights">
                <div className="highlight-item">
                  <Building2 size={24} />
                  <span>Showcase Your Brand</span>
                </div>
                <div className="highlight-item">
                  <MapPin size={24} />
                  <span>Specify Your Location</span>
                </div>
                <div className="highlight-item">
                  <Link size={24} />
                  <span>Connect Your Website</span>
                </div>
              </div>
            </div>
          </div>
          <form onSubmit={handleNext} className="business-form">
            <div className="form-header">
              <h1>Business Details</h1>
              <p>Complete your business profile</p>
            </div>

            <div className="form-grid">
              <div className="input-wrapper">
                <label htmlFor="businessName">
                  <Building2 size={20} />
                  Business Name
                </label>
                <input 
                  type="text"
                  id="businessName"
                  name="businessName"
                  placeholder="Enter your business name"
                  value={businessData.businessName}
                  onChange={handleInputChange}
                  className={errors.businessName ? 'input-error' : ''}
                />
                {errors.businessName && <span className="error-message">{errors.businessName}</span>}
              </div>

              <div className="input-wrapper">
                <label htmlFor="businessLink">
                  <Link size={20} />
                  Business Website
                </label>
                <input 
                  type="text"
                  id="businessLink"
                  name="businessLink"
                  placeholder="Optional: https://www.yourbusiness.com"
                  value={businessData.businessLink}
                  onChange={handleInputChange}
                  className={errors.businessLink ? 'input-error' : ''}
                />
                {errors.businessLink && <span className="error-message">{errors.businessLink}</span>}
              </div>

              <div className="input-wrapper full-width">
                <label htmlFor="businessLocation">
                  <MapPin size={20} />
                  Business Location
                </label>
                <input 
                  type="text"
                  id="businessLocation"
                  name="businessLocation"
                  placeholder="City, State, or Country"
                  value={businessData.businessLocation}
                  onChange={handleInputChange}
                  className={errors.businessLocation ? 'input-error' : ''}
                />
                {errors.businessLocation && <span className="error-message">{errors.businessLocation}</span>}
              </div>

              <div className="input-wrapper full-width">
                <label htmlFor="adDescription">
                  <FileText size={20} />
                  Business Description
                </label>
                <textarea 
                  id="adDescription"
                  name="adDescription"
                  placeholder="Tell us about your business in a few compelling words"
                  value={businessData.adDescription}
                  onChange={handleInputChange}
                  className={errors.adDescription ? 'input-error' : ''}
                />
                {errors.adDescription && <span className="error-message">{errors.adDescription}</span>}
              </div>
            </div>

            <button type="submit" className="submit-button">
              Continue <ArrowRight size={20} />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ImprovedBusinessForm;