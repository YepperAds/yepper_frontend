// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { useUser } from "@clerk/clerk-react";
// import { Link } from 'react-router-dom';
// import '../styles/pending.css';

// function PendingAds() {
//   const [pendingAds, setPendingAds] = useState([]);
//   const { user } = useUser();

//   useEffect(() => {
//     const fetchPendingAds = async () => {
//       if (user) {
//         const ownerId = user.id;

//         try {
//           const response = await axios.get(`https://yepper-backend.onrender.com/api/accept/pending/${ownerId}`);
//           setPendingAds(response.data);
//         } catch (error) {
//           console.error('Error fetching pending ads:', error);
//         }
//       }
//     };

//     fetchPendingAds();
//   }, [user]);

//   const handleApprove = async (adId) => {
//     try {
//       await axios.put(`https://yepper-backend.onrender.com/api/accept/approve/${adId}`);
//       setPendingAds(pendingAds.filter((ad) => ad._id !== adId));
//     } catch (error) {
//       console.error('Error approving ad:', error);
//     }
//   };

//   return (
//     <div className='pending-ads container'>
//       <h2>Pending Ads</h2>
//       <div className='pending-ad-list'>
//         {pendingAds.length > 0 ? (
//           pendingAds.map((ad) => (
//             <div key={ad._id} className='pending-ad-card'>
//               <div className="ad-media-container">
//               {ad.videoUrl ? (
//                   <video 
//                     autoPlay 
//                     loop 
//                     muted 
//                     className="ad-background-video"
//                   >
//                     <source src={ad.videoUrl} type="video/mp4" />
//                   </video>
//                 ) : (
//                   ad.imageUrl && (
//                     <img 
//                       src={ad.imageUrl} 
//                       alt="Ad Visual" 
//                       className="ad-background-image" 
//                     />
//                   )
//                 )}
//               </div>
//               <div className="ad-content">
//                 <h3>{ad.businessName}</h3>
//                 <div className="ad-actions">
//                   <Link to={`/pending-ad/${ad._id}`} className="view-ad-link">View Ad Details</Link>
//                   <button onClick={() => handleApprove(ad._id)} className="approve-button">Approve</button>
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className='pending-empty-message'>No pending ads at the moment.</div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default PendingAds;



import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useUser } from "@clerk/clerk-react";
import { Link } from 'react-router-dom';
import { Check, Eye, Loader2 } from 'lucide-react';
import '../styles/pending.css';

function PendingAds() {
  const [pendingAds, setPendingAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    const fetchPendingAds = async () => {
      if (user) {
        try {
          setLoading(true);
          const response = await axios.get(`https://yepper-backend.onrender.com/api/accept/pending/${user.id}`);
          setPendingAds(response.data);
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
      await axios.put(`https://yepper-backend.onrender.com/api/accept/approve/${adId}`);
      setPendingAds(pendingAds.filter((ad) => ad._id !== adId));
    } catch (error) {
      console.error('Error approving ad:', error);
    }
  };

  if (loading) {
    return (
      <div className="pending-ads-loading">
        <Loader2 className="loading-spinner" />
        <p>Loading pending ads...</p>
      </div>
    );
  }

  return (
    <div className="pending-ads-container">
      <div className="pending-ads-header">
        <h2>Pending Ad Approvals</h2>
        <p>Review and manage ads awaiting your approval</p>
      </div>

      <div className="pending-ads-grid">
        {pendingAds.length > 0 ? (
          pendingAds.map((ad) => (
            <div key={ad._id} className="pending-ad-card">
              <div className="ad-media-wrapper">
                {ad.videoUrl ? (
                  <video 
                    autoPlay 
                    loop 
                    muted 
                    className="ad-media"
                  >
                    <source src={ad.videoUrl} type="video/mp4" />
                  </video>
                ) : (
                  ad.imageUrl && (
                    <img 
                      src={ad.imageUrl} 
                      alt="Ad Visual" 
                      className="ad-media" 
                    />
                  )
                )}
                <div className="ad-overlay">
                  <div className="ad-details">
                    <h3>{ad.businessName}</h3>
                  </div>
                </div>
              </div>
              
              <div className="ad-actions">
                <Link to={`/pending-ad/${ad._id}`} className="view-details-btn">
                  <Eye strokeWidth={2} size={18} />
                  View Details
                </Link>
                <button 
                  onClick={() => handleApprove(ad._id)} 
                  className="approve-btn"
                >
                  <Check strokeWidth={2} size={18} />
                  Approve
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <h3>No Pending Ads</h3>
            <p>All ads have been reviewed. Check back later!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default PendingAds;