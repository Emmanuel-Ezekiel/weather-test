import React from "react";
import "./weatherForcast.css";
import WeatherForecastDay from "./weatherForcastDay";

export default function WeatherForecast(props) {
  if (props.loaded) {
    return (
      <div className="WeatherForecast">
        <h1>5 days Forecast</h1>
        <div className="row">
          {props?.forecast?.map(function (dailyForecast, index) {
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
    return <p>Loading</p>;
  }
}
