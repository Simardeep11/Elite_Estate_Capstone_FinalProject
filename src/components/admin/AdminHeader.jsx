import React, { useContext, useState, useEffect } from "react";
import "./AdminHeader.css";
import { BiMenuAltRight } from "react-icons/bi";
import { getMenuStyles } from "../../utils/common";
import useHeaderColor from "../../hooks/useHeaderColor";
import OutsideClickHandler from "react-outside-click-handler";
import { AuthContext } from "../../context/AuthContext";
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const AdminHeader = () => {
  const { user, userLoggedIn, logout } = useContext(AuthContext);
  const [menuOpened, setMenuOpened] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [adminDropdownOpen, setAdminDropdownOpen] = useState(false);
  const headerColor = useHeaderColor();
  const navigate = useNavigate();

  useEffect(() => {
    setMenuOpened(false);
    setDropdownOpen(false);
    setAdminDropdownOpen(false);
  }, [userLoggedIn]);

  const handleDropdownToggle = (e) => {
    e.stopPropagation();
    setDropdownOpen(!dropdownOpen);
  };

  const handleAdminDropdownToggle = (e) => {
    e.stopPropagation();
    setAdminDropdownOpen(!adminDropdownOpen);
  };

  const handleOutsideClick = () => {
    setMenuOpened(false);
    setDropdownOpen(false);
    setAdminDropdownOpen(false);
  };

  const handleNavigation = (path) => {
    setDropdownOpen(false);
    setAdminDropdownOpen(false);
    navigate(path);
  };

  return (
    <section className="h-wrapper" style={{ background: headerColor }}>
      <div className="flexCenter innerWidth paddings h-container">
        <div className="logo-text">ELITE ESTATE</div>

        <OutsideClickHandler onOutsideClick={handleOutsideClick}>
          <div className="flexCenter h-menu" style={getMenuStyles(menuOpened)}>
            <a href="#contact-us">Contact Us</a>
            <a href="#news-insight">News and Insight</a>
            {userLoggedIn && user.email === "kaursimar1149@gmail.com" && (
              <div className="admin-menu" onClick={handleAdminDropdownToggle}>
                <span>ADMIN DASHBOARD</span>
                {adminDropdownOpen && (
                  <div className="admin-dropdown">
                    <button onClick={() => handleNavigation('/admin/dashboard')}>Admin Dashboard</button>
                    <button onClick={() => handleNavigation('/admin/bookings')}>Manage Bookings</button>
                    <button onClick={() => handleNavigation('/admin/sell-properties')}>Manage Sell Properties</button>
                  </div>
                )}
              </div>
            )}
            {userLoggedIn ? (
              <div className="profile-menu" onClick={handleDropdownToggle}>
                <FaUserCircle size={30} />
                {dropdownOpen && (
                  <div className="profile-dropdown">
                    <button>{user.email}</button>
                    <button onClick={() => handleNavigation('/account')}>My Account</button>
                    <button className="logout-button" onClick={logout}>Logout</button>
                  </div>
                )}
              </div>
            ) : (
              <button className="button" onClick={() => navigate("/login")}>
                Login
              </button>
            )}
          </div>
        </OutsideClickHandler>

        <div className="menu-icon" onClick={() => setMenuOpened((prev) => !prev)}>
          <BiMenuAltRight size={30} />
        </div>
      </div>
    </section>
  );
};

export default AdminHeader;
