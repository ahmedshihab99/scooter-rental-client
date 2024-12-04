import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polygon, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import GeofenceService from "./services/GeofenceService";
import ScooterService from "./services/ScooterService";
import scooterIconImg from "../assets/scooter-icon.png";
import userPositionPinIconImg from "../assets/user-position-pin.png";
import MapRefocusButton from "./reusable/MapRefocusButton"; 

// import "./MapComponent.css";

// Define the scooter icon
const scooterIcon = new L.Icon({
  iconUrl: scooterIconImg,
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30]
});

// user position icon
const userPositionPinIcon = new L.Icon({
  iconUrl: userPositionPinIconImg,
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30]
});

const UserLocationMarker = ({ userPosition }) => {
  const map = useMap();

  useEffect(() => {
    if (userPosition) {
      map.setView([userPosition.lat, userPosition.lng], 13);
    }
  }, [userPosition, map]);

  return userPosition ? (
    <Marker position={[userPosition.lat, userPosition.lng]} icon={userPositionPinIcon}>
      <Popup>You are here</Popup>
    </Marker>
  ) : null;
};

const ScooterMarker = ({ scooter, isInsideGeofence }) => {
  const insideGeofence = isInsideGeofence(scooter.latitude, scooter.longitude);

  return (
    <Marker
      position={[scooter.latitude, scooter.longitude]}
      icon={scooterIcon}
      style={{ filter: insideGeofence ? "none" : "grayscale(100%)" }}
    >
      <Popup>
        <div>
          <strong>Serial Number:</strong> {scooter.serialNumber} <br />
          <strong>Battery Level:</strong> {scooter.batteryLevel}% <br />
          {!insideGeofence && <strong style={{ color: "red" }}>Outside Geofence!</strong>}
        </div>
      </Popup>
    </Marker>
  );
};

const MapComponent = () => {
  const [scooters, setScooters] = useState([]);
  const [userPosition, setUserPosition] = useState(null);
  const [geofences, setGeofences] = useState([]);

  useEffect(() => {
    const fetchGeofences = async () => {
      try {
        const data = await GeofenceService.getAllGeofences();
        setGeofences(data || []);
      } catch (error) {
        console.error("Error fetching geofences:", error);
      }
    };

    fetchGeofences();
  }, []);

  useEffect(() => {
    const fetchScooters = async () => {
      const response = await ScooterService.getAllScooters();
      setScooters(response);
    };

    fetchScooters();
    const intervalId = setInterval(fetchScooters, 5000);

    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserPosition({ lat: latitude, lng: longitude });
        },
        (error) => console.error("Error getting location:", error),
        { enableHighAccuracy: true }
      );
    }

    return () => clearInterval(intervalId);
  }, []);

  const isInsideGeofence = (lat, lng) => {
    const point = L.latLng(lat, lng);
    return geofences.some((geofence) => {
      if (!geofence.coordinates || geofence.coordinates.length === 0) return false;
      try {
        const polygon = L.polygon(geofence.coordinates);
        return polygon.getBounds().contains(point);
      } catch (error) {
        console.error(`Error with geofence ID: ${geofence.id}`, error);
        return false;
      }
    });
  };

  return (
    <div className="map-container">
      <MapContainer
        center={[30.0444, 31.2357]}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        {scooters.map((scooter) => (
          <ScooterMarker key={scooter.id} scooter={scooter} isInsideGeofence={isInsideGeofence} />
        ))}
        {userPosition && <UserLocationMarker userPosition={userPosition} />}
        {geofences.map((geofence) => (
          <Polygon
            key={geofence.id}
            positions={geofence.coordinates}
            color="green"
            pathOptions={{ fillOpacity: 0.2 }}
          >
            <Popup>{geofence.name}</Popup>
          </Polygon>
        ))}
        <MapRefocusButton userPosition={userPosition} />
      </MapContainer>
    </div>
  );
};

export default MapComponent;