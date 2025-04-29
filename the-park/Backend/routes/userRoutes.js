const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
  console.log('Hit /register route'); // checks route
  try {
    const { username, profilename, email, password, bio } = req.body;

    if (!username || !profilename || !email || !password) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
    return res.status(400).json({ error: 'Username is already taken.' });
    }

    const emailExists = await User.findOne({ email });
    if (emailExists) {
    return res.status(400).json({ error: 'Email is already taken.' });
  }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const newUser = new User({ username, profilename, email, password: hashedPassword, bio });
    await newUser.save();

    res.status(201).json({ message: 'User created.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error!' });
  }
});

router.post('/login', async (req, res) => {
  console.log('Hit /login route'); // checks route
  try {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Incorrect email and/or password.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Incorrect Password, Try again.' });
    }

    const payload = { userId: user._id};
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful!', data: { token, user: { id: user._id, username: user.username }}});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error!' });
  }
});

module.exports = router;