import React, { useState } from 'react';
import './Style/signup.css';
import logo from './Images/logo2.png';
import { useNavigate } from 'react-router-dom';

function ProfileSignup() {
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);

  const [formData, setFormData] = useState({
    username: '',
    profilename: '',
    email: '',
    password: '',
    bio: '',
    profilePic: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'profilePic' && files[0]) {
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
    
    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const response = await fetch('http://localhost:5001/api/user/register', {
        method: 'POST',
        body: formDataToSend,
      });
      const result = await response.json();

      if (response.ok) {
        console.log('Account sign up was successfully:', result);
        alert('Account created successfully! Please log in.');
        navigate('/'); //redirect to login page
      } else {
        alert(result.error || 'Registration failed');
      }
    } catch (error) {
      console.error('Error during sign up:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="page-container1">
      <div className="logo-container">
        <img src={logo} alt="Tree Logo" />
      </div>

      <div className="main">
        <h1>Create an Account</h1>
        <p>Sign up to start sharing pictures today!</p>
        <form onSubmit={handleSubmit} id="profileForm">
          <fieldset>
            <div className='avatarPlaceholder'>
              {imagePreview ? ( <img src={imagePreview} alt= "Profile Preview" className='profileImage'/>) : (<p>Upload Image</p>)}
            </div>
            <div className="file-upload">
              <label htmlFor="profilePic" className="upload-button">Upload Profile Picture</label>
              <input
                type="file"
                id="profilePic"
                name="profilePic"
                accept="image/*"
                onChange={handleChange}
              />
            </div>

            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />

            <label htmlFor="profilename">Profile Name:</label>
            <input
              type="text"
              id="profilename"
              name="profilename"
              value={formData.profilename}
              onChange={handleChange}
              required
            />

            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="name@email.com"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <label htmlFor="bio">Bio:</label>
            <input
              type="text"
              id="bio"
              name="bio"
              placeholder="Introduce yourself or your pet!"
              value={formData.bio}
              onChange={handleChange}
            />

            <div className="buttons">
              <input type="submit" value="Submit"/>
              <button type="button" onClick={() => navigate('/')}>Cancel</button>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
}

export default ProfileSignup;