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
//     DollarSign,
//     Users,
//     FileText
// } from 'lucide-react';
// import { Button } from "./components/button";
// import { Card, CardHeader, CardTitle, CardContent } from "./components/card";
// import CategoriesComponents from './categoriesComponents';
// import CodeDisplay from './components/codeDisplay';
// import LoadingSpinner from '../../components/LoadingSpinner';
// import Header from '../../components/backToPreviousHeader';

// const WebsiteDetails = () => {
//     const { websiteId } = useParams();
//     const [result, setResult] = useState(true);
//     const [website, setWebsite] = useState(null);
//     const [categories, setCategories] = useState([]);
//     const [expandedCategory, setExpandedCategory] = useState(null);
//     const [categoriesForm, setCategoriesForm] = useState(false);
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

//     const handleCategoryClick = (categoryId) => {
//         setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
//     };

//     const handleOpenCategoriesForm = () => {
//         setCategoriesForm(true);
//         setResult(false);
//     };

//     const handleCloseCategoriesForm = () => {
//         setCategoriesForm(false);
//         setResult(true);
//         fetchWebsiteData();
//     };

//     if (loading) {
//         return <LoadingSpinner />;
//     }

//     return (
//         <div>
//             <div className="min-h-screen bg-gray-50">
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
//                                     <CardTitle className="text-3xl text-center font-bold mb-2 text-blue-950">
//                                         {website?.websiteName}
//                                     </CardTitle>
//                                     <a 
//                                         href={website?.websiteLink} 
//                                         target="_blank" 
//                                         rel="noopener noreferrer"
//                                         className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
//                                     >
//                                         <Globe className="w-4 h-4 text-[#FF4500]" />
//                                         <span className="text-gray-600">Visit Website</span>
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
//                                                     <h2 className="text-xl font-semibold mb-1 text-gray-600">
//                                                         {category.categoryName}
//                                                     </h2>
//                                                     <div className="flex gap-2">
//                                                         <div className="flex justify-center items-center gap-1 px-2 py-1 rounded-full text-xs font-medium text-white bg-blue-600">
//                                                             {/* <DollarSign className="w-3 h-3" /> */}
//                                                             <span className="text-sm">RWF</span>
//                                                             {category.price}
//                                                         </div>
//                                                         <div className="flex justify-center items-center gap-1 px-2 py-1 rounded-full text-xs font-medium text-emerald-600 bg-emerald-100">
//                                                             <Users className="w-3 h-3" />
//                                                             {category.userCount} users
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                             <div className="flex items-center gap-3">
//                                                 <div className={`transform transition-transform duration-300 ${expandedCategory === category._id ? 'rotate-180' : ''}`}>
//                                                     <ChevronDown className="w-5 h-5 text-gray-400" />
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </CardHeader>

//                                     {expandedCategory === category._id && (
//                                         <CardContent>
//                                             <div className="py-6">
//                                                 <div className="space-y-6">
//                                                     <div>
//                                                         <h3 className="text-lg font-semibold text-gray-600 mb-2">
//                                                             Space Type
//                                                         </h3>
//                                                         <div className="flex gap-2">
//                                                             <div className="flex justify-center items-center gap-1 px-2 py-1 rounded-full text-xs font-medium text-blue-600 bg-blue-100">
//                                                                 {category.spaceType}
//                                                             </div>
//                                                         </div>
//                                                     </div>

//                                                     {category.instructions && (
//                                                         <div>
//                                                             <h3 className="text-lg font-semibold text-gray-600 mb-2">
//                                                                 Instructions
//                                                             </h3>
//                                                             <div className="bg-gray-50 rounded-lg p-4">
//                                                                 <div className="flex gap-2 items-start">
//                                                                     <FileText className="w-5 h-5 text-gray-400 mt-1" />
//                                                                     <p className="text-gray-600">
//                                                                         {category.instructions}
//                                                                     </p>
//                                                                 </div>
//                                                             </div>
//                                                         </div>
//                                                     )}

//                                                     <div>
//                                                         <h3 className="text-lg font-semibold text-gray-600 mb-4">
//                                                             Integration Codes
//                                                         </h3>
//                                                         <CodeDisplay codes={category.apiCodes} />
//                                                     </div>
//                                                 </div>
//                                             </div>
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
//                                         <h3 className="text-xl font-semibold text-gray-900 mb-2">
//                                             No Categories Yet
//                                         </h3>
//                                         <p className="text-gray-500 mb-6">
//                                             Start by adding your first category
//                                         </p>
//                                         <Button 
//                                             onClick={handleOpenCategoriesForm}
//                                             className="flex items-center gap-2 bg-[#FF4500] hover:bg-orange-500 text-white"
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

