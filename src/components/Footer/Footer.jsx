import React from 'react'
import './Footer.css'
import Github from "../../assets/github.png"
import Instagram from "../../assets/instagram.png"
import LinkedIn from "../../assets/linkedin.png"
import Logo from "../../assets/logo1.png"
const Footer = () => {
  return (
    <div className="Footer-container">
        <hr />
        <div className="footer">
            <div className="social-links">
                <a  href="https://github.com/dragoscrihana" target="_blank">
                    <img src={Github} alt="" />
                </a>
                    <a  href="https://www.instagram.com/dragoscrihana/" target="_blank">
                        <img src={Instagram} alt=""/>
                </a>
                <a  href="https://www.linkedin.com/in/dragos-mihai-crihana-0638842ba/" target="_blank">
                    <img src={LinkedIn} alt="" />
                </a>
            </div>
            
            <div className="logo-f">
                <img src={Logo} alt="" />
            </div>
        </div>
        <div className="blur blur-f-1"></div>
        <div className="blur blur-f-2"></div>
    </div>
  )
}

export default Footer
