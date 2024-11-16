import React from 'react';
import Sidebar from '../Sidebar';
import Header from '../ContentHeader';
import Content from './adsContent';

const Dashboard = () => {
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
    </div>
  );
};

export default Dashboard;