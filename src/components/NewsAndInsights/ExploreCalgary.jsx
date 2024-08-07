import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ExploreCalgary.css';
import togetherImg from '/Calgary_Cityscape.jpg';
import sunsetImg from '/Cityscape1.jpg';
import downtownImg from '/Cityscape2.jpg';
import towerImg from '/Citycape3.jpg';
import stephenDayImg from '/Cityscape4.jpg';
import stephenNightImg from '/Cityscape5.jpg';
import peaceBridgeImg from '/Cityscape6.jpg';
import transitImg from '/Cityscape7.jpg';
import cityHallImg from '/Cityscape8.jpeg';


const ExploreCalgary = () => {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleSwitchChange = (event) => {
        if (event.target.checked) {
            navigate('/insights');
        }
    };

    const handleBackHome = () => {
        navigate("/");
    };

    const [expandedSection, setExpandedSection] = useState(null);

    const toggleReadMore = (section) => {
        setExpandedSection(expandedSection === section ? null : section);
    };

    const isExpanded = (section) => {
        return expandedSection === section;
    };

    const sections = [
        {
            title: "Calgary Cityscape",
            imgSrc: togetherImg,
            shortText: "The Calgary real estate market is currently experiencing a notable upswing. The average home price has reached $518,000, reflecting a 3% increase year-over-year.",
            longText: "The median home price stands at $475,000, with approximately 2,300 homes sold in the last month. Properties typically spend around 35 days on the market, with the price per square foot averaging $325. This indicates a robust demand across various neighborhoods in the city. Investing in Calgary's diverse and dynamic real estate market provides significant opportunities for growth and stability, making it an attractive option for both new buyers and seasoned investors."
        },
        {
            title: "Sunset Over Calgary",
            imgSrc: sunsetImg,
            shortText: "Sunsets in Calgary not only offer a beautiful view but also signify the potential for lucrative real estate investments.",
            longText: "Properties with views of the Calgary skyline and sunset have been known to command a premium price, attracting high-net-worth individuals and investors. The average price for such properties has increased by 7% annually. The serene environment and aesthetic appeal of sunset properties also enhance the quality of life, making them highly desirable for both residential and rental markets."
        },
        {
            title: "Downtown Calgary",
            imgSrc: downtownImg,
            shortText: "The downtown skyline of Calgary is a testament to its growth and sustainability.",
            longText: "With ongoing urban development projects, the area has seen a surge in commercial real estate investments. Office spaces in downtown Calgary have an average occupancy rate of 85%, with rental yields averaging 6-7%. The blend of green spaces and urban infrastructure makes downtown Calgary an attractive destination for businesses and residents alike."
        },
        {
            title: "Calgary Tower at Night",
            imgSrc: towerImg,
            shortText: "The Calgary Tower, illuminated at night, symbolizes the city's vibrant nightlife and economic vitality.",
            longText: "Properties near the tower benefit from high visibility and tourist traffic, which translates to higher rental income and property values. The average rental income for properties in this area is 15% higher than the city average. Investing in real estate around the Calgary Tower offers long-term benefits."
        },
        {
            title: "Stephen Avenue Walk",
            imgSrc: stephenDayImg,
            shortText: "Stephen Avenue Walk is a bustling pedestrian mall that enhances the commercial real estate market in Calgary.",
            longText: "Properties here benefit from high foot traffic and vibrant commercial activities. The area has seen a 20% increase in retail property values over the past five years. The avenue's mix of historic charm and modern amenities makes it a prime location for businesses and retail investors."
        },
        {
            title: "Stephen Avenue at Night",
            imgSrc: stephenNightImg,
            shortText: "At night, Stephen Avenue transforms into a hub of entertainment and nightlife, significantly boosting the hospitality and short-term rental markets.",
            longText: "Properties here have an occupancy rate of 90% for short-term rentals, with nightly rates 25% higher than the city average. The lively atmosphere attracts both tourists and locals, ensuring a steady stream of income for property owners."
        },
        {
            title: "Peace Bridge",
            imgSrc: peaceBridgeImg,
            shortText: "The Peace Bridge is not only an architectural marvel but also a driver of real estate development in its vicinity.",
            longText: "Properties near the bridge have appreciated by 10% annually, driven by the bridge's iconic status and the connectivity it offers. Investing in real estate around the Peace Bridge offers both aesthetic and practical benefits."
        },
        {
            title: "Calgary Transit",
            imgSrc: transitImg,
            shortText: "Calgary’s efficient public transit system is a boon for the real estate market.",
            longText: "Properties near transit lines have seen a 12% increase in value due to the convenience and accessibility they offer. The average property near a transit line commands a 10-15% premium over those further away."
        },
        {
            title: "Calgary Historic City Hall",
            imgSrc: cityHallImg,
            shortText: "The historic Calgary City Hall is a landmark that adds value to the surrounding properties.",
            longText: "Real estate in this area has appreciated by 8% annually, driven by the historical significance and aesthetic appeal of the city hall. Investing in properties near Calgary City Hall offers long-term stability and growth."
        }
    ];

    return (
        <div className="calgary-explore-container">
           
            <header className="calgary-explore-header">
                <h2>Explore The Market Of Calgary</h2>
                <p>Discover opportunities and insights in Calgary's real estate market</p>
                <div className="calgary-news-insights-switch">
                    <label>
                        <input type="checkbox" onChange={handleSwitchChange} />
                        COMMUNITY INSIGHTS
                    </label>
                </div>
            </header>
            <div className="calgary-explore-content">
                {sections.map((section, index) => (
                    <section
                        className={`calgary-explore-section ${index % 2 === 0 ? 'left-aligned' : 'right-aligned'}`}
                        key={index}
                    >
                        <div className="calgary-section-image-container">
                            <img src={section.imgSrc} alt={section.title} className="calgary-section-image" />
                        </div>
                        <div className={`calgary-explore-text calgary-explore-text-${index % 2 === 0 ? 'left' : 'right'}`}>
                            <h2 className="calgary-section-title">{section.title}</h2>
                            <p>
                                {section.shortText}
                                {isExpanded(index) && <span>{section.longText}</span>}
                            </p>
                            <button className="calgary-query-button" onClick={() => toggleReadMore(index)}>
                                {isExpanded(index) ? "Read Less" : "Read More"}
                            </button>
                        </div>
                    </section>
                ))}
            </div>
        </div>
    );
};

export default ExploreCalgary;
