import { SignUp } from "@clerk/clerk-react"
import './auth.css'

export default function SignUpPage() {
  return (
    <div className="authCtn">
      <SignUp />
    </div>
  )
}