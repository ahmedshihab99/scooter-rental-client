import React, { useEffect, useRef, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import MenuItem from './reusable/MenuItem';
import AuthService from './services/AuthService';
import vehicleRentalLogoIcon from "../assets/vehicle-rental-logo-icon.png";

import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md';
import * as IoIcons from 'react-icons/io5';

const Sidebar = ({currentAuthUser, isOpen, onClose }) => {
  const sidebarRef = useRef(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        console.log("Fetched user details from prop:", currentAuthUser); // Check the data
        setCurrentUser(currentAuthUser); 
      } catch (error) {
        console.error("Failed to fetch currentUser details:", error);
      }
    };
    fetchUserDetails();
  }, [currentAuthUser]); // Add currentAuthUser as a dependency
  

  // Handle clicks outside the sidebar
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
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

  const handleLogout = () => {
    try {
      AuthService.logout();
      // onLogout();
      setError("");
      navigate("/login"); // Navigate to the main dashboard
    } catch (err) {
      setError("error logging out");
    }
    console.log('Logging out...');
    onClose();
  };

  return (
    <div
      ref={sidebarRef}
      className={`sidebar ${isOpen ? 'open' : ''}`}
    >
      <div className="sidebar-header">
      <img
        src={vehicleRentalLogoIcon}
        alt="Logo Icon"
        className="app-logo"
      />
        <div>
          <h3>{`${AuthService.getCurrentUser()?.firstName ?? ""}`}</h3>
            <p>{`${AuthService.getCurrentUser()?.phoneNumber ?? ""}`}</p>
        </div>
        
      </div>
      <ul className="sidebar-items">
        <MenuItem label="History" icon={MdIcons.MdHistory} path="/history" />
        <MenuItem label="Wallet" icon={FaIcons.FaWallet} path="/wallet" />
        <MenuItem
          label="Free Balance"
          icon={IoIcons.IoGiftOutline}
          path="/free-balance"
        />
        <MenuItem
          label="How To Ride"
          icon={MdIcons.MdDirectionsBike}
          path="/how-to-ride"
        />
        <MenuItem
          label="Language, اللغة"
          icon={FaIcons.FaLanguage}
          path="/language"
        />
        {/* Logout Button */}
        <li>
          <div className="menu-item" onClick={handleLogout}>
            <div className='logout-button'>
              <FaIcons.FaSignOutAlt className="menu-icon" />
              <span>Logout</span> 
            </div>
           
          </div>
        </li>
      </ul>
      <button className="close-button" onClick={onClose}>
        ×
      </button>
    </div>
  );
};

export default Sidebar;
