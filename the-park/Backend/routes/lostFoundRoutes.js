const express = require('express');
const router = express.Router();
const multer = require('multer');
const mongoose = require('mongoose');
const path = require('path');
const LostAndFound = require('../models/LostAndFound');

// Multer config for saving uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage });

// Post new report
router.post('/', upload.single('photo'), async (req, res) => {
  try {
    const {
      title,
      description,
      location,
      contactInfo,
      dateReported,
      status,
    } = req.body;

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';

    const report = new LostAndFound({
      title,
      description,
      location,
      contactInfo,
      dateReported,
      status,
      imageUrl,
    });

    const saved = await report.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all reports
router.get('/', async (req, res) => {
  try {
    const reports = await LostAndFound.find();
    res.json(reports);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete report by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid report ID' });
    }
  
    try {
      const deleted = await LostAndFound.findByIdAndDelete(id);
      if (!deleted) return res.status(404).json({ error: 'Report not found' });
      res.json({ message: 'Deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  

module.exports = router;
