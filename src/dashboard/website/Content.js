import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useClerk } from '@clerk/clerk-react';
import axios from "axios";
import './styles/Content.css';

const Content = () => {
  const { user } = useClerk();
  const [approvedAds, setApprovedAds] = useState([]);
  const [pendingAds, setPendingAds] = useState([]);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/importAds/projects/${user.id}`);
        const data = await response.json();
        
        setApprovedAds(data.approvedAds);
        setPendingAds(data.pendingAds);
      } catch (error) {
        console.error('Error fetching ads:', error);
      }
    };

    fetchAds();
  }, [user]);

  return (
    // <div className="body-content">
    //   <div className='webs-container'>
    //     <div className='card-container'>
    //       <div className='data-card'>
    //         <div className='app'>
    //           <img src='https://img.freepik.com/premium-photo/wordpress-logo-icon_1073075-1688.jpg?uid=R102997587&ga=GA1.2.2142793496.1716934876&semt=ais_hybrid' alt='' />
    //           <div className='details'>
    //             <div className='word'>
    //               <label>Igihe</label>
    //             </div>
    //             <div className='views'>
    //               <span>324 Clicks</span>
    //               <span>21 Views</span>
    //             </div>
    //           </div>
    //         </div>
    //       </div>

    //       <div className='data-card'>
    //         <div className='app'>
    //           <img src='https://img.freepik.com/free-vector/flat-design-ac-logo-design_23-2149482027.jpg?uid=R102997587&ga=GA1.2.2142793496.1716934876&semt=ais_hybrid' alt='' />
    //           <div className='details'>
    //             <div className='word'>
    //               <label>Kigali today</label>
    //             </div>
    //             <div className='views'>
    //               <span>324 Clicks</span>
    //               <span>21 Views</span>
    //             </div>
    //           </div>
    //         </div>
    //       </div>

    //       <div className='data-card'>
    //         <div className='app'>
    //           <img src='https://img.freepik.com/free-vector/golden-bird-logo-design_1195-336.jpg?uid=R102997587&ga=GA1.2.2142793496.1716934876&semt=ais_hybrid' alt='' />
    //           <div className='details'>
    //             <div className='word'>
    //               <label>Newtimes</label>
    //             </div>
    //             <div className='views'>
    //               <span>324 Clicks</span>
    //               <span>21 Views</span>
    //             </div>
    //           </div>
    //         </div>
    //       </div>

    //       <div className='data-card'>
    //         <div className='app'>
    //           <img src='https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg?uid=R102997587&ga=GA1.2.2142793496.1716934876&semt=ais_hybrid' alt='' />
    //           <div className='details'>
    //             <div className='word'>
    //               <label>Web</label>
    //             </div>
    //             <div className='views'>
    //               <span>324 Clicks</span>
    //               <span>21 Views</span>
    //             </div>
    //           </div>
    //         </div>
    //       </div>

    //       <div className='data-card'>
    //         <div className='app'>
    //           <img src='https://img.freepik.com/free-psd/recycle-logo-3d-illustration-design_460848-16719.jpg?uid=R102997587&ga=GA1.2.2142793496.1716934876&semt=ais_hybrid' alt='' />
    //           <div className='details'>
    //             <div className='word'>
    //               <label>Igihe</label>
    //             </div>
    //             <div className='views'>
    //               <span>324 Clicks</span>
    //               <span>21 Views</span>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
          
    //       <div className='data-card'>
    //         <div className='app'>
    //           <img src='https://img.freepik.com/free-vector/abstract-logo-flame-shape_1043-44.jpg?uid=R102997587&ga=GA1.2.2142793496.1716934876&semt=ais_hybrid' alt='' />
    //           <div className='details'>
    //             <div className='word'>
    //               <label>Web name</label>
    //             </div>
    //             <div className='views'>
    //               <span>324 Clicks</span>
    //               <span>21 Views</span>
    //             </div>
    //           </div>
    //         </div>
    //       </div>

    //       <div className='data-card'>
    //         <div className='app'>
    //           <img src='https://img.freepik.com/free-vector/creative-barbecue-logo-template_23-2149017951.jpg?uid=R102997587&ga=GA1.2.2142793496.1716934876&semt=ais_hybrid' alt='' />
    //           <div className='details'>
    //             <div className='word'>
    //               <label>Web restaurant</label>
    //             </div>
    //             <div className='views'>
    //               <span>324 Clicks</span>
    //               <span>21 Views</span>
    //             </div>
    //           </div>
    //         </div>
    //       </div>

    //       <div className='data-card'>
    //         <div className='app'>
    //           <img src='https://img.freepik.com/free-vector/friends-logo-template_23-2149505594.jpg?uid=R102997587&ga=GA1.2.2142793496.1716934876&semt=ais_hybrid' alt='' />
    //           <div className='details'>
    //             <div className='word'>
    //               <label>Cabon web</label>
    //             </div>
    //             <div className='views'>
    //               <span>324 Clicks</span>
    //               <span>21 Views</span>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div>
      <h2>Approved Ads</h2>
      {approvedAds.length ? (
        approvedAds.map((ad) => (
          <div key={ad._id} className="approved-ad">
            <h3>{ad.businessName}</h3>
            <p>{ad.businessLocation}</p>
            <p>{ad.adDescription}</p>
          </div>
        ))
      ) : (
        <p>No approved ads yet</p>
      )}

      <h2>Pending Ads</h2>
      {pendingAds.length ? (
        pendingAds.map((ad) => (
          <div key={ad._id} className="pending-ad">
            <h3>{ad.businessName}</h3>
            <p>{ad.businessLocation}</p>
            <p>{ad.adDescription}</p>
          </div>
        ))
      ) : (
        <p>No pending ads</p>
      )}
    </div>
  );
};

export default Content;