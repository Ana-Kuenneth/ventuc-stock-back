const Brand = require('../models/brandModel');

async function getBrandByCode(req, res, next) {
    let brand;
    try {
      brand = await Brand.findOne({ code: Number(req.params.code) });
      console.log(brand); // Depuración
      if (!brand) {
        return res.status(404).json({ message: 'Marca no encontrada' });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
    res.brand = brand;
    next();
  }

async function getBrandByName(req, res, next) {
    let brand;
    try {
        brand = await Brand.findOne({ name: req.params.name });
        if (brand == null) {
            return res.status(404).json({ message: 'Marca no encontrada' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.brand = brand;
    next();
}

module.exports = { getBrandByCode, getBrandByName};