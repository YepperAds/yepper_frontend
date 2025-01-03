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
// import SpacesComponents from './spacesContent';

// const WebsiteDetails = () => {
//     const { websiteId } = useParams();
//     const navigate = useNavigate();
//     const [result, setResult] = useState(true);
//     const [website, setWebsite] = useState(null);
//     const [categories, setCategories] = useState([]);
//     const [expandedCategory, setExpandedCategory] = useState(null);
//     const [categoriesForm, setCategoriesForm] = useState(false);
//     const [spacesForm, setSpacesForm] = useState(false);
//     const [selectedCategory, setSelectedCategory] = useState(null);
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

//     const handleOpenCategoriesForm = () => {
//         setCategoriesForm(true);
//         setResult(false);
//     };

//     const handleOpenSpacesForm = (category) => {
//         setSelectedCategory({
//             [category.categoryName]: {
//                 id: category._id,
//                 name: category.categoryName,
//                 price: category.price
//             }
//         });
//         setSpacesForm(true);
//         setResult(false);
//     };

//     const handleCloseCategoriesForm = () => {
//         setCategoriesForm(false);
//         setResult(true);
//         fetchWebsiteData();
//     };

//     const handleCloseSpacesForm = () => {
//         setSpacesForm(false);
//         setResult(true);
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
//                                 onClick={handleOpenCategoriesForm}
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
//                                                 className="gap-2"
//                                                 onClick={(e) => {
//                                                     e.stopPropagation();
//                                                     handleOpenSpacesForm(category);
//                                                 }}
//                                             >
//                                                 <Plus className="w-4 h-4" />
//                                                 Add Spaces
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
//                                     <Layout className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//                                     <h3 className="text-lg font-medium text-gray-700">No Categories Yet</h3>
//                                     <p className="text-gray-500">Start by adding your first category.</p>
//                                 </CardContent>
//                             </Card>
//                         )}
//                     </div>
//                 </div>
//             )}

//             {categoriesForm && (
//                 <div className='bg-red p-4 sm:p-6 space-y-4 sm:space-y-6'>
//                     <div className="flex justify-between items-center">
//                         <h2 className="text-lg sm:text-xl font-bold text-gray-800">Create Ad Categories</h2>
//                         <button 
//                             type="button"
//                             onClick={handleCloseCategoriesForm} 
//                             className="text-gray-500 hover:text-red-500"
//                         >
//                             <XCircle className="w-5 h-5 sm:w-6 sm:h-6" />
//                         </button>
//                     </div>
//                     <div className='categories-box'>
//                         <CategoriesComponents onSubmitSuccess={handleCloseCategoriesForm} />
//                     </div>
//                 </div>
//             )}

//             {spacesForm && (
//                 <div className='bg-red p-4 sm:p-6 space-y-4 sm:space-y-6'>
//                     <div className="flex justify-between items-center">
//                         <h2 className="text-lg sm:text-xl font-bold text-gray-800">Create Webpage Spaces</h2>
//                         <button 
//                             type="button"
//                             onClick={handleCloseSpacesForm} 
//                             className="text-gray-500 hover:text-red-500"
//                         >
//                             <XCircle className="w-5 h-5 sm:w-6 sm:h-6" />
//                         </button>
//                     </div>
//                     <div className='categories-box'>
//                         <SpacesComponents 
//                             selectedCategories={selectedCategory}
//                             prices={{[selectedCategory?.name]: selectedCategory?.price}}
//                         />
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// };

// export default WebsiteDetails;










import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { 
    Layout, 
    Globe, 
    X,
    Plus, 
    ChevronDown,
    ExternalLink,
    DollarSign
} from 'lucide-react';
import { Button } from "./components/button";
import { Card, CardHeader, CardTitle, CardContent } from "./components/card";
import CategoriesComponents from './categoriesComponents';
import SpacesComponents from './spacesContent';
import CodeDisplay from './components/codeDisplay';

