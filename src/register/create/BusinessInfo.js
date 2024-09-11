import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles/businessForm.css';

function BusinessForm() {
    const location = useLocation();
    const navigate = useNavigate();
    const { file, selectedCategories, userId } = location.state || {};

    const [businessName, setBusinessName] = useState('');
    const [businessWebsite, setBusinessWebsite] = useState('');
    const [businessLocation, setBusinessLocation] = useState('');
    const [businessContacts, setBusinessContacts] = useState('');
    const [adDescription, setAdDescription] = useState('');

    const [emptyField, setEmptyField] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handlePublish = async (e) => {
        setLoading(true);
        e.preventDefault();

        if (!businessName || !businessLocation || !adDescription) {
            setEmptyField(['businessName', 'businessLocation', 'adDescription']);
            setError('All fields are required');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('userId', userId);
        formData.append('businessName', businessName);
        formData.append('businessWebsite', businessWebsite);
        formData.append('businessLocation', businessLocation);
        formData.append('businessContacts', businessContacts);
        formData.append('adDescription', adDescription);

        selectedCategories.forEach((category) => {
            formData.append('categories[]', category);
        });

        try {
            const response = await axios.post('https://yepper-backend.onrender.com/api/requestAd', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (!response) {
                console.error('There was an error during ad upload');
            } else {
                navigate('/dashboard');
            }
        } catch (error) {
            console.error('Error during ad upload:', error);
            setError('An error occurred while uploading the ad');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='business-form-wrapper'>
            <form onSubmit={handlePublish} className='business-form-new'>
                <h1>Register Your Business</h1>
                {error && <p className="error-message">{error}</p>}

                <div className='form-group'>
                    <label htmlFor='businessName'>Business Name</label>
                    <input
                        type='text'
                        id='businessName'
                        name='businessName'
                        placeholder='Your business name'
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        className={emptyField.includes('businessName') ? 'error-field' : ''}
                    />
                </div>

                <div className='form-group'>
                    <label htmlFor='businessWebsite'>Business Website</label>
                    <input
                        type='text'
                        id='businessWebsite'
                        name='businessWebsite'
                        placeholder='Business website (optional)'
                        value={businessWebsite}
                        onChange={(e) => setBusinessWebsite(e.target.value)}
                    />
                </div>

                <div className='form-group'>
                    <label htmlFor='businessLocation'>Business Location</label>
                    <input
                        type='text'
                        id='businessLocation'
                        name='businessLocation'
                        placeholder='Your business location'
                        value={businessLocation}
                        onChange={(e) => setBusinessLocation(e.target.value)}
                        className={emptyField.includes('businessLocation') ? 'error-field' : ''}
                    />
                </div>

                <div className='form-group'>
                    <label htmlFor='businessContacts'>Business Contacts</label>
                    <input
                        type='text'
                        id='businessContacts'
                        name='businessContacts'
                        placeholder='Your business contacts (phone, email)'
                        value={businessContacts}
                        onChange={(e) => setBusinessContacts(e.target.value)}
                    />
                </div>

                <div className='form-group'>
                    <label htmlFor='adDescription'>Business Description</label>
                    <textarea
                        id='adDescription'
                        name='adDescription'
                        placeholder='Describe your business'
                        value={adDescription}
                        onChange={(e) => setAdDescription(e.target.value)}
                        className={emptyField.includes('adDescription') ? 'error-field' : ''}
                    />
                </div>

                <button type="submit" className='submit-btn-new' disabled={loading}>
                    {loading ? 'Submitting...' : 'Submit'}
                </button>
            </form>
        </div>
    );
}

export default BusinessForm;
