import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import './styles/header.css';
import Logo from "./logo";
import add from '../assets/img/plus (1).png';
import dashboard from '../assets/img/dashboard.png';
import menuIcon from '../assets/img/menu.png';
import closeIcon from '../assets/img/close.png';

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='header-ctn'>
        <header>
            <nav>
                <div className="container">
                    <div className='logo'>
                        <Link style={{cursor:'pointer'}} to='/'>
                            <Logo />
                        </Link>
                    </div>
                    <div className={`nav-links ${isOpen ? 'open' : ''}`}>
                        <Link to='/' onClick={toggleMenu}>Home</Link>
                        <Link to='/about' onClick={toggleMenu}>About</Link>
                    </div>
                    <div className="user">
                        <SignedIn>
                            <UserButton afterSignOutUrl='/sign-in' />
                        </SignedIn>
                        <SignedOut>
                            <Link to="/sign-in" onClick={toggleMenu}>Login</Link>
                        </SignedOut>
                        <Link to='/select' className='post-ad' onClick={toggleMenu}>
                        {/* <Link to='/request' className='post-ad' onClick={toggleMenu}> */}
                            <img src={add} alt='Post Ad' />
                            Post Ad
                        </Link>
                        <Link to='/dashboard' className='post-ad dashBtn' onClick={toggleMenu}>
                            <img src={dashboard} alt='Dashboard' />
                            Dashboard
                        </Link>
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
