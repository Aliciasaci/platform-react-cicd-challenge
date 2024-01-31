import React from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";

export const MapBox = ({ choosenCoords, locations }) => {
  const [lat, setLat] = useState(choosenCoords[0] ?? 48.866667);
  const [lng, setLng] = useState(choosenCoords[1] ?? 2.333333);
  const [map, setMap] = useState(null);
  mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

  useEffect(() => {
    map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: 12,
    });

    locations.forEach((location) => {
      new mapboxgl.Marker({
        color: "#FFFFFF",
      })
        .setLngLat([location.longitude, location.latitude])
        .addTo(map);
    });
    setMap(map);
  }, [locations]);

  return (
    <div>
      <div id="map" style={{ width: "100%", height: "100%" }}></div>
    </div>
  );
};
