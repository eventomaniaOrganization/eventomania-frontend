import React from 'react';
import { Marker, Popup } from 'react-leaflet';

const formatTimestamp = (timestamp) => {
  if (timestamp) {
    // Convert Firebase Timestamp to Date object
    const date = timestamp.toDate();
    return date.toLocaleString();
  }
  return 'N/A';
};

const EventMarkers = ({ events }) => {
  return (
    <>
      {events.map((event, index) => (
        <Marker
          key={index}
          position={[event.Coordinates[0], event.Coordinates[1]]}
        >
          <Popup>
            <h3>{event.Name}</h3>
            <p>{event.Description}</p>
            <p>
              {event.City}, {event.Region}
            </p>
            <p>
              Start Time: {formatTimestamp(event.startTime)}
            </p>
            <p>
              End Time: {formatTimestamp(event.endTime)}
            </p>
          </Popup>
        </Marker>
      ))}
    </>
  );
};

export default EventMarkers;
