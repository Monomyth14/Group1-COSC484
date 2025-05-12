import React, { useState } from 'react';
import './Style/CreatePost.css';
import { useNavigate } from 'react-router-dom';
import logo from './Images/logo2.png';
import createPostImage from './Images/CreatePostImage.avif';

function CreatePost() {
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  const handleCaptionChange = (e) => {
    setCaption(e.target.value);
  };

  const handleLogout = () => {
    navigate('/');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handlePost = async () => {
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('caption', caption);
    if (image) formData.append('image', image);

    try {
      const response = await fetch('http://localhost:5001/api/post/create', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });

      if (response.ok) {
        setCaption('');
        setImage(null);
        setPreview(null);
        navigate('/Main');
      } else {
        const data = await response.json();
        alert(`Error: ${data.error}`);
      }
    } catch (err) {
      alert('Failed to create post.');
      console.error(err);
    }
  };

  const handleNotNow = () => {
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
        <div onClick={() => navigate('/EditProfilePage')}>✏️ Edit Profile</div>
        <div onClick={() => navigate('/CreatePost')}>📜 Create Post</div>
        <div onClick={() => navigate('/GroupSignup')}>👥 Create Group</div>
        <div onClick={() => navigate('/LostAndFound')}>🔍 Lost and Found</div>
        <div onClick={() => navigate('/PetEvents')}>🎉 Pet Events</div>
        </div>
      </div>

      <div className="create-post-container">
        <h2>Create a Post</h2>

        <div className="image-upload-box">
          <label htmlFor="postImage" className="upload-label">
            📷 Upload Image
          </label>
          <input
            id="postImage"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden-file-input"
          />
          {preview && (
            <img src={preview} alt="Preview" className="create-post-image" />
          )}
        </div>

        <textarea
          value={caption}
          onChange={handleCaptionChange}
          placeholder="Write something about your pet..."
          className="input-field"
          rows="4"
        />

        <button className="login-button" onClick={handlePost}>Post</button>
        <button className="forgotpw-button" onClick={handleNotNow}>Not Now</button>

        <img src={createPostImage} alt="Create Post" className="create-post-image" />
      </div>
      <div className="profile-actions">
        <h3>Profile Actions</h3>
        <button onClick={handleLogout}>Log Out</button>
      </div>
    </div>
  );
}

export default CreatePost;
