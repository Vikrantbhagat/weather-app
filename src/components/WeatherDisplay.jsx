// src/components/WeatherDisplay.jsx
import React from 'react';

const WeatherDisplay = ({ data }) => {
  const date = new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' });

  return (
    <div className="bg-dark bg-opacity-75 rounded p-4">
      <div className="d-flex justify-content-between align-items-start">
        <div>
          <h5 className="mb-2">{date}</h5>
          <h4>{data.name}</h4>
          <div className="d-flex gap-3">
            <span>🌡️ Min: {data.main.temp_min}°C</span>
            <span>🔥 Max: {data.main.temp_max}°C</span>
          </div>
        </div>
        <h1 className="display-1">{Math.round(data.main.temp)}°C</h1>
      </div>
    </div>
  );
};

export default WeatherDisplay;
