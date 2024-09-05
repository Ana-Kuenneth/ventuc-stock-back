const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: [String], 
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    buyer: {
        type: [String],
        required: true
    },
    stock: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    code: {
        type: Number,
        required: true
    },
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;