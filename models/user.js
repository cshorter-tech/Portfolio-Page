const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    country: String,
    subscription: { type: String, default: 'on' }
}, { timestamps: true });
const User = mongoose.model('User', userSchema);

module.exports = User