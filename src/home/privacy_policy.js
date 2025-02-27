import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Shield, Lock, Eye, CheckCircle } from 'lucide-react';

function Privacy() {
  const navigate = useNavigate();
  const [hoverDataSection, setHoverDataSection] = useState(false);
  const [hoverConsentSection, setHoverConsentSection] = useState(false);

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
          <div className="bg-white/10 px-4 py-1 rounded-full text-xs font-medium tracking-widest">PRIVACY</div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-6 py-20">
        <div className="mb-24">
          <div className="flex items-center justify-center mb-6">
            <div className="h-px w-12 bg-purple-500 mr-6"></div>
            <span className="text-purple-400 text-sm font-medium uppercase tracking-widest">Privacy Center</span>
            <div className="h-px w-12 bg-purple-500 ml-6"></div>
          </div>
          
          <h1 className="text-center text-6xl font-bold mb-6 tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-600">
              Your Data, Your Control
            </span>
          </h1>
          
          <p className="text-center text-white/70 max-w-2xl mx-auto text-lg mb-6">
            We believe in full transparency and giving you complete control over your personal information.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Data Protection Card */}
          <div 
            className="group relative backdrop-blur-md bg-gradient-to-b from-purple-900/30 to-purple-900/10 rounded-3xl overflow-hidden border border-white/10 transition-all duration-500"
            style={{
              boxShadow: hoverDataSection ? '0 0 40px rgba(147, 51, 234, 0.3)' : '0 0 0 rgba(0, 0, 0, 0)'
            }}
            onMouseEnter={() => setHoverDataSection(true)}
            onMouseLeave={() => setHoverDataSection(false)}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
            
            <div className="p-10 relative z-10">
              <div className="flex items-center mb-8">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-purple-500 blur-md opacity-40"></div>
                  <div className="relative p-3 rounded-full bg-gradient-to-r from-purple-600 to-purple-400">
                    <Shield className="text-white" size={24} />
                  </div>
                </div>
                <div className="ml-4">
                  <div className="uppercase text-xs font-semibold text-purple-400 tracking-widest mb-1">Protected</div>
                  <h2 className="text-3xl font-bold">Data Protection</h2>
                </div>
              </div>
              
              <p className="text-white/70 mb-8">
                Your data is secured with industry-leading encryption and protected by robust security protocols.
              </p>
              
              <div className="space-y-4 mb-12">
                <div className="flex items-center text-white/80">
                  <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center mr-3">
                    <Lock size={14} className="text-purple-400" />
                  </div>
                  <span>End-to-end encryption</span>
                </div>
                <div className="flex items-center text-white/80">
                  <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center mr-3">
                    <Lock size={14} className="text-purple-400" />
                  </div>
                  <span>Regular security audits</span>
                </div>
                <div className="flex items-center text-white/80">
                  <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center mr-3">
                    <Lock size={14} className="text-purple-400" />
                  </div>
                  <span>GDPR & CCPA compliant</span>
                </div>
              </div>
              
              <button
                onClick={() => navigate('/security-details')}
                className="w-full group relative h-16 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium overflow-hidden transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10 flex items-center justify-center">
                  <Shield size={16} className="mr-2" />
                  <span className="uppercase tracking-wider">Security Details</span>
                </span>
              </button>
            </div>
          </div>

          {/* Privacy Controls Card */}
          <div 
            className="group relative backdrop-blur-md bg-gradient-to-b from-blue-900/30 to-blue-900/10 rounded-3xl overflow-hidden border border-white/10 transition-all duration-500"
            style={{
              boxShadow: hoverConsentSection ? '0 0 40px rgba(59, 130, 246, 0.3)' : '0 0 0 rgba(0, 0, 0, 0)'
            }}
            onMouseEnter={() => setHoverConsentSection(true)}
            onMouseLeave={() => setHoverConsentSection(false)}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-cyan-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
            
            <div className="p-10 relative z-10">
              <div className="flex items-center mb-8">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-blue-500 blur-md opacity-40"></div>
                  <div className="relative p-3 rounded-full bg-gradient-to-r from-blue-600 to-blue-400">
                    <Eye className="text-white" size={24} />
                  </div>
                </div>
                <div className="ml-4">
                  <div className="uppercase text-xs font-semibold text-blue-400 tracking-widest mb-1">Customizable</div>
                  <h2 className="text-3xl font-bold">Privacy Controls</h2>
                </div>
              </div>
              
              <p className="text-white/70 mb-8">
                Manage your consent preferences and control exactly how your information is used across our platform.
              </p>
              
              <div className="space-y-4 mb-12">
                <div className="flex items-center text-white/80">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center mr-3">
                    <CheckCircle size={14} className="text-blue-400" />
                  </div>
                  <span>Cookie preferences</span>
                </div>
                <div className="flex items-center text-white/80">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center mr-3">
                    <CheckCircle size={14} className="text-blue-400" />
                  </div>
                  <span>Data retention settings</span>
                </div>
                <div className="flex items-center text-white/80">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center mr-3">
                    <CheckCircle size={14} className="text-blue-400" />
                  </div>
                  <span>Marketing preferences</span>
                </div>
              </div>
              
              <button
                onClick={() => navigate('/consent-manager')}
                className="w-full group relative h-16 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-medium overflow-hidden transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10 flex items-center justify-center">
                  <Eye size={16} className="mr-2" />
                  <span className="uppercase tracking-wider">Manage Consent</span>
                </span>
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-16 flex justify-center">
          <div className="rounded-full px-6 py-3 bg-white/5 backdrop-blur-md flex items-center space-x-2">
            <span className="text-white/60 text-sm">Have questions?</span>
            <button className="text-purple-400 text-sm font-medium hover:text-purple-300 transition-colors">Contact our privacy team</button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Privacy;




















