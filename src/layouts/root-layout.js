// // root-layout.js
// import { Outlet, useNavigate, useLocation } from 'react-router-dom';
// import { ClerkProvider, SignedIn } from '@clerk/clerk-react';
// import { useEffect } from 'react';
// import './root.css';
// import { NotificationProvider } from '../components/NotificationContext';

// const PUBLISHABLE_KEY = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

// if (!PUBLISHABLE_KEY) {
//   throw new Error("Missing Publishable Key");
// }

// export default function RootLayout() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     // Only redirect to dashboard if user is on auth pages
//     const isAuthPage = ['/sign-in', '/sign-up', '/'].includes(location.pathname);
//     if (isAuthPage) {
//       SignedIn && navigate('/dashboard');
//     }
//   }, [location.pathname, navigate]);

//   return (
//     <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
//       <NotificationProvider>
//         <div className="root-layout">
//           <main className="main-content">
//             <Outlet />
//           </main>
//         </div>
//       </NotificationProvider>
//     </ClerkProvider>
//   );
// }

// root-layout.js
import { Outlet, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-react';
import { useEffect } from 'react';
import './root.css';
import { NotificationProvider } from '../components/NotificationContext';

const PUBLISHABLE_KEY = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

export default function RootLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const publicRoutes = ['/', '/yepper-ads', '/yepper-spaces', '/terms', '/privacy', '/sign-in', '/sign-up'];

  useEffect(() => {
    const isAuthPage = ['/sign-in', '/sign-up'].includes(location.pathname);
    
    if (isAuthPage) {
      return; // Let ClerkProvider handle auth page redirects
    }
  }, [location.pathname, navigate]);

  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <NotificationProvider>
        <div className="root-layout">
          <main className="main-content">
            <SignedIn>
              <Outlet />
            </SignedIn>
            <SignedOut>
              {publicRoutes.includes(location.pathname) ? (
                <Outlet />
              ) : (
                <Navigate to="/sign-in" replace />
              )}
            </SignedOut>
          </main>
        </div>
      </NotificationProvider>
    </ClerkProvider>
  );
}