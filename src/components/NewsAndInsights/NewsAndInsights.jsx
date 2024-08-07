import React, { useState, useEffect } from "react";
import "./NewsAndInsights.css";
import { useNavigate } from 'react-router-dom';

const highlightsData = [
    {
        percentage: "18%",
        text: "of Calgary residents are considering purchasing a new home in the next year, an increase from 12% in the previous year, indicating growing confidence.",
    },
    {
        percentage: "22%",
        text: "of real estate transactions in Calgary involved first-time homebuyers, showcasing the appeal of the city for new entrants into the property market.",
    },
    {
        percentage: "8%",
        text: "of Calgary home sellers expect to list their properties at prices higher than the market average, reflecting optimism about property values and market conditions.",
    },
    {
        percentage: "30%",
        text: "of Calgary homeowners plan to invest in home renovations within the next year, driven by the desire to increase property value and improve living conditions.",
    }
];

const NewsAndInsights = () => {
    const [currentHighlightIndex, setCurrentHighlightIndex] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentHighlightIndex((prevIndex) =>
                prevIndex === highlightsData.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const currentHighlight = highlightsData[currentHighlightIndex];
    const imageUrl = "/MIBackground.jpg"; // Assuming this is a static image URL

    return (
        <div id="news-insight" className="ni-container">
            <div className="ni-header-section">
                <h2>Market and Insights</h2>
                <p>Calgary was named the 4th most livable city in the world</p>
            </div>
            <div className="ni-main-content-section">
                <div className="ni-left-column">
                    <img src={imageUrl} alt="Highlight" className="ni-image"/>
                </div>
                <div className="ni-right-column">
                    <div className="ni-stat-box">
                        <h2>{currentHighlight.percentage}</h2>
                        <p>{currentHighlight.text}</p>
                    </div>
                </div>
            </div>
            <div className="ni-footer-section">
                <button className="ni-cta-button" onClick={() => navigate("/explore-calgary")}>
                    Explore The Market Of Calgary
                </button>
            </div>
        </div>
    );
};

export default NewsAndInsights;
