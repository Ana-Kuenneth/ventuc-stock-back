const Product = require('../models/productModel');

async function getProductByCode(req, res, next) {
    let product;
    try {
        product = await Product.findOne({ code: req.params.code });
        if (product == null) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.product = product;
    next();
}

async function getProductByName(req, res, next) {
    let product;
    try {
        product = await Product.findOne({ name: req.params.name });
        if (product == null) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.product = product;
    next();
}

module.exports = { getProductByCode, getProductByName};