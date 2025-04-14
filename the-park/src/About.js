import React from 'react';
import './signup.css';
import logo from './logo2.png';
import { Link } from 'react-router-dom';

function About() {
  return (
    <div className="page-container">
      <div className="sidebar">
        <img src={logo} alt="Tree Logo" />
        <h1>The Park</h1>
        <div className="nav">
            <div>ℹ️ <Link to="/profile">About Us</Link></div> 
            <div>🔔 Notifications</div>
            <div><Link to="/profile">👤 Account</Link></div>
        </div>
      </div>

      <div className="main">
        <h1>About The Park!</h1>
        <p>
          The Park is a pet-focused social media platform where users can share pictures, stories, and information about their pets.
          Users can follow a variety of groups—some centered around fun and entertainment, others focused on education and advice.
          If you don't find a group that fits your needs, you're welcome to create your own and bring pet lovers together!
        </p>
        <br />
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
