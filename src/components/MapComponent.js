import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import RoutingMachine from "./RoutingMachine"; // Import the Routing component
import "leaflet/dist/leaflet.css";

const MapComponent = ({ initialPosition, destination }) => {
  const [position, setPosition] = useState(initialPosition || [51.505, -0.09]);

  useEffect(() => {
    if (initialPosition) setPosition(initialPosition);
  }, [initialPosition]);

  return (
    <MapContainer center={position} zoom={13} style={{ height: "500px", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {position && <Marker position={position} />} 
      {destination && <Marker position={destination} />} 
      
      {/* Add Route only if both positions exist */}
      {destination && <RoutingMachine initialPosition={position} destination={destination} />}
    </MapContainer>
  );
};

export default MapComponent;
