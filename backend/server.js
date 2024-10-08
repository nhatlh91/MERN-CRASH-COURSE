import express from 'express';
import dotenv from "dotenv";
import { connectDB } from './configs/db.js';
import Product from './models/product.model.js';
import mongoose from 'mongoose';

dotenv.config();

const app = express();

app.use(express.json());

app.get('/products', async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({
            success: true,
            data: products
        })
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

app.post('/products', async (req, res) => {
    const product = req.body;
    const { name, price, image } = product;
    if (!name || !price || !image) {
        return res.status(400).json({
            success: false,
            message: 'Please provide all fields'
        });
    }

    try {
        const newProduct = new Product(product);
        await newProduct.save();
        res.status(200).json({
            success: true,
            data: newProduct
        })
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

app.put('/products/:id', async (req, res) => {
    const product = req.body;
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            success: false,
            message: 'Product not found'
        });
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
        res.status(200).json({
            success: true,
            data: updatedProduct
        })
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: `Product deleted`
        })
    } catch (error) {
        console.error(error.message);
        res.status(404).json({
            success: false,
            message: `Product not found`
        })
    }
})

app.listen(5000, () => {
    connectDB();
    console.log(`Server started at http://localhost:5000`);
})
