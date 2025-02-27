import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";

const RoutingMachine = ({ initialPosition, destination }) => {
  const map = useMap();

  useEffect(() => {
    if (!map || !initialPosition || !destination) return;

    let routingControl = L.Routing.control({
      waypoints: [L.latLng(initialPosition), L.latLng(destination)],
      lineOptions: {
        styles: [{ color: "blue", weight: 5 }],
      },
      createMarker: () => null, // Prevents default markers
      routeWhileDragging: true,
    });

    routingControl.addTo(map);

    return () => {
      // Ensure we remove the routing control safely
      if (map.hasLayer(routingControl)) {
        map.removeControl(routingControl);
      }
    };
  }, [map, initialPosition, destination]);

  return null;
};

export default RoutingMachine;
