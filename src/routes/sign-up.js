// sign-up.js
import { SignUp } from "@clerk/clerk-react";
import './auth.css';

export default function SignUpPage() {
  return (
    <div className="authCtn">
      <div className="authCard">
        <h1 className="authHeader">Create Your Account</h1>
        <p className="authSubtext">Join us for a unique advertising journey!</p>
        <SignUp redirectUrl="/dashboard" />
      </div>
    </div>
  );
}
