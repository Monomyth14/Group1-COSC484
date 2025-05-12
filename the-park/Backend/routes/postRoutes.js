
const express = require('express');
const router = express.Router();
const Post = require('../models/posts');
const authenticateToken = require('../middleware/authenticateToken');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1E9)}${ext}`);
  }
});
const upload = multer({ storage });

router.post('/create', authenticateToken, upload.single('image'), async (req, res) => {
  try {
    const { caption } = req.body;
    const ownerId = req.user.userId;
    const image = req.file ? req.file.filename : '';
    const newPost = new Post({ caption, image, ownerId });
    await newPost.save();
    res.status(201).json({ post: newPost });
  } catch {
    res.status(500).json({ error: 'Post creation failed' });
  }
});

router.get('/all', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }).populate('ownerId', 'username').populate('comments.userId', 'username');
    res.json(posts);
  } catch {
    res.status(500).json({ error: 'Fetch failed' });
  }
});

router.get('/mine', authenticateToken, async (req, res) => {
  try {
    const posts = await Post.find({ ownerId: req.user.userId }).sort({ createdAt: -1 });
    res.json(posts);
  } catch {
    res.status(500).json({ error: 'Fetch failed' });
  }
});

router.post('/like/:postId', authenticateToken, async (req, res) => {
  const post = await Post.findById(req.params.postId);
  const userId = req.user.userId;
  if (!post) return res.status(404).json({ error: 'Not found' });
  const index = post.likes.indexOf(userId);
  if (index === -1) post.likes.push(userId);
  else post.likes.splice(index, 1);
  await post.save();
  res.json({ likes: post.likes.length });
});

router.post('/comment/:postId', authenticateToken, async (req, res) => {
  const { text } = req.body;
  const post = await Post.findById(req.params.postId);
  if (!post) return res.status(404).json({ error: 'Not found' });
  post.comments.push({ userId: req.user.userId, text });
  await post.save();
  res.json({ comments: post.comments });
});

module.exports = router;