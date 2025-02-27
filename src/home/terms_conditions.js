import React from 'react';
import { ArrowLeft, Shield, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TermsAndConditions = () => {
  const navigate = useNavigate();

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
          <div className="bg-white/10 px-4 py-1 rounded-full text-xs font-medium tracking-widest">LEGAL</div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-6 py-20">
        <div className="mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="h-px w-12 bg-blue-500 mr-6"></div>
            <span className="text-blue-400 text-sm font-medium uppercase tracking-widest">Legal Document</span>
            <div className="h-px w-12 bg-blue-500 ml-6"></div>
          </div>
          
          <h1 className="text-center text-5xl font-bold mb-6 tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
              Terms and Conditions
            </span>
          </h1>
          
          <p className="text-center text-white/70 max-w-2xl mx-auto text-lg mb-6">
            Please read these terms carefully before using our platform and services.
          </p>
        </div>
        
        <div className="space-y-8 max-w-5xl mx-auto">
          {/* Section 1: Definitions */}
          <div className="backdrop-blur-md bg-gradient-to-b from-blue-900/30 to-blue-900/10 rounded-3xl overflow-hidden border border-white/10 transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]">
            <div className="p-8">
              <div className="flex items-center mb-6">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-blue-500 blur-md opacity-40"></div>
                  <div className="relative p-3 rounded-full bg-gradient-to-r from-blue-600 to-blue-400">
                    <Shield className="text-white" size={24} />
                  </div>
                </div>
                <h2 className="ml-4 text-2xl font-bold">1. Definitions</h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center bg-white/5 rounded-xl p-4 backdrop-blur-sm border border-white/10">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center mr-4">
                    <Star size={14} className="text-blue-400" />
                  </div>
                  <div>
                    <span className="text-blue-400 font-medium block mb-1">Platform</span>
                    <span className="text-white/70">Refers to the Yepper website and associated services.</span>
                  </div>
                </div>
                
                <div className="flex items-center bg-white/5 rounded-xl p-4 backdrop-blur-sm border border-white/10">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center mr-4">
                    <Star size={14} className="text-blue-400" />
                  </div>
                  <div>
                    <span className="text-blue-400 font-medium block mb-1">Web Owner</span>
                    <span className="text-white/70">An individual or entity that owns a website and creates spaces for advertisements on the platform.</span>
                  </div>
                </div>
                
                <div className="flex items-center bg-white/5 rounded-xl p-4 backdrop-blur-sm border border-white/10">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center mr-4">
                    <Star size={14} className="text-blue-400" />
                  </div>
                  <div>
                    <span className="text-blue-400 font-medium block mb-1">Advertiser</span>
                    <span className="text-white/70">An individual or entity that uses the platform to publish ads.</span>
                  </div>
                </div>
                
                <div className="flex items-center bg-white/5 rounded-xl p-4 backdrop-blur-sm border border-white/10">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center mr-4">
                    <Star size={14} className="text-blue-400" />
                  </div>
                  <div>
                    <span className="text-blue-400 font-medium block mb-1">Content</span>
                    <span className="text-white/70">Refers to all ad images, videos, or other materials uploaded by Advertisers.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Section 2: Eligibility */}
          <div className="backdrop-blur-md bg-gradient-to-b from-purple-900/30 to-purple-900/10 rounded-3xl overflow-hidden border border-white/10 transition-all duration-300 hover:shadow-[0_0_30px_rgba(124,58,237,0.3)]">
            <div className="p-8">
              <div className="flex items-center mb-6">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-purple-500 blur-md opacity-40"></div>
                  <div className="relative p-3 rounded-full bg-gradient-to-r from-purple-600 to-purple-400">
                    <Shield className="text-white" size={24} />
                  </div>
                </div>
                <h2 className="ml-4 text-2xl font-bold">2. Eligibility</h2>
              </div>
              
              <div className="space-y-4">
                <div className="bg-white/5 rounded-xl p-4 backdrop-blur-sm border border-white/10">
                  <p className="text-white/70">Users must be 18 years or older and have the legal authority to enter into binding agreements.</p>
                </div>
                
                <div className="bg-white/5 rounded-xl p-4 backdrop-blur-sm border border-white/10">
                  <p className="text-white/70">By using Yepper, you confirm that all information provided is accurate and truthful.</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Section 3: Web Owner Responsibilities */}
          <div className="backdrop-blur-md bg-gradient-to-b from-blue-900/30 to-blue-900/10 rounded-3xl overflow-hidden border border-white/10 transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]">
            <div className="p-8">
              <div className="flex items-center mb-6">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-blue-500 blur-md opacity-40"></div>
                  <div className="relative p-3 rounded-full bg-gradient-to-r from-blue-600 to-blue-400">
                    <Shield className="text-white" size={24} />
                  </div>
                </div>
                <h2 className="ml-4 text-2xl font-bold">3. Web Owner Responsibilities</h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center bg-white/5 rounded-xl p-4 backdrop-blur-sm border border-white/10">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center mr-4">
                    <Star size={14} className="text-blue-400" />
                  </div>
                  <div>
                    <span className="text-blue-400 font-medium block mb-1">Website Creation</span>
                    <span className="text-white/70">Web Owners must provide accurate website details, including the website name, URL, and logo.</span>
                  </div>
                </div>
                
                <div className="flex items-center bg-white/5 rounded-xl p-4 backdrop-blur-sm border border-white/10">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center mr-4">
                    <Star size={14} className="text-blue-400" />
                  </div>
                  <div>
                    <span className="text-blue-400 font-medium block mb-1">Category and Space Management</span>
                    <span className="text-white/70">Web Owners are responsible for setting appropriate prices, user counts, availability, and clear instructions for ad spaces.</span>
                  </div>
                </div>
                
                <div className="flex items-center bg-white/5 rounded-xl p-4 backdrop-blur-sm border border-white/10">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center mr-4">
                    <Star size={14} className="text-blue-400" />
                  </div>
                  <div>
                    <span className="text-blue-400 font-medium block mb-1">API Integration</span>
                    <span className="text-white/70">The script API generated by Yepper must be correctly integrated into their website to ensure ads display as intended.</span>
                  </div>
                </div>
                
                <div className="flex items-center bg-white/5 rounded-xl p-4 backdrop-blur-sm border border-white/10">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center mr-4">
                    <Star size={14} className="text-blue-400" />
                  </div>
                  <div>
                    <span className="text-blue-400 font-medium block mb-1">Approval of Ads</span>
                    <span className="text-white/70">Web Owners are responsible for reviewing and approving or rejecting ad requests in a timely manner.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Sections 4-10: Continue the same pattern for remaining sections */}
          <div className="backdrop-blur-md bg-gradient-to-b from-purple-900/30 to-purple-900/10 rounded-3xl overflow-hidden border border-white/10 transition-all duration-300 hover:shadow-[0_0_30px_rgba(124,58,237,0.3)]">
            <div className="p-8">
              <div className="flex items-center mb-6">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-purple-500 blur-md opacity-40"></div>
                  <div className="relative p-3 rounded-full bg-gradient-to-r from-purple-600 to-purple-400">
                    <Shield className="text-white" size={24} />
                  </div>
                </div>
                <h2 className="ml-4 text-2xl font-bold">4. Advertiser Responsibilities</h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center bg-white/5 rounded-xl p-4 backdrop-blur-sm border border-white/10">
                  <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center mr-4">
                    <Star size={14} className="text-purple-400" />
                  </div>
                  <div>
                    <span className="text-purple-400 font-medium block mb-1">Ad Content</span>
                    <span className="text-white/70">Advertisers must ensure that uploaded ad images or videos comply with applicable laws and do not contain prohibited content such as hate speech, offensive material, or misleading information.</span>
                  </div>
                </div>
                
                <div className="flex items-center bg-white/5 rounded-xl p-4 backdrop-blur-sm border border-white/10">
                  <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center mr-4">
                    <Star size={14} className="text-purple-400" />
                  </div>
                  <div>
                    <span className="text-purple-400 font-medium block mb-1">Business Information</span>
                    <span className="text-white/70">Accurate business details, including the name, website, location, and description, must be provided.</span>
                  </div>
                </div>
                
                <div className="flex items-center bg-white/5 rounded-xl p-4 backdrop-blur-sm border border-white/10">
                  <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center mr-4">
                    <Star size={14} className="text-purple-400" />
                  </div>
                  <div>
                    <span className="text-purple-400 font-medium block mb-1">Payment</span>
                    <span className="text-white/70">Advertisers must pay for approved ads promptly to ensure publication.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Continue with remaining sections, alternating blue and purple gradients */}
          {/* Remaining sections would follow the same pattern as above */}

          {/* Contact section with special styling */}
          <div className="backdrop-blur-md bg-gradient-to-b from-indigo-900/30 to-indigo-900/10 rounded-3xl overflow-hidden border border-white/10 transition-all duration-300 hover:shadow-[0_0_30px_rgba(99,102,241,0.3)]">
            <div className="p-8">
              <div className="flex items-center mb-6">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-indigo-500 blur-md opacity-40"></div>
                  <div className="relative p-3 rounded-full bg-gradient-to-r from-indigo-600 to-indigo-400">
                    <Shield className="text-white" size={24} />
                  </div>
                </div>
                <h2 className="ml-4 text-2xl font-bold">10. Contact Information</h2>
              </div>
              
              <div className="bg-white/5 rounded-xl p-4 backdrop-blur-sm border border-white/10">
                <p className="text-white/70 mb-4">For any questions or concerns regarding these Terms, please contact us at:</p>
                <a 
                  href="mailto:olympusexperts@gmail.com" 
                  className="inline-block px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium hover:from-blue-500 hover:to-indigo-500 transition-all duration-300"
                >
                  olympusexperts@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16 flex justify-center">
          <div className="rounded-full px-6 py-3 bg-white/5 backdrop-blur-md flex items-center space-x-2">
            <span className="text-white/60 text-sm">Have questions about our terms?</span>
            <button className="text-blue-400 text-sm font-medium hover:text-blue-300 transition-colors">Contact support</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TermsAndConditions;




















