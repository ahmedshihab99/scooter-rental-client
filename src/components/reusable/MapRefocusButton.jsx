// File: MapRefocusButton.js

import React, { useEffect } from "react";
import L from "leaflet";
import { useMap } from "react-leaflet";

// Refocus button component
const MapRefocusButton = ({ userPosition }) => {
  const map = useMap();

  useEffect(() => {
    if (!userPosition) return;

    const refocusControl = L.control({ position: "topleft" });

    refocusControl.onAdd = () => {
      const div = L.DomUtil.create("div", "leaflet-bar leaflet-control leaflet-control-custom");
      div.style.backgroundColor = "white";
      div.style.padding = "5px";
      div.style.cursor = "pointer";
      div.innerHTML = "📍";

      div.onclick = () => {
        map.setView([userPosition.lat, userPosition.lng], 13);
      };

      return div;
    };

    refocusControl.addTo(map);

    return () => {
      map.removeControl(refocusControl);
    };
  }, [map, userPosition]);

  return null;
};

export default MapRefocusButton;
