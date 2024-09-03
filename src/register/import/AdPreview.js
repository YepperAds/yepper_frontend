// // AdPreview.js
// import React, { useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './styles/adPreview.css';

// const AdPreview = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { file, userId, businessName, businessLocation, adDescription, selectedCategory, templateType } = location.state || {};

//   const [adContent, setAdContent] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     const reader = new FileReader();
//     reader.onload = (e) => setAdContent(e.target.result);
//     reader.readAsDataURL(file);
//   }, [file]);

//   useEffect(() => {
//     if (templateType === 'pop-up') {
//       const interval = setInterval(() => {
//         setIsVisible((prev) => !prev);
//       }, 2000);
//       return () => clearInterval(interval);
//     } else {
//       setIsVisible(true);
//     }
//   }, [templateType]);

//   const handlePublish = async () => {
//     setLoading(true);
//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('userId', userId);
//     formData.append('businessName', businessName);
//     formData.append('businessLocation', businessLocation);
//     formData.append('adDescription', adDescription);
//     formData.append('category', selectedCategory);
//     formData.append('templateType', templateType);
  
//     try {
//       const response = await axios.post('https://yepper-backend.onrender.com/api/importAds', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
  
//       const apiUrl = `https://yepper-backend.onrender.com/api/importAds/${response.data._id}`;
//       navigate('/ad-api', { state: { apiUrl } });
//     } catch (error) {
//       console.error('Error during ad upload:', error);
//       setError('An error occurred while uploading the ad');
//     } finally {
//       setLoading(false);
//     }
//   };  

//   return (
//     <div className="ad-preview-container">
//       <h1>Preview Your Ad</h1>
//       <div className="ad-template-container">
//         {isVisible && (
//           <div className={`ad-template ${templateType}`}>
//             {adContent && <img src={adContent} alt="Ad" />}
//             <p>{adDescription}</p>
//           </div>
//         )}
//       </div>
//       {error && <div className="error">{error}</div>}
//       <button onClick={handlePublish} disabled={loading}>
//         {loading ? 'Publishing...' : 'Publish Ad'}
//       </button>
//     </div>
//   );
// };

// export default AdPreview;

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles/adPreview.css';

const AdPreview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { file, userId, businessName, businessLocation, adDescription, selectedCategories, templateType } = location.state || {};

  const [adContent, setAdContent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const reader = new FileReader();
    reader.onload = (e) => setAdContent(e.target.result);
    reader.readAsDataURL(file);
  }, [file]);

  useEffect(() => {
    if (templateType === 'pop-up') {
      const interval = setInterval(() => {
        setIsVisible((prev) => !prev);
      }, 2000);
      return () => clearInterval(interval);
    } else {
      setIsVisible(true);
    }
  }, [templateType]);

  const handlePublish = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('userId', userId);
    formData.append('businessName', businessName);
    formData.append('businessLocation', businessLocation);
    formData.append('adDescription', adDescription);
    formData.append('templateType', templateType);
  
    selectedCategories.forEach((category) => {
      formData.append('categories[]', category);
    });
    
    try {
      const response = await axios.post('https://yepper-backend.onrender.com/api/importAds', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      const apiUrl = `https://yepper-backend.onrender.com/api/importAds/${response.data._id}`;
      navigate('/dashboard');
      // navigate('/ad-api', { state: { apiUrl } });
    } catch (error) {
      console.error('Error during ad upload:', error);
      setError('An error occurred while uploading the ad');
    } finally {
      setLoading(false);
    }
  };  

  return (
    <div className="ad-preview-container">
      <h1>Preview Your Ad</h1>
      <div className="ad-template-container">
        {isVisible && (
          <div className={`ad-template ${templateType}`}>
            {adContent && <img src={adContent} alt="Ad" />}
          </div>
        )}
      </div>
      {error && <div className="error">{error}</div>}
      <button onClick={handlePublish} disabled={loading}>
        {loading ? 'Publishing...' : 'Publish Ad'}
      </button>
    </div>
  );
};

export default AdPreview;
