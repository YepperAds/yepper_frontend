import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  LinkIcon,
  Check,
  Tag,
  DollarSign,
  Info,
  X,
  Loader2,
  ArrowLeft
} from 'lucide-react';
import { useUser } from '@clerk/clerk-react';
import Loading from '../../components/LoadingSpinner';
import axios from 'axios';

const LoadingSpinner = () => (
  <Loading />
);

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
        <div className="relative w-full max-w-md mx-4 my-6 z-50" onClick={(e) => e.stopPropagation()}>
          <div className="relative flex flex-col w-full bg-black/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h3 className="text-xl font-semibold text-white">{title}</h3>
              <button
                onClick={onClose}
                className="text-white/70 hover:text-white transition-colors duration-200 p-2 rounded-full hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="relative p-6 text-white/80 leading-relaxed">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

const Categories = () => {
  const [hoverCategory, setHoverCategory] = useState(null);
  const { user } = useUser();
  const location = useLocation();
  const navigate = useNavigate();
  const { 
    file,
    userId,
    businessName,
    businessLink,
    businessLocation,
    adDescription,
    selectedWebsites
  } = location.state || {};

  const [categoriesByWebsite, setCategoriesByWebsite] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [error, setError] = useState(false);
  const [selectedDescription, setSelectedDescription] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false); // New state for form submission
  
  const adOwnerEmail = user.primaryEmailAddress.emailAddress;

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        const promises = selectedWebsites.map(async (websiteId) => {
          const websiteResponse = await fetch(`https://yepper-backend.onrender.com/api/websites/website/${websiteId}`);
          const websiteData = await websiteResponse.json();
          const categoriesResponse = await fetch(`https://yepper-backend.onrender.com/api/ad-categories/${websiteId}`);
          const categoriesData = await categoriesResponse.json();

          return {
            websiteName: websiteData.websiteName || 'Unknown Website',
            websiteLink: websiteData.websiteLink || '#',
            categories: categoriesData.categories || [],
          };
        });
        const result = await Promise.all(promises);
        setCategoriesByWebsite(result);
      } catch (error) {
        console.error('Failed to fetch categories or websites:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (selectedWebsites) fetchCategories();
  }, [selectedWebsites]);

  const handleCategorySelection = (categoryId) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(categoryId) 
        ? prevSelected.filter((id) => id !== categoryId) 
        : [...prevSelected, categoryId]
    );
    setError(false);
  };

  const handleNext = async(e) => {
    e.preventDefault();
    if (selectedCategories.length === 0) {
      setError(true);
      return;
    }
    
    setIsSubmitting(true); // Set submitting state to true when starting submission
    
    try {
      const formData = new FormData();
      formData.append('adOwnerEmail', adOwnerEmail);
      formData.append('file', file);
      formData.append('userId', userId);
      formData.append('businessName', businessName);
      formData.append('businessLink', businessLink);
      formData.append('businessLocation', businessLocation);
      formData.append('adDescription', adDescription);
      formData.append('selectedWebsites', JSON.stringify(selectedWebsites));
      formData.append('selectedCategories', JSON.stringify(selectedCategories));
      // formData.append('selectedSpaces', JSON.stringify(selectedSpaces));

      await axios.post('https://yepper-backend.onrender.com/api/importAds', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      navigate('/dashboard');
    } catch (error) {
      console.error('Error during ad upload:', error);
      setError('An error occurred while uploading the ad');
      setIsSubmitting(false); // Reset submitting state on error
    }
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
          <div className="bg-white/10 px-4 py-1 rounded-full text-xs font-medium tracking-widest">CATEGORIES</div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-6 py-20">
        <div className="mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="h-px w-12 bg-blue-500 mr-6"></div>
            <span className="text-blue-400 text-sm font-medium uppercase tracking-widest">Campaign Builder</span>
            <div className="h-px w-12 bg-blue-500 ml-6"></div>
          </div>
          
          <h1 className="text-center text-6xl font-bold mb-6 tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
              Select Web Spaces
            </span>
          </h1>
          
          <p className="text-center text-white/70 max-w-2xl mx-auto text-lg mb-6">
            Choose relevant spaces for your advertisement to maximize reach and engagement
          </p>
        </div>

        {error && (
          <div className="max-w-6xl mx-auto mb-8 flex items-center gap-3 text-red-400 bg-red-900/20 border border-red-800/30 p-4 rounded-xl backdrop-blur-sm">
            <Info className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm font-medium">Please select at least one category to proceed</span>
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <LoadingSpinner />
          </div>
        ) : categoriesByWebsite.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {categoriesByWebsite.map((website) => (
              <div 
                key={website.websiteName} 
                className="backdrop-blur-md bg-white/5 rounded-3xl overflow-hidden border border-white/10 transition-all duration-300"
              >
                <div className="p-6 flex justify-between items-center border-b border-white/10 bg-gradient-to-r from-orange-900/30 to-orange-900/10">
                  <h2 className="text-xl font-bold text-white">{website.websiteName}</h2>
                  <a 
                    href={website.websiteLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 text-orange-400 hover:text-orange-300 hover:bg-orange-500/20 rounded-lg transition-colors"
                  >
                    <LinkIcon className="w-5 h-5" />
                  </a>
                </div>
                
                {website.categories.length > 0 ? (
                  <div className="p-6 grid gap-4">
                    {website.categories.map((category) => (
                      <div
                        key={category._id}
                        onClick={() => handleCategorySelection(category._id)}
                        onMouseEnter={() => setHoverCategory(category._id)}
                        onMouseLeave={() => setHoverCategory(null)}
                        className={`group relative flex flex-col rounded-xl p-5 border transition-all duration-500 cursor-pointer 
                          ${selectedCategories.includes(category._id)
                            ? 'border-orange-500 bg-orange-900/20 scale-[1.02]'
                            : 'border-white/10 hover:border-white/30'
                          }
                          ${hoverCategory === category._id ? 'shadow-lg shadow-orange-500/20' : ''}
                        `}
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-orange-500/20 rounded-lg">
                              <Tag className="w-5 h-5 text-orange-400" />
                            </div>
                            <h3 className="font-semibold text-white">
                              {category.categoryName}
                            </h3>
                          </div>
                          {selectedCategories.includes(category._id) && (
                            <div className="p-1 bg-orange-500 rounded-full">
                              <Check size={16} className="text-white" />
                            </div>
                          )}
                        </div>
                        
                        <div className="flex items-start gap-2 mb-4">
                          <p className="text-white/70 text-sm leading-relaxed line-clamp-2">
                            {category.description}
                          </p>
                          {category.description.length > 100 && (
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedDescription(category.description);
                              }}
                              className="flex-shrink-0 p-1 text-blue-400 hover:bg-blue-500/20 rounded-lg transition-colors z-10"
                            >
                              <Info className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-2 pt-4 border-t border-white/10">
                          <div className="relative">
                            <div className="absolute inset-0 rounded-full bg-blue-500 blur-md opacity-40"></div>
                            <div className="relative p-1 rounded-full bg-gradient-to-r from-blue-600 to-blue-400">
                              <DollarSign className="w-4 h-4 text-white" />
                            </div>
                          </div>
                          <span className="text-lg font-semibold text-white">{category.price}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-12 text-center text-white/50">
                    <p className="font-medium">No spaces available</p>
                    <p className="text-sm text-white/30 mt-1">Check back later for updates</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl font-medium text-white/70">No spaces available</p>
            <p className="text-white/50 mt-3">Please select different websites and try again</p>
          </div>
        )}
        
        <div className="mt-16 flex justify-center">
          <button 
            onClick={handleNext}
            disabled={selectedCategories.length === 0 || isSubmitting}
            className={`group relative h-16 px-10 rounded-xl font-medium overflow-hidden transition-all duration-300
              ${(selectedCategories.length === 0 || isSubmitting)
                ? 'bg-white/10 text-white/50 cursor-not-allowed'
                : 'bg-gradient-to-r from-orange-600 to-rose-600 text-white hover:shadow-lg hover:orange-blue-500/30 hover:-translate-y-0.5'
              }`}
          >
            {selectedCategories.length > 0 && !isSubmitting && (
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-rose-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            )}
            <span className="relative z-10 flex items-center justify-center uppercase tracking-wider">
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Publishing...
                </>
              ) : (
                'Publish'
              )}
            </span>
          </button>
        </div>
      </main>
      
      <Modal 
        isOpen={!!selectedDescription} 
        onClose={() => setSelectedDescription(null)}
        title="Category Description"
      >
        <p className="text-white/80 leading-relaxed">{selectedDescription}</p>
      </Modal>
    </div>
  );
};

export default Categories;





















// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import {
//   LinkIcon,
//   Check,
//   Tag,
//   DollarSign,
//   Info,
//   X,
//   Loader2,
// } from 'lucide-react';
// import { useUser } from '@clerk/clerk-react';
// import Header from '../../components/backToPreviousHeader';
// import Loading from '../../components/LoadingSpinner';
// import axios from 'axios';

// const LoadingSpinner = () => (
//   <Loading />
// );

// const Modal = ({ isOpen, onClose, title, children }) => {
//   if (!isOpen) return null;

//   return (
//     <>
//       <div 
//         className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity"
//         onClick={onClose}
//       />
//       <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
//         <div className="relative w-full max-w-md mx-4 my-6 z-50" onClick={(e) => e.stopPropagation()}>
//           <div className="relative flex flex-col w-full bg-white rounded-2xl shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto">
//             <div className="flex items-center justify-between p-6 border-b">
//               <h3 className="text-xl font-semibold text-blue-950">{title}</h3>
//               <button
//                 onClick={onClose}
//                 className="text-gray-500 hover:text-gray-700 transition-colors duration-200 p-2 rounded-full hover:bg-gray-100"
//               >
//                 <X className="w-5 h-5" />
//               </button>
//             </div>
//             <div className="relative p-6 text-gray-700 leading-relaxed">{children}</div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// const Categories = () => {
//   const { user } = useUser();
  
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { 
//     file,
//     userId,
//     businessName,
//     businessLink,
//     businessLocation,
//     adDescription,
//     selectedWebsites
//   } = location.state || {};

//   const [categoriesByWebsite, setCategoriesByWebsite] = useState([]);
//   const [selectedCategories, setSelectedCategories] = useState([]);
//   const [error, setError] = useState(false);
//   const [selectedDescription, setSelectedDescription] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
  
//   const adOwnerEmail = user.primaryEmailAddress.emailAddress;

//   useEffect(() => {
//     const fetchCategories = async () => {
//       setIsLoading(true);
//       try {
//         const promises = selectedWebsites.map(async (websiteId) => {
//           const websiteResponse = await fetch(`https://yepper-backend.onrender.com/api/websites/website/${websiteId}`);
//           const websiteData = await websiteResponse.json();
//           const categoriesResponse = await fetch(`https://yepper-backend.onrender.com/api/ad-categories/${websiteId}`);
//           const categoriesData = await categoriesResponse.json();

//           return {
//             websiteName: websiteData.websiteName || 'Unknown Website',
//             websiteLink: websiteData.websiteLink || '#',
//             categories: categoriesData.categories || [],
//           };
//         });
//         const result = await Promise.all(promises);
//         setCategoriesByWebsite(result);
//       } catch (error) {
//         console.error('Failed to fetch categories or websites:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     if (selectedWebsites) fetchCategories();
//   }, [selectedWebsites]);

//   const handleCategorySelection = (categoryId) => {
//     setSelectedCategories((prevSelected) =>
//       prevSelected.includes(categoryId) 
//         ? prevSelected.filter((id) => id !== categoryId) 
//         : [...prevSelected, categoryId]
//     );
//     setError(false);
//   };

//   const handleNext = async(e) => {
//     e.preventDefault();
//     if (selectedCategories.length === 0) {
//       setError(true);
//       return;
//     }
    
//     try {
//       const formData = new FormData();
//       formData.append('adOwnerEmail', adOwnerEmail);
//       formData.append('file', file);
//       formData.append('userId', userId);
//       formData.append('businessName', businessName);
//       formData.append('businessLink', businessLink);
//       formData.append('businessLocation', businessLocation);
//       formData.append('adDescription', adDescription);
//       formData.append('selectedWebsites', JSON.stringify(selectedWebsites));
//       formData.append('selectedCategories', JSON.stringify(selectedCategories));
//       // formData.append('selectedSpaces', JSON.stringify(selectedSpaces));

//       await axios.post('https://yepper-backend.onrender.com/api/importAds', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });

//       navigate('/dashboard');
//     } catch (error) {
//       console.error('Error during ad upload:', error);
//       setError('An error occurred while uploading the ad');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Header />
//       <div className="max-w-7xl mx-auto px-4 py-12">
//         <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
//           <div className="bg-gradient-to-r p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//             <div className="space-y-2">
//               <h1 className="text-4xl text-blue-950 font-bold">
//                 Select Categories
//               </h1>
//               <p className="text-gray-600">
//                 Choose relevant categories for your advertisement
//               </p>
//             </div>
//             <button 
//               onClick={handleNext}
//               className={`w-full sm:w-auto mt-6 sm:mt-0 flex items-center justify-center px-6 py-3 rounded-lg font-bold text-white sm:text-base transition-all duration-300 ${
//                 selectedCategories.length === 0 
//                   ? 'bg-gray-300 cursor-not-allowed'
//                   : 'bg-[#FF4500] hover:bg-orange-500 hover:-translate-y-0.5'
//               }`}
//             >
//               Next
//             </button>
//           </div>

//           {error && (
//             <div className="mx-8 my-6 flex items-center gap-3 text-red-600 bg-red-50 p-4 rounded-xl border border-red-100">
//               <Info className="w-5 h-5 flex-shrink-0" />
//               <span className="text-sm font-medium">Please select at least one category to proceed</span>
//             </div>
//           )}

//           <div className="p-8">
//             {isLoading ? (
//               <div className="flex justify-center items-center min-h-[400px]">
//                 <LoadingSpinner />
//               </div>
//             ) : categoriesByWebsite.length > 0 ? (
//               <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
//                 {categoriesByWebsite.map((website) => (
//                   <div 
//                     key={website.websiteName} 
//                     className="flex flex-col bg-white rounded-2xl border border-gray-200 overflow-hidden transition-shadow duration-300 hover:shadow-lg"
//                   >
//                     <div className="bg-gradient-to-r from-gray-50 to-white p-4 flex justify-between items-center border-b border-gray-200">
//                       <h2 className="text-lg font-semibold text-blue-950">{website.websiteName}</h2>
//                       <a 
//                         href={website.websiteLink} 
//                         target="_blank" 
//                         rel="noopener noreferrer"
//                         className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
//                       >
//                         <LinkIcon className="w-5 h-5" />
//                       </a>
//                     </div>
                    
//                     {website.categories.length > 0 ? (
//                       <div className="p-6 grid gap-4">
//                         {website.categories.map((category) => (
//                           <div
//                             key={category._id}
//                             onClick={() => handleCategorySelection(category._id)}
//                             className={`group relative flex flex-col bg-white rounded-xl p-5 border-2 transition-all duration-300 cursor-pointer hover:shadow-lg ${
//                               selectedCategories.includes(category._id)
//                                 ? 'border-[#FF4500] bg-red-50/50 scale-[1.02]'
//                                 : 'border-gray-200'
//                             }`}
//                           >
//                             <div className="flex justify-between items-start mb-4">
//                               <div className="flex items-center gap-3">
//                                 <div className="p-2 bg-blue-100 rounded-lg">
//                                   <Tag className="w-5 h-5 text-blue-600" />
//                                 </div>
//                                 <h3 className="font-semibold text-blue-950">
//                                   {category.categoryName}
//                                 </h3>
//                               </div>
//                               {selectedCategories.includes(category._id) && (
//                                 <div className="p-1 bg-blue-500 rounded-full">
//                                   <Check size={16} className="text-white" />
//                                 </div>
//                               )}
//                             </div>
                            
//                             <div className="flex items-start gap-2 mb-4">
//                               <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
//                                 {category.description}
//                               </p>
//                               {category.description.length > 100 && (
//                                 <button 
//                                   onClick={(e) => {
//                                     e.stopPropagation();
//                                     setSelectedDescription(category.description);
//                                   }}
//                                   className="flex-shrink-0 p-1 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
//                                 >
//                                   <Info className="w-4 h-4" />
//                                 </button>
//                               )}
//                             </div>
                            
//                             <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
//                               {/* <span className="text-sm font-medium text-green-600">RWF</span> */}
//                               <DollarSign className="w-5 h-5" />
//                               <span className="text-lg font-semibold text-blue-950">{category.price}</span>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     ) : (
//                       <div className="p-12 text-center text-gray-500">
//                         <p className="font-medium">No categories available</p>
//                         <p className="text-sm text-gray-400 mt-1">Check back later for updates</p>
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div className="text-center py-16">
//                 <p className="text-lg font-medium text-gray-600">No categories available</p>
//                 <p className="text-sm text-gray-500 mt-1">Please select different websites and try again</p>
//               </div>
//             )}
//           </div>
//         </div>

//         <Modal 
//           isOpen={!!selectedDescription} 
//           onClose={() => setSelectedDescription(null)}
//           title="Category Description"
//         >
//           <p className="text-gray-700 leading-relaxed">{selectedDescription}</p>
//         </Modal>
//       </div>
//     </div>
//   );
// };

// export default Categories;