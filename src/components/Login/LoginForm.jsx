import React, { useContext } from 'react'
import './Common.css'
import { AccountContext } from "./accountContext"

const LoginForm = () => {

  const { switchToSignup } = useContext(AccountContext);

  return (
    <div className="Box_Container">
        <form action="" className="FormContainer">
            <input type="email" className="Input" placeholder='Email'/>
            <input type="password" className="Input" placeholder='Password'/>
        </form>
        <button type="submit" className="SubmitButton">Sign In</button>
        <a href="#" className="MutedLink">
            Don't have an account?
            <a href="#" onClick={switchToSignup} className="BoldLink">
                Sign up
            </a>
        </a>
    </div>
  )
}

export default LoginForm
