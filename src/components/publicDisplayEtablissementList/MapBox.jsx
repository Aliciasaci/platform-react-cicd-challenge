import React from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import { Spinner } from "flowbite-react";

export const MapBox = ({ initialLat, initialLng, locations, isLoading }) => {
  const [lat, setLat] = React.useState(initialLat ?? 48.866667);
  const [lng, setLng] = React.useState(initialLng ?? 2.333333);
  const [zoom, setZoom] = React.useState(12);
  const mapContainer = React.useRef(null);
  const map = React.useRef(null);
  const locationsRef = React.useRef({});
  mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

  React.useEffect(() => {
    if (map.current || !mapContainer.current || locationsRef.current.length > 0)
      return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), "bottom-right");

    locations.forEach((location) => {
      locationsRef.current[location.id] = new mapboxgl.Marker()
        .setLngLat([location.longitude, location.latitude])
        .setPopup(
          new mapboxgl.Popup({ className: "text-black" }).setHTML(
            `<h3 class="markerPopupText">${location.nom}</h3>
            <p>${location.adresse}</p>`
          )
        )
        .addTo(map.current);
    });
  }, [locations]);

  if (isLoading) {
    return (
      <div className="h-full w-full flex justify-center items-center">
        <Spinner color="gray" size="xl" />
      </div>
    );
  }

  return (
    <div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
};
