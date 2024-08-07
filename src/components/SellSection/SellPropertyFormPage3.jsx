import React from "react";
import { useNavigate } from "react-router-dom";
import "./SellPropertyFormPage3.css";
import Header from "../Header/Header"; // Assuming the header component is in this path

const SellPropertyFormPage3 = ({ nextStep, prevStep, form, handleChange }) => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    nextStep(e);
  };

  const goToHomePage = () => {
    navigate("/");
  };

  return (
    <>
      
      <div className="page3-container">
        <div className="page3-left-column">
        <div className="page3-text-overlay">
            <h2 className="page3-details-heading">Detailed Property Listings</h2>
            <p className="page3-details-subheading">Accurate property details help potential buyers make informed decisions. Share your property's features and highlights.</p>
          </div>
        </div>
        <div className="page3-right-column">
          <div className="page3-form-container">
            <h2>Sell Your Property - Property Details</h2>
            <form onSubmit={handleSubmit} className="page3-form">
              <input
                type="number"
                name="bedrooms"
                value={form.bedrooms}
                onChange={handleChange}
                placeholder="Bedrooms"
                className="page3-input"
                required
              />
              <input
                type="number"
                name="bathrooms"
                value={form.bathrooms}
                onChange={handleChange}
                placeholder="Bathrooms"
                className="page3-input"
                required
              />
              <input
                type="text"
                name="squareFootage"
                value={form.squareFootage}
                onChange={handleChange}
                placeholder="Square Footage"
                className="page3-input"
                required
              />
              <input
                type="text"
                name="floorPlan"
                value={form.floorPlan}
                onChange={handleChange}
                placeholder="Floor Plan"
                className="page3-input"
                required
              />
              <div className="page3-button-container">
                <button type="button" onClick={prevStep} className="page3-back-button">Back</button>
                <button type="submit" className="page3-next-button">Next</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SellPropertyFormPage3;
