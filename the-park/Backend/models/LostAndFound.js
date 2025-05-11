const mongoose = require('mongoose');

const LostAndFoundSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  imageUrl: String,
  location: String,
  dateReported: {
    type: Date,
    default: Date.now,
  },
  contactInfo: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['lost', 'found'],
    required: true,
  }
});

module.exports = mongoose.model('LostAndFound', LostAndFoundSchema);
