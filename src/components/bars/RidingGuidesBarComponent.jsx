import React, { useState, useEffect, useRef} from "react";
import { Link, useNavigate, } from "react-router-dom";
import "./RidingGuidesBarComponent.css"; // Optional for styling
import "../../assets/scooter-icon.png";

const RidingGuidesBarComponent = ({ isOpen, onClose }) => {
  const ridingGuidesBarComponentRef = useRef(null);
  const navigate = useNavigate();

  const listItems = [
    "Minimum age is 16",
    "Only 1 person at a time is allowed on the vehicle",
    "Stay within the green area",
    "Bring your helmet",
    "Ride on the right lane or sidewalk whenever possible",
    "Park safely",
  ];

  // Handle clicks outside the sidebar
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (isOpen && ridingGuidesBarComponentRef.current && !ridingGuidesBarComponentRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen, onClose]);

  return (
    <>
      {
        (
          <div className="riding-guides-bar">
          <div className="riding-guides-bar-content" ref={ridingGuidesBarComponentRef}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span role="img" aria-label="note">
                <h2 style={{ display: "inline", marginRight: "0.8rem" }}>Riding Guides</h2><span style={{ fontSize:"1.5rem" }}>📝</span>
              </span>
              <Link to="/how-to-ride" className="how-to-ride-link">
                How To Ride
              </Link>
            </div>
    
            <div className="icons">
              <img className="icon" src="/assets/scooter-ride.png" alt="Scooter" />
              {/* <img src="/icons/bike-icon.png" alt="Bike" /> */}
            </div>
            <ul>
              {listItems.map((item, index) => (
                <li key={index}>
                  <div className="ride-guid-li" style={{ display: "flex", gap: "0.8rem" }}>
                    <div  style={{ alignSelf: "center" }}>✅</div>
                    <div>{item}</div>
                  </div>
                </li>
              ))}
            </ul>
            <p>
              By clicking "Ride now" you accept our
              <a href="/terms" target="_blank">
                {" "}
                Terms & Conditions
              </a>
              , click here to read.
            </p>
            <div className="riding-guides-bar-buttons">
              <button className="cancel-button" onClick={onClose}>
                Cancel
              </button>
              <button
                className="ride-now-button"
                onClick={() => navigate("/ride-now")}
              >
                Ride Now
              </button>
            </div>
          </div>
        </div>
        )
      }
    </>
    
  );
};

export default RidingGuidesBarComponent;
