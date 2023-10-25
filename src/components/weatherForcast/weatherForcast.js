import React, { useState, useEffect } from "react";
import "./weatherForcast.css";
import axios from "axios";
import WeatherForecastDay from "./weatherForcastDay";

export default function WeatherForecast(props) {
  let [loaded, setLoaded] = useState(false);
  let [forecast, setForecast] = useState(null);

  console.log(props.lon, props.lat);

  useEffect(() => {
    setLoaded(false);
  }, [props.coordinates]);

  function handleResponse(response) {
    console.log("see", response?.data?.list);
    setForecast(response.data?.list);
    setLoaded(true);
  }

  function load() {
    let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
    let longitude = props?.coordinates?.lon;
    let latitude = props?.coordinates?.lat;
    let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&cnt=5`;

    axios.get(apiUrl).then(handleResponse);
  }

  if (loaded) {
    return (
      <div className="WeatherForecast">
        <div className="row">
          <h1>5 days Forecast</h1>
          {forecast?.map(function (dailyForecast, index) {
            if (index < 5) {
              return (
                <div className="col" key={index}>
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
