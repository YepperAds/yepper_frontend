// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { 
//     Layout, 
//     Globe, 
//     X,
//     Plus, 
//     ChevronDown,
//     ExternalLink,
//     DollarSign
// } from 'lucide-react';
// import { Button } from "./components/button";
// import { Card, CardHeader, CardTitle, CardContent } from "./components/card";
// import CategoriesComponents from './categoriesComponents';
// import SpacesComponents from './spacesContent';
// import CodeDisplay from './components/codeDisplay';
// import LoadingSpinner from '../../components/LoadingSpinner';
// import Header from '../../components/backToPreviousHeader'

// const WebsiteDetails = () => {
//   const { websiteId } = useParams();
//     const [result, setResult] = useState(true);
//     const [website, setWebsite] = useState(null);
//     const [categories, setCategories] = useState([]);
//     const [expandedCategory, setExpandedCategory] = useState(null);
//     const [categoriesForm, setCategoriesForm] = useState(false);
//     const [spacesForm, setSpacesForm] = useState(false);
//     const [selectedCategory, setSelectedCategory] = useState(null);
//     const [spaces, setSpaces] = useState({});
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         fetchWebsiteData();
//     }, [websiteId]);

//     const fetchWebsiteData = async () => {
//         try {
//             const websiteResponse = await axios.get(`http://localhost:5000/api/websites/website/${websiteId}`);
//             const categoriesResponse = await axios.get(`http://localhost:5000/api/ad-categories/${websiteId}`);
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
//             const response = await axios.get(`http://localhost:5000/api/ad-spaces/${categoryId}`);
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
//             <LoadingSpinner />
//         );
//     }

//     return (
//         <div>
//             <div className="ad-waitlist min-h-screen">
//                 <Header />
//                 {result && (
//                     <div className="container mx-auto px-4 max-w-6xl">
//                         <Card className="mb-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
//                             <CardHeader className="flex flex-row items-center gap-6 p-6">
//                                 {website?.imageUrl ? (
//                                     <img src={website.imageUrl} alt={website.websiteName} className="w-20 h-20 object-contain rounded-xl shadow-sm" />
//                                 ) : (
//                                     <div className="w-20 h-20 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl flex items-center justify-center shadow-sm">
//                                         <Globe className="w-10 h-10 text-primary" />
//                                     </div>
//                                 )}
//                                 <div className="flex-1">
//                                     <CardTitle className="text-3xl text-center font-bold mb-2 text-blue-950">{website?.websiteName}</CardTitle>
//                                     <a 
//                                         href={website?.websiteLink} 
//                                         target="_blank" 
//                                         rel="noopener noreferrer"
//                                         className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
//                                     >
//                                         <Globe className="w-4 h-4 text-[#FF4500]" />
//                                         <span className='text-gray-600'>Visit Website</span>
//                                         <ExternalLink className="w-3 h-3 text-gray-600" />
//                                     </a>
//                                 </div>
//                                 <Button 
//                                     className="flex items-center justify-center gap-1 px-3 py-2 bg-[#FF4500] hover:bg-orange-500 hover:-translate-y-0.5 text-white sm:text-base font-bold rounded-md transition-all duration-300"
//                                     onClick={handleOpenCategoriesForm}
//                                 >
//                                     <Plus className="w-4 h-4" />
//                                     Add Category
//                                 </Button>
//                             </CardHeader>
//                         </Card>

//                         <div className="space-y-6">
//                             {categories.map((category) => (
//                                 <Card key={category._id} className="shadow-md hover:shadow-lg transition-shadow duration-300">
//                                     <CardHeader 
//                                         className="cursor-pointer hover:bg-gray-50/80 transition-colors"
//                                         onClick={() => handleCategoryClick(category._id)}
//                                     >
//                                         <div className="flex items-center justify-between">
//                                             <div className="flex items-center gap-4">
//                                                 <div className="p-2 rounded-lg bg-primary/10">
//                                                     <Layout className="w-5 h-5 text-[#FF4500]" />
//                                                 </div>
//                                                 <div>
//                                                     <h2 className="text-xl font-semibold mb-1 text-gray-600">{category.categoryName}</h2>
//                                                     <div className="flex justify-center items-center gap-1 px-2 py-1 rounded-full text-xs font-medium text-white bg-blue-600">
//                                                         <DollarSign className="w-3 h-3" />
//                                                         {category.price}
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                             <div className="flex items-center gap-3">
//                                                 <Button 
//                                                     variant="outline"
//                                                     className="flex items-center justify-center gap-1 px-3 py-2 bg-[#FF4500] hover:bg-orange-500 hover:-translate-y-0.5 text-white sm:text-base font-bold rounded-md transition-all duration-300"
//                                                     onClick={(e) => {
//                                                         e.stopPropagation();
//                                                         handleOpenSpacesForm(category);
//                                                     }}
//                                                 >
//                                                     <Plus className="w-4 h-4" />
//                                                     Add Spaces
//                                                 </Button>
//                                                 <div className={`transform transition-transform duration-300 ${expandedCategory === category._id ? 'rotate-180' : ''}`}>
//                                                     <ChevronDown className="w-5 h-5 text-gray-400" />
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </CardHeader>

