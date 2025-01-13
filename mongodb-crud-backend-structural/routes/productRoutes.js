const express = require('express');
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');

const router = express.Router();

router.post('/', createProduct); // Create
router.get('/', getAllProducts); // Read all
router.get('/:id', getProductById); // Read by ID
router.put('/:id', updateProduct); // Update
router.delete('/:id', deleteProduct); // Delete

module.exports = router;
