const express = require('express')
const mongoose = require('mongoose')
const ejs = require('ejs')
// const multer = require('multer')
const app = express()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const PORT = 4001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

mongoose.connect('mongodb+srv://manuel123:manuel123@cluster0.m5ysuwy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Connection error', err);
});

// Schemas
const eventSchema = {
    eventName: String,
    month: String,
    day: Number,
    // date: Date,
    // date: {
    //     type: Date,
    //     get: (date) => date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })
    // },
    time: String,
    description: String
    // imageUrl: String
};

const Event = mongoose.model('Event', eventSchema);

app.get('/', (req, res) => {
    res.render('index', {title: "St. Charles Lwanga Catholic Church | Abeka"})
})

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/services', (req, res) => {
    res.render('services');
});

app.get('/events', (req, res) => {
    Event.find()
        .then(events => {
            res.render('events', { events, title: "Events"})
        })
    // res.render('events');
});

app.get('/event/:id', (req, res) => {
    const id = req.params.id
    Event.findById(id)
        .then(result => {
            res.render('details', { event: result, title: "Event Details" });
        })
        .catch(err => {
            console.log(err)
        })
});

app.post('/events', (req, res) => {
    const event = new Event(req.body)

    event.save()
        .then(result => {
            res.redirect('/events');
        })
        .catch(err => {
            console.log(err);
        });
});

app.get('/events/manage', (req, res) => {
    res.render('manage');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

// const eventsRouter = require('./routes/events');
// app.use('/events', eventsRouter);

app.use((req, res) => {
    res.status(404).render('404');
});