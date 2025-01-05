// // dashboard-layout.js
// import * as React from 'react';
// import { useAuth } from "@clerk/clerk-react";
// import { Outlet, useNavigate } from "react-router-dom";

// export default function DashboardLayout() {
//   const { userId, isLoaded } = useAuth();
//   const navigate = useNavigate();

//   React.useEffect(() => {
//     if (isLoaded && !userId) {
//       navigate("/sign-in");
//     }
//   }, [userId, isLoaded, navigate]);

//   if (!isLoaded) return "Loading...";

//   return <Outlet />;
// }



// dashboard-layout.js
import * as React from 'react';
import { useAuth } from "@clerk/clerk-react";
import { Outlet, useNavigate } from "react-router-dom";
import { Loader2 } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';

export default function DashboardLayout() {
  const { userId, isLoaded } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isLoaded && !userId) {
      navigate("/sign-in");
    }
  }, [userId, isLoaded, navigate]);

  if (!isLoaded) return (
    <LoadingSpinner />
  );

  return <Outlet />;
}