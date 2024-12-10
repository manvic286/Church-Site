const express = require('express')
const mongoose = require('mongoose')
const ejs = require('ejs')
const multer = require('multer')
const app = express()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/churchEvents', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Connection error', err);
});

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/services', (req, res) => {
    res.render('services');
});

app.get('/events', (req, res) => {
    res.render('events');
});

app.get('/events/manage', (req, res) => {
    res.render('manage');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

const eventsRouter = require('./routes/events');
app.use('/events', eventsRouter);

app.use((req, res) => {
    res.status(404).render('404');
});