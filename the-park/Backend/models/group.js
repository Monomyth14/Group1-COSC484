const mongoose = require('mongoose');

const GroupSchema = new mongoose.Schema({
  groupName: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  groupProfilePic: { type: String, default: null},
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  groupPosts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'} ]
}, { timestamps: true });

module.exports = mongoose.model('Group', GroupSchema);