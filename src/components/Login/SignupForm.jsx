import React, { useContext } from 'react'
import './Common.css'
import { AccountContext } from './accountContext';
const SignupForm = () => {

  const { switchToSignin } = useContext(AccountContext);

  return (
    <div className="Box_Container">
        <form action="" className="FormContainer">
            <input type="text" className="Input" placeholder='Full Name'/>
            <input type="email" className="Input" placeholder='Email'/>
            <input type="password" className="Input" placeholder='Password'/>
            <input type="password" className="Input" placeholder='Confirm Password'/>
        </form>
        <button type="submit" className="SubmitButton">Sign Up</button>
        <a href="#" className="MutedLink">
            Already have an account?
            <a href="#" className="BoldLink" onClick={switchToSignin}>
                Sign in
            </a>
        </a>
    </div>
  )
}

export default SignupForm
