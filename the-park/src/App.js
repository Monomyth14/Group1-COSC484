import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import Profile from './profile';
import ProfileSignup from './ProfileSignup';
import About from './About';
import LostAndFound from './LostAndFound';
import CreatePost from './CreatePost';
import Main from './Main'; 
import PetEvents from './PetEvents';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/lost" element={<LostAndFound />} />
        <Route path="/signup" element={<ProfileSignup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<About />} />
        <Route path="/post" element={<CreatePost />} /> 
        <Route path="/petevents" element={<PetEvents />} />
      </Routes>
    </Router>
  );
}

export default App;
