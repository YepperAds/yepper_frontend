// import React, { useState, useMemo } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import { useClerk } from '@clerk/clerk-react';
// import { 
//     Info, 
//     Check, 
//     DollarSign, 
//     Image, 
//     Maximize2,
//     X,
//     LayoutGrid, 
//     AlignVerticalSpaceAround, 
// } from 'lucide-react';
// import '../styles/categories.css';

// function CategoriesComponents({ onSubmitSuccess }) {
//     const { user } = useClerk();
//     const ownerId = user?.id;
//     const { websiteId } = useParams();
  
//     const [selectedCategories, setSelectedCategories] = useState({
//         banner: false,
//         display: false,
//         native: false,
//         popup: false,
//     });
  
//     const [prices, setPrices] = useState({});
//     const [activeInfoModal, setActiveInfoModal] = useState(null);
  
//     const categoryDetails = useMemo(() => ({
//         banner: {
//             icon: <Image className="icon-target" />,
//             description: "Banner ads are traditional rectangular advertisements placed at the top, bottom, or sides of a webpage.",
//             benefits: [
//             "High visibility across the entire page",
//             "Classic advertising format recognized by users",
//             "Flexible sizing options"
//             ],
//         },
//         display: {
//             icon: <AlignVerticalSpaceAround className="icon-bar-chart" />,
//             description: "Display ads use rich media, text, and images to communicate an advertising message.",
//             benefits: [
//             "Supports complex visual storytelling",
//             "Can include interactive elements",
//             "Targets specific audience segments"
//             ],
//         },
//         native: {
//             icon: <LayoutGrid className="icon-target" />,
//             description: "Native ads match the look, feel, and function of the media format in which they appear.",
//             benefits: [
//             "Blends seamlessly with content",
//             "Higher engagement rates",
//             "Less disruptive to user experience"
//             ],
//         },
//         popup: {
//             icon: <Maximize2 className="icon-maximize" />,
//             description: "Popup ads appear in a new window, capturing immediate user attention.",
//             benefits: [
//             "Immediate user focus",
//             "Can trigger specific actions",
//             "Highly noticeable"
//             ],
//         }
//     }), []);
  
//     const handleCategoryChange = (category) => {
//       setSelectedCategories((prevState) => ({
//         ...prevState,
//         [category]: !prevState[category],
//       }));
//     };
  
//     const handlePriceChange = (category, price) => {
//       setPrices((prevState) => ({
//         ...prevState,
//         [category]: price,
//       }));
//     };
  
//     const handleSubmit = async (event) => {
//       event.preventDefault();

//       if (!websiteId) {
//           console.error('Website ID is missing');
//           return;
//       }

//       try {
//           const categoriesToSubmit = Object.entries(selectedCategories)
//               .filter(([, selected]) => selected)
//               .map(([category]) => ({
//                   ownerId,
//                   websiteId,
//                   categoryName: category.charAt(0).toUpperCase() + category.slice(1),
//                   price: prices[category],
//                   description: categoryDetails[category]?.description || '',
//                   customAttributes: {},
//               }));

//           const responses = await Promise.all(
//               categoriesToSubmit.map(async (category) => {
//                   const response = await axios.post('https://yepper-backend.onrender.com/api/ad-categories', category);
//                   return { ...response.data, name: category.categoryName };
//               })
//           );

//           onSubmitSuccess();
//       } catch (error) {
//           console.error('Failed to submit categories:', error);
//       }
//     };
  
//     const renderCategoryOption = (category) => {
//       if (!category || !categoryDetails[category]) return null;

//       const details = categoryDetails[category];
//       return (
//         <div 
//           key={category}
//           className="category-option"
//         >
//           <label className="category-label">
//             {details.icon}
//             <input
//               type="checkbox"
//               checked={selectedCategories[category] || false}
//               onChange={() => handleCategoryChange(category)}
//               className="category-checkbox"
//             />
//             <span className="category-label-text">
//               {category || 'Unknown'}
//             </span>
//           </label>
//           <div className="price-input-container">
//             <button 
//               type="button" 
//               onClick={() => setActiveInfoModal(category)}
//               className="info-button"
//             >
//               <Info className="icon-info" />
//             </button>
//             {selectedCategories[category] && (
//               <div className="price-input-container">
//                 <DollarSign className="icon-dollar" />
//                 <input
//                   type="number"
//                   placeholder="Price"
//                   className="price-input"
//                   value={prices[category] || ''}
//                   onChange={(e) => handlePriceChange(category, e.target.value)}
//                 />
//               </div>
//             )}
//           </div>
//         </div>
//       );
//     };
  
