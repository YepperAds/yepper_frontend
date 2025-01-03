import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation  } from "react-router-dom";
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import { motion } from 'framer-motion';
import { Menu, X, PlusIcon } from 'lucide-react';
import Logo from "./logoName";

function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
        setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isActiveLink = (path) => {
        return location.pathname === path;
    };

    const handleGetStartedButton = () => {
        navigate('/request');
        setIsOpen(false);
    };

    return (
        <div className={`fixed top-0 w-full z-50 transition-all duration-300 ${
            scrolled ? 'bg-white shadow-md' : 'bg-white'
        }`}>
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16 md:h-20">
                    <Logo />
                    <nav className="hidden md:flex items-center space-x-8">                    
                        <motion.button 
                            className={`flex items-center text-white px-3 py-2 rounded-lg text-sm font-bold sm:text-base
                            ${isActiveLink('/request') 
                                ? 'bg-orange-500 font-bold pointer-events-none' 
                                : 'bg-[#FF4500] hover:bg-orange-500 transition-colors'
                            }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleGetStartedButton}
                        >
                            <PlusIcon className="block h-6 w-6" />
                            New
                        </motion.button>
            
                        <SignedIn>
                            <UserButton afterSignOutUrl='/sign-in' />
                        </SignedIn>
                        <SignedOut>
                            <Link to="/sign-in">Login</Link>
                        </SignedOut>
            
                    </nav>
            
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden rounded-md p-2 inline-flex items-center justify-center text-gray-700 hover:text-orange-500 hover:bg-red-100 transition-colors duration-200 z-50"
                        aria-expanded={isOpen}
                    >
                        <span className="sr-only">Open main menu</span>
                        {isOpen ? (
                            <X className="block h-6 w-6" aria-hidden="true" />
                        ) : (
                            <Menu className="block h-6 w-6" aria-hidden="true" />
                        )}
                    </button>
                </div>
            </div>
            
            <div className={`
                md:hidden 
                fixed 
                inset-0 
                z-40 
                bg-white 
                transition-transform duration-300 ease-in-out transform
                ${isOpen ? 'translate-x-0' : 'translate-x-full'}
            `}>
                <div className="relative pt-20 pb-6 px-4 space-y-6">
                    <motion.button 
                        className={`flex w-full justify-center items-center text-white px-2 py-2 rounded-lg text-sm font-bold sm:text-base
                            ${isActiveLink('/request') 
                                ? 'bg-orange-500 font-bold pointer-events-none' 
                                : 'bg-[#FF4500] hover:bg-orange-500 transition-colors'
                            }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleGetStartedButton}
                        >
                            <PlusIcon className="block h-6 w-6" />
                            New
                    </motion.button>
        
                    <SignedIn>
                        <UserButton afterSignOutUrl='/sign-in' />
                    </SignedIn>
                    <SignedOut>
                        <Link to="/sign-in">Login</Link>
                    </SignedOut>
                </div>
            </div>
        </div>
    )
}

export default Header;
