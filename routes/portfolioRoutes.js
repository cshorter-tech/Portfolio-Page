const express = require('express');
const PortfolioItem = require('../models/portfolioItem')

const router = express.Router()

router.get('/portfolio', function (req, res) {
    PortfolioItem.find()
        .then((result) => {
            var portfolioEntries = []
            result.forEach(element => {
                portfolioEntries.push({ title: element.title, type: element.type, description: element.description, url: element.url })
            });
            // console.log(portfolioEntries)
            res.render('portfolio.ejs', { root: __dirname, index: false, extensions: ['ejs'], title: 'Portfolio', portfolioEntries })
        })
        .catch((err) => {
            console.log(err)
        })
});

router.get('/portfolio/create', function (req, res) {
    res.render('createEntry.ejs', { root: __dirname, index: false, extensions: ['ejs'], title: "Create Portfolio" })
});

router.post('/portfolio/addEntry', function (req, res) {
    var newPortfolioItem = new PortfolioItem(req.body)
    newPortfolioItem.save()
        .then(item => {
            console.log("newPortfolioItem added to database");
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
    res.redirect('/portfolio/create')
})


module.exports = router;