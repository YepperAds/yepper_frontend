// WebsiteDetails.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
    Layout, 
    Globe, 
    X,
    ChevronDown,
    ExternalLink,
    DollarSign,
    Users,
    FileText,
    Code,
    AlertCircle,
    ArrowLeft,
    PlusCircle,
    Trash2,
    Edit,
    Check
} from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';
import CodeDisplay from './components/codeDisplay';
import CategoriesComponents from './categoriesComponents';
import LoadingSpinner from '../../components/LoadingSpinner'
import DeleteCategoryModal from './components/DeleteCategoryModal';  // Import the new modal

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
    const [categoryToDelete, setCategoryToDelete] = useState(null);
    const [isEditingWebsiteName, setIsEditingWebsiteName] = useState(false);
    const [tempWebsiteName, setTempWebsiteName] = useState('');
    const [editingUserCount, setEditingUserCount] = useState(null);
    const [newUserCount, setNewUserCount] = useState('');
    const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
    const [currentCategory, setCurrentCategory] = useState(null);
    const [selectedLanguage, setSelectedLanguage] = useState('english');

    useEffect(() => {
        fetchWebsiteData();
    }, [websiteId]);

    // Available languages for selection
    const languages = [
        { value: 'english', label: 'English' },
        { value: 'french', label: 'French (Français)' },
        { value: 'kinyarwanda', label: 'Kinyarwanda' },
        { value: 'kiswahili', label: 'Swahili' },
        { value: 'chinese', label: 'Chinese (中文)' },
        { value: 'spanish', label: 'Spanish (Español)' }
    ];

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

    const handleUpdateWebsiteName = async () => {
        if (!tempWebsiteName.trim()) return;

        try {
            const response = await axios.patch(`https://yepper-backend.onrender.com/api/websites/${websiteId}/name`, {
                websiteName: tempWebsiteName.trim()
            });
            
            // Update local state
            setWebsite(prevWebsite => ({
                ...prevWebsite,
                websiteName: response.data.websiteName
            }));
            
            // Exit edit mode
            setIsEditingWebsiteName(false);
        } catch (error) {
            console.error('Error updating website name:', error);
            // Optionally show an error message
        }
    };

    const handleStartEditWebsiteName = () => {
        setTempWebsiteName(website.websiteName);
        setIsEditingWebsiteName(true);
    };

    const handleCancelEditWebsiteName = () => {
        setIsEditingWebsiteName(false);
    };

    const handleCategoryClick = (categoryId) => {
        setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
    };

    const handleOpenCategoriesForm = () => {
        setCategoriesForm(true);
        setResult(false);
    };

    const handleUserCountEdit = (category) => {
        setEditingUserCount(category._id);
        setNewUserCount(category.userCount.toString());
    };

    const handleUserCountSave = async (categoryId) => {
        try {
            const parsedCount = parseInt(newUserCount, 10);
            
            // Validate input
            if (isNaN(parsedCount) || parsedCount < 0) {
                toast.error('Please enter a valid positive number');
                return;
            }

            // Call backend to reset user count
            const response = await axios.put(`https://yepper-backend.onrender.com/api/ad-categories/${categoryId}/reset-user-count`, {
                newUserCount: parsedCount
            });

            // Update local state
            const updatedCategories = categories.map(cat => 
                cat._id === categoryId 
                    ? { ...cat, userCount: response.data.category.userCount } 
                    : cat
            );
            setCategories(updatedCategories);

            // Reset editing state
            setEditingUserCount(null);
            setNewUserCount('');

            toast.success('User count updated successfully');
        } catch (error) {
            console.error('Error updating user count:', error);
            
            const errorMessage = error.response?.data?.message || 'Failed to update user count';
            toast.error(errorMessage);
        }
    };

    const handleCloseCategoriesForm = () => {
        setCategoriesForm(false);
        setResult(true);
        fetchWebsiteData();
    };

    const handleDeleteCategory = (category) => {
        setCategoryToDelete(category);
    };

    const handleDeleteSuccess = () => {
        // Close the delete modal
        setCategoryToDelete(null);
        // Refresh the website data
        fetchWebsiteData();
    };

    const handleOpenLanguageModal = (category) => {
        setCurrentCategory(category);
        setSelectedLanguage(category.defaultLanguage || 'english');
        setIsLanguageModalOpen(true);
    };

    const handleSaveLanguage = async () => {
        if (!currentCategory) return;
        
        try {
            const response = await axios.patch(
                `https://yepper-backend.onrender.com/api/ad-categories/category/${currentCategory._id}/language`,
                { defaultLanguage: selectedLanguage }
            );
            
            // Update the local state with the new data
            setCategories(categories.map(cat => 
                cat._id === currentCategory._id 
                    ? { ...cat, defaultLanguage: selectedLanguage } 
                    : cat
            ));
            
            // Close the modal
            setIsLanguageModalOpen(false);
            setCurrentCategory(null);
            
            // Optional: Show success message
            toast.success('Default language updated successfully!');
        } catch (error) {
            console.error('Error updating language:', error);
            toast.error('Failed to update default language');
        }
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

            <Toaster 
                position="top-right" 
                reverseOrder={false} 
                containerStyle={{ zIndex: 9999 }}
            />
            
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
                                {isEditingWebsiteName ? (
                                    <div className="flex items-center gap-2">
                                        <input 
                                            type="text"
                                            value={tempWebsiteName}
                                            onChange={(e) => setTempWebsiteName(e.target.value)}
                                            className="text-3xl font-bold text-blue-950 w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            autoFocus
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') handleUpdateWebsiteName();
                                                if (e.key === 'Escape') handleCancelEditWebsiteName();
                                            }}
                                        />
                                        <button 
                                            onClick={handleUpdateWebsiteName}
                                            className="text-green-500 hover:bg-green-100 p-2 rounded-full"
                                            aria-label="Save website name"
                                        >
                                            <Check className="w-6 h-6" />
                                        </button>
                                        <button 
                                            onClick={handleCancelEditWebsiteName}
                                            className="text-red-500 hover:bg-red-100 p-2 rounded-full"
                                            aria-label="Cancel editing"
                                        >
                                            <X className="w-6 h-6" />
                                        </button>
                                    </div>
                                ) : (
                                    <div 
                                        className="flex items-center gap-2 group cursor-pointer"
                                        onClick={handleStartEditWebsiteName}
                                    >
                                        <span className="text-3xl text-center font-bold mb-2 text-blue-950">
                                            {website?.websiteName}
                                        </span>
                                        <Edit 
                                            className="w-5 h-5 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200" 
                                        />
                                    </div>
                                )}
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
                                        className={`backdrop-blur-md overflow-hidden border border-white/10 transition-all duration-500${
                                            expandedCategory === category._id 
                                            ? 'bg-gradient-to-b from-blue-900/40 to-blue-900/20' 
                                            : 'bg-gradient-to-b from-gray-900/40 to-gray-900/20'
                                        }`}
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
                                                    

                                                    {editingUserCount === category._id ? (
                                                        <div className="flex items-center gap-2">
                                                            <input 
                                                                type="number" 
                                                                value={newUserCount}
                                                                onChange={(e) => setNewUserCount(e.target.value)}
                                                                onKeyDown={(e) => {
                                                                    if (e.key === 'Enter') {
                                                                        handleUserCountSave(category._id);
                                                                    } else if (e.key === 'Escape') {
                                                                        setEditingUserCount(null);
                                                                        setNewUserCount('');
                                                                    }
                                                                }}
                                                                className="w-20 px-2 py-1 text-blue-900 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                                autoFocus
                                                            />
                                                            <div className="flex gap-1">
                                                                <button 
                                                                    onClick={() => handleUserCountSave(category._id)}
                                                                    className="text-green-500 hover:bg-green-100 p-1 rounded-full"
                                                                    aria-label="Save user count"
                                                                >
                                                                    <Check className="w-5 h-5" />
                                                                </button>
                                                                <button 
                                                                    onClick={() => {
                                                                        setEditingUserCount(null);
                                                                        setNewUserCount('');
                                                                    }}
                                                                    className="text-red-500 hover:bg-red-100 p-1 rounded-full"
                                                                    aria-label="Cancel editing"
                                                                >
                                                                    <X className="w-5 h-5" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="backdrop-blur-sm bg-white/5 rounded-xl p-4 flex items-center"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleUserCountEdit(category)
                                                            }}
                                                        >
                                                            <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center mr-3">
                                                                <Users size={20} className="text-purple-400" />
                                                            </div>
                                                            <div>
                                                                <p className="text-white/70 text-sm">Users</p>
                                                                <p className="text-xl font-bold">{category.userCount}</p>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>

                                                <div 
                                                    className="backdrop-blur-sm bg-white/5 rounded-xl p-4 flex items-center cursor-pointer hover:bg-white/10 transition-colors"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleOpenLanguageModal(category);
                                                    }}
                                                >
                                                    <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center mr-3">
                                                        <Globe size={20} className="text-green-400" />
                                                    </div>
                                                    <div>
                                                        <p className="text-white/70 text-sm">Language</p>
                                                        <p className="text-xl font-bold capitalize">
                                                            {category.defaultLanguage || 'English'}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {isLanguageModalOpen && currentCategory && (
                                            <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50">
                                                <div className="bg-gradient-to-b from-gray-900 to-gray-800 rounded-xl border border-white/10 p-8 max-w-lg w-full">
                                                    <h3 className="text-2xl font-bold mb-6">Set Default Language</h3>
                                                    <p className="text-white/70 mb-6">
                                                        Choose the default language for the "Available Advertising Space" box on your website.
                                                        Visitors will still be able to switch languages, but this will be the initial language shown.
                                                    </p>
                                                    
                                                    <div className="grid grid-cols-2 gap-4 mb-8">
                                                        {languages.map(lang => (
                                                            <div 
                                                                key={lang.value}
                                                                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                                                                    selectedLanguage === lang.value
                                                                        ? 'border-blue-500 bg-blue-500/20'
                                                                        : 'border-white/10 hover:border-white/30'
                                                                }`}
                                                                onClick={() => setSelectedLanguage(lang.value)}
                                                            >
                                                                <div className="flex items-center">
                                                                    {selectedLanguage === lang.value && (
                                                                        <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center mr-2">
                                                                            <Check size={12} className="text-white" />
                                                                        </div>
                                                                    )}
                                                                    <span className="font-medium">{lang.label}</span>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    
                                                    <div className="flex justify-end gap-4">
                                                        <button
                                                            onClick={() => setIsLanguageModalOpen(false)}
                                                            className="px-6 py-2 rounded-lg border border-white/20 hover:bg-white/10 transition-colors"
                                                        >
                                                            Cancel
                                                        </button>
                                                        <button
                                                            onClick={handleSaveLanguage}
                                                            className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors"
                                                        >
                                                            Save
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        
                                        {/* Expanded Section */}
                                        {expandedCategory === category._id && (
                                            <>
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
                                                        <div className="mt-2">
                                                            <CodeDisplay codes={category.apiCodes} />
                                                        </div>
                                                    </div>
                                                    
                                                </div>
                                                <div className="flex p-5">
                                                    {/* Delete button added */}
                                                    <button 
                                                        onClick={(e) => {
                                                            e.stopPropagation(); 
                                                            handleDeleteCategory(category);
                                                        }}
                                                        className="flex items-center justify-center gap-2 text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors"
                                                        aria-label="Delete Category"
                                                    >
                                                        <Trash2 className="w-5 h-5" />
                                                        <span>Delete Space</span>
                                                    </button>
                                                </div>
                                            </>
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
                </main>
            )}

            {/* Deletion Modal */}
            {categoryToDelete && (
                <DeleteCategoryModal 
                    categoryId={categoryToDelete._id}
                    category={categoryToDelete}
                    onDeleteSuccess={handleDeleteSuccess}
                    onCancel={() => setCategoryToDelete(null)}
                />
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