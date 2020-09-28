const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const updateUsers = require('./controller/updateUser')
// const { people, ages } = require('./controller/updateUser')
const { greetings, dirToggle } = require('./controller/updateBlogs')
// import { getTabularContent } from './views/partials/portfolioTabs'

var app = express();

// console.log(updateUsers);
// console.log(updateUsers.people);
// console.log(ages)
dirToggle();
// console.log(greetings)
// console.log(readFile)


mongoose.connect('mongodb://localhost:27017/portfolioPage', { useNewUrlParser: true });

app.set('view engine', 'ejs');
// app.set('views', 'partials')

// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));
app.use('images', express.static(__dirname + 'public/images'));

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("MongoDB server started on port 27017..")
});

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    country: String,
    subscription: { type: String, default: 'on' }
});
const User = mongoose.model('User', userSchema);

const messageSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    contactReason: String,
    messageContent: String,
    subscription: String
});
const Message = mongoose.model('Message', messageSchema);

app.get('/', function (req, res) {
    res.render('index.ejs', { root: __dirname, index: false, extensions: ['ejs'], title: 'Home' })
});

app.post('/addUser', function (req, res) {
    var newUser = new User(req.body)
    newUser.save()
        .then(item => {
            console.log("newUser added to database");
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
    console.log(newUser)
    res.redirect("/");
})

app.get('/portfolio', function (req, res) {
    const portfolioEntries = [
        { title: 'Blog 1', type: 'Software', description: 'all the web apps', url: 'www.google.com' },
        { title: 'Blog 2', type: 'Analytics', description: 'all the data', url: 'www.google.com' },
        { title: 'Blog 3', type: 'Publications', description: 'all the publications', url: 'www.google.com' }
    ]

    res.render('portfolio.ejs', { root: __dirname, index: false, extensions: ['ejs'], title: 'Portfolio', portfolioEntries })
});

app.get('/portfolio/create', function (req, res) {
    res.render('createEntry.ejs', { root: __dirname, index: false, extensions: ['ejs'] })
});

app.get('/experience', function (req, res) {
    res.render('experience.ejs', { root: __dirname, index: false, extensions: ['ejs'], title: 'Resume' })
});

app.get('/contact', function (req, res) {
    res.render('contact.ejs', { root: __dirname, index: false, extensions: ['ejs'], title: 'Contact' })
});

app.post('/contact/sendFeedback', function (req, res) {
    var newMessage = new Message(req.body)
    console.log(newMessage)
    newMessage.save()
        .then(item => {
            console.log("newMessage added to database");
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
    res.redirect("/contact");
})

app.listen(3000, () => {
    console.log('Local server started on port 3000.')
});