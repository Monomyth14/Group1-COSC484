import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import './Style/EditProfilePage.css';
import logo from './Images/logo2.png';
import pawPlaceholder from './Images/pawPlaceholder.png';

const TAG_SUGGESTIONS = [
  // Playful/Energetic
  'Playful', 'Energetic', 'Zippy', 'Bouncy', 'Frisky', 'Spunky',
  
  // Calm/Relaxed
  'Chill', 'Mellow', 'Laidback', 'Relaxed', 'Easygoing', 'Zen',
  
  // Friendly/Social
  'Friendly', 'Sociable', 'Outgoing', 'Affectionate', 'Loving', 'Cuddly',
  
  // Shy/Nervous
  'Shy', 'Timid', 'Reserved', 'Anxious', 'Nervous', 'Cautious',
  
  // Intelligent
  'Smart', 'Clever', 'Bright', 'Quick', 'Inquisitive', 'Curious',
  
  // Loyal/Protective
  'Loyal', 'Protective', 'Devoted', 'Faithful', 'Guardian', 'Watchful',
  
  // Funny/Quirky
  'Silly', 'Goofy', 'Wacky', 'Quirky', 'Entertaining', 'Clumsy',
  
  // Physical Traits
  'Fluffy', 'Fuzzy', 'Soft', 'Sleek', 'Shiny', 'Spotty', 'Striped',
  
  // Habits
  'Vocal', 'Chatty', 'Talkative', 'Quiet', 'Snorer', 'Foodie',
  
  // Training
  'Trained', 'Obedient', 'Mannerly', 'Polite', 'Wild', 'Mischievous'
];
function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-card">
        <img src={logo} alt="The Park Logo" className="logo-img" />
        <h2 className="logo-text">The Park</h2>
        <nav className="menu">
          <div>ℹ️ <Link to="/about">About Page</Link></div>
          <div>👤 <Link to="/profile">Profile Page</Link></div>
          <div>✏️ <Link to="/edit-profile">Edit Profile</Link></div>
          <div>📝 <Link to="/post">Create Post</Link></div>
          <div>👥 <Link to="/signup">Group Sign Up</Link></div>
          <div>🐾 <Link to="/pet-events">Pet Events</Link></div>
          <div>🏠 <Link to="/main">Main</Link></div>
        </nav>
      </div>
    </aside>
  );
}

function ConfirmationModal({ message, onConfirm, onCancel }) {
  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <p>{message}</p>
        <div className="modal-actions">
          <button className="cancel" onClick={onCancel}>Cancel</button>
          <button className="confirm" onClick={onConfirm}>Yes, Deactivate</button>
        </div>
      </div>
    </div>
  );
}

