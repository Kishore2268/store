const Store = require('../models/Store');

// @desc    Get all stores
// @route   GET /api/stores
// @access  Public
const getStores = async (req, res) => {
  try {
    const stores = await Store.find({});
    res.json(stores);
  } catch (error) {
    console.error(`Error getting stores: ${error.message}`);
    res.status(500).json({ message: 'Failed to get stores', error: error.message });
  }
};

// @desc    Get single store
// @route   GET /api/stores/:id
// @access  Public
const getStoreById = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ message: 'Store ID is required' });
    }
    
    const store = await Store.findById(req.params.id);
    
    if (!store) {
      return res.status(404).json({ message: 'Store not found' });
    }
    
    res.json(store);
  } catch (error) {
    console.error(`Error getting store by ID: ${error.message}`);
    res.status(500).json({ message: 'Failed to get store', error: error.message });
  }
};

// @desc    Create a store
// @route   POST /api/stores
// @access  Private
const createStore = async (req, res) => {
  try {
    const { name, location, imageUrl } = req.body;
    
    // Validate required fields
    if (!name || !location || !imageUrl) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }
    
    const store = new Store(req.body);
    const createdStore = await store.save();
    res.status(201).json(createdStore);
  } catch (error) {
    console.error(`Error creating store: ${error.message}`);
    res.status(400).json({ message: 'Failed to create store', error: error.message });
  }
};

module.exports = {
  getStores,
  getStoreById,
  createStore,
}; 