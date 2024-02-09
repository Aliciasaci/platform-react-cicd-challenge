import React from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";

export const MapBox = ({ choosenCoords, locations }) => {
  const [lat, setLat] = React.useState(48.866667);
  const [lng, setLng] = React.useState(2.333333);
  const [zoom, setZoom] = React.useState(15);
  const mapContainer = React.useRef(null);
  const map = React.useRef(null);
  mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

  React.useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });

    locations.forEach((location) => {
      new mapboxgl.Marker({
        color: "#FFFFFF",
      })
        .setLngLat([location.longitude, location.latitude])
        .addTo(map);
    });
  }, []);

  return (
    <div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
};
