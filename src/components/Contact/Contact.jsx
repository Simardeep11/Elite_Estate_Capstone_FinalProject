import React from "react";
import "./Contact.css";
import linkedinIcon from '/Linkedin.png';
import facebookIcon from '/Facebook.png';
import instagramIcon from '/Instagram.png';
import youtubeIcon from '/Youtube.png';

const Contact = () => {
  return (
    <div id="contact-us" className="contact-wrapper">
      <div className="contact-container">
        <div className="contact-info">
          <h2>Contact Us</h2>
          <p>Phone: <strong>+1 (123) 456-7890</strong></p>
          <p>Email: <strong>info@eliteestate.com</strong></p>
          <p>Address: <strong>1234 Real Estate St, Calgary, Alberta, Canada</strong></p>
          <div className="social-media">
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
              <img src={linkedinIcon} alt="LinkedIn" className="social-icon" />
            </a>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <img src={facebookIcon} alt="Facebook" className="social-icon2" />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <img src={instagramIcon} alt="Instagram" className="social-icon" />
            </a>
            <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
              <img src={youtubeIcon} alt="YouTube" className="social-icon" />
            </a>
          </div>
        </div>
        <div className="map-container">
          <iframe
            title="Google Map"
            className="map-embed"
            src="https://maps.google.com/maps?width=100%25&amp;height=300&amp;hl=en&amp;q=Cityside%20Heath,Cityscape+(Elite%20Estate)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
            allowFullScreen
          ></iframe>
          <div className="location">
            <h3>Location</h3>
            <p>Elite Estate</p>
            <p>Calgary, Alberta, Canada</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
