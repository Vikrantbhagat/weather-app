import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const MapComponent = ({ lat, lon }) => {
  const position = [lat, lon];

  const markerIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/252/252025.png",
    iconSize: [35, 45],
    iconAnchor: [12, 41],
  });

  return (
    <div className="mt-3">
      <h5 className="text-white mb-2">City On Map and Get Wheather Information</h5>
      <MapContainer center={position} zoom={10} style={{ height: "300px", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={markerIcon}>
          <Popup>City Location</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapComponent;
