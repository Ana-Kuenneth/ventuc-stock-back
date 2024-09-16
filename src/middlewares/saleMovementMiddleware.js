//saleMovementMiddleware.js
const SaleMovement = require('../models/saleMovementModel');

async function getSaleMovementByCode(req, res, next) {
    let movement;
    try {
        movement = await SaleMovement.findOne({ code: req.params.code });
        if (movement == null) {
            return res.status(404).json({ message: 'Registro de venta no encontrado' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.movement = movement;
    next();
}
module.exports = { getSaleMovementByCode };