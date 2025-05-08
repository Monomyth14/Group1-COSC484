const mongoose = require('mongoose');

const eventScheme = new mongoose.Schema({
    title: { type: String, required: true},
    data: { type: String, required: true},
    time: {type: String, required: true},
    location: { type: String, required: true},
    description: {type: String, required: true},
}, {timestamps: true});

module.exports = mongoose.model('Event', eventScheme);