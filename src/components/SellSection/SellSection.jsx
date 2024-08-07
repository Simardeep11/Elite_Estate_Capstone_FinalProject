import React from "react";
import "./SellSection.css";
import { useNavigate } from "react-router-dom";

const SellSection = () => {
  const navigate = useNavigate();

  return (
    <section id="sell" className="v-wrapper">
      <div className="v-container">
        {/* left side */}
        <div className="flexColStart v-left">
          <span className="highlightText">Our Value</span>
          <h2 className="mainText">Value We Give to You</h2>
          <p className="descriptionText">
            We are always ready to help by providing the best services for you.
            We believe a good place to live can make your life better.
          </p>
          <p className="descriptionText">
            Learn about our journey, our values, and how we can help you achieve your goals. Dive into our world of innovation and excellence.
          </p>
          <button
            className="sell-property-button"
            onClick={() => navigate('/sell-property')}
          >
            Sell Your Property
          </button>
        </div>

        {/* right side */}
        <div className="v-right">
          <div className="image-container">
            <img src="./SSBackground.jpg" alt="Value" className="value-image" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SellSection;
