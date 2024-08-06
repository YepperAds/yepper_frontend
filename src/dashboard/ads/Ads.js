import React from 'react';
import Sidebar from '../Sidebar';
import Header from '../ContentHeader';
import Content from './Content';
import './styles/Dashboard.css';

const Dashboard = () => {
  return (
    <div className="ads-container">
      <Sidebar />
      <div className="main-content">
        <Header />
        <Content />
      </div>
    </div>
  );
};

export default Dashboard;
