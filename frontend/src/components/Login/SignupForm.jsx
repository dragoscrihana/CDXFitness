import React, { useContext, useState } from 'react'
import './Common.css'
import { AccountContext } from './accountContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const SignupForm = () => {

  const { switchToSignin } = useContext(AccountContext);

  const [formData, setFormData] = useState({ username: "", email: "", password: "", admin: false });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const notify_error = (message) => {
    toast.error(message, {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  };

  const signup = async () => {
    if (formData.password !== formData.confirmPassword) {
      notify_error('Passwords do not match!');
      return;
    }

    const emailPatterns = [
      /^.*@yahoo\.com$/,
      /^.*@mta\.ro$/,
      /^.*@gmail\.com$/,
      /^.*@hotmail\.com$/,
      /^.*@outlook\.com$/,
    ];


    const isValidEmail = emailPatterns.some(pattern => pattern.test(formData.email));
    if (!isValidEmail) {
      notify_error('Please use a valid email address (e.g., *@yahoo.com or *@mta.ro)');
      return;
    }

    let dataObj;
    await fetch('http://localhost:4000/signup', {
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((resp) => resp.json())
      .then((data) => { dataObj = data });

    if (dataObj.success) {
      localStorage.setItem('auth-token', dataObj.token);
      window.location.replace("/");
    }
    else {
      notify_error('Email already in use!');
    }
  }

  return (
    <div className="Box_Container">
      <form action="" className="FormContainer">
        <input type="text" className="Input" placeholder='Full Name' name='username' value={formData.username} onChange={changeHandler} />
        <input type="email" className="Input" placeholder='Email' name='email' value={formData.email} onChange={changeHandler} />
        <input type="password" className="Input" placeholder='Password' name='password' value={formData.password} onChange={changeHandler} />
        <input type="password" className="Input" placeholder='Confirm Password' name='confirmPassword' value={formData.confirmPassword} onChange={changeHandler} />
      </form>
      <button type="submit" onClick={() => signup()} className="SubmitButton">Sign Up</button>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
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
