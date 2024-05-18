import React from 'react';
import './Footer.css';
import { assets } from '../../assets/assets';

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
          <h2 className='logo'>Come<span>Chop</span></h2>
          <p>Hope you have a great time as you explore are delicacy</p>

          <div className="footer-social-icons">
            <img src={assets.facebook_icon} />
            <img src={assets.twitter_icon} />
            <img src={assets.linkedin_icon} />
          </div>
        </div>

        <div className="footer-content-center">
           <h2>Company</h2>

           <ul>
             <li>Home</li>
             <li>About us</li>
             <li>Delivery</li>
             <li>Policy policy</li>
           </ul>
        </div>

        <div className="footer-content-right">
           <h2>GET IN TOUCH</h2>

           <ul>
              <li>+1-212-456-7890</li>
              <li>Contact@comechop.com</li>
           </ul>
        </div>
      </div>

      <hr />
      <p className="footer-copyright">
        Copyright 2024 @ ComeChop.com - All Right Resevred.
      </p>
    </div>
  )
}

export default Footer
