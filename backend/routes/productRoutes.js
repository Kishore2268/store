const express = require('express');
const router = express.Router();
const { 
  getProducts, 
  getProductById, 
  getProductsByStore, 
  createProduct 
} = require('../controllers/productController');

router.route('/').get(getProducts).post(createProduct);
router.route('/store/:storeId').get(getProductsByStore);
router.route('/:id').get(getProductById);

module.exports = router; 