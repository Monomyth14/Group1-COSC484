import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './profile.css';
import './main.css';
import logo from './logo2.png';

function Main() {
  const posts = ["", "", "", "", ""];
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="page-container">
      <div className="sidebar">
        <img src={logo} alt="Logo" />
        <h1>The Park</h1>
        <div className="nav">
          <div>ℹ️ <Link to="/about">About Us</Link></div>
          <div>👤 <Link to="/profile">My Profile</Link></div>
          <div>👥 <Link to="/group_profile">Group Profile</Link></div>
          <div>🔍 <Link to="/lost">Lost and Found</Link></div>
          <div>🎉 <Link to="/petevents">Pet Events</Link></div>
        </div>
      </div>

      <div className="main-content">
        <h1 className="profile-title">Welcome to The Park!</h1>
        <div className="main-links">
          <Link to="/profile" className="main-button">My Profile</Link>
          <Link to="/group_profile" className="main-button">Group Profile</Link>
          <Link to="/lost" className="main-button">Lost and Found</Link>
          <Link to="/post" className="main-button">Create Post</Link>
        </div>
        <div className="posts">
          {posts.map((_, index) => (
            <div key={index} className="post">
              <p className="username">@username</p>
              <div className="post-placeholder">Post content goes here</div>
            </div>
          ))}
        </div>
      </div>

      <div className="profile-actions">
        <h3>Profile Actions</h3>
        <button>Edit Profile</button>
        <button onClick={handleLogout}>Log Out</button>
        <button onClick={() => navigate('/signup')}>Sign Up</button>
      </div>
    </div>
  );
}

export default Main;