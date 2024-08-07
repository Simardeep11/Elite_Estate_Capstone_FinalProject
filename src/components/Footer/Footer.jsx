import React from "react";
import "./Footer.css";
import logo from "/logo2.png"; // Ensure the logo is correctly imported
import linkedinIcon from '/Linkedin.png';
import facebookIcon from '/Facebook.png';
import instagramIcon from '/Instagram.png';
import youtubeIcon from '/Youtube.png';

const Footer = () => {
  return (
    <div className="f-wrapper">
      <div className="innerWidth f-container">
        <div className="f-about">
          <img src={logo} alt="Elite Estate Logo" className="footer-logo" />
          <p className="footer-text">
            Elite Estate helps clients find their dream homes and investment properties with personalized services.
          </p>
        </div>
        <div className="f-right">
          <p className="footer-text">Established in 2005, serving Calgary for over 15 years.</p>
          <p className="footer-text">Winner of the Best Real Estate Agency Award 2021.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
