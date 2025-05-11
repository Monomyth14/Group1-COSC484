import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Style/About.css';
import logo from './Images/logo2.png';


function About() {
    const navigate = useNavigate();
    
  return (
    <div className="aboutPage-container">
      <div className="sidebar">
        <img src={logo} alt="Tree Logo" />
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

      <div className="main-about">
        <h1>About The Park!</h1>
        <p>
          The Park is a pet-focused social media platform where users can share pictures, stories, and information about their pets.
          Users can follow a variety of groups: some centered around fun and entertainment, others focused on education and advice.
          If you don't find a group that fits your needs, you're welcome to create your own and bring pet lovers together!
        </p>
        <br /> <br />
        <h2>Restrictions</h2>
        <p>
          Please keep The Park a friendly and respectful space. All content must follow community guidelines: no hate speech, spam,
          or explicit material is allowed. Groups should have clear, pet-related purposes, and any reported misuse may result in removal.
          Additionally, The Park is not a platform for unethical breeders or those looking to profit off irresponsible breeding practices.
          Let's work together to keep The Park safe, supportive, and enjoyable for all pet lovers.
        </p>
      </div>
    </div>
  );
}

export default About;
