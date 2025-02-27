// import React, { useState } from 'react';
// import { Link, useNavigate } from "react-router-dom";
// import { PlusCircle, Globe, FileText, ArrowLeft, Sparkles, Star } from 'lucide-react';

// function Request() {
//   const navigate = useNavigate();
//   const [hoverWeb, setHoverWeb] = useState(false);
//   const [hoverAd, setHoverAd] = useState(false);

//   return (
//     <div className="h-screen flex flex-col bg-black text-white overflow-hidden">
//       {/* Compact header */}
//       <header className="backdrop-blur-xl bg-black/20 border-b border-white/10 py-3">
//         <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
//           <button 
//             onClick={() => navigate(-1)} 
//             className="flex items-center text-white/70 hover:text-white transition-colors"
//           >
//             <ArrowLeft size={16} className="mr-1" />
//             <span className="font-medium tracking-wide text-sm">BACK</span>
//           </button>
//           <div className="bg-white/10 px-3 py-1 rounded-full text-xs font-medium tracking-widest">STEP 1 OF 3</div>
//         </div>
//       </header>
      
//       <main className="flex-1 flex flex-col max-w-7xl mx-auto px-6 py-4">
//         {/* Compact title area */}
//         <div className="mb-6">
//           <h1 className="text-4xl font-bold tracking-tight text-center">
//             <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
//               Choose Your Campaign
//             </span>
//           </h1>
//           <p className="text-center text-white/70 text-sm mt-2">
//             Select your preferred format to get started
//           </p>
//         </div>
        
//         {/* Cards in one row, no scroll needed */}
//         <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
//           {/* Website Integration Card */}
//           <div 
//             className="group relative backdrop-blur-md bg-gradient-to-b from-blue-900/30 to-blue-900/10 rounded-2xl overflow-hidden border border-white/10 transition-all duration-500 flex flex-col"
//             style={{
//               boxShadow: hoverWeb ? '0 0 40px rgba(59, 130, 246, 0.3)' : '0 0 0 rgba(0, 0, 0, 0)'
//             }}
//             onMouseEnter={() => setHoverWeb(true)}
//             onMouseLeave={() => setHoverWeb(false)}
//           >
//             <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
            
//             <div className="p-6 relative z-10 flex-1 flex flex-col">
//               <div className="flex items-center mb-4">
//                 <div className="relative">
//                   <div className="absolute inset-0 rounded-full bg-blue-500 blur-md opacity-40"></div>
//                   <div className="relative p-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-400">
//                     <Globe className="text-white" size={20} />
//                   </div>
//                 </div>
//                 <div className="ml-3">
//                   <div className="uppercase text-xs font-semibold text-blue-400 tracking-widest">Premium</div>
//                   <h2 className="text-xl font-bold">Website Integration</h2>
//                 </div>
//               </div>
              
//               <p className="text-white/70 text-sm mb-4">
//                 Connect your website to our platform for enhanced visibility and analytics.
//               </p>
              
//               <div className="space-y-2 text-sm mb-auto">
//                 <div className="flex items-center text-white/80">
//                   <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center mr-2">
//                     <Sparkles size={10} className="text-blue-400" />
//                   </div>
//                   <span>Real-time analytics dashboard</span>
//                 </div>
//                 <div className="flex items-center text-white/80">
//                   <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center mr-2">
//                     <Sparkles size={10} className="text-blue-400" />
//                   </div>
//                   <span>Automatic content synchronization</span>
//                 </div>
//               </div>
              
//               <button
//                 onClick={() => navigate('/create-website')}
//                 className="w-full group relative h-12 mt-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium overflow-hidden transition-all duration-300"
//               >
//                 <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                 <span className="relative z-10 flex items-center justify-center">
//                   <PlusCircle size={14} className="mr-2" />
//                   <span className="uppercase tracking-wider text-sm">Connect Website</span>
//                 </span>
//               </button>
//             </div>
//           </div>

