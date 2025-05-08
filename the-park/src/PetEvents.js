import React, { useState } from 'react';
import './Style/PetEvents.css';
import logo2 from './Images/logo2.png';

function PetEvents() {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    description: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEvent = { ...form };
    setEvents([newEvent, ...events]);
    setForm({ title: '', date: '', time: '', location: '', description: '' });
  };

  return (
    <div className="pet-events-page">
      {/* Sidebar */}
      <div className="sidebar">
        <img src={logo2} alt="The Park Logo" className=" sidebar-logo" />
        <h2 className="park-title">The Park</h2>
        <nav className="nav-links">
          <a href="/">Home</a>
          <a href="/profile">Profile</a>
          <a href="/events" className="active">Events</a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="events-main">
        <h1 id="event-title">Events</h1>

        <form className="form-box" onSubmit={handleSubmit}>
          <input
            name="title"
            placeholder="Event Title"
            value={form.title}
            onChange={handleChange}
            required
          />
          <input
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            required
          />
          <input
            name="time"
            type="time"
            value={form.time}
            onChange={handleChange}
            required
          />
          <input
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            placeholder="Event Description"
            value={form.description}
            onChange={handleChange}
            required
          />
          <button type="submit">Create Event</button>
        </form>

        <h2 id ="upcoming-title"className = "upcoming-events">Upcoming Events</h2>
        {events.length === 0 ? (
          <p className="empty-state">No events added yet.</p>
        ) : (
          <div className="feed-grid">
            {events.map((event, index) => (
              <div className="event-card" key={index}> 
                <h3>{event.title}</h3>
                <p><strong>Date:</strong> {event.date}</p>
                <p><strong>Time:</strong> {event.time}</p>
                <p><strong>Location:</strong> {event.location}</p>
                <p>{event.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default PetEvents;
