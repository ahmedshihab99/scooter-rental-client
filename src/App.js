import React, { useState, useEffect, Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";

import MainPage from "./components/pages/MainPage";
import Login from "./components/pages/auth/Login";
import SignUp from "./components/pages/auth/SignUp";
import DayRentals from "./components/pages/day-rentals/DayRentals";
import RideNow from "./components/pages/ride-now/RideNow";
import Riding from "./components/pages/riding/Riding";
import Profile from "./components/pages/profile/Profile";
import Wallet from "./components/pages/wallet/Wallet";

import { LanguageProvider } from "./components/reusable/locales/LanguageContext";
import AuthService from "./components/services/AuthService";
import User from "./components/models/User";
import ClipLoader from "react-spinners/ClipLoader";
import axiosInstance from "./components/services/axiosInstance";

export const UserContext = React.createContext();



const App = () => {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8900";
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [currentAuthUser, setCurrentAuthUser] = useState(null);


  // Always remember that useEffect renders when the component mounts
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await AuthService.getCurrentUser();
        setCurrentAuthUser(user);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false); // Ensure loading is set to false even on error
      }
    };
  
    fetchUser();
  }, []);
  

  const PublicRoute = ({ children }) => {
    return user ? <Navigate to="/" /> : children;
  };

  const PrivateRoute = ({ children }) => {
    console.log(`PR user is: ${AuthService.getCurrentUser()}`)
    if (loading) {
      return (
        <div className="loading-spinner">
          <ClipLoader color="#3498db" size={90} />
        </div>
      );
    }
    return AuthService.getCurrentUser() ? children : <Navigate to="/login" />;
  };

  const LazyWrapper = ({ children }) => (
    <Suspense
      fallback={
        <div className="loading-spinner">
          <ClipLoader color="#3498db" size={90} />
        </div>
      }
    >
      {children}
    </Suspense>
  );

  const handleLogout = () => {
    setUser(null);
    AuthService.logout(); // Add this line if you have a logout method
  };

  return (
    <LanguageProvider>
      <Router>
        {loading ? (
          <div className="loading-spinner">
            <ClipLoader color="#3498db" size={90} />
          </div>
        ) : (
          <Routes>
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login setUser={setUser} />
                </PublicRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <PublicRoute>
                  <SignUp />
                </PublicRoute>
              }
            />
            <Route
              path="/ride-now"
              element={
                  <RideNow/>
              }
            />
            <Route
                path="/riding"
                element={
                  <PrivateRoute>
                    <Riding/>
                  </PrivateRoute>
                }
              />
               <Route
                path="/profile"
                element={
                  // <PrivateRoute>
                    <Profile currentAuthUser= {currentAuthUser}/>
                  // </PrivateRoute>
                }
              />
              <Route
                path="/wallet"
                element={
                  // <PrivateRoute>
                    <Wallet/>
                  // </PrivateRoute>
                }
              />
            <Route
              path="/"
              element={<MainPage currentAuthUser={currentAuthUser} onLogout={handleLogout} />}
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
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        )}
      </Router>
    </LanguageProvider>
  );
};

export default App;
