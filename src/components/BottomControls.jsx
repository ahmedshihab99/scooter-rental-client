import React from "react";
import ScanIcon from "../assets/scan-icon.png";
import UserPositionIcon from "../assets/user-position.png";

const BottomControls = ({ handleMenuClick, route }) => {
  return (
    <div className="bottom-controls">
      <button className="menu-toggle-button" onClick={handleMenuClick}>
        &#9776;
      </button>

      {route === "main" ? (
        <>
          <button className="scan-to-ride-button">
            <img src={ScanIcon} alt="Scan Icon" className="bottom-icon-image" />
            <span>Scan to Ride</span>
          </button>
          <button className="user-position-button">
            <img
              src={UserPositionIcon}
              alt="User Position"
              className="bottom-icon-image"
            />
          </button>
        </>
      ) : route === "day-rentals" ? (
        <button className="new-rental-button">
          <span>+ New Rental</span>
        </button>
      ) : null}
    </div>
  );
};

export default BottomControls;