//                                     {expandedCategory === category._id && (
//                                         <CardContent>
//                                             {spaces[category._id]?.map((space) => (
//                                                 <div key={space._id} className="py-6 first:pt-0">
//                                                     <div className="flex justify-between items-start mb-4">
//                                                         <div>
//                                                             <h3 className="text-lg font-semibold text-gray-600 mb-1">
//                                                                 {space.spaceType}
//                                                             </h3>
//                                                             <div className="flex gap-3">
//                                                                 <div className="flex justify-center items-center gap-1 px-2 py-1 rounded-full text-xs font-medium text-blue-600 bg-blue-100">
//                                                                     <DollarSign className="w-3 h-3" />
//                                                                     {space.price}
//                                                                 </div>
//                                                                 <div className="flex justify-center items-center gap-1 px-2 py-1 rounded-full text-xs font-medium text-blue-600 bg-blue-100">
//                                                                     {space.availability}
//                                                                 </div>
//                                                             </div>
//                                                         </div>
//                                                     </div>

//                                                     <CodeDisplay codes={space.apiCodes} />
//                                                 </div>
//                                             ))}

//                                             {(!spaces[category._id] || spaces[category._id].length === 0) && (
//                                                 <div className="py-12 text-center">
//                                                     <div className="p-3 rounded-full bg-gray-100 w-fit mx-auto mb-4">
//                                                         <Layout className="w-8 h-8 text-gray-400" />
//                                                     </div>
//                                                     <h3 className="text-lg font-semibold text-gray-900 mb-1">No Spaces Yet</h3>
//                                                     <p className="text-gray-500">Add your first space to this category</p>
//                                                 </div>
//                                             )}
//                                         </CardContent>
//                                     )}
//                                 </Card>
//                             ))}

//                             {categories.length === 0 && (
//                                 <Card className="shadow-md">
//                                     <CardContent className="py-16 text-center">
//                                         <div className="p-4 rounded-full bg-gray-100 w-fit mx-auto mb-4">
//                                             <Layout className="w-12 h-12 text-gray-400" />
//                                         </div>
//                                         <h3 className="text-xl font-semibold text-gray-900 mb-2">No Categories Yet</h3>
//                                         <p className="text-gray-500 mb-6">Start by adding your first category</p>
//                                         <Button 
//                                             onClick={handleOpenCategoriesForm}
//                                             className="gap-2"
//                                         >
//                                             <Plus className="w-4 h-4" />
//                                             Add First Category
//                                         </Button>
//                                     </CardContent>
//                                 </Card>
//                             )}
//                         </div>
//                     </div>
//                 )}
//             </div>

//             {(categoriesForm || spacesForm) && (
//                 <div className="fixed inset-0 z-50">
//                     <div className="absolute inset-0 bg-black/50" />
                    
//                     <div className="relative w-full h-full bg-white overflow-y-auto overflow-x-auto">
//                         <div className="sticky top-0 z-10 bg-white border-b min-w-[320px]">
//                             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                                 <div className="flex justify-between items-center h-16">
//                                     <h2 className="text-2xl font-bold text-blue-950 whitespace-nowrap">
//                                         {categoriesForm ? 'Create Ad Categories' : 'Create Webpage Spaces'}
//                                     </h2>
//                                     <button
//                                         onClick={categoriesForm ? handleCloseCategoriesForm : handleCloseSpacesForm}
//                                         className="p-2 hover:bg-gray-100 rounded-full transition-colors shrink-0"
//                                         aria-label="Close modal"
//                                     >
//                                         <X className="w-6 h-6 text-gray-600" />
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-w-[320px]">
//                             <div className="w-full max-w-3xl mx-auto">
//                                 {categoriesForm && (
//                                     <CategoriesComponents onSubmitSuccess={handleCloseCategoriesForm} />
//                                 )}
//                                 {spacesForm && (
//                                     <SpacesComponents 
//                                         selectedCategories={selectedCategory}
//                                         prices={{[selectedCategory?.name]: selectedCategory?.price}}
//                                     />
//                                 )}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
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
    DollarSign,
    Users,
    FileText
} from 'lucide-react';
import { Button } from "./components/button";
import { Card, CardHeader, CardTitle, CardContent } from "./components/card";
import CategoriesComponents from './categoriesComponents';
import CodeDisplay from './components/codeDisplay';
import LoadingSpinner from '../../components/LoadingSpinner';
import Header from '../../components/backToPreviousHeader';

