import React from 'react';
import { Link } from 'react-router-dom';
import './profile.css';
import logo from './logo2.png';
import chickenImage from './chicken.jpg';

function Profile() {
  return (
    <div className="page-container">
      {/* Sidebar */}
      <div className="sidebar">
        <img src={logo} alt="Logo" />
        <h2>The Park</h2>
        <div className="nav">
          <div>ℹ️ <Link to="/about">About Us</Link></div> {/* Added the About Us link */}
          <div>🔔 Notifications</div>
          <Link to="/profile">👤 Account</Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="main">
        <header>
          {/* Username */}
          <h1 style={{ textAlign: 'center' }}>@chickenguy12</h1>
          <div className="info">
            {/* Profile photo */}
            <img src={chickenImage} alt="Chicken Photo" className="avatar" />
            <p>
              <strong>Name:</strong> Roquan Hernandez<br />
              <strong>Bio:</strong> I like chickens! Add me<br />
            </p>
          </div>

          <div className="stats">
            <div><strong>13</strong><br />followers</div>
            <div><strong>68</strong><br />following</div>
          </div>

          <div className="pet-info">
            <div>
              <p><strong> Pets: </strong> Clucky </p>
              <p><strong> About: </strong> He is a 10-year-old chicken. </p>
            </div>
          </div>
        </header>

        {/* Post Section */}
        <section className="posts">
          <h3>Posts</h3>
          <div className="post">
            <p className="username">chickenguy12</p>
            <img src={chickenImage} alt="Chicken" />
            <p><strong>Caption:</strong> My chicken is having a good day!</p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Profile;
