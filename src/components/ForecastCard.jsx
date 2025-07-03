// // src/components/ForecastCard.jsx
// import React from "react";

// function ForecastCard({ data }) {
//   const day = new Date(data.dt_txt).toLocaleDateString("en-US", {
//     weekday: "long",
//   });

//   return (
//     <div className="col-6 col-md-2 mb-3">
//       <div className="bg-dark bg-opacity-75 text-white p-3 rounded text-center">
//         <h6>{day}</h6>
//         <img
//           src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
//           alt="weather icon"
//         />
//         <p>{data.weather[0].main}</p>
//         <p>{data.wind.speed} km/h</p>
//         <h5 className="fw-bold">{Math.round(data.main.temp)}°C</h5>
//       </div>
//     </div>
//   );
// }

// export default ForecastCard;
// src/components/ForecastCard.jsx
// src/components/ForecastCard.jsx
import React from "react";

function ForecastCard({ data }) {
  const date = new Date(data.dt_txt).toLocaleDateString("en-US", {
    weekday: "short",
  });

  return (
    <div className="col-6 col-md-2">
      <div className="bg-secondary bg-opacity-25 p-3 rounded text-center h-100" >
        <h6>{date}</h6>
        <img
          src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
          alt="icon"
          width="50"
        />
        <p className="m-0">{data.weather[0].main}</p>
        <p className="m-0">{data.wind.speed} km/h</p>
        <h5>{Math.round(data.main.temp)}°C</h5>
      </div>
    </div>
  );
}

export default ForecastCard;
