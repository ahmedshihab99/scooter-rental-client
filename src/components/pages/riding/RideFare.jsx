import React, { useEffect, useState } from 'react';

const RideFare = ({ elapsedTime }) => {
  const [fare, setFare] = useState(0);

  useEffect(() => {
    console.log(`Elapsed Time from Parent: ${elapsedTime} seconds`);
    const calculateFare = () => {
      const minutes = Math.ceil(elapsedTime / 60);
      const fareAmount = (minutes / 10) * 100; // 10 minutes = 100 EGP
      console.log(`Calculated Fare: ${fareAmount} EGP`);
      setFare(fareAmount);
    };

    calculateFare();
  }, [elapsedTime]);

  return (
    <div className="ride-fare">
      <h3>Fare</h3>
      <p>{fare} EGP</p>
    </div>
  );
};

export default RideFare;
