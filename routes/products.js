const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = './data/products.json';

// Utilidad para leer y escribir archivos JSON
const readData = () => JSON.parse(fs.readFileSync(path, 'utf-8'));
const writeData = (data) => fs.writeFileSync(path, JSON.stringify(data, null, 2));

// GET /api/products/
router.get('/', (req, res) => {
    const products = readData();
    const limit = req.query.limit ? parseInt(req.query.limit) : products.length;
    res.json(products.slice(0, limit));
});

// GET /api/products/:pid
router.get('/:pid', (req, res) => {
    const products = readData();
    const product = products.find(p => p.id == req.params.pid);
    product ? res.json(product) : res.status(404).send('Product not found');
});

// POST /api/products/
router.post('/', (req, res) => {
    const products = readData();
    const newProduct = {
        id: products.length ? products[products.length - 1].id + 1 : 1,
        ...req.body,
        status: req.body.status || true
    };
    products.push(newProduct);
    writeData(products);
    res.status(201).json(newProduct);
});

// PUT /api/products/:pid
router.put('/:pid', (req, res) => {
    const products = readData();
    const index = products.findIndex(p => p.id == req.params.pid);
    if (index !== -1) {
        const updatedProduct = { ...products[index], ...req.body, id: products[index].id };
        products[index] = updatedProduct;
        writeData(products);
        res.json(updatedProduct);
    } else {
        res.status(404).send('Product not found');
    }
});

// DELETE /api/products/:pid
router.delete('/:pid', (req, res) => {
    let products = readData();
    products = products.filter(p => p.id != req.params.pid);
    writeData(products);
    res.status(204).send();
});

module.exports = router;
