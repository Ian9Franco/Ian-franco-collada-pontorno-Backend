const express = require('express');
const router = express.Router();
const Product = require('../models/product');

router.get('/home', async (req, res) => {
    try {
        const products = await Product.find();
        res.render('home', { title: 'Lista de Productos', products });
    } catch (error) {
        res.status(500).send('Error al cargar los productos');
    }
});

router.get('/realtimeproducts', async (req, res) => {
    try {
        const products = await Product.find();
        res.render('realTimeProducts', { title: 'Productos en Tiempo Real', products });
    } catch (error) {
        res.status(500).send('Error al cargar los productos');
    }
});

module.exports = router;
