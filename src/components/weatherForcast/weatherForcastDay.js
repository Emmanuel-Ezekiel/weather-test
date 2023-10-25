import React from "react";

export default function WeatherForecastDay(props) {
  function maxTemperature() {
    let temperature = Math.round(props.data?.main?.temp_max);
    return `${temperature}°`;
  }

  function minTemperature() {
    let temperature = Math.round(props.data?.main?.temp_min);
    return `${temperature}°`;
  }

  function day() {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const date = new Date(props?.data?.dt * 1000);
    const dayIndex = date?.getDay();
  
    return days[dayIndex];
  }

  
  return (
    <div>
      
      <div className="WeatherForecast-day">{day()}</div>
     
      <img
        src={`http://openweathermap.org/img/wn/${props?.data?.weather[0]?.icon}@2x.png`}
        alt="icon"
      />
      <p>{props?.data?.weather[0]?.description}</p>
      <div className="WeatherForecast-temperatures">
        <span className="WeatherForecast-temperature-max">
          {maxTemperature()}
        </span>
        <span className="WeatherForecast-temperature-min">
          {minTemperature()}
        </span>
      </div>
    </div>
  );
}
