import React, { useState } from "react";
import MapComponent from "./components/MapComponent";
import LocationForm from "./components/LocationForm";
import "./App.css"; // Import CSS

function App() {
  const [initialPosition, setInitialPosition] = useState([51.505, -0.09]); // Default location
  const [destination, setDestination] = useState([51.515, -0.1]); // Prevents null errors

  return (
    <div className="app-container">
      <h1>Real-Time Location Map</h1>
      <LocationForm
        setInitialPosition={setInitialPosition}
        setDestination={setDestination}
      />
      <MapComponent initialPosition={initialPosition} destination={destination} />
    </div>
  );
}

export default App;
