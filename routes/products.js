const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/product');  

// GET /api/products/
router.get('/', async (req, res) => {
    const { limit = 10, page = 1, sort, query } = req.query;
    const filter = {};

    if (query) {
        filter.$or = [
            { category: query },
            { available: query === 'true' }
        ];
    }

    const options = {
        limit: parseInt(limit),
        page: parseInt(page),
        sort: sort === 'asc' ? { price: 1 } : sort === 'desc' ? { price: -1 } : {}
    };

    try {
        const products = await Product.paginate(filter, options);

        res.json({
            status: 'success',
            payload: products.docs,
            totalPages: products.totalPages,
            prevPage: products.hasPrevPage ? products.prevPage : null,
            nextPage: products.hasNextPage ? products.nextPage : null,
            page: products.page,
            hasPrevPage: products.hasPrevPage,
            hasNextPage: products.hasNextPage,
            prevLink: products.hasPrevPage ? `/api/products?limit=${limit}&page=${products.prevPage}&sort=${sort}&query=${query}` : null,
            nextLink: products.hasNextPage ? `/api/products?limit=${limit}&page=${products.nextPage}&sort=${sort}&query=${query}` : null
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

// GET /api/products/:pid
router.get('/:pid', async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.pid)) {
        return res.status(400).send('Invalid Product ID');
    }
    try {
        const product = await Product.findById(req.params.pid);
        product ? res.json(product) : res.status(404).send('Product not found');
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

// POST /api/products/
router.post('/', async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

// PUT /api/products/:pid
router.put('/:pid', async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.pid)) {
        return res.status(400).send('Invalid Product ID');
    }
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.pid, req.body, { new: true });
        updatedProduct ? res.json(updatedProduct) : res.status(404).send('Product not found');
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

// DELETE /api/products/:pid
router.delete('/:pid', async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.pid)) {
        return res.status(400).send('Invalid Product ID');
    }
    try {
        const result = await Product.findByIdAndDelete(req.params.pid);
        result ? res.status(204).send() : res.status(404).send('Product not found');
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

module.exports = router;
