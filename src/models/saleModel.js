const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    code: {
        type: String, 
        required: true
    },
    productCode: {
        type: String, 
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    productDescription: {
        type: String,
        required: true
    },
    saleDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    productBrand: {
        type: String,
        required: true
    },
    client: {
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
    quantity: {
        type: Number,
        required: true,
    },
    salePrice: {
        type: Number,
        required: true
    },
    incremento: {
        type: Number,
        required: true
    },
    descripcionIncremento: {
        type: String,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    payMethod: {
        type: String,
        required: true
    },
}, { timestamps: true });

const Sale = mongoose.model('Sale', saleSchema);

module.exports = Sale;