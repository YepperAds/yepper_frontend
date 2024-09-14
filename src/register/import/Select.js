// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom'
// import './styles/select.css'

// function Select() {
//   const navigate = useNavigate();
//   const [file, setFile] = useState(null);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleFileChange = (e) => { 
//     setFile(e.target.files[0]);
//     setError(null);
//   };

//   const handleSave = async (e) => {
//     e.preventDefault();

//     try{
//       if(!file){
//         alert('Please choose the Ad file');
//       }else{
//         navigate('/categories',{
//           state:{
//             file
//           }
//         })
//       }
//     }catch(error){
//       alert('An error happened please check console');
//       console.log(error);
//     }
//   };

//   return (
//     <div className='select-container'>
//       <h1>Import your designed <br /> Ad pic or video</h1>
//       <form onSubmit={handleSave}>
//         <div className='file-input'>
//           <input 
//             type="file"
//             accept="image/*,application/pdf,video/*"
//             onChange={handleFileChange}
//             required
//             className='file' 
//           />
//           <label htmlFor='file'>
//             <img src='https://cdn-icons-png.flaticon.com/512/685/685817.png' alt='Upload icon' />
//             Choose File
//           </label>
//         </div>
//         {error && <p className='errorMessage'>{error}</p>}
//         <button type="submit" disabled={loading} className='next-link'>
//           {loading ? 'Loading...' : 'Next'}
//         </button>
//       </form>
//     </div>
//   )
// }

// export default Select

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/select.css';

function Select() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setError(null);

    if (selectedFile && (selectedFile.type.startsWith('image/') || selectedFile.type.startsWith('video/'))) {
        setFilePreview(URL.createObjectURL(selectedFile));
    } else {
        setFilePreview(null);
        setError('Please upload a valid image or video file');
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      if (!file) {
        alert('Please choose the Ad file');
      } else {
        navigate('/categories', {
          state: {
            file
          }
        });
      }
    } catch (error) {
      alert('An error happened please check console');
      console.log(error);
    }
  };

  return (
    <div className="new-file-container">
      <div className="form-wrapper">
        <h1>Upload Your Ad</h1>
        <p>Select an image or video file to create your ad</p>

        <form onSubmit={handleSave}>
          <div className="file-input">
            <input
              id="file-upload"
              type="file"
              accept="image/*,video/*"
              onChange={handleFileChange}
              className="file-input-hidden"
            />
            <label htmlFor="file-upload" className="file-upload-label">
              <img src="https://cdn-icons-png.flaticon.com/512/685/685817.png" alt="Upload icon" />
              Select File
            </label>
          </div>
          {error && <p className="error-message">{error}</p>}
          {filePreview && (
            <div className="file-preview">
              {file?.type.startsWith('image/') && (
                <img src={filePreview} alt="Selected file" className="preview-image" />
              )}
              {file?.type.startsWith('video/') && (
                <video src={filePreview} controls className="preview-video" />
              )}
            </div>
          )}

          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? 'Processing...' : 'Next'}
          </button>
      </form>
    </div>
  </div>
  );
}

export default Select;