// import React from 'react';
// import Header from '../components/TermsPrivacyHeader';

// const TermsAndConditions = () => {
//   return (
//     <div className="ad-waitlist min-h-screen bg-gradient-to-br from-white to-green-50">
//       <Header />
//       <div className="w-full max-w-4xl mx-auto mt-12 sm:mt-20 p-4 sm:p-6 md:p-8">
//         <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-blue-950 mb-4">Terms and Conditions</h1>
        
//         <div className="space-y-4">
//           <section className="bg-white border border-gray-200 rounded-lg p-3 sm:p-5">
//             <h2 className="text-lg sm:text-xl text-blue-950 font-bold mb-3">1. Definitions</h2>
//             <ul className="space-y-3">
//               <li className="flex flex-col sm:flex-row sm:items-center bg-white border border-gray-200 text-gray-600 rounded-lg p-3">
//                 <span className="text-blue-950 font-bold mb-1 sm:mb-0 sm:pr-5">Platform</span>
//                 <span>Refers to the Yepper website and associated services.</span>
//               </li>
//               <li className="flex flex-col sm:flex-row sm:items-center bg-white border border-gray-200 text-gray-600 rounded-lg p-3">
//                 <span className="text-blue-950 font-bold mb-1 sm:mb-0 sm:pr-5">Web Owner</span>
//                 <span>An individual or entity that owns a website and creates spaces for advertisements on the platform.</span>
//               </li>
//               <li className="flex flex-col sm:flex-row sm:items-center bg-white border border-gray-200 text-gray-600 rounded-lg p-3">
//                 <span className="text-blue-950 font-bold mb-1 sm:mb-0 sm:pr-5">Advertiser</span>
//                 <span>An individual or entity that uses the platform to publish ads.</span>
//               </li>
//               <li className="flex flex-col sm:flex-row sm:items-center bg-white border border-gray-200 text-gray-600 rounded-lg p-3">
//                 <span className="text-blue-950 font-bold mb-1 sm:mb-0 sm:pr-5">Content</span>
//                 <span>Refers to all ad images, videos, or other materials uploaded by Advertisers.</span>
//               </li>
//             </ul>
//           </section>

