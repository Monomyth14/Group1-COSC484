const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  profilename: { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bio: { type: String },
  profilePic:   { type: String },
  groupsOwned:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }],
  groupsJoined: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }]
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);