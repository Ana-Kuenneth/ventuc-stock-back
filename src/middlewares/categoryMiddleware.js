const Category = require('../models/categoryModel');

async function getCategoryByCode(req, res, next) {
    let category;
    try {
        category = await Category.findOne({ code: req.params.code });
        if (category == null) { 
            return res.status(404).json({ message: 'Categoría no encontrada' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.category = category;
    next();
}

async function getCategoryByName(req, res, next) {
    let category;
    try {
        category = await Category.findOne({ name: req.params.name });
        if (category == null) {
            return res.status(404).json({ message: 'Categoría no encontrada' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.category = category;
    next();
}

module.exports = { getCategoryByCode, getCategoryByName};
