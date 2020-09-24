const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// import { getTabularContent } from './views/partials/portfolioTabs'

var app = express();

mongoose.connect('mongodb://localhost:27017/portfolioPage', { useNewUrlParser: true });

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
    res.sendFile('./views/index.html', { root: __dirname, index: false, extensions: ['html'] })
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
    res.sendFile('./views/portfolio.html', { root: __dirname, index: false, extensions: ['html'] })
});

app.get('/experience', function (req, res) {
    res.sendFile('./views/experience.html', { root: __dirname, index: false, extensions: ['html'] })
});

app.get('/blog', function (req, res) {
    res.sendFile('./views/blog.html', { root: __dirname, index: false, extensions: ['html'] })
});

app.get('/contact', function (req, res) {
    res.sendFile('./views/contact.html', { root: __dirname, index: false, extensions: ['html'] })
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