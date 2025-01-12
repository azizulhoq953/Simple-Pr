const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Initialize Express app
const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(bodyParser.json());

// MongoDB connection string (replace with your own MongoDB URI or MongoDB Atlas URI)
const dbURI = 'mongodb+srv://azizulhoq953:t5D3fniTQdIwb0Ff@cluster0.bo5g0gy.mongodb.net/crudapp';

// Connect to MongoDB
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Error connecting to MongoDB:', err));

// Define a Product schema
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String
});

// Create a model based on the schema
const Product = mongoose.model('Product', productSchema);

// Create a new product (Create)
app.post('/api/products', async (req, res) => {
  const { name, price, category } = req.body;
  const newProduct = new Product({ name, price, category });
  try {
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(400).json({ message: 'Error creating product', error: err });
  }
});

// Get all products (Read)
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products', error: err });
  }
});

// Get a product by ID (Read)
app.get('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching product', error: err });
  }
});

// Update a product by ID (Update)
app.put('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  const { name, price, category } = req.body;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, { name, price, category }, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: 'Error updating product', error: err });
  }
});

// Delete a product by ID (Delete)
app.delete('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted', product: deletedProduct });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting product', error: err });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});


// run command to running 
// node server.js 