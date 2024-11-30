import React, { useState, useEffect, useRef } from 'react';
import axiosInstance from '../../services/axiosInstance';
import AuthService from '../../services/AuthService';

const ElapsedTime = ({ onTimeWarning, setElapsedTime }) => {
  const [localElapsedTime, setLocalElapsedTime] = useState(0); // Local state for internal counting
  const [maxRideTime, setMaxRideTime] = useState(0); // in seconds
  const timerRef = useRef(null);

  const formatTime = (seconds) => {
    const minutes = String(Math.floor(seconds / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `${minutes}:${secs}`;
  };

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const customerId = AuthService.getCurrentUserId();
        const response = await axiosInstance.get('/user-balance', {
          params: { customer_id: customerId },
        });

        const balanceValue = response.data.balance_value;
        const maxTime = Math.floor((balanceValue / 100) * 10 * 60); // 10 minutes = 100 EGP
        setMaxRideTime(maxTime);
        console.log(`Max Ride Time: ${maxTime} seconds`);
      } catch (error) {
        console.error('Error fetching user balance:', error);
      }
    };

    fetchBalance();

    return () => clearInterval(timerRef.current); // Cleanup timer on unmount
  }, []);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setLocalElapsedTime((prev) => {
        const nextTime = prev + 1;
        console.log(`Local Elapsed Time: ${nextTime} seconds`);
        setElapsedTime(nextTime); // Update parent's state
        if (nextTime === maxRideTime - 600) { // 10 minutes left warning
          onTimeWarning();
        }
        return nextTime;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [maxRideTime, onTimeWarning, setElapsedTime]);

  return (
    <div className="elapsed-time">
      <div className="time-display">
        <h3>Elapsed Time</h3>
        <p>{formatTime(localElapsedTime)}</p>
      </div>
      <p>Maximum Ride time is {formatTime(maxRideTime)}</p>
    </div>
  );
};

export default ElapsedTime;
