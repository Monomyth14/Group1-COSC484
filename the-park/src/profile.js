import React from 'react'; 
import { Link, useNavigate } from 'react-router-dom';
import './profile.css';
import logo from './logo2.png';
import chickenImage from './chicken.jpg';

function Profile() {
  const navigate = useNavigate(); 

  const handleLogout = () => {

    navigate('/'); 
  };

  return (
    <div className="page-container"> 
      {/* Sidebar */}
      <div className="sidebar">
        <img src={logo} alt="Logo" />
        <h1>The Park</h1> 
        <div className="nav">
          <div>ℹ️ <Link to="/about">About Us</Link></div>
          <div>🔔 Notifications</div>
          <Link to="/profile">👤 Account</Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="main">
        <header>
          <h1>@chickenguy12</h1>
          <div className="info">
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
          <h2>Posts</h2>
          <div className="post">
            <p className="username">chickenguy12</p>
            <img src={chickenImage} alt="Chicken" />
            <p><strong>Caption:</strong> My chicken is having a good day!</p>
          </div>
        </section>
      </div>

      {/* Right Panel */}
      <div className="profile-actions">
        <h3>Profile Actions</h3>
        <button>Edit Profile</button>
        <button onClick={handleLogout}>Log Out</button>
      </div>
    </div>
  );
}

export default Profile;
