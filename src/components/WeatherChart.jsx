import React from "react";
import { Bar, Line } from "react-chartjs-2";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const WeatherChart = ({ data }) => {
  const labels = data.map((day) => day.day);
  const humidity = data.map((day) => day.humidity);
  const pressure = data.map((day) => day.pressure);
  const minTemp = data.map((day) => day.minTemp);
  const maxTemp = data.map((day) => day.maxTemp);

  return (
    <div className="container my-5 text-white" >
      <h5 className="mb-4">Weekly Overviews</h5>
      <div className="row">
        <div className="col-md-6 mb-4">
          <h6>Humidity</h6>
          <Bar
            data={{
              labels,
              datasets: [
                {
                  label: "Humidity (%)",
                  data: humidity,
                  backgroundColor: "rgba(0, 255, 255, 0.6)",
                },
              ],
            }}
            options={{ responsive: true, plugins: { legend: { display: true } } }}
          />
        </div>
        <div className="col-md-6 mb-4" >
          <h6>Pressure</h6>
          <Bar
            data={{
              labels,
              datasets: [
                {
                  label: "Pressure (hPa)",
                  data: pressure,
                  backgroundColor: "rgba(153, 102, 255, 0.6)",
                },
              ],
            }}
            options={{ responsive: true, plugins: { legend: { display: true } } }}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <h6>Temperature</h6>
          <Line
            data={{
              labels,
              datasets: [
                {
                  label: "Min Temperature (°C)",
                  data: minTemp,
                  borderColor: "skyblue",
                  fill: false,
                },
                {
                  label: "Max Temperature (°C)",
                  data: maxTemp,
                  borderColor: "pink",
                  fill: false,
                },
              ],
            }}
            options={{ responsive: true, plugins: { legend: { display: true } } }}
          />
        </div>
      </div>
    </div>
  );
};

export default WeatherChart;
