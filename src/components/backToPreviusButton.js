import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import './styles/header.css';
import backbutton from '../assets/img/backbutton.png'

function BackButton() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); // Use useNavigate to go back

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className='header-ctn back-ctn'>
        <header>
            <nav>
                <div className="container">
                    <div className='logo'>
                        <button onClick={handleBack}> {/* Add onClick event to go back */}
                            <img src={backbutton} alt=""/>
                        </button>
                    </div>
                    
                    <div className="user">
                        <SignedIn>
                            <UserButton afterSignOutUrl='/sign-in' />
                        </SignedIn>
                        <SignedOut>
                            <Link to="/sign-in" onClick={toggleMenu}>Login</Link>
                        </SignedOut>
                    </div>
                </div>
            </nav>
        </header>
    </div>
  )
}

export default BackButton;
