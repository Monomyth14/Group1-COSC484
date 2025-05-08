const express = require('express');
const router = express.Router();
const Group = require('../models/group');

// Register a new group
router.post('/register', async (req, res) => {
  console.log('Hit /groups/register route'); // checks route
  try {
    const { groupName, description } = req.body;

    if (!groupName || !description) {
      return res.status(400).json({ error: 'Group name and description are required.' });
    }

    const groupExists = await Group.findOne({ groupName });
    if (groupExists) {
      return res.status(400).json({ error: 'Group name already exists.' });
    }

    const newGroup = new Group({ groupName, description });
    await newGroup.save();

    res.status(201).json({ message: 'Group created.', group: newGroup });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error while creating group.' });
  }
});

module.exports = router;