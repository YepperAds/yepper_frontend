// Home.js
import React, { useState } from 'react';
import { Target, Globe } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import Header from '../components/description-header';
import AdSide from '../components/AdSide';
import SpaceSide from '../components/SpaceSide';
import Support from '../components/support';

function Home() {
  const navigate = useNavigate();
  const [hoverAds, setHoverAds] = useState(false);
  const [hoverSpaces, setHoverSpaces] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white">
        <Header />
        <Support />
      
      <main className="max-w-7xl mx-auto px-6 py-20">
        <div className="mb-24">
          <div className="flex items-center justify-center mb-6">
            <div className="h-px w-12 bg-blue-500 mr-6"></div>
            <span className="text-blue-400 text-sm font-medium uppercase tracking-widest">Yepper Platform</span>
            <div className="h-px w-12 bg-blue-500 ml-6"></div>
          </div>
          
          <h1 className="text-center text-6xl font-bold mb-6 tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
              Forging Powerful Connections
            </span>
          </h1>
          
          <p className="text-center text-white/70 max-w-2xl mx-auto text-lg mb-6">
            Seamlessly bridge advertisers and publishers with our cutting-edge platform that transforms digital advertising into meaningful connections.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Yepper Ads Card */}
          <div 
            className="group relative backdrop-blur-md bg-gradient-to-b from-blue-900/30 to-blue-900/10 rounded-3xl overflow-hidden border border-white/10 transition-all duration-500"
            style={{
              boxShadow: hoverAds ? '0 0 40px rgba(59, 130, 246, 0.3)' : '0 0 0 rgba(0, 0, 0, 0)'
            }}
            onMouseEnter={() => setHoverAds(true)}
            onMouseLeave={() => setHoverAds(false)}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
            
            <div className="p-10 relative z-10">
              <div className="flex items-center mb-8">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-blue-500 blur-md opacity-40"></div>
                  <div className="relative p-3 rounded-full bg-gradient-to-r from-blue-600 to-blue-400">
                    <Target className="text-white" size={24} />
                  </div>
                </div>
                <div className="ml-4">
                  <div className="uppercase text-xs font-semibold text-blue-400 tracking-widest mb-1">For Advertisers</div>
                  <h2 className="text-3xl font-bold">Yepper Ads</h2>
                </div>
              </div>
              
              <AdSide />
              
              <button
                onClick={() => navigate('/select')}
                className="w-full group relative h-16 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium overflow-hidden transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10 flex items-center justify-center">
                  <span className="uppercase tracking-wider">Publish Your Ad</span>
                </span>
              </button>
            </div>
          </div>

          {/* Yepper Spaces Card */}
          <div 
            className="group relative backdrop-blur-md bg-gradient-to-b from-orange-900/30 to-orange-900/10 rounded-3xl overflow-hidden border border-white/10 transition-all duration-500"
            style={{
              boxShadow: hoverSpaces ? '0 0 40px rgba(249, 115, 22, 0.3)' : '0 0 0 rgba(0, 0, 0, 0)'
            }}
            onMouseEnter={() => setHoverSpaces(true)}
            onMouseLeave={() => setHoverSpaces(false)}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600/10 to-rose-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
            
            <div className="p-10 relative z-10">
              <div className="flex items-center mb-8">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-orange-500 blur-md opacity-40"></div>
                  <div className="relative p-3 rounded-full bg-gradient-to-r from-orange-600 to-orange-400">
                    <Globe className="text-white" size={24} />
                  </div>
                </div>
                <div className="ml-4">
                  <div className="uppercase text-xs font-semibold text-orange-400 tracking-widest mb-1">For Publishers</div>
                  <h2 className="text-3xl font-bold">Yepper Spaces</h2>
                </div>
              </div>
              
              <SpaceSide />
              
              <button
                onClick={() => navigate('/create-website')}
                className="w-full group relative h-16 rounded-xl bg-gradient-to-r from-orange-600 to-rose-600 text-white font-medium overflow-hidden transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-rose-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10 flex items-center justify-center">
                  <span className="uppercase tracking-wider">Add Your Website</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;























// import React from 'react';
// import { Sparkles, Target } from 'lucide-react';
// import Header from '../components/description-header';
// import AdSide from '../components/AdSide';
// import SpaceSide from '../components/SpaceSide';
// import Support from '../components/support';

// function Home() {

//     return (
//         <div className="ad-waitlist min-h-screen bg-gradient-to-br from-white to-blue-50">
//             <Header />
//             <Support />
//             <main className="container mx-auto px-4 py-8 md:py-16">
//                 <div className="max-w-4xl mx-auto text-center mb-8 md:mb-16">
//                     <div className="inline-flex items-center bg-blue-100 text-blue-800 px-3 py-1.5 md:px-4 md:py-2 rounded-full mb-4 md:mb-6">
//                         <Sparkles className="mr-1.5 md:mr-2 text-blue-600" size={16} />
//                         <span className="text-xs md:text-sm font-medium">Revolutionizing Digital Advertising</span>
//                     </div>
//                     <h1 className="text-3xl md:text-5xl font-extrabold text-blue-950 mb-4 md:mb-6 leading-tight tracking-tight px-2">
//                         Forging Powerful Connections
//                         <br className="hidden md:block" />
//                         <span className="text-blue-600 block md:inline"> Through Intelligent Advertising</span>
//                     </h1>
//                     <p className="text-lg md:text-xl text-gray-600 mb-6 md:mb-10 max-w-2xl mx-auto px-2">
//                         Seamlessly bridge advertisers and publishers with our cutting-edge platform that transforms digital advertising into meaningful connections.
//                     </p>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
//                     <div className="bg-white rounded-xl md:rounded-2xl shadow-xl md:shadow-2xl border border-gray-100">
//                         <div className="p-4 md:p-8">
//                             <div className="mb-4 md:mb-6 flex items-center">
//                                 <div className="bg-red-100 text-[#FF4500] p-2 md:p-3 rounded-lg md:rounded-xl mr-3 md:mr-4">
//                                     <Target size={24} strokeWidth={2} className="md:w-8 md:h-8" />
//                                 </div>
//                                 <h2 className="text-2xl md:text-3xl font-bold  text-blue-950">Yepper Ads</h2>
//                             </div>
//                             <AdSide />
//                         </div>
//                     </div>

//                     <div className="bg-white rounded-xl md:rounded-2xl shadow-xl md:shadow-2xl border border-gray-100">
//                         <div className="p-4 md:p-8">
//                             <div className="mb-4 md:mb-6 flex items-center">
//                                 <div className="bg-red-100 text-[#FF4500] p-2 md:p-3 rounded-lg md:rounded-xl mr-3 md:mr-4">
//                                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="md:w-8 md:h-8">
//                                         <circle cx="12" cy="12" r="10"></circle>
//                                         <line x1="2" x2="22" y1="12" y2="12"></line>
//                                         <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
//                                     </svg>
//                                 </div>
//                                 <h2 className="text-2xl md:text-3xl font-bold  text-blue-950">Yepper Spaces</h2>
//                             </div>
//                             <SpaceSide />

//                         </div>
//                     </div>
//                 </div>

//                 <div className="text-center mt-8 md:mt-16">
//                     <div className="inline-flex items-center bg-orange-100 text-orange-800 px-4 py-2 md:px-6 md:py-3 rounded-full">
//                         <span className="text-sm md:text-base font-semibold">
//                             Connecting Advertisers and Publishers Intelligently
//                         </span>
//                     </div>
//                 </div>
//             </main>
//         </div>
//     );
// }

// export default Home;