import React from 'react';
import Header from '../Header/Header';
import './Hero.css';
import hero_image from "../../assets/hero_image.png";
import hero_image_back from "../../assets/hero_image_back1.png";
import Heart from "../../assets/heart.png";
import NumberCounter from 'number-counter';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Hero = ({ onLoginClick }) => {
  const navigate = useNavigate();

  const handleGetStartedClick = (event) => {
    const authToken = localStorage.getItem("auth-token");
    if (!authToken) {
      event.preventDefault();
      notify_error("Please log in first!");
    } else {
      navigate('/exercises');
    }
  };

  const notify_error = (message) => {
    toast.error(message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    setTimeout(() => {
    }, 5000);
  };

  const transition = { type: 'spring', duration: 3 };
  const mobile = window.innerWidth <= 768 ? true : false;

  return (
    <div className="hero" id='home'>
      <div className="blur hero-blur"></div>
      <div className="left">
        <Header />
        <div className="the-best">
          <motion.div
            initial={{ left: mobile ? '160px' : '238px' }}
            whileInView={{ left: '8px' }}
            transition={{ ...transition, type: 'tween' }}
          ></motion.div>
          <span>The best fitness app on the internet</span>
        </div>

        <div className="hero-text">
          <div>
            <span className='stroke-text'>Shape </span>
            <span>Your</span>
          </div>
          <div>
            <span>Ideal body</span>
          </div>
          <div>
            <span>In here we will help you to shape and build your ideal body and live up your life to the fullest</span>
          </div>
        </div>

        <div className="figures">
          <div>
            <span>
              <NumberCounter end={140} start={100} delay='4' preFix="+" />
            </span>
            <span>expert coaches</span>
          </div>
          <div>
            <span>
              <NumberCounter end={978} start={800} delay='4' preFix="+" />
            </span>
            <span>members joined</span>
          </div>
          <div>
            <span>
              <NumberCounter end={50} start={0} delay='4' preFix="+" />
            </span>
            <span>fitness programs</span>
          </div>
        </div>

        <div className="hero-buttons">
          <button className="start-btn" onClick={handleGetStartedClick}>Get Started</button>
          <Link to='/contact'><button className="contact-btn">Contact us</button></Link>
        </div>
      </div>

      <div className="right">
        {localStorage.getItem('auth-token')
          ? <div>
              <button className='btn hero-btn3' onClick={() => { localStorage.removeItem('auth-token'); window.location.replace("/"); }}>Logout</button>
              <Link to="/user/accountsettings" className='link-navbar'><button className='btn hero-btn4'>My Profile</button></Link>
            </div>
          : <div>
              <button className="btn hero-btn1" onClick={onLoginClick}>Log In</button>
              <button className="btn hero-btn2" onClick={onLoginClick}>Join Now</button>
            </div>
        }

        <motion.div
          initial={{ right: "-1rem " }}
          whileInView={{ right: "4rem" }}
          transition={transition}
          className="heart-rate">
          <img src={Heart} alt="" />
          <span>Heart Rate</span>
          <span>116 bpm</span>
        </motion.div>

        <img src={hero_image} alt="" className="hero-image" />
        <motion.img
          initial={{ right: '11rem' }}
          whileInView={{ right: '20rem' }}
          transition={transition}
          src={hero_image_back} alt="" className="hero-image-back" />
      </div>
      
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
    </div>
  );
}

export default Hero;
