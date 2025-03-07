import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { auth } from '../components/map/firebase';
import Auth from '../components/map/Auth';
import EventMarkers from '../components/map/EventMarkers';
import { fetchEventsByCity, fetchAllEvents } from '../components/map/firebase';
import 'leaflet/dist/leaflet.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';

const Map = () => {
  const [user, setUser] = useState(null);
  const [position, setPosition] = useState(null);
  const [city, setCity] = useState('');
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setPosition({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (err) => console.error('Geolocation error: ', err)
      );
    }
  }, []);

  // Fetch events by city
  const fetchAndDisplayEvents = async (city) => {
    try {
      let fetchedEvents;
      if (city) {
        fetchedEvents = await fetchEventsByCity(city);
      } else {
        fetchedEvents = await fetchAllEvents();
      }
      console.log("Fetched events:", fetchedEvents);
      setEvents(fetchedEvents);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleSearchClick = () => {
    fetchAndDisplayEvents(city);
  };

  if (!user) {
    return <Auth />;
  }

  if (!position) {
    return <div>Loading...</div>;
  }

  return (
    <div className="map-page" style={{ textAlign: 'center', padding: '20px' }}>
      <h2>Event Map</h2>

      {/* Search Bar */}
      <div className="search-bar" style={{ marginBottom: '10px' }}>
        <input
          type="text"
          placeholder="Search for a city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={{
            padding: '8px',
            width: '250px',
            marginRight: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc',
          }}
        />
        <button
          onClick={handleSearchClick}
          style={{ padding: '8px 12px', borderRadius: '5px', cursor: 'pointer' }}
        >
          Search
        </button>
      </div>

      {/* Map Container */}
      <MapContainer
        center={[position.lat, position.lon]}
        zoom={13}
        style={{ height: '500px', width: '70%', margin: '0 auto', borderRadius: '10px' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[position.lat, position.lon]}>
          <Popup>Your current location</Popup>
        </Marker>
        <EventMarkers events={events} />
      </MapContainer>
    </div>
  );
};

export default Map;
