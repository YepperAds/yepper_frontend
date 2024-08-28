import React from 'react';
import { Link } from "react-router-dom";
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import './styles/ContentHeader.css';

const Header = () => {
  return (
    <header className="dash-header">
      <div className="search-bar">
        <input type="text" placeholder="Search..." />
      </div>
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