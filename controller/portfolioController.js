const PortfolioItem = require('../models/portfolioItem')

// Review Portfolio/Portfolio bug

const portfolio_index = (req, res) => {
    PortfolioItem.find()
        .then((result) => {
            var portfolioEntries = []
            result.forEach(element => {
                portfolioEntries.push({ id: element.id, title: element.title, type: element.type, description: element.description, url: element.url })
            });
            // console.log(portfolioEntries)
            res.render('portfolio.ejs', { root: __dirname, index: false, extensions: ['ejs'], title: 'Portfolio', portfolioEntries })
        })
        .catch((err) => {
            console.log(err)
        })
}

const portfolio_analytics = (req, res) => {
    PortfolioItem.find({ type: "Analytics" }, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            console.log(data)
        }
    })
        .then((result) => {
            var portfolioEntries = []
            result.forEach(element => {
                portfolioEntries.push({ id: element.id, title: element.title, type: element.type, description: element.description, url: element.url })
            });
            // console.log(portfolioEntries)
            res.render('portfolio.ejs', { root: __dirname, index: false, extensions: ['ejs'], title: 'Portfolio', portfolioEntries })
        })
        .catch((err) => {
            console.log(err)
        })
}

const portfolio_software = (req, res) => {
    PortfolioItem.find({ type: "Software" })
        .then((result) => {
            var portfolioEntries = []
            result.forEach(element => {
                portfolioEntries.push({ id: element.id, title: element.title, type: element.type, description: element.description, url: element.url })
            });
            // console.log(portfolioEntries)
            res.render('portfolio.ejs', { root: __dirname, index: false, extensions: ['ejs'], title: 'Portfolio', portfolioEntries })
        })
        .catch((err) => {
            console.log(err)
        })
}

const portfolio_publications = (req, res) => {
    PortfolioItem.find({ type: "Publication" })
        .then((result) => {
            var portfolioEntries = []
            result.forEach(element => {
                portfolioEntries.push({ id: element.id, title: element.title, type: element.type, description: element.description, url: element.url })
            });
            console.log(portfolioEntries)
            res.render('portfolio.ejs', { root: __dirname, index: false, extensions: ['ejs'], title: 'Portfolio', portfolioEntries })
        })
        .catch((err) => {
            console.log(err)
        })
}

const portfolio_dataEntry = (req, res) => {
    res.render('../views/portfolioEntries/createEntry.ejs', { root: __dirname, index: false, extensions: ['ejs'], title: "Create Portfolio" })
}

const portfolioItem_create = (req, res) => {
    var newPortfolioItem = new PortfolioItem(req.body)
    newPortfolioItem.save()
        .then(item => {
            console.log("newPortfolioItem added to database");
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
    res.redirect('/portfolio/create')
}

const portfolioItem_view = (req, res) => {
    const id = req.params.id
    console.log(id)
    PortfolioItem.findById(id)
        .then((item) => {
            res.render('../views/portfolioEntries/viewEntry.ejs', { root: __dirname, index: false, extensions: ['ejs'], title: "View Entry", item })
        })
        .catch((err) => {
            console.log(err)
        })
}

const portfolioItem_edit = (req, res) => {
    const id = req.params.id
    console.log(id)
    PortfolioItem.findById(id)
        .then((item) => {
            res.render('../views/portfolioEntries/updateEntry.ejs', { root: __dirname, index: false, extensions: ['ejs'], title: "View Entry", item })
        })
        .catch((err) => {
            console.log(err)
        })
}

const portfolioItem_update = (req, res) => {
    const updates = req.body
    const id = req.params.id
    PortfolioItem.replaceOne({ _id: id }, { title: updates.title, type: updates.type, description: updates.description, url: updates.url })
        .then(() => {
            res.redirect('/portfolio')
        })
        .catch((err) => {
            console.log(err)
        });
}

const portfolioItem_delete = (req, res) => {
    PortfolioItem.deleteOne({ id: req.id })
        .then(() => {
            res.redirect('/portfolio')
        })
        .catch((err) => {
            console.log(err)
        });
}

module.exports = {
    portfolio_index,
    portfolio_software,
    portfolio_analytics,
    portfolio_publications,
    portfolio_dataEntry,
    portfolioItem_create,
    portfolioItem_view,
    portfolioItem_edit,
    portfolioItem_update,
    portfolioItem_delete
};