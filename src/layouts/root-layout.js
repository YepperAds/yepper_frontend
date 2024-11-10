// root-layout.js
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { ClerkProvider, SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import { useEffect } from 'react';
import './root.css';

const PUBLISHABLE_KEY = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

export default function RootLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to dashboard if already signed in
    SignedIn && navigate('/dashboard');
  }, []);

  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <div>
        <div className="userButton">
          <SignedIn>
            <UserButton afterSignOutUrl="/sign-in" />
          </SignedIn>
          <SignedOut>
            <Link to="/sign-in">Sign In</Link>
          </SignedOut>
        </div>
      </div>
      <main>
        <Outlet />
      </main>
    </ClerkProvider>
  );
}
