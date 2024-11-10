// sign-in.js
import { SignIn } from "@clerk/clerk-react";
import './auth.css';

export default function SignInPage() {
  return (
    <div className="authCtn">
      <div className="authCard">
        <h1 className="authHeader">Welcome Back!</h1>
        <p className="authSubtext">Ready to dive into unboring advertising?</p>
        <SignIn redirectUrl="/dashboard" />
      </div>
    </div>
  );
}
