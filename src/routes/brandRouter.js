const express = require('express');
const router = express.Router();
const Brand = require('../models/brandModel');
const { getBrandByCode, getBrandByName } = require('../middlewares/brandMiddleware');


// Obt todas las marcas
router.get('/brands', async (req, res) => {
    try {
        const brands = await Brand.find();
        res.json(brands);
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//Obt una marca por codigo tiene la verificación en el archivo middleware jiji
router.get('/brands/code/:code', getBrandByCode, (req, res) => {
    res.json(res.brand)
}),

// obt por nombre
router.get('/brands/name/:name', getBrandByName, (req, res) => {
        res.json(res.brand);
}),

// Crear nueva marca
router.post('/brands', async (req, res) => {
    try {
        const brandData = {
            name: req.body.name,
            code: req.body.code,
            date: req.body.date
        };
// Crear nueva marca
        const brand = new Brand(brandData);
        const newBrand = await brand.save();
        res.status(201).json(newBrand);
    } catch (err) {
        res.status(400).json({ message: "Marca no creada" + err.message });
    }
});


// Actualizar marca
router.patch('/brands/:code', getBrandByCode, async (req, res) => {
    if (req.body.name != null) {    
        res.brand.name = req.body.name;
    }
    if (req.body.code != null) {
        res.brand.code = req.body.code;
    }

    try {
        const updatedBrand = await res.brand.save();
        res.json(updatedBrand);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Eliminar marca
router.delete('/brands/:code', getBrandByCode, async (req, res) => {
    try {
      const brand = res.brand;
      await brand.remove();
      return res.json({ message: 'Marca eliminada correctamente' });
    } catch (error) {
      return res.status(500).json({ message: 'Error al eliminar la marca', error: error.message });
    }
  })

// Crear un nuevo producto


module.exports = router;