import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

import './App.css';
import Profile from './profile';
import ProfileSignup from './ProfileSignup';
import About from './About';
import LostAndFound from './LostAndFound';
import CreatePost from './CreatePost';
import Main from './Main'; 
import PetEvents from './PetEvents';

import petImage from './petpic.png';
import logo from './logo2.png';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="landing">
      <div className="image-container">
        <img src={petImage} alt="Pet" />
      </div>
      <div className="text-section">
        <div className="text-container">
          <img src={logo} alt="Pet Social Logo" className="logo" />
          <p>A place to share all your favorite pet pictures with family and friends.</p>
          <input type="text" placeholder="Username" className="input-fieldlogin" />
          <input type="password" placeholder="Password" className="input-fieldlogin" />
          <button className="login-button" onClick={() => navigate('/main')}>Log in</button>
          <button className="forgotpw-button">Forgot Password</button>
          <br /><br />
          <button className="signup-button" onClick={() => navigate('/signup')}>Create New Account</button>
        </div>
      </div>
    </div>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/main" element={<Main />} />
      <Route path="/lost" element={<LostAndFound />} />
      <Route path="/signup" element={<ProfileSignup />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/about" element={<About />} />
      <Route path="/post" element={<CreatePost />} />
      <Route path="/petevents" element={<PetEvents />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
