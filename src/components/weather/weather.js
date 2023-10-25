import React, { useState, useEffect } from "react";
import WeatherInfo from "./weatherInfo";
import WeatherForecast from "../weatherForcast/weatherForcast";
import axios from "axios";
import "./weather.css";
import useGeoLocation from "../../hooks/useGeoLocation";

const apiKey = process.env.REACT_APP_API_KEY;

export default function Weather(props) {
  const [userLocationData, setUserLocationData] = useState({ ready: false });
  const [searchedCityData, setSearchedCityData] = useState({ ready: false });
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useGeoLocation();

  function handleResponse(response) {
    console.log(response.data)
    setUserLocationData({
      ready: true,
      coordinates: response.data?.coord,
      temperature: response.data.main?.temp,
      humidity: response.data.main?.humidity,
      date: new Date(response.data?.dt * 1000),
      description: response?.data?.weather[0]?.description,
      icon: response.data?.weather[0]?.icon,
      wind: response.data?.wind.speed,
      city: response.data?.name,
    });
   
  }

  // setWeatherData({
  //   ready: true,
  //   coordinates: response.data.coord,
  //   temperature: response.data.main.temp,
  //   humidity: response.data.main.humidity,
  //   date: new Date(response.data.dt * 1000),
  //   description: response.data.weather[0].description,
  //   icon: response.data.weather[0].icon,
  //   wind: response.data.wind.speed,
  //   city: response.data.name,
  // });

  function handleSubmit(event) {
    event.preventDefault();
    search();
  }

  function handleCityChange(event) {
    setCity(event.target.value);
  }

  // useEffect(() => {
  //   // Automatically fetch weather data based on the user's location when the component mounts
  //   if (!city) {
  //     let timeoutId;

  //     const handlePosition = (position) => {
  //       const { latitude, longitude } = position.coords;
  //       console.log(latitude, longitude);
  //       // Check if latitude and longitude are defined
  //       if (typeof latitude !== "undefined" && typeof longitude !== "undefined") {
  //         // Fetch weather data from an API using the user's coordinates
  //         fetchUserGeolocationData(latitude, longitude);
  //       } else {
  //         // Handle the case where geolocation data is not available
  //         console.error("Latitude and/or longitude is undefined.");
  //       }
  //     };

  //     const handlePositionError = (error) => {
  //       // Handle geolocation errors
  //       console.error("Geolocation error:", error);
  //     };

  //     const geolocationOptions = {
  //       timeout: 5000, // Set a timeout of 5 seconds
  //     };

  //     // Request user's geolocation
  //     navigator.geolocation.getCurrentPosition(
  //       handlePosition,
  //       handlePositionError,
  //       geolocationOptions
  //     );

  //     // Set a timeout to retry geolocation if coordinates are not obtained within the timeout period
  //     timeoutId = setTimeout(() => {
  //       console.error("Geolocation request timed out.");
  //       // Retry geolocation request
  //       navigator.geolocation.getCurrentPosition(
  //         handlePosition,
  //         handlePositionError,
  //         geolocationOptions
  //       );
  //     }, geolocationOptions.timeout);

  //     // Clear the timeout if coordinates are obtained before the timeout period
  //     return () => clearTimeout(timeoutId);
  //   }
  // }, []);

  // useEffect(() => {
  //   // Attempt to retrieve user's location from local storage
  //   if (!city) {
  //     const savedUserLocationData = localStorage.getItem("userLocationData");
  //     const data = JSON.parse(savedUserLocationData);
  //     if (savedUserLocationData) {
  //       if (
  //         typeof latitude !== "undefined" &&
  //         typeof longitude !== "undefined"
  //       ) {
  //         // Fetch weather data from an API using the user's coordinates
  //         fetchUserGeolocationData(data.lat, data.lon);
  //       }

  //     } else {
  //       // Geolocation request
  //       navigator.geolocation.getCurrentPosition(
  //         (position) => {
  //           const { latitude, longitude } = position.coords;
  //           console.log(latitude, longitude);
  //           fetchUserGeolocationData(latitude, longitude);
  //         },
  //         (error) => {
  //           console.error("Geolocation error:", error);
  //         }
  //       );
  //     }
  //   }
  // }, []);

  useEffect(() => {
    // Automatically fetch weather data based on the user's location when the component mounts
    if (!city) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log(latitude, longitude);
          // Check if latitude and longitude are defined
          if (
            typeof latitude !== "undefined" &&
            typeof longitude !== "undefined"
          ) {
            // Fetch weather data from an API using the user's coordinates
            fetchUserGeolocationData(latitude, longitude);
          } else {
            // Handle the case where geolocation data is not available
            console.error("Latitude and/or longitude is undefined.");
          }
        },
        (error) => {
          // Handle geolocation errors
          console.error("Geolocation error:", error);
        }
      );
    }
  }, []);

  const fetchUserGeolocationData = (latitude, longitude) => {
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
    axios.get(apiUrl).then(handleResponse);

    // Make API request with latitude and longitude
    // Update weatherData state with the response
  };

  function search() {
    let apiUrl = `https://api.openweathermap.org/data/2.5/direct?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(handleResponse);
  }

  return (
    <>
      <div className="Weather">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-9">
              <input
                type="search"
                placeholder="Enter a city.."
                className="form-control"
                autoFocus="on"
                onChange={handleCityChange}
              />
            </div>
            <div className="col-3">
              <input
                type="submit"
                value="Search"
                className="btn btn-primary w-100"
              />
            </div>
          </div>
        </form>
        <WeatherInfo data={userLocationData} />
        <WeatherForecast
          coordinates={userLocationData?.coordinates}
        />
      </div>
    </>
  );
}
