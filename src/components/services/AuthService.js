import axiosInstance from "./axiosInstance";
import { jwtDecode } from "jwt-decode";

const API_URL = "/auth"; // Use a relative URL, axiosInstance already has the baseURL

// Sign-up function
const signUp = async (userData) => {
  const response = await axiosInstance.post(`${API_URL}/register`, userData);
  return response.data;
};


const login = async (email, password) => {
  const response = await axiosInstance.post(`${API_URL}/login`, { email, password });
  
  if (response.data.token) {
    const decodedToken = jwtDecode(response.data.token); // Decode the token
    console.log(`The following is the Decoded token: ${JSON.stringify(decodedToken)}`);
    const userDetails = {
      token: response.data.token,
      role: decodedToken.role, // Extract the role from the payload
      email: decodedToken.sub, // Extract the email (sub) from the payload
      firstName: response.data.firstName,
      lastName: response.data.lastName,
      phoneNumber: response.data.phoneNumber
    };
    // Save the token and user details to localStorage
    localStorage.setItem("user", JSON.stringify(userDetails));
    return response.data.token;
  }

  throw new Error("Login failed, token not provided");
};

const getCurrentUser = () => {
  const userStr = localStorage.getItem("user");
  return userStr ? JSON.parse(userStr) : null;
};

const getUserDetails = () => {
  const response = getCurrentUser();
  return response ? response.userDetails : null;
}

const logout = () => {
  localStorage.removeItem("user");
};

export default {
  signUp,
  login,
  getCurrentUser,
  getUserDetails,
  logout,
};
