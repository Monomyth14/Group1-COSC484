const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  profilename: { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bio: { type: String },
  profilePic: { type: String, default: null },
  groupsOwned:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }],
  groupsJoined: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }],
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }]
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);