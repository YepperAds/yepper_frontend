// import React, { useState, useRef, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useClerk } from '@clerk/clerk-react';
// import { CloudUpload, Image, AlertTriangle, ArrowLeft } from 'lucide-react';
// import axios from 'axios';

// function WebsiteCreation() {
//   const navigate = useNavigate();
//   const { user } = useClerk();
//   const fileInputRef = useRef(null);
//   const [referredUser, setReferredUser] = useState(false);

//   useEffect(() => {
//     // Check if this user was referred
//     const referralCode = localStorage.getItem('referralCode');
//     const referredUserId = localStorage.getItem('referredUserId');
//     if (referralCode && referredUserId === user?.id) {
//       setReferredUser(true);
//     }
//   }, [user]);

//   const [formState, setFormState] = useState({
//     websiteName: '',
//     websiteUrl: '',
//     imageUrl: null
//   });

//   const [uiState, setUiState] = useState({
//     filePreview: null,
//     error: null,
//     isSubmitting: false
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormState(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const validateFile = (file) => {
//     const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
//     const maxSize = 5 * 1024 * 1024; // 5MB

//     if (!allowedTypes.includes(file.type)) {
//       setUiState(prev => ({
//         ...prev,
//         error: 'Only JPEG, PNG, and GIF images are allowed.'
//       }));
//       return false;
//     }

//     if (file.size > maxSize) {
//       setUiState(prev => ({
//         ...prev,
//         error: 'Image must be smaller than 5MB.'
//       }));
//       return false;
//     }

//     return true;
//   };

//   const processFile = (file) => {
//     if (!file) return;

//     if (!validateFile(file)) return;

//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setFormState(prev => ({
//         ...prev,
//         imageUrl: file
//       }));
//       setUiState(prev => ({
//         ...prev,
//         filePreview: reader.result,
//         error: null
//       }));
//     };
//     reader.readAsDataURL(file);
//   };

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     processFile(selectedFile);
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     const selectedFile = e.dataTransfer.files[0];
//     processFile(selectedFile);
//   };

//   const triggerFileInput = () => {
//     fileInputRef.current.click();
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setUiState(prev => ({ ...prev, isSubmitting: true }));

//     try {
//       const formData = new FormData();
//       formData.append('ownerId', user?.id);
//       formData.append('websiteName', formState.websiteName);
//       formData.append('websiteLink', formState.websiteUrl);
//       if (formState.imageUrl) {
//         formData.append('file', formState.imageUrl);
//       }

//       const response = await axios.post(
//         'https://yepper-backend.onrender.com/api/websites',
//         formData,
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data'
//           }
//         }
//       );

//       if (response.status === 201) {
//         navigate(`/create-categories/${response.data._id}`, {
//           state: {
//             websiteDetails: {
//               id: response.data._id,
//               name: formState.websiteName,
//               url: formState.websiteUrl
//             }
//           }
//         });
//       }

//       if (referredUser) {
//         alert('Referral was sent');
//       }
//     } catch (error) {
//       setUiState(prev => ({
//         ...prev,
//         error: error.response?.data?.message || 'Failed to create website'
//       }));
//     } finally {
//       setUiState(prev => ({ ...prev, isSubmitting: false }));
//     }
//   };

//   return (
//     <div className="min-h-screen bg-black text-white">
//       {/* Ultra-modern header with blur effect */}
//       <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/20 border-b border-white/10">
//         <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
//           <button 
//             onClick={() => navigate(-1)} 
//             className="flex items-center text-white/70 hover:text-white transition-colors"
//           >
//             <ArrowLeft size={18} className="mr-2" />
//             <span className="font-medium tracking-wide">BACK</span>
//           </button>
//           <div className="bg-white/10 px-4 py-1 rounded-full text-xs font-medium tracking-widest">WEBSITE</div>
//         </div>
//       </header>
      
//       <main className="max-w-7xl mx-auto px-6 py-20">       
//         <div className="max-w-2xl mx-auto backdrop-blur-md bg-gradient-to-b from-blue-900/20 to-blue-900/5 rounded-3xl overflow-hidden border border-white/10 transition-all duration-500">
//           <div className="p-10">
//             <form onSubmit={handleSubmit} className="space-y-8">
//               <div className="space-y-6">
//                 {/* Website Name Input */}
//                 <div>
//                   <label className="block text-sm font-medium text-white/80 mb-2 ml-1">Website Name</label>
//                   <input
//                     type="text"
//                     name="websiteName"
//                     placeholder="Enter your website name"
//                     value={formState.websiteName}
//                     onChange={handleInputChange}
//                     autoComplete="off"
//                     required
//                     className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-white placeholder-white/40 transition-all duration-300"
//                   />
//                 </div>
                
//                 {/* Website URL Input */}
//                 <div>
//                   <label className="block text-sm font-medium text-white/80 mb-2 ml-1">Website URL</label>
//                   <input
//                     type="text"
//                     name="websiteUrl"
//                     placeholder="https://yourwebsite.com"
//                     value={formState.websiteUrl}
//                     onChange={handleInputChange}
//                     autoComplete="off"
//                     required
//                     className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-white placeholder-white/40 transition-all duration-300"
//                   />
//                 </div>
                
//                 {/* Logo Upload Area */}
//                 <div>
//                   <label className="block text-sm font-medium text-white/80 mb-2 ml-1">Logo Upload</label>
//                   <div 
//                     className="border-2 border-dashed border-white/20 rounded-xl p-8 cursor-pointer
//                               transition-all duration-300 hover:border-blue-500/50 hover:bg-blue-500/5
//                               flex flex-col items-center justify-center"
//                     onDragOver={(e) => e.preventDefault()}
//                     onDrop={handleDrop}
//                     onClick={triggerFileInput}
//                   >
//                     <input
//                       ref={fileInputRef}
//                       type="file"
//                       accept="image/jpeg,image/png,image/gif"
//                       onChange={handleFileChange}
//                       className="hidden"
//                     />
//                     <div className="relative mb-4">
//                       <div className="absolute inset-0 rounded-full bg-blue-500 blur-md opacity-40"></div>
//                       <div className="relative p-3 rounded-full bg-gradient-to-r from-blue-600 to-blue-400">
//                         <CloudUpload className="text-white" size={24} />
//                       </div>
//                     </div>
//                     <p className="text-white/80 font-medium">Drag and drop or click to upload logo</p>
//                     <p className="text-sm text-white/50 mt-2">
//                       Supported formats: JPEG, PNG, GIF (max 5MB)
//                     </p>
//                   </div>
//                 </div>
//               </div>
              
//               {/* Error Message */}
//               {uiState.error && (
//                 <div className="flex items-center gap-2 bg-red-500/20 border border-red-500/30 text-red-400 p-4 rounded-xl">
//                   <AlertTriangle className="w-5 h-5" />
//                   <span>{uiState.error}</span>
//                 </div>
//               )}
              
//               {/* Image Preview */}
//               {uiState.filePreview && (
//                 <div className="relative rounded-xl overflow-hidden border border-white/10">
//                   <div className="absolute top-3 right-3 z-10">
//                     <div className="relative">
//                       <div className="absolute inset-0 rounded-full bg-blue-500 blur-md opacity-40"></div>
//                       <div className="relative p-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-400">
//                         <Image className="text-white" size={16} />
//                       </div>
//                     </div>
//                   </div>
//                   <div className="bg-gradient-to-b from-white/5 to-white/10 p-6">
//                     <img 
//                       src={uiState.filePreview} 
//                       alt="Logo Preview" 
//                       className="max-h-[180px] mx-auto object-contain" 
//                     />
//                   </div>
//                 </div>
//               )}
              
//               {/* Submit Button */}
//               <button
//                 type="submit"
//                 disabled={uiState.isSubmitting}
//                 className="w-full group relative h-16 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium overflow-hidden transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
//               >
//                 <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                 <span className="relative z-10 flex items-center justify-center uppercase tracking-wider">
//                   {uiState.isSubmitting ? 'Creating...' : 'Create Website'}
//                 </span>
//               </button>
//             </form>
//           </div>
//         </div>
        
//         <div className="mt-16 flex justify-center">
//           <div className="rounded-full px-6 py-3 bg-white/5 backdrop-blur-md flex items-center space-x-2">
//             <span className="text-white/60 text-sm">Need assistance?</span>
//             <button className="text-blue-400 text-sm font-medium hover:text-blue-300 transition-colors">View documentation</button>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

// export default WebsiteCreation;









import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useClerk } from '@clerk/clerk-react';
import { CloudUpload, Image, AlertTriangle, ArrowLeft } from 'lucide-react';
import axios from 'axios';

function WebsiteCreation() {
  const navigate = useNavigate();
  const { user } = useClerk();
  const fileInputRef = useRef(null);
  const [referredUser, setReferredUser] = useState(false);

  useEffect(() => {
    // Check if this user was referred
    const referralCode = localStorage.getItem('referralCode');
    const referredUserId = localStorage.getItem('referredUserId');
    if (referralCode && referredUserId === user?.id) {
      setReferredUser(true);
    }
  }, [user]);

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

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    processFile(selectedFile);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const selectedFile = e.dataTransfer.files[0];
    processFile(selectedFile);
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
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
        navigate(`/create-categories/${response.data._id}`, {
          state: {
            websiteDetails: {
              id: response.data._id,
              name: formState.websiteName,
              url: formState.websiteUrl
            }
          }
        });
      }

      if (referredUser) {
        alert('Referral was sent');
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

  // Determine if submit button should be disabled
  const isSubmitDisabled = !formState.imageUrl || uiState.isSubmitting;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Ultra-modern header with blur effect */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center text-white/70 hover:text-white transition-colors"
          >
            <ArrowLeft size={18} className="mr-2" />
            <span className="font-medium tracking-wide">BACK</span>
          </button>
          <div className="bg-white/10 px-4 py-1 rounded-full text-xs font-medium tracking-widest">WEBSITE</div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-6 py-20">       
        <div className="max-w-2xl mx-auto backdrop-blur-md bg-gradient-to-b from-blue-900/20 to-blue-900/5 rounded-3xl overflow-hidden border border-white/10 transition-all duration-500">
          <div className="p-10">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-6">
                {/* Website Name Input */}
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2 ml-1">Website Name</label>
                  <input
                    type="text"
                    name="websiteName"
                    placeholder="Enter your website name"
                    value={formState.websiteName}
                    onChange={handleInputChange}
                    autoComplete="off"
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-white placeholder-white/40 transition-all duration-300"
                  />
                </div>
                
                {/* Website URL Input */}
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2 ml-1">Website URL</label>
                  <input
                    type="text"
                    name="websiteUrl"
                    placeholder="https://yourwebsite.com"
                    value={formState.websiteUrl}
                    onChange={handleInputChange}
                    autoComplete="off"
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-white placeholder-white/40 transition-all duration-300"
                  />
                </div>
                
                {/* Logo Upload Area */}
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2 ml-1">Logo Upload</label>
                  <div 
                    className="border-2 border-dashed border-white/20 rounded-xl p-8 cursor-pointer
                              transition-all duration-300 hover:border-blue-500/50 hover:bg-blue-500/5
                              flex flex-col items-center justify-center"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                    onClick={triggerFileInput}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/jpeg,image/png,image/gif"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <div className="relative mb-4">
                      <div className="absolute inset-0 rounded-full bg-blue-500 blur-md opacity-40"></div>
                      <div className="relative p-3 rounded-full bg-gradient-to-r from-blue-600 to-blue-400">
                        <CloudUpload className="text-white" size={24} />
                      </div>
                    </div>
                    <p className="text-white/80 font-medium">Drag and drop or click to upload logo</p>
                    <p className="text-sm text-white/50 mt-2">
                      Supported formats: JPEG, PNG, GIF (max 5MB)
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Error Message */}
              {uiState.error && (
                <div className="flex items-center gap-2 bg-red-500/20 border border-red-500/30 text-red-400 p-4 rounded-xl">
                  <AlertTriangle className="w-5 h-5" />
                  <span>{uiState.error}</span>
                </div>
              )}
              
              {/* Image Preview */}
              {uiState.filePreview && (
                <div className="relative rounded-xl overflow-hidden border border-white/10">
                  <div className="absolute top-3 right-3 z-10">
                    <div className="relative">
                      <div className="absolute inset-0 rounded-full bg-blue-500 blur-md opacity-40"></div>
                      <div className="relative p-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-400">
                        <Image className="text-white" size={16} />
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-b from-white/5 to-white/10 p-6">
                    <img 
                      src={uiState.filePreview} 
                      alt="Logo Preview" 
                      className="max-h-[180px] mx-auto object-contain" 
                    />
                  </div>
                </div>
              )}
              
              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitDisabled}
                className={`w-full group relative h-16 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium overflow-hidden transition-all duration-300 
                ${isSubmitDisabled ? 'opacity-60 cursor-not-allowed' : 'hover:shadow-lg'}`}
              >
                <div className={`absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 opacity-0 ${isSubmitDisabled ? '' : 'group-hover:opacity-100'} transition-opacity duration-300`}></div>
                <span className="relative z-10 flex items-center justify-center uppercase tracking-wider">
                  {uiState.isSubmitting ? 'Creating...' : 'Create Website'}
                </span>
              </button>
              
              {/* Add message when image is required */}
              {!formState.imageUrl && !uiState.error && (
                <div className="flex items-center justify-center gap-2 text-amber-400 text-sm">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Please upload a logo to continue</span>
                </div>
              )}
            </form>
          </div>
        </div>
        
        <div className="mt-16 flex justify-center">
          <div className="rounded-full px-6 py-3 bg-white/5 backdrop-blur-md flex items-center space-x-2">
            <span className="text-white/60 text-sm">Need assistance?</span>
            <button className="text-blue-400 text-sm font-medium hover:text-blue-300 transition-colors">View documentation</button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default WebsiteCreation;









