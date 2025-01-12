// import React, { useState, useMemo, useEffect } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate, useLocation } from 'react-router-dom';
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
// import { Card, CardHeader, CardTitle, CardContent } from "./components/card";
// import Header from '../../components/backToPreviousHeader'

// const CategoriesCreation = () => {
//     const { user } = useClerk();
//     const ownerId = user?.id;
//     const { websiteId } = useParams();
//     const { state } = useLocation();
//     const navigate = useNavigate();

//     const [websiteDetails] = useState(state?.websiteDetails || null);
    
//     useEffect(() => {
//         if (!websiteId) {
//             navigate('/create-website');
//             return;
//         }

//         if (!websiteDetails) {
//             const fetchWebsiteDetails = async () => {
//                 try {
//                     const response = await axios.get(`http://localhost:5000/api/websites/${websiteId}`);
//                     // Handle the website details...
//                 } catch (error) {
//                     console.error('Failed to fetch website details:', error);
//                     navigate('/create-website');
//                 }
//             };
//             fetchWebsiteDetails();
//         }
//     }, [websiteId, websiteDetails, navigate]);

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
//             icon: <Image className="w-6 h-6" />,
//             description: "Banner ads are traditional rectangular advertisements placed at the top, bottom, or sides of a webpage.",
//             benefits: [
//                 "High visibility across the entire page",
//                 "Classic advertising format recognized by users",
//                 "Flexible sizing options"
//             ],
//         },
//         display: {
//             icon: <AlignVerticalSpaceAround className="w-6 h-6" />,
//             description: "Display ads use rich media, text, and images to communicate an advertising message.",
//             benefits: [
//                 "Supports complex visual storytelling",
//                 "Can include interactive elements",
//                 "Targets specific audience segments"
//             ],
//         },
//         native: {
//             icon: <LayoutGrid className="w-6 h-6" />,
//             description: "Native ads match the look, feel, and function of the media format in which they appear.",
//             benefits: [
//                 "Blends seamlessly with content",
//                 "Higher engagement rates",
//                 "Less disruptive to user experience"
//             ],
//         },
//         popup: {
//             icon: <Maximize2 className="w-6 h-6" />,
//             description: "Popup ads appear in a new window, capturing immediate user attention.",
//             benefits: [
//                 "Immediate user focus",
//                 "Can trigger specific actions",
//                 "Highly noticeable"
//             ],
//         }
//     }), []);

//     const handleCategoryChange = (category) => {
//         setSelectedCategories((prev) => ({
//             ...prev,
//             [category]: !prev[category],
//         }));
//     };

//     const handlePriceChange = (category, price) => {
//         setPrices((prev) => ({
//             ...prev,
//             [category]: price,
//         }));
//     };

//     const handleSubmit = async (event) => {
//         event.preventDefault();

//         try {
//             const categoriesToSubmit = Object.entries(selectedCategories)
//                 .filter(([, selected]) => selected)
//                 .map(([category]) => ({
//                     ownerId: user?.id,
//                     websiteId,
//                     categoryName: category.charAt(0).toUpperCase() + category.slice(1),
//                     price: prices[category],
//                     description: categoryDetails[category]?.description || '',
//                     customAttributes: {},
//                 }));

//             const responses = await Promise.all(
//                 categoriesToSubmit.map(async (category) => {
//                     const response = await axios.post('http://localhost:5000/api/ad-categories', category);
//                     return { ...response.data, name: category.categoryName };
//                 })
//             );

//             const categoriesWithId = responses.reduce((acc, category) => {
//                 acc[category.name.toLowerCase()] = { id: category._id, price: category.price };
//                 return acc;
//             }, {});

//             navigate('/projects', {
//                 state: {
//                     websiteId,
//                     websiteDetails,
//                     selectedCategories: categoriesWithId,
//                     prices,
//                 },
//             });
//         } catch (error) {
//             console.error('Failed to submit categories:', error);
//         }
//     };

//     const renderInfoModal = (category) => {
//         if (!category || !categoryDetails[category]) return null;
        
//         const details = categoryDetails[category];
//         return (
//             <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
//                 <Card className="w-full max-w-2xl bg-white">
//                     <CardHeader>
//                         <div className="flex items-center justify-between">
//                             <CardTitle className="flex items-center gap-2 text-[#FF4500]">
//                                 {details.icon}
//                                 <span className='text-blue-950'>{category.charAt(0).toUpperCase() + category.slice(1)} Ads</span>
//                             </CardTitle>
//                             <button 
//                                 onClick={() => setActiveInfoModal(null)}
//                                 className="p-1 hover:bg-gray-100 rounded-full"
//                             >
//                                 <X className="w-5 h-5 text-gray-600" />
//                             </button>
//                         </div>
//                     </CardHeader>
//                     <CardContent className="space-y-4">
//                         <p className="text-gray-600">{details.description}</p>
//                         <div>
//                             <h3 className="font-semibold mb-2 text-blue-950">Key Benefits</h3>
//                             <ul className="space-y-2">
//                                 {details.benefits.map((benefit, index) => (
//                                     <li key={index} className="flex items-center gap-2">
//                                         <Check className="w-4 h-4 text-[#FF4500]" />
//                                         <span className='text-blue-950'>{benefit}</span>
//                                     </li>
//                                 ))}
//                             </ul>
//                         </div>
//                     </CardContent>
//                 </Card>
//             </div>
//         );
//     };

