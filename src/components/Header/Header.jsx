import React, { useContext, useState, useEffect } from "react";
import { HashLink as Link } from 'react-router-hash-link';
import "./Header.css";
import { BiMenuAltRight } from "react-icons/bi";
import { getMenuStyles } from "../../utils/common";
import useHeaderColor from "../../hooks/useHeaderColor";
import OutsideClickHandler from "react-outside-click-handler";
import { AuthContext } from "../../context/AuthContext";
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { user, userLoggedIn, logout } = useContext(AuthContext);
  const [menuOpened, setMenuOpened] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const headerColor = useHeaderColor();
  const navigate = useNavigate();

  useEffect(() => {
    setMenuOpened(false);
    setDropdownOpen(false);
  }, [userLoggedIn]);

  const handleDropdownToggle = (e) => {
    e.stopPropagation();
    setDropdownOpen(!dropdownOpen);
  };

  const handleOutsideClick = () => {
    setMenuOpened(false);
    setDropdownOpen(false);
  };

  const handleNavigation = (path) => {
    setDropdownOpen(false);
    navigate(path);
  };

  return (
    <header className="ee-header-wrapper" style={{ background: headerColor }}>
      <div className="ee-innerWidth ee-paddings">
        <div className="ee-flexCenter ee-header-container">
          <div className="ee-logo-text">ELITE ESTATE</div>

          <OutsideClickHandler onOutsideClick={handleOutsideClick}>
            <div className="ee-flexCenter ee-header-menu" style={getMenuStyles(menuOpened)}>
              <Link smooth to="/#buy">Buy</Link>
              <Link smooth to="/#sell">Sell</Link>
              <Link smooth to="/#contact-us">Contact Us</Link>
              <Link smooth to="/#news-insight">News and Insight</Link>
              {userLoggedIn ? (
                <div className="ee-profile-menu" onClick={handleDropdownToggle}>
                  <FaUserCircle size={30} />
                  {dropdownOpen && (
                    <div className="ee-profile-dropdown">
                      <button>{user.email}</button>
                      <button onClick={() => handleNavigation('/account')}>My Account</button>
                      <button onClick={() => handleNavigation('/favorites')}>My Favorites</button>
                      <button onClick={() => handleNavigation('/bookings')}>My Bookings</button>
                      {user.email === "kaursimar1149@gmail.com" && (
                        <button onClick={() => handleNavigation('/admin')}>Admin Dashboard</button>
                      )}
                      <button className="ee-logout-button" onClick={logout}>Logout</button>
                    </div>
                  )}
                </div>
              ) : (
                <button className="ee-header-login-button" onClick={() => navigate("/login")}>
                  Login
                </button>
              )}
            </div>
          </OutsideClickHandler>

          <div className="ee-menu-icon" onClick={() => setMenuOpened((prev) => !prev)}>
            <BiMenuAltRight size={30} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
