const Product = require('../models/Product');

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.error(`Error getting products: ${error.message}`);
    res.status(500).json({ message: 'Failed to get products', error: error.message });
  }
};

// @desc    Get products by store
// @route   GET /api/products/store/:storeId
// @access  Public
const getProductsByStore = async (req, res) => {
  try {
    if (!req.params.storeId) {
      return res.status(400).json({ message: 'Store ID is required' });
    }
    
    const products = await Product.find({ store: req.params.storeId });
    
    if (!products) {
      return res.status(404).json({ message: 'No products found for this store' });
    }
    
    res.json(products);
  } catch (error) {
    console.error(`Error getting products by store: ${error.message}`);
    res.status(500).json({ message: 'Failed to get store products', error: error.message });
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ message: 'Product ID is required' });
    }
    
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json(product);
  } catch (error) {
    console.error(`Error getting product by ID: ${error.message}`);
    res.status(500).json({ message: 'Failed to get product', error: error.message });
  }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private
const createProduct = async (req, res) => {
  try {
    const { name, price, quantity, imageUrl, store } = req.body;
    
    // Validate required fields
    if (!name || !price || !quantity || !imageUrl || !store) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }
    
    const product = new Product(req.body);
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error(`Error creating product: ${error.message}`);
    res.status(400).json({ message: 'Failed to create product', error: error.message });
  }
};

module.exports = {
  getProducts,
  getProductsByStore,
  getProductById,
  createProduct,
}; 