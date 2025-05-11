import React, { useState } from 'react';
import './Style/CreatePost.css';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import logo from './Images/logo2.png';
import createPostImage from './Images/CreatePostImage.avif';

function CreatePost() {
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);

  const navigate = useNavigate(); 

  const handleCaptionChange = (e) => {
    setCaption(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handlePost = () => {
    console.log('Posting:', { caption, image });
    // Reset form
    setCaption('');
    setImage(null);
  };

  const handleNotNow = () => {
    console.log('User chose not to post right now.');
    navigate('/Main'); 
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

      <div className="create-post-container">
        <h2>Create a Post</h2>
        <textarea
          value={caption}
          onChange={handleCaptionChange}
          placeholder="Write something about your pet..."
          className="input-field"
          rows="4"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="input-field"
        />
        <button className="login-button" onClick={handlePost}>Post</button>
        <button className="forgotpw-button" onClick={handleNotNow}>Not Now</button>

        <img src={createPostImage} alt="Create Post" className="create-post-image" />
      </div>
    </div>
  );
}

export default CreatePost;
