const express = require('express');
const router = express.Router();
const mongoose = require('mongoose'); // Importa mongoose si no lo has hecho
const Cart = require('../models/cart');
const Product = require('../models/product');

// POST /api/carts/
router.post('/', async (req, res) => {
    try {
        const newCart = new Cart({ products: [] });
        await newCart.save();
        res.status(201).json(newCart);
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

// GET /api/carts/:cid
router.get('/:cid', async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.cid)) {
        return res.status(400).send('Invalid Cart ID');
    }
    try {
        const cart = await Cart.findById(req.params.cid).populate('products.product');
        cart ? res.json(cart) : res.status(404).send('Cart not found');
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

// POST /api/carts/:cid/product/:pid
router.post('/:cid/product/:pid', async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.cid) || !mongoose.Types.ObjectId.isValid(req.params.pid)) {
        return res.status(400).send('Invalid Cart or Product ID');
    }
    try {
        const cart = await Cart.findById(req.params.cid);
        const product = await Product.findById(req.params.pid);

        if (cart && product) {
            const cartProduct = cart.products.find(p => p.product.toString() === req.params.pid);
            if (cartProduct) {
                cartProduct.quantity += 1;
            } else {
                cart.products.push({ product: req.params.pid, quantity: 1 });
            }
            await cart.save();
            res.json(cart);
        } else {
            res.status(404).send('Cart or Product not found');
        }
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

// DELETE /api/carts/:cid/products/:pid
router.delete('/:cid/products/:pid', async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.cid) || !mongoose.Types.ObjectId.isValid(req.params.pid)) {
        return res.status(400).send('Invalid Cart or Product ID');
    }
    try {
        const cart = await Cart.findById(req.params.cid);
        if (cart) {
            cart.products = cart.products.filter(p => p.product.toString() !== req.params.pid);
            await cart.save();
            res.json(cart);
        } else {
            res.status(404).send('Cart not found');
        }
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

// DELETE /api/carts/:cid
router.delete('/:cid', async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.cid)) {
        return res.status(400).send('Invalid Cart ID');
    }
    try {
        const cart = await Cart.findById(req.params.cid);
        if (cart) {
            cart.products = [];
            await cart.save();
            res.json(cart);
        } else {
            res.status(404).send('Cart not found');
        }
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

module.exports = router;
