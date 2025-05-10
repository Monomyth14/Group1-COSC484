import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

import './Style/App.css';
import Profile from './profile';
import EditProfilePage from './EditProfilePage';  
import ProfileSignup from './ProfileSignup';
import About from './About';
import CreateGroup from './GroupSignup';
import groupPage from './groupPage';
import LostAndFound from './LostAndFound';
import CreatePost from './CreatePost';
import Main from './Main'; 
import PetEvents from './PetEvents';
import petImage from './Images/petpic.png';
import logo from './Images/logo2.png';

function Home() {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  
  //reusable
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData)
      });
  
      const result = await response.json();
  
      if (response.ok) {
        console.log('Login success:', result);
        localStorage.setItem('token', result.data.token);
        localStorage.setItem('userId', result.data.user.id);
        navigate('/main', { state: { user: result.data.user } });
      } else {
        alert(result.error || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred. Try again later.');}
  };
  

  return (
    <div className="landing">
      <div className="image-container">
        <img src={petImage} alt="Pet" />
      </div>
      <div className="text-section">
        <div className="text-container">
          <img src={logo} alt="Pet Social Logo" className="logo" />
          <p>A place to share all your favorite pet pictures with family and friends.</p>
          <input
          type="text"
          name="email"
          placeholder="Email"
          className="input-fieldlogin"
          value={loginData.email}
          onChange={handleChange}/>
          <input
          type="password"
          name="password"
          placeholder="Password"
          className="input-fieldlogin"
          value={loginData.password}
          onChange={handleChange}/>
          <button className="login-button" onClick={handleLogin}>Log in</button>
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
      <Route path="/groupSignup" element={<CreateGroup/>} />
      <Route path="/groupPage" element={<groupPage/>}/>
      <Route path="/profile" element={<Profile />} />
      <Route path="/edit-profile" element={<EditProfilePage />} /> 
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
