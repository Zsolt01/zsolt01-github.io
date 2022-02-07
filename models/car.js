const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Car = db.model('Car', {
    make: String, // gyártó
    model: String,  // típus
    regFrom: Number, // first registration from --évjárat
    mileage: Number, // km
    price: Number,
    description: String,
    images: Array,
    _owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = Car;
