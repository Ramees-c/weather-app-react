import React, { useState } from "react";
import "./WeatherApp.css";
import axios from "axios";

import { API_KEY, BASE_URL } from "../../Api/Api";

function WeatherApp() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    console.log("Fetching weather");
    try {
      const response = await axios.get(
        `${BASE_URL}?key=${API_KEY}&q=${city}&aqi=no`
      );
      console.log(response.data);
      setWeather(response.data);
      setError("");
    } catch (error) {
      console.error(error, "Error fetching weather");
      setError("City not found");
      setWeather(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather();
  };
  return (
    <div className="weather-app">
      <div className="weather-card-container">
        <div className="weather-icon">
          <img
            className="container_img"
            src={weather && weather.current.condition.icon}
            width="150px"
            alt=""
          />
        </div>

        {weather && (
          <div className="weather-card">
            <p className="weather-temp">{weather.current.temp_c} &deg;C</p>
            <div className="weather-location">
              <p className="weather-country">{weather.location.country}</p>
              <p className="weather-region">
                {weather.location.name} {weather.location.localtime}
              </p>
            </div>
            <div className="weather-condition">
              <p className="weather-condition-text">
                {weather.current.condition.text}
              </p>
              <br />
              <br />
              <small className="weather-condition-humidity">
                <span>Humidity:{weather.current.humidity}</span>
              </small>
              <span>Wind:{weather.current.wind}</span>
            </div>
          </div>
        )}
      </div>
      <div className="search-form-container">
        <form className="search-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </div>
    </div>
  );
}

export default WeatherApp;
