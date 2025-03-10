import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { auth } from '../components/map/firebase';
import Auth from '../components/map/Auth';
import EventMarkers from '../components/map/EventMarkers';
import { fetchEventsByCity, fetchAllEvents } from '../components/map/firebase';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

const Map = () => {
  const [user, setUser] = useState(null);
  const [position, setPosition] = useState(null);
  const [city, setCity] = useState('');
  const [events, setEvents] = useState([]);
  const [clickedEvent, setClickedEvent] = useState(null);
  const [route, setRoute] = useState(null);
  const mapRef = useRef(null);
  const apiKey = '5b3ce3597851110001cf62481c95047c8cd243f69da64803753de261'; //openRouteService API KEY

  useEffect(() => {
    if (mapRef.current) {
      console.log('Map created and mapRef set:', mapRef.current);
    }
  }, [mapRef.current]);

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

  const fetchAndDisplayEvents = async (city) => {
    try {
      let fetchedEvents;
      if (city) {
        fetchedEvents = await fetchEventsByCity(city);
      } else {
        fetchedEvents = await fetchAllEvents();
      }
      setEvents(fetchedEvents);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleSearchClick = () => {
    fetchAndDisplayEvents(city);
  };

  const handleRouteCalculation = async () => {
    if (position && clickedEvent) {
      console.log('Handling route calculation...');
      try {
        if (route) {
          route.remove();
        }

        const coordinates = [
          [position.lon, position.lat],
          [clickedEvent.Coordinates[1], clickedEvent.Coordinates[0]],
        ];

        // Make API call to OpenRouteService
        console.log('Coordinates for route:', coordinates);
        const response = await fetch(
          'https://api.openrouteservice.org/v2/directions/driving-car',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
              coordinates: coordinates,
              format: 'geojson',
            }),
          }
        );

        const data = await response.json();
        console.log('OpenRouteService response:', data);

        if (!data.routes || data.routes.length === 0) {
          console.error('No route found.');
          return;
        }

        const geoJsonRoute = data.routes[0];

        const newRoute = L.Routing.control({
          waypoints: [
            L.latLng(position.lat, position.lon), // User location
            L.latLng(clickedEvent.Coordinates[0], clickedEvent.Coordinates[1]), // Event location
          ],
          routeWhileDragging: true,
        }).addTo(mapRef.current);

        setRoute(newRoute);
      } catch (error) {
        console.error('Error calculating route:', error);
      }
    }
  };

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

      {/* Search Bar */}
      <div
        className="search-bar"
        style={{ marginBottom: '10px' }}
      >
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
          style={{
            padding: '8px 12px',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Search
        </button>
      </div>

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
          events={events}
          userLocation={position}
          setClickedEvent={setClickedEvent}
          mapRef={mapRef}
        />
        {/*Routing styling*/}
        {clickedEvent && (
          <div
            style={{
              position: 'absolute',
              top: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          >
            <button
              onClick={handleRouteCalculation}
              style={{
                padding: '10px 20px',
                borderRadius: '5px',
                cursor: 'pointer',
                backgroundColor: '#4CAF50',
                color: 'white',
              }}
            >
              Calculate Route
            </button>
          </div>
        )}
      </MapContainer>
    </div>
  );
};

export default Map;