export default function EditProfilePage() {
  // Pet profiles state
  const [pets, setPets] = useState([
    {
      id: 1,
      name: '',
      username: '',
      bio: '',
      imgUrl: pawPlaceholder,
      tags: [],
      followers: 0,
      following: 0
    }
  ]);
  const [selectedId, setSelectedId] = useState(1);

  // Toggles for notifications
  const [newFollowersToggle, setNewFollowersToggle] = useState(true);
  const [postLikesToggle, setPostLikesToggle] = useState(true);

  // Toast state
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const toastRef = useRef(null);

  // Confirmation modal
  const [showModal, setShowModal] = useState(false);

  const currentPet = pets.find(p => p.id === selectedId);

  // Trigger toast notifications
  const triggerToast = (msg) => {
    setToastMsg(msg);
    setShowToast(true);
    clearTimeout(toastRef.current);
    toastRef.current = setTimeout(() => setShowToast(false), 3000);
  };

  // Update a field on the current pet
  const updateField = (field, value) => {
    setPets(pets.map(p =>
      p.id === selectedId ? { ...p, [field]: value } : p
    ));
    triggerToast('Profile updated');
  };

  // Handle file upload or drag-and-drop
  const handleFile = (file) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    updateField('imgUrl', url);
  };
  const onDrop = (e) => {
    e.preventDefault();
    handleFile(e.dataTransfer.files[0]);
  };

  // Username availability mock check
  const [usernameOK, setUsernameOK] = useState(true);
  useEffect(() => {
    if (!currentPet.username) return;
    const t = setTimeout(() => {
      setUsernameOK(Math.random() > 0.3);
    }, 500);
    return () => clearTimeout(t);
  }, [currentPet.username]);

  // Tag input
  const [tagInput, setTagInput] = useState('');
  const addTag = () => {
    if (tagInput && !currentPet.tags.includes(tagInput)) {
      updateField('tags', [...currentPet.tags, tagInput]);
    }
    setTagInput('');
  };
  const removeTag = (tag) => {
    updateField('tags', currentPet.tags.filter(t => t !== tag));
  };

  // Add new pet profile
  const addPet = () => {
    const newId = pets.length + 1;
    setPets([...pets, {
      id: newId,
      name: '',
      username: '',
      bio: '',
      imgUrl: pawPlaceholder,
      tags: [],
      joined: new Date(),
      followers: 0,
      following: 0
    }]);
    setSelectedId(newId);
  };

  // Deactivate account
  const confirmDeactivate = () => {
    setShowModal(false);
    triggerToast('Your account has been deactivated. You’ve been logged out.');
    setTimeout(() => window.location.href = '/', 1500);
  };

  // AI-style bio generation placeholder
  const generateBio = () => {
    const sample = 'A friendly and energetic pet who loves playtime and cuddles.';
    updateField('bio', sample);
  };

  return (
    <div className="edit-profile-page" onDragOver={e => e.preventDefault()} onDrop={onDrop}>
      <Sidebar />

      <main className="main-form">
        <h2>Edit Profile </h2>

        <label className="floating">
          <input
            type="text"
            placeholder=" "
            value={currentPet.name}
            onChange={e => updateField('name', e.target.value)}
          />
          <span>Name</span>
          {currentPet.name ? <em className="check">✔</em> : <em className="error">✖</em>}
        </label>

        <label className="floating">
          <input
            type="text"
            placeholder=" "
            value={currentPet.username}
            onChange={e => updateField('username', e.target.value)}
          />
          <span>Username</span>
          {currentPet.username && (
            <em className={`check ${usernameOK ? 'ok' : 'err'}`}>
              {usernameOK ? '✔' : '✖'}
            </em>
          )}
        </label>

        <label className="floating textarea">
            <textarea
              placeholder=" "
              rows="3"
              value={currentPet.bio}
              onChange={(e) => updateField('bio', e.target.value)}
            />
            <span>Bio</span>
            {currentPet.bio && <em className="check">✔</em>}
          </label>
          
          <button 
            className="gen-bio" 
            onClick={(e) => {
              e.preventDefault();
              generateBio();
            }}
          >
            🔄 Generate Bio
          </button>

        <div className="upload-zone">
          <div className="upload-inner">
            <div>Drag & Drop or <label htmlFor="file-upload" className="browse">Browse</label></div>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={e => handleFile(e.target.files[0])}
            />
          </div>
        </div>

        <div className="tags-input">
          <input
            list="tag-suggestions"
            placeholder="Choose a tag or type"
            value={tagInput}
            onChange={e => setTagInput(e.target.value)}
          />
          <datalist id="tag-suggestions">
            {TAG_SUGGESTIONS.map(t => <option key={t} value={t} />)}
          </datalist>
          <button onClick={addTag}>➕ Add Tag</button>
        </div>
        <div className="tags-list">
          {currentPet.tags.map(t => (
            <span key={t} className="tag-chip">{t} <em onClick={() => removeTag(t)}>×</em></span>
          ))}
        </div>

        <div className="pet-switcher">
          <select value={selectedId} onChange={e => setSelectedId(+e.target.value)}>
            {pets.map(p => (
              <option key={p.id} value={p.id}>{p.name || `Pet ${p.id}`}</option>
            ))}
          </select>
          <button onClick={addPet}>+ Add Pet</button>
        </div>

        <button className="deactivate-btn" onClick={() => setShowModal(true)}>
          Deactivate Account
        </button>
      </main>

      <aside className="preview-panel">
        <h2>Pet Profile Preview</h2>
        <div className="avatar">
          <img src={currentPet.imgUrl} alt="avatar" />
        </div>
        <h3>{currentPet.name || 'Name'}</h3>
        <div className="username">
          {currentPet.username && <><em className="check">✔</em> @{currentPet.username}</>}
        </div>
        <div className="stats">
          <span>{currentPet.followers} Followers</span>
          <span>:</span>
          <span>{currentPet.following} Following</span>
        </div>
        <p className="bio">{currentPet.bio || 'Bio'}</p>

        <div className="tags-preview">
    {currentPet.tags.map(tag => (
      <span key={tag} className="tag-preview">{tag}</span>
    ))}
  </div>
  
        <div className="toggles">
          <label>
            New Followers
            <input
              type="checkbox"
              checked={newFollowersToggle}
              onChange={() => setNewFollowersToggle(!newFollowersToggle)}
            />
          </label>
          <label>
            Post Likes
            <input
              type="checkbox"
              checked={postLikesToggle}
              onChange={() => setPostLikesToggle(!postLikesToggle)}
            />
          </label>
        </div>

      </aside>

      {showToast && (
        <div className="toast">
          {toastMsg} <em className="undo">Undo</em>
        </div>
      )}
      {showModal && (
        <ConfirmationModal
          message="Are you sure you want to Deactivate your account?. If you click yes and continue, You will be logged out and sent back to the Home page."
          onConfirm={confirmDeactivate}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
); }
