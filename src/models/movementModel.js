const mongoose = require('mongoose');

const movementSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    code: {
        type: String, 
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    brand: {
        type: String,
        required: true
    },
    buyer: {
        type: String,
        required: true
    },
    previousStock: {
        type: Number,
        required: true,
    },
    newStock: {
        type: Number,
        required: true
    },
    buyPrice: {
        type: Number,
        required: true
    }
}, { timestamps: true });

const Movement = mongoose.model('Movement', movementSchema);

module.exports = Movement;