const express = require('express');
const router = express.Router();
const Category = require('../models/categoryModel');
const { getCategoryByCode, getCategoryByName } = require('../middlewares/categoryMiddleware');


// Obt todas las categorías
router.get('/categories', async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//Obt una marca por codigo tiene la verificación en el archivo middleware jiji
router.get('/categories/code/:code', getCategoryByCode, (req, res) => {
    res.json(res.category)
}),

// obt por nombre
router.get('/categories/name/:name', getCategoryByName, (req, res) => {
        res.json(res.category);
}),

// Crear nueva categoría
router.post('/categories', async (req, res) => {
    try {
        const categoryData = {
            name: req.body.name,
            code: req.body.code,
            date: req.body.date,
        };
// Crear nueva categoría
        const category = new Category(categoryData);
        const newCategory = await category.save();
        res.status(201).json(newCategory);
    } catch (err) {
        res.status(400).json({ message: "Categoría no creada" + err.message });
    }
});


// Actualizar categoría
router.patch('/categories/:code', getCategoryByCode, async (req, res) => {
    if (req.body.name != null) {    
        res.category.name = req.body.name;
    }
    if (req.body.code != null) {
        res.category.code = req.body.code;
    }

    try {
        const updatedCategory = await res.category.save();
        res.json(updatedCategory);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Eliminar categoría
router.delete('/categories/:code', getCategoryByCode, async (req, res) => {
    try {
        const category = res.category;
        console.log('Eliminando categoría:', category); // Para verificar que se encuentra la categoría correctamente
        // Eliminamos la categoría utilizando deleteOne
        await Category.deleteOne({ code: req.params.code });
        return res.json({ message: 'Categoría eliminada correctamente' });
    } catch (error) {
        console.error('Error al eliminar la categoría:', error);
        return res.status(500).json({ message: 'Error al eliminar la categoría', error: error.message });
    }
  })

module.exports = router;