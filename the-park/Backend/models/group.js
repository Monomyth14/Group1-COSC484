const mongoose = require('mongoose');

const GroupSchema = new mongoose.Schema({
  groupname: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  ownerId:     { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  members:     [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  groupPhoto:  { type: String },
  privacy:     { type: String, enum: ['public', 'private'], default: 'public' }
}, { timestamps: true });

module.exports = mongoose.model('Group', GroupSchema);