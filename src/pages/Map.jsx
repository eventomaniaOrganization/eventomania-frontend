import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import Auth from '../components/map/Auth';
import EventMarkers from '../components/map/EventMarkers';
import L from 'leaflet';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig.js';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

const Map = () => {
  async function logEventsData() {
    try {
      const eventsCol = collection(db, 'Events');
      const eventsSnapshot = await getDocs(eventsCol);
      const eventsList = eventsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log('Events data:', eventsList);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  }

  logEventsData();
  const [user, setUser] = useState(null);
  const [position, setPosition] = useState(null);
  const [events, setEvents] = useState([]); // Stores all events
  const [clickedEvent, setClickedEvent] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);

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
    // Fetch all events when the component mounts
    const fetchEvents = async () => {
      try {
        const fetchedEvents = await fetchAllEvents();
        console.log('Fetched events:', fetchedEvents); // Debugging log
        setEvents(fetchedEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  if (!user) {
    return <Auth />;
  }

  if (!position) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="map-page"
      style={{ textAlign: 'center', padding: '20px' }}
    >
      <h2>Event Map</h2>

      {/* Map Container */}
      <MapContainer
        center={[position.lat, position.lon]}
        zoom={13}
        style={{
          height: '500px',
          width: '100%',
          margin: '0 auto',
          borderRadius: '10px',
        }}
        ref={mapRef}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        <Marker position={[position.lat, position.lon]}>
          <Popup>Your current location</Popup>
        </Marker>

        {/* Event Markers with Button in Popup */}
        <EventMarkers
          events={events} // Ensure we're passing all events correctly
          userLocation={position}
          setClickedEvent={setClickedEvent}
          mapRef={mapRef}
        />
      </MapContainer>
    </div>
  );
};

export default Map;
