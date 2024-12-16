import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthService from "../services/AuthService";
import Footer from "../Footer";
import Sidebar from "../Sidebar";
import MapComponent from "../MapComponent";
import DayRentals from "../pages/day-rentals/DayRentals";
import BottomControls from "../BottomControls";
import RidingGuidesBarComponent from "../bars/RidingGuidesBarComponent";
import supportIcon from "../../assets/support-icon.png";
import { ClipLoader } from "react-spinners";
import "./MainPage.css";

const MainPage = ({ currentAuthUser, onLogout }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showRidingGuides, setShowRidingGuides] = useState(false);
  const [mapInstance, setMapInstance] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Handlers
  const handleMenuClick = () => setSidebarOpen(true);
  const handleSidebarClose = () => setSidebarOpen(false);
  const handleRidingGuidesOpen = () => setShowRidingGuides(true);
  const handleRidingGuidesClose = () => setShowRidingGuides(false);
  console.log("MainPage - currentAuthUser:", currentAuthUser);


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
      <Sidebar currentAuthUser= {currentAuthUser} isOpen={isSidebarOpen} onClose={handleSidebarClose} />
      <img src={supportIcon} alt="Support Icon" className="support-icon" />
      {location.pathname === "/" ? (
        <>
          <MapComponent onSetMapRef={setMapInstance} />
          <BottomControls
            handleMenuClick={handleMenuClick}
            route="main"
            showRidingGuides={handleRidingGuidesOpen} // Use the handler here
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