// import React from 'react';
// import Header from '../components/TermsPrivacyHeader';

// const Privacy = () => {
//   return (
//     <div className="ad-waitlist min-h-screen bg-gradient-to-br from-white to-green-50">
//       <Header />
//       <div className="w-full max-w-4xl mx-auto mt-12 sm:mt-20 p-4 sm:p-6 md:p-8">
//         <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-blue-950 mb-4">Privacy Policy</h1>
        
//         <div className="space-y-4">
//           <section className="bg-white border border-gray-200 rounded-lg p-3 sm:p-5">
//             <h2 className="text-lg sm:text-xl text-blue-950 font-bold mb-3">1. Information We Collect</h2>
//             <ul className="space-y-3">
//               <li className="flex flex-col sm:flex-row sm:items-center bg-white border border-gray-200 text-gray-600 rounded-lg p-3">
//                 <span className="text-blue-950 font-bold mb-1 sm:mb-0 sm:pr-5">From Web Owners</span>
//                 <span>Website details, pricing, space availability, and API integration data.</span>
//               </li>
//               <li className="flex flex-col sm:flex-row sm:items-center bg-white border border-gray-200 text-gray-600 rounded-lg p-3">
//                 <span className="text-blue-950 font-bold mb-1 sm:mb-0 sm:pr-5">From Advertisers</span>
//                 <span>Ad content, business information, payment details, and selected advertising preferences.</span>
//               </li>
//               <li className="flex flex-col sm:flex-row sm:items-center bg-white border border-gray-200 text-gray-600 rounded-lg p-3">
//                 <span className="text-blue-950 font-bold mb-1 sm:mb-0 sm:pr-5">Automatically</span>
//                 <span>Device information, IP address, and browsing behavior when accessing Yepper.</span>
//               </li>
//             </ul>
//           </section>

//           <section className="bg-white border border-gray-200 rounded-lg p-3 sm:p-5">
//             <h2 className="text-lg sm:text-xl text-blue-950 font-bold mb-3">2. How We Use Your Information</h2>
//             <ul className="space-y-3">
//               <li className="bg-white border border-gray-200 text-gray-600 rounded-lg p-3">
//                 To facilitate and manage the advertising process.
//               </li>
//               <li className="bg-white border border-gray-200 text-gray-600 rounded-lg p-3">
//                 To generate and maintain scripts for API integration.
//               </li>
//             </ul>
//           </section>

