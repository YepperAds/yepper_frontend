import React from 'react';
import { NavLink } from 'react-router-dom';
import './styles/Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Yepper</h2>
      <ul>
        <NavLink to="/ads" className={({ isActive }) => isActive ? 'active' : ''}>Ads</NavLink>
        <NavLink to="/apps" className={({ isActive }) => isActive ? 'active' : ''}>Apps</NavLink>
        <NavLink to="/websites" className={({ isActive }) => isActive ? 'active' : ''}>Websites</NavLink>
        <NavLink to="/emails" className={({ isActive }) => isActive ? 'active' : ''}>Emails</NavLink>
      </ul>
    </div>
  );
};

export default Sidebar;