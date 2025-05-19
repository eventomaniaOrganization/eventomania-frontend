import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import EventMarkers from '../components/map/EventMarkers';
import L from 'leaflet';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig.js';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import { auth } from '../firebaseConfig.js';

const Map = () => {
  const [position, setPosition] = useState(null);
  const [events, setEvents] = useState([]);
  const mapRef = useRef(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition({
            lat: pos.coords.latitude,
            lon: pos.coords.longitude,
          });
        },
        (err) => console.error('Geolocation error: ', err)
      );
    }
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsCol = collection(db, 'events');
        const eventsSnapshot = await getDocs(eventsCol);
        const eventsList = eventsSnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.title,
            description: data.description,
            category: data.category,
            startDateTime: data.startDateTime,
            endDateTime: data.endDateTime,
            address: data.address,
          };
        });

        // Only include events with valid lat/lon
        const filtered = eventsList.filter(
          (e) => e.address?.lat !== undefined && e.address?.lon !== undefined
        );

        setEvents(filtered);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  if (!position) return <div>Loading map...</div>;

  return (
    <div className="map-page" style={{ textAlign: 'center', padding: '20px' }}>
      <h2>Event Map</h2>
      <MapContainer
        center={[position.lat, position.lon]}
        zoom={13}
        style={{
          height: '900px',
          width: '60%',
          margin: '0 auto',
          borderRadius: '10px',
        }}
        ref={mapRef}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />

        <Marker position={[position.lat, position.lon]}>
          <Popup>Your current location</Popup>
        </Marker>

        <EventMarkers
          events={events}
          userLocation={position}
          setClickedEvent={() => {}}
          mapRef={mapRef}
        />
      </MapContainer>
    </div>
  );
};

export default Map;
