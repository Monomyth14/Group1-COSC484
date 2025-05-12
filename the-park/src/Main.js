import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Style/profile.css';
import './Style/main.css';
import logo from './Images/logo2.png';

function Main() {
  const [posts, setPosts] = useState([]);
  const [commentInput, setCommentInput] = useState({});
  const navigate = useNavigate();

  const fetchPosts = () => {
    fetch('http://localhost:5001/api/post/all')
      .then(res => res.json())
      .then(setPosts)
      .catch(err => console.error('Error fetching posts:', err));
  };

  useEffect(fetchPosts, []);

  const handleLike = async (postId) => {
    const token = localStorage.getItem('token');
    await fetch(`http://localhost:5001/api/post/like/${postId}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchPosts();
  };

  const handleComment = async (postId) => {
    const token = localStorage.getItem('token');
    const text = commentInput[postId];
    await fetch(`http://localhost:5001/api/post/comment/${postId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ text })
    });
    setCommentInput(prev => ({ ...prev, [postId]: '' }));
    fetchPosts();
  };

  const handleLogout = () => {
    navigate('/');
  };

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
        <h1 className="profile-title">Welcome to The Park</h1>
        <div className="main-links">
          <Link to="/profile" className="main-button">My Profile</Link>
          <Link to="/GroupSignup" className="main-button">Create Group</Link>
          <Link to="/LostAndFound" className="main-button">Lost and Found</Link>
          <Link to="/CreatePost" className="main-button">Create Post</Link>
        </div>

        <div className="posts">
          {posts.map(post => (
            <div key={post._id} className="post">
              <p><strong>@{post.ownerId?.username || 'user'}</strong>: {post.caption}</p>
              {post.image && (
                <img
                  src={`http://localhost:5001/uploads/${post.image}`}
                  alt="Post"
                  className="post-image"
                />
              )}

              <button onClick={() => handleLike(post._id)} className="post-button">
                ❤️ {post.likes?.length || 0}
              </button>

              <div className="comment-section">
                {post.comments.map((c, idx) => (
                  <div key={idx} className="comment">
                    <strong>@{c.userId?.username || 'anon'}</strong>: {c.text}
                  </div>
                ))}

                <input
                  type="text"
                  value={commentInput[post._id] || ''}
                  onChange={e => setCommentInput({ ...commentInput, [post._id]: e.target.value })}
                  placeholder="Add a comment..."
                  className="comment-input"
                />
                <button onClick={() => handleComment(post._id)} className="post-button">
                  Comment
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="profile-actions">
        <h3>Profile Actions</h3>
        <button onClick={handleLogout}>Log Out</button>
      </div>
    </div>
  );
}

export default Main;
