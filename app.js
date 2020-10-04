const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./models/user')
const Message = require('./models/message')
const portfolioRoutes = require('./routes/portfolioRoutes')

var app = express();

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

app.use('/portfolio', portfolioRoutes);

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