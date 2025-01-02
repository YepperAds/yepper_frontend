import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useClerk } from '@clerk/clerk-react';
import { 
  UploadCloud, 
  X, 
  AlertTriangle 
} from 'lucide-react';
import axios from 'axios';

const EnterpriseWebsiteCreation = () => {
  const { user } = useClerk();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [formState, setFormState] = useState({
    websiteName: '',
    websiteUrl: '',
    imageUrl: null
  });
  const [uiState, setUiState] = useState({
    filePreview: null,
    error: null,
    isSubmitting: false
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateFile = (file) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.type)) {
      setUiState(prev => ({
        ...prev,
        error: 'Only JPEG, PNG, and GIF images are allowed.'
      }));
      return false;
    }

    if (file.size > maxSize) {
      setUiState(prev => ({
        ...prev,
        error: 'Image must be smaller than 5MB.'
      }));
      return false;
    }

    return true;
  };

  const processFile = (file) => {
    if (!file) return;

    if (!validateFile(file)) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormState(prev => ({
        ...prev,
        imageUrl: file
      }));
      setUiState(prev => ({
        ...prev,
        filePreview: reader.result,
        error: null
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleFileUpload = (e) => {
    const selectedFile = e.target.files[0];
    processFile(selectedFile);
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    const selectedFile = e.dataTransfer.files[0];
    processFile(selectedFile);
  };

  const removeFile = () => {
    setFormState(prev => ({
      ...prev,
      imageUrl: null
    }));
    setUiState(prev => ({
      ...prev,
      filePreview: null
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUiState(prev => ({ ...prev, isSubmitting: true }));

    try {
      const formData = new FormData();
      formData.append('ownerId', user?.id);
      formData.append('websiteName', formState.websiteName);
      formData.append('websiteLink', formState.websiteUrl);
      if (formState.imageUrl) {
        formData.append('file', formState.imageUrl);
      }

      const response = await axios.post(
        'https://yepper-backend.onrender.com/api/websites', 
        formData, 
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      if (response.status === 201) {
        navigate('/projects', { 
          state: { 
            websiteId: response.data._id,
            message: 'Website created successfully' 
          } 
        });
      }
    } catch (error) {
      setUiState(prev => ({
        ...prev,
        error: error.response?.data?.message || 'Failed to create website'
      }));
    } finally {
      setUiState(prev => ({ ...prev, isSubmitting: false }));
    }
  };

  // return (
  //   <div 
  //     className="container min-h-screen flex items-center justify-center p-4"
  //     style={{ 
  //       background: 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)'
  //     }}
  //   >
  //     <div 
  //       className="w-full max-w-md bg-white shadow-2xl rounded-2xl overflow-hidden"
  //       style={{
  //         border: '1px solid rgba(8, 2, 42, 0.1)',
  //         boxShadow: '0 15px 35px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07)'
  //       }}
  //     >
  //       <div 
  //         className="p-6 text-center"
  //         style={{ 
  //           background: `linear-gradient(90deg, ${blueViolet} 0%, ${tomato} 100%)` 
  //         }}
  //       >
  //         <h2 className="text-3xl font-bold text-white">Create Website</h2>
  //       </div>

  //       <form onSubmit={handleSubmit} className="p-8 space-y-6">
  //         <div className="space-y-4">
  //           <input
  //             type="text"
  //             name="websiteName"
  //             placeholder="Website Name"
  //             value={formState.websiteName}
  //             onChange={handleInputChange}
  //             required
  //             className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blueViolet transition-all duration-300"
  //             style={{ 
  //               borderColor: 'rgba(138, 43, 226, 0.3)',
  //               boxShadow: '0 2px 4px rgba(138, 43, 226, 0.1)'
  //             }}
  //           />

  //           <input
  //             type="text"
  //             name="websiteUrl"
  //             placeholder="Website URL"
  //             value={formState.websiteUrl}
  //             onChange={handleInputChange}
  //             // required
  //             // pattern="https://.*"
  //             className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-tomato transition-all duration-300"
  //             style={{ 
  //               borderColor: 'rgba(255, 99, 71, 0.3)',
  //               boxShadow: '0 2px 4px rgba(255, 99, 71, 0.1)'
  //             }}
  //           />

  //           <div
  //             onDragOver={(e) => e.preventDefault()}
  //             onDrop={handleFileDrop}
  //             onClick={() => fileInputRef.current.click()}
  //             className={`w-full border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all duration-300 ${
  //               uiState.filePreview 
  //                 ? 'border-green-300 bg-green-50' 
  //                 : 'border-gray-300 hover:border-blueViolet'
  //             }`}
  //           >
  //             <input
  //               ref={fileInputRef}
  //               type="file"
  //               accept="image/jpeg,image/png,image/gif"
  //               onChange={handleFileUpload}
  //               className="hidden"
  //             />

  //             {uiState.filePreview ? (
  //               <div className="relative">
  //                 <img 
  //                   src={uiState.filePreview} 
  //                   alt="Logo Preview" 
  //                   className="mx-auto max-h-40 rounded-md object-contain"
  //                 />
  //                 <button 
  //                   type="button"
  //                   onClick={removeFile}
  //                   className="absolute top-0 right-0 bg-tomato text-white rounded-full p-1 hover:bg-red-600"
  //                 >
  //                   <X size={16} />
  //                 </button>
  //               </div>
  //             ) : (
  //               <div className="flex flex-col items-center space-y-2">
  //                 <UploadCloud 
  //                   size={48} 
  //                   className="text-gray-400"
  //                   style={{ color: blueViolet }}
  //                 />
  //                 <p className="text-gray-600">
  //                   Drag and drop or click to upload logo
  //                 </p>
  //                 <p className="text-xs text-gray-500">
  //                   PNG, JPEG, GIF (max 5MB)
  //                 </p>
  //               </div>
  //             )}
  //           </div>

  //           {uiState.error && (
  //             <div 
  //               className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700"
  //             >
  //               <AlertTriangle size={20} />
  //               <span>{uiState.error}</span>
  //             </div>
  //           )}
  //         </div>

  //         <button
  //           type="submit"
  //           disabled={uiState.isSubmitting}
  //           className="w-full py-3.5 rounded-lg text-white font-semibold transition-all duration-300"
  //           style={{
  //             background: `linear-gradient(90deg, ${blueViolet} 0%, ${tomato} 100%)`,
  //             opacity: uiState.isSubmitting ? 0.7 : 1,
  //             transform: uiState.isSubmitting ? 'scale(0.98)' : 'scale(1)'
  //           }}
  //         >
  //           {uiState.isSubmitting ? 'Creating...' : 'Create Website'}
  //         </button>
  //       </form>
  //     </div>
  //   </div>
  // );

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-2 sm:p-4 md:p-6"
      style={{ 
        background: 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)'
      }}
    >
      <div 
        className="w-full max-w-xs sm:max-w-md bg-white shadow-2xl rounded-2xl overflow-hidden"
        style={{
          border: '1px solid rgba(8, 2, 42, 0.1)',
          boxShadow: '0 15px 35px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07)'
        }}
      >
        <div 
          className="p-4 sm:p-6 text-center"
          style={{ 
            background: `linear-gradient(90deg, ${blueViolet} 0%, ${tomato} 100%)` 
          }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Create Website</h2>
        </div>

        <form onSubmit={handleSubmit} className="p-5 sm:p-8 space-y-4 sm:space-y-6">
          <div className="space-y-3 sm:space-y-4">
            <input
              type="text"
              name="websiteName"
              placeholder="Website Name"
              value={formState.websiteName}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 sm:px-4 sm:py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blueViolet transition-all duration-300 text-sm sm:text-base"
              style={{ 
                borderColor: 'rgba(138, 43, 226, 0.3)',
                boxShadow: '0 2px 4px rgba(138, 43, 226, 0.1)'
              }}
            />

            <input
              type="text"
              name="websiteUrl"
              placeholder="Website URL"
              value={formState.websiteUrl}
              onChange={handleInputChange}
              className="w-full px-3 py-2 sm:px-4 sm:py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-tomato transition-all duration-300 text-sm sm:text-base"
              style={{ 
                borderColor: 'rgba(255, 99, 71, 0.3)',
                boxShadow: '0 2px 4px rgba(255, 99, 71, 0.1)'
              }}
            />

            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleFileDrop}
              onClick={() => fileInputRef.current.click()}
              className={`w-full border-2 border-dashed rounded-lg p-4 sm:p-6 text-center cursor-pointer transition-all duration-300 ${
                uiState.filePreview 
                  ? 'border-green-300 bg-green-50' 
                  : 'border-gray-300 hover:border-blueViolet'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/gif"
                onChange={handleFileUpload}
                className="hidden"
              />

              {uiState.filePreview ? (
                <div className="relative">
                  <img 
                    src={uiState.filePreview} 
                    alt="Logo Preview" 
                    className="mx-auto max-h-32 sm:max-h-40 rounded-md object-contain"
                  />
                  <button 
                    type="button"
                    onClick={removeFile}
                    className="absolute top-0 right-0 bg-tomato text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <X size={window.innerWidth < 640 ? 14 : 16} />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center space-y-2">
                  <UploadCloud 
                    size={window.innerWidth < 640 ? 36 : 48} 
                    className="text-gray-400"
                    style={{ color: blueViolet }}
                  />
                  <p className="text-sm sm:text-base text-gray-600">
                    Drag and drop or click to upload logo
                  </p>
                  <p className="text-xs text-gray-500">
                    PNG, JPEG, GIF (max 5MB)
                  </p>
                </div>
              )}
            </div>

            {uiState.error && (
              <div 
                className="flex items-center space-x-2 p-2 sm:p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm sm:text-base"
              >
                <AlertTriangle size={window.innerWidth < 640 ? 16 : 20} />
                <span>{uiState.error}</span>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={uiState.isSubmitting}
            className="w-full py-3 sm:py-3.5 rounded-lg text-white font-semibold transition-all duration-300 text-sm sm:text-base"
            style={{
              background: `linear-gradient(90deg, ${blueViolet} 0%, ${tomato} 100%)`,
              opacity: uiState.isSubmitting ? 0.7 : 1,
              transform: uiState.isSubmitting ? 'scale(0.98)' : 'scale(1)'
            }}
          >
            {uiState.isSubmitting ? 'Creating...' : 'Create Website'}
          </button>
        </form>
      </div>
    </div>
  );
};

// Color Constants
const blueViolet = '#8a2be2';
const tomato = '#ff6347';

export default EnterpriseWebsiteCreation;