// import React, { useState, useRef, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useClerk } from '@clerk/clerk-react';
// import { CloudUpload, Image, AlertTriangle } from 'lucide-react';
// import { motion } from 'framer-motion';
// import axios from 'axios';
// import Header from '../../components/backToPreviousHeader';

// function WebsiteCreation() {
//   const navigate = useNavigate();
//   const { user } = useClerk();
//   const fileInputRef = useRef(null);
//   const [referredUser, setReferredUser] = useState(false);

//   useEffect(() => {
//     // Check if this user was referred
//     const referralCode = localStorage.getItem('referralCode');
//     const referredUserId = localStorage.getItem('referredUserId');
//     if (referralCode && referredUserId === user?.id) {
//       setReferredUser(true);
//     }
//   }, [user]);

//   const [formState, setFormState] = useState({
//     websiteName: '',
//     websiteUrl: '',
//     imageUrl: null
//   });

//   const [uiState, setUiState] = useState({
//     filePreview: null,
//     error: null,
//     isSubmitting: false
//   });

//   const handleBack = () => {
//     navigate(-1);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormState(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const validateFile = (file) => {
//     const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
//     const maxSize = 5 * 1024 * 1024; // 5MB

//     if (!allowedTypes.includes(file.type)) {
//       setUiState(prev => ({
//         ...prev,
//         error: 'Only JPEG, PNG, and GIF images are allowed.'
//       }));
//       return false;
//     }

