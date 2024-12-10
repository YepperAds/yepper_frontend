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

export default function DashboardLayout() {
  const { userId, isLoaded } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isLoaded && !userId) {
      navigate("/sign-in");
    }
  }, [userId, isLoaded, navigate]);

  if (!isLoaded) return (
    <div className="loading-container">
      <Loader2 className="animate-spin text-blue-500" size={64} />
      <p className="mt-4 text-gray-600">Loading your experience...</p>
    </div>
  );

  return <Outlet />;
}