//           <section className="bg-white border border-gray-200 rounded-lg p-3 sm:p-5">
//             <h2 className="text-lg sm:text-xl text-blue-950 font-bold mb-3">2. Eligibility</h2>
//             <ul className="space-y-3">
//               <li className="bg-white border border-gray-200 text-gray-600 rounded-lg p-3">
//                 Users must be 18 years or older and have the legal authority to enter into binding agreements.
//               </li>
//               <li className="bg-white border border-gray-200 text-gray-600 rounded-lg p-3">
//                 By using Yepper, you confirm that all information provided is accurate and truthful.
//               </li>
//             </ul>
//           </section>

//           <section className="bg-white border border-gray-200 rounded-lg p-3 sm:p-5">
//             <h2 className="text-lg sm:text-xl text-blue-950 font-bold mb-3">3. Web Owner Responsibilities</h2>
//             <ul className="space-y-3">
//               <li className="flex flex-col sm:flex-row bg-white border border-gray-200 text-gray-600 rounded-lg p-3">
//                 <span className="text-blue-950 font-bold mb-1 sm:mb-0 sm:pr-5">Website Creation</span>
//                 <span>Web Owners must provide accurate website details, including the website name, URL, and logo.</span>
//               </li>
//               <li className="flex flex-col sm:flex-row bg-white border border-gray-200 text-gray-600 rounded-lg p-3">
//                 <span className="text-blue-950 font-bold mb-1 sm:mb-0 sm:pr-5">Category and Space Management</span>
//                 <span>Web Owners are responsible for setting appropriate prices, user counts, availability, and clear instructions for ad spaces.</span>
//               </li>
//               <li className="flex flex-col sm:flex-row bg-white border border-gray-200 text-gray-600 rounded-lg p-3">
//                 <span className="text-blue-950 font-bold mb-1 sm:mb-0 sm:pr-5">API Integration</span>
//                 <span>The script API generated by Yepper must be correctly integrated into their website to ensure ads display as intended.</span>
//               </li>
//               <li className="flex flex-col sm:flex-row bg-white border border-gray-200 text-gray-600 rounded-lg p-3">
//                 <span className="text-blue-950 font-bold mb-1 sm:mb-0 sm:pr-5">Approval of Ads</span>
//                 <span>Web Owners are responsible for reviewing and approving or rejecting ad requests in a timely manner.</span>
//               </li>
//             </ul>
//           </section>

