// import React, { useState, useMemo, useEffect } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate, useLocation } from 'react-router-dom';
// import { useClerk } from '@clerk/clerk-react';
// import { 
//     Check, 
//     Image,
//     X,
//     Users,
//     FileText,
//     ArrowRight,
//     Info,
// } from 'lucide-react';
// import { Card, CardHeader, CardTitle, CardContent } from "./components/card";


import React, { useState, useMemo, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useClerk } from '@clerk/clerk-react';
import { 
    Info, 
    Check, 
    Users,
    X,
    FileText,
    ArrowRight,
    Monitor,
    Smartphone,
    Sidebar as SidebarIcon,
    Layers,
    PanelRight,
    PanelLeft,
    AlignJustify,
    PanelBottom,
    PieChart,
    Layout,
    Maximize,
    CircleAlert
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from "./components/card";
import PricingTiers from './components/PricingTiers';
import CategoryInfoModal from './components/CategoryInfoModal';

import AboveTheFold from '../../img/aboveTheFold.png';
import BeneathTitle from '../../img/beneathTitle.png';
import Bottom from '../../img/bottom.png';
import Floating from '../../img/floating.png';
import HeaderPic from '../../img/header.png';
import InFeed from '../../img/inFeed.png';
import InlineContent from '../../img/inlineContent.png';
import LeftRail from '../../img/leftRail.png';
import MobileInterstial from '../../img/mobileInterstitial.png';
import ModalPic from '../../img/modal.png';
import Overlay from '../../img/overlay.png';
import ProFooter from '../../img/proFooter.png';
import RightRail from '../../img/rightRail.png';
import Sidebar from '../../img/sidebar.png';
import StickySidebar from '../../img/stickySidebar.png';

import Header from '../../components/backToPreviousHeader';

const CategoriesCreation = () => {
    const { user } = useClerk();
    const { websiteId } = useParams();
    const { state } = useLocation();
    const navigate = useNavigate();

    const [websiteDetails] = useState(state?.websiteDetails || null);
    // const [selectedCategories, setSelectedCategories] = useState({});
    // const [categoryData, setCategoryData] = useState({});
    // const [activeCategory, setActiveCategory] = useState(null);
    // const [completedCategories, setCompletedCategories] = useState([]);
    // const [activeInfoModal, setActiveInfoModal] = useState(null);

    const [selectedCategories, setSelectedCategories] = useState({});
    const [categoryData, setCategoryData] = useState({});
    const [activeCategory, setActiveCategory] = useState(null);
    const [completedCategories, setCompletedCategories] = useState([]);
    const [activeInfoModal, setActiveInfoModal] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilter, setActiveFilter] = useState('all');

    useEffect(() => {
        if (!websiteId) {
            navigate('/create-website');
            return;
        }

        if (!websiteDetails) {
            const fetchWebsiteDetails = async () => {
                try {
                    const response = await axios.get(`https://yepper-backend.onrender.com/api/websites/${websiteId}`);
                    // Handle the website details...
                } catch (error) {
                    console.error('Failed to fetch website details:', error);
                    navigate('/create-website');
                }
            };
            fetchWebsiteDetails();
        }
    }, [websiteId, websiteDetails, navigate]);

    // const isCategoryDataEmpty = (category) => {
    //     const data = categoryData[category];
    //     return !data || 
    //            (!data.price && !data.userCount && !data.instructions);
    // };

    // useEffect(() => {
    //     completedCategories.forEach(category => {
    //         if (isCategoryDataEmpty(category)) {
    //             setCompletedCategories(prev => 
    //                 prev.filter(cat => cat !== category)
    //             );
    //         }
    //     });
    // }, [categoryData, completedCategories]);

    // const categoryDetails = useMemo(() => ({
    //     aboveTheFold: {
    //         name: 'Above the Fold',
    //         icon: <Image className="w-6 h-6" />,
    //         infoIcon: <Info className="w-5 h-5 text-blue-500 hover:text-blue-600 cursor-pointer" />,
    //         spaceType: "aboveTheFold",
    //     },
    //     beneathTitle: {
    //         name: 'Beneath Title',
    //         icon: <Image className="w-6 h-6" />,
    //         infoIcon: <Info className="w-5 h-5 text-blue-500 hover:text-blue-600 cursor-pointer" />,
    //         spaceType: "beneathTitle",
    //     },
    //     bottom: {
    //         name: 'Bottom',
    //         icon: <Image className="w-6 h-6" />,
    //         infoIcon: <Info className="w-5 h-5 text-blue-500 hover:text-blue-600 cursor-pointer" />,
    //         spaceType: "bottom",
    //     },
    //     floating: {
    //         name: 'Floating',
    //         icon: <Image className="w-6 h-6" />,
    //         infoIcon: <Info className="w-5 h-5 text-blue-500 hover:text-blue-600 cursor-pointer" />,
    //         spaceType: "floating",
    //     },
    //     HeaderPic: {
    //         name: 'Header',
    //         icon: <Image className="w-6 h-6" />,
    //         infoIcon: <Info className="w-5 h-5 text-blue-500 hover:text-blue-600 cursor-pointer" />,
    //         spaceType: "headerPic",
    //     },
    //     inFeed: {
    //         name: 'In Feed',
    //         icon: <Image className="w-6 h-6" />,
    //         infoIcon: <Info className="w-5 h-5 text-blue-500 hover:text-blue-600 cursor-pointer" />,
    //         spaceType: "inFeed",
    //     },
    //     inlineContent: {
    //         name: 'Inline Content',
    //         icon: <Image className="w-6 h-6" />,
    //         infoIcon: <Info className="w-5 h-5 text-blue-500 hover:text-blue-600 cursor-pointer" />,
    //         spaceType: "inlineContent",
    //     },
    //     leftRail: {
    //         name: 'Left Rail',
    //         icon: <Image className="w-6 h-6" />,
    //         infoIcon: <Info className="w-5 h-5 text-blue-500 hover:text-blue-600 cursor-pointer" />,
    //         spaceType: "leftRail",
    //     },
    //     mobileInterstial: {
    //         name: 'Mobile Interstial',
    //         icon: <Image className="w-6 h-6" />,
    //         infoIcon: <Info className="w-5 h-5 text-blue-500 hover:text-blue-600 cursor-pointer" />,
    //         spaceType: "mobileInterstial",
    //     },
    //     modalPic: {
    //         name: 'Modal',
    //         icon: <Image className="w-6 h-6" />,
    //         infoIcon: <Info className="w-5 h-5 text-blue-500 hover:text-blue-600 cursor-pointer" />,
    //         spaceType: "modalPic",
    //     },
    //     overlay: {
    //         name: 'Overlay',
    //         icon: <Image className="w-6 h-6" />,
    //         infoIcon: <Info className="w-5 h-5 text-blue-500 hover:text-blue-600 cursor-pointer" />,
    //         spaceType: "overlay",
    //     },
    //     proFooter: {
    //         name: 'Pro Footer',
    //         icon: <Image className="w-6 h-6" />,
    //         infoIcon: <Info className="w-5 h-5 text-blue-500 hover:text-blue-600 cursor-pointer" />,
    //         spaceType: "proFooter",
    //     },
    //     rightRail: {
    //         name: 'Right Rail',
    //         icon: <Image className="w-6 h-6" />,
    //         infoIcon: <Info className="w-5 h-5 text-blue-500 hover:text-blue-600 cursor-pointer" />,
    //         spaceType: "rightRail",
    //     },
    //     sidebar: {
    //         name: 'Sidebar',
    //         icon: <Image className="w-6 h-6" />,
    //         infoIcon: <Info className="w-5 h-5 text-blue-500 hover:text-blue-600 cursor-pointer" />,
    //         spaceType: "sidebar",
    //     },
    //     stickySidebar: {
    //         name: 'Sticky Sidebar',
    //         icon: <Image className="w-6 h-6" />,
    //         infoIcon: <Info className="w-5 h-5 text-blue-500 hover:text-blue-600 cursor-pointer" />,
    //         spaceType: "stickySidebar",
    //     },

    // }), []);

    const isCategoryDataEmpty = (category) => {
        const data = categoryData[category];
        return !data || 
               (!data.price && !data.userCount && !data.instructions);
    };

    useEffect(() => {
        completedCategories.forEach(category => {
            if (isCategoryDataEmpty(category)) {
                setCompletedCategories(prev => 
                    prev.filter(cat => cat !== category)
                );
            }
        });
    }, [categoryData, completedCategories]);

    const categoryDetails = useMemo(() => ({
        aboveTheFold: {
            name: 'Above the Fold',
            icon: <Layers className="w-6 h-6" />,
            infoIcon: <Info className="w-5 h-5 text-blue-500 hover:text-blue-600 cursor-pointer" />,
            spaceType: "Above The Fold",
            description: "Prime visibility area at the top of webpage before scrolling",
            visualization: "/api/placeholder/300/120",
            category: "primary",
            position: "top",
            image: AboveTheFold
        },
        beneathTitle: {
            name: 'Beneath Title',
            icon: <AlignJustify className="w-6 h-6" />,
            infoIcon: <Info className="w-5 h-5 text-blue-500 hover:text-blue-600 cursor-pointer" />,
            spaceType: "Beneath Title",
            description: "Ad space directly below the page title",
            visualization: "/api/placeholder/300/120",
            category: "content",
            position: "top",
            image: BeneathTitle

        },
        bottom: {
            name: 'Bottom',
            icon: <PanelBottom className="w-6 h-6" />,
            infoIcon: <Info className="w-5 h-5 text-blue-500 hover:text-blue-600 cursor-pointer" />,
            spaceType: "Bottom",
            description: "Ad placement at the bottom of the webpage",
            visualization: "/api/placeholder/300/120",
            category: "secondary",
            position: "bottom",
            image: Bottom
        },
        floating: {
            name: 'Floating',
            icon: <Maximize className="w-6 h-6" />,
            infoIcon: <Info className="w-5 h-5 text-blue-500 hover:text-blue-600 cursor-pointer" />,
            spaceType: "Floating",
            description: "Ads that float over page content, follows user scrolling",
            visualization: "/api/placeholder/300/120",
            category: "special",
            position: "overlay",
            image: Floating
        },
        HeaderPic: {
            name: 'Header',
            icon: <Monitor className="w-6 h-6" />,
            infoIcon: <Info className="w-5 h-5 text-blue-500 hover:text-blue-600 cursor-pointer" />,
            spaceType: "Header",
            description: "Banner ad space in the header section of the website",
            visualization: "/api/placeholder/300/120",
            category: "primary",
            position: "top",
            image: HeaderPic
        },
        inFeed: {
            name: 'In Feed',
            icon: <Layout className="w-6 h-6" />,
            infoIcon: <Info className="w-5 h-5 text-blue-500 hover:text-blue-600 cursor-pointer" />,
            spaceType: "In Feed",
            description: "Native ad placement within content feeds",
            visualization: "/api/placeholder/300/120",
            category: "content",
            position: "middle",
            image: InFeed
        },
        inlineContent: {
            name: 'Inline Content',
            icon: <AlignJustify className="w-6 h-6" />,
            infoIcon: <Info className="w-5 h-5 text-blue-500 hover:text-blue-600 cursor-pointer" />,
            spaceType: "Inline Content",
            description: "Ad placement directly within article text",
            visualization: "/api/placeholder/300/120",
            category: "content",
            position: "middle",
            image: InlineContent
        },
        leftRail: {
            name: 'Left Rail',
            icon: <PanelLeft className="w-6 h-6" />,
            infoIcon: <Info className="w-5 h-5 text-blue-500 hover:text-blue-600 cursor-pointer" />,
            spaceType: "Left Rail",
            description: "Ad space along the left side of the webpage",
            visualization: "/api/placeholder/300/120",
            category: "sidebar",
            position: "left",
            image: LeftRail
        },
        mobileInterstial: {
            name: 'Mobile Interstitial',
            icon: <Smartphone className="w-6 h-6" />,
            infoIcon: <Info className="w-5 h-5 text-blue-500 hover:text-blue-600 cursor-pointer" />,
            spaceType: "Mobile Interstitial",
            description: "Full-screen mobile ads that appear between content",
            visualization: "/api/placeholder/300/120",
            category: "mobile",
            position: "overlay",
            image: MobileInterstial
        },
        modalPic: {
            name: 'Modal',
            icon: <CircleAlert className="w-6 h-6" />,
            infoIcon: <Info className="w-5 h-5 text-blue-500 hover:text-blue-600 cursor-pointer" />,
            spaceType: "modalPic",
            description: "Pop-up ad that appears in a modal window",
            visualization: "/api/placeholder/300/120",
            category: "special",
            position: "overlay",
            image: ModalPic
        },
        overlay: {
            name: 'Overlay',
            icon: <Layers className="w-6 h-6" />,
            infoIcon: <Info className="w-5 h-5 text-blue-500 hover:text-blue-600 cursor-pointer" />,
            spaceType: "overlay",
            description: "Ad that overlays on top of page content",
            visualization: "/api/placeholder/300/120",
            category: "special",
            position: "overlay",
            image: Overlay
        },
        proFooter: {
            name: 'Pro Footer',
            icon: <PanelBottom className="w-6 h-6" />,
            infoIcon: <Info className="w-5 h-5 text-blue-500 hover:text-blue-600 cursor-pointer" />,
            spaceType: "proFooter",
            description: "Premium ad space in the footer section",
            visualization: "/api/placeholder/300/120",
            category: "secondary",
            position: "bottom",
            image: ProFooter
        },
        rightRail: {
            name: 'Right Rail',
            icon: <PanelRight className="w-6 h-6" />,
            infoIcon: <Info className="w-5 h-5 text-blue-500 hover:text-blue-600 cursor-pointer" />,
            spaceType: "rightRail",
            description: "Ad space along the right side of the webpage",
            visualization: "/api/placeholder/300/120",
            category: "sidebar",
            position: "right",
            image: RightRail
        },
        sidebar: {
            name: 'Sidebar',
            icon: <SidebarIcon className="w-6 h-6" />,
            infoIcon: <Info className="w-5 h-5 text-blue-500 hover:text-blue-600 cursor-pointer" />,
            spaceType: "sidebar",
            description: "Ad placement in the website sidebar",
            visualization: "/api/placeholder/300/120",
            category: "sidebar",
            position: "side",
            image: Sidebar
        },
        stickySidebar: {
            name: 'Sticky Sidebar',
            icon: <PieChart className="w-6 h-6" />,
            infoIcon: <Info className="w-5 h-5 text-blue-500 hover:text-blue-600 cursor-pointer" />,
            spaceType: "stickySidebar",
            description: "Sidebar ad that stays visible as user scrolls",
            visualization: "/api/placeholder/300/120",
            category: "sidebar",
            position: "side",
            image: StickySidebar
        },
    }), []);

    const filteredCategories = useMemo(() => {
        return Object.entries(categoryDetails).filter(([key, value]) => {
            const matchesSearch = value.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                    value.description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesFilter = activeFilter === 'all' || value.category === activeFilter;
            return matchesSearch && matchesFilter;
        });
    }, [categoryDetails, searchTerm, activeFilter]);

    const handleInfoClick = (e, category) => {
        e.stopPropagation();
        setActiveInfoModal(category);
    };

    const handleCategorySelect = (category) => {
        setActiveCategory(category);
        if (!selectedCategories[category]) {
            setSelectedCategories(prev => ({
                ...prev,
                [category]: true
            }));
        }
    };

    const handleCloseModal = () => {
        setActiveCategory(null);
    };

    const handleUnselect = (e, category) => {
        e.stopPropagation(); // Prevent modal from opening
        setCompletedCategories(prev => prev.filter(cat => cat !== category));
        setCategoryData(prev => ({
            ...prev,
            [category]: {}
        }));
    };

    const updateCategoryData = (category, field, value) => {
        if (field === 'price') {
            // value will now be an object containing price, tier, and visitorRange
            setCategoryData(prev => ({
                ...prev,
                [category]: {
                    ...prev[category],
                    price: value.price,
                    tier: value.tier,
                    visitorRange: value.visitorRange
                }
            }));
            } else {
                // Handle other fields normally
                setCategoryData(prev => ({
                    ...prev,
                    [category]: {
                        ...prev[category],
                        [field]: value
                    }
            }));
        }
    };

    const handleNext = () => {
        if (activeCategory && !isCategoryDataEmpty(activeCategory)) {
            setCompletedCategories(prev => 
                prev.includes(activeCategory) 
                    ? prev 
                    : [...prev, activeCategory]
            );
        }
        setActiveCategory(null);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
      
        try {
            const categoriesToSubmit = Object.entries(selectedCategories)
                .filter(([category]) => completedCategories.includes(category))
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
                    webOwnerEmail: user?.emailAddresses[0]?.emailAddress,
                    // Add the required fields
                    visitorRange: categoryData[category]?.visitorRange || { min: 0, max: 10000 },
                    tier: categoryData[category]?.tier || 'bronze'
                }));
      
            const responses = await Promise.all(
                categoriesToSubmit.map(async (category) => {
                    const response = await axios.post('https://yepper-backend.onrender.com/api/ad-categories', category);
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

    const renderCategoryModal = () => {
        if (!activeCategory) return null;
        
        const details = categoryDetails[activeCategory];
        return (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
                <Card className="w-full max-h-[90vh] bg-white overflow-hidden flex flex-col">
                    <CardHeader className="bg-orange-500 text-white shrink-0">
                        <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center gap-2 text-lg">
                                {details.icon}
                                <span>{details.name} Ad Space</span>
                            </CardTitle>
                            <button 
                                onClick={handleCloseModal}
                                className="p-1 hover:bg-blue-700 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5 text-white" />
                            </button>
                        </div>
                    </CardHeader>
                    <div className="overflow-y-auto">
                        <CardContent className="space-y-4 pt-4">
                            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                                <div className="md:col-span-2 flex flex-col justify-center">
                                    <div className="bg-gray-100 p-2 rounded-md mb-2">
                                        <img 
                                            src={details.image} 
                                            alt={`${details.name} visualization`}
                                            className="w-48 rounded-md border border-gray-300"
                                        />
                                    </div>
                                    <div className="text-xs text-gray-500 italic">
                                        * Visual representation of ad placement
                                    </div>
                                </div>
                                <div className="md:col-span-3">
                                    <h3 className="font-medium text-gray-900 mb-1">Description:</h3>
                                    <p className="text-sm text-gray-600 mb-3">{details.description}</p>
                                    
                                    <h3 className="font-medium text-gray-900 mb-1">Best For:</h3>
                                    <ul className="list-disc list-inside text-sm text-gray-600 mb-3">
                                        <li>Position: {details.position}</li>
                                        <li>Type: {details.category}</li>
                                    </ul>
                                </div>
                            </div>
                            
                            <div className="border-t pt-3">
                                <h3 className="font-medium text-gray-900 mb-3">Set Your Ad Space Details:</h3>
                                <PricingTiers 
                                    selectedPrice={categoryData[activeCategory] || {}}
                                    onPriceSelect={(price) => updateCategoryData(activeCategory, 'price', price)}
                                />
    
                                <div className="flex items-center gap-2 mt-3">
                                    <Users className="w-4 h-4 text-gray-500" />
                                    <input
                                        type="number"
                                        placeholder="Estimated monthly visitors"
                                        className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                                        value={categoryData[activeCategory]?.userCount || ''}
                                        onChange={(e) => updateCategoryData(activeCategory, 'userCount', e.target.value)}
                                    />
                                </div>
    
                                <div className="flex items-center gap-2 mt-3">
                                    <FileText className="w-4 h-4 text-gray-500" />
                                    <textarea
                                        placeholder="Additional instructions (size requirements, restrictions, etc.)"
                                        className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                                        value={categoryData[activeCategory]?.instructions || ''}
                                        onChange={(e) => updateCategoryData(activeCategory, 'instructions', e.target.value)}
                                        rows={2}
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end pt-3">
                                <button
                                    type="button"
                                    onClick={handleNext}
                                    className="flex items-center justify-center gap-1 px-3 py-2 bg-[#FF4500] hover:bg-orange-500 hover:-translate-y-0.5 text-white sm:text-base font-bold rounded-md transition-all duration-300"
                                >
                                    Save & Continue
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </CardContent>
                    </div>
                </Card>
            </div>
        );
    };

    const renderInfoModal = () => (
        <CategoryInfoModal 
            isOpen={!!activeInfoModal}
            onClose={() => setActiveInfoModal(null)}
            category={activeInfoModal}
        />
    );

    const categoryFilters = [
        { id: 'all', name: 'All Spaces' },
        { id: 'primary', name: 'Primary' },
        { id: 'secondary', name: 'Secondary' },
        { id: 'sidebar', name: 'Sidebar' },
        { id: 'content', name: 'Content' },
        { id: 'special', name: 'Special' },
        { id: 'mobile', name: 'Mobile' },
    ];

    return (
        <>
            <Header/>
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="bg-orange-500 text-white p-6 rounded-lg shadow-lg mb-8 text-center">
                    <h1 className="text-3xl font-bold">Select Ad Spaces for Your Website</h1>
                    <p className="mt-2 opacity-80">Choose the locations where you want to display ads on your website</p>
                </div>
                
                <div className="mb-6 flex flex-col md:flex-row gap-4">
                    <div className="w-full md:w-1/3">
                        <input
                            type="text"
                            placeholder="Search ad spaces..."
                            className="px-4 py-2 border rounded-full w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="w-full md:w-2/3 flex overflow-x-auto pb-2 gap-2">
                        {categoryFilters.map(filter => (
                            <button
                                key={filter.id}
                                onClick={() => setActiveFilter(filter.id)}
                                className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                                    activeFilter === filter.id
                                        ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                            >
                                {filter.name}
                            </button>
                        ))}
                    </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                    <div className="text-sm font-medium text-gray-500 mb-4">
                        {completedCategories.length > 0 ? (
                            <div className="flex items-center gap-2">
                                <span>Selected {completedCategories.length} ad spaces</span>
                                <span className="inline-block px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                                    {completedCategories.length} ready
                                </span>
                            </div>
                        ) : (
                            <div>Click on ad spaces below to configure them</div>
                        )}
                    </div>
                
                    <form onSubmit={handleSubmit}>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                            {filteredCategories.map(([category, details]) => (
                                <Card 
                                    key={category}
                                    className={`cursor-pointer transition-all duration-200 hover:shadow-xl overflow-hidden ${
                                        completedCategories.includes(category)
                                            ? 'border-green-500 shadow-lg'
                                            : 'border-gray-200 hover:border-blue-300'
                                    }`}
                                    onClick={() => handleCategorySelect(category)}
                                >
                                    <CardHeader className={`p-4 ${completedCategories.includes(category) ? 'bg-gradient-to-r from-green-100 to-blue-50' : 'bg-gradient-to-r from-gray-50 to-white'}`}>
                                        <div className="flex items-center justify-between">
                                            <div className={`flex items-center gap-3 ${completedCategories.includes(category) ? 'text-green-600' : 'text-blue-600'}`}>
                                                {details.icon}
                                                <CardTitle className="text-gray-800 text-lg">
                                                    {details.name}
                                                </CardTitle>
                                            </div>
                                            {completedCategories.includes(category) ? (
                                                <button
                                                    onClick={(e) => handleUnselect(e, category)}
                                                    className="p-1 bg-green-100 rounded-full transition-colors"
                                                >
                                                    <Check className="w-5 h-5 text-green-500" />
                                                </button>
                                            ) : (
                                                <div onClick={(e) => handleInfoClick(e, category)}>
                                                    {details.infoIcon}
                                                </div>
                                            )}
                                        </div>
                                    </CardHeader>
                                    <div className="px-4 py-2">
                                        <img 
                                            src={details.image} 
                                            alt={`${details.name} visualization`}
                                            className="w-full h-32 object-cover rounded-md border border-gray-200"
                                        />
                                    </div>
                                    <CardContent className="p-4">
                                        <p className="text-sm text-gray-600">{details.description}</p>
                                    </CardContent>
                                    <div className="p-4 bg-gray-50 flex justify-between items-center">
                                        <span className="text-xs font-medium uppercase tracking-wider text-gray-500">
                                            {details.category} • {details.position}
                                        </span>
                                        {completedCategories.includes(category) && categoryData[category]?.price && (
                                            <span className="text-sm font-semibold text-green-600">
                                                ${categoryData[category].price}/mo
                                            </span>
                                        )}
                                    </div>
                                </Card>
                            ))}
                        </div>
                        {completedCategories.length > 0 && (
                            <div className="flex justify-center">
                                <button 
                                    type="submit"
                                    className="flex items-center justify-center gap-1 px-3 py-2 bg-[#FF4500] hover:bg-orange-500 hover:-translate-y-0.5 text-white sm:text-base font-bold rounded-md transition-all duration-300"
                                    // className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#FF4500] to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white font-bold rounded-md shadow-lg transition-all duration-300 hover:-translate-y-1"
                                >
                                    <Check className="w-5 h-5" />
                                    Create {completedCategories.length} Ad Spaces
                                </button>
                            </div>
                        )}
                    </form>
                </div>
            </div>
            {renderCategoryModal()}
            {renderInfoModal()}
        </div>
        </>
        
    );
};

export default CategoriesCreation;