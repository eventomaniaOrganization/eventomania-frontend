import React, { useEffect, useState, useMemo} from "react";
import DatePicker from "react-datepicker";
import Select from "react-select";
import { fetchEvents } from "../services/eventService";
import "react-datepicker/dist/react-datepicker.css";

function Events() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([])
  const [startDate, setStartDate] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(null);

  
  useEffect(() => {
    const loadEvents = async () => {
      const data = await fetchEvents();
      setEvents(data);
      setFilteredEvents(data)
    };

    loadEvents();
  }, []);

  const categories = useMemo(() => {
  if (!events) return [];
  return Array.from(new Set(events.map((event) => event.category)));
}, [events]);


  const categoryOptions = categories.map((cat) => ({
    value: cat,
    label: cat,
  }))

  const handleFilter = () => {
    const filtered = events.filter((event) => {
      const eventStart = new Date(event.startDateTime)
      return (
        (!selectedCategory || event.category === selectedCategory.value) &&
        (!startDate || eventStart >= startDate)
      )
    })

    setFilteredEvents(filtered)
  }
 

  return (
    <div className="container py-3 mt-5">
      <h1 className="mb-4">Events</h1>

      <div className="filter">
        <h2 className="mb-4">Filtrera evenemang</h2>

        <div className="row mb-4">
          <label>Från datum:</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            placeholderText="Välj startdatum"
            className="form-control"
            dateFormat={"yyyy-MM-dd"}
          />
        </div>

        <div className="col-md-6 mb-3">
          <label>Kategori:</label>
          <Select
            options={categoryOptions}
            isClearable
            placeholder="Välj kategori"
            onChange={setSelectedCategory}
            value={selectedCategory}
          />
        </div>
      
        <button className="btn btn-primary mb-4" onClick={handleFilter}>
          Filtrera
        </button>
      </div>
      
      
      <div className="event-list row" >
        {filteredEvents.length === 0 ? (
          <p>Inga matchande evenemang hittades.</p>
        ) : (
          filteredEvents.map((event) => (
            <div key={event.id} className="event-cards col-md-4 mb-4">
              <div className="card h-100">
                <img
                src={event.image}
                alt={event.title}
                className="event-images card-img-top"
                />

                <h3 className="title">{event.title}</h3>

                <p className="card-texts">
                  Category: {event.category}
                </p>
                <p>
                  Start: {new Date(event.startDateTime).toLocaleString("sv-SE")}
                </p>


              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Events;
