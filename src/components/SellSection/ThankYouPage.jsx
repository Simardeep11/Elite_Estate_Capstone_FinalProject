import React from "react";
import { useNavigate } from "react-router-dom";
import "./ThankYouPage.css";
import Header from "../Header/Header"; // Adjust the path to your Header component

const ThankYouPage = () => {
  const navigate = useNavigate();

  const handleViewProperty = () => {
    navigate('/'); // Navigate to the homepage
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className="left-column">
          <h2>Have questions? Please call us.
            cd1-877-850-4448</h2>
        </div>
        <div className="right-column">
          <div className="form-container thank-you-wrapper">
            <h2>Thank You for Submitting Your Property!</h2>
            <p>Your property submission is pending approval by the admin. You will be notified once it is approved.</p>
            <button onClick={handleViewProperty}>Visit Our Homepage</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ThankYouPage;