const WebsiteDetails = () => {
  const { websiteId } = useParams();
    const [result, setResult] = useState(true);
    const [website, setWebsite] = useState(null);
    const [categories, setCategories] = useState([]);
    const [expandedCategory, setExpandedCategory] = useState(null);
    const [categoriesForm, setCategoriesForm] = useState(false);
    const [spacesForm, setSpacesForm] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [spaces, setSpaces] = useState({});
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
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
                    <p className="text-gray-600">Loading website details...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            {result && (
                <div className="container mx-auto px-4 max-w-6xl">
                    <Card className="mb-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <CardHeader className="flex flex-row items-center gap-6 p-6">
                            {website?.imageUrl ? (
                                <img src={website.imageUrl} alt={website.websiteName} className="w-20 h-20 object-contain rounded-xl shadow-sm" />
                            ) : (
                                <div className="w-20 h-20 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl flex items-center justify-center shadow-sm">
                                    <Globe className="w-10 h-10 text-primary" />
                                </div>
                            )}
                            <div className="flex-1">
                                <CardTitle className="text-3xl text-center font-bold mb-2 text-blue-950">{website?.websiteName}</CardTitle>
                                <a 
                                    href={website?.websiteLink} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                                >
                                    <Globe className="w-4 h-4 text-[#FF4500]" />
                                    <span className='text-gray-600'>Visit Website</span>
                                    <ExternalLink className="w-3 h-3 text-gray-600" />
                                </a>
                            </div>
                            <Button 
                                className="flex items-center justify-center gap-1 px-3 py-2 bg-[#FF4500] hover:bg-orange-500 hover:-translate-y-0.5 text-white sm:text-base font-bold rounded-md transition-all duration-300"
                                onClick={handleOpenCategoriesForm}
                            >
                                <Plus className="w-4 h-4" />
                                Add Category
                            </Button>
                        </CardHeader>
                    </Card>

                    <div className="space-y-6">
                        {categories.map((category) => (
                            <Card key={category._id} className="shadow-md hover:shadow-lg transition-shadow duration-300">
                                <CardHeader 
                                    className="cursor-pointer hover:bg-gray-50/80 transition-colors"
                                    onClick={() => handleCategoryClick(category._id)}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="p-2 rounded-lg bg-primary/10">
                                                <Layout className="w-5 h-5 text-[#FF4500]" />
                                            </div>
                                            <div>
                                                <h2 className="text-xl font-semibold mb-1 text-gray-600">{category.categoryName}</h2>
                                                <div className="flex justify-center items-center gap-1 px-2 py-1 rounded-full text-xs font-medium text-white bg-blue-600">
                                                    <DollarSign className="w-3 h-3" />
                                                    {category.price}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Button 
                                                variant="outline"
                                                className="flex items-center justify-center gap-1 px-3 py-2 bg-[#FF4500] hover:bg-orange-500 hover:-translate-y-0.5 text-white sm:text-base font-bold rounded-md transition-all duration-300"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleOpenSpacesForm(category);
                                                }}
                                            >
                                                <Plus className="w-4 h-4" />
                                                Add Spaces
                                            </Button>
                                            <div className={`transform transition-transform duration-300 ${expandedCategory === category._id ? 'rotate-180' : ''}`}>
                                                <ChevronDown className="w-5 h-5 text-gray-400" />
                                            </div>
                                        </div>
                                    </div>
                                </CardHeader>

                                {expandedCategory === category._id && (
                                    <CardContent>
                                        {spaces[category._id]?.map((space) => (
                                            <div key={space._id} className="py-6 first:pt-0">
                                                <div className="flex justify-between items-start mb-4">
                                                    <div>
                                                        <h3 className="text-lg font-semibold text-gray-600 mb-1">
                                                            {space.spaceType}
                                                        </h3>
                                                        <div className="flex gap-3">
                                                            <div className="flex justify-center items-center gap-1 px-2 py-1 rounded-full text-xs font-medium text-blue-600 bg-blue-100">
                                                                <DollarSign className="w-3 h-3" />
                                                                {space.price}
                                                            </div>
                                                            <div className="flex justify-center items-center gap-1 px-2 py-1 rounded-full text-xs font-medium text-blue-600 bg-blue-100">
                                                                {space.availability}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <CodeDisplay codes={space.apiCodes} />
                                            </div>
                                        ))}

                                        {(!spaces[category._id] || spaces[category._id].length === 0) && (
                                            <div className="py-12 text-center">
                                                <div className="p-3 rounded-full bg-gray-100 w-fit mx-auto mb-4">
                                                    <Layout className="w-8 h-8 text-gray-400" />
                                                </div>
                                                <h3 className="text-lg font-semibold text-gray-900 mb-1">No Spaces Yet</h3>
                                                <p className="text-gray-500">Add your first space to this category</p>
                                            </div>
                                        )}
                                    </CardContent>
                                )}
                            </Card>
                        ))}

                        {categories.length === 0 && (
                            <Card className="shadow-md">
                                <CardContent className="py-16 text-center">
                                    <div className="p-4 rounded-full bg-gray-100 w-fit mx-auto mb-4">
                                        <Layout className="w-12 h-12 text-gray-400" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No Categories Yet</h3>
                                    <p className="text-gray-500 mb-6">Start by adding your first category</p>
                                    <Button 
                                        onClick={handleOpenCategoriesForm}
                                        className="gap-2"
                                    >
                                        <Plus className="w-4 h-4" />
                                        Add First Category
                                    </Button>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            )}

            {/* Forms modal styling */}
            {(categoriesForm || spacesForm) && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl w-full max-w-2xl shadow-xl">
                        <div className="p-6 border-b">
                            <div className="flex justify-between items-center">
                                <h2 className="text-2xl font-bold text-blue-950">
                                    {categoriesForm ? 'Create Ad Categories' : 'Create Webpage Spaces'}
                                </h2>
                                <button
                                    variant="ghost"
                                    size="icon"
                                    onClick={categoriesForm ? handleCloseCategoriesForm : handleCloseSpacesForm}
                                    className="p-1 hover:bg-gray-100 rounded-full"
                                >
                                    <X className="w-5 h-5 text-gray-600" />
                                </button>
                            </div>
                        </div>
                        <div className="p-6">
                            {categoriesForm && (
                                <CategoriesComponents onSubmitSuccess={handleCloseCategoriesForm} />
                            )}
                            {spacesForm && (
                                <SpacesComponents 
                                    selectedCategories={selectedCategory}
                                    prices={{[selectedCategory?.name]: selectedCategory?.price}}
                                />
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WebsiteDetails;