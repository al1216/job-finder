const mongoose = require('mongoose');

const User = mongoose.model('User', {
    name: String,
    email: String,
    number: Number,
    password: String,
    checkbox: Boolean,
    token: String
})

module.exports = User;