import React from 'react'
import Header from '../Header/Header'
import './Hero.css'
import hero_image from "../../assets/hero_image.png";
import hero_image_back from "../../assets/hero_image_back1.png";
import Heart from "../../assets/heart.png";
import NumberCounter from 'number-counter'
import {motion} from 'framer-motion'
const Hero = ({ onLoginClick }) => {

  const transition = {type: 'spring', duration : 3}
  const mobile = window.innerWidth<=768 ? true: false;
  
  return (
    <div className="hero" id='home'>

      <div className="blur hero-blur"></div>
      
      <div className="left">
        <Header/>
{/* the best ad */}
        <div className="the-best">
          <motion.div
          initial={{left: mobile? '160px': '238px'}}
          whileInView={{left: '8px'}}
          transition={{...transition, type: 'tween'}}    
          ></motion.div>
          <span>The best fitness app on the internet</span>
        </div>

{/* Hero heading */}
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

            {/* figures */}
          <div className="figures">
            <div>
              <span>
                <NumberCounter end={140} start={100} delay='4' preFix="+"/>
              </span>
              <span>expert coaches</span>
            </div>
            <div>
              <span>
               <NumberCounter end={978} start={800} delay='4' preFix="+"/>
              </span>
              <span>members joined</span>
            </div>
            <div>
              <span>
                
              <NumberCounter end={50} start={0} delay='4' preFix="+"/>
              </span>
              <span>fitness programs</span>
            </div>
          </div>

          {/* hero buttons */}
          <div className="hero-buttons">
            <buttons className="btn">Get Started</buttons>
            <buttons className="btn">Learn More</buttons>
          </div>
        </div>

        <div className="right">
          <button className="btn" onClick={onLoginClick}>Log In</button>
          <button className="btn" onClick={onLoginClick}>Join Now</button>
  

          <motion.div
          initial={{ right: "-1rem "}}
          whileInView={{right:"4rem"}}
          transition={transition}
          className="heart-rate">
            <img src={Heart} alt="" />
            <span>Heart Rate</span>
            <span>116 bpm</span>
          </motion.div>

          {/* hero images */}
          <img src={hero_image} alt="" className="hero-image" />
          <motion.img 
          initial={{ right: '11rem' }}
          whileInView={{right: '20rem'}}
          transition={transition}
          src={hero_image_back} alt="" className="hero-image-back" />
          
        
        </div>
    </div>
  )
}

export default Hero
