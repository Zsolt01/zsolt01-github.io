const Schema = require('mongoose').Schema;
const db = require('../config/db');

const User = db.model('User', {
    email: String,
    name: String,
    tel: Number,
    password: String
});

module.exports = User;
