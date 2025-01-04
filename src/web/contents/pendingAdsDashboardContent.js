import React, { useEffect, useState } from 'react';
import { useUser } from "@clerk/clerk-react";
import { Link } from 'react-router-dom';
import { Check, Eye, Loader2, AlertCircle } from 'lucide-react';
import { Card, CardContent } from "./components/card";

const PendingAds = () => {
  const [pendingAds, setPendingAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    const fetchPendingAds = async () => {
      if (user) {
        try {
          setLoading(true);
          const response = await fetch(`https://yepper-backend.onrender.com/api/accept/pending/${user.id}`);
          const data = await response.json();
          setPendingAds(data);
        } catch (error) {
          console.error('Error fetching pending ads:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchPendingAds();
  }, [user]);

  const handleApprove = async (adId) => {
    try {
      await fetch(`https://yepper-backend.onrender.com/api/accept/approve/${adId}`, {
        method: 'PUT'
      });
      setPendingAds(pendingAds.filter((ad) => ad._id !== adId));
    } catch (error) {
      console.error('Error approving ad:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
        <p className="text-lg text-muted-foreground">Loading pending ads...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-primary mb-4">
          Pending Ad Approvals
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Review and manage advertisements awaiting your approval. Each ad requires careful consideration.
        </p>
      </div>

      {pendingAds.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pendingAds.map((ad) => (
            <Card key={ad._id} className="group overflow-hidden transition-all duration-300 hover:shadow-lg">
              <div className="relative aspect-video">
                {ad.videoUrl ? (
                  <video 
                    autoPlay 
                    loop 
                    muted 
                    className="w-full h-full object-cover"
                  >
                    <source src={ad.videoUrl} type="video/mp4" />
                  </video>
                ) : (
                  ad.imageUrl && (
                    <img 
                      src={ad.imageUrl} 
                      alt={`${ad.businessName} ad visual`}
                      className="w-full h-full object-cover"
                    />
                  )
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white text-xl font-semibold truncate">
                      {ad.businessName}
                    </h3>
                  </div>
                </div>
              </div>

              <CardContent className="p-4 space-y-3">
                <Link 
                  to={`/pending-ad/${ad._id}`}
                  className="flex items-center justify-center w-full px-4 py-2 rounded-lg border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors duration-300 font-medium gap-2"
                >
                  <Eye className="w-5 h-5" />
                  View Details
                </Link>
                
                <button 
                  onClick={() => handleApprove(ad._id)}
                  className="flex items-center justify-center w-full px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors duration-300 font-medium gap-2"
                >
                  <Check className="w-5 h-5" />
                  Approve Ad
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="max-w-md mx-auto p-8">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="p-4 rounded-full bg-muted">
              <AlertCircle className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold">No Pending Ads</h3>
            <p className="text-muted-foreground">
              All advertisements have been reviewed. Check back later for new submissions.
            </p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default PendingAds;