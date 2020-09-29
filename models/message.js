const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    contactReason: String,
    messageContent: String,
    subscription: String
}, { timestamps: true });

const Message = mongoose.model('Message', messageSchema);

module.exports = Message