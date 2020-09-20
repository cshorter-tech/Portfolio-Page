var express = require('express');

var app = express();

app.get('/', function (req, res) {
    res.send('Hello World - Intro')
});

app.get('/portfolio', function (req, res) {
    res.send('This is my portfolio page')
});

app.get('/blog', function (req, res) {
    res.send('This is my blog page')
});

app.get('/contact', function (req, res) {
    res.send('This is my contact page')
});

app.listen(3000, () => {
    console.log('Local server started on port 3000.')
});