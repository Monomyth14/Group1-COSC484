import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './profile.css';
import logo from './logo2.png';

function Profile() {
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
        <div className="profile-header">
          <div className="avatar-placeholder"></div>
          <div className="profile-details">
            <h1>@username</h1>
            <p><strong>Name:</strong> User Name</p>
            <p><strong>Bio:</strong> This is a user bio.</p>

            <div className="stats">
              <div><strong>0</strong><br />followers</div>
              <div><strong>0</strong><br />following</div>
            </div>

            <div className="pet-info">
              <div><strong>Pets:</strong> Pet Name</div>
              <div><strong>About:</strong> Description about the pet.</div>
            </div>
          </div>
        </div>

        <div className="profile-posts">
          <h2>Posts</h2>

          <div className="post">
            <p className="username">@username</p>
            <div className="post-placeholder">Post content goes here</div>
          </div>

          <div className="post">
            <p className="username">@username</p>
            <div className="post-placeholder">Another post content</div>
          </div>

          <div className="post">
            <p className="username">@username</p>
            <div className="post-placeholder">Yet another post</div>
          </div>
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

export default Profile;
