import React from 'react';
import './App.css';
import logo from './logo2.png';

function profile() {
  return (
    <div className="container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo">
          <img src={logo} alt="Profile Logo" />
        </div>
        <h2>My Dashboard</h2>
        <nav>
          <a href="#">Home</a>
          <a href="#">Settings</a>
          <a href="#">Logout</a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="profile-content">
        <header>
          <h1>Welcome Back!</h1>
          <p>Here's what's going on with your profile.</p>
        </header>

        <div className="info">
          <img src="https://via.placeholder.com/80" alt="Avatar" className="avatar" />
          <div>
            <p><strong>Name:</strong> John Doe</p>
            <p><strong>Email:</strong> john@example.com</p>
          </div>
        </div>

        <div className="stats">
          <div>
            <strong>Posts:</strong>
            <p>23</p>
          </div>
          <div>
            <strong>Followers:</strong>
            <p>102</p>
          </div>
          <div>
            <strong>Following:</strong>
            <p>180</p>
          </div>
        </div>

        <div className="pet-info">
          <div>
            <strong>Pet Name:</strong>
            <p>Buddy</p>
          </div>
          <div>
            <strong>Breed:</strong>
            <p>Golden Retriever</p>
          </div>
        </div>

        <div className="posts">
          <h2>Recent Posts</h2>
          <div className="post">
            <p>Had a great walk with Buddy today!</p>
            <img src="https://via.placeholder.com/400x200" alt="Post" />
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="profile-actions">
        <h3>Actions</h3>
        <button>Edit Profile</button>
        <button>Upload Photo</button>
        <button>Logout</button>
      </div>
    </div>
  );
}

export default ProfilePage;
