import React, { useEffect, useState } from 'react';

const RideFare = ({ elapsedTime }) => {
  const [fare, setFare] = useState(0);

  useEffect(() => {
    console.log(`Elapsed Time from Parent: ${elapsedTime} seconds`);
    const calculateFare = () => {
      // 10 minutes = 100 EGP ===> Calculation cycles every minute
      // const minutes = Math.ceil(elapsedTime / 60);
      // const fareAmount = minutes * 10; // 10 minutes = 100 EGP

      // 10 minutes = 100 EGP ===> Calculation cycles every 10 seconds
      // const mo30 = Math.ceil(elapsedTime / 30);
      // console.log(`mo30 before floor: ${((mo30 * 100) /60)}`)
      // const fareAmount = Math.floor((mo30 * 100) /60); // 10 minutes = 100 EGP
      const fareAmount = Math.floor(elapsedTime / 30);

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