//           {/* Custom Advertisement Card */}
//           <div 
//             className="group relative backdrop-blur-md bg-gradient-to-b from-orange-900/30 to-orange-900/10 rounded-2xl overflow-hidden border border-white/10 transition-all duration-500 flex flex-col"
//             style={{
//               boxShadow: hoverAd ? '0 0 40px rgba(249, 115, 22, 0.3)' : '0 0 0 rgba(0, 0, 0, 0)'
//             }}
//             onMouseEnter={() => setHoverAd(true)}
//             onMouseLeave={() => setHoverAd(false)}
//           >
//             <div className="absolute inset-0 bg-gradient-to-r from-orange-600/10 to-rose-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
            
//             <div className="p-6 relative z-10 flex-1 flex flex-col">
//               <div className="flex items-center mb-4">
//                 <div className="relative">
//                   <div className="absolute inset-0 rounded-full bg-orange-500 blur-md opacity-40"></div>
//                   <div className="relative p-2 rounded-full bg-gradient-to-r from-orange-600 to-orange-400">
//                     <FileText className="text-white" size={20} />
//                   </div>
//                 </div>
//                 <div className="ml-3">
//                   <div className="uppercase text-xs font-semibold text-orange-400 tracking-widest">Featured</div>
//                   <h2 className="text-xl font-bold">Custom Advertisement</h2>
//                 </div>
//               </div>
              
//               <p className="text-white/70 text-sm mb-4">
//                 Create captivating ads that showcase your products and connect with your audience.
//               </p>
              
//               <div className="space-y-2 text-sm mb-auto">
//                 <div className="flex items-center text-white/80">
//                   <div className="w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center mr-2">
//                     <Star size={10} className="text-orange-400" />
//                   </div>
//                   <span>AI-powered creative generation</span>
//                 </div>
//                 <div className="flex items-center text-white/80">
//                   <div className="w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center mr-2">
//                     <Star size={10} className="text-orange-400" />
//                   </div>
//                   <span>Cross-platform optimization</span>
//                 </div>
//               </div>
              
//               <button
//                 onClick={() => navigate('/select')}
//                 className="w-full group relative h-12 mt-4 rounded-xl bg-gradient-to-r from-orange-600 to-rose-600 text-white font-medium overflow-hidden transition-all duration-300"
//               >
//                 <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-rose-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                 <span className="relative z-10 flex items-center justify-center">
//                   <PlusCircle size={14} className="mr-2" />
//                   <span className="uppercase tracking-wider text-sm">Create Ad</span>
//                 </span>
//               </button>
//             </div>
//           </div>
//         </div>
        
//         {/* Compact help section */}
//         <div className="mt-4 mb-4 flex justify-center">
//           <button className="text-blue-400 text-xs font-medium hover:text-blue-300 transition-colors">
//             Need help? Get a personalized recommendation
//           </button>
//         </div>
//       </main>
//     </div>
//   );
// }

// export default Request;















import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { PlusCircle, Globe, FileText, ArrowLeft, Sparkles, Star } from 'lucide-react';

