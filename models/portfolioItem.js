const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
    title: String,
    type: String,
    description: String,
    url: String
}, { timestamps: true });

const PortfolioItem = mongoose.model('PortfolioItem', portfolioSchema);

module.exports = PortfolioItem;