// React and libraries
import React, { useState, useEffect, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

// Styles and assets
import "./App.css";

// Components
import MainPage from "./components/pages/MainPage";
import Login from "./components/pages/auth/Login";
import SignUp from "./components/pages/auth/SignUp";
import DayRentals from "./components/pages/day-rentals/DayRentals";

// Contexts and services
import { LanguageProvider } from "./components/reusable/locales/LanguageContext";
import AuthService from "./components/services/AuthService";

// Models
import User from "./components/models/User";

// Utilities
import ClipLoader from "react-spinners/ClipLoader";

const App = () => {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8900";

  const [user, setUser] = useState(AuthService.getCurrentUser());

  // Fetch user data on app load
  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();
    setUser(currentUser);

    if (!currentUser) {
      (async () => {
        try {
          const response = await fetch(`${API_BASE_URL}/session_user`);
          const data = await response.json();
          const userData = User.fromJson(data);
          setUser(userData);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      })();
    }
  }, []);

  // Public route component
  const PublicRoute = ({ user, children }) => {
    return user?.token ? <Navigate to="/" /> : children;
  };

  // Handle logout
  const handleLogout = () => {
    setUser(null); // Clear user state
  };

  // Lazy loading wrapper
  const LazyWrapper = ({ children }) => (
    <Suspense
      fallback={
        <div className="loading-spinner">
          <ClipLoader color="#3498db" size={90} />
        </div>
      }
    >
      {user ? children : <div>Loading user data...</div>}
    </Suspense>
  );

  return (
    <LanguageProvider>
      <Router>
        <Routes>
          {/* Redirect unknown routes */}
          <Route path="*" element={<Navigate to="/" />} />

          {/* Public routes */}
          <Route
            path="/login"
            element={
              <PublicRoute user={user}>
                <Login setUser={setUser} />
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute user={user}>
                <SignUp />
              </PublicRoute>
            }
          />

          {/* Protected routes */}
          <Route
            path="/"
            element={<MainPage user={user} onLogout={handleLogout} />}
          >  
            <Route
            path="/day-rentals"
            element={
              <LazyWrapper>
                <DayRentals user={user} onLogout={handleLogout} />
              </LazyWrapper>
            }
          />
          </Route>
          
        </Routes>
      </Router>
    </LanguageProvider>
  );
};

export default App;
