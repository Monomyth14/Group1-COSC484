import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Style/profile.css';
import logo from './Images/logo2.png';

function Profile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userId = localStorage.getItem('userId');
      if (!userId) return;

      try {
        const response = await fetch(`http://localhost:5001/api/user/profile/${userId}`);
        const data = await response.json();
        setUserData(data);
      } catch (err) {
        console.error('Failed to fetch user data', err);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userId');
    navigate('/');
  };

  if (!userData) return <div>Loading...</div>;

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
            <h1>@{userData.username}</h1>
            <p><strong>Name:</strong> {userData.profilename}</p>
            <p><strong>Bio:</strong> {userData.bio}</p>

            <div className="stats">
              <div><strong>0</strong><br />followers</div>
              <div><strong>0</strong><br />following</div>
            </div>

            <div className="groups-info">
              <strong>Groups Owned:</strong>
              <ul>
                {userData.groupsOwned.map(group => (
                  <li key={group._id}>{group.groupName}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="profile-posts">
          <h2>Posts</h2>
          <div className="post-placeholder">No posts yet.</div>
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