//     return (
//         <div className="ad-waitlist min-h-screen">
//             <Header />
//             <h1 className="text-3xl font-bold mb-8 text-center text-blue-950">Select Ad Categories</h1>
//             <form onSubmit={handleSubmit} className='flex justify-center items-center p-8'>
//                 <div>
//                     <div className="grid md:grid-cols-2 gap-6 mb-8">
//                         {Object.entries(categoryDetails).map(([category, details]) => (
//                             <Card 
//                                 key={category}
//                                 className={`cursor-pointer transition-all duration-200 ${
//                                     selectedCategories[category] 
//                                         ? 'ring-2 ring-blue-500 shadow-lg' 
//                                         : 'hover:shadow-md'
//                                 }`}
//                                 onClick={() => handleCategoryChange(category)}
//                             >
//                                 <CardHeader>
//                                     <div className="flex items-center justify-between">
//                                         <div className="flex items-center gap-3 text-[#FF4500]">
//                                             {details.icon}
//                                             <CardTitle className='text-gray-600'>{category.charAt(0).toUpperCase() + category.slice(1)}</CardTitle>
//                                         </div>
//                                         <button 
//                                             type="button"
//                                             onClick={(e) => {
//                                                 e.stopPropagation();
//                                                 setActiveInfoModal(category);
//                                             }}
//                                             className="p-1 hover:bg-gray-100 rounded-full"
//                                         >
//                                             <Info className="w-5 h-5 text-gray-600" />
//                                         </button>
//                                     </div>
//                                     <p className="text-sm text-gray-600 mt-2">{details.description}</p>
//                                 </CardHeader>
//                                 {selectedCategories[category] && (
//                                     <CardContent>
//                                         <div className="flex items-center gap-2 mt-4">
//                                             <DollarSign className="w-5 h-5 text-gray-500" />
//                                             <input
//                                                 type="number"
//                                                 placeholder="Set price"
//                                                 className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
//                                                 value={prices[category] || ''}
//                                                 onChange={(e) => {
//                                                     e.stopPropagation();
//                                                     handlePriceChange(category, e.target.value);
//                                                 }}
//                                                 onClick={(e) => e.stopPropagation()}
//                                             />
//                                         </div>
//                                     </CardContent>
//                                 )}
//                             </Card>
//                         ))}
//                     </div>
//                     <div className="flex justify-center">
//                         <button 
//                             type="submit"
//                             className=" flex items-center justify-center gap-1 px-3 py-2 bg-[#FF4500] hover:bg-orange-500 hover:-translate-y-0.5 text-white font-bold rounded-md transition-all duration-300"
//                         >
//                             <Check className="w-5 h-5" />
//                             Continue
//                         </button>
//                     </div>
//                 </div>
//             </form>
//             {activeInfoModal && renderInfoModal(activeInfoModal)}
//         </div>
//     );
// };

// export default CategoriesCreation;






