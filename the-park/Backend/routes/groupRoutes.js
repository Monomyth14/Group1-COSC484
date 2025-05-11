// routes for groups
const express = require('express');
const router = express.Router();
const Group = require('../models/group');
const authenticateToken = require('../middleware/authenticateToken'); 

router.post('/register', authenticateToken, async (req, res) => {
  console.log('Hit /groups/register route');
  try {
    const { groupName, description } = req.body;
    const ownerId = req.user.userId;

    if (!groupName || !description) {
      return res.status(400).json({ error: 'Group name and description are required.' });
    }

    const groupExists = await Group.findOne({ groupName });
    if (groupExists) {
      return res.status(400).json({ error: 'Group name already exists.' });
    }

    const newGroup = new Group({ groupName, description, ownerId });
    await newGroup.save();

    res.status(201).json({ message: 'Group created successfully.', group: newGroup });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error while creating group.' });
  }
});

module.exports = router;