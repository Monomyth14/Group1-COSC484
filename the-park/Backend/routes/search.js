const express = require('express');
const router = express = express.Router();

const User = require('../models/user');
const Event = require('../models/Events');
const Post = require('../models/posts');
const LostAndFound = require('../models/LostAndFound');

const searchRoutes = require('./routes/search');
app.use('/api/search', searchRoutes);

router.get('/', async (req, res) => {
    const q = req.query.q;
    
    try{
        const users = await User.find({ username: {$regex: query, $options: 'i'} });
        const events = await Event.find({ title: {$regex: query, $options: 'i'} });
        const posts = await Post.find({ caption: {$regex: query, $options: 'i'} });
        const lostpets = await LostAndFound.find({ title: {$regex: query, $options: 'i'} });

        res.json({users, events, posts, lostpets});
    }catch (err){
        res.status(500).json({message: 'Something went wrong.'});
    }
});


module.exports = router;