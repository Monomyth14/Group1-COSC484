// GroupSignup.js
import React, { useState } from 'react';
import {Link, useNavigate } from 'react-router-dom';
import logo from './Images/logo2.png';
import './Style/groupSignup.css';

const GroupSignup = () => {
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);

  const [formData, setFormData] = useState({
    groupName: '',
    description: '',
    groupProfilePic: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'groupProfilePic' && files[0]) {
      const file = files [0];
      setFormData((prevData) => ({
        ...prevData,
        profilePic: files[0],
      }));
      setImagePreview(URL.createObjectURL(file));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const response = await fetch('http://localhost:5001/api/groups/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        console.log('Group created:', result);
        navigate(`/groupPage/${result.group._id}`);      
      } else {
        alert(result.error || 'Group creation failed.');
      }
    } catch (err) {
      console.error('Group creation error:', err);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="container">
      <div className="sidebar">
        <img src={logo} alt="Logo" />
        <div className="nav">
          <div onClick={() => navigate('/Main')}>🏠 Home</div>
            <div onClick={() => navigate('/About')}>ℹ️ About Us</div>
            <div onClick={() => navigate('/profile')}>👤 My Profile</div>
            <div onClick={() => navigate('/CreatePost')}>📜 Create Post</div>
            <div onClick={() => navigate('/groupPage')}>👥 Group Page</div>
            <div onClick={() => navigate('/LostAndFound')}>🔍 Lost and Found</div>
            <div onClick={() => navigate('/PetEvents')}>🎉 Pet Events</div>
        </div>
      </div>

      <div className="mainSignup">
        <h1>Group Sign Up</h1>
        <p>Share your love for pets with others in your area.</p>
        <p>Fill out the form below to create a new group.</p>
        <form onSubmit={handleSubmit} id="groupForm">
          <fieldset>
            <div className='avatarPlaceholder'>
              {imagePreview ? ( <img src={imagePreview} alt= "Profile Preview" className='profileImage'/>) : (<p>Upload Image</p>)}
            </div>
            <div className="file-upload">
              <label htmlFor="groupProfilePic" className="upload-button">Upload Profile Picture</label>
              <input
                type="file"
                id="profilePic"
                name="profilePic"
                accept="image/*"
                onChange={handleChange}
              />
            </div>

            <label htmlFor="groupName">Group Name:</label>
            <input
              type="text"
              id="groupName"
              name="groupName"
              value={formData.groupName}
              onChange={handleChange}
              required
            />

            <label htmlFor="description">Description:</label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />

            <div className="buttons">
              <input type="submit" value="Submit" />
              <button type="button" onClick={() => navigate('/Main')}>
                Cancel
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default GroupSignup;