//     const renderInfoModal = (category) => {
//       if (!category || !categoryDetails[category]) return null;
      
//       const details = categoryDetails[category];
//       return (
//         <div className="info-modal-overlay">
//           <div className="info-modal-content">
//             <h2 className="info-modal-title">
//               {details.icon}
//               <span>{category ? category.charAt(0).toUpperCase() + category.slice(1) : 'Ad'} Ads</span>
//             </h2>
//             <div className="grid">
//               <img 
//                 src={details.image} 
//                 alt={`${category || 'ad'} ad example`} 
//                 className="w-full rounded-lg shadow-lg transform transition-transform hover:scale-105"
//               />
//               <div>
//                 <blockquote className="info-modal-description">
//                   {details.description}
//                 </blockquote>
//                 <h3 className="info-modal-benefits-title">
//                   Key Benefits
//                 </h3>
//                 <ul className="info-modal-benefits-list">
//                   {details.benefits.map((benefit, index) => (
//                     <li key={index} className="info-modal-benefits-item">
//                       <Check className="icon-check" />
//                       <span>{benefit}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//             <button 
//               onClick={() => setActiveInfoModal(null)} 
//               className="info-modal-close"
//             >
//               <X size={20} />
//             </button>
//           </div>
//         </div>
//       );
//     };
  
//     return (
//       <div className="categories-container">
//         <h2 className="categories-title">
//           Select Ad Categories
//         </h2>
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             {Object.keys(categoryDetails).map(renderCategoryOption)}
//             {renderInfoModal(activeInfoModal)}
//           </div>
//           <button 
//             type="submit" 
//             className="submit-button"
//           >
//             <Check className="icon-check" /> Continue
//           </button>
//         </form>
//       </div>
//     );
// }

// export default CategoriesComponents;

