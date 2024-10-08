//productRouter.js
const express = require('express');
const router = express.Router();
const Product = require('../models/productModel');
// const Movement = require('../models/movementModel');
const { getProductByCode, getProductByName } = require('../middlewares/productMiddleware');


// Obt todos los prod
router.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//Obt un prod por ID tiene la verificación en el archivo middleware jiji
router.get('/products/:category/code/:code', getProductByCode, (req, res) => {
    res.json(res.product)
}),

// obt por nombre
router.get('/products/:category/name/:name', getProductByName, (req, res) => {
    // try {
    //     const product = await getProductByName({ name: req.params.name });
    //     if (product == null) {
    //         return res.status(404).json({ message: 'Producto no encontrado' });
    //     }
        res.json(res.product);
    // } catch (err) {
    //     res.status(500).json({ message: err.message })
    // }
}),

// Crear nuevo prod
router.post('/products', async (req, res) => {
    try {
        const productData = {
            name: req.body.name,
            description: req.body.description,
            image: req.body.image,
            date: req.body.date,
            brand: req.body.brand,
            buyer: req.body.buyer,
            stock: req.body.stock,
            buyPrice: req.body.buyPrice,
            salePrice: req.body.salePrice,
            category: req.body.category,
            code: req.body.code
        };
// Crear nuevo prod
        const product = new Product(productData);
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({ message: "producto no creado" + err.message });
    }
});


// Actualiazr prod
router.patch('/products/actualizarStock/:code', getProductByCode, async (req, res) => {
    if (req.body.name != null) {    
        res.product.name = req.body.name;
    }
    if (req.body.description != null) {
        res.product.description = req.body.description;
    }
    if (req.body.category != null) {
        res.product.category = req.body.category;
    }
    if (req.body.brand != null) {
        res.product.brand = req.body.brand;
    }
    if (req.body.image != null) {
        res.product.image = req.body.image;
    }
    if (req.body.date != null) {
        res.product.date = req.body.date;
    }
    if (req.body.buyer != null) {
        res.product.buyer = req.body.buyer;
    }
    if (req.body.stock != null) {
        res.product.stock = req.body.stock;
    } 
    if (req.body.buyPrice != null) {
        res.product.buyPrice = req.body.buyPrice;
    }
    if (req.body.salePrice != null) {
        res.product.salePrice = req.body.salePrice;
    }
    if (req.body.code != null) {
        res.product.code = req.body.code;
    }

    try {
        const updatedProduct = await res.product.save();
        res.json(updatedProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Actualizar stock de producto
// router.patch('/products/actualizarStock/:code', getProductByCode, async (req, res) => {
//     if (req.body.stock != null) {
//       res.product.stock = req.body.stock;
//     }
  
//     try {
//       const updatedProduct = await res.product.save();
//       res.json(updatedProduct);
//     } catch (err) {
//       res.status(400).json({ message: err.message });
//     }
//   });

// Eliminar prod
router.delete('/products/:code', getProductByCode, async (req, res) => {
    try {
      const product = res.product;
      await Product.findByIdAndDelete(product.code);
      return res.json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
      return res.status(500).json({ message: 'Error al eliminar el producto', error: error.message });
    }
  })

// Crear un nuevo producto


module.exports = router;