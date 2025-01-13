import React from 'react';
import { DollarSign, Check } from 'lucide-react';

const PricingTiers = ({ selectedPrice, onPriceSelect }) => {
  const tiers = [
    {
      name: 'Bronze',
      price: 100,
      visitors: '100 - 10K',
      color: 'bg-amber-700',
      features: ['Basic analytics', 'Standard support']
    },
    {
      name: 'Silver',
      price: 20,
      visitors: '10K - 100K',
      color: 'bg-gray-400',
      features: ['Advanced analytics', 'Priority support']
    },
    {
      name: 'Gold',
      price: 30,
      visitors: '100K - 1M',
      color: 'bg-yellow-500',
      features: ['Premium analytics', '24/7 support']
    },
    {
      name: 'Platinum',
      price: 50,
      visitors: '1M+',
      color: 'bg-gray-700',
      features: ['Enterprise analytics', 'Dedicated support']
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
      {tiers.map((tier) => (
        <div
          key={tier.name}
          onClick={() => onPriceSelect(tier.price)}
          className={`relative rounded-lg overflow-hidden transition-all duration-300 cursor-pointer
            ${selectedPrice === tier.price 
              ? 'ring-2 ring-blue-500 transform scale-105' 
              : 'hover:shadow-lg hover:-translate-y-1'}`}
        >
          <div className={`${tier.color} p-4`}>
            <h3 className="text-xl font-bold text-white mb-2">{tier.name}</h3>
            <div className="flex items-center gap-1 text-white">
              <DollarSign className="w-5 h-5" />
              <span className="text-2xl font-bold">{tier.price}</span>
              <span className="text-sm">/month</span>
            </div>
          </div>
          
          <div className="bg-white p-4 space-y-3">
            <div className="text-sm text-gray-600 font-medium">
              {tier.visitors} monthly visitors
            </div>
            
            <div className="space-y-2">
              {tier.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            
            {selectedPrice === tier.price && (
              <div className="absolute top-2 right-2">
                <div className="bg-blue-500 text-white p-1 rounded-full">
                  <Check className="w-4 h-4" />
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PricingTiers;