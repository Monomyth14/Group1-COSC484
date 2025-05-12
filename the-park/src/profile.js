
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Style/profile.css';
import logo from './Images/logo2.png';
import pawPlaceholder from './Images/pawPlaceholder.png';
import config from './confi.js';

function Profile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [commentInput, setCommentInput] = useState({});
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (!token || !userId) {
      navigate('/');
      return;
    }

    fetch(`${config.API_URL}/api/user/profile/${userId}`)
      .then(res => res.json())
      .then(setUserData)
      .catch(err => console.error('Error fetching user data:', err));

    fetch(`${config.API_URL}/api/post/mine`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(setUserPosts)
      .catch(err => console.error('Error fetching posts:', err));
  }, [navigate, token, userId]);

  const handleLike = async (postId) => {
    await fetch(`${config.API_URL}/api/post/like/${postId}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` }
    });

    const res = await fetch(`${config.API_URL}/api/post/mine`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setUserPosts(await res.json());
  };

  const handleComment = async (postId) => {
    const text = commentInput[postId];
    await fetch(`${config.API_URL}/api/post/comment/${postId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ text })
    });

    setCommentInput(prev => ({ ...prev, [postId]: '' }));

    const res = await fetch(`${config.API_URL}/api/post/mine`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setUserPosts(await res.json());
  };

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
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
            <img
              src={userData.profilePic ? `${config.API_URL}/${userData.profilePic}` : pawPlaceholder}
              alt="User Avatar"
              className="profileAvatar"
            />
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
                  <li>No groups owned. <br /><a href="/GroupSignup" style={{ color: "#7EAD83", textDecoration: "underline" }}>Start a group today!</a></li>
                )}
              </ul>
            </div>
          </div>
        </div>

        <div className="profile-posts">
          <h2>My Posts</h2>
          {userPosts.length === 0 ? (
            <div className="post-placeholder">Share your first post today!</div>
          ) : (
            userPosts.map(post => (
              <div key={post._id} className="post">
                <p><strong>@{userData.username}</strong>: {post.caption}</p>
                {post.image && (
                  <img
                    src={`${config.API_URL}/uploads/${post.image}`}
                    alt="Post"
                    className="post-image"
                    style={{ width: '100%', marginTop: '10px', borderRadius: '6px' }}
                  />
                )}
                <button onClick={() => handleLike(post._id)}>❤️ {post.likes?.length || 0}</button>
                <div style={{ marginTop: '10px' }}>
                  {post.comments.map((c, idx) => (
                    <div key={idx} style={{ fontSize: '0.9em', padding: '2px 0' }}>
                      <strong>@{c.userId?.username || 'anon'}</strong>: {c.text}
                    </div>
                  ))}
                  <input
                    type="text"
                    value={commentInput[post._id] || ''}
                    onChange={e => setCommentInput({ ...commentInput, [post._id]: e.target.value })}
                    placeholder="Add a comment..."
                    style={{ width: '100%', marginTop: '5px' }}
                  />
                  <button onClick={() => handleComment(post._id)} style={{ marginTop: '5px' }}>
                    Comment
                  </button>
                </div>
              </div>
            ))
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
