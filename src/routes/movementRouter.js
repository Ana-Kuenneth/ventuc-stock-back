//productRouter.js
const express = require('express');
const router = express.Router();
const Movement = require('../models/movementModel');
const { getMovementByCode } = require('../middlewares/movementMiddleware');


// Obt todos los movimiento
router.get('/movements', async (req, res) => {
    try {
        const movements = await Movement.find();
        res.json(movements);
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//Obt un movimiento por ID tiene la verificación en el archivo middleware jiji
router.get('/movements/code/:code', getMovementByCode, (req, res) => {
    res.json(res.movement)
}),


// Crear nuevo movimiento
router.post('/movements', async (req, res) => {
    try {
        const movementData = {
            type: req.body.type,
            code: req.body.code,
            productCode: req.body.productCode,
            name: req.body.name,
            description: req.body.description,
            date: req.body.date,
            brand: req.body.brand,
            buyer: req.body.buyer,
            previousStock: req.body.previousStock,
            newStock: req.body.newStock,
            buyPrice: req.body.buyPrice
        };

// Crear nuevo movimiento
        const movement = new Movement(movementData);
        const newMovement = await movement.save();
        res.status(201).json(newMovement);
    } catch (err) {
        res.status(400).json({ message: "movimiento no creado" + err.message });
    }
});


// // Actualiazr movimiento
// router.patch('/products/actualizarStock/:code', getProductByCode, async (req, res) => {
//     if (req.body.name != null) {    
//         res.product.name = req.body.name;
//     }
//     if (req.body.description != null) {
//         res.product.description = req.body.description;
//     }
//     if (req.body.category != null) {
//         res.product.category = req.body.category;
//     }
//     if (req.body.brand != null) {
//         res.product.brand = req.body.brand;
//     }
//     if (req.body.image != null) {
//         res.product.image = req.body.image;
//     }
//     if (req.body.date != null) {
//         res.product.date = req.body.date;
//     }
//     if (req.body.buyer != null) {
//         res.product.buyer = req.body.buyer;
//     }
//     if (req.body.stock != null) {
//         res.product.stock = req.body.stock;
//     } 
//     if (req.body.price != null) {
//         res.product.price = req.body.price;
//     }
//     if (req.body.code != null) {
//         res.product.code = req.body.code;
//     }

//     try {
//         const updatedProduct = await res.product.save();
//         res.json(updatedProduct);
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// });



// Eliminar movimiento
router.delete('/movements/:code', getMovementByCode, async (req, res) => {
    try {
      const movement = res.movement;
      await Movement.findByIdAndDelete(movement.code);
      return res.json({ message: 'Movimiento eliminado correctamente' });
    } catch (error) {
      return res.status(500).json({ message: 'Error al eliminar el movimiento', error: error.message });
    }
  })


module.exports = router;