import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Globe, Check, Search, Filter, ArrowLeft, PlusCircle, FileText } from 'lucide-react';
import LoadingSpinner from '../../components/LoadingSpinner';

function Websites() {
  const location = useLocation();
  const navigate = useNavigate();
  const { file, userId, businessName, businessLink, businessLocation, adDescription } = location.state || {};
  const [websites, setWebsites] = useState([]);
  const [filteredWebsites, setFilteredWebsites] = useState([]);
  const [selectedWebsites, setSelectedWebsites] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWebsites = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://yepper-backend.onrender.com/api/websites');
        const data = await response.json();
        
        setWebsites(data);
        setFilteredWebsites(data);
        const uniqueCategories = ['All', ...new Set(data.map(site => site.category))];
        setCategories(uniqueCategories);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch websites:', error);
        setLoading(false);
      }
    };

    fetchWebsites();
  }, []);

  useEffect(() => {
    let result = websites;
    
    if (searchTerm) {
      result = result.filter(site => 
        site.websiteName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        site.websiteLink.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedCategory !== 'All') {
      result = result.filter(site => site.category === selectedCategory);
    }
    
    setFilteredWebsites(result);
  }, [searchTerm, selectedCategory, websites]);

  const handleSelect = (websiteId) => {
    setSelectedWebsites(prev => 
      prev.includes(websiteId) 
        ? prev.filter(id => id !== websiteId)
        : [...prev, websiteId]
    );
  };

  const handleNext = () => {
    if (selectedWebsites.length === 0) return;

    navigate('/categories', {
      state: {
        file,
        userId,
        businessName,
        businessLink,
        businessLocation,
        adDescription,
        selectedWebsites,
      },
    });
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
          <div className="bg-white/10 px-4 py-1 rounded-full text-xs font-medium tracking-widest">SELECT WEBSITES</div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-6 py-20">
        <div className="mb-16">          
          <h1 className="text-center text-6xl font-bold mb-6 tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
              Choose websites
            </span>
          </h1>
          
          <p className="text-center text-white/70 max-w-2xl mx-auto text-lg mb-6">
            Select the websites that best match your target audience for optimized ad delivery.
          </p>
        </div>

        {error && (
          <div className="mb-8 flex items-center gap-2 bg-red-900/30 text-red-300 p-4 rounded-xl backdrop-blur-md border border-red-500/20">
            <FileText className="w-5 h-5" />
            <span>{error}</span>
          </div>
        )}

        <div className="flex flex-col md:flex-row justify-between mb-8 gap-4">
          <div className="relative w-full md:w-1/2 max-w-md">
            <input 
              type="text" 
              placeholder="Search websites" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-14 pl-14 pr-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
            <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-white/40" size={20} />
          </div>

          <div className="relative min-w-[200px]">
            <Filter size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50" />
            <select 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full appearance-none pl-12 pr-10 py-4 bg-white/5 border border-white/10 rounded-xl text-white backdrop-blur-md focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              style={{ 
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='rgba(255, 255, 255, 0.5)'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 16px center',
                backgroundSize: '16px'
              }}
            >
              {categories.map(category => (
                <option key={category} value={category} className="bg-gray-900 text-white">{category}</option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWebsites.length === 0 ? (
              <div className="col-span-full flex flex-col items-center justify-center py-16 backdrop-blur-md bg-white/5 rounded-2xl border border-white/10">
                <Globe className="w-12 h-12 text-white/40 mb-4" />
                <p className="text-white/60 mb-4">No websites found matching your search</p>
              </div>
            ) : (
              filteredWebsites.map((website) => (
                <div 
                  key={website._id} 
                  onClick={() => handleSelect(website._id)}
                  className={`group backdrop-blur-md rounded-2xl overflow-hidden border transition-all duration-300 cursor-pointer hover:-translate-y-1 ${
                    selectedWebsites.includes(website._id)
                      ? 'border-orange-500 bg-gradient-to-b from-orange-900/30 to-orange-900/10'
                      : 'border-white/10 bg-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className={`relative w-12 h-12 flex items-center justify-center rounded-xl overflow-hidden ${
                        selectedWebsites.includes(website._id) ? 'bg-orange-500/20' : 'bg-white/10'
                      }`}>
                        <img 
                          src={website.imageUrl || '/global.png'} 
                          alt={`${website.websiteName} logo`} 
                          className="w-8 h-8 object-contain"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/global.png';
                          }}
                        />
                      </div>
                      <div className="ml-4 flex-grow">
                        <h3 className="text-lg font-semibold">{website.websiteName}</h3>
                        <p className="text-white/60 text-sm">{website.websiteLink}</p>
                      </div>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                        selectedWebsites.includes(website._id)
                          ? 'bg-orange-500 text-white'
                          : 'bg-white/10 group-hover:bg-white/20 text-transparent group-hover:text-white/60'
                      }`}>
                        <Check size={16} />
                      </div>
                    </div>
                    <div className="pt-3 border-t border-white/10">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        selectedWebsites.includes(website._id)
                          ? 'bg-orange-500/20 text-orange-300'
                          : 'bg-white/10 text-white/60'
                      }`}>
                        {website.category}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        <div className="mt-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-white/60 text-sm">
            {selectedWebsites.length > 0 && (
              <span>{selectedWebsites.length} website{selectedWebsites.length !== 1 ? 's' : ''} selected</span>
            )}
          </div>
          
          <button
            onClick={handleNext} 
            disabled={selectedWebsites.length === 0}
            className={`w-full md:w-auto px-8 group relative h-14 rounded-xl text-white font-medium overflow-hidden transition-all duration-300 ${
              selectedWebsites.length === 0
                ? 'bg-white/10 cursor-not-allowed'
                : 'bg-gradient-to-r from-orange-600 to-rose-600'
            }`}
          >
            {selectedWebsites.length > 0 && (
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-rose-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            )}
            <span className="relative z-10 flex items-center justify-center">
              {loading ? 'Processing...' : (
                <>
                  <span className="uppercase tracking-wider">Continue</span>
                  <PlusCircle size={16} className="ml-2" />
                </>
              )}
            </span>
          </button>
        </div>
      </main>
    </div>
  );
}

export default Websites;


















// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { Globe, Check, Search, Filter, FileText } from 'lucide-react';
// import { motion } from 'framer-motion';
// import Header from '../../components/backToPreviousHeader';
// import LoadingSpinner from '../../components/LoadingSpinner';

// function Websites() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { file, userId, businessName, businessLink, businessLocation, adDescription } = location.state || {};
  
//   const [websites, setWebsites] = useState([]);
//   const [filteredWebsites, setFilteredWebsites] = useState([]);
//   const [selectedWebsites, setSelectedWebsites] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState('All');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchWebsites = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch('https://yepper-backend.onrender.com/api/websites');
//         const data = await response.json();
        
//         setWebsites(data);
//         setFilteredWebsites(data);
//         const uniqueCategories = ['All', ...new Set(data.map(site => site.category))];
//         setCategories(uniqueCategories);
//         setLoading(false);
//       } catch (error) {
//         console.error('Failed to fetch websites:', error);
//         setLoading(false);
//       }
//     };

//     fetchWebsites();
//   }, []);

//   useEffect(() => {
//     let result = websites;
    
//     if (searchTerm) {
//       result = result.filter(site => 
//         site.websiteName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         site.websiteLink.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }
    
//     if (selectedCategory !== 'All') {
//       result = result.filter(site => site.category === selectedCategory);
//     }
    
//     setFilteredWebsites(result);
//   }, [searchTerm, selectedCategory, websites]);

//   const handleSelect = (websiteId) => {
//     setSelectedWebsites(prev => 
//       prev.includes(websiteId) 
//         ? prev.filter(id => id !== websiteId)
//         : [...prev, websiteId]
//     );
//   };

//   const handleNext = () => {
//     if (selectedWebsites.length === 0) return;

//     navigate('/categories', {
//       state: {
//         file,
//         userId,
//         businessName,
//         businessLink,
//         businessLocation,
//         adDescription,
//         selectedWebsites,
//       },
//     });
//   };

//   return (
//     <div className='ad-waitlist min-h-screen'>
//       <Header />
//       <div className='max-w-7xl py-5 mx-auto'>
//         <div className="bg-white rounded-3xl shadow-xl border border-gray-100 w-full max-w-6xl p-12">
//           <div className="text-center mb-8">
//             <h1 className="text-4xl text-blue-950 mb-2 font-bold">Choose Your Advertising Platforms</h1>
//             <p className="text-gray-600">Select the websites that best match your target audience</p>
//           </div>

//           {error && (
//             <div className="mt-4 mb-4 flex items-center gap-2 bg-red-50 text-red-600 p-3 rounded-lg">
//               <FileText className="w-5 h-5" />
//               <span>{error}</span>
//             </div>
//           )}

//           <div className="flex flex-col md:flex-row justify-between mb-8 gap-4">
//             <div className="relative flex-grow">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
//               <input 
//                 type="text" 
//                 placeholder="Search websites" 
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600"
//               />
//             </div>

//             <div className="flex items-center gap-2 text-gray-700">
//               <Filter size={20} />
//               <select 
//                 value={selectedCategory} 
//                 onChange={(e) => setSelectedCategory(e.target.value)}
//                 className="py-3 px-4 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-600"
//               >
//                 {categories.map(category => (
//                   <option key={category} value={category}>{category}</option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           {loading ? (
//             <LoadingSpinner />
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//               {filteredWebsites.length === 0 ? (
//                 <div className="col-span-full flex flex-col items-center justify-center p-8">
//                   <Globe className="w-8 h-8 text-gray-400 mb-2" />
//                   <p className="text-sm text-gray-500 mb-4">No websites found matching your search</p>
//                 </div>
//               ) : (
//                 filteredWebsites.map((website) => (
//                   <div 
//                     key={website._id} 
//                     className={`bg-gray-50 rounded-xl p-4 flex justify-between items-center cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-lg border-2 ${
//                       selectedWebsites.includes(website._id) 
//                         ? 'border-[#FF4500] bg-red-50/50' 
//                         : 'border-transparent'
//                     }`}
//                     onClick={() => handleSelect(website._id)}
//                   >
//                     <div className="flex items-center gap-4">
//                       <img 
//                         src={website.imageUrl || 'global.png'} 
//                         alt={`${website.websiteName} logo`} 
//                         className="w-12 h-12 object-contain rounded-lg"
//                       />
//                       <div>
//                         <h2 className="text-base font-medium mb-1">{website.websiteName}</h2>
//                         <p className="text-xs text-gray-600">{website.websiteLink}</p>
//                         <span className="inline-block bg-red-100 text-orange-500 px-2 py-1 rounded text-xs mt-2">
//                           {website.category}
//                         </span>
//                       </div>
//                     </div>
//                     <div className="text-[#FF4500]">
//                       {selectedWebsites.includes(website._id) && <Check size={24} />}
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>
//           )}

//           <div className="flex justify-between items-center mt-8 pt-4 border-t border-gray-200">
//             <div className="text-gray-700 w-full mt-6">
//               {selectedWebsites.length > 0 && (
//                 <span>{selectedWebsites.length} website{selectedWebsites.length !== 1 ? 's' : ''} selected</span>
//               )}
//             </div>
//             <motion.button 
//               onClick={handleNext} 
//               disabled={selectedWebsites.length === 0}
//               className={`w-full mt-6 px-3 py-2 rounded-lg font-bold text-white sm:text-base transition-all duration-300 ${
//                 selectedWebsites.length === 0
//                   ? 'bg-gray-300 cursor-not-allowed'
//                   : 'bg-[#FF4500] text-white hover:bg-orange-500 hover:-translate-y-0.5'
//               }`}
//             >
//               {loading ? 'Processing...' : 'Next'}
//             </motion.button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Websites;