const express = require('express');
const router = express.Router();

let products = [
    { name: 'Producto 1', price: 100 },
    { name: 'Producto 2', price: 200 }
];

router.get('/home', (req, res) => {
    res.render('home', { title: 'Lista de Productos', products });
});

router.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts', { title: 'Productos en Tiempo Real', products });
});

module.exports = router;
