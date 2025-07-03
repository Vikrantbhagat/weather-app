import React from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
  borderRadius: "10px",
  overflow: "hidden",
};

const center = {
  lat: 30.3753, // Default center (Pakistan/India area)
  lng: 69.3451,
};

function MapWeather({ onMapClick }) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "YOUR_GOOGLE_MAPS_API_KEY", // Replace with your key
  });

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={6}
      onClick={(e) => {
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();
        onMapClick(lat, lng);
      }}
    >
      {/* No markers */}
    </GoogleMap>
  ) : (
    <p>Loading Map...</p>
  );
}

export default MapWeather;
