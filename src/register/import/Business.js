// Business.js
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './styles/businessForm.css';
import BackButton from '../../components/backToPreviusButton';

function BusinessForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const { file, userId } = location.state || {};

  const [businessName, setBusinessName] = useState('');
  const [businessLocation, setBusinessLocation] = useState('');
  const [adDescription, setAdDescription] = useState('');

  const [emptyField, setEmptyField] = useState([]);
  const [error, setError] = useState(null);

  const handleNext = (e) => {
    e.preventDefault();

    if (!businessName || !businessLocation || !adDescription) {
      setEmptyField(['businessName', 'businessLocation', 'adDescription']);
      setError('All fields are required');
      return;
    }

    navigate('/websites', {
      state: {
        file,
        userId,
        businessName,
        businessLocation,
        adDescription,
      },
    });
  };

  return (
    <>
      <BackButton />
      <div className='business-form-container web-app'>
        <form onSubmit={handleNext} className='business-form'>
          <h1>Add Your Business</h1>
          {error && <p className="error">{error}</p>}
          <div className='form-group'>
            <label htmlFor='business-name'>Business Name</label>
            <input 
              type='text'
              id='business-name'
              name='business-name'
              placeholder='Enter your business name'
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className={emptyField.includes('businessName') ? 'error' : ''}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='business-location'>Business Location</label>
            <input 
              type='text'
              id='business-location'
              name='business-location'
              placeholder='Enter your business location'
              value={businessLocation}
              onChange={(e) => setBusinessLocation(e.target.value)}
              className={emptyField.includes('businessLocation') ? 'error' : ''}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='business-description'>Business Description</label>
            <textarea 
              id='business-description' 
              name='business-description' 
              placeholder='Enter your business description'
              value={adDescription}
              onChange={(e) => setAdDescription(e.target.value)}
              className={emptyField.includes('adDescription') ? 'error' : ''}
              required
            />
          </div>
          <button type="submit" className='submit-btn'>Submit</button>
        </form>
      </div>
    </>
  )
}

export default BusinessForm;