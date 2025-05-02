import React, { useEffect, useState } from "react";
import { fetchEvents } from "../services/eventService";

function Events() {
  const [events, setEvents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Music", "Art", "Technology", "Food"];

  useEffect(() => {
    const loadEvents = async () => {
      const eventList = await fetchEvents();
      setEvents(eventList);
    };

    loadEvents();
  }, []);

  const filteredEvents =
    selectedCategory === "All"
      ? events
      : events.filter((event) => event.category === selectedCategory);

  return (
    <div className="events-page">
      <h1>Events</h1>
      <div className="filter-buttons">
        <p>Filter by category:</p>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`filter-button ${
              selectedCategory === category ? "active" : ""
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="event-list" >
        {filteredEvents.length === 0 && <p>No events available.</p>}
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <div key={event.id} className="event-card">
              <img
                src={event.image}
                alt={event.title}
                className="event-image"
              />
              <h3 className="test">{event.title}</h3>
              <p>Category: {event.category}</p>
              <p>
                Start: {new Date(event.startDateTime).toLocaleString("sv-SE")}
              </p>
            </div>
          ))
        ) : (
          <p>No events found for this category.</p>
        )}
      </div>
    </div>
  );
}

export default Events;
