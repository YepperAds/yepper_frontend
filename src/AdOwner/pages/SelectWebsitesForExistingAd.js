// SelectWebsitesForExistingAd.js
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Globe, Check } from 'lucide-react';
import axios from 'axios';
import { Button, Container, Badge, Grid } from '../../components/components';
import LoadingSpinner from "../../components/LoadingSpinner";

function SelectWebsitesForExistingAd() {
  const location = useLocation();
  const navigate = useNavigate();
  const { adId, isReassignment, availableRefund } = location.state || {};
  const [ad, setAd] = useState(null);
  const [websites, setWebsites] = useState([]);
  const [filteredWebsites, setFilteredWebsites] = useState([]);
  const [selectedWebsites, setSelectedWebsites] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getAuthToken = () => {
    return localStorage.getItem('token') || sessionStorage.getItem('token');
  };

  const getAuthHeaders = () => {
    const token = getAuthToken();
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  };

  useEffect(() => {
    if (!adId) {
      navigate('/my-ads');
      return;
    }
    fetchAdDetails();
    fetchWebsites();
  }, [adId]);

  useEffect(() => {
    filterWebsites();
  }, [searchTerm, websites, ad]);

  const fetchAdDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/web-advertise/${adId}`, {
        headers: getAuthHeaders()
      });
      
      if (response.data.success) {
        setAd(response.data.data);
      }
    } catch (error) {
      navigate('/my-ads');
    }
  };

  const fetchWebsites = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/createWebsite', {
        headers: getAuthHeaders()
      });
      
      if (Array.isArray(response.data)) {
        setWebsites(response.data);
      } else if (response.data.success && response.data.websites) {
        setWebsites(response.data.websites);
      } else {
        setWebsites([]);
      }
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch websites. Please try again.');
      setWebsites([]);
      setLoading(false);
    }
  };

  const filterWebsites = () => {
    if (!websites.length) return;
    
    let filtered = websites;

    if (searchTerm) {
      filtered = filtered.filter(website =>
        website.websiteName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        website.websiteLink.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (ad?.websiteSelections?.length > 0) {
      const websitesWithActiveOrPendingSelections = ad.websiteSelections
        .filter(ws => 
          (ws.status === 'active' || ws.status === 'pending') && !ws.isRejected
        )
        .map(ws => ws.websiteId.toString());
      
      filtered = filtered.filter(website => 
        !websitesWithActiveOrPendingSelections.includes(website._id.toString())
      );
    }
    
    setFilteredWebsites(filtered);
  };

  const handleSelect = (websiteId) => {
    setSelectedWebsites(prev => 
      prev.includes(websiteId)
        ? prev.filter(id => id !== websiteId)
        : [...prev, websiteId]
    );
  };

  const handleNext = () => {
    if (selectedWebsites.length === 0) return;

    navigate('/select-categories-for-ad', {
      state: {
        adId,
        selectedWebsites,
        ad,
        isReassignment,
        availableRefund
      }
    });
  };

  const getWebsiteStatus = (website) => {
    if (!ad?.websiteSelections) return null;
    
    const selection = ad.websiteSelections.find(
      ws => ws.websiteId.toString() === website._id.toString()
    );
    
    if (!selection) return null;
    
    if (selection.isRejected || selection.status === 'rejected') {
      return {
        status: 'rejected',
        text: 'Previously Rejected',
        variant: 'danger'
      };
    }
    
    if (selection.status === 'active') {
      return {
        status: 'active',
        text: 'Currently Active',
        variant: 'success'
      };
    }
    
    if (selection.status === 'pending') {
      return {
        status: 'pending',
        text: 'Pending Approval',
        variant: 'warning'
      };
    }
    
    return null;
  };

  const formatCategoryForDisplay = (categories) => {
    if (!categories || !Array.isArray(categories) || categories.length === 0) {
      return 'No Categories';
    }

    if (categories.includes('any')) {
      return 'All Categories';
    }
    
    const categoryLabels = {
      'technology': 'Technology',
      'food-beverage': 'Food & Beverage',
      'real-estate': 'Real Estate',
      'automotive': 'Automotive',
      'health-wellness': 'Health & Wellness',
      'entertainment': 'Entertainment',
      'fashion': 'Fashion',
      'education': 'Education',
      'business-services': 'Business Services',
      'travel-tourism': 'Travel & Tourism',
      'arts-culture': 'Arts & Culture',
      'photography': 'Photography',
      'gifts-events': 'Gifts & Events',
      'government-public': 'Government & Public',
      'general-retail': 'General Retail'
    };
    
    return categories.map(cat => categoryLabels[cat] || cat).join(', ');
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-200 bg-white">
        <Container>
          <div className="h-16 flex items-center justify-between">
            <button 
              onClick={() => navigate('/my-ads')} 
              className="flex items-center text-gray-600 hover:text-black transition-colors"
            >
              <ArrowLeft size={18} className="mr-2" />
              <span className="font-medium">Back</span>
            </button>
            <Badge variant="default">
              {isReassignment ? 'Reassign Websites' : 'Add Websites'}
            </Badge>
          </div>
        </Container>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {error && (
          <div className="mb-8 border border-red-300 bg-red-50 p-4 text-red-800 text-sm">
            {error}
          </div>
        )}

        <div className="flex justify-between items-center gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search websites..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-black bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-0 transition-all duration-200"
            />
          </div>
        </div>

        {filteredWebsites.length === 0 ? (
          <div className="flex items-center justify-center min-h-96">
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-4 text-black">No websites available</h2>
              <p className="text-gray-600">
                {searchTerm 
                  ? 'Try adjusting your search terms'
                  : 'All websites may already have active selections for this ad'
                }
              </p>
            </div>
          </div>
        ) : (
          <Grid cols={3} gap={6}>
            {filteredWebsites.map((website) => {
              const isSelected = selectedWebsites.includes(website._id);
              const status = getWebsiteStatus(website);
              
              return (
                <div 
                  key={website._id} 
                  onClick={() => handleSelect(website._id)}
                  className={`border p-6 cursor-pointer transition-all duration-200 hover:bg-gray-50 ${
                    isSelected 
                      ? 'border-black bg-gray-50' 
                      : 'border-gray-300'
                  }`}
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center">
                      {website.imageUrl ? (
                        <img 
                          src={website.imageUrl} 
                          alt={website.websiteName}
                          className="w-10 h-10 object-contain mr-3"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/global.png';
                          }}
                        />
                      ) : (
                        <Globe size={40} className="mr-3 text-black" />
                      )}
                      <div>
                        <h3 className="text-lg font-semibold text-black">{website.websiteName}</h3>
                        <p className="text-sm text-gray-600 break-all">{website.websiteLink}</p>
                      </div>
                    </div>
                    
                    <div className={`w-6 h-6 border flex items-center justify-center ${
                      isSelected 
                        ? 'border-black bg-black text-white' 
                        : 'border-gray-300'
                    }`}>
                      {isSelected && <Check size={14} />}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="default" className="text-xs px-2 py-1 bg-black text-white">
                      {formatCategoryForDisplay(website.businessCategories)}
                    </Badge>
                    
                    {status && (
                      <Badge variant={status.variant} className="text-xs">
                        {status.text}
                      </Badge>
                    )}
                  </div>
                </div>
              );
            })}
          </Grid>
        )}

        <div className="flex justify-end items-center mt-12 gap-4">
          <Button
            onClick={handleNext} 
            disabled={selectedWebsites.length === 0}
            variant={selectedWebsites.length === 0 ? "outline" : "secondary"}
            size="lg"
          >
            {loading ? 'Processing...' : 'Continue'}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SelectWebsitesForExistingAd;