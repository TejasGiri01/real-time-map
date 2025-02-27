import React, { useState, useEffect } from "react";

// Custom Hook for getting current location
const useCurrentLocation = () => {
  const [location, setLocation] = useState(null);

  const fetchLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = [position.coords.latitude, position.coords.longitude];
        setLocation(coords);
      },
      (error) => {
        console.error("Error fetching location:", error);
        alert("Unable to retrieve location.");
      }
    );
  };

  return [location, fetchLocation];
};

const LocationForm = ({ setInitialPosition, setDestination }) => {
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");

  // Use the custom hook
  const [currentLocation, getCurrentLocation] = useCurrentLocation();

  // Set the location when fetched
  useEffect(() => {
    if (currentLocation) {
      setInitialPosition(currentLocation);
    }
  }, [currentLocation, setInitialPosition]);

  const handleUseCurrentLocation = (setter) => {
    getCurrentLocation();
    setter(currentLocation);
  };

  const swapLocations = () => {
    setInitialPosition((prev) => {
      setDestination(prev);
      return prev; // Ensure we always pass valid coordinates
    });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter Initial Location"
        value={input1}
        onChange={(e) => setInput1(e.target.value)}
      />
      <button onClick={() => handleUseCurrentLocation(setInitialPosition)}>
        Use Current Location
      </button>
      <input
        type="text"
        placeholder="Enter Destination"
        value={input2}
        onChange={(e) => setInput2(e.target.value)}
      />
      <button onClick={() => handleUseCurrentLocation(setDestination)}>
        Use Current Location
      </button>
      <button onClick={swapLocations}>Swap</button>
    </div>
  );
};

export default LocationForm;
