const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

//GET all events
router.get('/', async (req, res) => {
    try{
        const events = await Event.find().sort({data: 1});
        req.json(events);
    } catch (err){
        res.status(500).json({message: err.message});
    }
});


// POST a new event
router.post('/', async (req, res) => {
    const {title, data, time, location, description} = req.body;

    const newEvent = new Event({title, data, time, location, description});

    try{
        const saved = await newEvent.save();
        res.status(201).json(saved);

    } catch (err){
        res.status(400).json({message:err.message});
    }
});

module.exports = router;