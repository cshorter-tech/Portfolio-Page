var express = require('express');

var app = express();

app.use(express.static('public'));
app.use('images', express.static(__dirname + 'public/images'));

app.get('/', function (req, res) {
    res.sendFile('./views/index.html', { root: __dirname, index: false, extensions: ['html'] })
});

app.get('/portfolio', function (req, res) {
    res.sendFile('./views/portfolio.html', { root: __dirname, index: false, extensions: ['html'] })
});

app.get('/blog', function (req, res) {
    res.sendFile('./views/blog.html', { root: __dirname, index: false, extensions: ['html'] })
});

app.get('/contact', function (req, res) {
    res.sendFile('./views/contact.html', { root: __dirname, index: false, extensions: ['html'] })
});



app.listen(3000, () => {
    console.log('Local server started on port 3000.')
});