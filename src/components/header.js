import React from "react";
import { Link } from "react-router-dom";
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import './styles/header.css'
import Logo from "./logo";

function Header() {
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
                    <div className='nav-links'>
                        <Link to='/'>Home</Link>
                        <Link to='/ads'>Ads</Link>
                        <Link to='/contacts'>Contacts</Link>
                        <Link to='/about'>About</Link>
                    </div>
                    <div className="user">
                        <SignedIn>
                            <UserButton afterSignOutUrl='/sign-in' />
                        </SignedIn>
                        <SignedOut>
                            <Link to="/sign-in">Login</Link>
                        </SignedOut>
                        <Link to='#' className='post-ad'>Post Ad</Link>
                    </div>
                </div>
            </nav>
        </header>
    </div>
  )
}

export default Header;
