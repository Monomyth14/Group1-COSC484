import React, { useState } from 'react';
import './Style/LostAndFound.css';
import logo2 from './Images/logo2.png';
import { FaCamera, FaMapMarkerAlt } from 'react-icons/fa';

function LostAndFound() {
  const [tab, setTab] = useState('lost');
  const [lostPets, setLostPets] = useState([]);
  const [foundPets, setFoundPets] = useState([]);
  const [form, setForm] = useState({
    name: '',
    location: '',
    date: '',
    description: '',
    contact: '',
  });
  const [photoPreview, setPhotoPreview] = useState(null);

  // Update text fields
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle file selection and preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoPreview(URL.createObjectURL(file));
    } else {
      setPhotoPreview(null);
    }
  };

  // Submit form data
  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntry = { ...form, photo: photoPreview };
    if (tab === 'lost') {
      setLostPets([newEntry, ...lostPets]);
    } else {
      setFoundPets([newEntry, ...foundPets]);
    }
    setForm({ name: '', location: '', date: '', description: '', contact: '' });
    setPhotoPreview(null);
  };

  // Render the form
  const renderForm = () => (
    <form className="form-box" onSubmit={handleSubmit}>
      <input
        name="name"
        placeholder="Pet Name (optional)"
        value={form.name}
        onChange={handleChange}
      />
      <div className="input-group">
        <span className="input-icon"><FaMapMarkerAlt /></span>
        <input
          name="location"
          placeholder="Location (Last Seen / Found)"
          value={form.location}
          onChange={handleChange}
        />
      </div>
      <input
        name="date"
        type="date"
        value={form.date}
        onChange={handleChange}
      />
      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
      />
      <input
        name="contact"
        placeholder="Your Contact Info"
        value={form.contact}
        onChange={handleChange}
      />
      <div className="file-upload">
        <label htmlFor="photo-upload" className="upload-label">
          <FaCamera className="icon" /> Upload Photo
        </label>
        <input
          id="photo-upload"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>
      {photoPreview && (
        <div className="preview">
          <img src={photoPreview} alt="Preview" />
        </div>
      )}
      <button type="submit">
        {tab === 'lost' ? 'Report Lost Pet' : 'Report Found Pet'}
      </button>
    </form>
  );

  // Render the pet cards feed
  const renderFeed = (data, isLost) => {
    if (!data.length) {
      return (
        <p className="empty-state">
          No {isLost ? 'lost' : 'found'} pets reported yet.
        </p>
      );
    }
    return (
      <div className="feed-grid">
        {data.map((item, index) => (
          <div className="pet-card" key={index}>
            {item.photo && <img src={item.photo} alt="Pet" />}
            <h3>{item.name || 'Unnamed'}</h3>
            <p><strong>Location:</strong> {item.location}</p>
            <p><strong>Date:</strong> {item.date}</p>
            <p>{item.description}</p>
            <p><strong>Contact:</strong> {item.contact}</p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="lost-page">
      {/* Sidebar */}
      <div className="sidebar">
        <img src={logo2} alt="The Park Logo" className="sidebar-logo" />
        <h2 className="park-title">The Park</h2>
        <nav className="nav-links">
          <a href="/">Home</a>
          <a href="/profile">Profile</a>
          <a href="/lost" className="active">Lost &amp; Found</a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="lost-main">
        <h1>Lost &amp; Found Pets</h1>
        <div className="tab-buttons">
          <button
            onClick={() => setTab('lost')}
            className={tab === 'lost' ? 'active' : ''}
          >
            Report Lost
          </button>
          <button
            onClick={() => setTab('found')}
            className={tab === 'found' ? 'active' : ''}
          >
            Report Found
          </button>
        </div>

        {renderForm()}

        {tab === 'lost' ? (
          <>
            <h2>Recently Lost Pets</h2>
            {renderFeed(lostPets, true)}
          </>
        ) : (
          <>
            <h2>Recently Found Pets</h2>
            {renderFeed(foundPets, false)}
          </>
        )}
      </div>
    </div>
  );
}

export default LostAndFound;
