const Sale = require('../models/saleModel');

async function getSaleByCode(req, res, next) {
    let sale;
    try {
        sale = await Sale.findOne({ code: req.params.code });
        if (sale == null) {
            return res.status(404).json({ message: 'Registro de venta no encontrado' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.sale = sale;
    next();
}
module.exports = { getSaleByCode };