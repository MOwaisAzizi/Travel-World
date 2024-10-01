import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Map.module.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { useCities } from "../contexts/CitiesContext";
import { useGeolaction } from "../Hooks/useGeolocation";
import { useURLPosition } from "../Hooks/useURLPosition";
import Button from "./Button";

export default function Map() {
  const [MapPostion, setMapPosition] = useState([40, 0]);

  const [mapLat,mapLng] = useURLPosition()

  const { cities } = useCities();
  const {
    isLoading: isLoadingGeolocation,
    position: geoLocationPostion,
    getPostion,
    error,
  } = useGeolaction();

  useEffect(
    function () {
      if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
    },
    [mapLat, mapLng]
  );

  useEffect(
    function () {
      if (geoLocationPostion)
        setMapPosition([geoLocationPostion.lat, geoLocationPostion.lng]);
    },
    [geoLocationPostion]
  );

  //  onClick={() => navigate("form")}
  return (
    <div className={styles.mapContainer}>
      {!geoLocationPostion && (
        <Button onClick={getPostion} type="position">
          {isLoadingGeolocation ? "Loading..." : "Use Your Location"}
        </Button>
      )}
      <MapContainer
        className={styles.map}
        center={MapPostion}
        zoom={10}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr./hot/{z}/{x}/{y}.png"
        />
        <ChangeCenter position={MapPostion} />
        <DetectClick />

        {cities.map((city) => {
          return (
            <Marker position={[city.position.lat, city.position.lng]}>
              <Popup>
                <p>
                  {" "}
                  {city.emoji} {city.cityName}
                </p>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();

  useMapEvent({
    click: (e) => {
      //ading url state to here for dynamic usege
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}
