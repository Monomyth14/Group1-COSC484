import React, { useState, useEffect } from 'react';
import './Style/main.css';
import './Style/LostAndFound.css';
import { useNavigate } from 'react-router-dom';
import logo2 from './Images/logo2.png';
import cuteDog from './Images/cute-dog.jpg';
import { FaCamera, FaMapMarkerAlt, FaTrash } from 'react-icons/fa';

function LostAndFound() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('lost');
  const [lostPets, setLostPets] = useState([]);
  const [foundPets, setFoundPets] = useState([]);
  const [form, setForm] = useState({ name: '', location: '', date: '', description: '', contact: '' });
  const [photoPreview, setPhotoPreview] = useState(null);
  const [fileInput, setFileInput] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await fetch('/api/lostfound');
        const data = await res.json();
        const formatEntry = (entry) => ({
          ...entry,
          photo: entry.imageUrl ? entry.imageUrl : '',
          timestamp: Date.now()
        });
        setLostPets(data.filter(p => p.status === 'lost').map(formatEntry));
        setFoundPets(data.filter(p => p.status === 'found').map(formatEntry));
      } catch (err) {
        console.error('Fetch failed:', err);
      }
    };
    fetchReports();
  }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleFileChange = e => {
    const file = e.target.files[0];
    if (file) {
      setFileInput(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', form.name);
    formData.append('description', form.description);
    formData.append('location', form.location);
    formData.append('contactInfo', form.contact);
    formData.append('dateReported', form.date);
    formData.append('status', tab);
    if (fileInput) formData.append('photo', fileInput);

    try {
      const res = await fetch('/api/lostfound', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Submit failed.');
      const newEntry = {
        ...data,
        photo: data.imageUrl || '',
        timestamp: Date.now()
      };
      tab === 'lost' ? setLostPets([newEntry, ...lostPets]) : setFoundPets([newEntry, ...foundPets]);
      setForm({ name: '', location: '', date: '', description: '', contact: '' });
      setFileInput(null);
      setPhotoPreview(null);
    } catch (err) {
      alert('Submit failed: ' + err.message);
    }
  };

  const handleDelete = async (id, isLost) => {
    try {
      const res = await fetch(`/api/lostfound/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error(await res.text());
      const updated = isLost ? lostPets.filter(p => p._id !== id) : foundPets.filter(p => p._id !== id);
      isLost ? setLostPets(updated) : setFoundPets(updated);
    } catch (err) {
      alert('Delete failed: ' + err.message);
    }
  };

  const formatTimeAgo = ts => {
    const mins = Math.floor((Date.now() - ts) / 60000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return `Posted ${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    return hrs < 24 ? `Posted ${hrs}h ago` : `Posted ${Math.floor(hrs / 24)}d ago`;
  };

  const renderFeed = (data, isLost) => {
    const filtered = data.filter(p =>
      (p.title || '').toLowerCase().includes(searchTerm.toLowerCase())
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
        {filtered.map((item) => (
          <div className="pet-card fade-in" key={item._id}>
            {item.photo && <img className="pet-image" src={item.photo} alt="Pet" />}
            <div className="button-row">
              <button className="delete-btn" onClick={() => handleDelete(item._id, isLost)} title="Delete">
                <FaTrash />
              </button>
            </div>
            <div className="card-content">
              <span className={`tag ${isLost ? 'lost' : 'found'}`}>{isLost ? 'Lost' : 'Found'}</span>
              <h3>{item.title || 'Unnamed Pet'}</h3>
              <p><strong>Location:</strong> {item.location || 'Unknown'}</p>
              <p><strong>Date:</strong> {item.dateReported || 'Unknown'}</p>
              <p className="description">{item.description || 'No description provided.'}</p>
              <p><strong>Contact:</strong> {item.contactInfo || 'No contact given'}</p>
              <p className="posted-time">{formatTimeAgo(item.timestamp)}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderForm = () => {
    const isValid = form.name && form.location && form.date;
    return (
      <form className="form-box" onSubmit={handleSubmit}>
        <input name="name" placeholder="Pet Name *" value={form.name} onChange={handleChange} />
        <div className="input-group">
          <span className="input-icon"><FaMapMarkerAlt /></span>
          <input name="location" placeholder="Location *" value={form.location} onChange={handleChange} />
        </div>
        <input name="date" type="date" value={form.date} onChange={handleChange} />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} />
        <input name="contact" placeholder="Contact Info" value={form.contact} onChange={handleChange} />
        <div className="file-upload">
          <label htmlFor="photo-upload" className="upload-label">
            <FaCamera className="icon" /> Upload Photo
          </label>
          <input id="photo-upload" type="file" accept="image/*" onChange={handleFileChange} />
        </div>
        {photoPreview && <div className="preview"><img src={photoPreview} alt="Preview" /></div>}
        <button type="submit" disabled={!isValid}>
          {tab === 'lost' ? 'Report Lost Pet' : 'Report Found Pet'}
        </button>
      </form>
    );
  };

  return (
    <div className="page-container">

      {/* Left Sidebar */}
      <div className="sidebar">
        <img src={logo2} alt="Logo" />
        <div className="nav">
          <div onClick={() => navigate('/Main')}>🏠 Home</div>
          <div onClick={() => navigate('/About')}>ℹ️ About Us</div>
          <div onClick={() => navigate('/profile')}>👤 My Profile</div>
          <div onClick={() => navigate('/CreatePost')}>📜 Create Post</div>
          <div onClick={() => navigate('/GroupSignup')}>👥 Create Group</div>
          <div onClick={() => navigate('/LostAndFound')}>🔍 Lost and Found</div>
          <div onClick={() => navigate('/PetEvents')}>🎉 Pet Events</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <h1 className="profile-title">Lost &amp; Found Pets</h1>
        <div className="tab-buttons">
          <button onClick={() => setTab('lost')} className={tab === 'lost' ? 'active' : ''}>Report Lost</button>
          <button onClick={() => setTab('found')} className={tab === 'found' ? 'active' : ''}>Report Found</button>
        </div>
        {renderForm()}
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

      {/* Right Sidebar (Profile Actions) */}
      <div className="profile-actions">
        <h3>Profile Actions</h3>
        <button onClick={() => navigate('/')}>Log Out</button>
      </div>
    </div>
  );
}

export default LostAndFound;