import React, { useState, useMemo, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
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
    Users,
    FileText 
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from "./components/card";
import Header from '../../components/backToPreviousHeader';

const CategoriesCreation = () => {
    const { user } = useClerk();
    const { websiteId } = useParams();
    const { state } = useLocation();
    const navigate = useNavigate();

    const [websiteDetails] = useState(state?.websiteDetails || null);
    
    useEffect(() => {
        if (!websiteId) {
            navigate('/create-website');
            return;
        }

        if (!websiteDetails) {
            const fetchWebsiteDetails = async () => {
                try {
                    const response = await axios.get(`http://localhost:5000/api/websites/${websiteId}`);
                    // Handle the website details...
                } catch (error) {
                    console.error('Failed to fetch website details:', error);
                    navigate('/create-website');
                }
            };
            fetchWebsiteDetails();
        }
    }, [websiteId, websiteDetails, navigate]);

    const [selectedCategories, setSelectedCategories] = useState({
        banner: false,
        display: false,
        native: false,
        popup: false,
    });
  
    const [categoryData, setCategoryData] = useState({});
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
            spaceType: "banner"
        },
        display: {
            icon: <AlignVerticalSpaceAround className="w-6 h-6" />,
            description: "Display ads use rich media, text, and images to communicate an advertising message.",
            benefits: [
                "Supports complex visual storytelling",
                "Can include interactive elements",
                "Targets specific audience segments"
            ],
            spaceType: "display"
        },
        native: {
            icon: <LayoutGrid className="w-6 h-6" />,
            description: "Native ads match the look, feel, and function of the media format in which they appear.",
            benefits: [
                "Blends seamlessly with content",
                "Higher engagement rates",
                "Less disruptive to user experience"
            ],
            spaceType: "native"
        },
        popup: {
            icon: <Maximize2 className="w-6 h-6" />,
            description: "Popup ads appear in a new window, capturing immediate user attention.",
            benefits: [
                "Immediate user focus",
                "Can trigger specific actions",
                "Highly noticeable"
            ],
            spaceType: "popup"
        }
    }), []);

    const handleCategoryChange = (category) => {
        setSelectedCategories((prev) => ({
            ...prev,
            [category]: !prev[category],
        }));
    };

    const updateCategoryData = (category, field, value) => {
        setCategoryData(prev => ({
            ...prev,
            [category]: {
                ...prev[category],
                [field]: value
            }
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const categoriesToSubmit = Object.entries(selectedCategories)
                .filter(([, selected]) => selected)
                .map(([category]) => ({
                    ownerId: user?.id,
                    websiteId,
                    categoryName: category.charAt(0).toUpperCase() + category.slice(1),
                    price: categoryData[category]?.price || 0,
                    description: categoryDetails[category]?.description || '',
                    spaceType: categoryDetails[category]?.spaceType,
                    userCount: parseInt(categoryData[category]?.userCount) || 0,
                    instructions: categoryData[category]?.instructions || '',
                    customAttributes: {},
                    webOwnerEmail: user?.emailAddresses[0]?.emailAddress
                }));

            const responses = await Promise.all(
                categoriesToSubmit.map(async (category) => {
                    const response = await axios.post('http://localhost:5000/api/ad-categories', category);
                    return { ...response.data, name: category.categoryName };
                })
            );

            const categoriesWithId = responses.reduce((acc, category) => {
                acc[category.name.toLowerCase()] = { 
                    id: category._id, 
                    price: category.price,
                    apiCodes: category.apiCodes
                };
                return acc;
            }, {});

            navigate('/projects', {
                state: {
                    websiteId,
                    websiteDetails,
                    selectedCategories: categoriesWithId,
                    categoryData
                },
            });
        } catch (error) {
            console.error('Failed to submit categories:', error);
        }
    };

    const renderCategoryForm = (category) => (
        <CardContent>
            <div className="space-y-4 mt-4">
                <div className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-gray-500" />
                    <input
                        type="number"
                        placeholder="Set price"
                        className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                        value={categoryData[category]?.price || ''}
                        onChange={(e) => {
                            e.stopPropagation();
                            updateCategoryData(category, 'price', e.target.value);
                        }}
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-gray-500" />
                    <input
                        type="number"
                        placeholder="Expected monthly users"
                        className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                        value={categoryData[category]?.userCount || ''}
                        onChange={(e) => {
                            e.stopPropagation();
                            updateCategoryData(category, 'userCount', e.target.value);
                        }}
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
                <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-gray-500" />
                    <textarea
                        placeholder="Additional instructions for advertisers"
                        className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                        value={categoryData[category]?.instructions || ''}
                        onChange={(e) => {
                            e.stopPropagation();
                            updateCategoryData(category, 'instructions', e.target.value);
                        }}
                        onClick={(e) => e.stopPropagation()}
                        rows={3}
                    />
                </div>
            </div>
        </CardContent>
    );

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
                                <span className="text-blue-950">{category.charAt(0).toUpperCase() + category.slice(1)} Ads</span>
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
                                        <span className="text-blue-950">{benefit}</span>
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
        <div className="min-h-screen bg-gray-50">
            <Header />
            <div className="max-w-6xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8 text-center text-blue-950">Select Ad Categories</h1>
                <form onSubmit={handleSubmit}>
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                        {Object.entries(categoryDetails).map(([category, details]) => (
                            <Card 
                                key={category}
                                className={`transition-all duration-200 ${
                                    selectedCategories[category] 
                                        ? 'ring-2 ring-blue-500 shadow-lg' 
                                        : 'hover:shadow-md'
                                }`}
                            >
                                <CardHeader className="cursor-pointer" onClick={() => handleCategoryChange(category)}>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3 text-[#FF4500]">
                                            {details.icon}
                                            <CardTitle className="text-gray-600">
                                                {category.charAt(0).toUpperCase() + category.slice(1)}
                                            </CardTitle>
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
                                {selectedCategories[category] && renderCategoryForm(category)}
                            </Card>
                        ))}
                    </div>
                    <div className="flex justify-center">
                        <button 
                            type="submit"
                            className="flex items-center justify-center gap-1 px-6 py-3 bg-[#FF4500] hover:bg-orange-500 hover:-translate-y-0.5 text-white font-bold rounded-md transition-all duration-300"
                        >
                            <Check className="w-5 h-5" />
                            Create Categories
                        </button>
                    </div>
                </form>
            </div>
            {activeInfoModal && renderInfoModal(activeInfoModal)}
        </div>
    );
};

export default CategoriesCreation;