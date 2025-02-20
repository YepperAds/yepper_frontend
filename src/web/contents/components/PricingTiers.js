// import React from 'react';
// import { DollarSign, Check } from 'lucide-react';

// const PricingTiers = ({ selectedPrice, onPriceSelect }) => {
//   const tiers = [
//     {
//       name: 'bronze',
//       price: 10000,
//       visitorRange: { min: 0, max: 5 },
//       color: 'bg-amber-700',
//       features: ['Basic analytics', 'Standard support']
//     },
//     {
//       name: 'silver',
//       price: 20000,
//       visitorRange: { min: 10000, max: 100000 },
//       color: 'bg-gray-400',
//       features: ['Advanced analytics', 'Priority support']
//     },
//     {
//       name: 'gold',
//       price: 30000,
//       visitorRange: { min: 100000, max: 1000000 },
//       color: 'bg-yellow-500',
//       features: ['Premium analytics', '24/7 support']
//     },
//     {
//       name: 'platinum',
//       price: 50000,
//       visitorRange: { min: 1000000, max: Number.MAX_SAFE_INTEGER },
//       color: 'bg-gray-700',
//       features: ['Enterprise analytics', 'Dedicated support']
//     }
//   ];

//   const formatVisitorRange = (range) => {
//     const formatNumber = (num) => {
//       if (num >= 1000000) return `${num / 1000000}M`;
//       if (num >= 1000) return `${num / 1000}K`;
//       return num.toString();
//     };

//     if (range.max === Number.MAX_SAFE_INTEGER) {
//       return `${formatNumber(range.min)}+ monthly visitors`;
//     }
    
//     return `${formatNumber(range.min)} - ${formatNumber(range.max)} monthly visitors`;
//   };

//   const isSelected = (tier) => {
//     // Check if selectedPrice is the new format (object with tier)
//     if (selectedPrice?.tier) {
//       return selectedPrice.tier === tier.name;
//     }
//     // Fall back to old format (direct price comparison)
//     return selectedPrice === tier.price;
//   };

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
//       {tiers.map((tier) => (
//         <div
//           key={tier.name}
//           onClick={() => onPriceSelect({
//             price: tier.price,
//             tier: tier.name,
//             visitorRange: tier.visitorRange
//           })}
//           className={`relative rounded-lg overflow-hidden transition-all duration-300 cursor-pointer
//             ${isSelected(tier)
//               ? 'ring-2 ring-blue-500 transform scale-105' 
//               : 'hover:shadow-lg hover:-translate-y-1'}`}
//         >
//           <div className={`${tier.color} p-4`}>
//             <h3 className="text-xl font-bold text-white mb-2 capitalize">{tier.name}</h3>
//             <div className="flex items-center gap-1 text-white">
//               {/* <DollarSign className="w-5 h-5" /> */}
//               <span className="text-sm">RWF</span>
//               <span className="text-1xl font-bold">{tier.price}</span>
//               <span className="text-sm">/month</span>
//             </div>
//           </div>
          
//           <div className="bg-white p-4 space-y-3">
//             <div className="text-sm text-gray-600 font-medium">
//               {formatVisitorRange(tier.visitorRange)}
//             </div>
            
//             <div className="space-y-2">
//               {tier.features.map((feature, index) => (
//                 <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
//                   <Check className="w-4 h-4 text-green-500" />
//                   <span>{feature}</span>
//                 </div>
//               ))}
//             </div>
            
//             {isSelected(tier) && (
//               <div className="absolute top-2 right-2">
//                 <div className="bg-blue-500 text-white p-1 rounded-full">
//                   <Check className="w-4 h-4" />
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default PricingTiers;




























import React from 'react';
import { DollarSign, Check, Crown } from 'lucide-react';