//           <section className="bg-white border border-gray-200 rounded-lg p-3 sm:p-5">
//             <h2 className="text-lg sm:text-xl text-blue-950 font-bold mb-3">4. Advertiser Responsibilities</h2>
//             <ul className="space-y-3">
//               <li className="flex flex-col sm:flex-row bg-white border border-gray-200 text-gray-600 rounded-lg p-3">
//                 <span className="text-blue-950 font-bold mb-1 sm:mb-0 sm:pr-5">Ad Content</span>
//                 <span>Advertisers must ensure that uploaded ad images or videos comply with applicable laws and do not contain prohibited content such as hate speech, offensive material, or misleading information.</span>
//               </li>
//               <li className="flex flex-col sm:flex-row bg-white border border-gray-200 text-gray-600 rounded-lg p-3">
//                 <span className="text-blue-950 font-bold mb-1 sm:mb-0 sm:pr-5">Business Information</span>
//                 <span>Accurate business details, including the name, website, location, and description, must be provided.</span>
//               </li>
//               <li className="flex flex-col sm:flex-row bg-white border border-gray-200 text-gray-600 rounded-lg p-3">
//                 <span className="text-blue-950 font-bold mb-1 sm:mb-0 sm:pr-5">Payment</span>
//                 <span>Advertisers must pay for approved ads promptly to ensure publication.</span>
//               </li>
//             </ul>
//           </section>

