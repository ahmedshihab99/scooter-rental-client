// File: ../../services/GeofenceService.js

import axios from 'axios';
import axiosInstance from './axiosInstance';

const baseURL = process.env.REACT_APP_API_BASE_URL;
const API_URL = `${baseURL}/admin/geofences`;

const GeofenceService = {
  // Fetch geofence data from the backend
  getAllGeofences: async () => {
    try {
      const response = await axiosInstance.get(API_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching geofence data:', error);
      throw error;
    }
  },

  // Add a new geofence to the backend
  addGeofence: async (geofence) => {
    try {
      const response = await axiosInstance.post(API_URL, geofence);
      return response.data;
    } catch (error) {
      console.error('Error adding geofence:', error);
      throw error;
    }
  },

  // Update existing geofence data on the backend
  updateGeofence: async (id, geofence) => {
    try {
      console.log(`geofence's geoType is ${geofence.geofenceType}`);
      const response = await axiosInstance.put(`${API_URL}/${id}`, geofence);
      return response.data;
    } catch (error) {
      console.error('Error updating geofence:', error);
      throw error;
    }
  },
  
  // Delete existing geofence data on the backend
  deleteGeofence: async (id) => {
    try {
      const response = await axiosInstance.delete(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting geofence:', error);
      throw error;
    }
  }
  
};

export default GeofenceService;