import React, { useState, useEffect } from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const EventMarkers = ({ events, userLocation, setClickedEvent, mapRef }) => {
  const [clickedEvent, setClickedEventState] = useState(null);
  const [routeDistance, setRouteDistance] = useState(null);
  const [currentRoute, setCurrentRoute] = useState(null);
  const apiKey = '5b3ce3597851110001cf62481c95047c8cd243f69da64803753de261';

  const handleRouteCalculation = async () => {
    if (!clickedEvent || !userLocation) return;

    const { lat, lon } = clickedEvent.address;
    const startLat = userLocation.lat;
    const startLon = userLocation.lon;

    try {
      const response = await fetch(
        'https://api.openrouteservice.org/v2/directions/driving-car/geojson',
        {
          method: 'POST',
          headers: {
            Authorization: apiKey,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            coordinates: [
              [startLon, startLat],
              [lon, lat],
            ],
          }),
        }
      );

      const routeData = await response.json();
      const distanceMeters =
        routeData.features[0].properties.segments[0].distance;
      const distanceKm = (distanceMeters / 1000).toFixed(2);
      setRouteDistance(distanceKm);

      if (mapRef.current) {
        const route = routeData.features[0].geometry;
        if (currentRoute) mapRef.current.removeLayer(currentRoute);
        const geoJsonLayer = L.geoJSON(route).addTo(mapRef.current);
        setCurrentRoute(geoJsonLayer);
      }
    } catch (error) {
      console.error('Route calculation failed:', error);
    }
  };

  return (
    <>
      {events.map((event) => {
        const { address } = event;
        if (!address || address.lat === undefined || address.lon === undefined)
          return null;

        return (
          <Marker
            key={event.id}
            position={[address.lat, address.lon]}
            eventHandlers={{
              click: () => {
                setClickedEventState(event);
                setClickedEvent(event);
              },
            }}
          >
            <Popup>
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <p>{address.text}</p>
              <p>
                Start: {new Date(event.startDateTime).toLocaleString()} <br />
                End: {new Date(event.endDateTime).toLocaleString()}
              </p>
              {routeDistance && <p><strong>Distance: {routeDistance} km</strong></p>}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRouteCalculation();
                }}
              >
                Calculate Route
              </button>
            </Popup>
          </Marker>
        );
      })}
    </>
  );
};

export default EventMarkers;
