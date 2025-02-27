import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useClerk } from '@clerk/clerk-react';
import { CloudUpload, FileText, Image, Video, ArrowLeft, Sparkles } from 'lucide-react';

function Select() {
  const navigate = useNavigate();
  const { user } = useClerk();
  const userId = user?.id;
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hover, setHover] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    processFile(selectedFile);
  };

  const processFile = (selectedFile) => {
    if (!selectedFile) return;

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
          <div className="bg-white/10 px-4 py-1 rounded-full text-xs font-medium tracking-widest">UPLOAD</div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-6 py-20">
        <div className="max-w-3xl mx-auto">
          <div 
            className="group relative backdrop-blur-md bg-gradient-to-b from-orange-900/30 to-orange-900/10 rounded-3xl overflow-hidden border border-white/10 transition-all duration-500"
            style={{
              boxShadow: hover ? '0 0 40px rgba(249, 115, 22, 0.3)' : '0 0 0 rgba(0, 0, 0, 0)'
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600/10 to-rose-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
            
            <div className="p-10 relative z-10">
              <div className="space-y-6 mb-8">
                <div className="flex items-center text-white/80">
                  <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center mr-3">
                    <Sparkles size={14} className="text-orange-400" />
                  </div>
                  <span>Supported formats: JPEG, PNG, GIF, MP4</span>
                </div>
                <div className="flex items-center text-white/80">
                  <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center mr-3">
                    <Sparkles size={14} className="text-orange-400" />
                  </div>
                  <span>Maximum file size: 50MB</span>
                </div>
              </div>
              
              <div 
                className="border-2 border-dashed border-white/20 rounded-xl p-8 cursor-pointer
                        transition-all duration-300 hover:border-orange-500 hover:bg-orange-900/10
                        flex flex-col items-center justify-center"
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                onClick={triggerFileInput}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/gif,video/mp4,video/quicktime"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <CloudUpload className="w-16 h-16 text-orange-500 mb-4" />
                <p className="text-white/70">Drag and drop or click to upload</p>
              </div>

              {error && (
                <div className="mt-6 flex items-center gap-2 bg-red-900/20 text-red-400 p-4 rounded-xl border border-red-800/30">
                  <FileText className="w-5 h-5" />
                  <span>{error}</span>
                </div>
              )}

              {filePreview && (
                <div className="mt-6 relative">
                  <div className="absolute top-3 right-3 z-10">
                    {filePreview.type.startsWith('image/') ? (
                      <div className="p-2 bg-black/50 backdrop-blur-md rounded-full">
                        <Image className="w-6 h-6 text-orange-400" />
                      </div>
                    ) : (
                      <div className="p-2 bg-black/50 backdrop-blur-md rounded-full">
                        <Video className="w-6 h-6 text-orange-400" />
                      </div>
                    )}
                  </div>
                  <div className="rounded-xl overflow-hidden border border-white/10">
                    {filePreview.type.startsWith('image/') ? (
                      <img 
                        src={filePreview.url} 
                        alt="Preview" 
                        className="w-full max-h-[400px] object-cover" 
                      />
                    ) : (
                      <video 
                        src={filePreview.url} 
                        controls 
                        className="w-full max-h-[400px] object-cover"
                      />
                    )}
                  </div>
                </div>
              )}

              <button
                onClick={handleSave} 
                disabled={!file || loading}
                className="w-full group relative h-16 mt-8 rounded-xl bg-gradient-to-r from-orange-600 to-rose-600 text-white font-medium overflow-hidden transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-rose-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10 flex items-center justify-center uppercase tracking-wider">
                  {loading ? 'Processing...' : 'Continue'}
                </span>
              </button>
            </div>
          </div>
          
          <div className="mt-16 flex justify-center">
            <div className="rounded-full px-6 py-3 bg-white/5 backdrop-blur-md flex items-center space-x-2">
              <span className="text-white/60 text-sm">Need guidance?</span>
              <button className="text-orange-400 text-sm font-medium hover:text-orange-300 transition-colors">Request a consultation</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Select;






// import React, { useState, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useClerk } from '@clerk/clerk-react';
// import { CloudUpload, FileText, Image, Video, ChevronLeft } from 'lucide-react';
// import { motion } from 'framer-motion';

// function Select() {
//   const navigate = useNavigate();
//   const { user } = useClerk();
//   const userId = user?.id;
//   const fileInputRef = useRef(null);
//   const [file, setFile] = useState(null);
//   const [filePreview, setFilePreview] = useState(null);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleBack = () => {
//     navigate('/dashboard');
//   };

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     processFile(selectedFile);
//   };

//   const processFile = (selectedFile) => {
//     if (!selectedFile) return;

//     const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4', 'video/quicktime'];
//     const maxSize = 50 * 1024 * 1024; // 50MB

//     if (!validTypes.includes(selectedFile.type)) {
//       setError('Unsupported file type. Please upload JPEG, PNG, GIF, or MP4.');
//       return;
//     }

//     if (selectedFile.size > maxSize) {
//       setError('File is too large. Maximum size is 50MB.');
//       return;
//     }

//     setFile(selectedFile);
//     setError(null);

//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setFilePreview({
//         url: reader.result,
//         type: selectedFile.type
//       });
//     };
//     reader.readAsDataURL(selectedFile);
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     const selectedFile = e.dataTransfer.files[0];
//     processFile(selectedFile);
//   };

//   const handleSave = async (e) => {
//     e.preventDefault();
//     if (!file) {
//       setError('Please select a file to upload');
//       return;
//     }

//     try {
//       setLoading(true);
//       navigate('/business', {
//         state: { userId, file }
//       });
//     } catch (error) {
//       setError('An error occurred during upload');
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const triggerFileInput = () => {
//     fileInputRef.current.click();
//   };

//   return (
//     <div className="ad-waitlist min-h-screen">
//       <div className="fixed top-0 w-full z-50 transition-all duration-300">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             <div className="flex-shrink-0 flex items-center">
//               <div className="flex items-center">
//                 <motion.button 
//                   className={'flex items-center text-white p-2 rounded-full text-sm font-bold sm:text-base bg-[#FF4500] hover:bg-orange-500 transition-colors'}
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={handleBack}
//                 >
//                   <ChevronLeft 
//                     className="text-white w-6 h-6 sm:w-8 sm:h-8" 
//                     strokeWidth={2.5}
//                   />
//                 </motion.button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className='flex justify-center items-center p-8'>
//         <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-10 text-center">
//           <h2 className="text-3xl font-extrabold mb-3 text-blue-950">Upload Your Ad Creative</h2>
//           <p className="text-sm text-gray-600 mb-6">
//             Supported formats: JPEG, PNG, GIF, MP4 (max 50MB)
//           </p>

//           <div 
//             className="border-2 border-dashed border-gray-300 rounded-xl p-8 cursor-pointer
//                       transition-all duration-300 hover:bg-gray-50 hover:border-blue-600
//                       flex flex-col items-center justify-center"
//             onDragOver={(e) => e.preventDefault()}
//             onDrop={handleDrop}
//             onClick={triggerFileInput}
//           >
//             <input
//               ref={fileInputRef}
//               type="file"
//               accept="image/jpeg,image/png,image/gif,video/mp4,video/quicktime"
//               onChange={handleFileChange}
//               className="hidden"
//             />
//             <CloudUpload className="w-12 h-12 text-blue-600 mb-4" />
//             <p className="text-gray-600">Drag and drop or click to upload</p>
//           </div>

//           {error && (
//             <div className="mt-4 mb-4 flex items-center gap-2 bg-red-50 text-red-600 p-3 rounded-lg">
//               <FileText className="w-5 h-5" />
//               <span>{error}</span>
//             </div>
//           )}

//           {filePreview && (
//             <div className="mt-6 relative">
//               <div className="absolute top-3 right-3 z-10">
//                 {filePreview.type.startsWith('image/') ? (
//                   <Image className="w-8 h-8 p-2 bg-white rounded-full text-blue-600 shadow-md" />
//                 ) : (
//                   <Video className="w-8 h-8 p-2 bg-white rounded-full text-blue-600 shadow-md" />
//                 )}
//               </div>
//               <div className="rounded-xl overflow-hidden shadow-md">
//                 {filePreview.type.startsWith('image/') ? (
//                   <img 
//                     src={filePreview.url} 
//                     alt="Preview" 
//                     className="w-full max-h-[500px] object-cover" 
//                   />
//                 ) : (
//                   <video 
//                     src={filePreview.url} 
//                     controls 
//                     className="w-full max-h-[500px] object-cover"
//                   />
//                 )}
//               </div>
//             </div>
//           )}

//           <motion.button 
//             onClick={handleSave} 
//             disabled={!file || loading}
//             className="w-full mt-6 bg-[#FF4500] text-white px-3 py-2 rounded-lg text-sm font-bold sm:text-base
//                       transition-all duration-300 hover:bg-orange-500 hover:-translate-y-0.5
//                       disabled:bg-gray-300 disabled:cursor-not-allowed disabled:hover:translate-y-0"
//           >
//             {loading ? 'Processing...' : 'Next'}
//           </motion.button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Select;