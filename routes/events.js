// const express = require('express');
// const router = express.Router();
// const Event = require('../models/Event');

// // Get all events
// router.get('/', async (req, res) => {
//     const events = await Event.find();
//     res.render('events', { events });
// });

// // Create a new event
// router.post('/create', async (req, res) => {
//     const { title, date, time, location, description } = req.body;
//     const event = new Event({ title, date, time, location, description });
//     await event.save();
//     res.redirect('/events');
// });

// // Edit an event
// router.post('/edit/:id', async (req, res) => {
//     const { id } = req.params;
//     const { title, date, time, location, description } = req.body;
//     await Event.findByIdAndUpdate(id, { title, date, time, location, description });
//     res.redirect('/events');
// });

// // Delete an event
// router.post('/delete/:id', async (req, res) => {
//     const { id } = req.params;
//     await Event.findByIdAndDelete(id);
//     res.redirect('/events');
// });

// module.exports = router; 