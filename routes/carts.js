const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = './data/carts.json';
const productsPath = './data/products.json';

// Utilidad para leer y escribir archivos JSON
const readData = (path) => JSON.parse(fs.readFileSync(path, 'utf-8'));
const writeData = (path, data) => fs.writeFileSync(path, JSON.stringify(data, null, 2));

// POST /api/carts/
router.post('/', (req, res) => {
    const carts = readData(path);
    const newCart = {
        id: carts.length ? carts[carts.length - 1].id + 1 : 1,
        products: []
    };
    carts.push(newCart);
    writeData(path, carts);
    res.status(201).json(newCart);
});

// GET /api/carts/:cid
router.get('/:cid', (req, res) => {
    const carts = readData(path);
    const cart = carts.find(c => c.id == req.params.cid);
    cart ? res.json(cart) : res.status(404).send('Cart not found');
});

// POST /api/carts/:cid/product/:pid
router.post('/:cid/product/:pid', (req, res) => {
    const carts = readData(path);
    const products = readData(productsPath);
    const cart = carts.find(c => c.id == req.params.cid);
    if (cart) {
        const product = products.find(p => p.id == req.params.pid);
        if (product) {
            const cartProduct = cart.products.find(p => p.product == req.params.pid);
            if (cartProduct) {
                cartProduct.quantity += 1;
            } else {
                cart.products.push({ product: req.params.pid, quantity: 1 });
            }
            writeData(path, carts);
            res.json(cart);
        } else {
            res.status(404).send('Product not found');
        }
    } else {
        res.status(404).send('Cart not found');
    }
});

module.exports = router;
