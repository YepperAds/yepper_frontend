import React, { useState, useEffect, useRef } from 'react';
import Sidebar from '../Sidebar';
import Header from '../ContentHeader';
import Content from './approvedContent';

const Dashboard = () => {
  const [showOptions, setShowOptions] = useState(false);
  const dropdownRef = useRef(null);

  const toggleOptions = () => {
    setShowOptions((prev) => !prev);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setShowOptions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  return (
    <div className="ads-container">
      <div className='sidebar-container'>
        <Sidebar />
      </div>
      <div className="main-content">
        <div className='ContentHeader-container'>
          <Header />
        </div>
        <Content />
      </div>

      <div className="floating-action-container" ref={dropdownRef}>
        <button className="floating-action-button" onClick={toggleOptions}>
          <span className="icon">⚙️</span>
        </button>

        {showOptions && (
          <div className="dropdown-menu">
            <button
              className="dropdown-item"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Scroll to Header
            </button>
            <button
              className="dropdown-item"
              onClick={() => (window.location.href = '/select-page')}
            >
              Go to Select Page
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
