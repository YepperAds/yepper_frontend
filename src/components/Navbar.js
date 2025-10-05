// Navbar.js
import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, Mail, ChevronDown } from 'lucide-react';
import { Button } from './components';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
          buttonRef.current && !buttonRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors">
            Yepper
          </Link>
          
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="relative">
                {/* Avatar Button */}
                <button
                  ref={buttonRef}
                  onClick={toggleDropdown}
                  className="flex items-center space-x-2 p-2 hover:bg-gray-50 transition-all duration-200 rounded-md"
                >
                  {user?.avatar ? (
                    <img 
                      src={user.avatar} 
                      alt={user.name} 
                      className="h-8 w-8 rounded-full object-cover border-2 border-gray-200"
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center">
                      <User size={16} className="text-white" />
                    </div>
                  )}
                  <ChevronDown 
                    size={14} 
                    className={`text-gray-500 transition-transform duration-200 ${
                      isDropdownOpen ? 'rotate-180' : ''
                    }`} 
                  />
                </button>

                {/* Dropdown Modal with Mac-like Animation */}
                <div
                  ref={dropdownRef}
                  className={`absolute right-0 mt-3 w-80 bg-white rounded-lg border border-gray-300 shadow-lg z-50 overflow-hidden transition-all duration-300 ease-out transform origin-top-right ${
                    isDropdownOpen 
                      ? 'opacity-100 scale-100 translate-y-0' 
                      : 'opacity-0 scale-95 -translate-y-3 pointer-events-none'
                  }`}
                  style={{
                    backdropFilter: 'blur(10px)',
                    background: 'rgba(255, 255, 255, 0.98)'
                  }}
                >
                  {/* User Info Section */}
                  <div className="p-5">
                    <div className="flex items-center space-x-4">
                      {user?.avatar ? (
                        <img 
                          src={user.avatar} 
                          alt={user.name} 
                          className="h-14 w-14 rounded-full object-cover border-3 border-white shadow-md"
                        />
                      ) : (
                        <div className="h-14 w-14 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-md">
                          <User size={28} className="text-white" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-lg font-semibold text-gray-900 truncate mb-1">
                          {user?.name || 'User'}
                        </p>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Mail size={14} />
                          <p className="truncate">{user?.email}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Logout Section */}
                  <div className="border-t border-gray-100 py-2">
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-3 px-5 py-3 text-red-600 hover:bg-red-50 transition-all duration-150 w-full text-left group"
                    >
                      <div className="p-1 rounded-md group-hover:bg-red-100 transition-colors">
                        <LogOut size={18} className="group-hover:text-red-700" />
                      </div>
                      <span className="group-hover:text-red-700">Logout</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                {/* Login Button */}
                <Link to="/login">
                  <Button 
                    variant='primary'
                    className="h-9 flex items-center space-x-2 focus:outline-none focus:ring-0"
                  >
                    <span>Login</span>
                  </Button>
                </Link>

                {/* Register Button */}
                <Link to="/register">
                  <Button 
                    variant='ghost'
                    className="h-9 flex items-center space-x-2 focus:outline-none focus:ring-0"
                  >
                    <span>Register</span>
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;