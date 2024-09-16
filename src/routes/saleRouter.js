//productRouter.js
const express = require('express');
const router = express.Router();
const Sale = require('../models/saleModel');
const { getSaleByCode } = require('../middlewares/saleMiddleware');


// Obt todas las ventas
router.get('/sales', async (req, res) => {
    try {
        const sales = await Sale.find();
        res.json(sales);
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//Obt una venta por ID tiene la verificación en el archivo middleware jiji
router.get('/sales/code/:code', getSaleByCode, (req, res) => {
    res.json(res.sales)
}),


// Crear nuevo venta
router.post('/sales', async (req, res) => {
    try {
        const saleData = {
            type: req.body.type,
            code: req.body.code,
            productCode: req.body.productCode,
            productName: req.body.productName,
            productDescription: req.body.productDescription,
            saleDate: req.body.saleDate,
            productBrand: req.body.productBrand,
            client: req.body.client,
            previousStock: req.body.previousStock,
            newStock: req.body.newStock,
            quantity: req.body.quantity,
            salePrice: req.body.salePrice,
            incremento: req.body.incremento,
            descripcionIncremento: req.body.descripcionIncremento,
            total: req.body.total,
            payMethod: req.body.payMethod,
        };

// Crear nueva venta
        const sale = new Sale(saleData);
        const newSale = await sale.save();
        res.status(201).json(newSale);
    } catch (err) {
        res.status(400).json({ message: "Venta no creada" + err.message });
    }
});


// // Actualiazr venta
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



// Eliminar venta
router.delete('/sales/:code', getSaleByCode, async (req, res) => {
    try {
      const sale = res.sale;
      await Sale.findByIdAndDelete(sale.code);
      return res.json({ message: 'Venta eliminada correctamente' });
    } catch (error) {
      return res.status(500).json({ message: 'Error al eliminar la venta', error: error.message });
    }
  })


module.exports = router;