//     if (file.size > maxSize) {
//       setUiState(prev => ({
//         ...prev,
//         error: 'Image must be smaller than 5MB.'
//       }));
//       return false;
//     }

//     return true;
//   };

//   const processFile = (file) => {
//     if (!file) return;

//     if (!validateFile(file)) return;

//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setFormState(prev => ({
//         ...prev,
//         imageUrl: file
//       }));
//       setUiState(prev => ({
//         ...prev,
//         filePreview: reader.result,
//         error: null
//       }));
//     };
//     reader.readAsDataURL(file);
//   };

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     processFile(selectedFile);
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     const selectedFile = e.dataTransfer.files[0];
//     processFile(selectedFile);
//   };

//   const triggerFileInput = () => {
//     fileInputRef.current.click();
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setUiState(prev => ({ ...prev, isSubmitting: true }));

//     try {
//       const formData = new FormData();
//       formData.append('ownerId', user?.id);
//       formData.append('websiteName', formState.websiteName);
//       formData.append('websiteLink', formState.websiteUrl);
//       if (formState.imageUrl) {
//         formData.append('file', formState.imageUrl);
//       }

//       const response = await axios.post(
//         'https://yepper-backend.onrender.com/api/websites',
//         formData,
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data'
//           }
//         }
//       );