//             {categoriesForm && (
//                 <div className="fixed inset-0 z-50">
//                     <div className="absolute inset-0 bg-black/50" />
                    
//                     <div className="relative w-full h-full bg-white overflow-y-auto">
//                         <div className="sticky top-0 z-10 bg-white border-b">
//                             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                                 <div className="flex justify-between items-center h-16">
//                                     <h2 className="text-2xl font-bold text-blue-950">
//                                         Create Ad Categories
//                                     </h2>
//                                     <button
//                                         onClick={handleCloseCategoriesForm}
//                                         className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//                                         aria-label="Close modal"
//                                     >
//                                         <X className="w-6 h-6 text-gray-600" />
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//                             <div className="w-full max-w-3xl mx-auto">
//                                 <CategoriesComponents onSubmitSuccess={handleCloseCategoriesForm} />
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
    FileText,
    Loader2,
    Code,
    AlertCircle,
    Monitor,
    Smartphone,
    Tablet
} from 'lucide-react';
import { Button } from "./components/button";
import { Card, CardHeader, CardTitle, CardContent } from "./components/card";
import CategoriesComponents from './categoriesComponents';
import CodeDisplay from './components/codeDisplay';
import Header from '../../components/backToPreviousHeader';

const WebsiteDetails = () => {
    const { websiteId } = useParams();
    const [result, setResult] = useState(true);
    const [website, setWebsite] = useState(null);
    const [categories, setCategories] = useState([]);
    const [expandedCategory, setExpandedCategory] = useState(null);
    const [categoriesForm, setCategoriesForm] = useState(false);
    const [loading, setLoading] = useState(true);
    const [fetchError, setFetchError] = useState(null);

    useEffect(() => {
        fetchWebsiteData();
    }, [websiteId]);

    const fetchWebsiteData = async () => {
        setLoading(true);
        setFetchError(null);

        try {
            const websiteResponse = await axios.get(`https://yepper-backend.onrender.com/api/websites/website/${websiteId}`);
            const categoriesResponse = await axios.get(`https://yepper-backend.onrender.com/api/ad-categories/${websiteId}`);
            setWebsite(websiteResponse.data);
            setCategories(categoriesResponse.data.categories);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching website data:', error);
            setFetchError(error.message || 'Failed to load website data');
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

    // Get space type icon based on type
    const getSpaceTypeIcon = (type) => {
        const typeLC = type.toLowerCase();
        if (typeLC.includes('mobile')) return <Smartphone className="w-4 h-4" />;
        if (typeLC.includes('tablet')) return <Tablet className="w-4 h-4" />;
        return <Monitor className="w-4 h-4" />;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
                <Loader2 className="w-12 h-12 text-orange-500 animate-spin" />
                <p className="mt-4 text-gray-600">Loading website information...</p>
            </div>
        );
    }

    if (fetchError) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <Card className="max-w-md w-full">
                    <CardContent className="flex flex-col items-center p-6">
                        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
                        <h2 className="text-xl font-bold mb-2">Failed to Load Data</h2>
                        <p className="text-gray-600 mb-4 text-center">{fetchError}</p>
                        <Button onClick={fetchWebsiteData}>Try Again</Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div>
            <div className="min-h-screen bg-gray-50">
                <Header />
                {result && (
                    <div className="container mx-auto px-4 max-w-6xl">
                        {/* Website Header Card */}
                        <Card className="mb-8 shadow-lg">
                            <CardHeader className="flex flex-row items-center gap-6 p-6">
                                {website?.imageUrl ? (
                                    <img src={website.imageUrl} alt={website.websiteName} className="w-20 h-20 object-contain rounded-xl shadow-sm" />
                                ) : (
                                    <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center shadow-sm">
                                        <Globe className="w-10 h-10 text-orange-500" />
                                    </div>
                                )}
                                <div className="flex-1">
                                    <CardTitle className="text-3xl font-bold mb-2 text-blue-950">
                                        {website?.websiteName}
                                    </CardTitle>
                                    <a 
                                        href={website?.websiteLink} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-gray-600 hover:text-orange-500 transition-colors"
                                    >
                                        <Globe className="w-4 h-4 text-orange-500" />
                                        <span>Visit Website</span>
                                        <ExternalLink className="w-3 h-3" />
                                    </a>
                                </div>
                                <Button 
                                    className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2"
                                    onClick={handleOpenCategoriesForm}
                                >
                                    <Plus className="w-4 h-4 mr-2" />
                                    Add Space
                                </Button>
                            </CardHeader>
                        </Card>

                        {/* Web Spaces Display */}
                        {categories.length > 0 ? (
                            <div className="mb-6">
                                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                                    <Layout className="w-6 h-6 text-orange-500 mr-2" />
                                    Ad Spaces ({categories.length})
                                </h2>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {categories.map((category) => (
                                        <Card 
                                            key={category._id} 
                                            className={`shadow-md overflow-hidden transition-all duration-300 ${
                                                expandedCategory === category._id ? 'ring-2 ring-orange-400' : 'hover:shadow-lg'
                                            }`}
                                        >
                                            {/* Web Space Preview Header */}
                                            <div className="h-6 w-full bg-gray-200 border-b flex items-center px-2">
                                                <div className="flex space-x-1">
                                                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                                                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                                </div>
                                            </div>
                                            
                                            {/* Main Content - Visual representation of the web space */}
                                            <div className="relative bg-gray-100 p-4 border-b border-gray-200">
                                                <div className="flex justify-between mb-3">
                                                    <span className="text-xs font-medium px-2 py-1 rounded bg-blue-100 text-blue-800 inline-flex items-center gap-1">
                                                        {getSpaceTypeIcon(category.spaceType)}
                                                        {category.spaceType}
                                                    </span>
                                                    <span className="text-xs font-medium px-2 py-1 rounded bg-orange-100 text-orange-800">
                                                        ID: {category._id.substring(0, 6)}
                                                    </span>
                                                </div>
                                                
                                                {/* Visual Web Space Representation */}
                                                <div className="flex flex-col items-center justify-center h-32 bg-white rounded-lg border border-gray-200 overflow-hidden">
                                                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100 relative">
                                                        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                                                            <div className="w-3/4 h-1/2 border-2 border-dashed border-orange-300 flex items-center justify-center rounded">
                                                                <Layout className="w-8 h-8 text-orange-400" />
                                                            </div>
                                                        </div>
                                                        <div className="z-10 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-md shadow-sm">
                                                            <span className="text-sm font-medium text-orange-700">{category.categoryName}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            {/* Info Section */}
                                            <CardHeader 
                                                className="cursor-pointer hover:bg-gray-50 transition-colors p-5"
                                                onClick={() => handleCategoryClick(category._id)}
                                            >
                                                <div className="flex flex-col">
                                                    <div className="flex justify-between items-center">
                                                        <h3 className="text-lg font-semibold text-gray-800">
                                                            {category.categoryName}
                                                        </h3>
                                                        <div 
                                                            className={`p-1.5 rounded-full bg-gray-100 transition-transform duration-300 ${
                                                                expandedCategory === category._id ? 'rotate-180 bg-orange-100' : ''
                                                            }`}
                                                        >
                                                            <ChevronDown className={`w-4 h-4 ${expandedCategory === category._id ? 'text-orange-500' : 'text-gray-500'}`} />
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="grid grid-cols-2 gap-2 mt-4">
                                                        <div className="flex items-center justify-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-blue-800 bg-blue-50 border border-blue-100">
                                                            <DollarSign className="w-4 h-4" />
                                                            ${category.price}
                                                        </div>
                                                        <div className="flex items-center justify-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-emerald-800 bg-emerald-50 border border-emerald-100">
                                                            <Users className="w-4 h-4" />
                                                            {category.userCount} users
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardHeader>

                                            {expandedCategory === category._id && (
                                                <CardContent className="border-t px-5 pt-4 pb-5 bg-gray-50">
                                                    {category.instructions && (
                                                        <div className="mb-5">
                                                            <h4 className="text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide flex items-center">
                                                                <FileText className="w-4 h-4 mr-1.5 text-orange-500" />
                                                                Instructions
                                                            </h4>
                                                            <div className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm">
                                                                <p className="text-sm text-gray-600">
                                                                    {category.instructions}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    )}
                                            
                                                    <div>
                                                        <h4 className="text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide flex items-center">
                                                            <Code className="w-4 h-4 mr-1.5 text-orange-500" />
                                                            Integration Code
                                                        </h4>
                                                        <div className="mt-2">
                                                            <CodeDisplay codes={category.apiCodes} />
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            )}
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <Card className="shadow-md border border-dashed border-gray-200">
                                <CardContent className="py-16 text-center">
                                    <div className="p-4 rounded-full bg-gray-100 w-fit mx-auto mb-4">
                                        <Layout className="w-12 h-12 text-gray-400" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                        No Ad Spaces Yet
                                    </h3>
                                    <p className="text-gray-500 mb-6">
                                        Start by adding your first ad space
                                    </p>
                                    <Button 
                                        onClick={handleOpenCategoriesForm}
                                        className="bg-orange-500 hover:bg-orange-600 text-white"
                                    >
                                        <Plus className="w-4 h-4 mr-2" />
                                        Add First Ad Space
                                    </Button>
                                </CardContent>
                            </Card>
                        )}
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
                                        Create Ad Space
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

                        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
                            <div className="w-full mx-auto">
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