import React from 'react';
import './styles/businessForm.css';
import { Link } from 'react-router-dom';

function BusinessForm() {
  return (
    <div className='business-form-container'>
      <form className='business-form'>
        <h1>Add Your Business</h1>
        <div className='form-group'>
          <label htmlFor='business-name'>Business Name</label>
          <input type='text' id='business-name' name='business-name' placeholder='Enter your business name' />
        </div>
        <div className='form-group'>
          <label htmlFor='business-location'>Business Location</label>
          <input type='text' id='business-location' name='business-location' placeholder='Enter your business location' />
        </div>
        <div className='form-group'>
          <label htmlFor='business-description'>Business Description</label>
          <textarea id='business-description' name='business-description' placeholder='Enter your business description'></textarea>
        </div>
        <Link to='/' className='submit-btn'>Submit</Link>
      </form>
    </div>
  )
}

export default BusinessForm;
