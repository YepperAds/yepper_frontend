import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import './styles/header.css';
import Logo from "../components/logo";
import menuIcon from '../assets/img/menu.png';
import closeIcon from '../assets/img/close.png';

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='dash-header-ctn'>
        <header>
            <nav>
                <div className="container">
                    <div className='logo'>
                        <Link style={{cursor:'pointer'}} to='/dashboard'>
                            <Logo />
                        </Link>
                    </div>
                    <div className={`nav-links ${isOpen ? 'open' : ''}`}>
                        <Link to='/#' onClick={toggleMenu}>Contact</Link>
                        <Link to='/#' onClick={toggleMenu}>Terms and Conditions</Link>
                        <Link to='/#' onClick={toggleMenu}>Privacy & Policy</Link>
                    </div>
                    <div className="user">
                        <SignedIn>
                            <UserButton afterSignOutUrl='/sign-in' />
                        </SignedIn>
                        <SignedOut>
                            <Link to="/sign-in" onClick={toggleMenu}>Login</Link>
                        </SignedOut>
                    </div>
                    <button className="menu-toggle" onClick={toggleMenu}>
                        <img src={isOpen ? closeIcon : menuIcon} alt="Menu Toggle" />
                    </button>
                </div>
            </nav>
        </header>
    </div>
  )
}

export default Header;