import React from "react";
import Weather from "./components/weather/weather";
// import ErrorBoundary from "./helpers/ErrorBoundary";

import "./App.css";

export default function App() {
  return (
    <div className="App">
      <div className="container">
        <Weather/>
      </div>
    </div>
  );
}
