import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthService from "../services/AuthService";
import Footer from "../Footer";
import Sidebar from "../Sidebar";
import MapComponent from "../MapComponent";
import DayRentals from "../pages/day-rentals/DayRentals"; // Import the DayRentals component
import "./MainPage.css";
import RidingGuidesBarComponent from "../bars/RidingGuidesBarComponent";
import BottomControls from "../BottomControls";
import { ClipLoader } from "react-spinners";

const MainPage = ({ onLogout }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation(); // To determine the current route
  const [showRidingGuides, setShowRidingGuides] = useState(false); // Manage Riding Guides Bar


  const handleMenuClick = () => setSidebarOpen(true);
  const handleSidebarClose = () => setSidebarOpen(false);

  // Handle close event for Riding Guides Bar
  const handleRidingGuidesClose = () => setShowRidingGuides(false);

  // Fetch user and ensure valid session
  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();
    if (!currentUser || !currentUser.token) {
      onLogout(); // Trigger logout and cleanup
      navigate("/login");
    }
    setLoading(false);
  }, [navigate, onLogout]);

  const handleLogout = () => {
    AuthService.logout();
    onLogout();
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="loading-spinner">
        <ClipLoader color="#3498db" size={90} />
      </div>
    );
  }

  return (
    <div className="main-page">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={handleSidebarClose} />

      {/* Top-right Support Button */}
      <div className="support-button-container">
        <button className="support-button">
          <span className="support-icon">&#128172;</span>
        </button>
      </div>

      {/* Conditional Rendering Based on Route */}
      {location.pathname === "/" ? (
        <>
          <MapComponent />
          <BottomControls
            handleMenuClick={handleMenuClick}
            route="main"
            showRidingGuides={() => setShowRidingGuides(true)} // Pass function to show Riding Guides
          />
        </>
      ) : location.pathname === "/day-rentals" ? (
        <>
          <DayRentals />
          <BottomControls handleMenuClick={handleMenuClick} route="day-rentals" />
        </>
      ) : null}

       {/* Show Riding Guides Bar if triggered */}
       
        <RidingGuidesBarComponent isOpen={showRidingGuides} onClose={handleRidingGuidesClose} />
      

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainPage;
