import React, { useState } from 'react';
import axiosInstance from "../../services/axiosInstance";
import "./EditEmailModal.css";

const baseURL = process.env.REACT_APP_API_BASE_URL;
const API_URL = `${baseURL}/admin/users`;

const EditEmailModal = ({ user, onClose, onUpdate }) => {
    const userDetails = user?.userDetails || {}; // Safely access userDetails

    // Always call hooks unconditionally
    const [formData, setFormData] = useState({
        email: userDetails.email || '', // Initialize with email or fallback
    });

    // Handle form changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle the update action
    const handleUpdate = async () => {
        console.log(`Updating user with data: ${JSON.stringify(formData)}`);
        try {
            const response = await axiosInstance.put(`${API_URL}/${userDetails.email}`, formData);

            if (response.status === 200 || response.status === 204) {
                console.log('User updated successfully');
                onUpdate(); // Trigger refresh or callback
                onClose(); // Close the modal
            } else {
                console.error('Failed to update user:', response);
            }
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    // Handle the delete action
    const handleDelete = async () => {
        try {
            const response = await axiosInstance.delete(`${API_URL}/${userDetails.id}`);

            if (response.status === 200 || response.status === 204) {
                console.log('User deleted successfully');
                onUpdate(); // Trigger refresh or callback
                onClose(); // Close the modal
            } else {
                console.error('Failed to delete user:', response);
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    // Render fallback if no valid user is provided
    if (!user || !userDetails || !userDetails.email) {
        return (
            <div className="scooter-edit-modal">
                <div className="modal-content">
                    <h3>No User Selected</h3>
                    <div className="modal-buttons">
                        <button onClick={onClose} style={{ backgroundColor: "#f72929", color: "white" }}>Close</button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="scooter-edit-modal">
            <div className="modal-content">
                <h3>Edit Email Address</h3>
                <form>
                    <label>ID: {userDetails.id || 'N/A'}</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter new email"
                    />
                </form>
                <div className="modal-buttons">
                    <button onClick={handleUpdate} style={{ backgroundColor: 'green', color: 'white', padding: '10px' }}>
                        Update
                    </button>
                    <button onClick={onClose} style={{ backgroundColor: 'gray', color: 'white', padding: '10px' }}>
                        Cancel
                    </button>
                    <button onClick={handleDelete} style={{ backgroundColor: 'red', color: 'white', padding: '10px' }}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditEmailModal;
