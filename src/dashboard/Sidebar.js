import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './styles/Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to='/dashboard' className='logo-container'>
        <h2>Yepper</h2>
      </Link>
      <ul>
        <NavLink to="/ads-dashboard" className={({ isActive }) => isActive ? 'active' : ''}>Ads</NavLink>
        <NavLink to="/pending-dashboard" className={({ isActive }) => isActive ? 'active' : ''}>Pending Ads</NavLink>
        <NavLink to="/approved-dashboard" className={({ isActive }) => isActive ? 'active' : ''}>Approved Ads</NavLink>
        <NavLink to="/websites-dashboard" className={({ isActive }) => isActive ? 'active' : ''}>Websites</NavLink>
      </ul>
    </div>
  );
};

export default Sidebar;