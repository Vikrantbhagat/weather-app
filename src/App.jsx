// // src/App.jsx
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import WeatherCard from "./components/WeatherCard";
// import ForecastCard from "./components/ForecastCard";

// const API_KEY = "ae23dfb51ce8f6c52e55980f170ac2eb"; // Replace with your OpenWeatherMap API key

// function App() {
//   const [city, setCity] = useState("");
//   const [weather, setWeather] = useState(null);
//   const [forecast, setForecast] = useState([]);
//   const [error, setError] = useState("");

//   const fetchWeather = async (cityName) => {
//     try {
//       setError("");
//       const weatherRes = await axios.get(
//         `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
//       );
//       setWeather(weatherRes.data);
//       localStorage.setItem("lastCity", cityName);

//       const forecastRes = await axios.get(
//         `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric`
//       );
//       const daily = forecastRes.data.list.filter(item =>
//         item.dt_txt.includes("12:00:00")
//       );
//       setForecast(daily.slice(0, 5));
//     } catch (err) {
//       setError("City not found");
//       setWeather(null);
//       setForecast([]);
//     }
//   };

//   const handleSearch = () => {
//     if (city.trim()) fetchWeather(city);
//   };

//   useEffect(() => {
//     const lastCity = localStorage.getItem("lastCity");
//     if (lastCity) {
//       fetchWeather(lastCity);
//     } else {
//       navigator.geolocation?.getCurrentPosition(async (position) => {
//         const { latitude, longitude } = position.coords;
//         try {
//           const geoRes = await axios.get(
//             `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
//           );
//           fetchWeather(geoRes.data.name);
//         } catch (err) {
//           console.error("Geolocation failed", err);
//         }
//       });
//     }
//   }, []);

//   return (
//     <div className="app-background text-white py-5">
//       <div className="container">
//         {/* Header */}
//         <div className="text-start mb-4">
//           <img
//             src="https://img.icons8.com/ios-filled/50/00BFFF/cloud.png"
//             alt="icon"
//           />
//           <h3 className="fw-bold">Weather Forecast</h3>
//           <p>Search for weather worldwide</p>
//         </div>

//         {/* Search bar */}
//         <div className="input-group mb-5" style={{ maxWidth: "600px" }}>
//           <input
//             type="text"
//             className="form-control rounded-start-pill"
//             placeholder="Find your location..."
//             onChange={(e) => setCity(e.target.value)}
//           />
//           <button
//             className="btn btn-info rounded-end-pill text-white"
//             onClick={handleSearch}
//           >
//             Find
//           </button>
//         </div>

//         {/* Error */}
//         {error && <div className="alert alert-danger">{error}</div>}

//         {/* Weather display */}
//         {weather && <WeatherCard data={weather} />}

//         {/* Forecast */}
//         {forecast.length > 0 && (
//           <div className="row mt-4">
//             {forecast.map((day, idx) => (
//               <ForecastCard key={idx} data={day} />
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;


// src/App.jsx
// src/App.jsx
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import WeatherCard from "./components/WeatherCard";
import ForecastCard from "./components/ForecastCard";
import MapComponent from "./components/MapComponent";
import OverviewCharts from "./components/OverviewCharts";
import "./assets/background.css";

const API_KEY = "ae23dfb51ce8f6c52e55980f170ac2eb"; // OpenWeather key

