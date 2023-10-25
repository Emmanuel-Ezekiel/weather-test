import React, { useState, useEffect } from "react";
import "./weatherForcast.css";
import axios from "axios";
import WeatherForecastDay from "./weatherForcastDay";

const apiKey = process.env.REACT_APP_API_KEY;
export default function WeatherForecast(props) {
  let [loaded, setLoaded] = useState(false);
  let [forecast, setForecast] = useState(null);

  useEffect(() => {
    // When the 'props.coordinates' value changes, set 'loaded' to 'false' to indicate data loading
    setLoaded(false);
  }, [props?.coordinates]);

  function handleResponse(response) {
    // Set the 'forecast' state with the response data and mark the data as loaded
    setForecast(response?.data?.list);
    setLoaded(true);
  }

  function load() {
    // Extract latitude and longitude from 'props.coordinates'
    let longitude = props?.coordinates?.lon;
    let latitude = props?.coordinates?.lat;

    // Create the API URL for fetching weather forecast data
    let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&cnt=5`;

    // Make an API request to fetch weather forecast data and call 'handleResponse'
    axios.get(apiUrl).then(handleResponse);
  }

  if (loaded) {
    return (
      <div className="WeatherForecast">
        <h1>5 days Forecast</h1>
        <div className="row">
          {forecast?.map(function (dailyForecast, index) {
            if (index < 5) {
              return (
                <div className="col-4" key={index}>
                  <WeatherForecastDay data={dailyForecast} />
                </div>
              );
            } else {
              return null;
            }
          })}
        </div>
      </div>
    );
  } else {
    load();

    return null;
  }
}
