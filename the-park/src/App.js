import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import petImage from './petpic.png';
import logo from './logo2.png';
import LostAndFound from './LostAndFound';

function Home() {
  return (
    <div className="landing">
      <div className="image-container">
        <img src={petImage} alt="Pet" />
      </div>
      <div className="text-section">
        <div className="text-container">
          <img src={logo} alt="Pet Social Logo" className="logo" />
          <p>A place to share all your favorite pet pictures with family and friends.</p>
          <input type="text" placeholder="Username" className="input-field" />
          <input type="password" placeholder="Password" className="input-field" />
          <button className="login-button">Log in</button>
          <br /><br />
          <button className="forgot-pw-button">Forgot Password</button>
          <br /><br />
          <button className="signup-button">Create New Account</button>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lost" element={<LostAndFound />} />
      </Routes>
    </Router>
  );
}

export default App;