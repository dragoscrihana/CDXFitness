import React, { useState } from 'react'
import './Login.css'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import { motion } from 'framer-motion'
import { AccountContext } from './accountContext'
import Logo from '../../assets/112.png'

const backdropVariants = {
    expanded: {
        width: "233%" ,
        height: "1050px" ,
        borderRadius: "20%",
        transform: "rotate(60deg)"
    },
    collapsed: {
        width: "160%" ,
        height: "550px" ,
        borderRadius: "50%",
        transform: "rotate(60deg)"
    }
}

const expandingTransition = {
    type: "spring",
    duration: 2.3,
    stiffness: 30
}

const Login = ({onCloseClick, state}) => {
    const [isExpanded, setExpanded] = useState(false);
    const [active, setActive] = useState(state ? "signin" : "signup");

    const playExpandingAnimation = () => {
        setExpanded(true);
        setTimeout(() => {
            setExpanded(false);
        }, expandingTransition.duration * 1000 -1500);
    };

    const switchToSignup = () => {
        playExpandingAnimation();
        setTimeout(() => {
            setActive("signup");
        }, 400);
    };

    const switchToSignin = () => {
        playExpandingAnimation();
        setTimeout(() => {
            setActive("signin");
        }, 400);
    };

    const contextValue = {switchToSignup, switchToSignin};

    const handleCloseButtonClick = () => {
        if (typeof onCloseClick === 'function') {
            onCloseClick();
            
            window.location.reload();
        }
    };

  return (
    <div className="login_container">
        <AccountContext.Provider value={contextValue}>
            <div className="BoxContainer">
                    <button className="CloseButton" onClick={handleCloseButtonClick}>
                    </button>
                <div className="TopContainer">
                    <div className="TopLeft">
                        <motion.div initial={false} animate={isExpanded ? "expanded" : "collapsed"} variants={backdropVariants}
                        className="BackDrop" transition={expandingTransition}>
                        </motion.div>
                        
                        {active === "signin" && (
                            <div className="HeaderContainer">
                                <h2 className="HeaderText">
                                    Welcome
                                </h2>
                                <h2 className="HeaderText">
                                    Back
                                </h2>
                                <h5 className="SmallText">
                                    Please sign-in to continue!
                                </h5>
                            </div>
                        )}

                        {active === "signup" && (
                            <div className="HeaderContainer">
                                <h2 className="HeaderText">
                                    Create
                                </h2>
                                <h2 className="HeaderText">
                                    Account
                                </h2>
                                <h5 className="SmallText">
                                    Please sign-up to continue!
                                </h5>
                            </div>
                        )}
                    </div>
                    
                    <div className="TopRight">
                        <img src={Logo} alt="" className='logo'></img>
                    </div>
                    
                    
                </div>
                <div className="InnerContainer">
                    {active === "signin" && <LoginForm/>}
                    {active === "signup" && <SignupForm/>}
                    
                </div>
            </div>
        </AccountContext.Provider>
    </div>
  )
}

export default Login