//       if (response.status === 201) {
//         navigate(`/create-categories/${response.data._id}`, {
//           state: {
//             websiteDetails: {
//               id: response.data._id,
//               name: formState.websiteName,
//               url: formState.websiteUrl
//             }
//           }
//         });
//       }

//       if (referredUser) {
//         alert('Referral was sent');
//       }
//     } catch (error) {
//       setUiState(prev => ({
//         ...prev,
//         error: error.response?.data?.message || 'Failed to create website'
//       }));
//     } finally {
//       setUiState(prev => ({ ...prev, isSubmitting: false }));
//     }
//   };

//   return (
//     <div className="ad-waitlist min-h-screen">
//       <Header />

//       <div className="flex justify-center items-center p-8">
//         <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-10 text-center">
//           <h2 className="text-3xl font-extrabold mb-3 text-blue-950">Create Your Website</h2>
//           <p className="text-sm text-gray-600 mb-6">
//             Fill in your website details and upload a logo
//           </p>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="space-y-4">
//               <input
//                 type="text"
//                 name="websiteName"
//                 placeholder="Website Name"
//                 value={formState.websiteName}
//                 onChange={handleInputChange}
//                 autocomplete="off"
//                 required
//                 className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600 transition-all duration-300"
//               />

//               <input
//                 // type="url"
//                 name="websiteUrl"
//                 placeholder="Website URL"
//                 value={formState.websiteUrl}
//                 onChange={handleInputChange}
//                 autocomplete="off"
//                 required
//                 className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600 transition-all duration-300"
//               />

