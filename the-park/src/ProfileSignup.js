import React, { useState } from 'react';
import './signup.css';
import logo from './logo2.png';
import { Link, useNavigate } from 'react-router-dom';

function ProfileSignup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    profileName: '',
    password: '',
    bio: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/profilePage', { state: formData });
  };

  return (
    <div className="page-container">
      <div className="sidebar">
        <img src={logo} alt="Tree Logo" />
        <h1>The Park</h1>
        <div className="nav">
          <div>ℹ️ <Link to="/about">About Us</Link></div>
          <div>🔔 Notifications</div>
          <Link to="/profile">👤 Account</Link>
        </div>
      </div>

      <div className="main">
        <h1>Profile Signup Page</h1>
        <form onSubmit={handleSubmit} id="profileForm">
          <fieldset>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />

            <label htmlFor="profileName">Profile Name:</label>
            <input
              type="text"
              id="profileName"
              name="profileName"
              value={formData.profileName}
              onChange={handleChange}
            />

            <label htmlFor="password">Password:</label>
            <input
              type="text"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />

            <label htmlFor="bio">Bio:</label>
            <input
              type="text"
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
            />

            <div className="buttons">
              <input type="submit" value="Submit" />
              <button type="button" onClick={() => navigate('/')}>Cancel</button>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
}

export default ProfileSignup;