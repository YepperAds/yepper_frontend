import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
    Tablet,
    ArrowLeft,
    PlusCircle
} from 'lucide-react';
import CodeDisplay from './components/codeDisplay';
import CategoriesComponents from './categoriesComponents';
import LoadingSpinner from '../../components/LoadingSpinner'

const WebsiteDetails = () => {
    const navigate = useNavigate();
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
            <LoadingSpinner />
        );
    }

    if (fetchError) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="max-w-md w-full backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl overflow-hidden p-8">
                    <div className="flex flex-col items-center">
                        <AlertCircle className="w-12 h-12 text-red-400 mb-4" />
                        <h2 className="text-xl font-bold mb-2">Failed to Load Data</h2>
                        <p className="text-white/70 mb-6 text-center">{fetchError}</p>
                        <button 
                            onClick={fetchWebsiteData}
                            className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium transition-all duration-300 hover:from-blue-500 hover:to-indigo-500"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            </div>
        );
    }

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
                    <div className="bg-white/10 px-4 py-1 rounded-full text-xs font-medium tracking-widest">WEBSITE DETAILS</div>
                </div>
            </header>
            
            {result && (
                <main className="max-w-7xl mx-auto px-6 py-12">
                    {/* Website Title Section */}
                    <div className="mb-16">
                        <div className="flex items-center justify-center mb-6">
                            <div className="h-px w-12 bg-blue-500 mr-6"></div>
                            <span className="text-blue-400 text-sm font-medium uppercase tracking-widest">Website Manager</span>
                            <div className="h-px w-12 bg-blue-500 ml-6"></div>
                        </div>
                        
                        <h1 className="text-center text-5xl font-bold mb-6 tracking-tight">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                                {website?.websiteName || "Website Details"}
                            </span>
                        </h1>
                        
                        {website?.websiteLink && (
                            <div className="flex justify-center mb-8">
                                <a 
                                    href={website.websiteLink} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex items-center space-x-2 text-white/70 hover:text-blue-400 transition-colors"
                                >
                                    <Globe className="w-5 h-5" />
                                    <span>{website.websiteLink}</span>
                                    <ExternalLink className="w-4 h-4" />
                                </a>
                            </div>
                        )}
                    </div>
                    
                    {/* Add Space Button */}
                    <div className="flex justify-center mb-12">
                        <button
                            onClick={handleOpenCategoriesForm}
                            className="group relative h-14 px-8 rounded-xl bg-gradient-to-r from-orange-600 to-rose-600 text-white font-medium overflow-hidden transition-all duration-300"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-rose-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <span className="relative z-10 flex items-center justify-center">
                                <PlusCircle size={16} className="mr-2" />
                                <span className="uppercase tracking-wider">Add New Ad Space</span>
                            </span>
                        </button>
                    </div>

                    {/* Website Spaces */}
                    <div className="mb-12">
                        <h2 className="flex items-center text-2xl font-bold mb-8">
                            <Layout className="w-6 h-6 text-orange-400 mr-3" />
                            <span className="text-white">Ad Spaces</span>
                            <span className="ml-3 text-lg px-2 py-0.5 rounded-full bg-white/10">{categories.length}</span>
                        </h2>
                        
                        {categories.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {categories.map((category) => (
                                    <div 
                                        key={category._id}
                                        className={`group relative backdrop-blur-md ${
                                            expandedCategory === category._id 
                                            ? 'bg-gradient-to-b from-blue-900/40 to-blue-900/20' 
                                            : 'bg-gradient-to-b from-gray-900/40 to-gray-900/20'
                                        } rounded-3xl overflow-hidden border border-white/10 transition-all duration-500`}
                                        style={{
                                            boxShadow: expandedCategory === category._id 
                                                ? '0 0 40px rgba(59, 130, 246, 0.3)' 
                                                : '0 0 0 rgba(0, 0, 0, 0)'
                                        }}
                                    >
                                        {/* Web Space Header */}
                                        <div 
                                            className="p-8 cursor-pointer"
                                            onClick={() => handleCategoryClick(category._id)}
                                        >
                                            <div className="flex items-center mb-6">
                                                <div className="relative">
                                                    <div className="absolute inset-0 rounded-full bg-orange-500 blur-md opacity-40"></div>
                                                    <div className="relative p-3 rounded-full bg-gradient-to-r from-orange-600 to-orange-400">
                                                        <Layout className="w-10 h-10 text-white" size={24} />
                                                    </div>
                                                </div>
                                                <div className="ml-4 flex-1">
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <div className="uppercase text-xs font-semibold text-blue-400 tracking-widest mb-1">
                                                                {category.spaceType}
                                                            </div>
                                                            <h3 className="text-2xl font-bold">{category.categoryName}</h3>
                                                        </div>
                                                        <div 
                                                            className={`p-2 rounded-full bg-white/5 transition-transform duration-300 ${
                                                                expandedCategory === category._id ? 'rotate-180 bg-blue-500/20' : ''
                                                            }`}
                                                        >
                                                            <ChevronDown className="w-5 h-5 text-white" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            {/* Metrics */}
                                            <div className="grid grid-cols-2 gap-4 mb-4">
                                                <div className="backdrop-blur-sm bg-white/5 rounded-xl p-4 flex items-center">
                                                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mr-3">
                                                        <DollarSign size={20} className="text-blue-400" />
                                                    </div>
                                                    <div>
                                                        <p className="text-white/70 text-sm">Price</p>
                                                        <p className="text-xl font-bold">${category.price}</p>
                                                    </div>
                                                </div>
                                                <div className="backdrop-blur-sm bg-white/5 rounded-xl p-4 flex items-center">
                                                    <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center mr-3">
                                                        <Users size={20} className="text-purple-400" />
                                                    </div>
                                                    <div>
                                                        <p className="text-white/70 text-sm">Users</p>
                                                        <p className="text-xl font-bold">{category.userCount}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        {/* Expanded Section */}
                                        {expandedCategory === category._id && (
                                            <div className="px-8 pb-8 pt-2 border-t border-white/10 bg-black/20">
                                                {category.instructions && (
                                                    <div className="mb-6">
                                                        <h4 className="text-sm uppercase tracking-wider text-blue-400 font-medium mb-3 flex items-center">
                                                            <FileText className="w-4 h-4 mr-2" />
                                                            Instructions
                                                        </h4>
                                                        <div className="backdrop-blur-sm bg-white/5 rounded-xl p-4 border border-white/10">
                                                            <p className="text-white/80">
                                                                {category.instructions}
                                                            </p>
                                                        </div>
                                                    </div>
                                                )}
                                                
                                                <div>
                                                    <h4 className="text-sm uppercase tracking-wider text-blue-400 font-medium mb-3 flex items-center">
                                                        <Code className="w-4 h-4 mr-2" />
                                                        Integration Code
                                                    </h4>
                                                    <div className="backdrop-blur-sm bg-white/5 rounded-xl overflow-hidden border border-white/10">
                                                        <CodeDisplay codes={category.apiCodes} />
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="backdrop-blur-md bg-white/5 rounded-3xl border border-white/10 p-12 text-center">
                                <div className="relative mx-auto w-20 h-20 mb-6">
                                    <div className="absolute inset-0 rounded-full bg-orange-500 blur-md opacity-40"></div>
                                    <div className="relative h-full w-full rounded-full bg-gradient-to-r from-orange-600 to-orange-400 flex items-center justify-center">
                                        <Layout className="w-10 h-10 text-white" />
                                    </div>
                                </div>
                                <h3 className="text-2xl font-bold mb-3">No Ad Spaces Yet</h3>
                                <p className="text-white/70 mb-8 max-w-md mx-auto">
                                    Create your first ad space to start monetizing your website with targeted advertisements.
                                </p>
                                <button
                                    onClick={handleOpenCategoriesForm}
                                    className="group relative h-12 px-6 rounded-xl bg-gradient-to-r from-orange-600 to-rose-600 text-white font-medium overflow-hidden transition-all duration-300"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-rose-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <span className="relative z-10 flex items-center justify-center">
                                        <PlusCircle size={16} className="mr-2" />
                                        <span className="uppercase tracking-wider">Create First Ad Space</span>
                                    </span>
                                </button>
                            </div>
                        )}
                    </div>
                    
                    <div className="flex justify-center mt-16">
                        <div className="rounded-full px-6 py-3 bg-white/5 backdrop-blur-md flex items-center space-x-2">
                            <span className="text-white/60 text-sm">Need guidance?</span>
                            <button className="text-blue-400 text-sm font-medium hover:text-blue-300 transition-colors">
                                Request a consultation
                            </button>
                        </div>
                    </div>
                </main>
            )}
            
            {/* Category Form Modal */}
            {categoriesForm && (
                <div className="fixed inset-0 z-50">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
                    
                    <div className="relative w-full h-full bg-black overflow-y-auto">
                        <div className="sticky top-0 z-10 bg-black/90 backdrop-blur-xl border-b border-white/10">
                            <div className="max-w-7xl mx-auto px-6">
                                <div className="flex justify-between items-center h-20">
                                    <h2 className="text-2xl font-bold">
                                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                                            Create Ad Space
                                        </span>
                                    </h2>
                                    <button
                                        onClick={handleCloseCategoriesForm}
                                        className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                                    >
                                        <X className="w-6 h-6 text-white/80" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="max-w-7xl mx-auto px-6 py-12">
                            <CategoriesComponents onSubmitSuccess={handleCloseCategoriesForm} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WebsiteDetails;



















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
//     FileText,
//     Loader2,
//     Code,
//     AlertCircle,
//     Monitor,
//     Smartphone,
//     Tablet
// } from 'lucide-react';
// import { Button } from "./components/button";
// import { Card, CardHeader, CardTitle, CardContent } from "./components/card";
// import CategoriesComponents from './categoriesComponents';
// import CodeDisplay from './components/codeDisplay';
// import Header from '../../components/backToPreviousHeader';

// const WebsiteDetails = () => {
//     const { websiteId } = useParams();
//     const [result, setResult] = useState(true);
//     const [website, setWebsite] = useState(null);
//     const [categories, setCategories] = useState([]);
//     const [expandedCategory, setExpandedCategory] = useState(null);
//     const [categoriesForm, setCategoriesForm] = useState(false);
//     const [loading, setLoading] = useState(true);
//     const [fetchError, setFetchError] = useState(null);

//     useEffect(() => {
//         fetchWebsiteData();
//     }, [websiteId]);

//     const fetchWebsiteData = async () => {
//         setLoading(true);
//         setFetchError(null);

//         try {
//             const websiteResponse = await axios.get(`https://yepper-backend.onrender.com/api/websites/website/${websiteId}`);
//             const categoriesResponse = await axios.get(`https://yepper-backend.onrender.com/api/ad-categories/${websiteId}`);
//             setWebsite(websiteResponse.data);
//             setCategories(categoriesResponse.data.categories);
//             setLoading(false);
//         } catch (error) {
//             console.error('Error fetching website data:', error);
//             setFetchError(error.message || 'Failed to load website data');
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

//     // Get space type icon based on type
//     const getSpaceTypeIcon = (type) => {
//         const typeLC = type.toLowerCase();
//         if (typeLC.includes('mobile')) return <Smartphone className="w-4 h-4" />;
//         if (typeLC.includes('tablet')) return <Tablet className="w-4 h-4" />;
//         return <Monitor className="w-4 h-4" />;
//     };

//     if (loading) {
//         return (
//             <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
//                 <Loader2 className="w-12 h-12 text-orange-500 animate-spin" />
//                 <p className="mt-4 text-gray-600">Loading website information...</p>
//             </div>
//         );
//     }

//     if (fetchError) {
//         return (
//             <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//                 <Card className="max-w-md w-full">
//                     <CardContent className="flex flex-col items-center p-6">
//                         <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
//                         <h2 className="text-xl font-bold mb-2">Failed to Load Data</h2>
//                         <p className="text-gray-600 mb-4 text-center">{fetchError}</p>
//                         <Button onClick={fetchWebsiteData}>Try Again</Button>
//                     </CardContent>
//                 </Card>
//             </div>
//         );
//     }

//     return (
//         <div>
//             <div className="min-h-screen bg-gray-50">
//                 <Header />
//                 {result && (
//                     <div className="container mx-auto px-4 max-w-6xl">
//                         {/* Website Header Card */}
//                         <Card className="mb-8 shadow-lg">
//                             <CardHeader className="flex flex-row items-center gap-6 p-6">
//                                 {website?.imageUrl ? (
//                                     <img src={website.imageUrl} alt={website.websiteName} className="w-20 h-20 object-contain rounded-xl shadow-sm" />
//                                 ) : (
//                                     <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center shadow-sm">
//                                         <Globe className="w-10 h-10 text-orange-500" />
//                                     </div>
//                                 )}
//                                 <div className="flex-1">
//                                     <CardTitle className="text-3xl font-bold mb-2 text-blue-950">
//                                         {website?.websiteName}
//                                     </CardTitle>
//                                     <a 
//                                         href={website?.websiteLink} 
//                                         target="_blank" 
//                                         rel="noopener noreferrer"
//                                         className="inline-flex items-center gap-2 text-gray-600 hover:text-orange-500 transition-colors"
//                                     >
//                                         <Globe className="w-4 h-4 text-orange-500" />
//                                         <span>Visit Website</span>
//                                         <ExternalLink className="w-3 h-3" />
//                                     </a>
//                                 </div>
//                                 <Button 
//                                     className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2"
//                                     onClick={handleOpenCategoriesForm}
//                                 >
//                                     <Plus className="w-4 h-4 mr-2" />
//                                     Add Space
//                                 </Button>
//                             </CardHeader>
//                         </Card>

//                         {/* Web Spaces Display */}
//                         {categories.length > 0 ? (
//                             <div className="mb-6">
//                                 <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
//                                     <Layout className="w-6 h-6 text-orange-500 mr-2" />
//                                     Ad Spaces ({categories.length})
//                                 </h2>
                                
//                                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                                     {categories.map((category) => (
//                                         <Card 
//                                             key={category._id} 
//                                             className={`shadow-md overflow-hidden transition-all duration-300 ${
//                                                 expandedCategory === category._id ? 'ring-2 ring-orange-400' : 'hover:shadow-lg'
//                                             }`}
//                                         >
//                                             {/* Web Space Preview Header */}
//                                             <div className="h-6 w-full bg-gray-200 border-b flex items-center px-2">
//                                                 <div className="flex space-x-1">
//                                                     <div className="w-2 h-2 rounded-full bg-red-500"></div>
//                                                     <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
//                                                     <div className="w-2 h-2 rounded-full bg-green-500"></div>
//                                                 </div>
//                                             </div>
                                            
//                                             {/* Main Content - Visual representation of the web space */}
//                                             <div className="relative bg-gray-100 p-4 border-b border-gray-200">
//                                                 <div className="flex justify-between mb-3">
//                                                     <span className="text-xs font-medium px-2 py-1 rounded bg-blue-100 text-blue-800 inline-flex items-center gap-1">
//                                                         {getSpaceTypeIcon(category.spaceType)}
//                                                         {category.spaceType}
//                                                     </span>
//                                                     <span className="text-xs font-medium px-2 py-1 rounded bg-orange-100 text-orange-800">
//                                                         ID: {category._id.substring(0, 6)}
//                                                     </span>
//                                                 </div>
                                                
//                                                 {/* Visual Web Space Representation */}
//                                                 <div className="flex flex-col items-center justify-center h-32 bg-white rounded-lg border border-gray-200 overflow-hidden">
//                                                     <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100 relative">
//                                                         <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
//                                                             <div className="w-3/4 h-1/2 border-2 border-dashed border-orange-300 flex items-center justify-center rounded">
//                                                                 <Layout className="w-8 h-8 text-orange-400" />
//                                                             </div>
//                                                         </div>
//                                                         <div className="z-10 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-md shadow-sm">
//                                                             <span className="text-sm font-medium text-orange-700">{category.categoryName}</span>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </div>
                                            
//                                             {/* Info Section */}
//                                             <CardHeader 
//                                                 className="cursor-pointer hover:bg-gray-50 transition-colors p-5"
//                                                 onClick={() => handleCategoryClick(category._id)}
//                                             >
//                                                 <div className="flex flex-col">
//                                                     <div className="flex justify-between items-center">
//                                                         <h3 className="text-lg font-semibold text-gray-800">
//                                                             {category.categoryName}
//                                                         </h3>
//                                                         <div 
//                                                             className={`p-1.5 rounded-full bg-gray-100 transition-transform duration-300 ${
//                                                                 expandedCategory === category._id ? 'rotate-180 bg-orange-100' : ''
//                                                             }`}
//                                                         >
//                                                             <ChevronDown className={`w-4 h-4 ${expandedCategory === category._id ? 'text-orange-500' : 'text-gray-500'}`} />
//                                                         </div>
//                                                     </div>
                                                    
//                                                     <div className="grid grid-cols-2 gap-2 mt-4">
//                                                         <div className="flex items-center justify-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-blue-800 bg-blue-50 border border-blue-100">
//                                                             <DollarSign className="w-4 h-4" />
//                                                             ${category.price}
//                                                         </div>
//                                                         <div className="flex items-center justify-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-emerald-800 bg-emerald-50 border border-emerald-100">
//                                                             <Users className="w-4 h-4" />
//                                                             {category.userCount} users
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </CardHeader>

//                                             {expandedCategory === category._id && (
//                                                 <CardContent className="border-t px-5 pt-4 pb-5 bg-gray-50">
//                                                     {category.instructions && (
//                                                         <div className="mb-5">
//                                                             <h4 className="text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide flex items-center">
//                                                                 <FileText className="w-4 h-4 mr-1.5 text-orange-500" />
//                                                                 Instructions
//                                                             </h4>
//                                                             <div className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm">
//                                                                 <p className="text-sm text-gray-600">
//                                                                     {category.instructions}
//                                                                 </p>
//                                                             </div>
//                                                         </div>
//                                                     )}
                                            
//                                                     <div>
//                                                         <h4 className="text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide flex items-center">
//                                                             <Code className="w-4 h-4 mr-1.5 text-orange-500" />
//                                                             Integration Code
//                                                         </h4>
//                                                         <div className="mt-2">
//                                                             <CodeDisplay codes={category.apiCodes} />
//                                                         </div>
//                                                     </div>
//                                                 </CardContent>
//                                             )}
//                                         </Card>
//                                     ))}
//                                 </div>
//                             </div>
//                         ) : (
//                             <Card className="shadow-md border border-dashed border-gray-200">
//                                 <CardContent className="py-16 text-center">
//                                     <div className="p-4 rounded-full bg-gray-100 w-fit mx-auto mb-4">
//                                         <Layout className="w-12 h-12 text-gray-400" />
//                                     </div>
//                                     <h3 className="text-xl font-semibold text-gray-900 mb-2">
//                                         No Ad Spaces Yet
//                                     </h3>
//                                     <p className="text-gray-500 mb-6">
//                                         Start by adding your first ad space
//                                     </p>
//                                     <Button 
//                                         onClick={handleOpenCategoriesForm}
//                                         className="bg-orange-500 hover:bg-orange-600 text-white"
//                                     >
//                                         <Plus className="w-4 h-4 mr-2" />
//                                         Add First Ad Space
//                                     </Button>
//                                 </CardContent>
//                             </Card>
//                         )}
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
//                                         Create Ad Space
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

//                         <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
//                             <div className="w-full mx-auto">
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