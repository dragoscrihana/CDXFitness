import React from 'react'
import img from '../../assets/right_img.png'
import img1 from '../../assets/arrow_icon.png'
import './Contact.css'

const Contact = () => {
  return (
    <div className="contact-container">
        <form action="https://api.web3forms.com/submit" method="POST" className="contact-left">
            <div className="contact-left-title">
                <h2>Get in touch</h2>
                <hr />
            </div>
            <input type="hidden" name="access_key" value="4620df4b-b24c-4a3a-84f5-f13a3c5ee081"></input>
            <input type="text" name='name' placeholder='Your Name' className='contact-inputs' required/>
            <input type="email" name='email' placeholder='Your Email' className='contact-inputs' required/>
            <textarea name="message" placeholder='Your message' className='contact-inputs' required></textarea>
            <button type='submit'>Submit<img src={img1} alt="" /></button>
        </form>
        <div className="contact-right">
            <img src={img} alt="" />
        </div>
    </div>
  )
}

export default Contact