const WebsiteDetails = () => {
    const { websiteId } = useParams();
    const [result, setResult] = useState(true);
    const [website, setWebsite] = useState(null);
    const [categories, setCategories] = useState([]);
    const [expandedCategory, setExpandedCategory] = useState(null);
    const [categoriesForm, setCategoriesForm] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchWebsiteData();
    }, [websiteId]);

    const fetchWebsiteData = async () => {
        try {
            const websiteResponse = await axios.get(`http://localhost:5000/api/websites/website/${websiteId}`);
            const categoriesResponse = await axios.get(`http://localhost:5000/api/ad-categories/${websiteId}`);
            setWebsite(websiteResponse.data);
            setCategories(categoriesResponse.data.categories);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching website data:', error);
            setLoading(false);
        }
    };

    const handleCategoryClick = (categoryId) => {
        setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
    };

    const handleOpenCategoriesForm = () => {
        setCategoriesForm(true);
        setResult(false);
    };

    const handleCloseCategoriesForm = () => {
        setCategoriesForm(false);
        setResult(true);
        fetchWebsiteData();
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <div>
            <div className="min-h-screen bg-gray-50">
                <Header />
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
                                    <CardTitle className="text-3xl text-center font-bold mb-2 text-blue-950">
                                        {website?.websiteName}
                                    </CardTitle>
                                    <a 
                                        href={website?.websiteLink} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                                    >
                                        <Globe className="w-4 h-4 text-[#FF4500]" />
                                        <span className="text-gray-600">Visit Website</span>
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
                                                    <h2 className="text-xl font-semibold mb-1 text-gray-600">
                                                        {category.categoryName}
                                                    </h2>
                                                    <div className="flex gap-2">
                                                        <div className="flex justify-center items-center gap-1 px-2 py-1 rounded-full text-xs font-medium text-white bg-blue-600">
                                                            <DollarSign className="w-3 h-3" />
                                                            {category.price}
                                                        </div>
                                                        <div className="flex justify-center items-center gap-1 px-2 py-1 rounded-full text-xs font-medium text-emerald-600 bg-emerald-100">
                                                            <Users className="w-3 h-3" />
                                                            {category.userCount} users
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className={`transform transition-transform duration-300 ${expandedCategory === category._id ? 'rotate-180' : ''}`}>
                                                    <ChevronDown className="w-5 h-5 text-gray-400" />
                                                </div>
                                            </div>
                                        </div>
                                    </CardHeader>

                                    {expandedCategory === category._id && (
                                        <CardContent>
                                            <div className="py-6">
                                                <div className="space-y-6">
                                                    <div>
                                                        <h3 className="text-lg font-semibold text-gray-600 mb-2">
                                                            Space Type
                                                        </h3>
                                                        <div className="flex gap-2">
                                                            <div className="flex justify-center items-center gap-1 px-2 py-1 rounded-full text-xs font-medium text-blue-600 bg-blue-100">
                                                                {category.spaceType}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {category.instructions && (
                                                        <div>
                                                            <h3 className="text-lg font-semibold text-gray-600 mb-2">
                                                                Instructions
                                                            </h3>
                                                            <div className="bg-gray-50 rounded-lg p-4">
                                                                <div className="flex gap-2 items-start">
                                                                    <FileText className="w-5 h-5 text-gray-400 mt-1" />
                                                                    <p className="text-gray-600">
                                                                        {category.instructions}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}

                                                    <div>
                                                        <h3 className="text-lg font-semibold text-gray-600 mb-4">
                                                            Integration Codes
                                                        </h3>
                                                        <CodeDisplay codes={category.apiCodes} />
                                                    </div>
                                                </div>
                                            </div>
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
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                            No Categories Yet
                                        </h3>
                                        <p className="text-gray-500 mb-6">
                                            Start by adding your first category
                                        </p>
                                        <Button 
                                            onClick={handleOpenCategoriesForm}
                                            className="flex items-center gap-2 bg-[#FF4500] hover:bg-orange-500 text-white"
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
            </div>

            {categoriesForm && (
                <div className="fixed inset-0 z-50">
                    <div className="absolute inset-0 bg-black/50" />
                    
                    <div className="relative w-full h-full bg-white overflow-y-auto">
                        <div className="sticky top-0 z-10 bg-white border-b">
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                <div className="flex justify-between items-center h-16">
                                    <h2 className="text-2xl font-bold text-blue-950">
                                        Create Ad Categories
                                    </h2>
                                    <button
                                        onClick={handleCloseCategoriesForm}
                                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                        aria-label="Close modal"
                                    >
                                        <X className="w-6 h-6 text-gray-600" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                            <div className="w-full max-w-3xl mx-auto">
                                <CategoriesComponents onSubmitSuccess={handleCloseCategoriesForm} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WebsiteDetails;