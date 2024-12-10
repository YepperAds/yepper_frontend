// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useClerk } from '@clerk/clerk-react';
// import './styles/select.css';
// import BackButton from '../../components/backToPreviusButton';

// function Select() {
//   const navigate = useNavigate();
//   const { user } = useClerk();
//   const userId = user?.id;
//   const [file, setFile] = useState(null);
//   const [filePreview, setFilePreview] = useState(null);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     setFile(selectedFile);
//     setError(null);

//     if (selectedFile && (selectedFile.type.startsWith('image/') || selectedFile.type.startsWith('video/'))) {
//         setFilePreview(URL.createObjectURL(selectedFile));
//     } else {
//         setFilePreview(null);
//         setError('Please upload a valid image or video file');
//     }
//   };

//   const handleSave = async (e) => {
//     e.preventDefault();

//     try {
//       if (!file) {
//         alert('Please choose the Ad file');
//       } else {
//         navigate('/business', {
//           state: {
//             userId,
//             file,
//           }
//         });
//       }
//     } catch (error) {
//       alert('An error happened please check console');
//       console.log(error);
//     }
//   };

//   return (
//     <>
//       <BackButton />
//       <div className="new-file-container web-app">
//         <div className="form-wrapper">
//           <h1>Upload Your Ad</h1>
//           <p>Select an image or video file to create your ad</p>

//           <form onSubmit={handleSave}>
//             <div className="file-input">
//               <input
//                 id="file-upload"
//                 type="file"
//                 accept="image/*,video/*"
//                 onChange={handleFileChange}
//                 className="file-input-hidden"
//               />
//               <label htmlFor="file-upload" className="file-upload-label">
//                 <img src="https://cdn-icons-png.flaticon.com/512/685/685817.png" alt="Upload icon" />
//                 Select File
//               </label>
//             </div>
//             {error && <p className="error-message">{error}</p>}
//             {filePreview && (
//               <div className="file-preview">
//                 {file?.type.startsWith('image/') && (
//                   <img src={filePreview} alt="Selected file" className="preview-image" />
//                 )}
//                 {file?.type.startsWith('video/') && (
//                   <video src={filePreview} controls className="preview-video" />
//                 )}
//               </div>
//             )}

//             <button type="submit" disabled={loading} className="submit-btn">
//               {loading ? 'Processing...' : 'Next'}
//             </button>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Select;

import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useClerk } from '@clerk/clerk-react';
import { CloudUpload, FileText, Image, Video } from 'lucide-react';
import './styles/select.css';
import BackButton from '../../components/backToPreviusButton';

function ImprovedSelect() {
  const navigate = useNavigate();
  const { user } = useClerk();
  const userId = user?.id;
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    processFile(selectedFile);
  };

  const processFile = (selectedFile) => {
    if (!selectedFile) return;

    // Validate file type and size
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4', 'video/quicktime'];
    const maxSize = 50 * 1024 * 1024; // 50MB

    if (!validTypes.includes(selectedFile.type)) {
      setError('Unsupported file type. Please upload JPEG, PNG, GIF, or MP4.');
      return;
    }

    if (selectedFile.size > maxSize) {
      setError('File is too large. Maximum size is 50MB.');
      return;
    }

    setFile(selectedFile);
    setError(null);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setFilePreview({
        url: reader.result,
        type: selectedFile.type
      });
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const selectedFile = e.dataTransfer.files[0];
    processFile(selectedFile);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file to upload');
      return;
    }

    try {
      setLoading(true);
      navigate('/business', {
        state: { userId, file }
      });
    } catch (error) {
      setError('An error occurred during upload');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      <BackButton />
      <div className="file-upload-container">
        <div className="upload-card">
          <h2>Upload Your Ad Creative</h2>
          <p className="subtitle">Supported formats: JPEG, PNG, GIF, MP4 (max 50MB)</p>

          <div 
            className="drop-zone"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onClick={triggerFileInput}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/gif,video/mp4,video/quicktime"
              onChange={handleFileChange}
              className="hidden-input"
            />
            <CloudUpload size={48} className="upload-icon" />
            <p>Drag and drop or click to upload</p>
          </div>

          {error && (
            <div className="error-banner">
              <FileText size={20} />
              <span>{error}</span>
            </div>
          )}

          {filePreview && (
            <div className="preview-container">
              {filePreview.type.startsWith('image/') ? (
                <Image size={32} className="file-type-icon" />
              ) : (
                <Video size={32} className="file-type-icon" />
              )}
              <div className="preview-media">
                {filePreview.type.startsWith('image/') ? (
                  <img 
                    src={filePreview.url} 
                    alt="Preview" 
                    className="media-preview" 
                  />
                ) : (
                  <video 
                    src={filePreview.url} 
                    controls 
                    className="media-preview"
                  />
                )}
              </div>
            </div>
          )}

          <button 
            onClick={handleSave} 
            disabled={!file || loading}
            className="submit-button"
          >
            {loading ? 'Processing...' : 'Continue to Create Ad'}
          </button>
        </div>
      </div>
    </>
  );
}

export default ImprovedSelect;