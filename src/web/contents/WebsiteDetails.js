import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
    Layout, 
    Globe, 
    Copy, 
    XCircle,
    Plus, 
    ChevronLeft, 
    ChevronRight 
} from 'lucide-react';
import { Button } from "./components/button";
import { Card, CardHeader, CardTitle, CardContent } from "./components/card";
import CategoriesComponents from './categoriesComponents';
import SpacesComponents from './spacesContent';

const WebsiteDetails = () => {
    const { websiteId } = useParams();
    const navigate = useNavigate();
    const [result, setResult] = useState(true);
    const [website, setWebsite] = useState(null);
    const [categories, setCategories] = useState([]);
    const [expandedCategory, setExpandedCategory] = useState(null);
    const [categoriesForm, setCategoriesForm] = useState(false);
    const [spacesForm, setSpacesForm] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [spaces, setSpaces] = useState({});
    const [currentSlides, setCurrentSlides] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchWebsiteData();
    }, [websiteId]);

    const fetchWebsiteData = async () => {
        try {
            const websiteResponse = await axios.get(`https://yepper-backend.onrender.com/api/websites/website/${websiteId}`);
            const categoriesResponse = await axios.get(`https://yepper-backend.onrender.com/api/ad-categories/${websiteId}`);
            setWebsite(websiteResponse.data);
            setCategories(categoriesResponse.data.categories);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching website data:', error);
            setLoading(false);
        }
    };

    const fetchSpacesForCategory = async (categoryId) => {
        try {
            const response = await axios.get(`https://yepper-backend.onrender.com/api/ad-spaces/${categoryId}`);
            setSpaces(prev => ({
                ...prev,
                [categoryId]: response.data
            }));
        } catch (error) {
            console.error('Error fetching spaces:', error);
        }
    };

    const handleCategoryClick = async (categoryId) => {
        if (expandedCategory === categoryId) {
            setExpandedCategory(null);
        } else {
            setExpandedCategory(categoryId);
            if (!spaces[categoryId]) {
                await fetchSpacesForCategory(categoryId);
            }
        }
    };

    const handleOpenCategoriesForm = () => {
        setCategoriesForm(true);
        setResult(false);
    };

    const handleOpenSpacesForm = (category) => {
        setSelectedCategory({
            [category.categoryName]: {
                id: category._id,
                name: category.categoryName,
                price: category.price
            }
        });
        setSpacesForm(true);
        setResult(false);
    };

    const handleCloseCategoriesForm = () => {
        setCategoriesForm(false);
        setResult(true);
        fetchWebsiteData();
    };

    const handleCloseSpacesForm = () => {
        setSpacesForm(false);
        setResult(true);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    return (
        <>
            {result && (
                <div className="container mx-auto px-4 py-8 max-w-6xl">
                    <Card className="mb-8">
                        <CardHeader className="flex flex-row items-center gap-4">
                            {website?.imageUrl ? (
                                <img src={website.imageUrl} alt={website.websiteName} className="w-16 h-16 object-contain rounded-lg" />
                            ) : (
                                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                                    <Globe className="w-8 h-8 text-gray-400" />
                                </div>
                            )}
                            <div className="flex-1">
                                <CardTitle className="text-2xl">{website?.websiteName}</CardTitle>
                                <a 
                                    href={website?.websiteLink} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline flex items-center gap-1 mt-1"
                                >
                                    <Globe className="w-4 h-4" />
                                    Visit Website
                                </a>
                            </div>
                            <Button 
                                className="gap-2"
                                onClick={handleOpenCategoriesForm}
                            >
                                <Plus className="w-4 h-4" />
                                Add Category
                            </Button>
                        </CardHeader>
                    </Card>

                    <div className="space-y-6">
                        {categories.map((category) => (
                            <Card key={category._id}>
                                {categories.map((category) => (
                                    <Card key={category._id}>
                                        <CardHeader 
                                            className="cursor-pointer hover:bg-gray-50"
                                            onClick={() => handleCategoryClick(category._id)}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <Layout className="w-5 h-5 text-green-500" />
                                                    <h2 className="text-lg font-semibold">{category.categoryName}</h2>
                                                    <span className="text-sm text-gray-500">${category.price}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Button 
                                                        className="gap-2"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleOpenSpacesForm(category);
                                                        }}
                                                    >
                                                        <Plus className="w-4 h-4" />
                                                        Add Spaces
                                                    </Button>
                                                    <span className={`transform transition-transform ${expandedCategory === category._id ? 'rotate-180' : ''}`}>
                                                        ▼
                                                    </span>
                                                </div>
                                            </div>
                                        </CardHeader>
                                        {/* ... keep existing expanded content ... */}
                                    </Card>
                                ))}

                                {expandedCategory === category._id && (
                                    <CardContent>
                                        {spaces[category._id]?.map((space) => (
                                            <div key={space._id} className="border-t border-gray-100 pt-6 first:border-0 first:pt-0">
                                                <div className="mb-4">
                                                    <h3 className="font-medium text-gray-700">Space Type: {space.spaceType}</h3>
                                                    <p className="text-sm text-gray-600">Price: ${space.price}</p>
                                                    <p className="text-sm text-gray-600">Availability: {space.availability}</p>
                                                </div>

                                                <div className="relative">
                                                    <div 
                                                        className="flex transition-transform duration-300 ease-in-out"
                                                        style={{ transform: `translateX(-${(currentSlides[space._id] || 0) * 100}%)` }}
                                                    >
                                                        {['HTML', 'JavaScript', 'PHP', 'Python'].map((lang) => (
                                                            <div key={lang} className="w-full flex-shrink-0 p-4 bg-gray-50 rounded-lg">
                                                                <div className="flex justify-between items-center mb-2">
                                                                    <h4 className="font-medium text-gray-700">{lang}</h4>
                                                                    <Button
                                                                        variant="ghost"
                                                                        size="sm"
                                                                        onClick={() => navigator.clipboard.writeText(space.apiCodes[lang])}
                                                                    >
                                                                        <Copy className="w-4 h-4" />
                                                                    </Button>
                                                                </div>
                                                                <pre className="text-sm bg-white p-3 rounded border overflow-x-auto">
                                                                    {space.apiCodes[lang] || `No ${lang} code available`}
                                                                </pre>
                                                            </div>
                                                        ))}
                                                    </div>

                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        className="absolute left-2 top-1/2 transform -translate-y-1/2"
                                                        onClick={() => setCurrentSlides(prev => ({
                                                            ...prev,
                                                            [space._id]: ((prev[space._id] || 0) - 1 + 4) % 4
                                                        }))}
                                                    >
                                                        <ChevronLeft className="w-4 h-4" />
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        className="absolute right-2 top-1/2 transform -translate-y-1/2"
                                                        onClick={() => setCurrentSlides(prev => ({
                                                        ...prev,
                                                        [space._id]: ((prev[space._id] || 0) + 1) % 4
                                                        }))}
                                                    >
                                                        <ChevronRight className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}

                                        {(!spaces[category._id] || spaces[category._id].length === 0) && (
                                            <div className="text-center py-8">
                                                <Layout className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                                <h3 className="text-lg font-medium text-gray-700">No Spaces Yet</h3>
                                                <p className="text-gray-500">Add your first space to this category.</p>
                                            </div>
                                        )}
                                    </CardContent>
                                )}
                            </Card>
                        ))}

                        {categories.length === 0 && (
                            <Card>
                                <CardContent className="text-center py-12">
                                    <Layout className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                    <h3 className="text-lg font-medium text-gray-700">No Categories Yet</h3>
                                    <p className="text-gray-500">Start by adding your first category.</p>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            )}

            {categoriesForm && (
                <div className='bg-red p-4 sm:p-6 space-y-4 sm:space-y-6'>
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg sm:text-xl font-bold text-gray-800">Create Ad Categories</h2>
                        <button 
                            type="button"
                            onClick={handleCloseCategoriesForm} 
                            className="text-gray-500 hover:text-red-500"
                        >
                            <XCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                        </button>
                    </div>
                    <div className='categories-box'>
                        <CategoriesComponents onSubmitSuccess={handleCloseCategoriesForm} />
                    </div>
                </div>
            )}

            {spacesForm && (
                <div className='bg-red p-4 sm:p-6 space-y-4 sm:space-y-6'>
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg sm:text-xl font-bold text-gray-800">Create Webpage Spaces</h2>
                        <button 
                            type="button"
                            onClick={handleCloseSpacesForm} 
                            className="text-gray-500 hover:text-red-500"
                        >
                            <XCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                        </button>
                    </div>
                    <div className='categories-box'>
                        <SpacesComponents 
                            selectedCategories={selectedCategory}
                            prices={{[selectedCategory?.name]: selectedCategory?.price}}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default WebsiteDetails;

















































// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { 
//     Layout, 
//     Globe, 
//     Copy, 
//     XCircle,
//     Plus, 
//     ChevronLeft, 
//     ChevronRight 
// } from 'lucide-react';
// import { Button } from "./components/button";
// import { Card, CardHeader, CardTitle, CardContent } from "./components/card";
// import CategoriesComponents from './categoriesComponents';

// const WebsiteDetails = () => {
//     const { websiteId } = useParams();
//     const navigate = useNavigate();
//     const [result, setResult] = useState(true);
//     const [website, setWebsite] = useState(null);
//     const [categories, setCategories] = useState([]);
//     const [expandedCategory, setExpandedCategory] = useState(null);
//     const [form, setForm] = useState(false);
//     const [spaces, setSpaces] = useState({});
//     const [currentSlides, setCurrentSlides] = useState({});
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         fetchWebsiteData();
//     }, [websiteId]);

//     const fetchWebsiteData = async () => {
//         try {
//             const websiteResponse = await axios.get(`https://yepper-backend.onrender.com/api/websites/website/${websiteId}`);
//             const categoriesResponse = await axios.get(`https://yepper-backend.onrender.com/api/ad-categories/${websiteId}`);
//             setWebsite(websiteResponse.data);
//             setCategories(categoriesResponse.data.categories);
//             setLoading(false);
//         } catch (error) {
//             console.error('Error fetching website data:', error);
//             setLoading(false);
//         }
//     };

//     const handleAddSpace = (categoryId) => {
//         const selectedCategory = categories.find(cat => cat._id === categoryId);
//         if (selectedCategory) {
//             navigate(`/websites/${websiteId}/categories/${categoryId}/add-space`, {
//                 state: {
//                     selectedCategories: { [categoryId]: selectedCategory },
//                     prices: { [categoryId]: selectedCategory.price },
//                     customCategory: null
//                 }
//             });
//         }
//     };

//     const fetchSpacesForCategory = async (categoryId) => {
//         try {
//             const response = await axios.get(`https://yepper-backend.onrender.com/api/ad-spaces/${categoryId}`);
//             setSpaces(prev => ({
//                 ...prev,
//                 [categoryId]: response.data
//             }));
//         } catch (error) {
//             console.error('Error fetching spaces:', error);
//         }
//     };

//     const handleCategoryClick = async (categoryId) => {
//         if (expandedCategory === categoryId) {
//             setExpandedCategory(null);
//         } else {
//             setExpandedCategory(categoryId);
//             if (!spaces[categoryId]) {
//                 await fetchSpacesForCategory(categoryId);
//             }
//         }
//     };

//     const handleOpenForm = () => {
//         setForm(true);
//         setResult(false);
//     };

//     const handleCloseForm = () => {
//         setForm(false);
//         setResult(true);
//         fetchWebsiteData();
//     };
    

//     if (loading) {
//         return (
//             <div className="flex items-center justify-center min-h-screen">
//                 <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
//             </div>
//         );
//     }

//     return (
//         <>
//             {result && (
//                 <div className="container mx-auto px-4 py-8 max-w-6xl">
//                     <Card className="mb-8">
//                         <CardHeader className="flex flex-row items-center gap-4">
//                             {website?.imageUrl ? (
//                                 <img src={website.imageUrl} alt={website.websiteName} className="w-16 h-16 object-contain rounded-lg" />
//                             ) : (
//                                 <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
//                                     <Globe className="w-8 h-8 text-gray-400" />
//                                 </div>
//                             )}
//                             <div className="flex-1">
//                                 <CardTitle className="text-2xl">{website?.websiteName}</CardTitle>
//                                 <a 
//                                     href={website?.websiteLink} 
//                                     target="_blank" 
//                                     rel="noopener noreferrer"
//                                     className="text-blue-600 hover:underline flex items-center gap-1 mt-1"
//                                 >
//                                     <Globe className="w-4 h-4" />
//                                     Visit Website
//                                 </a>
//                             </div>
//                             <Button 
//                                 className="gap-2"
//                                 onClick={handleOpenForm}
//                             >
//                                 <Plus className="w-4 h-4" />
//                                 Add Category
//                             </Button>
//                         </CardHeader>
//                     </Card>

//                     <div className="space-y-6">
//                         {categories.map((category) => (
//                             <Card key={category._id}>
//                                 <CardHeader 
//                                     className="cursor-pointer hover:bg-gray-50"
//                                     onClick={() => handleCategoryClick(category._id)}
//                                 >
//                                     <div className="flex items-center justify-between">
//                                         <div className="flex items-center gap-3">
//                                             <Layout className="w-5 h-5 text-green-500" />
//                                             <h2 className="text-lg font-semibold">{category.categoryName}</h2>
//                                             <span className="text-sm text-gray-500">${category.price}</span>
//                                         </div>
//                                         <div className="flex items-center gap-2">
//                                             <Button 
//                                                 variant="outline" 
//                                                 size="sm"
//                                                 onClick={(e) => {
//                                                     e.stopPropagation();
//                                                     handleAddSpace(category._id);
//                                                 }}
//                                                 className="gap-2"
//                                             >
//                                                 <Plus className="w-4 h-4" />
//                                                 Add Space
//                                             </Button>
//                                             <span className={`transform transition-transform ${expandedCategory === category._id ? 'rotate-180' : ''}`}>
//                                                 ▼
//                                             </span>
//                                         </div>
//                                     </div>
//                                 </CardHeader>

//                                 {expandedCategory === category._id && (
//                                     <CardContent>
//                                         {spaces[category._id]?.map((space) => (
//                                             <div key={space._id} className="border-t border-gray-100 pt-6 first:border-0 first:pt-0">
//                                                 <div className="mb-4">
//                                                     <h3 className="font-medium text-gray-700">Space Type: {space.spaceType}</h3>
//                                                     <p className="text-sm text-gray-600">Price: ${space.price}</p>
//                                                     <p className="text-sm text-gray-600">Availability: {space.availability}</p>
//                                                 </div>

//                                                 <div className="relative">
//                                                     <div 
//                                                         className="flex transition-transform duration-300 ease-in-out"
//                                                         style={{ transform: `translateX(-${(currentSlides[space._id] || 0) * 100}%)` }}
//                                                     >
//                                                         {['HTML', 'JavaScript', 'PHP', 'Python'].map((lang) => (
//                                                             <div key={lang} className="w-full flex-shrink-0 p-4 bg-gray-50 rounded-lg">
//                                                                 <div className="flex justify-between items-center mb-2">
//                                                                     <h4 className="font-medium text-gray-700">{lang}</h4>
//                                                                     <Button
//                                                                         variant="ghost"
//                                                                         size="sm"
//                                                                         onClick={() => navigator.clipboard.writeText(space.apiCodes[lang])}
//                                                                     >
//                                                                         <Copy className="w-4 h-4" />
//                                                                     </Button>
//                                                                 </div>
//                                                                 <pre className="text-sm bg-white p-3 rounded border overflow-x-auto">
//                                                                     {space.apiCodes[lang] || `No ${lang} code available`}
//                                                                 </pre>
//                                                             </div>
//                                                         ))}
//                                                     </div>

//                                                     <Button
//                                                         variant="outline"
//                                                         size="icon"
//                                                         className="absolute left-2 top-1/2 transform -translate-y-1/2"
//                                                         onClick={() => setCurrentSlides(prev => ({
//                                                             ...prev,
//                                                             [space._id]: ((prev[space._id] || 0) - 1 + 4) % 4
//                                                         }))}
//                                                     >
//                                                         <ChevronLeft className="w-4 h-4" />
//                                                     </Button>
//                                                     <Button
//                                                         variant="outline"
//                                                         size="icon"
//                                                         className="absolute right-2 top-1/2 transform -translate-y-1/2"
//                                                         onClick={() => setCurrentSlides(prev => ({
//                                                         ...prev,
//                                                         [space._id]: ((prev[space._id] || 0) + 1) % 4
//                                                         }))}
//                                                     >
//                                                         <ChevronRight className="w-4 h-4" />
//                                                     </Button>
//                                                 </div>
//                                             </div>
//                                         ))}

//                                         {(!spaces[category._id] || spaces[category._id].length === 0) && (
//                                             <div className="text-center py-8">
//                                                 <Layout className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//                                                 <h3 className="text-lg font-medium text-gray-700">No Spaces Yet</h3>
//                                                 <p className="text-gray-500">Add your first space to this category.</p>
//                                             </div>
//                                         )}
//                                     </CardContent>
//                                 )}
//                             </Card>
//                         ))}

//                         {categories.length === 0 && (
//                             <Card>
//                                 <CardContent className="text-center py-12">
//                                 <Layout className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//                                 <h3 className="text-lg font-medium text-gray-700">No Categories Yet</h3>
//                                 <p className="text-gray-500">Start by adding your first category.</p>
//                                 </CardContent>
//                             </Card>
//                         )}
//                     </div>
//                 </div>
//             )}
//             {form && (
//                 <div className='bg-red p-4 sm:p-6 space-y-4 sm:space-y-6'>
//                     <div className="flex justify-between items-center">
//                         <h2 className="text-lg sm:text-xl font-bold text-gray-800">Create Ad Categories</h2>
//                         <button 
//                             type="button"
//                             onClick={handleCloseForm} 
//                             className="text-gray-500 hover:text-red-500"
//                         >
//                             <XCircle className="w-5 h-5 sm:w-6 sm:h-6" />
//                         </button>
//                     </div>
//                     <div className='categories-box'>
//                         <CategoriesComponents onSubmitSuccess={handleCloseForm} />
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// };

// export default WebsiteDetails;