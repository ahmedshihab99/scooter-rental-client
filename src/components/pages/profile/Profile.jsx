import React, { useState, useEffect } from "react";
import vehicleRentalLogoIcon from "../../../assets/vehicle-rental-logo-icon.png";
import unlockIcon from "../../../assets/unlock-icon.png";
import dayRentalsIcon from "../../../assets/day-rentals-icon.png";
import userProfileIcon from "../../../assets/user-profile-icon.png";
import phoneNumberIcon from "../../../assets/phone-number-icon.png";
import emailIcon from "../../../assets/email-icon.png";
import backArrowIcon from "../../../assets/back-arrow-icon.png";
import editIcon from "../../../assets/edit-icon.png";
import supportIcon from "../../../assets/support-icon.png";
import EditEmailModal from "./EditEmailModal";
import AuthService from "../../services/AuthService";
import { UserContext } from "../../../App"; // Adjust the path as necessary


import "./Profile.css";

const Profile  = ({currentAuthUser})  => {
  const [isEditEmailModalOpen, setIsEditEmailModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add a loading state

  // const currentAuthUser = React.useContext(UserContext);


  // Fetch user details on mount
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        // const currentAuthUser = await AuthService.getCurrentUser();
        console.log("Fetched user details:", currentAuthUser); // Debugging output
        setCurrentUser(currentAuthUser); // Ensure the state is updated
      } catch (error) {
        console.error("Failed to fetch currentUser details:", error);
      } finally {
        setLoading(false); // Stop loading regardless of success or error
      }
    };
    fetchUserDetails();
  }, []);

  const openEditEmailModal = () => {
    setIsEditEmailModalOpen(true);
  };

  const closeEditEmailModal = () => {
    setIsEditEmailModalOpen(false);
  };

  const handleUpdate = () => {
    closeEditEmailModal();
  };

  // Debugging output for rendering state
  console.log("Rendering component. currentUser:", currentUser);

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img src={backArrowIcon} alt="Back Icon" className="back-arrow-icon" />
        <h1>Profile</h1>
        <img src={supportIcon} alt="Support Icon" className="profile-support-icon" />
      </div>
      <img src={vehicleRentalLogoIcon} alt="Logo Icon" className="profile-logo" />

      {loading ? ( // Display "Loading..." while waiting for data
        <div>Loading...</div>
      ) : currentUser ? ( // Render user data if available
        <>
          <div className="profile-stats">
            <div className="statContainer">
              <img src={unlockIcon} alt="Unlock Icon" className="stat-icon" />
              <div className="stat">
                <span>{currentUser?.rides ?? "0"} Rides</span>
                <p>Unlock & Go</p>
              </div>
            </div>

            <div className="statContainer">
              <img src={dayRentalsIcon} alt="Day Rentals Icon" className="stat-icon" />
              <div className="stat">
                <span>{currentUser.userDetails?.rentals ?? "0"} Rentals</span>
                <p>Day Rentals</p>
              </div>
            </div>
          </div>

          <div className="profile-details">
            <div className="detail-container">
              <img src={userProfileIcon} alt="User Icon" className="stat-icon" />
              <div className="detail">
                <label>Full Name</label>
                <span>
                  {`${currentUser?.firstName ?? ""} ${currentUser?.lastName ?? ""}`}
                </span>
              </div>
            </div>

            <div className="detail-container">
              <img src={phoneNumberIcon} alt="Phone Icon" className="stat-icon" />
              <div className="detail">
                <label>Phone Number</label>
                <span>{currentUser?.phoneNumber ?? "N/A"}</span>
              </div>
            </div>

            <div className="detail-container">
              <img src={emailIcon} alt="Email Icon" className="stat-icon" />
              <div className="detail">
                <label>Email Address</label>
                <span>{currentUser?.email ?? "N/A"}</span>
              </div>
              <img
                src={editIcon}
                alt="Edit Icon"
                className="edit-icon"
                onClick={openEditEmailModal}
              />
            </div>
          </div>
        </>
      ) : (
        <div>Error loading user data</div> // Error message if no user data is available
      )}

      <button className="delete-btn">Delete Account</button>

      {isEditEmailModalOpen && (
        <EditEmailModal user={currentUser} onClose={closeEditEmailModal} onUpdate={handleUpdate} />
      )}
    </div>
  );
};

export default Profile;
