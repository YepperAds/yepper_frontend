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
        <NavLink to="/websites-dashboard" className={({ isActive }) => isActive ? 'active' : ''}>Websites</NavLink>
        {/* <NavLink to="/apps-dashboard" className={({ isActive }) => isActive ? 'active' : ''}>Apps</NavLink>
        <NavLink to="/emails-dashboard" className={({ isActive }) => isActive ? 'active' : ''}>Emails</NavLink> */}
      </ul>
    </div>
  );
};

export default Sidebar;