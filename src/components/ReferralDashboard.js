// components/ReferralDashboard.js
import React, { useState, useEffect } from 'react';
import { useClerk } from '@clerk/clerk-react';
import axios from 'axios';
import { Share2, Copy, CheckCircle, Users, DollarSign, Clock, Badge } from 'lucide-react';

const ReferralDashboard = () => {
  const { user } = useClerk();
  const [referralData, setReferralData] = useState(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('all');


  const loadReferralData = async () => {
    if (!user?.id) return;
    
    try {
      setLoading(true);
      setError(null);
      
      // Generate/fetch referral code
      await axios.post(`https://yepper-backend.onrender.com/api/referrals/generate-code`, {
        userId: user.id,
        userType: 'promoter'
      });

      // Get stats
      const statsResponse = await axios.get(`https://yepper-backend.onrender.com/api/referrals/stats/${user.id}`);
      setReferralData(statsResponse.data.stats);
    } catch (err) {
      setError(err.message);
      console.error('Error loading referral data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      loadReferralData();
    }
  }, [user?.id]);

  const renderReferralList = () => {
    if (!referralData?.referrals?.length) {
      return (
        <div className="text-center p-8 bg-gray-50 rounded-lg">
          <p>No referrals yet. Share your referral link to get started!</p>
        </div>
      );
    }

    return referralData.referrals.map((referral, index) => (
      <div key={index} className="mb-4 border rounded-lg p-4">
        <div className={`p-4 rounded-lg ${
          referral.status === 'qualified' ? 'bg-green-50' : 'bg-yellow-50'
        }`}>
          <div className="flex justify-between items-center">
            <div>
              <span className="font-medium">Status: </span>
              <span className={`${
                referral.status === 'qualified' ? 'text-green-600' : 'text-yellow-600'
              }`}>
                {referral.status.charAt(0).toUpperCase() + referral.status.slice(1)}
              </span>
            </div>
            <div className="text-sm text-gray-500">
              {new Date(referral.createdAt).toLocaleDateString()}
            </div>
          </div>
          
          {referral.userDetails && (
            <div className="mt-2 border-t pt-2">
              <p className="font-medium">User Details:</p>
              <p>{referral.userDetails.firstName} {referral.userDetails.lastName}</p>
              <p className="text-sm text-gray-600">{referral.userDetails.email}</p>
            </div>
          )}
          
          {referral.websiteDetails?.length > 0 && (
            <div className="mt-2 border-t pt-2">
              <p className="font-medium">Websites:</p>
              {referral.websiteDetails.map((website, idx) => (
                <div key={idx} className="mt-1">
                  <p>{website.websiteName}</p>
                  <a href={website.websiteLink} 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="text-sm text-blue-600 hover:underline">
                    {website.websiteLink}
                  </a>
                </div>
              ))}
            </div>
          )}
          
          {referral.categoryDetails?.length > 0 && (
            <div className="mt-2 border-t pt-2">
              <p className="font-medium">Ad Categories:</p>
              {referral.categoryDetails.map((category, idx) => (
                <div key={idx} className="mt-1">
                  <p>{category.categoryName}</p>
                  <p className="text-sm text-gray-600">
                    Created: {new Date(category.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    ));
  };

  const getReferralLink = () => {
    if (!referralData?.code) return '';
    return `${window.location.origin}/sign-up?ref=${referralData.code}`;
  };

  const copyReferralLink = async () => {
    const link = getReferralLink();
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'qualified':
        return (
          <Badge className="bg-green-100 text-green-800 border-green-300">
            <CheckCircle className="w-3 h-3 mr-1" />
            Qualified
          </Badge>
        );
      case 'pending':
        return (
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        );
      case 'website_created':
        return (
          <Badge className="bg-blue-100 text-blue-800 border-blue-300">
            <Clock className="w-3 h-3 mr-1" />
            Website Created
          </Badge>
        );
      case 'category_created':
        return (
          <Badge className="bg-purple-100 text-purple-800 border-purple-300">
            <Clock className="w-3 h-3 mr-1" />
            Category Created
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gray-100 text-gray-800 border-gray-300">
            Unknown
          </Badge>
        );
    }
  };

  const filteredReferrals = () => {
    if (!referralData?.referrals) return [];
    
    switch (activeTab) {
      case 'qualified':
        return referralData.referrals.filter(r => r.status === 'qualified');
      case 'pending':
        return referralData.referrals.filter(r => r.status !== 'qualified');
      case 'all':
      default:
        return referralData.referrals;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Your Referral Link</h2>
        <div className="flex items-center gap-2">
          <input 
            type="text"
            readOnly
            value={getReferralLink()}
            className="flex-1 p-2 border rounded"
          />
          <button
            onClick={copyReferralLink}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Your Referrals</h2>
        <p className="mb-2">Total Qualified Referrals: {referralData?.totalReferrals || 0}</p>
        {referralData?.referrals?.length > 0 ? (
          <div className="space-y-4">
            {renderReferralList()}
          </div>
        ) : (
          <p>No referrals yet</p>
        )}
      </div>
    </div>
  );
};

export default ReferralDashboard;