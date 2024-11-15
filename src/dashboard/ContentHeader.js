import React from 'react';
import { Link, NavLink } from "react-router-dom";
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import './styles/ContentHeader.css';

const Header = () => {
  return (
    <header className="dash-header">
      <NavLink to="/ads-dashboard" className={({ isActive }) => isActive ? 'active' : ''}>Ads</NavLink>
      <NavLink to="/pending-dashboard" className={({ isActive }) => isActive ? 'active' : ''}>Pending Ads</NavLink>
      <NavLink to="/approved-dashboard" className={({ isActive }) => isActive ? 'active' : ''}>Approved Ads</NavLink>
      <NavLink to="/websites-dashboard" className={({ isActive }) => isActive ? 'active' : ''}>Websites</NavLink>
      <SignedIn>
        <UserButton afterSignOutUrl='/sign-in' />
      </SignedIn>
      <SignedOut>
        <Link to="/sign-in">Login</Link>
      </SignedOut>
    </header>
  );
};

export default Header;