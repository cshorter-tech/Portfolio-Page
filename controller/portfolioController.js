const PortfolioItem = require('../models/portfolioItem')

// Review Portfolio/Portfolio bug

const portfolio_index = (req, res) => {
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
                portfolioEntries.push({ title: element.title, type: element.type, description: element.description, url: element.url })
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
                portfolioEntries.push({ title: element.title, type: element.type, description: element.description, url: element.url })
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
                portfolioEntries.push({ title: element.title, type: element.type, description: element.description, url: element.url })
            });
            // console.log(portfolioEntries)
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

const portfolioItem_update = (req, res) => {
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

const portfolioItem_delete = (req, res) => {

}

module.exports = {
    portfolio_index,
    portfolio_software,
    portfolio_analytics,
    portfolio_publications,
    portfolio_dataEntry,
    portfolioItem_create,
    portfolioItem_view,
    portfolioItem_update,
    portfolioItem_delete
}



// const fs = require('fs');

// // Reading files
// const greetings = "hello"
// const readFile = fs.readFile('./public/docs/blog.txt', (err, data) => {
//     if (err) {
//         console.log(err)
//     }
//     console.log(data.toString())
// })

// // Creating files
// const writeFile = fs.writeFile('./public/docs/blog1.txt', "Hello World", (err) => {
//     if (err) {
//         console.log(err)
//     } console.log("File saved")
// })

// // Create & Remove directory
// const dirToggle = function () {
//     if (fs.existsSync('./controller/dud')) {
//         fs.rmdir('./controller/dud', (err) => {
//             if (err) {
//                 console.log(err)
//             }
//             console.log("folder deleted")
//         })
//     } else {
//         fs.mkdir('./controller/dud', (err) => {
//             if (err) {
//                 console.log(err)
//             }
//             console.log("folder created")
//         })
//     }
// }

// module.exports = {
//     greetings,
//     dirToggle
// };
