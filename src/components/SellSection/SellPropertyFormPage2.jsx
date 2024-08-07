import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header"; // Assuming the header component is in this path
import "./SellPropertyFormPage2.css";


const SellPropertyFormPage2 = ({ nextStep, prevStep, form, handleChange }) => {
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
      
      <div className="page2-container">
        <div className="page2-left-column">
        <div className="page2-text-overlay">
            <h2 className="page2-heading">Your Property, Our Priority</h2>
          </div>
        </div>
        <div className="page2-right-column">
          <div className="page2-form-container">
            <h2>Sell Your Property - Location and Category</h2>
            <form onSubmit={handleSubmit} className="page2-form">
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Location"
                className="page2-input"
                required
              />
              <input
                type="text"
                name="ownerName"
                value={form.ownerName}
                onChange={handleChange}
                placeholder="Owner Name"
                className="page2-input"
                required
              />
              <input
                type="email"
                name="ownerEmail"
                value={form.ownerEmail}
                onChange={handleChange}
                placeholder="Owner Email"
                className="page2-input"
                required
              />
              <input
                type="text"
                name="category"
                value={form.category}
                onChange={handleChange}
                placeholder="Category"
                className="page2-input"
                required
              />
              <div className="page2-button-container">
                <button type="button" onClick={prevStep} className="page2-back-button">Back</button>
                <button type="submit" className="page2-next-button">Next</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SellPropertyFormPage2;