//           <section className="bg-white border border-gray-200 rounded-lg p-3 sm:p-5">
//             <h2 className="text-lg sm:text-xl text-blue-950 font-bold mb-3">5. Payments and Fees</h2>
//             <ul className="space-y-3">
//               <li className="bg-white border border-gray-200 text-gray-600 rounded-lg p-3">
//                 Payments for ad spaces must be processed through the platform's integrated payment system.
//               </li>
//               <li className="bg-white border border-gray-200 text-gray-600 rounded-lg p-3">
//                 Yepper charges a service fee on each transaction, which is deducted automatically.
//               </li>
//             </ul>
//           </section>

//           <section className="bg-white border border-gray-200 rounded-lg p-3 sm:p-5">
//             <h2 className="text-lg sm:text-xl text-blue-950 font-bold mb-3">6. Prohibited Activities</h2>
//             <ul className="space-y-3">
//               <li className="bg-white border border-gray-200 text-gray-600 rounded-lg p-3">
//                 Misrepresentation of business or website details.
//               </li>
//               <li className="bg-white border border-gray-200 text-gray-600 rounded-lg p-3">
//                 Uploading harmful or illegal content.
//               </li>
//               <li className="bg-white border border-gray-200 text-gray-600 rounded-lg p-3">
//                 Sharing or selling access to the platform's API script.
//               </li>
//               <li className="bg-white border border-gray-200 text-gray-600 rounded-lg p-3">
//                 Attempting to bypass Yepper's payment system or fees.
//               </li>
//             </ul>
//           </section>

//           <section className="bg-white border border-gray-200 rounded-lg p-3 sm:p-5">
//             <h2 className="text-lg sm:text-xl text-blue-950 font-bold mb-3">7. Limitation of Liability</h2>
//             <ul className="space-y-3">
//               <li className="bg-white border border-gray-200 text-gray-600 rounded-lg p-3">
//                 Yepper is not responsible for any loss or damage arising from the use of the platform, including but not limited to downtime, misconfigured APIs, or disputes between Web Owners and Advertisers.
//               </li>
//             </ul>
//           </section>

//           <section className="bg-white border border-gray-200 rounded-lg p-3 sm:p-5">
//             <h2 className="text-lg sm:text-xl text-blue-950 font-bold mb-3">8. Termination of Account</h2>
//             <ul className="space-y-3">
//               <li className="bg-white border border-gray-200 text-gray-600 rounded-lg p-3">
//                 Yepper reserves the right to terminate accounts that violate these terms without prior notice.
//               </li>
//             </ul>
//           </section>

//           <section className="bg-white border border-gray-200 rounded-lg p-3 sm:p-5">
//             <h2 className="text-lg sm:text-xl text-blue-950 font-bold mb-3">9. Modifications to Terms</h2>
//             <ul className="space-y-3">
//               <li className="bg-white border border-gray-200 text-gray-600 rounded-lg p-3">
//                 Yepper may update these terms at any time. Continued use of the platform constitutes acceptance of the revised terms.
//               </li>
//             </ul>
//           </section>

//           <section className="bg-white border border-gray-200 rounded-lg p-3 sm:p-5">
//             <h2 className="text-lg sm:text-xl text-blue-950 font-bold mb-3">10. Contact Information</h2>
//             <ul className="space-y-3">
//               <li className="bg-white border border-gray-200 text-gray-600 rounded-lg p-3">
//                 For any questions or concerns regarding these Terms, please contact us at
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

// export default TermsAndConditions;