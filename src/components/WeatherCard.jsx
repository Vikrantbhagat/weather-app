// // src/components/WeatherCard.jsx
// import React from "react";

// function WeatherCard({ data }) {
//   const today = new Date().toLocaleDateString("en-US", {
//     weekday: "long",
//     day: "numeric",
//     month: "long",
//   });

//   return (
//     <div className="bg-dark bg-opacity-75 p-4 rounded text-white">
//       <div className="d-flex justify-content-between">
//         <div>
//           <h5>{today}</h5>
//           <h4>{data.name}</h4>
//           <p>
//             <i className="fas fa-temperature-low"></i> {data.main.temp_min}°C &nbsp;
//             <i className="fas fa-temperature-high text-danger"></i>{" "}
//             {data.main.temp_max}°C
//           </p>
//         </div>
//         <div>
//           <h1 className="display-1 fw-bold">{Math.round(data.main.temp)}°C</h1>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default WeatherCard;
// src/components/WeatherCard.jsx
// src/components/WeatherCard.jsx
import React from "react";

function WeatherCard({ data }) {
  return (
    <div className="bg-dark bg-opacity-50 text-white p-4 rounded mb-4 shadow-sm">
      <div className="d-flex justify-content-between" >
        <div>
          <h4>{data.name}</h4>
          <p>🌡️ {data.main.temp_min}°C / {data.main.temp_max}°C</p>
        </div>
        <div className="text-end">
          <h1 className="display-1">{Math.round(data.main.temp)}°C</h1>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;
