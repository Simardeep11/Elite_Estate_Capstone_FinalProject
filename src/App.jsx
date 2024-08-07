import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./App.css";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import NewsAndInsights from "./components/NewsAndInsights/NewsAndInsights";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import BuySection from "./components/BuySection/BuySection";
import SellSection from "./components/SellSection/SellSection";
import LoginPage from "./login/page.jsx";
import AdminPage from "./components/admin/AdminPage";
import AdminHomePage from "./components/admin/AdminHomePage";
import PropertyDetail from "./components/BuySection/PropertyDetail";
import SearchResults from "./components/Hero/SearchResults";
import SellPropertyForm from "./components/SellSection/SellPropertyForm";
import AdminSellProperties from "./components/admin/AdminSellProperties";
import AdminBookings from "./components/admin/AdminBookings";
import AllListings from "./components/BuySection/AllListings";
import MyAccount from "./components/MyAccount/MyAccount";
import MyFavorites from "./components/MyFavorites/MyFavorites";
import MyBookings from "./components/MyBookings/MyBookings";
import ThankYouPage from "./components/SellSection/ThankYouPage";
import ExploreCalgary from './components/NewsAndInsights/ExploreCalgary';
import InsightsPage from './components/NewsAndInsights/InsightsPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={
            <>
              <div>
                <div className="white-gradient" />
                <Header />
                <Hero />
              </div>
              <BuySection />
              <SellSection />
              <NewsAndInsights />
              <Contact />
              <Footer />
            </>
          } />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminHomePage />} />
          <Route path="/admin/dashboard" element={<AdminPage />} />
          <Route path="/property/:id" element={<PropertyDetail />} />
          <Route path="/search-results" element={<SearchResults />} />
          <Route path="/admin/bookings" element={<AdminBookings />} />
          <Route path="/admin/sell-properties" element={<AdminSellProperties />} />
          <Route path="/sell-property" element={<SellPropertyForm />} />
          <Route path="/thank-you" element={<ThankYouPage />} />
          <Route path="/all-listings" element={<AllListings />} />
          <Route path="/account" element={<MyAccount />} />
          <Route path="/favorites" element={<MyFavorites />} />
          <Route path="/bookings" element={<MyBookings />} />
          <Route path="/explore-calgary" element={<ExploreCalgary />} />
          <Route path="/insights" element={<InsightsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