//               <div 
//                 className="border-2 border-dashed border-gray-300 rounded-xl p-8 cursor-pointer
//                           transition-all duration-300 hover:bg-gray-50 hover:border-[#FF4500]
//                           flex flex-col items-center justify-center"
//                 onDragOver={(e) => e.preventDefault()}
//                 onDrop={handleDrop}
//                 onClick={triggerFileInput}
//               >
//                 <input
//                   ref={fileInputRef}
//                   type="file"
//                   accept="image/jpeg,image/png,image/gif"
//                   onChange={handleFileChange}
//                   className="hidden"
//                 />
//                 <CloudUpload className="w-12 h-12 text-[#FF4500] mb-4" />
//                 <p className="text-gray-600">Drag and drop or click to upload logo</p>
//                 <p className="text-sm text-gray-500 mt-2">
//                   Supported formats: JPEG, PNG, GIF (max 5MB)
//                 </p>
//               </div>
//             </div>

//             {uiState.error && (
//               <div className="flex items-center gap-2 bg-red-50 text-red-600 p-3 rounded-lg">
//                 <AlertTriangle className="w-5 h-5" />
//                 <span>{uiState.error}</span>
//               </div>
//             )}

//             {uiState.filePreview && (
//               <div className="mt-6 relative">
//                 <div className="absolute top-3 right-3 z-10">
//                   <Image className="w-8 h-8 p-2 bg-white rounded-full text-[#FF4500] shadow-md" />
//                 </div>
//                 <div className="rounded-xl overflow-hidden shadow-md">
//                   <img 
//                     src={uiState.filePreview} 
//                     alt="Logo Preview" 
//                     className="w-full max-h-[200px] object-contain" 
//                   />
//                 </div>
//               </div>
//             )}

//             <motion.button 
//               type="submit"
//               disabled={uiState.isSubmitting}
//               className="w-full bg-[#FF4500] text-white px-3 py-2 rounded-lg text-sm font-bold sm:text-base
//                         transition-all duration-300 hover:bg-orange-500 hover:-translate-y-0.5
//                         disabled:bg-gray-300 disabled:cursor-not-allowed disabled:hover:translate-y-0"
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//             >
//               {uiState.isSubmitting ? 'Creating...' : 'Create Website'}
//             </motion.button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default WebsiteCreation;
