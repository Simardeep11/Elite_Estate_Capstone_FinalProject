import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // import carousel styles;
import './InsightsPage.css';

const InsightsPage = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const data = [
        { name: 'Cityscape', price: 550000, median: 525000, sold: 45, days: 30, sqft: 350 },
        { name: 'Martindale', price: 460000, median: 440000, sold: 60, days: 28, sqft: 320 },
        { name: 'Chinook Gate', price: 490000, median: 470000, sold: 50, days: 32, sqft: 340 },
        { name: 'Livingston', price: 520000, median: 500000, sold: 55, days: 31, sqft: 360 },
        { name: 'Savana', price: 480000, median: 460000, sold: 48, days: 29, sqft: 330 },
        { name: 'Seton', price: 530000, median: 510000, sold: 52, days: 30, sqft: 345 },
        { name: 'Dalhousie', price: 560000, median: 540000, sold: 40, days: 35, sqft: 355 },
        { name: 'Elbow Park', price: 590000, median: 570000, sold: 30, days: 40, sqft: 370 },
        { name: 'Oakridge', price: 470000, median: 450000, sold: 58, days: 27, sqft: 315 },
        { name: 'Redstone', price: 500000, median: 480000, sold: 53, days: 30, sqft: 325 },
        { name: 'Crescent Heights', price: 610000, median: 590000, sold: 25, days: 45, sqft: 380 },
    ];

    const data2 = [
        { name: 'January', listings: 200, sales: 150, avgPrice: 450000 },
        { name: 'February', listings: 250, sales: 200, avgPrice: 460000 },
        { name: 'March', listings: 300, sales: 250, avgPrice: 470000 },
        { name: 'April', listings: 280, sales: 220, avgPrice: 465000 },
        { name: 'May', listings: 320, sales: 270, avgPrice: 475000 },
        { name: 'June', listings: 330, sales: 290, avgPrice: 480000 },
    ];

    const data3 = [
        { name: '2017', appreciation: 3 },
        { name: '2018', appreciation: 3.5 },
        { name: '2019', appreciation: 4 },
        { name: '2020', appreciation: 4.5 },
        { name: '2021', appreciation: 5 },
        { name: '2022', appreciation: 5.5 },
    ];

    const data4 = [
        { name: 'Single-Family', percentage: 60 },
        { name: 'Condo', percentage: 20 },
        { name: 'Townhouse', percentage: 15 },
        { name: 'Multi-Family', percentage: 5 },
    ];

    const data5 = [
        { name: 'Northwest', growth: 10 },
        { name: 'Northeast', growth: 12 },
        { name: 'Southwest', growth: 8 },
        { name: 'Southeast', growth: 15 },
    ];

    const navigate = useNavigate();

    const handleSwitchChange = () => {
        navigate("/explore-calgary");
    };

    const handleBackHome = () => {
        navigate("/");
    };

    const handleTabClick = (index) => {
        setCurrentIndex(index);
    };

    const renderTabs = () => {
        const tabs = ["Community Overview", "Monthly Listings and Sales", "Yearly Appreciation", "Property Types", "Regional Growth"];
        return (
            <div className="tabs">
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        className={`tab-button ${currentIndex === index ? 'active' : ''}`}
                        onClick={() => handleTabClick(index)}
                    >
                        {tab}
                    </button>
                ))}
            </div>
        );
    };

    return (
        <div className="insights-page-container">
           
            <header className="insights-header">
                <h2>Calgary Real Estate Insights</h2>
                <p>Explore detailed insights and statistics for various communities in Calgary</p>
                <label className="insights-switch">
                    <input type="checkbox" onChange={handleSwitchChange} />
                    <span className="checkmark"></span>
                    <span className="switch-label">Explore Calgary</span>
                </label>
            </header>
            <div className="insights-content">
                <h2>Community Data and Charts</h2>
                {renderTabs()}
                <Carousel
                    selectedItem={currentIndex}
                    showThumbs={false}
                    showStatus={false}
                    infiniteLoop
                    useKeyboardArrows
                    onChange={(index) => setCurrentIndex(index)}
                    renderArrowPrev={(clickHandler, hasPrev) =>
                        hasPrev && (
                            <button className="carousel-arrow carousel-arrow-prev" onClick={clickHandler}>
                                &#10094;
                            </button>
                        )
                    }
                    renderArrowNext={(clickHandler, hasNext) =>
                        hasNext && (
                            <button className="carousel-arrow carousel-arrow-next" onClick={clickHandler}>
                                &#10095;
                            </button>
                        )
                    }
                >
                    <div>
                        <h3>Community Overview</h3>
                        <ResponsiveContainer width="100%" height={400}>
                            <BarChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="price" fill="#8884d8" />
                                <Bar dataKey="median" fill="#82ca9d" />
                                <Bar dataKey="sold" fill="#ffc658" />
                                <Bar dataKey="days" fill="#ff8042" />
                                <Bar dataKey="sqft" fill="#ffbb28" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div>
                        <h3>Monthly Listings and Sales</h3>
                        <ResponsiveContainer width="100%" height={400}>
                            <BarChart data={data2}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="listings" fill="#8884d8" />
                                <Bar dataKey="sales" fill="#82ca9d" />
                                <Bar dataKey="avgPrice" fill="#ffc658" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div>
                        <h3>Yearly Appreciation</h3>
                        <ResponsiveContainer width="100%" height={400}>
                            <BarChart data={data3}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="appreciation" fill="#82ca9d" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div>
                        <h3>Property Types</h3>
                        <ResponsiveContainer width="100%" height={400}>
                            <BarChart data={data4}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="percentage" fill="#ffbb28" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div>
                        <h3>Regional Growth</h3>
                        <ResponsiveContainer width="100%" height={400}>
                            <BarChart data={data5}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="growth" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Carousel>
            </div>
        </div>
    );
};

export default InsightsPage;
