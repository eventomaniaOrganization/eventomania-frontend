import React, { useEffect, useState } from 'react'
import {MapContainer, TileLayer, Marker, Popup, useMap} from "react-leaflet";
import {collection, getDocs} from "firebase/firestore"
import {db} from "../firebaseConfig";
import Leaflet from "leaflet";
import "../../node_modules/leaflet/dist/leaflet.css";
import "../asset/scss/index.css";

import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Anpassad röd ikon för användaren
const userIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

//standard Leaflet ikon buggar i React ibland
delete Leaflet.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
   iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const FlyToUser = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    if(position) {
      map.flyTo(position, 13)
    }
  }, [position])
  return null
}

const MapEvents = () => {
  const [events, setEvents] = useState([])
  const [filterEvents, setFilterEvents] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [userPosition, setUserPosition] = useState(null);

  useEffect (() => {
    const featchEvents = async () => {
      const ref = collection(db, "events")
      const snapshot = await getDocs(ref)
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      setEvents(data)
      setFilterEvents(data)
    };

    featchEvents();
  }, []);

  // Hämta användarens plats
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const {latitude, longitude} = pos.coords
        setUserPosition([latitude, longitude])
      },
      (err) => {
        console.warn("kunde inte hämta plats", err.message)
      }
    )
  }, [])

  const handlerSearch = () => {
    const q = searchQuery.toLowerCase()
    const filtered = events.filter(event =>
      event.title.toLowerCase().includes(q) ||
      event.category.toLowerCase().includes(q) ||
      event.address?.text?.toLowerCase().includes(q)
    );
    setFilterEvents(filtered)
  }

  return (
    <div className='map-events container py-4'>
      <h2 className=''>Eventkarta</h2>
      <div className='search-bar mb-3'>
        <input 
          type="text"
          placeholder='Sök event, kategori eller plats'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handlerSearch}>Sök</button>
      </div>

      <MapContainer center={[56.0465, 12.6945]} zoom={13} scrollWheelZoom={true} className="event-map">
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {filterEvents.map((event) => (
          <Marker key={event.id} position={[event.address.lat, event.address.lon]}>
            <Popup>
              <h6>{event.title}</h6>
              <p><strong>Kategori:</strong> {event.category}</p>
              <p><strong>Start:</strong> {new Date(event.startDateTime).toLocaleString("sv-SE")}</p>
              <a href={event.moreInfoLink} target="_blank" rel="noreferrer">Mer info</a>
            </Popup>

          </Marker>
        ))}

         {/* Användarens plats */}
        {userPosition && (
          <>
            <Marker position={userPosition} icon={userIcon}>
              <Popup>Du är här</Popup>
            </Marker>
            <FlyToUser position={userPosition} />
          </>
        )}
      </MapContainer>
    </div>
  )
}

export default MapEvents