const PricingTiers = ({ selectedPrice, onPriceSelect }) => {
  const tiers = [
    {
      name: 'bronze',
      price: 10,
      visitorRange: { min: 0, max: 5 },
      color: 'bg-gradient-to-br from-amber-600 to-amber-800',
      icon: <DollarSign className="w-5 h-5" />,
      features: ['Basic analytics', 'Standard support']
    },
    {
      name: 'silver',
      price: 20,
      visitorRange: { min: 10000, max: 100000 },
      color: 'bg-gradient-to-br from-gray-300 to-gray-500',
      icon: <DollarSign className="w-5 h-5" />,
      features: ['Advanced analytics', 'Priority support']
    },
    {
      name: 'gold',
      price: 30,
      visitorRange: { min: 100000, max: 1000000 },
      color: 'bg-gradient-to-br from-yellow-400 to-yellow-600',
      icon: <DollarSign className="w-5 h-5" />,
      features: ['Premium analytics', '24/7 support']
    },
    {
      name: 'platinum',
      price: 50,
      visitorRange: { min: 1000000, max: Number.MAX_SAFE_INTEGER },
      color: 'bg-gradient-to-br from-gray-600 to-gray-900',
      icon: <Crown className="w-5 h-5" />,
      features: ['Enterprise analytics', 'Dedicated support']
    }
  ];

  const formatVisitorRange = (range) => {
    const formatNumber = (num) => {
      if (num >= 1000000) return `${num / 1000000}M`;
      if (num >= 1000) return `${num / 1000}K`;
      return num.toString();
    };

    if (range.max === Number.MAX_SAFE_INTEGER) {
      return `${formatNumber(range.min)}+ monthly visitors`;
    }
    
    return `${formatNumber(range.min)} - ${formatNumber(range.max)} monthly visitors`;
  };

  const isSelected = (tier) => {
    // Check if selectedPrice is the new format (object with tier)
    if (selectedPrice?.tier) {
      return selectedPrice.tier === tier.name;
    }
    // Fall back to old format (direct price comparison)
    return selectedPrice === tier.price;
  };

  const getPopularTier = () => {
    return tiers.find(tier => tier.name === 'gold');
  };
  
  const popularTier = getPopularTier();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-8">
      {tiers.map((tier) => {
        const isPopular = tier.name === popularTier.name;
        return (
          <div
            key={tier.name}
            onClick={() => onPriceSelect({
              price: tier.price,
              tier: tier.name,
              visitorRange: tier.visitorRange
            })}
            className={`relative rounded-xl overflow-hidden transition-all duration-300 cursor-pointer
              group border ${isSelected(tier) 
                ? 'ring-2 ring-blue-500 shadow-xl transform scale-105 z-10' 
                : 'border-gray-200 hover:shadow-lg hover:-translate-y-2'}
              ${isPopular ? 'md:-mt-4 md:mb-4' : ''}`}
          >
            {isPopular && (
              <div className="absolute top-0 left-0 right-0 bg-blue-600 text-center text-white text-xs font-bold py-1">
                MOST POPULAR
              </div>
            )}
            
            <div className={`${tier.color} p-6 text-center ${isPopular ? 'pt-8' : ''}`}>
              <h3 className="text-xl font-bold text-white mb-3 capitalize">{tier.name}</h3>
              <div className="flex items-center justify-center gap-1 text-white">
                <span className="text-sm">$</span>
                <span className="text-4xl font-bold">{tier.price}</span>
                <span className="text-sm self-end mb-1">/month</span>
              </div>
            </div>
            
            <div className="bg-white p-6 space-y-4">
              <div className="text-sm text-gray-600 font-medium text-center p-2 border-b border-gray-100">
                {formatVisitorRange(tier.visitorRange)}
              </div>
              
              <div className="space-y-3">
                {tier.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 text-sm text-gray-700">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              
              <button 
                className={`w-full py-2 px-4 rounded-lg font-medium text-sm transition-colors
                  ${isSelected(tier)
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 group-hover:bg-gray-200'}`}
              >
                {isSelected(tier) ? 'Selected' : 'Select Plan'}
              </button>
            </div>
            
            {isSelected(tier) && (
              <div className="absolute top-3 right-3">
                <div className="bg-blue-500 text-white p-1 rounded-full shadow-md">
                  <Check className="w-4 h-4" />
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default PricingTiers;