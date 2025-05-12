const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Group = require('../models/group');
const authenticateToken = require('../middleware/authenticateToken');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1E9)}${ext}`);
  }
});
const upload = multer({ storage });

router.post('/register', authenticateToken, upload.single('groupProfilePic'), async (req, res) => {
  console.log('Hit /groups/register route');
  try {
    const { groupName, description } = req.body;
    const ownerId = req.user.userId;
    const groupProfilePic = req.file ? req.file.filename : null;

    if (!groupName || !description) {
      return res.status(400).json({ error: 'Group name and description are required.' });
    }

    const groupExists = await Group.findOne({ groupName });
    if (groupExists) {
      return res.status(400).json({ error: 'Group name already exists.' });
    }

    const newGroup = new Group({ groupName, description, groupProfilePic, ownerId });
    await newGroup.save();

    res.status(201).json({ message: 'Group created successfully.', group: newGroup });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error while creating group.' });
  }
});


router.get('/groups/:groupId', async (req, res) => {
  console.log('Hit GET /groups/:groupId route');
  try {
    const group = await Group.findById(req.params.groupId)
      .populate('ownerId', 'username profilename')
      .populate('members', 'username')
      .populate({
        path: 'groupPosts',
        populate: {
          path: 'author',
          select: 'username'
        }
      });

    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }

    res.json({
      groupName: group.groupName,
      description: group.description,
      groupProfilePic: group.groupProfilePic,
      owner: group.ownerId,
      members: group.members,
      posts: group.groupPosts,
    });
  } catch (err) {
    console.error('Error fetching group:', err);
    res.status(500).json({ error: 'Failed to fetch group data' });
  }
});

module.exports = router;
