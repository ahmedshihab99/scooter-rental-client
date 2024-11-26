import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as FaIcons from "react-icons/fa"; // Import icons as needed
import "./Footer.css"; // Add styling for the footer

const Footer = () => {
  const location = useLocation(); // Hook to get the current path
  const navigate = useNavigate(); // Hook to navigate between paths

  // Function to handle navigation
  const handleNavigation = (path) => {
    navigate(path); // Navigate to the selected path
  };

  return (
    <div className="footer">
      {/* Unlock & Go Button */}
      <div
        className={`footer-button ${
          location.pathname === "/" ? "active" : ""
        }`}
        onClick={() => handleNavigation("/")}
      >
        <FaIcons.FaUnlockAlt className="footer-icon" /> {/* Icon */}
        <span className="footer-text">Unlock & Go</span> {/* Text */}
      </div>

      {/* Day Rentals Button */}
      <div
        className={`footer-button ${
          location.pathname === "/day-rentals" ? "active" : ""
        }`}
        onClick={() => handleNavigation("/day-rentals")}
      >
        <FaIcons.FaCalendarAlt className="footer-icon" /> {/* Icon */}
        <span className="footer-text">Day Rentals</span> {/* Text */}
      </div>
    </div>
  );
};

export default Footer;
