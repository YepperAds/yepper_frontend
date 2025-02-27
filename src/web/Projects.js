import React, { useState, useEffect } from 'react';
import { useClerk } from '@clerk/clerk-react';
import { Plus, Globe, ChevronRight, Megaphone, Loader, Banknote, ArrowUpRight, Search } from 'lucide-react';
import { Link, useNavigate } from "react-router-dom";
import LoadingSpinner from '../components/LoadingSpinner';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

function Projects() {
    const { user } = useClerk();
    const navigate = useNavigate();
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredWebsites, setFilteredWebsites] = useState([]);
    const [hoverCreate, setHoverCreate] = useState(false);
    
    const { data: websites, isLoading, error } = useQuery({
        queryKey: ['websites', user?.id],
        queryFn: async () => {
          const response = await axios.get(`https://yepper-backend.onrender.com/api/websites/${user?.id}`);
          return response.data;
        },
        enabled: !!user?.id,
        onSuccess: (data) => {
          // Initialize filteredWebsites when data first loads
          setFilteredWebsites(data);
        }
    });

    useEffect(() => {
        if (!websites) return;
    
        const performSearch = () => {
          const query = searchQuery.toLowerCase().trim();
          const statusFiltered = selectedFilter === 'all' 
            ? websites 
            : websites.filter(website => website.status === selectedFilter);
    
          if (!query) {
            setFilteredWebsites(statusFiltered);
            return;
          }
    
          const searched = statusFiltered.filter(website => {
            const searchFields = [
              website.websiteName?.toLowerCase(),
              website.websiteLink?.toLowerCase(),
            ];
            return searchFields.some(field => field?.includes(query));
          });
          
          setFilteredWebsites(searched);
        };
    
        performSearch();
    }, [searchQuery, selectedFilter, websites]);
    
    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };
    
    if (isLoading) return <LoadingSpinner />;
  
    if (error) return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-red-500">Error: {error.message}</div>
        </div>
    );

  return (
    <div className="min-h-screen bg-black text-white">    
      <main className="max-w-7xl mx-auto px-6 py-20">
        <div className="mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="h-px w-12 bg-blue-500 mr-6"></div>
            <span className="text-blue-400 text-sm font-medium uppercase tracking-widest">Website Manager</span>
            <div className="h-px w-12 bg-blue-500 ml-6"></div>
          </div>
          
          <h1 className="text-center text-6xl font-bold mb-6 tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
              Your Digital Ecosystem
            </span>
          </h1>
          
          {/* Search and Filter Controls */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-center mb-12">
            <div className="relative w-full md:w-1/2 max-w-md">
              <input
                type="text"
                placeholder="Search campaigns..."
                value={searchQuery}
                onChange={handleSearch}
                className="w-full h-14 pl-14 pr-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
              <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-white/40" size={20} />
            </div>
            
            <div className="flex gap-4">
              <button 
                onClick={() => navigate('/pending-ads')}
                className="h-12 px-5 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 text-white hover:bg-white/10 transition-all flex items-center"
              >
                <Loader className="w-5 h-5 mr-2 text-orange-400" />
                <span>Pending Ads</span>
              </button>
              
              <button 
                onClick={() => navigate('/wallet')}
                className="h-12 px-5 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 text-white hover:bg-white/10 transition-all flex items-center"
              >
                <Banknote className="w-5 h-5 mr-2 text-orange-400" />
                <span>Wallet</span>
              </button>
            </div>
          </div>
          
          <div className="flex justify-between items-center mb-10">
            <div className="flex items-center">
              <span className="text-blue-400 text-2xl font-bold mr-3">{filteredWebsites.length}</span>
              <span className="text-white/70">{searchQuery ? 'Found Websites' : 'Active Websites'}</span>
            </div>
            
            <button 
              onClick={() => navigate('/dashboard')}
              className="flex items-center px-5 py-2 rounded-xl bg-gradient-to-r from-orange-600 to-red-600 text-white hover:from-orange-500 hover:to-red-500 transition-all"
            >
              <Megaphone className="w-5 h-5 mr-2" />
              <span>Switch to Ads</span>
            </button>
          </div>
        </div>
        
        {filteredWebsites.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredWebsites.slice().reverse().map((website) => (
              <div
                key={website._id}
                className="group backdrop-blur-md bg-gradient-to-b from-gray-900/30 to-gray-900/10 rounded-3xl overflow-hidden border border-white/10 transition-all duration-500 hover:border-orange-500/30"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-6">
                    {website.imageUrl ? (
                      <img 
                        src={website.imageUrl} 
                        alt={website.websiteName}
                        className="w-16 h-16 object-contain rounded-xl bg-black/20 p-2"
                      />
                    ) : (
                      <div className="relative">
                        <div className="absolute inset-0 rounded-full bg-orange-500 blur-md opacity-40"></div>
                        <div className="relative p-3 rounded-full bg-gradient-to-r from-orange-600 to-orange-400">
                          <Globe className="text-white" size={24} />
                        </div>
                      </div>
                    )}
                    <div className="flex flex-col items-end">
                      <div className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500 text-white mb-2">Active</div>
                      <a 
                        href={website.websiteLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center text-white/70 hover:text-white transition-colors"
                      >
                        <Globe className="w-4 h-4 mr-1" />
                        <span>Visit Site</span>
                        <ArrowUpRight className="w-3 h-3 ml-1" />
                      </a>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-6">{website.websiteName}</h3>
                  
                  <Link 
                    to={`/website/${website._id}`}
                    className="w-full group relative h-12 rounded-xl bg-gradient-to-r from-orange-600 to-rose-600 text-white font-medium overflow-hidden transition-all duration-300 flex items-center justify-center"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-rose-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span className="relative z-10 flex items-center justify-center">
                      <span className="uppercase tracking-wider">View Details</span>
                      <ChevronRight size={16} className="ml-2" />
                    </span>
                  </Link>
                </div>
              </div>
            ))}
            
            {/* Add New Website Card */}
            <div 
              className="group relative backdrop-blur-md bg-gradient-to-b from-blue-900/30 to-blue-900/10 rounded-3xl overflow-hidden border border-white/10 transition-all duration-500 cursor-pointer"
              style={{
                boxShadow: hoverCreate ? '0 0 40px rgba(59, 130, 246, 0.3)' : '0 0 0 rgba(0, 0, 0, 0)'
              }}
              onMouseEnter={() => setHoverCreate(true)}
              onMouseLeave={() => setHoverCreate(false)}
              onClick={() => navigate('/create-website')}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
              
              <div className="h-full flex flex-col items-center justify-center p-8 relative z-10">
                <div className="relative mb-6">
                  <div className="absolute inset-0 rounded-full bg-blue-500 blur-md opacity-40"></div>
                  <div className="relative p-4 rounded-full bg-gradient-to-r from-blue-600 to-blue-400">
                    <Plus className="text-white" size={32} />
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-2">Add New Website</h3>
                <p className="text-white/70 text-center mb-6">
                  Connect a new website to your ecosystem
                </p>
                
                <button className="px-6 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium overflow-hidden transition-all duration-300 hover:from-blue-500 hover:to-indigo-500">
                  Create Now
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="backdrop-blur-md bg-white/5 rounded-3xl border border-white/10 p-12 flex flex-col items-center justify-center">
            <div className="relative mb-6">
              <div className="absolute inset-0 rounded-full bg-orange-500 blur-md opacity-40"></div>
              <div className="relative p-4 rounded-full bg-gradient-to-r from-orange-600 to-orange-400">
                <Globe className="text-white" size={32} />
              </div>
            </div>
            
            <h2 className="text-2xl font-bold mb-3">
              {searchQuery ? 'No Websites Found' : 'No Websites Yet'}
            </h2>
            
            <p className="text-white/70 text-center mb-8 max-w-md">
              {searchQuery 
                ? 'Try adjusting your search terms or create a new website'
                : 'Start by adding a new website to track your projects and analytics.'}
            </p>
            
            <button
              onClick={() => navigate('/create-website')}
              className="group relative h-12 px-6 rounded-xl bg-gradient-to-r from-orange-600 to-rose-600 text-white font-medium overflow-hidden transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-rose-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10 flex items-center justify-center">
                <Plus size={16} className="mr-2" />
                <span className="uppercase tracking-wider">Create First Website</span>
              </span>
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default Projects;





















// import React, { useState, useEffect } from 'react';
// import { useClerk } from '@clerk/clerk-react';
// import { Plus, Globe, ChevronRight, Megaphone, Loader, Banknote, ArrowUpRight, Search } from 'lucide-react';
// import { Link, useNavigate } from "react-router-dom";
// import { motion } from 'framer-motion';
// import LoadingSpinner from '../components/LoadingSpinner';
// import { useWebsites } from '../hooks/useWebsites';
// import { useQuery } from '@tanstack/react-query';
// import axios from 'axios';

// function Projects() {
//     const { user } = useClerk();
//     const navigate = useNavigate();
//     const [selectedFilter, setSelectedFilter] = useState('all');
//     const [searchQuery, setSearchQuery] = useState('');
//     const [filteredWebsites, setFilteredWebsites] = useState([]);
    
//     const { data: websites, isLoading, error } = useQuery({
//         queryKey: ['websites', user?.id],
//         queryFn: async () => {
//           const response = await axios.get(`https://yepper-backend.onrender.com/api/websites/${user?.id}`);
//           return response.data;
//         },
//         enabled: !!user?.id,
//         onSuccess: (data) => {
//           // Initialize filteredWebsites when data first loads
//           setFilteredWebsites(data);
//         }
//     });

//     useEffect(() => {
//         if (!websites) return;
    
//         const performSearch = () => {
//           const query = searchQuery.toLowerCase().trim();
//           const statusFiltered = selectedFilter === 'all' 
//             ? websites 
//             : websites.filter(website => website.status === selectedFilter);
    
//           if (!query) {
//             setFilteredWebsites(statusFiltered);
//             return;
//           }
    
//           const searched = statusFiltered.filter(website => {
//             const searchFields = [
//               website.websiteName?.toLowerCase(),
//               website.websiteLink?.toLowerCase(),
//             ];
//             return searchFields.some(field => field?.includes(query));
//           });
          
//           setFilteredWebsites(searched);
//         };
    
//         performSearch();
//     }, [searchQuery, selectedFilter, websites]);
    
//     const handleSearch = (e) => {
//         setSearchQuery(e.target.value);
//     };
    
//     if (isLoading) return <LoadingSpinner />;
//     if (error) return <div>Error: {error.message}</div>;

//     return (
//         <div className="w-full bg-white rounded-lg shadow-md container mx-auto px-4 py-8 md:py-16">
//             {/* Header Section */}
//             <div className="p-4 border-b border-gray-100">
//                 <div className="py-4 w-full flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-end">
//                     {/* Stack buttons vertically on mobile, horizontally on larger screens */}
//                     <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
//                         <motion.button 
//                             className="flex items-center justify-center gap-2 text-blue-950 font-bold bg-gray-200 px-3 py-2 rounded-lg hover:bg-gray-300 text-sm sm:text-base w-full sm:w-auto"
//                             onClick={() => navigate('/pending-ads')}
//                             whileHover={{ scale: 1.05 }}
//                             whileTap={{ scale: 0.95 }}
//                         >
//                             <Loader className="w-5 h-5 sm:w-6 sm:h-6 text-[#FF4500]" />
//                             <span className="whitespace-nowrap">Pending Ads</span>
//                         </motion.button>

//                         <motion.button 
//                             className="flex items-center justify-center gap-2 text-blue-950 font-bold bg-gray-200 px-3 py-2 rounded-lg hover:bg-gray-300 text-sm sm:text-base w-full sm:w-auto"
//                             onClick={() => navigate('/wallet')}
//                             whileHover={{ scale: 1.05 }}
//                             whileTap={{ scale: 0.95 }}
//                         >
//                             <Banknote className="w-5 h-5 sm:w-6 sm:h-6 text-[#FF4500]" />
//                             Your wallet
//                         </motion.button>
//                     </div>

//                     {/* Search section */}
//                     <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
//                         <input
//                             type="text"
//                             placeholder="Search..."
//                             value={searchQuery}
//                             onChange={handleSearch}
//                             className="px-4 py-2 border rounded-full w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
//                         />
//                         <motion.button 
//                             className="flex items-center justify-center gap-2 text-white px-3 py-2 rounded-lg text-sm font-bold bg-[#FF4500] hover:bg-orange-500 transition-colors w-full sm:w-auto"
//                             whileHover={{ scale: 1.05 }}
//                             whileTap={{ scale: 0.95 }}
//                         >
//                             <Search className="w-5 h-5 sm:w-6 sm:h-6" />
//                             Search
//                         </motion.button>
//                     </div>
//                 </div>
                
//                 <div className="flex justify-between items-center mb-4">
//                     <div className="flex items-center justify-center gap-5">
//                         <h3 className="text-2xl font-bold bg-blue-600 bg-clip-text text-transparent">
//                             {filteredWebsites.length}
//                         </h3>
//                         <h4 className="text-sm font-medium text-gray-600">
//                             {searchQuery ? 'Found Websites' : 'Active Websites'}
//                         </h4>
//                     </div>
//                     <div className='flex justify-center items-center gap-3'>
//                         <motion.button 
//                             className="flex items-center justify-center gap-2 text-blue-950 font-bold bg-gray-200 px-3 py-1 rounded-lg hover:bg-gray-300"
//                             onClick={() => navigate('/dashboard')}
//                             whileHover={{ scale: 1.05 }}
//                             whileTap={{ scale: 0.95 }}
//                         >
//                             <Megaphone className="w-6 h-6 text-[#FF4500]" />
//                             Switch to Ads
//                         </motion.button>
//                     </div>
//                 </div>
//             </div>

//             {/* Content Section */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
//                 {filteredWebsites.length > 0 ? (
//                     filteredWebsites.slice().reverse().map((website) => (
//                         <div
//                             key={website._id}
//                             className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col h-[280px]"
//                         >
//                             <div className="relative h-40 bg-gray-50 p-4">
//                                 <div className="flex justify-between">
//                                     {website.imageUrl ? (
//                                         <img 
//                                             src={website.imageUrl} 
//                                             alt={website.websiteName}
//                                             className="w-16 h-16 object-contain rounded-lg"
//                                         />
//                                     ) : (
//                                         <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center">
//                                             <Globe className="w-8 h-8 text-gray-400" />
//                                         </div>
//                                     )}
//                                     <div className="flex flex-col items-end">
//                                         <span className="px-2 py-1 rounded-full text-xs font-medium text-white bg-blue-500">
//                                             Active
//                                         </span>
//                                         <a 
//                                             href={website.websiteLink} 
//                                             target="_blank" 
//                                             rel="noopener noreferrer"
//                                             className="mt-2 flex items-center text-sm text-gray-600 hover:text-gray-800"
//                                         >
//                                             <Globe className="w-4 h-4 mr-1" />
//                                             Visit Site
//                                             <ArrowUpRight className="w-3 h-3 ml-1" />
//                                         </a>
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className="p-4 flex flex-col flex-grow">
//                                 <h4 className="text-lg font-semibold text-gray-800 mb-2">
//                                     {website.websiteName}
//                                 </h4>

//                                 <Link 
//                                     to={`/website/${website._id}`}
//                                     className="w-full flex items-center justify-center gap-1 px-3 py-2 bg-[#FF4500] hover:bg-orange-500 hover:-translate-y-0.5 text-white font-bold rounded-md transition-all duration-300"
//                                 >
//                                     View
//                                     <ChevronRight className="w-4 h-4" />
//                                 </Link>
//                             </div>
//                         </div>
//                     ))
//                 ) : (
//                     <div className="col-span-full flex flex-col items-center justify-center py-8">
//                         <Globe className="w-8 h-8 text-gray-400 mb-2" />
//                         <h2 className="text-xl font-semibold mb-2 text-gray-800">
//                             {searchQuery ? 'No Websites Found' : 'No Websites Yet'}
//                         </h2>
//                         <p className="text-sm text-gray-500 mb-4">
//                             {searchQuery 
//                                 ? 'Try adjusting your search terms'
//                                 : 'Start by adding a new website to track your projects.'}
//                         </p>
//                         <Link 
//                             to="/create-website"
//                             className="flex items-center justify-center gap-1 px-3 py-2 bg-[#FF4500] hover:bg-orange-500 hover:-translate-y-0.5 text-white sm:text-base font-bold rounded-md transition-all duration-300"
//                         >
//                             <Plus className="w-4 h-4" />
//                             Create First Website
//                         </Link>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }

// export default Projects;