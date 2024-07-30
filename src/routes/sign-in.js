import { SignIn } from "@clerk/clerk-react"
import './auth.css'
 
export default function SignInPage() {
  return (
    <div className="authCtn">
      <SignIn />
    </div>
  )
}