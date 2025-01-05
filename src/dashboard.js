// Home.js
import React, { useState } from "react";
import './index.css'
import './home.css'
import Header from './components/header'
import ApprovedAds from './components/approvedAds';
import LoadingSpinner from './components/LoadingSpinner';

function Home() {
  const [loading, setLoading] = useState(true);

  // Update loading state based on children
  const handleLoading = (status) => {
    setLoading(status);
  };

  return (
    <div className='ad-waitlist min-h-screen'>
      <Header />
      {loading && <LoadingSpinner />}
      <ApprovedAds setLoading={handleLoading} />
    </div>
  )
}

export default Home