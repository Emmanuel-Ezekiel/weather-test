import React, { useState, useEffect } from "react";
import WeatherInfo from "./weatherInfo";
import WeatherForecast from "../weatherForcast/weatherForcast";
import axios from "axios";
import "./weather.css";
import { useErrorBoundary } from "react-error-boundary";

const apiKey = process.env.REACT_APP_API_KEY;

export default function Weather() {
  const [userLocationData, setUserLocationData] = useState({ ready: false });
  const [city, setCity] = useState("");
  const { showBoundary } = useErrorBoundary();
  let [loaded, setLoaded] = useState(false);
  let [forecast, setForecast] = useState(null);

  function handleResponse(response) {
    // Extract and format the relevant data from the response
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

  function handleForcastResponse(response) {
    // Set the 'forecast' state with the response data and mark the data as loaded
    setForecast(response?.data?.list);
    setLoaded(true);
  }

  function handleSubmit(event) {
    event.preventDefault();
    // Trigger the search function when the form is submitted
    search();
  }
  
  function handleCityChange(event) {
    // Update the 'city' state when the user inputs a new city name
    setCity(event.target.value);
  }

  const load = async (latitude, longitude) => {
    // Extract latitude and longitude from 'props.coordinates'
    // Create the API URL for fetching weather forecast data
    let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&cnt=5`;

    // Make an API request to fetch weather forecast data and call 'handleResponse'
    axios.get(apiUrl).then(handleForcastResponse);
  }
  
  useEffect(() => {
    // Automatically fetch weather data based on the user's location when the component mounts
    if (!city) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // Check if latitude and longitude are defined
          if (
            typeof latitude !== "undefined" &&
            typeof longitude !== "undefined"
          ) {
            // Fetch weather data from an API using the user's coordinates
            fetchUserGeolocationData(latitude, longitude);
            load(latitude, longitude)
          } else {
            // Handle the case where geolocation data is not available
            console.log("Location is invalid")
          }
        },
        (error) => {
          // Handle geolocation errors
          console.error("Geolocation error:", error);
        }
      );
    }
  }, []);
  
  const fetchUserGeolocationData = async (latitude, longitude) => {
    try {
      if (latitude && longitude) {
        // Make the Axios request.
        let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
        await axios.get(apiUrl).then(handleResponse);
      } else {
        // Handle the case when latitude or longitude is undefined.
        showBoundary("Latitude or longitude is undefined.");
        // setError("Latitude or longitude is undefined.");
      }
    } catch (error) {
      if (error.response) {
        showBoundary(error.response.message);
        // Handle API error responses and display a fallback message
        // setError(error.response.message);
      }
    }
  };
  
  //function helps in fetch city
  function search() {
    let apiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}&units=metric`;
    axios
      .get(apiUrl)
      .then((response) => {
        const { lat, lon } = response?.data[0];
        fetchUserGeolocationData(lat, lon);
        load(lat, lon);
      })
      .catch((error) => {
        console.error("Error fetching geolocation data:", error);
      });
  }
  

  // if(error) return <p> Error </p>

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
        <WeatherForecast coordinates={userLocationData?.coordinates} forecast={forecast}  loaded={load} />
      </div>
    </>
  );
}
