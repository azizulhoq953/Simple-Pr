const express = require('express');
const app = express();
const port = 3000;

// Sample data to simulate fetching data
const products = [
    { id: 1, name: 'Product 1', price: 10 },
    { id: 2, name: 'Product 2', price: 20 },
    { id: 3, name: 'Product 3', price: 30 }
];

// Serve static files from the 'public' directory
app.use(express.static('public'));

// API endpoint to get products
app.get('/api/products', (req, res) => {
    res.json(products);
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
