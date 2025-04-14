// GroupSignup.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from './logo2.png';
import './signup.css';

const GroupSignup = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const groupName = form.groupName.value;
    const description = form.description.value;

    navigate('/groupPage', { state: { groupName, description } });
  };

  return (
    <div className="container">
      <div className="sidebar">
        <img src={logo} alt="Tree Logo" />
        <h1>The Park</h1>
        <div className="nav">
          <div>ℹ️ <Link to="/about">About Us</Link></div>
          <div>🔔 Notifications</div>
          <div>👤 Account</div>
        </div>
      </div>

      <div className="main">
        <h1>Group Signup Page</h1>
        <form onSubmit={handleSubmit} id="groupForm">
          <fieldset>
            <label htmlFor="groupName">Group Name:</label>
            <input type="text" id="groupName" name="groupName" required />

            <label htmlFor="description">Description:</label>
            <input type="text" id="description" name="description" required />

            <div className="buttons">
              <input type="submit" value="Submit" />
              <button type="button" onClick={() => navigate('/')}>Cancel</button>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default GroupSignup;