// src/components/OverviewCharts.jsx

import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import "./OverviewCharts.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

// Utility: format date to weekday name
const getDayName = (dtTxt) => {
  const date = new Date(dtTxt);
  return date.toLocaleDateString("en-US", { weekday: "long" });
};

export default function OverviewCharts({ forecast }) {
  const labels = forecast.map((item) => getDayName(item.dt_txt));
  const humidityValues = forecast.map((item) => item.main.humidity);
  const pressureValues = forecast.map((item) => item.main.pressure);
  const minTemp = forecast.map((item) => item.main.temp_min);
  const maxTemp = forecast.map((item) => item.main.temp_max);

  const humidityData = {
    labels,
    datasets: [
      {
        label: "Humidity (%)",
        data: humidityValues,
        backgroundColor: "#00bcd4",
      },
    ],
  };

  const pressureData = {
    labels,
    datasets: [
      {
        label: "Pressure (hPa)",
        data: pressureValues,
        backgroundColor: "#9c27b0",
      },
    ],
  };

  const temperatureData = {
    labels,
    datasets: [
      {
        label: "Min Temperature (°C)",
        data: minTemp,
        borderColor: "#03a9f4",
        fill: false,
      },
      {
        label: "Max Temperature (°C)",
        data: maxTemp,
        borderColor: "#e91e63",
        fill: false,
      },
    ],
  };

  return (
    <div className="overview-container text-white px-4 py-5">
      <h4 className="mb-4">Weekly Overviews</h4>
      <div className="row mb-5">
        <div className="col-md-6 mb-4">
          <h6>Humidity</h6>
          <Bar data={humidityData} />
        </div>
        <div className="col-md-6 mb-4">
          <h6>Pressure</h6>
          <Bar data={pressureData} />
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <h6>Temperature</h6>
          <Line data={temperatureData} />
        </div>
      </div>
    </div>
  );
}
