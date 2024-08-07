import React, { useContext } from "react";
import "./AdminHomePage.css";
import AdminHeader from "./AdminHeader";
import Hero from "../Hero/Hero";
import BuySection from "./AdminBuySection";
import SellSection from "./AdminSellSection";
import Contact from "../Contact/Contact";
import NewsAndInsights from "../NewsAndInsights/NewsAndInsights";
import Footer from "../Footer/Footer";
import { AuthContext } from "../../context/AuthContext";

const AdminHomePage = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="admin-homepage">
      <AdminHeader />
      <Hero />
      <BuySection />
      <SellSection />
      <Contact />
      <NewsAndInsights />
      <Footer />
    </div>
  );
};

export default AdminHomePage;
