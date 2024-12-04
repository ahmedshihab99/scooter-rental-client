import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthService from "../services/AuthService";
import Footer from "../Footer";
import Sidebar from "../Sidebar";
import MapComponent from "../MapComponent";
import DayRentals from "../pages/day-rentals/DayRentals";
import BottomControls from "../BottomControls";
import RidingGuidesBarComponent from "../bars/RidingGuidesBarComponent";
import { ClipLoader } from "react-spinners";
import "./MainPage.css";

const MainPage = ({ user, onLogout }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showRidingGuides, setShowRidingGuides] = useState(false);
  const [mapInstance, setMapInstance] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleMenuClick = () => setSidebarOpen(true);
  const handleSidebarClose = () => setSidebarOpen(false);
  const handleRidingGuidesClose = () => setShowRidingGuides(false);

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();
    if (!currentUser || !currentUser.token) {
      onLogout();
      navigate("/login");
    }
    setLoading(false);
  }, [navigate, onLogout]);

  const handleLogout = () => {
    AuthService.logout();
    onLogout();
    navigate("/login");
  };

  const handleRefocusUserPosition = () => {
    if (mapInstance && mapInstance.userPosition) {
      const { lat, lng } = mapInstance.userPosition;
      mapInstance.setView([lat, lng], 13);
    }
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
      <Sidebar isOpen={isSidebarOpen} onClose={handleSidebarClose} />
      <div className="support-button-container">
        <button className="support-button">
          <span className="support-icon">&#128172;</span>
        </button>
      </div>
      {location.pathname === "/" ? (
        <>
          <MapComponent onSetMapRef={setMapInstance} />
          <BottomControls
        handleMenuClick={handleMenuClick}
        route="main"
        showRidingGuides={() => setShowRidingGuides(true)}
        userPosition={userPosition}
      />
        </>
      ) : location.pathname === "/day-rentals" ? (
        <DayRentals />
      ) : null}
      {showRidingGuides && <RidingGuidesBarComponent onClose={handleRidingGuidesClose} />}
      <Footer onLogout={handleLogout} />
    </div>
  );
};

export default MainPage;
