import React, { useState } from 'react';
import './Style/signup.css';
import logo from './Images/logo2.png';
import { useNavigate } from 'react-router-dom';

function ProfileSignup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    profilename: '',
    email: '',
    password: '',
    bio: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:5001/api/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();

      if (response.ok) {
        console.log('Account sign up was successfully:', result);
        navigate('/profile', {state: formData}); // Redirects to the home page after successful signup
      } else {
        alert(result.error || 'Registration failed');
      }
    } catch (error) {
      console.error('Error during sign up:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="page-container">
      <div className="sidebar">
        <img src={logo} alt="Tree Logo" />
      </div>

      <div className="main">
        <h1>Profile Signup Page</h1>
        <form onSubmit={handleSubmit} id="profileForm">
          <fieldset>
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
              value={formData.bio}
              onChange={handleChange}
            />

            <div className="buttons">
              <input type="submit" value="Submit" />
              <button type="button" onClick={() => navigate('/')}>Cancel</button>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
}

export default ProfileSignup;