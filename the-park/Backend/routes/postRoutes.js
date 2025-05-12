// routes for groups
const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const Post = require('../models/posts');
const authenticateToken = require('../middleware/authenticateToken'); 
const multer = require('multer');

router.post('/create', authenticateToken, async (req, res) => {
  console.log('Hit /post/create route');
  try {
    const { caption, image } = req.body;
    const ownerId = req.user.userId;

    if (!caption) {
      return res.status(400).json({ error: 'Caption is required' });
    }

    const newPost = new Post({ caption, image, ownerId });
    await newPost.save();

    res.status(201).json({ message: 'Post created successfully.', posts: newPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error while creating post.' });
  }
});

module.exports = router;