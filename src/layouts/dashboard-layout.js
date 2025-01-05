// // dashboard-layout.js
// import * as React from 'react';
// import { useAuth } from "@clerk/clerk-react";
// import { Outlet, useNavigate } from "react-router-dom";
// import { Loader2 } from 'lucide-react';
// import LoadingSpinner from '../components/LoadingSpinner';

// export default function DashboardLayout() {
//   const { userId, isLoaded } = useAuth();
//   const navigate = useNavigate();

//   React.useEffect(() => {
//     if (isLoaded && !userId) {
//       navigate("/sign-in");
//     }
//   }, [userId, isLoaded, navigate]);

//   if (!isLoaded) return (
//     <LoadingSpinner />
//   );

//   return <Outlet />;
// }

// dashboard-layout.js
import * as React from 'react';
import { useAuth } from "@clerk/clerk-react";
import { Outlet, Navigate } from "react-router-dom";
import LoadingSpinner from '../components/LoadingSpinner';

export default function DashboardLayout() {
  const { userId, isLoaded } = useAuth();

  if (!isLoaded) return <LoadingSpinner />;
  
  if (!userId) {
    return <Navigate to="/sign-in" replace />;
  }

  return <Outlet />;
}