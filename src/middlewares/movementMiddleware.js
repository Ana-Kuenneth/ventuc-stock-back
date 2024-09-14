const Movement = require('../models/movementModel');

async function getMovementByCode(req, res, next) {
    let movement;
    try {
        movement = await Movement.findOne({ code: req.params.code });
        if (movement == null) {
            return res.status(404).json({ message: 'Movimiento no encontrado' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.movement = movement;
    next();
}
module.exports = { getMovementByCode };