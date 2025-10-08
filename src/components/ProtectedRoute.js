// ProtectedRoute.js
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from './LoadingSpinner';
import { useEffect, useState } from 'react';

const ProtectedRoute = ({ children, allowUnauthorized = false }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    // Only set redirect after loading is complete
    if (!isLoading && !isAuthenticated && !allowUnauthorized) {
      // Small delay to prevent race conditions
      const timer = setTimeout(() => {
        setShouldRedirect(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isLoading, isAuthenticated, allowUnauthorized]);

  // Show loading spinner while checking auth status
  if (isLoading) {
    return <LoadingSpinner />;
  }

  // If not authenticated and route requires auth, redirect
  if (!isAuthenticated && !allowUnauthorized && shouldRedirect) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Render the protected content
  return children;
};

export default ProtectedRoute;