function App() {
  const [city, setCity]               = useState("Kharar");
  const [weather, setWeather]         = useState(null);
  const [forecast, setForecast]       = useState([]);
  const [error, setError]             = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showDrop, setShowDrop]       = useState(false);
  const [active, setActive]           = useState(-1);      // for ↑ / ↓ keys
  const wrapperRef = useRef(null);                         // click‑outside

  /* ───────────────────── Fetch on first load ──────────────────── */
  useEffect(() => {
    fetchWeather(city);
  }, []);

  /* ─────────────── Autocomplete (debounced 300 ms) ─────────────── */
  useEffect(() => {
    if (!city.trim()) {
      setSuggestions([]);
      return;
    }
    const t = setTimeout(() => fetchSuggestions(city), 300);
    return () => clearTimeout(t);
  }, [city]);

  /* ─────────────── Click‑outside closes dropdown ──────────────── */
  useEffect(() => {
    const handler = (e) =>
      wrapperRef.current && !wrapperRef.current.contains(e.target) && setShowDrop(false);
    window.addEventListener("mousedown", handler);
    return () => window.removeEventListener("mousedown", handler);
  }, []);

  /* ───────────────────────── API helpers ───────────────────────── */
  const fetchWeather = async (cityName) => {
    try {
      setError("");
      const [weatherRes, forecastRes] = await Promise.all([
        axios.get("https://api.openweathermap.org/data/2.5/weather", {
          params: { q: cityName, appid: API_KEY, units: "metric" },
        }),
        axios.get("https://api.openweathermap.org/data/2.5/forecast", {
          params: { q: cityName, appid: API_KEY, units: "metric" },
        }),
      ]);

      setWeather(weatherRes.data);
      const daily = forecastRes.data.list.filter((it) => it.dt_txt.includes("12:00:00"));
      setForecast(daily.slice(0, 5));
    } catch (err) {
      setError("City not found");
      setWeather(null);
      setForecast([]);
    }
  };

  const fetchSuggestions = async (query) => {
    try {
      const res = await axios.get("https://api.openweathermap.org/geo/1.0/direct", {
        params: { q: query, limit: 5, appid: API_KEY },
      });
      setSuggestions(res.data);
      setShowDrop(true);
      setActive(-1);
    } catch {
      setSuggestions([]);
    }
  };

  /* ─────────────────────── Event handlers ─────────────────────── */
  const handleSearch = () => {
    if (!city.trim()) return;
    fetchWeather(city.trim());
    setShowDrop(false);
  };

  const handleSelect = (s) => {
    const full = `${s.name}${s.state ? ", " + s.state : ""}, ${s.country}`;
    setCity(full);
    fetchWeather(full);
    setShowDrop(false);
  };

  const handleKey = (e) => {
    if (!showDrop) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((prev) => (prev + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((prev) => (prev === 0 ? suggestions.length - 1 : prev - 1));
    } else if (e.key === "Enter" && active > -1) {
      e.preventDefault();
      handleSelect(suggestions[active]);
    }
  };

  /* ─────────────────────────── Render ─────────────────────────── */
  return (
    <div className="app-background text-white">
      <div className="overlay d-flex flex-column align-items-center justify-content-start px-3 py-5">
        {/* Header */}
        <div className="text-start w-100 mb-4" style={{ maxWidth: "1200px" }}>
          <div className="d-flex align-items-center gap-3">
            <img src="https://img.icons8.com/ios-filled/50/00BFFF/cloud.png" alt="icon" />
            <div>
              <h4 className="fw-bold m-0">Weather Forecast</h4>
              <p className="m-0">Search for weather worldwide</p>
            </div>
          </div>
        </div>

        {/* Search bar + dropdown */}
        <div className="position-relative mb-5 w-100" style={{ maxWidth: "650px" }} ref={wrapperRef}>
          <div className="input-group">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Find your location..."
              className="form-control rounded-start-pill shadow-sm"
            />
            <button className="btn btn-info rounded-end-pill text-white px-4" onClick={handleSearch}>
              Find
            </button>
          </div>

          {showDrop && suggestions.length > 0 && (
            <ul
              className="list-group shadow position-absolute w-100"
              style={{ zIndex: 1000, top: "100%", borderRadius: "0 0 1rem 1rem" }}
            >
              {suggestions.map((s, idx) => (
                <li
                  key={`${s.lat}${s.lon}`}
                  className={`list-group-item list-group-item-action bg-dark text-white ${
                    idx === active ? "bg-info text-white" : ""
                  }`}
                  style={{ cursor: "pointer" }}
                  onMouseDown={() => handleSelect(s)} // onMouseDown so it fires before blur
                >
                  {s.name}
                  {s.state ? `, ${s.state}` : ""} — {s.country}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Error message */}
        {error && (
          <div className="alert alert-danger w-100 text-center mb-4" style={{ maxWidth: "600px" }}>
            {error}
          </div>
        )}

        {/* Weather + forecast */}
        {weather && (
          <div className="weather-section-background w-100 mb-5">
            <div className="w-100" style={{ maxWidth: "1200px", margin: "0 auto" }}>
              <WeatherCard data={weather} />
            </div>

            {forecast.length > 0 && (
              <div className="row justify-content-center g-4 mt-3" style={{ maxWidth: "1200px", margin: "0 auto" }}>
                {forecast.map((day, idx) => (
                  <ForecastCard key={idx} data={day} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Map */}
        {weather && (
          <div style={{ maxWidth: "1200px", width: "100%" }} className="mb-5">
            <MapComponent lat={weather.coord.lat} lon={weather.coord.lon} />
          </div>
        )}

        {/* Charts */}
        {forecast.length > 0 && (
          <div className="w-100" style={{ maxWidth: "1200px" }}>
            <OverviewCharts forecast={forecast} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;










// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import WeatherCard from "./components/WeatherCard";
// import ForecastCard from "./components/ForecastCard";
// import MapComponent from "./components/MapComponent";
// import "./assets/background.css";

// const API_KEY = "ae23dfb51ce8f6c52e55980f170ac2eb"; // Replace with your own key

// function App() {
//   const [city, setCity] = useState("Pune");
//   const [weather, setWeather] = useState(null);
//   const [forecast, setForecast] = useState([]);
//   const [error, setError] = useState("");

//   const fetchWeather = async (cityName) => {
//     try {
//       setError("");
//       const weatherRes = await axios.get(
//         `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
//       );
//       setWeather(weatherRes.data);

//       const forecastRes = await axios.get(
//         `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric`
//       );
//       const daily = forecastRes.data.list.filter(item =>
//         item.dt_txt.includes("12:00:00")
//       );
//       setForecast(daily.slice(0, 5));
//     } catch (err) {
//       setError("City not found");
//       setWeather(null);
//       setForecast([]);
//     }
//   };

//   useEffect(() => {
//     fetchWeather("Pune");
//   }, []);

//   return (
//     <div className="app-background text-white">
//       <div className="overlay d-flex flex-column align-items-center px-3">
        
//         {/* Header Section */}
//         <div className="text-start w-100 mb-3" style={{ maxWidth: "1200px" }}>
//           <div className="d-flex align-items-center gap-3">
//             <img
//               src="https://img.icons8.com/ios-filled/50/00BFFF/cloud.png"
//               alt="icon"
//             />
//             <div>
//               <h4 className="fw-bold m-0">Weather Forecast</h4>
//               <p className="m-0">Search for weather worldwide</p>
//             </div>
//           </div>
//         </div>

//         {/* Search Section */}
//         <div className="input-group mb-4" style={{ maxWidth: "650px" }}>
//           <input
//             type="text"
//             className="form-control rounded-start-pill shadow-sm"
//             placeholder="Find your location..."
//             onChange={(e) => setCity(e.target.value)}
//           />
//           <button
//             className="btn btn-info rounded-end-pill text-white px-4"
//             onClick={() => fetchWeather(city)}
//           >
//             Find
//           </button>
//         </div>

//         {/* Error Display */}
//         {error && (
//           <div className="alert alert-danger w-100 text-center" style={{ maxWidth: "600px" }}>
//             {error}
//           </div>
//         )}

//         {/* Weather Info */}
//         {weather && (
//           <div style={{ maxWidth: "1200px" }} className="w-100">
//             <WeatherCard data={weather} />
//           </div>
//         )}

//         {/* Forecast Cards */}
//         {forecast.length > 0 && (
//           <div className="row justify-content-center g-4 mt-4 mb-4" style={{ maxWidth: "1200px" }}>
//             {forecast.map((day, idx) => (
//               <ForecastCard key={idx} data={day} />
//             ))}
//           </div>
//         )}

//         {/* Map goes at the very end */}
//         {weather && (
//           <div style={{ maxWidth: "1200px", width: "100%" }} className="mb-5">
//             <MapComponent lat={weather.coord.lat} lon={weather.coord.lon} />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;
