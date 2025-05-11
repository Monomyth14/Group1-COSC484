import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Style/profile.css';
import logo from './Images/logo2.png';
import pawPlaceholder from './Images/pawPlaceholder.png';
import API_BASE_URL from './confi';

function Profile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        alert("User not logged in. Redirecting to home page.");
        navigate('/');
        return;
      } try {
        const response = await fetch(`${API_BASE_URL}/api/user/profile/${userId}`);
        if (!response.ok) {
          throw new Error('User data not found');
        }
        const data = await response.json();
        setUserData(data);
      } catch (err) {
        console.error('Failed to fetch user data', err);
        alert("Failed to load profile. Please try again later.");
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userId');
    navigate('/');
  };

  if (!userData) return <div>Loading...</div>;

  return (
    <div className="page-container">
      <div className="sidebar">
        <img src={logo} alt="Logo" />
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

      <div className="main-content">
        <div className="profile-header">
          <div className="avatar">
            <img src={userData.profilePic ? `${API_BASE_URL}/${userData.profilePic}` : pawPlaceholder} alt="User Avatar" className="profileAvatar" />

          </div>
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
                {userData.groupsOwned && userData.groupsOwned.length > 0 ? (
                  userData.groupsOwned.map(group => (
                    <li key={group._id}>{group.groupName}</li>
                  ))
                ) : (
                  <li><br></br>No groups owned. <br></br>
                    Start a group today!</li>
                )}
              </ul>
            </div>
          </div>
        </div>

        <div className="profile-posts">
          <h2>Posts</h2>
          {userData.posts && userData.posts.length > 0 ? (
            userData.posts.map((post, index) => (
              <div key={index} className="post">
                <p>{post.content}</p>
              </div>
            ))
          ) : (
            <div className="post-placeholder">Share your first post today!</div>
          )}
        </div>
      </div>

      <div className="profile-actions">
        <h3>Profile Actions</h3>
        <button onClick={() => navigate('/EditProfilePage')}>Edit Profile</button>
        <button onClick={handleLogout}>Log Out</button>
      </div>
    </div>
  );
}

export default Profile;