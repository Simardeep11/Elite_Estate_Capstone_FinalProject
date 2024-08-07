import React, { useState } from "react";
import "./Hero.css";
import { HiLocationMarker } from "react-icons/hi";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchInput.trim() !== "") {
      navigate(`/search-results?location=${searchInput}`);
    }
  };

  return (
    <div className="hero-wrapper">
      <div className="content-container">
        <div className="hero-title">
          <motion.h1
            initial={{ y: "2rem", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 2,
              type: "ease-in",
            }}
          >
            Welcome Home
          </motion.h1>
        </div>
        <div className="search-bar">
          <HiLocationMarker color="var(--blue)" size={25} />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Enter location"
          />
          <button className="button" onClick={handleSearch}>
            Search
          </button>
        </div>
        <div className="stats">
          <div className="stat">
            <span>
              <CountUp start={2} end={37} duration={4} /> <span>+</span>
            </span>
            <span className="secondaryText">Premium Livings</span>
          </div>
          <div className="stat">
            <span>
              <CountUp start={150} end={200} duration={4} /> <span>+</span>
            </span>
            <span className="secondaryText">Happy Customer</span>
          </div>
          <div className="stat">
            <span>
              <CountUp end={112} /> <span>+</span>
            </span>
            <span className="secondaryText">Homes Sold and Bought</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
