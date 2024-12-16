import React from "react";
import ScanIcon from "../assets/scan-icon.png";

const BottomControls = ({ handleMenuClick, route, showRidingGuides, userPosition }) => {
  return (
    <div className="bottom-controls">
      <button className="menu-toggle-button" onClick={handleMenuClick}>
        &#9776;
      </button>

      {route === "main" ? (
        <>
          <button
            className="scan-to-ride-button"
            onClick={showRidingGuides}
          >
            <img src={ScanIcon} alt="Scan Icon" className="bottom-icon-image" />
            <span>Scan to Ride</span>
          </button>
          {/* Replace the user-position-button with MapRefocusButton */}
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