function Request() {
  const navigate = useNavigate();
  const [hoverWeb, setHoverWeb] = useState(false);
  const [hoverAd, setHoverAd] = useState(false);

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
          <div className="bg-white/10 px-4 py-1 rounded-full text-xs font-medium tracking-widest">CREATE</div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-6 py-20">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Website Integration Card */}
          <div 
            className="group relative backdrop-blur-md bg-gradient-to-b from-blue-900/30 to-blue-900/10 rounded-3xl overflow-hidden border border-white/10 transition-all duration-500"
            style={{
              boxShadow: hoverWeb ? '0 0 40px rgba(59, 130, 246, 0.3)' : '0 0 0 rgba(0, 0, 0, 0)'
            }}
            onMouseEnter={() => setHoverWeb(true)}
            onMouseLeave={() => setHoverWeb(false)}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
            
            <div className="p-10 relative z-10">
              <div className="flex items-center mb-8">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-blue-500 blur-md opacity-40"></div>
                  <div className="relative p-3 rounded-full bg-gradient-to-r from-blue-600 to-blue-400">
                    <Globe className="text-white" size={24} />
                  </div>
                </div>
                <div className="ml-4">
                  <div className="uppercase text-xs font-semibold text-blue-400 tracking-widest mb-1">Premium</div>
                  <h2 className="text-3xl font-bold">Website Integration</h2>
                </div>
              </div>
              
              <p className="text-white/70 mb-8">
                Connect your digital ecosystem with our platform. Enhance user experience while maintaining your brand identity.
              </p>
              
              <div className="space-y-4 mb-12">
                <div className="flex items-center text-white/80">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center mr-3">
                    <Sparkles size={14} className="text-blue-400" />
                  </div>
                  <span>Real-time analytics dashboard</span>
                </div>
                <div className="flex items-center text-white/80">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center mr-3">
                    <Sparkles size={14} className="text-blue-400" />
                  </div>
                  <span>Automatic content synchronization</span>
                </div>
                <div className="flex items-center text-white/80">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center mr-3">
                    <Sparkles size={14} className="text-blue-400" />
                  </div>
                  <span>Advanced audience targeting</span>
                </div>
              </div>
              
              <button
                onClick={() => navigate('/create-website')}
                className="w-full group relative h-16 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium overflow-hidden transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10 flex items-center justify-center">
                  <PlusCircle size={16} className="mr-2" />
                  <span className="uppercase tracking-wider">Connect Website</span>
                </span>
              </button>
            </div>
          </div>

          {/* Custom Advertisement Card */}
          <div 
            className="group relative backdrop-blur-md bg-gradient-to-b from-orange-900/30 to-orange-900/10 rounded-3xl overflow-hidden border border-white/10 transition-all duration-500"
            style={{
              boxShadow: hoverAd ? '0 0 40px rgba(249, 115, 22, 0.3)' : '0 0 0 rgba(0, 0, 0, 0)'
            }}
            onMouseEnter={() => setHoverAd(true)}
            onMouseLeave={() => setHoverAd(false)}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600/10 to-rose-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
            
            <div className="p-10 relative z-10">
              <div className="flex items-center mb-8">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-orange-500 blur-md opacity-40"></div>
                  <div className="relative p-3 rounded-full bg-gradient-to-r from-orange-600 to-orange-400">
                    <FileText className="text-white" size={24} />
                  </div>
                </div>
                <div className="ml-4">
                  <div className="uppercase text-xs font-semibold text-orange-400 tracking-widest mb-1">Featured</div>
                  <h2 className="text-3xl font-bold">Custom Advertisement</h2>
                </div>
              </div>
              
              <p className="text-white/70 mb-8">
                Create immersive ad experiences that captivate your audience and drive meaningful engagement with your brand.
              </p>
              
              <div className="space-y-4 mb-12">
                <div className="flex items-center text-white/80">
                  <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center mr-3">
                    <Star size={14} className="text-orange-400" />
                  </div>
                  <span>AI-powered creative generation</span>
                </div>
                <div className="flex items-center text-white/80">
                  <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center mr-3">
                    <Star size={14} className="text-orange-400" />
                  </div>
                  <span>Cross-platform optimization</span>
                </div>
                <div className="flex items-center text-white/80">
                  <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center mr-3">
                    <Star size={14} className="text-orange-400" />
                  </div>
                  <span>Conversion-focused templates</span>
                </div>
              </div>
              
              <button
                onClick={() => navigate('/select')}
                className="w-full group relative h-16 rounded-xl bg-gradient-to-r from-orange-600 to-rose-600 text-white font-medium overflow-hidden transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-rose-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10 flex items-center justify-center">
                  <PlusCircle size={16} className="mr-2" />
                  <span className="uppercase tracking-wider">Create Ad</span>
                </span>
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-16 flex justify-center">
          <div className="rounded-full px-6 py-3 bg-white/5 backdrop-blur-md flex items-center space-x-2">
            <span className="text-white/60 text-sm">Need guidance?</span>
            <button className="text-blue-400 text-sm font-medium hover:text-blue-300 transition-colors">Request a consultation</button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Request;