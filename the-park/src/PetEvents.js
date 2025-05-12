import React, { useState } from 'react';
import './Style/main.css'; // Use Main.js styles (sidebar layout)
import './Style/PetEvents.css'; // Keep background image and event styles
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
    <div className="page-container pet-events-page"> {/* Combine layout + background */}

      {/* Sidebar from Main.js */}
      <div className="sidebar">
        <img src={logo2} alt="Logo" />
        <div className="nav">
          <div onClick={() => window.location.href = '/Main'}>🏠 Home</div>
          <div onClick={() => window.location.href = '/About'}>ℹ️ About Us</div>
          <div onClick={() => window.location.href = '/profile'}>👤 My Profile</div>
          <div onClick={() => window.location.href = '/CreatePost'}>📜 Create Post</div>
          <div onClick={() => window.location.href = '/GroupSignup'}>👥 Create Group</div>
          <div onClick={() => window.location.href = '/LostAndFound'}>🔍 Lost and Found</div>
          <div onClick={() => window.location.href = '/PetEvents'}>🎉 Pet Events</div>
        </div>
      </div>

      {/* Main content */}
      <div className="main-content">
        <h1 className="profile-title">Pet Events</h1>

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

        <h2 id="upcoming-title" className="upcoming-events">Upcoming Events</h2>
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

      {/* Right sidebar like in Main.js */}
      <div className="profile-actions">
        <h3>Profile Actions</h3>
        <button onClick={() => window.location.href = '/'}>Log Out</button>
      </div>
    </div>
  );
}

export default PetEvents;
