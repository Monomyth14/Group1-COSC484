import React, { useState } from 'react';
import './Style/LostAndFound.css';
import logo2 from './Images/logo2.png';
import cuteDog from './Images/cute-dog.jpg';
import {
  FaCamera,
  FaMapMarkerAlt,
  FaTrash,
  FaRegHeart,
  FaHeart,
} from 'react-icons/fa';

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
  const [searchTerm, setSearchTerm] = useState('');

  
  const formatTimeAgo = (ts) => {
    const diff = Date.now() - ts;
    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `Posted ${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `Posted ${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `Posted ${days}d ago`;
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPhotoPreview(file ? URL.createObjectURL(file) : null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const entry = { ...form, photo: photoPreview, timestamp: Date.now(), favorite: false };
    if (tab === 'lost') setLostPets([entry, ...lostPets]);
    else setFoundPets([entry, ...foundPets]);
    setForm({ name: '', location: '', date: '', description: '', contact: '' });
    setPhotoPreview(null);
  };

  const handleDelete = (i, isLost) => {
    const arr = isLost ? [...lostPets] : [...foundPets];
    arr.splice(i, 1);
    isLost ? setLostPets(arr) : setFoundPets(arr);
  };

  const handleToggleFav = (i, isLost) => {
    const arr = isLost ? [...lostPets] : [...foundPets];
    arr[i].favorite = !arr[i].favorite;
    isLost ? setLostPets(arr) : setFoundPets(arr);
  };

  const renderFeed = (data, isLost) => {
    const filtered = data.filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (!filtered.length) {
      return (
        <div className="empty-state">
          <img src={cuteDog} alt="No pets" className="empty-img" />
          <p>No {isLost ? 'lost' : 'found'} pets found.</p>
        </div>
      );
    }

    return (
      <div className="feed-grid">
        {filtered.map((item, idx) => (
          <div className="pet-card fade-in" key={idx}>
            {item.photo && <img src={item.photo} alt="Pet" />}
            <button
              className="fav-btn"
              onClick={() => handleToggleFav(idx, isLost)}
            >
              {item.favorite ? <FaHeart /> : <FaRegHeart />}
            </button>
            <div className="card-content">
              <span className={`tag ${isLost ? 'lost' : 'found'}`}>
                {isLost ? 'Lost' : 'Found'}
              </span>
              <h3>{item.name || 'Unnamed Pet'}</h3>
              <p>
                <strong>Location:</strong> {item.location || 'Unknown'}
              </p>
              <p>
                <strong>Date:</strong> {item.date || 'Unknown'}
              </p>
              <p className="description">
                {item.description || 'No description provided.'}
              </p>
              <p>
                <strong>Contact:</strong> {item.contact || 'No contact given'}
              </p>
              <p className="posted-time">{formatTimeAgo(item.timestamp)}</p>
            </div>
            <button
              className="delete-btn"
              onClick={() => handleDelete(idx, isLost)}
              title="Delete Post"
            >
              <FaTrash />
            </button>
          </div>
        ))}
      </div>
    );
  };

  const renderForm = () => {
    // require name, location & date
    const isValid = form.name && form.location && form.date;
    return (
      <form className="form-box" onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Pet Name *"
          value={form.name}
          onChange={handleChange}
        />
        <div className="input-group">
          <span className="input-icon">
            <FaMapMarkerAlt />
          </span>
          <input
            name="location"
            placeholder="Location (Last Seen / Found) *"
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
        <button type="submit" disabled={!isValid}>
          {tab === 'lost' ? 'Report Lost Pet' : 'Report Found Pet'}
        </button>
      </form>
    );
  };

  return (
    <div className="lost-page">
      <div className="sidebar">
        <img src={logo2} alt="Logo" className="sidebar-logo" />
        <h2 className="park-title">The Park</h2>
        <nav className="nav-links">
          <a href="/">Home</a>
          <a href="/about">About Us</a>
          <a href="/profile">My Profile</a>
          <a href="/group">Group Profile</a>
          <a href="/lost" className="active">
            Lost &amp; Found
          </a>
          <a href="/events">Pet Events</a>
          <a href="/notifications">Notifications</a>
          <a href="/account">Account</a>
        </nav>
      </div>

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

        {/* Search bar */}
        <input
          className="search-box"
          placeholder="🔍 Search by pet name…"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

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
