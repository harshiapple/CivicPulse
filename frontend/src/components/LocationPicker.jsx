import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from "react-leaflet";
import { useState } from "react";
import L from "leaflet";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function RecenterMap({ position }) {
  const map = useMap();

  if (position) {
    map.setView(position, 16);
  }

  return null;
}

function ClickHandler({ position, setPosition, onLocationSelect }) {
  useMapEvents({
    async click(e) {

      const addressResponse = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${e.latlng.lat}&lon=${e.latlng.lng}`
      );

      const addressData = await addressResponse.json();

      const point = {
        lat: e.latlng.lat,
        lng: e.latlng.lng,
        address: addressData.display_name,
      };

      setPosition(point);

      onLocationSelect(point);
    }
  });

  return position ? <Marker position={position} /> : null;
}

function LocationPicker({ onLocationSelect }) {

  const [position, setPosition] = useState(null);
    const getAddress = async (lat, lng) => {

    try {

      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );

      const data = await response.json();

      return data.display_name;

    } catch (error) {

      console.error("Address lookup failed", error);

      return `${lat}, ${lng}`;
    }

  };

  const useCurrentLocation = () => {

    if (!navigator.geolocation) {
      alert("Geolocation is not supported.");
      return;
    }

    navigator.geolocation.getCurrentPosition(async (pos) => {

      const address = await getAddress(
        pos.coords.latitude,
        pos.coords.longitude
      );

      const point = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
        address,
      };

      setPosition(point);

      onLocationSelect(point);

    });

  };

  return (

    <div className="map-wrapper">

      <button
        type="button"
        className="location-btn"
        onClick={useCurrentLocation}
      >

        📍 Use My Current Location

      </button>

      <MapContainer
        center={[16.5062, 80.6480]}
        zoom={13}
        style={{
          height: "400px",
          width: "100%",
          borderRadius: "12px",
        }}
      >

        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <RecenterMap position={position} />

        <ClickHandler
          position={position}
          setPosition={setPosition}
          onLocationSelect={onLocationSelect}
        />

      </MapContainer>

      {position && (

        <div className="coordinates-box">

          <h4>Selected Location</h4>

          <p>
            📍 {position.address}
          </p>

          <hr />

          <p>
            Latitude : {position.lat.toFixed(6)}
          </p>

          <p>
            Longitude : {position.lng.toFixed(6)}
          </p>

        </div>

      )}

    </div>

  );

}

export default LocationPicker;