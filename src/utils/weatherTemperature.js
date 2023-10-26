import React from "react";

export default function WeatherTemperature(props) {
  return (
    <div className="WeatherTemperature">
     <span className="temperature">{isNaN(props.celsius) ? 0 : Math.round(props.celsius)}</span>
      <span className="unit">°C</span>
    </div>
  );
}