//           <section className="bg-white border border-gray-200 rounded-lg p-3 sm:p-5">
//             <h2 className="text-lg sm:text-xl text-blue-950 font-bold mb-3">3. Sharing of Information</h2>
//             <ul className="space-y-3">
//               <li className="flex flex-col sm:flex-row bg-white border border-gray-200 text-gray-600 rounded-lg p-3">
//                 <span className="text-blue-950 font-bold mb-1 sm:mb-0 sm:pr-5">With Web Owners</span>
//                 <span>Advertisers’ business details and ad content for review and approval.</span>
//               </li>
//               <li className="flex flex-col sm:flex-row bg-white border border-gray-200 text-gray-600 rounded-lg p-3">
//                 <span className="text-blue-950 font-bold mb-1 sm:mb-0 sm:pr-5">With Advertisers</span>
//                 <span>Approved Web Owner’s website details and space availability.</span>
//               </li>
//               <li className="flex flex-col sm:flex-row bg-white border border-gray-200 text-gray-600 rounded-lg p-3">
//                 <span className="text-blue-950 font-bold mb-1 sm:mb-0 sm:pr-5">With Third Parties</span>
//                 <span>Payment processors and service providers aiding in the platform’s operation.</span>
//               </li>
//             </ul>
//           </section>

//           <section className="bg-white border border-gray-200 rounded-lg p-3 sm:p-5">
//             <h2 className="text-lg sm:text-xl text-blue-950 font-bold mb-3">4. Data Security</h2>
//             <ul className="space-y-3">
//               <li className="bg-white border border-gray-200 text-gray-600 rounded-lg p-3">
//                 Yepper uses industry-standard encryption and security measures to protect your data.
//               </li>
//               <li className="bg-white border border-gray-200 text-gray-600 rounded-lg p-3">
//                 Users are responsible for maintaining the confidentiality of their account credentials.
//               </li>
//             </ul>
//           </section>

//           <section className="bg-white border border-gray-200 rounded-lg p-3 sm:p-5">
//             <h2 className="text-lg sm:text-xl text-blue-950 font-bold mb-3">5. User Rights</h2>
//             <ul className="space-y-3">
//               <li className="flex flex-col sm:flex-row sm:items-center bg-white border border-gray-200 text-gray-600 rounded-lg p-3">
//                 <span className="text-blue-950 font-bold mb-1 sm:mb-0 sm:pr-5">Access</span>
//                 <span>Request access to your personal data.</span>
//               </li>
//               <li className="flex flex-col sm:flex-row sm:items-center bg-white border border-gray-200 text-gray-600 rounded-lg p-3">
//                 <span className="text-blue-950 font-bold mb-1 sm:mb-0 sm:pr-5">Correction</span>
//                 <span>Update or correct your data.</span>
//               </li>
//               <li className="flex flex-col sm:flex-row sm:items-center bg-white border border-gray-200 text-gray-600 rounded-lg p-3">
//                 <span className="text-blue-950 font-bold mb-1 sm:mb-0 sm:pr-5">Deletion</span>
//                 <span>Request deletion of your account and data.</span>
//               </li>
//             </ul>
//           </section>

//           <section className="bg-white border border-gray-200 rounded-lg p-3 sm:p-5">
//             <h2 className="text-lg sm:text-xl text-blue-950 font-bold mb-3">6. Third-Party Links</h2>
//             <ul className="space-y-3">
//               <li className="bg-white border border-gray-200 text-gray-600 rounded-lg p-3">
//                 Our platform may contain links to external websites. Yepper is not responsible for the privacy practices or content of these external sites.
//               </li>
//             </ul>
//           </section>

//           <section className="bg-white border border-gray-200 rounded-lg p-3 sm:p-5">
//             <h2 className="text-lg sm:text-xl text-blue-950 font-bold mb-3">7. Changes to Privacy Policy</h2>
//             <ul className="space-y-3">
//               <li className="bg-white border border-gray-200 text-gray-600 rounded-lg p-3">
//               Yepper reserves the right to update this Privacy Policy as needed to reflect changes in our practices or for legal reasons. Users will be notified of significant changes through email or platform notifications.
//               </li>
//             </ul>
//           </section>

//           <section className="bg-white border border-gray-200 rounded-lg p-3 sm:p-5">
//             <h2 className="text-lg sm:text-xl text-blue-950 font-bold mb-3">8. Contact Informatio</h2>
//             <ul className="space-y-3">
//               <li className="bg-white border border-gray-200 text-gray-600 rounded-lg p-3">
//                 For inquiries regarding this Privacy Policy, please contact us at
//               </li>
//               <a href="mailto:olympusexperts@gmail.com" className="text-blue-600 font-bold hover:underline block p-3">
//                 olympusexperts@gmail.com
//               </a>
//             </ul>
//           </section>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Privacy;