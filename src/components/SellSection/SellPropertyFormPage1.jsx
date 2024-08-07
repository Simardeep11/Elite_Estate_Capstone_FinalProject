import React from "react";
import { useNavigate } from "react-router-dom";
import "./SellPropertyFormPage1.css";
import Header from "../Header/Header"; // Adjust the path if necessary


const SellPropertyFormPage1 = ({ form, handleChange, nextStep }) => {
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
      
      <div className="page1-container">
        <div className="page1-left-column">
          <h2 className="page1-heading">Hi! We want to buy your home.</h2>
        
        </div>
        <div className="page1-right-column">
          <div className="page1-form-container">
            <h2>Sell Your Property - Basic Information</h2>
            <form onSubmit={handleSubmit} className="page1-form">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Property Name"
                className="page1-input"
                required
              />
              <input
                type="text"
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="Property Price"
                className="page1-input"
                required
              />
              <textarea
                name="detail"
                value={form.detail}
                onChange={handleChange}
                placeholder="Property Detail"
                className="page1-textarea"
                required
              />
              <div className="page1-button-container">
                <button type="submit" className="page1-next-button">Next</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SellPropertyFormPage1;
