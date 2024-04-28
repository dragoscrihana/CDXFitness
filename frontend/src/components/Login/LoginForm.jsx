import React, { useContext, useState } from 'react'
import './Common.css'
import { AccountContext } from "./accountContext"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginForm = () => {

  const { switchToSignup } = useContext(AccountContext);

  const [formData, setFormData] = useState({ email: "", password: "" });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const notify_error = () => {
    console.log("failure");
    toast.error('Email or password incorrect!', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  };

  const login = async () => {
    let dataObj;
    await fetch('http://localhost:4000/login', {
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((resp) => resp.json())
      .then((data) => { dataObj = data; });

    console.log(dataObj);

    if (dataObj.success) {
      localStorage.setItem('auth-token', dataObj.token);
      if (dataObj.isAdmin) {
        window.location.replace("/admin");
      } else {
        window.location.replace("/");
      }
    } else {
      notify_error();
    }
  };

  return (
    <div className="Box_Container">
      <form action="" className="FormContainer">
        <input type="email" className="Input" placeholder='Email' name='email' value={formData.email} onChange={changeHandler} />
        <input type="password" className="Input" placeholder='Password' name='password' value={formData.password} onChange={changeHandler} />
      </form>
      <button type="submit" onClick={() => login()} className="SubmitButton">Sign In</button>
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
        Don't have an account?
        <a href="#" onClick={switchToSignup} className="BoldLink">
          Sign up
        </a>
      </a>
    </div>
  )
}

export default LoginForm