import React, { useState, useMemo } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useClerk } from '@clerk/clerk-react';
import { 
    Info, 
    Check, 
    DollarSign, 
    Image, 
    Maximize2,
    X,
    LayoutGrid, 
    AlignVerticalSpaceAround, 
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from "./components/card";

const CategoriesComponent = ({ onSubmitSuccess }) => {
    const { user } = useClerk();
    const ownerId = user?.id;
    const { websiteId } = useParams();
  
    const [selectedCategories, setSelectedCategories] = useState({
        banner: false,
        display: false,
        native: false,
        popup: false,
    });
  
    const [prices, setPrices] = useState({});
    const [activeInfoModal, setActiveInfoModal] = useState(null);
  
    const categoryDetails = useMemo(() => ({
        banner: {
            icon: <Image className="w-6 h-6" />,
            description: "Banner ads are traditional rectangular advertisements placed at the top, bottom, or sides of a webpage.",
            benefits: [
                "High visibility across the entire page",
                "Classic advertising format recognized by users",
                "Flexible sizing options"
            ],
        },
        display: {
            icon: <AlignVerticalSpaceAround className="w-6 h-6" />,
            description: "Display ads use rich media, text, and images to communicate an advertising message.",
            benefits: [
                "Supports complex visual storytelling",
                "Can include interactive elements",
                "Targets specific audience segments"
            ],
        },
        native: {
            icon: <LayoutGrid className="w-6 h-6" />,
            description: "Native ads match the look, feel, and function of the media format in which they appear.",
            benefits: [
                "Blends seamlessly with content",
                "Higher engagement rates",
                "Less disruptive to user experience"
            ],
        },
        popup: {
            icon: <Maximize2 className="w-6 h-6" />,
            description: "Popup ads appear in a new window, capturing immediate user attention.",
            benefits: [
                "Immediate user focus",
                "Can trigger specific actions",
                "Highly noticeable"
            ],
        }
    }), []);

    const handleCategoryChange = (category) => {
        setSelectedCategories((prev) => ({
            ...prev,
            [category]: !prev[category],
        }));
    };

    const handlePriceChange = (category, price) => {
        setPrices((prev) => ({
            ...prev,
            [category]: price,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!websiteId) {
            console.error('Website ID is missing');
            return;
        }

        try {
            const categoriesToSubmit = Object.entries(selectedCategories)
                .filter(([, selected]) => selected)
                .map(([category]) => ({
                    ownerId,
                    websiteId,
                    categoryName: category.charAt(0).toUpperCase() + category.slice(1),
                    price: prices[category],
                    description: categoryDetails[category]?.description || '',
                    customAttributes: {},
                }));

            const responses = await Promise.all(
                categoriesToSubmit.map(async (category) => {
                    const response = await axios.post('https://yepper-backend.onrender.com/api/ad-categories', category);
                    return { ...response.data, name: category.categoryName };
                })
            );

            onSubmitSuccess();
        } catch (error) {
            console.error('Failed to submit categories:', error);
        }
    };

    const renderInfoModal = (category) => {
        if (!category || !categoryDetails[category]) return null;
        
        const details = categoryDetails[category];
        return (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                <Card className="w-full max-w-2xl bg-white">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center gap-2 text-[#FF4500]">
                                {details.icon}
                                <span className='text-blue-950'>{category.charAt(0).toUpperCase() + category.slice(1)} Ads</span>
                            </CardTitle>
                            <button 
                                onClick={() => setActiveInfoModal(null)}
                                className="p-1 hover:bg-gray-100 rounded-full"
                            >
                                <X className="w-5 h-5 text-gray-600" />
                            </button>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-gray-600">{details.description}</p>
                        <div>
                            <h3 className="font-semibold mb-2 text-blue-950">Key Benefits</h3>
                            <ul className="space-y-2">
                                {details.benefits.map((benefit, index) => (
                                    <li key={index} className="flex items-center gap-2">
                                        <Check className="w-4 h-4 text-[#FF4500]" />
                                        <span className='text-blue-950'>{benefit}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    };

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-8 text-center text-blue-950">Select Ad Categories</h1>
            <form onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    {Object.entries(categoryDetails).map(([category, details]) => (
                        <Card 
                            key={category}
                            className={`cursor-pointer transition-all duration-200 ${
                                selectedCategories[category] 
                                    ? 'ring-2 ring-blue-500 shadow-lg' 
                                    : 'hover:shadow-md'
                            }`}
                            onClick={() => handleCategoryChange(category)}
                        >
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3 text-[#FF4500]">
                                        {details.icon}
                                        <CardTitle className='text-gray-600'>{category.charAt(0).toUpperCase() + category.slice(1)}</CardTitle>
                                    </div>
                                    <button 
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setActiveInfoModal(category);
                                        }}
                                        className="p-1 hover:bg-gray-100 rounded-full"
                                    >
                                        <Info className="w-5 h-5 text-gray-600" />
                                    </button>
                                </div>
                                <p className="text-sm text-gray-600 mt-2">{details.description}</p>
                            </CardHeader>
                            {selectedCategories[category] && (
                                <CardContent>
                                    <div className="flex items-center gap-2 mt-4">
                                        <DollarSign className="w-5 h-5 text-gray-500" />
                                        <input
                                            type="number"
                                            placeholder="Set price"
                                            className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                                            value={prices[category] || ''}
                                            onChange={(e) => {
                                                e.stopPropagation();
                                                handlePriceChange(category, e.target.value);
                                            }}
                                            onClick={(e) => e.stopPropagation()}
                                        />
                                    </div>
                                </CardContent>
                            )}
                        </Card>
                    ))}
                </div>
                <div className="flex justify-center">
                    <button 
                        type="submit"
                        className="w-full flex items-center justify-center gap-1 px-3 py-2 bg-[#FF4500] hover:bg-orange-500 hover:-translate-y-0.5 text-white font-bold rounded-md transition-all duration-300"
                    >
                        <Check className="w-5 h-5" />
                        Continue
                    </button>
                </div>
            </form>
            {activeInfoModal && renderInfoModal(activeInfoModal)}
        </div>
    );
};

export default CategoriesComponent;