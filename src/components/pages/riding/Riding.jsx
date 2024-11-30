import React, { useState } from "react";
import ElapsedTime from "./ElapsedTime";
import RideFare from "./RideFare";
import MapComponent from "../../MapComponent";
import { useNavigate } from "react-router-dom";
import "./Riding.css";

const Riding = () => {
  const [showWarning, setShowWarning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const navigate = useNavigate();

  const handleTimeWarning = () => {
    setShowWarning(true);
    setTimeout(() => {
      setShowWarning(false);
      navigate("/"); // Navigate to the homepage or another relevant page after warning.
    }, 10000); // Allow user to see the warning for 10 seconds before redirecting.
  };

  return (
    <div className="riding-page">
      <div id="map-container">
        <MapComponent />
      </div>
      <div className="info-container">
        <ElapsedTime
          onTimeWarning={handleTimeWarning}
          setElapsedTime={setElapsedTime}
        />
        <RideFare elapsedTime={elapsedTime} />
        <button
          className="end-ride-button"
          onClick={() => navigate("/")}
        >
          End Ride
        </button>
      </div>
      {showWarning && (
        <div className="warning-popup">
          <p>Your balance is insufficient. Ride will end soon.</p>
        </div>
      )}
    </div>
  );
};

export default Riding;
