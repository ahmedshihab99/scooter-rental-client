import React, { useState, useEffect, useRef } from 'react';
import Webcam from 'react-webcam';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { useNavigate } from 'react-router-dom';
import "./RideNow.css"; // Optional for styling

const RidingNow = () => {
  const webcamRef = useRef(null);
  const [flashOn, setFlashOn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const qrScanner = new Html5QrcodeScanner("qr-code-box", {
      fps: 10,
      qrbox: { width: 250, height: 250 },
    });

    qrScanner.render(
      (decodedText) => {
        console.log(`QR Code Scanned: ${decodedText}`);
        qrScanner.clear();
        alert(`QR Code Scanned: ${decodedText}`);
      },
      (error) => {
        console.log(`QR Code Scanning Error: ${error}`);
      }
    );

    return () => {
      qrScanner.clear();
    };
  }, []);

  const handleFlashToggle = async () => {
    if (!webcamRef.current?.video) return;

    const track = webcamRef.current.video.srcObject.getVideoTracks()[0];
    const capabilities = track.getCapabilities();

    if (capabilities.torch) {
      setFlashOn((prevFlashOn) => !prevFlashOn);
      await track.applyConstraints({
        advanced: [{ torch: !flashOn }],
      });
    } else {
      alert("Torch (Flash) is not supported on this device.");
    }
  };

  return (
    <div className="ride-now-scanner-page">
      <Webcam
        ref={webcamRef}
        videoConstraints={{ facingMode: "environment" }}
        className="webcam-view"
      />
      <div id="qr-code-box" className="qr-code-box"></div>

      <div className="overlay-content">
        <h2>Scan the QR code on the vehicle to Unlock & Go!</h2>
        <div className="buttons">
          <button className="link-button" onClick={() => navigate("/how-to-ride")}>
            How to Ride
          </button>
          <button className="flash-button" onClick={handleFlashToggle}>
            {flashOn ? "Turn Flash Off" : "Turn Flash On"}
          </button>
        </div>
      </div>

      <button className="vehicle-id-button">
        Unlock using the vehicle ID
      </button>
    </div>
  );
};

export default RidingNow;
