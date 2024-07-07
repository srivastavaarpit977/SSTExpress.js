const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

mongoose.connect('mongodb+srv://srivastavaarpit977:arpit977@cluster0.geo12il.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('Error:', err));

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: String, required: true },
    inStock: { type: Boolean, required: true },
    category: { type: String, required: true }
});

// Product Model
const Product = mongoose.model('product', productSchema);

// Create Product
app.post('/api/products', async (req, res) => {
    try {
        const product = await Product.create({
            name: req.body.name,
            price: req.body.price,
            inStock: req.body.inStock,
            category: req.body.category
        });
        console.log(product);
        return res.status(201).json({ message: 'Product Created', product });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.listen(5000, () => {
    console.log('Server started at port 5000');
});