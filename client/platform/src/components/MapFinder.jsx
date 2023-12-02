import React, { useState, useEffect, useRef } from 'react';
import { TextInput } from 'flowbite-react';
import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api';

const CONTAINER_STYLE = {
    width: '100%',
    height: '400px'
};

const CENTER = {
    lat: 48.8566,
    lng: 2.3522
};

const LIBRARIES = ["places"];

function MapFinder({ onAddressSelect }) {
    const API_KEY = import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY;
    const [mapCenter, setMapCenter] = useState(CENTER);
    const [zoom, setZoom] = useState(10); // Zoom level
    const [inputValue, setInputValue] = useState("");
    const autocompleteRef = useRef(null);
    const autocompleteInstance = useRef(null);

    const initializeAutocomplete = () => {
        if (!autocompleteInstance.current && typeof google !== 'undefined') {
            const autocompleteOptions = {
                types: ["address"],
                componentRestrictions: { country: "FR" }
            };

            autocompleteInstance.current = new google.maps.places.Autocomplete(
                autocompleteRef.current,
                autocompleteOptions
            );

            autocompleteInstance.current.addListener("place_changed", () => {
                const place = autocompleteInstance.current.getPlace();
                if (place.geometry) {
                    setMapCenter({
                        lat: place.geometry.location.lat(),
                        lng: place.geometry.location.lng(),
                    });
                    setZoom(18);
                    setInputValue(place.formatted_address);
                    onAddressSelect(place.formatted_address);
                }
            });
        }
    };

    useEffect(() => {
        initializeAutocomplete();
    }, [inputValue, onAddressSelect]);

    return (
        <div className='flex justify-center items-center'>
            <div className='w-full'>
                <TextInput 
                    ref={autocompleteRef}
                    id="location"
                    type="text"
                    placeholder="Search location"
                    sizing="md"
                    name="location"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className='mb-4'
                />

                    <GoogleMap
                        mapContainerStyle={CONTAINER_STYLE}
                        center={mapCenter}
                        zoom={zoom}
                    >
                        <MarkerF
                            position={mapCenter}
                        >
                        </MarkerF>
                    </GoogleMap>
            </div>
        </div>
    );
}

export default React.memo(MapFinder);
