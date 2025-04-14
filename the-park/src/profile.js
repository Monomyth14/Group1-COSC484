import React from 'react';
import './App.css';
import logo from './logo2.png';
import chickenImage from './chicken.jpg'; 

function Profile() {
  return (
    <div className="container">
      {/* Sidebar */}
      <aside className="sidebar" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        {/* Top part */}
        <div>
          <div className="logo">
            <img src={logo} alt="Logo" />
            <h2>The Park</h2>
          </div>
        </div>

        {/* Bottom nav */}
        <nav style={{ marginTop: 'auto' }}>
          <a href="#">Notifications</a>
          <a href="#">Account</a>
        </nav>
      </aside>

      {/* Main content */}
      <main className="profile-content">
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
      </main>

      {/* Right panel */}
      <aside className="profile-actions">
        <h3>Profile</h3>
        <button>Pet Name</button>
        <button>Pet Name</button>
        <button>Add Post</button>
        <button>Create Group</button>
      </aside>
    </div>
  );
}

export default Profile;
