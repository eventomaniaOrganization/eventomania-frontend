import React, { useState, useEffect } from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const EventMarkers = ({ events, userLocation, setClickedEvent, mapRef }) => {
  const [isMapReady, setIsMapReady] = useState(false);
  const [clickedEvent, setClickedEventState] = useState(null);

  const apiKey = '5b3ce3597851110001cf62481c95047c8cd243f69da64803753de261';

  useEffect(() => {
    if (mapRef.current) {
      console.log('Map is ready');
      setIsMapReady(true);
    } else {
      console.log('Map is not ready yet');
    }
  }, [mapRef]);

  const handleRouteCalculation = async () => {
    if (!isMapReady) {
      console.log('Map is not ready yet');
      return;
    }

    if (clickedEvent) {
      const { Coordinates } = clickedEvent;
      const [eventLat, eventLon] = Coordinates;
      console.log('Event Coordinates:', { eventLat, eventLon });

      if (userLocation) {
        const { lat, lon } = userLocation;
        console.log('User Location:', { lat, lon });

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
                  [lon, lat], // User location
                  [eventLon, eventLat],
                ],
              }),
            }
          );

          if (!response.ok) {
            throw new Error(
              `API Error: ${response.status} - ${response.statusText}`
            );
          }

          const routeData = await response.json();
          console.log('Route Data:', routeData);

          if (mapRef.current) {
            const route = routeData.features[0].geometry;
            console.log('Route geometry:', route);

            const geoJsonLayer = L.geoJSON(route).addTo(mapRef.current);
            alert('Route calculated successfully!');
          }
        } catch (error) {
          console.error('Error calculating route:', error);
          alert('Error calculating the route.');
        }
      } else {
        console.log('User location is not available.');
        alert('User location is not available.');
      }
    } else {
      alert('No event selected for routing.');
    }
  };

  return (
    <>
      {events.map((event, id) => (
        <Marker
          key={id}
          position={[event.Coordinates[0], event.Coordinates[1]]}
          eventHandlers={{
            click: (e) => {
              console.log('Marker onClick triggered!');
              console.log(`Marker clicked: ${event.Name}`);
              console.log(
                `Event Coordinates: ${event.Coordinates[0]}, ${event.Coordinates[1]}`
              );
              console.log('Click event details:', e.originalEvent);

              setClickedEventState(event);
              setClickedEvent(event);
            },
          }}
        >
          <Popup interactive={false}>
            <h3>{event.Name}</h3>
            <p>{event.Description}</p>
            <p>
              {event.City}, {event.Region}
            </p>
            <p>
              Start Time:{' '}
              {new Date(event.startTime.seconds * 1000).toLocaleString()}
            </p>
            <p>
              End Time:{' '}
              {new Date(event.endTime.seconds * 1000).toLocaleString()}
            </p>

            <button
              onClick={(e) => {
                e.stopPropagation();
                console.log('Route button clicked for:', clickedEvent?.Name);
                handleRouteCalculation();
              }}
              style={{
                padding: '8px 12px',
                borderRadius: '5px',
                backgroundColor: '#4CAF50',
                color: 'white',
                cursor: 'pointer',
              }}
            >
              Calculate Route
            </button>
          </Popup>
        </Marker>
      ))}
    </>
  );
};

export default EventMarkers;
